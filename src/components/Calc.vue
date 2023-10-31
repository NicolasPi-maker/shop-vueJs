<script setup lang="ts">
  defineProps<{
    open : boolean,
    transparent? : boolean,
  }>()

  const emit = defineEmits<{
    (event: 'close'): void,
  }>()
</script>

<template>
  <Teleport v-if="open" to="body">
    <div :class="{ transparent }" @click="emit('close')" class="calc"></div>
  </Teleport>
</template>

<style scoped>
.calc {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #0000005e;
  z-index: 1;
}

.transparent {
  background-color: transparent;
}
</style>