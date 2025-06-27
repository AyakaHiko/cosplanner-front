<script setup lang="ts">
import FormControl from "@/components/Form/FormControl.vue";
import FormField from "@/components/Form/FormField.vue";


</script>

<template>
  <FormControl>
    <FormField
      required
      label="Username"
    />
    <FormField
      required
      type="email"
      label="Email"
    />

  </FormControl>
</template>

<style scoped>

</style>
