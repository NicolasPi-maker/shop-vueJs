<script setup lang="ts">
import TheHeader from "@/components/Header.vue";
import TheFooter from "@/components/Footer.vue";

import {seed, seed40Articles} from "@/shared/data/seed";


// seed('products');
// seed40Articles('products');
</script>

<template>
  <div class="app-container">
    <TheHeader class="header" />
    <div class="app-content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <Component :is="Component" />
          </Suspense>
        </template>
      </router-view>
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
