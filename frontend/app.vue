<script setup>
import { useDataStore } from './stores/dataStore';


const globalData = useDataStore()

</script>
<template>
  <div class="dark">
    <Transition name="overlay">
      <ModalOverlay v-if="globalData.showOverlay"/>
    </Transition>
    <NuxtPage/>
   
  </div>
</template>
