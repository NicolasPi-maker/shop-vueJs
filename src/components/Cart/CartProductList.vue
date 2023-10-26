<script setup lang="ts">
import CartProduct from "@/components/Cart/CartProduct.vue";
import type {ProductCartInterface} from "@/interfaces";

const props = defineProps<{
  cart: ProductCartInterface[],
}>();

const emit = defineEmits<{
  (event: 'removeProduct', productId: number): void,
}>();

</script>

<template>
  <div class="d-flex flex-column">
    <CartProduct @remove-product="emit('removeProduct', $event)" v-for="product in cart" :key="product.id" :product="product"/>
  </div>
</template>

<style lang="scss" scoped>

</style>
