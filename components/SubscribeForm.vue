<template>
  <div :class="$b()">
    <div :class="$b('form')">
      <VisionTextInput
        id="subscribe-email"
        v-model:value="email"
        type="email"
        shape="square"
        placeholder="you@email.com"
        :class="$b('input')"
        :disabled="subscribed"
        name="subscribeEmail"
        @keyup.enter="submit"
      />
      <VisionButton
        square
        background-colour="white"
        :disabled="loading || subscribed"
        :class="$b('submit-button')"
        @click="submit"
      >
        <template #content>
          <span
            v-if="!loading"
            :class="$b('submit-button-text')"
          >
            {{ $t("footer.subscribe.signUpCta") }}
          </span>
          <VisionLoadingSpinner
            :loading="loading"
            size="small"
            :class="$b('submit-button-loading')"
          />
        </template>
      </VisionButton>
    </div>

    <div :class="$b('alert')">
      <SlideDownTransition
        v-if="message || email"
        group
      >
        <BaseCopy
          v-if="message"
          key="message"
          size="body-sm"
        >
          {{ message }}
        </BaseCopy>

        <BaseCopy
          v-else-if="email"
          key="privacyNote"
          size="body-sm"
          :class="$b('privacy-note')"
        >
          {{ $t("footer.subscribe.privacyNote") }}
          <VisionLink
            is-button
            line-link
            size="inherit"
            @click="openPrivacyPolicy"
          >
            {{ $t("footer.subscribe.privacyNoteLinkText") }}
          </VisionLink>
        </BaseCopy>
      </SlideDownTransition>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubscribeForm",

  setup() {
    const userStore = useUserStore()

    return { userStore }
  },

  data: () => ({
    email: null,
    message: null,
    subscribed: false,
    loading: false,
  }),

  watch: {
    email() {
      this.message = null
    },
  },

  methods: {
    async submit() {
      if (!this.email) return

      this.loading = true

      try {
        const response = await $fetch(
          `/api/v1/session/${this.generateId()}/subscribe/`,
          {
            method: "POST",
            body: {
              email: this.email,
            },
          }
        )

        if (response.subscribed) {
          this.subscribed = true
          this.message = this.$t("footer.subscribe.success")
          this.userStore.setUserEmail(this.email)
          this.$track.updateUserData()
        } else if ("valid" in response && !response.valid) {
          this.message = this.$t("footer.subscribe.invalid")
        } else {
          this.message = this.$t("footer.subscribe.error")
        }
      } catch (error) {
        this.$sentry.captureException(error)
        return { error: true }
      }

      this.loading = false
    },

    openPrivacyPolicy() {
      this.openSidebarPage("privacy-policy")
    },

    openSidebarPage(slug) {
      this.$store.dispatch("sidebar/OPEN_SIDEBAR_PAGE", { slug })
    },

    generateId() {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      const sessionId = Array(20)
        .join()
        .split(",")
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join("")

      return sessionId
    },
  },
}
</script>

<style lang="postcss">
.SubscribeForm {
  @apply relative;
}

.SubscribeForm__alert {
  @apply pt-xs;

  .SubscribeForm--in-modal &__privacy-note {
    @apply block;
  }

  .LineLink--inherit {
    @apply pb-0;
  }
}

.SubscribeForm__form {
  @apply flex;
}

.SubscribeForm__submit-button {
  @apply w-32
    relative
    justify-center items-center
    ml-3;
}
</style>
