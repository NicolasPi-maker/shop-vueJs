<template>
  <header class="px-20 d-flex flex-row align-items-center">
    <a href="" class="d-flex align-items-center mr-20">
      <img src="../assets/logo.svg" alt="">
      <span class="logo">Dyma</span>
    </a>
    <ul class="d-flex flex-row flex-fill">
      <li class="mr-10" :class="{ active : page === 'AppShop'}">
        <a @click="emit('navigate', 'AppShop')">Boutique</a>
      </li>
      <li :class="{ active : page === 'Admin'}">
        <a @click="emit('navigate', 'Admin')">Admin</a>
      </li>
    </ul>
    <ul class="d-flex flex-row">
      <li class="mr-10">
        <a href="">Inscription</a>
      </li>
      <li>
        <a href="">Connexion</a>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
  import type {Page} from "@/interfaces";

  const props = defineProps<{
    page : Page
  }>()

  const emit = defineEmits<{
    (event: 'navigate', page: Page): void,
  }>();
</script>


<style lang="scss" scoped>
  header {
    background-color: var(--primary-1);
    a {
      color: var(--text-primary-color);
      cursor: pointer;
      img {
        width: 20px;
        margin-right: 5px;
      }
      .logo {
        font-weight: 700;
        font-size: 20px;
      }
    }
  }

  .active {
    a {
      color: white;
      font-weight: bold;
    }
  }
</style>