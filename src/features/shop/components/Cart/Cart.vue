<script setup lang="ts">
import CartProductList from "@/features/shop/components/Cart/CartProductList.vue";
import type {ProductCartInterface} from "@/shared/interfaces";
import {computed, reactive} from "vue";
import Calc from "@/components/Calc.vue";

const props = defineProps<{
  cart: ProductCartInterface[],
}>();

const emit = defineEmits<{
  (event: 'removeProduct', productId: string): void,
}>();

const getTotalPrice = computed(() => props.cart.reduce((acc, product) => {
    return acc + (product.price * product.quantity);
}, 0));

const state = reactive<{
  open: boolean,
}>({
  open: false,
});

</script>

<template>
  <div class="cart-container">
    <Transition mode="out-in">
      <div v-if="!state.open" @click="state.open = true">
        <button class="cart-holder d-flex flex-row justify-content-center align-items-center">
          <span class="tag">{{ cart.length }}</span>
          <i class="fa-solid fa-basket-shopping"></i>
        </button>
      </div>
      <div v-else>
        <Calc :open="state.open" @close="state.open = false" />
        <div class="p-20 d-flex flex-column card ml-20">
          <h2 class="mb-10">Panier</h2>
          <CartProductList class="flex-fill" :cart="cart" @remove-product="emit('removeProduct', $event)" />
          <button class="btn btn-success">Commander {{ getTotalPrice }}€</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.cart-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2;
}

.cart-holder {
  position: relative;
  background-color: var(--primary-1);
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--primary-2);
  }
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  i {
    color: var(--text-primary-color);
    font-size: 20px;
  }
}

.tag {
  position: absolute;
  top: -5px;
  right: 0;
  background-color: var(--danger-1);
  color: var(--text-primary-color);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 15px;
  font-size: 12px;
}

.v-leave-active,
.v-enter-active {
  transition: all .2s;
}

.v-leave-to,
.v-enter-from {
  transform: translateY(10px);
  opacity: 0;
}


</style>
