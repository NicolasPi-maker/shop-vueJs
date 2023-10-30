<script setup lang="ts">
import ShopProduct from "@/features/shop/components/Shop/ShopProduct.vue";
import type {ProductInterface} from "@/interfaces/product.interface";

const props = defineProps<{
  products: ProductInterface[],
}>();

const emit = defineEmits<{
  (event: 'addToCart', productId: string): void,
}>();
</script>

<template>
  <div class="grid p-20">
    <template v-for="product of products" :key="product._id">
      <ShopProduct  @add-to-cart="emit('addToCart', $event)"   :product="product" v-if="product.stock"/>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/mixin.scss" as mixin;
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    //@include mixin.sm {
    //  grid-template-columns: 1fr;
    //}
    //@include mixin.md {
    //  grid-template-columns: 1fr 1fr;
    //}
    //@include mixin.lg {
    //  grid-template-columns: 1fr 1fr 1fr;
    //}
    //@include mixin.xl {
    //  grid-template-columns: 1fr 1fr 1fr 1fr;
    //}
    grid-auto-rows: 450px;
    gap: 20px;
  }
</style>