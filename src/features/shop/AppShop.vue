<script setup lang="ts">
import Shop from "@/features/shop/components/Shop/Shop.vue";
import Cart from "@/features/shop/components/Cart/Cart.vue";
import {computed, reactive, watchEffect} from "vue";
import type {ProductInterface, ProductCartInterface, FiltersInterface, FilterUpdate} from "@/interfaces";
import { DEFAULT_FILTERS } from "./data/filter";
import {fetchProduct} from "@/shared/services/product.service";

const state = reactive<{
  products: ProductInterface[],
  cart: ProductCartInterface[],
  filters: FiltersInterface,
}>({
  products: [],
  cart: [],
  filters: {...DEFAULT_FILTERS},
});

watchEffect(async () => {
  const fetchedProducts = await fetchProduct(state.filters);
  if(Array.isArray(fetchedProducts)) {
    state.products = fetchedProducts;
  } else {
    state.products = [fetchedProducts];
  }
})
const getProductById = (productId: string) => {
  return state.products.find((product) => product._id === productId);
}

const getCartProductById = (productId: string) => {
  return state.cart.find((cartProduct) => cartProduct._id === productId);
}

// On add product to cart update stock remaining and add quantity to product in cart
const updateProductStock = (product : ProductInterface, productInCart : ProductCartInterface) => {
  if(product.stock > 0) {
    product.stock--;
    productInCart.quantity++;
  } else {
    console.log('Stock épuisé');
  }
}

// Add product to cart if not already in cart, else update stock remaining and add quantity to product in cart
const addProductToCart = (productId: string) => {
  const product = getProductById(productId)
  if (product) {
    const productInCart = getCartProductById(product._id)
    if (productInCart) {
      updateProductStock(product, productInCart);
    } else {
      state.cart.push({...product, quantity: 1});
      product.stock--;
    }
  }
}

// Remove product from cart and restock it
const removeProductFromCart = (productId: string) => {
  const product = getProductById(productId);
  const productInCart = getCartProductById(productId);
  if(product && productInCart) {
    if(productInCart.quantity !== 1) {
      product.stock++;
      productInCart.quantity--;
    } else {
      product.stock += productInCart.quantity;
      state.cart.splice(state.cart.indexOf(productInCart), 1);
    }
  }
}

let {products, cart, filters} = state;

const updateFilter = (filterUpdate: FilterUpdate) => {
  if(filterUpdate.search !== undefined) {
    filters.search = filterUpdate.search;
  } else if(filterUpdate.priceRange) {
    filters.priceRange = filterUpdate.priceRange;
  } else if(filterUpdate.category) {
    filters.category = filterUpdate.category;
  } else {
    filters.search = DEFAULT_FILTERS.search;
    filters.priceRange = DEFAULT_FILTERS.priceRange;
    filters.category = DEFAULT_FILTERS.category;
  }
}

const filteredProducts = computed(() => {
  return products.filter((product) => {
    if(
        product.title.toLowerCase().startsWith(filters.search.toLowerCase())
        && product.price >= filters.priceRange.min
        && product.price <= filters.priceRange.max
        && (filters.category === 'all' || product.category === filters.category)
    ) {
      return true;
    } else {
      return false;
    }
  });
});

const cartEmpty = computed(() => !cart.length);

</script>

<template>
  <div class="shop-container" :class="{ 'grid-empty' : cartEmpty }">
    <Shop
        @update-filters="updateFilter"
        :products="state.products"
        class="shop"
        @add-to-cart="addProductToCart"
        :filters="filters"
    />
    <Cart v-if="!cartEmpty" :cart="cart" class="cart" @remove-product="removeProductFromCart"/>
  </div>
</template>

<style scoped>
.shop-container {
  display: grid;
  grid-template-columns: 75% 25%;
}

.cart {
  background-color: white;
  border-left: var(--border);
}

.grid-empty {
  grid-template-columns: 100%;
}
</style>