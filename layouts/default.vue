<template>
  <div>
    <TestComponent />
    <div>Another things here</div>
    <div>
        <slot />
    </div>
    <footer>This is the footer</footer>
  </div>
</template>
<script setup>
const route = useRoute()

console.log(route)
</script>
