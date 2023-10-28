<script setup lang="ts">
import ShopProductList from "@/components/Shop/ShopProductList.vue";
import type {ProductInterface} from "@/interfaces/product.interface";
import ShopFilter from "@/components/Shop/ShopFilter.vue";
import type {FiltersInterface, FilterUpdate} from "@/interfaces";

const props = defineProps<{
  products: ProductInterface[],
  filters: FiltersInterface,
}>();

const emit = defineEmits<{
  (event: 'addToCart', productId: number): void,
  (event: 'updateFilters', filterUpdate: FilterUpdate): void,
}>();
</script>

<template>
  <div class="d-flex flex-row">
    <ShopFilter
        @update-filters="emit('updateFilters', $event)"
        class="shop-filter"
        :filters="filters"
    />
    <ShopProductList
        class="flex-fill"
        :products="products"
        @add-to-cart="emit('addToCart', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.shop-filter {
  flex: 0 0 200px;
}
</style>