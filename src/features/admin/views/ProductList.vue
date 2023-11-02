<script setup lang="ts">
import {tryRemoveProduct, useFetchProducts} from "@/shared/services/product.service";

 const {products, loading, error} = useFetchProducts();

 const deleteProduct = (productId: string) => {
   tryRemoveProduct(productId);
   products.value = products.value!.filter((product) => product._id !== productId);
 }
</script>

<template>
  <div class="container card">
    <h1>Liste des produits</h1>
    <h3 v-if="error">Une erreur s'est produite</h3>
    <h3 v-else-if="loading">Chargement des produits...</h3>
    <ul v-else>
      <li class="d-flex flex-row align-items-center mb-20" v-for="product in products" :key="product.id">
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