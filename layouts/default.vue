<template>
  <div>
    <div>This is text directly on the layout.</div>

    <AnotherComponent/>

    <button @click="toggleLazyComponent">
      Show lazy component
    </button>

    <TestComponent v-if="showLazyComponent"/>

    <div>
        <slot />
    </div>
  </div>
</template>
<script setup>
const exampleStore = useExampleStore()
const showLazyComponent = ref(false)

function toggleLazyComponent() {
  showLazyComponent.value = !showLazyComponent.value
}
</script>
