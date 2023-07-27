<script setup lang="ts">
import { useDataStore } from '../stores/dataStore';

const { login, logout, register } = useStrapiAuth()
const user = useStrapiUser()

definePageMeta({
  middleware: 'auth'
})


const logoutUser = () => {
  logout()
  navigateTo('/login')
}
const globalData = useDataStore()

</script>
<template>
  <div class="relative bg-gradient-to-r dark:f from-cyan-500 to-blue-500 p-10 h-screen text-gray-800 overflow-x-auto ">
    <!-- <h1 class="text-4xl text-white mb-5 ">Trello</h1> -->
    <NavBar/>
    <TrelloBoard/>
  </div>
</template>
