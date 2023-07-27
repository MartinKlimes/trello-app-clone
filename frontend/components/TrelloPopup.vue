<script setup lang="ts">
import { useDataStore } from '../stores/dataStore';
import { ID } from 'types';

const globalData = useDataStore()
const props = defineProps<{
  taskId: ID;
  columnId: ID
}>()


</script>


<template >
<div 
    class="sm:absolute sm:m-0 z-20 sm:left-80 relative space-y-1 text-white transform sm:-translate-y-14"
>
    <div @click="globalData.duplicateTask(columnId, taskId)" class="popup-btn">Duplicate</div>
    <div class="popup-btn" @click="globalData.deleteTask(columnId, taskId)" >
    Delete
    </div>
</div>
</template>
<style scoped>
.popup-btn {
  @apply text-sm duration-75 ease-in transform px-3 py-1 w-max bg-black opacity-70 hover:opacity-100 cursor-pointer rounded-md;
}

.popup-btn:hover {
  @apply translate-x-1;
}

</style>