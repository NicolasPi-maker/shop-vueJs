<script setup lang="ts">
import TheHeader from "@/components/Header.vue";
import TheFooter from "@/components/Footer.vue";
import Shop from "@/components/Shop.vue";
import Cart from "@/components/Cart.vue";
</script>

<template>
  <div class="app-container">
    <TheHeader class="header b1"/>

    <Shop class="shop b2"/>
    <Cart class="cart b3"/>

    <TheFooter class="footer b4"/>
  </div>
</template>

<style lang="scss">
  @import "assets/base.scss";
  @import "assets/debug.scss";

  .app-container {
    min-height: 100vh;
    display: grid;
    grid-template-areas: 'header header'
                          'shop cart'
                          'footer footer';
    grid-template-rows: 48px auto 48px;
    grid-template-columns: 75% 25%;
  }

  .header {
    grid-area: header;
  }

  .shop {
    grid-area: shop;
  }

  .cart {
    grid-area: cart;
  }

  .footer {
    grid-area: footer;
  }
</style>
