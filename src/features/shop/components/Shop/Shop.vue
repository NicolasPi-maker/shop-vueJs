<script setup lang="ts">
import ShopProductList from "@/features/shop/components/Shop/ShopProductList.vue";
import type {ProductInterface} from "@/interfaces/product.interface";
import ShopFilter from "@/features/shop/components/Shop/ShopFilter.vue";
import type {FiltersInterface, FilterUpdate} from "@/interfaces";
import {reactive} from "vue";
import Calc from "@/components/Calc.vue";

const props = defineProps<{
  products: ProductInterface[],
  filters: FiltersInterface,
  isMoreResults: boolean,
}>();

const emit = defineEmits<{
  (event: 'addToCart', productId: string): void,
  (event: 'updateFilters', filterUpdate: FilterUpdate): void,
  (event: 'incPage'): void,
}>();

const state = reactive<{
  open: boolean,
  isMobile: boolean,
}>({
  open: !matchMedia("(max-width: 575px)").matches,
  isMobile: matchMedia("(max-width: 575px)").matches,
});

</script>

<template>
  <div class="d-flex flex-row shop-container" >
    <Calc :open="state.open && state.isMobile" @close="state.open = false" :transparent="true" />
    <Transition>
      <ShopFilter
          v-if="state.open"
          @update-filters="emit('updateFilters', $event)"
          class="shop-filter"
          :filters="filters"
          :products="products"
      />
    </Transition>
    <div class="d-flex flex-column">
      <button @click="state.open = !state.open" class="btn btn-primary openBtnFilter d-flex flex-row justify-content-center align-items-center mt-20 ml-20 mr-20">
        <i class="fa-solid fa-magnifying-glass mr-10" style="color: white"></i>
        <span>Rechercher</span>
      </button>
      <ShopProductList
          class="flex-fill scrollable"
          :isMoreResults="isMoreResults"
          :products="products"
          @add-to-cart="emit('addToCart', $event)"
          @inc-page="emit('incPage')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/mixin.scss" as mixin;

.shop-container {
  position: relative;
}

.shop-filter {
  flex: 0 0 200px;
  height: calc(100vh - 96px);
  @include mixin.xs {
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    height: 100%;
    z-index: 2;
  }
}

.openBtnFilter {
  @include mixin.sm {
    display: none;
  }
}

.scrollable {
  overflow: auto;
  height: calc(100vh - 96px);
}

.v-leave-to,
.v-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.v-leave-active,
.v-enter-active {
  transition: all 0.3s;
}
</style>