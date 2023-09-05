<template>
  <div>
    <div>This is text directly on the layout.</div>

    <AnotherComponent/>

    <button @click="toggleLazyComponent">
      Show lazy component
    </button>

    <LazyTestComponent v-if="showLazyComponent"/>

    <div>
        <slot />
    </div>
  </div>
</template>
<script setup>
const showLazyComponent = ref(false)

function toggleLazyComponent() {
  console.log('Hello4')
  showLazyComponent.value = !showLazyComponent.value
}
</script>
