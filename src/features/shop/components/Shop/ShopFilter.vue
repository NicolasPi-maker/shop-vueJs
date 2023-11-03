<script setup lang="ts">
import type {Category, FiltersInterface, FilterUpdate, ProductInterface} from "@/shared/interfaces";
import {computed} from "vue";

  const props = defineProps<{
    filters: FiltersInterface,
    products: ProductInterface[],
  }>();

  const emit = defineEmits<{
    (event: 'updateFilters', filterUpdate: FilterUpdate): void,
  }>();

  const nbrOfProducts = computed(() => {
    return props.products.length;
  })

</script>

<template>
  <div class="p-20 d-flex flex-column">
    <div class="d-flex flex-column flex-fill">
      <section class="mb-20">
        <h3 class="mb-10">Rechercher</h3>
        <input :value="filters.search" @input="emit('updateFilters', { search: ($event.target as HTMLInputElement).value })" type="text" placeholder="Rechercher">
      </section>
      <section class="mb-20">
        <h3 class="mb-10">Trier par prix</h3>
        <div class="mb-10"
          v-for="priceRange of [
            {min:0, max: 10000},
            {min:800, max: 1000},
            {min:1000, max: 1500},
            {min:1500, max: 2000},
            {min:2000, max: 10000},
          ]" :key="priceRange.min"
        >
          <input
              :checked="filters.priceRange.min === priceRange.min"
              type="radio"
              @input="emit('updateFilters', { priceRange })"
              name="priceRange" :id="priceRange.min.toString()"
          >
          <label :for="priceRange.min.toString() ">{{
              priceRange.min === 0 ?
                  'Tous les prix' : priceRange.min === 2000 ?
                      'plus de 2000€' : priceRange.min + '€ - ' + priceRange.max + '€'
            }}</label>
        </div>
      </section>
      <section class="mb-20">
        <h3 class="mb-10">Trier par categories</h3>
        <p
            class="category"
            :class="{ active: filters.category === category }"
            v-for="category in ['all', 'gamer', 'desktop', 'streaming'] as Category[]"
            @click="emit('updateFilters', { category })" :key="category"
        >{{ category.charAt(0).toUpperCase() + category.slice(1) }}</p>
      </section>
    </div>
    <small class="mb-5">Nombre de résultat : <strong>{{ nbrOfProducts }}</strong></small>
    <button class="btn btn-danger" @click="emit('updateFilters', {})">Supprimer les filtres</button>
  </div>
</template>

<style lang="scss" scoped>
  .active {
    background-color: var(--primary-1);
    color: white;
    font-weight: bold;
  }

  .category {
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px 0;
    transition: .2s ease-in-out;
    &:hover {
      background-color: var(--primary-1);
      color: white;
    }
  }
</style>