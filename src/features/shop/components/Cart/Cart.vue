<script setup lang="ts">
import CartProductList from "@/features/shop/components/Cart/CartProductList.vue";
import type {ProductCartInterface} from "@/interfaces";
import {computed} from "vue";

const props = defineProps<{
  cart: ProductCartInterface[],
}>();

const emit = defineEmits<{
  (event: 'removeProduct', productId: string): void,
}>();

const getTotalPrice = computed(() => props.cart.reduce((acc, product) => {
    return acc + (product.price * product.quantity);
}, 0));

</script>

<template>
  <div class="p-20 d-flex flex-column">
    <h2 class="mb-10">Panier</h2>
    <CartProductList class="flex-fill" :cart="cart" @remove-product="emit('removeProduct', $event)" />
    <button class="btn btn-success">Commander {{ getTotalPrice }}€</button>
  </div>
</template>

<style lang="scss" scoped>

</style>
