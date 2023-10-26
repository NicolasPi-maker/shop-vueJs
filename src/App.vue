<script setup lang="ts">
import TheHeader from "@/components/Header.vue";
import TheFooter from "@/components/Footer.vue";
import Shop from "@/components/Shop/Shop.vue";
import Cart from "@/components/Cart/Cart.vue";
import {computed, reactive, ref} from "vue";
import type {ProductInterface, ProductCartInterface} from "@/interfaces";
import data from './data/product';

const state = reactive<{
  products: ProductInterface[],
  cart: ProductCartInterface[],
}>({
  products: data,
  cart: [],
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

const {products, cart} = state;
const cartEmpty = computed(() => !cart.length);

</script>

<template>
  <div class="app-container"  :class="{gridEmpty: cartEmpty}">
    <TheHeader class="header"/>
    <Shop :products="products" class="shop" @add-to-cart="addProductToCart"/>
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
