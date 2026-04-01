<script setup lang="ts">
import UserAvatar from "@/components/User/UserAvatar.vue";
import StatisticItem from "@/components/User/StatisticItem.vue";
import UserBio from "@/components/User/UserBio.vue";
import { useUserStore } from "@/stores/user";
import {storeToRefs} from "pinia";
import {CButton} from "@coreui/vue";
import {cilPen} from "@coreui/icons";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

</script>

<template>
  <div class="container-fluid py-3">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card p-3 d-flex flex-column">
          <div class="user-header">
            <UserAvatar :username="user.name" :avatar-path="user.avatar"/>
            <div class="statistics-bar">
              <StatisticItem name="In Plans" :count="user.future_count || 0" link="/cosplans"/>
              <StatisticItem name="In Progress" :count="user.in_progress_count || 0" link="/cosplans"/>
              <StatisticItem name="Ready" :count="user.ready_count || 0" link="/cosplans"/>
            </div>
          </div>
          <div class="username mt-3">
            {{ user.name }}
            <CButton class="btn-sm ms-2" href="/settings">
              <CIcon :icon="cilPen"/>
            </CButton>
          </div>
          <div v-if="user.registration_date" class="registration-date text-muted small mb-2">
            Joined Cosplanner in {{ user.registration_date }}
          </div>
          <UserBio/>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/styles/userProfile.scss"/>

