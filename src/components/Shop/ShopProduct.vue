<script setup lang="ts">
import {ProductInterface} from "@/interfaces/product.interface";

const addProductToCart = (productId : number) => {
  emit('addToCart', productId);
}

const emit = defineEmits<{
  (event: 'addToCart', productId: number): void,
}>();

const props = defineProps<{
  product: ProductInterface,
}>();
</script>

<template>
  <section class="product d-flex flex-column">
    <div class="product-image" :style="{ backgroundImage: `url(${product.image}`}"></div>
    <article class="p-10 d-flex flex-column">
      <h4>{{ product.title }}</h4>
      <p>Stock : {{product.stock}}</p>
      <p>{{ product.description }}</p>
      <div class="d-flex flex-row align-items-center">
        <span class="flex-fill">Prix : {{ product.price }} €</span>
        <button @click="addProductToCart(product.id)" class="btn btn-primary">Ajouter au panier</button>
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
  .product {
    background-color: white;
    border: var(--border);
    border-radius: var(--border-radius);
    &-image {
        border-top-right-radius: var(--border-radius);
        border-top-left-radius: var(--border-radius);
        background-size: cover;
        background-position: center;
        height: 250px;
    }
  }
</style>