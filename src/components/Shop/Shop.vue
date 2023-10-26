<script setup lang="ts">
import ShopProductList from "@/components/Shop/ShopProductList.vue";
import type {ProductInterface} from "@/interfaces/product.interface";

const props = defineProps<{
  products: ProductInterface[],
}>();

const emit = defineEmits<{
  (event: 'addToCart', productId: number): void,
}>();
</script>

<template>
  <div>
    <ShopProductList :products="products" @add-to-cart="emit('addToCart', $event)" />
  </div>
</template>

<style lang="scss" scoped>

</style>