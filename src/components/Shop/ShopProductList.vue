<script setup lang="ts">
import ShopProduct from "@/components/Shop/ShopProduct.vue";
import type {ProductInterface} from "@/interfaces/product.interface";

const props = defineProps<{
  products: ProductInterface[],
}>();

const emit = defineEmits<{
  (event: 'addToCart', productId: number): void,
}>();
</script>

<template>
  <div class="grid p-20">
    <template v-for="product of products" :key="product.id">
      <ShopProduct  @add-to-cart="emit('addToCart', $event)"   :product="product" v-if="product.stock"/>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 450px;
    gap: 20px;
  }
</style>