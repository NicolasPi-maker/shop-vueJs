<template>
  <header class="px-20 d-flex flex-row align-items-center">
    <a href="" class="d-flex align-items-center mr-20">
      <img src="../assets/logo.svg" alt="">
      <span class="logo">Dyma</span>
    </a>
    <ul class="d-flex flex-row flex-fill">
      <li class="mr-10">
        <a href="">boutique</a>
      </li>
      <li>
        <a href="">Admin</a>
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

</script>


<style lang="scss" scoped>
  header {
    background-color: var(--primary-1);
    a {
      color: var(--text-primary-color);
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
</style>