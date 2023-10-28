<script setup lang="ts">
import TheHeader from "@/components/Header.vue";
import TheFooter from "@/components/Footer.vue";
import Shop from "@/components/Shop/Shop.vue";
import Cart from "@/components/Cart/Cart.vue";
import {computed, reactive} from "vue";
import type {ProductInterface, ProductCartInterface, FiltersInterface, FilterUpdate} from "@/interfaces";
import dataProduct from './data/product';
import { DEFAULT_FILTERS } from "./data/filter";

const state = reactive<{
  products: ProductInterface[],
  cart: ProductCartInterface[],
  filters: FiltersInterface,
}>({
  products: dataProduct,
  cart: [],
  filters: {...DEFAULT_FILTERS},
});

const getProductById = (productId: number) => {
  return state.products.find((product) => product.id === productId);
}

const getCartProductById = (productId: number) => {
  return state.cart.find((cartProduct) => cartProduct.id === productId);
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
const addProductToCart = (productId: number) => {
  const product = getProductById(productId)
  if (product) {
    const productInCart = getCartProductById(product.id)
    if (productInCart) {
      updateProductStock(product, productInCart);
    } else {
      state.cart.push({...product, quantity: 1});
      product.stock--;
    }
  }
}

// Remove product from cart and restock it
const removeProductFromCart = (productId: number) => {
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
  <div class="app-container"  :class="{gridEmpty: cartEmpty}">
    <TheHeader class="header"/>
    <Shop
        @update-filters="updateFilter"
        :products="filteredProducts"
        class="shop"
        @add-to-cart="addProductToCart"
        :filters="filters"
    />
    <Cart v-if="!cartEmpty" :cart="cart" class="cart" @remove-product="removeProductFromCart"/>
    <TheFooter class="footer"/>
  </div>
</template>

<style lang="scss">
  @import "assets/base.scss";
  @import "assets/_debug.scss";

  .app-container {
    min-height: 100vh;
    display: grid;
    grid-template-areas: 'header header'
                          'shop cart'
                          'footer footer';
    grid-template-rows: 48px auto 48px;
    grid-template-columns: 75% 25%;
  }

  .gridEmpty {
    grid-template-areas: 'header' 'shop''footer';
    grid-template-columns: 100%;
  }

  .header {
    grid-area: header;
  }

  .shop {
    grid-area: shop;
  }

  .cart {
    grid-area: cart;
    border-left: var(--border);
    background-color: white;
  }

  .footer {
    grid-area: footer;
  }
</style>
