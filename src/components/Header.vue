<template>

  <header class="px-20 d-flex flex-row align-items-center">
    <a href="" class="d-flex align-items-center mr-20">
      <img src="../assets/logo.svg" alt="">
      <span class="logo">Dyma</span>
    </a>
    <div class="d-flex flex-fill flex-row align-items-center actions-container">
      <ul class="d-flex flex-row flex-fill hide-xs">
        <li class="mr-10">
          <router-link to="/shop">Boutique</router-link>
        </li>
        <li>
          <router-link to="/admin">Admin</router-link>
        </li>
      </ul>
      <ul class="d-flex flex-row hide-xs">
        <li class="mr-10">
          <a href="">Inscription</a>
        </li>
        <li>
          <a href="">Connexion</a>
        </li>
      </ul>
      <div class="menu-xs-container">
        <Calc :open="state.open" @close="state.open = false" :transparent="true" />
        <i @click="state.open = !state.open" class="fa-solid fa-bars show-xs hide-sm" style="color: white"></i>
        <Transition>
          <ul @click="state.open = false" class="menu card" v-if="state.open">
            <li class="mr-10">
              <router-link to="/shop">Boutique</router-link>
            </li>
            <li>
              <router-link to="/admin">Admin</router-link>
            </li>
            <li class="mr-10">
              <a href="">Inscription</a>
            </li>
            <li>
              <a href="">Connexion</a>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import {reactive} from "vue";
  import Calc from "@/components/Calc.vue";

  const state = reactive<{
    open : boolean,
  }>({
    open : false,
  })
</script>

<style lang="scss" scoped>
@use "@/assets/mixin" as *;
@import "@/assets/base.scss";
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
  a.router-link-active {
    color: white;
    font-weight: bold;
  }

  .actions-container {
    @include xs {
      justify-content: end;
    }
  }

  .menu-xs-container {
    position: relative;
    z-index: 2;
  }

  .menu {
    position: absolute;
    top: 20px;
    right: 0;
    z-index: 2;
    li {
      padding: 10px 20px;
    }
    a {
      color: var(--text-color);
    }
  }

  .v-leave-to,
  .v-enter-from {
    opacity: 0;
    transform: translateX(-10px);
  }

  .v-leave-active,
  .v-enter-active {
    transition: all 0.4s;
  }

</style>