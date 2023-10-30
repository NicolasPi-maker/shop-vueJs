<script setup lang="ts">
import ShopProductList from "@/features/shop/components/Shop/ShopProductList.vue";
import type {ProductInterface} from "@/interfaces/product.interface";
import ShopFilter from "@/features/shop/components/Shop/ShopFilter.vue";
import type {FiltersInterface, FilterUpdate} from "@/interfaces";

const props = defineProps<{
  products: ProductInterface[],
  filters: FiltersInterface,
}>();

const emit = defineEmits<{
  (event: 'addToCart', productId: string): void,
  (event: 'updateFilters', filterUpdate: FilterUpdate): void,
}>();

</script>

<template>
  <div class="d-flex flex-row">
    <ShopFilter
        @update-filters="emit('updateFilters', $event)"
        class="shop-filter"
        :filters="filters"
        :products="products"
    />
    <ShopProductList
        class="flex-fill scrollable"
        :products="products"
        @add-to-cart="emit('addToCart', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.shop-filter {
  flex: 0 0 200px;
  height: calc(100vh - 96px);
}

.scrollable {
  overflow: auto;
  height: calc(100vh - 96px);
}
</style>