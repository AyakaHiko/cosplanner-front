<script setup>
const props = defineProps({
  action: {
    type: String,
    default: ''
  },
  method: {
    type: String,
    default: 'post',
    validator: (value) => ['get', 'post'].includes(value)
  }
})
</script>

<template>
  <form :action="action" :method="method">
    <slot />
  </form>
</template>
