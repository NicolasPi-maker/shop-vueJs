<template>
  <div class="admin-container d-flex justify-content-center align-items-center">
    <ProductForm />
  </div>
</template>

<script setup lang="ts">

import ProductForm from "@/features/admin/components/ProductForm.vue";
</script>

<style scoped>
  .admin-container {
    height: 100%;
  }
</style>