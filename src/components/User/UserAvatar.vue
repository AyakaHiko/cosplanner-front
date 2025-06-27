<script setup>
import { onMounted, ref } from 'vue';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 128
  }
});

const avatarUri = ref('');

onMounted(() => {
  avatarUri.value = createAvatar(lorelei, {
    size: props.size,
    seed: props.username,
    backgroundColor: ["b6e3f4","c0aede","d1d4f9"]
  }).toDataUri();
});
</script>

<template>
  <div class="avatar">
    <img
      :src="avatarUri"
      :alt="username"
    />
  </div>
</template>

