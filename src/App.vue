<script setup lang="ts">
import TheHeader from "@/components/Header.vue";
import TheFooter from "@/components/Footer.vue";
import AppShop from "@/features/shop/AppShop.vue";
import Admin from "@/features/admin/Admin.vue";
import type {Component as C} from "vue";
import {reactive} from "vue";
import type {Page} from "@/interfaces";
import {seed, seed40Articles} from "@/data/seed";

const state = reactive<{
  page : Page
}>({
  page : 'AppShop',
})

const pages: { [key: string]: C } = {
  AppShop,
  Admin,
};
const navigate = (page : Page) => {
  state.page = page;
}

// seed('products');
// seed40Articles('products');
</script>

<template>
  <div class="app-container">
    <TheHeader class="header" :page="state.page" @navigate="navigate"/>
    <div class="app-content">
      <Suspense>
        <Component :is="pages[state.page]" />
      </Suspense>
    </div>
    <TheFooter class="footer hide-xs"/>
  </div>
</template>

<style lang="scss">
  @import "assets/base.scss";
  @import "assets/_debug.scss";

  .app-container {
    height: 100vh;
    display: grid;
    grid-template-areas: 'header'
                          'app-content'
                          'footer';
    grid-template-rows: 48px auto 48px;
  }

  .header {
    grid-area: header;
  }

  .app-content {
    grid-area: app-content;
  }

  .footer {
    grid-area: footer;
  }
</style>
