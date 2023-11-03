<script setup lang="ts">
import CartProduct from "@/features/shop/components/Cart/CartProduct.vue";
import type {ProductCartInterface} from "@/shared/interfaces";

const props = defineProps<{
  cart: ProductCartInterface[],
}>();

const emit = defineEmits<{
  (event: 'removeProduct', productId: string): void,
}>();

</script>

<template>
  <div class="d-flex flex-column">
    <CartProduct @remove-product="emit('removeProduct', $event)" v-for="product in cart" :key="product._id" :product="product"/>
  </div>
</template>

<style lang="scss" scoped>

</style>
