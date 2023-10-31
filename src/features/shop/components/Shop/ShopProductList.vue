<script setup lang="ts">
import ShopProduct from "@/features/shop/components/Shop/ShopProduct.vue";
import type {ProductInterface} from "@/interfaces/product.interface";
import {inject, onUpdated, ref, watch} from "vue";
import {pageKey} from "@/shared/providerKey/pageKey";

const props = defineProps<{
  products: ProductInterface[],
  isMoreResults: boolean,
}>();

const emit = defineEmits<{
  (event: 'addToCart', productId: string): void,
  (event: 'incPage'): void,
}>();

const scrollableDiv = ref<HTMLDivElement | null>(null);
const page = inject(pageKey)!;

watch(page, () => {
  if(page.value === 1) {
    scrollableDiv.value?.scrollTo(0, 0);
  }
});


</script>

<template>
  <div ref=scrollableDiv class="d-flex flex-column p-20">
    <div class="grid p-20">
      <template v-for="product of products" :key="product._id">
        <ShopProduct  @add-to-cart="emit('addToCart', $event)"   :product="product" v-if="product.stock"/>
      </template>
    </div>
    <div class="d-flex flex-row align-items-center justify-content-center">
      <button v-if="isMoreResults" @click="emit('incPage')" class="btn btn-primary">Charger plus de produit</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/mixin.scss" as mixin;
  .grid {
    display: grid;
    @include mixin.xs {
      grid-template-columns: 1fr;
    }
    @include mixin.sm {
      grid-template-columns: 1fr;
    }
    @include mixin.md {
      grid-template-columns: 1fr 1fr;
    }
    @include mixin.lg {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @include mixin.xl {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    grid-auto-rows: 450px;
    gap: 20px;
  }
</style>