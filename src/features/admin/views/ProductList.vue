<script setup lang="ts">
import {useAdminProducts} from "@/features/admin/stores/adminProductStore";

 const adminProductStore = useAdminProducts();
 const deleteProduct = (productId: string) => {
   adminProductStore.deleteProduct(productId);
 }
</script>

<template>
  <div class="container card">
    <h1>Liste des produits</h1>
    <h3 v-if="adminProductStore.isLoading">Chargement des produits...</h3>
    <ul v-else>
      <li class="d-flex flex-row align-items-center mb-20" v-for="product in adminProductStore.products" :key="product.id">
        <span class="flex-fill">{{ product.title }}</span>
        <router-link :to="{name: 'edit', params: { id: product._id}}" class="edit-button">
          <button class="btn btn-primary mr-20">Modifier</button>
        </router-link>
        <button class="btn btn-danger" @click="deleteProduct(product._id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .container {
    width: 100%;
  }

  li {
    border: var(--border);
    border-radius: var(--border-radius);
    padding: 5px 15px;
    cursor: pointer;
    transition: .2s;
    &:hover {
      background-color: var(--gray-1);
    }
  }

  .edit-button:hover {
    background-color: transparent;
  }
</style>