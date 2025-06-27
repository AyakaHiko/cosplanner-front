<script setup lang="ts">
interface CosplayInfo {
  id: number | string;
  name: string;
}

const props = defineProps({
  description:{
    type: String
  },
  nextCosplay: {
    type: Object as () => CosplayInfo
  },
  nextEvent: {
    type: String
  }
})
</script>

<template>
<div class="user-bio">
  <div v-if="description">
    {{ description }}
  </div>
  <div v-if="nextCosplay">
    Next Cosplay:
    <router-link :to="`/cosplay/${nextCosplay.id}`">
      {{ nextCosplay.name }}
    </router-link>
  </div>


</div>
</template>

<style scoped>

</style>
