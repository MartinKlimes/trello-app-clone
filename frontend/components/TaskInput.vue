<script setup lang="ts">
import { useDataStore } from '../stores/dataStore';
import { ID } from 'types';
const props = defineProps<{
  columnId: ID,
}>();

const task = ref("");
const emit = defineEmits(["close"]);

const globalData = useDataStore()

const addTask = () => {
  globalData.addTask(props.columnId, task.value)
  task.value = "";
  emit("close");
};
</script>

<template>
  <div class="my-3">
    <textarea
      autofocus
      placeholder="Enter a title for this card..."
      v-model="task"
      @keyup.enter="addTask"
      class="outline-none bg-white w-full flex items-start h-20 rounded shadow-inner border-t border-l border-gray-300 shadow-gray-200 p-1"
    ></textarea>
    <div class="flex gap-1 items-center mt-1">
      <button
        @click="addTask"

        class="btn btn-indigo"
      >
        Add card
      </button>
      <svg
        @click="emit('close')"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 cursor-pointer hover:opacity-50 fill-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  </div>
</template>
