<template>
    <div :class="['global-wrapper', { 'ignore-theme': isPDP }]">
        <p :class="$b('big-footer-test-id')">Big footer test id</p>
      <!-- <div
        v-if="showPageFooter"
        :class="$b()"
      >
        <div :class="$b('left')">
          <div :class="$b('subscribe')">
            <p
              v-if="footer.subscribeCopy"
              :class="$b('subscribe-copy')"
            >
              {{ footer.subscribeCopy }}
            </p>
  
            <SubscribeForm />
          </div>
        </div>
        <div :class="$b('right')">
          <div
            v-for="column in footerColumns"
            :key="column.id"
            :class="$b('items-column')"
          >
            <BaseCopy
              v-if="column.label"
              size="body-sm"
              text-transform="uppercase"
              :class="['t-gradient', ...$b('column-header')]"
            >
              {{ column.label }}
            </BaseCopy>
            <ul v-if="column.items.length">
              <li
                v-for="item in column.items"
                :key="item.id"
                :class="
                  $b('item', {
                    fade: hovering !== null && hovering !== `${item.id}`,
                  })
                "
                @mouseover="hovering = `${item.id}`"
                @mouseout="hovering = null"
              >
                <VisionLink
                  v-if="item.label"
                  :is-button="!!item.sidebar"
                  :to="item.target"
                  :class="$b('item-link')"
                  @click="() => handleClick(item)"
                >
                  {{ item.label }}
                  <VisionTag
                    v-if="item.showTag"
                    theme="grey"
                    size="small"
                    :class="$b('tag')"
                    :text="item.tag"
                  />
                </VisionLink>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
      <div :class="$b('sub')">
        <!-- <template>
          <div :class="$b('left')">
            <div :class="$b('logos')">
              <component
                :is="logo.missionModal ? 'VisionLink' : 'div'"
                v-for="logo in footerLogos"
                :key="logo.id"
                :to="logo.missionModal ? missionModal(logo) : null"
              >
                <img
                  v-if="logo.svgLogo"
                  :src="logo.svgLogo?.url"
                  :style="{ height: `${logo.size}em` }"
                  loading="lazy"
                />
              </component>
            </div>
          </div>
  
          <div :class="$b('right')">
            <div :class="$b('column')">
              <div :class="$b('social-links')">
                <VisionLink
                  v-for="socialLink in socialLinks"
                  :key="socialLink.id"
                  target="_blank"
                  :to="socialLink.link"
                  :class="$b('social-link')"
                >
                  <VisionIcon
                    v-if="socialLink.icon"
                    :icon="socialLink.icon"
                    colour="black"
                    size="small"
                  />
                </VisionLink>
              </div>
  
              <VisionButton
                colour="default"
                size="x-small"
                :class="$b('currency-menu')"
                @click="showCurrencyMenu"
              >
                <template #content>
                  <span>
                    {{ $t("language") }}
                    <span :class="$b('separator')">/</span>
                    {{ $t("currency.code") }}
                  </span>
                  <VisionIcon
                    icon="chevron"
                    colour="black"
                    size="xx-small"
                    :class="$b('chevron')"
                  />
                </template>
              </VisionButton>
            </div>
            <div :class="$b('column')">
              <div :class="$b('items')">
                <div
                  v-for="link in footerLinks"
                  :key="link.id"
                  :class="$b('link')"
                >
                  <BaseCopy size="body-sm">
                    <VisionLink
                      :is-button="!!link.sidebar || link.showCookieModal"
                      :to="link.target"
                      @click="() => handleClick(link)"
                    >
                      {{ link.label }}
                    </VisionLink>
                  </BaseCopy>
                </div>
              </div>
            </div>
          </div>
  
          <div :class="$b('center')">
            <BaseCopy
              size="body-sm"
              :class="$b('item', { isCopyright: true })"
            >
              <span style="white-space: nowrap">
                © SunGod {{ new Date().getFullYear() }}
              </span>
            </BaseCopy>
          </div>
        </template> -->
      </div>
    </div>
  </template>
  
  <script>
  import footerGql from "@/gql/footer.gql"
import { babelParse } from "@vue/compiler-sfc"
  
  export default {
    name: "PageFooter",
  
    async setup() {
      const { data } = await useDatoQuery({ query: footerGql })
  
      return { data }
    },
  
    data: () => ({
      hovering: null,
    }),
  
    computed: {  
      footer () {
        return this.data.footer
      },
  
      isPDP() {
        return this.$route.name?.match(/^pdp-/)
      },
  
      footerColumns() {
        return this.footer.columns?.filter(
          (column) => column.label || column.items?.length
        )
      },
  
      socialLinks() {
        return this.footer.socialLinks?.filter((socialLink) => socialLink.link)
      },
    
      footerLogos() {
        return this.footer.logos?.filter((logo) => logo.svgLogo)
      },
  
      footerLinks() {
        return this.footer.links?.filter((link) => link.label)
      },
  
      showPageFooter() {
        return (
          !(this.$route.fullPath || "").includes("checkout/onepage")
        )
      },
    },
  
    watch: {
      "$route.path": {
        handler() {
          this.hovering = null
        },
      },
    },
  
    methods: {
      handleClick(item) {
        if (item.showCookieModal) this.showCookieModal()
        if (item.sidebar) this.openSidebarPage(item)
      },
      openSidebarPage(item) {
        this.sidebarStore.setActiveSidebar(item.sidebar.slug)
      },
      showCookieModal() {
        this.pageStore.toggleCookieModal(true)
      },
      showCurrencyMenu() {
        this.sidebarStore.toggleCountrySelector()
      },
      missionModal(logo) {
        if (logo && logo?.missionModal?.modalContent) {
          return `/mission?modal=${logo?.missionModal?.modalContent?.slug}`
        }
      },
    },
  }
  </script>
  
  <style lang="postcss">
  .PageFooter {
    @apply flex flex-col
      pt-lg;
  
    @screen md {
      @apply flex-row;
    }
  
    &__sub {
      @apply flex flex-col flex-wrap
        pt-md pb-md;
  
      @screen md {
        @apply flex-row;
      }
    }
  }

  .PageFooter__big-footer-test-id {
    color: blue;
    font-size: 2rem;
  }
  
  .PageFooter__left {
    @apply w-full;
  
    @screen mdMax {
      @apply mb-lg;
    }
  
    @screen md {
      @apply w-1/2;
    }
  
    .PageFooter__sub & {
      @apply flex items-center;
  
      @screen mdMax {
        @apply mb-md;
      }
  
      @screen md {
        @apply pr-sm;
      }
    }
  }
  
  .PageFooter__right {
    @apply w-full
      flex;
  
    @screen mdMax {
      @apply flex-col;
    }
  
    @screen md {
      @apply w-1/2;
    }
  
    .PageFooter__sub & {
      @apply flex-wrap flex-row;
  
      @screen mdMax {
        @apply mb-sm;
      }
  
      @screen md {
        @apply flex-row-reverse;
      }
    }
  }
  
  .PageFooter__center {
    @apply w-full
      text-center
      pt-xs;
  
    @screen md {
      @apply pt-lg;
    }
  }
  
  .PageFooter__subscribe-copy {
    @apply w-3/5
      mb-xs
      text-md;
  
    @screen md {
      @apply w-3/5;
    }
  
    @screen lg {
      @apply w-2/5;
    }
  }
  
  .PageFooter__subscribe-button {
    @apply w-full
      mt-xs;
  
    @screen md {
      @apply w-auto;
    }
  }
  
  .PageFooter__social-links {
    @apply flex
      space-x-sm;
  }
  
  .PageFooter__items-column {
    @apply flex-1;
  
    &:not(:last-of-type) {
      @apply mb-sm;
    }
  }
  
  .PageFooter__column-header {
    @apply pb-xxxs
      font-medium;
  }
  
  .PageFooter__item {
    @apply py-xxxs
      transition-opacity;
  
    &--fade {
      @apply opacity-30;
    }
  
    &--currency-menu {
      @apply pr-0 my-sm;
  
      @screen md {
        @apply mt-auto my-0;
      }
    }
  
    &--is-copyright {
      @apply flex items-center justify-center flex-shrink-0
        opacity-50;
    }
  
    &--copyright-only {
      @apply w-full;
  
      @screen md {
        @apply px-sm;
      }
  
      @screen lg {
        @apply px-8;
      }
    }
  
    &-link {
      &:not(:hover) {
        @apply opacity-90;
      }
    }
  
    .PageFooter__item-link {
      @apply flex items-center
        text-base;
    }
  }
  
  .PageFooter__tag {
    @apply ml-xs;
  }
  
  .PageFooter__column {
    @apply w-full;
  
    @screen md {
      @apply w-1/2
        flex flex-col items-start justify-end;
    }
  }
  
  .PageFooter__items {
    @apply w-full
      flex flex-wrap items-center basis-full
      space-x-sm;
  
    @screen md {
      @apply basis-auto
        mt-auto;
    }
  }
  
  .PageFooter__logos {
    @apply flex items-start
      mr-sm space-x-8;
  }
  
  .PageFooter__separator {
    @apply px-xxxs;
  }
  
  .PageFooter__currency-menu {
    @apply flex items-center flex-shrink-0
      my-sm;
  
    @screen md {
      @apply mt-auto mb-0;
    }
  }
  
  .PageFooter__chevron {
    @apply pl-xxxs
      transition-colors duration-300 ease-in-out;
  }
  
  .PageFooter__link {
    @apply my-1;
  }
  </style>
  