<template>
  <div>
    <TestComponent />
    <slot />
  </div>
</template>
<script setup>
const route = useRoute()

console.log(route)
</script>
