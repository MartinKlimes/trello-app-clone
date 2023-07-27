<script setup>
import { useDataStore } from '../stores/dataStore';

const globalData = useDataStore()

const closeOverlay = () => {
  setTimeout(() => {
    
    
  }, 2000);
}
</script>

<template>


  <div
  key="-1"
  class="bg-black opacity-50 w-screen h-screen fixed top-0 left-0 z-10"
  @click="globalData.showOverlay = false"
  ></div>

</template>

<style>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

</style>
