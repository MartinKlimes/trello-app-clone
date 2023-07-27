<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useDataStore } from '../stores/dataStore';
import { ID } from 'types';

const globalData = useDataStore()
defineProps<{
    id: ID
}>()
</script>


<template>
    <div class="absolute z-30 bg-white overflow-hidden flex flex-col top-0 left-60 transform translate-x-12 rounded-md w-[120px] items-start text-gray-400 font-semibold">
        <div @click="globalData.deleteColumn(id)" class="select-btn"><Icon icon="material-symbols:delete-outline"/>Delete</div>
        <div @click="globalData.clearColumn(id)" class="select-btn"><Icon icon="material-symbols:edit-outline" />Clear</div>
        <!-- <div @click="globalData.duplicateColumn(id)" class="select-btn"><Icon icon="material-symbols:edit-outline" />Duplicate</div> -->
    </div>
</template>
<style scoped>
.select-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    width: 100%;
    padding: 0.5rem;
    margin: 0;
    cursor: pointer;
}
.select-btn:hover {
    @apply bg-gray-100
}

</style>