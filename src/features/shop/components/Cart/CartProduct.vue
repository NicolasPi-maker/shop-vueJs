<script setup lang="ts">
import type {ProductCartInterface} from "@/interfaces";

const removeProductFromCart = (productId : string) => {
  emit('removeProduct', productId);
}

const emit = defineEmits<{
  (event: 'removeProduct', productId: string): void,
}>();

const props = defineProps<{
  product: ProductCartInterface,
}>();

</script>

<template>
  <div class="mb-10 p-10 d-flex align-items-center flex-row product">
    <div class="d-flex flex-fill flex-row">
      <strong class="mr-10">{{ product.title }}</strong>
      <span class="mr-10">x {{ product.quantity }}</span>
    </div>
    <span class="mr-10">Prix : {{ product.price }} €</span>
    <button @click="removeProductFromCart(product._id)" class="btn btn-danger">Supprimer</button>
  </div>
</template>

<style lang="scss" scoped>
  .product {
    background-color: var(--gray-1);
    border: var(--border);
    border-radius: var(--border-radius);
  }
</style>
