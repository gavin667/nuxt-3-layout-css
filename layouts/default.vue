<template>
  <div>
    <TestComponent />
    <div>Another things here</div>
    <div>
        <slot />
    </div>
    <PageFooter/>
  </div>
</template>
<script setup>
const route = useRoute()

console.log(route)
console.log('This is the default layout')
</script>
