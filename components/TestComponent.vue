<template>
  <div class="test-component">
    <h1>This should be red on load</h1>
  </div>
</template>

<script setup>
const exampleStore = useExampleStore()

console.log('This is the example store', exampleStore)
</script>

<style lang="postcss">
.test-component {
  color: red;
  font-size: 1.2rem;
}
</style>
  