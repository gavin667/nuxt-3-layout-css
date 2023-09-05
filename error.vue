<template>
  <div
    class="global-wrapper ErrorPage"
  >
    <h1>
      An Error Occured
    </h1>

    <p
      v-if="error.statusCode === 404"
    >
      The page you requested cannot be found.
    </p>
    <p
      v-else
      size="body"
    >
      The page you requested cannot be loaded.
    </p>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',

  props: {
    error: { type: Object, default: () => {} }
  }
}
</script>

<style lang="postcss">
.ErrorPage {
  margin: 40px;
  background-color: red;
}
</style>
