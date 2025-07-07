<script setup>
import { onMounted, ref } from 'vue';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

const AWS_URL = 'https://cosplanner-bucket.s3.eu-north-1.amazonaws.com';

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 128
  },
  avatarPath: {
    type: String,
    default: ''
  }
});

const avatarUri = ref('');

onMounted(() => {
  if(props.avatarPath)
  {
    avatarUri.value = `${AWS_URL}/${props.avatarPath}`;
  }
  else {
    avatarUri.value = createAvatar(lorelei, {
      size: props.size,
      seed: props.username,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"]
    }).toDataUri();
  }
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
