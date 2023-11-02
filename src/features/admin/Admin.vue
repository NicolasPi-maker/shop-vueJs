<template>
  <div class="admin-container d-flex p-20">
    <AdminNav class="admin-nav mr-20" />
    <div class="admin-main flex-fill d-flex justify-content-center flex-row">
      <router-view v-slot="{ Component, route }">
        <Component :is="Component" :key="route.fullPath"/>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">

import AdminNav from "@/features/admin/components/AdminNav.vue";
</script>

<style scoped>
  .admin-container {
    height: 100%;
  }

  admin-nav {
    flex: 0 0 200px;
  }

</style>