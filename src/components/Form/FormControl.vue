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
  },
  inline: {
    type: Boolean,
    default: false
  },
  submitText:{
    type: String,
    default: 'Save'
  },
  reset: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <form :action="action" :method="method" :class="{ 'form-inline': inline, 'card': bordered }" class="form p-4">
    <slot />
    <button type="submit" class="btn btn-outline-secondary">{{ submitText }}</button>
    <button v-if="reset" type="reset" class="btn btn-outline-secondary">Reset</button>
  </form>
</template>
