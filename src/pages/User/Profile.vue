<script setup lang="ts">
import UserAvatar from "@/components/User/UserAvatar.vue";
import StatisticItem from "@/components/User/StatisticItem.vue";
import UserBio from "@/components/User/UserBio.vue";
import { useUserStore } from "@/stores/user";
import {storeToRefs} from "pinia";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

</script>

<template>
  <div class="w-100 justify-content-center d-flex">
  <div class="card w-50 mt-3 d-flex flex-column">
    <div class="user-header">
      <UserAvatar :username="user.name" :avatar-path="user.avatar_path"/>
      <div class="statistics-bar">
        <StatisticItem name="Cosplays" :count=2 link="/cosplays"/>
        <StatisticItem name="Cosplans" :count=124 link="/cosplans"/>
      </div>
    </div>
    <div class="username">{{ user.name }}</div>
    <UserBio/>
  </div>
  </div>
</template>

<style src="@/styles/userProfile.scss"/>

