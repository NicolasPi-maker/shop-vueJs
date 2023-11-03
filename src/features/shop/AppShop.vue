<script setup lang="ts">
import Shop from "@/features/shop/components/Shop/Shop.vue";
import Cart from "@/features/shop/components/Cart/Cart.vue";
import type { FilterUpdate } from "@/shared/interfaces";
import {useProducts} from "@/features/shop/store/productStore";
import {useCart} from "@/features/shop/store/cartStore";

const productStore = useProducts();
productStore.fetchProducts();
const cartStore = useCart();

const updateFilter = (filterUpdate: FilterUpdate) => {
  productStore.updateFilter(filterUpdate);
}
const filteredProducts = () => {
  return productStore.filteredProducts;
}
const addProductToCart = (productId : string) => {
  cartStore.addProductToCart(productId);
}

const removeProductFromCart = (productId: string) => {
  cartStore.removeProductFromCart(productId);
}
const incPage = () => productStore.incPage();

productStore.$onAction(({ name, after, args }) => {
  if(name === 'updateFilter' && !args[0].search) {
    after(() => {
      productStore.page = 1;
      productStore.products = [];
      productStore.fetchProducts();
    })
  } else if (name === 'incPage') {
      after(() => {
        productStore.fetchProducts();
      })
  }
})
</script>

<template>
  <div class="d-flex flex-column">
    <Shop
        @inc-page="incPage"
        @update-filters="updateFilter"
        :products="filteredProducts()"
        :isMoreResults="productStore.moreResults"
        @add-to-cart="addProductToCart"
        :filters="productStore.filters"
        :page="productStore.page"
    />
    <Cart v-if="!cartStore.cartEmpty" :cart="cartStore.cart" @remove-product="removeProductFromCart"/>
  </div>
</template>

<style scoped>
</style>