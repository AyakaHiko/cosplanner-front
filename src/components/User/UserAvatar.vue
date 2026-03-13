<script setup>
import { watch, ref } from 'vue';
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
    type: [String, Object],
    default: ''
  }
});

const avatarUri = ref('');

const updateAvatar = () => {
  if(props.avatarPath && typeof props.avatarPath === 'string') {
    avatarUri.value = `${AWS_URL}/${props.avatarPath}`;
  } else if (props.avatarPath && typeof props.avatarPath === 'object' && props.avatarPath.path) {
    avatarUri.value = `${AWS_URL}/${props.avatarPath.path}`;
  } else {
    avatarUri.value = createAvatar(lorelei, {
      size: props.size,
      seed: props.username || 'default',
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"]
    }).toDataUri();
  }
};

updateAvatar();
watch([() => props.avatarPath, () => props.username], updateAvatar);
</script>

<template>
  <div class="avatar">
    <img
      :src="avatarUri"
      :alt="username"
    />
  </div>
</template>
