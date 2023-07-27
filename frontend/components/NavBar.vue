<script setup>
import { onClickOutside } from '@vueuse/core';


const user = useStrapiUser()
const { logout } = useStrapiAuth()

const showUserSetting = ref(false)
const target = ref(null)
onClickOutside(target, () => {
    setTimeout(() => {
        showUserSetting.value = false
    }, 0);
});

const logoutUser = () => {
    logout()
    navigateTo('login')
 
}
</script>


<template>

<button @click="showUserSetting =! showUserSetting" type="button" class="gap-1 items-center text-white  fixed z-20 right-4 top-2 flex mr-3  bg-gray-700 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
    <Icon name="mdi:account" size="25"/>
</button>
    <!-- Dropdown menu -->
<div  ref="target" v-if="showUserSetting" class="fixed my-4 z-20 right-5 top-6 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
<div class="px-4 py-3">
    <span class="block text-sm text-gray-900 dark:text-white">{{ user?.username }}</span>
    <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ user?.email }}</span>
</div>
<ul class="py-2" >
    <li>
    <!-- <a @click="globalData.deleteAll()" class="flex items-center cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 gap-1 dark:text-gray-200 dark:hover:text-white">Delete all<Icon name="material-symbols:delete-outline" /></a> -->
    <a  class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
    <a @click="logoutUser" class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
    </li>
</ul>
</div>

</template>
