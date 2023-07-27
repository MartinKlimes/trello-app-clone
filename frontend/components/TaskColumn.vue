<script setup lang="ts">
import draggable from "vuedraggable";
import { Column, Task } from "types";
import { useKeyModifier } from "@vueuse/core";
import { useDataStore } from "../stores/dataStore";
import { storeToRefs } from "pinia";


const showTaskInput = ref(false);
const globalData = useDataStore()
const { showOverlay } = storeToRefs(globalData)

defineProps<{
  column: Column;
}>();
const alt = useKeyModifier("Alt");

const emit = defineEmits(["addTask", "deleteTask"]);
const showEditColumn = ref(false)

const showEditBtn = () => {
  showEditColumn.value = true;
  showOverlay.value = true
};
watch(showOverlay, () => {
  if (globalData.showOverlay === false) {
    showEditColumn.value = false;
  }
});

</script>

<template>

  <div :class="{'z-30' : showEditColumn}" class="columns p-5 pb-1 w-80  bg-gray-200 rounded shadow-xl relative">
    <div class="h-max ">
    <header class="font-bold mb-4 flex items-center justify-between relative">
      <div class="flex items-center">
        <Icon name="nimbus:drag-dots" class="drag-handler cursor-move text-gray-400" size="20" />
        <input
        :value="column.title"
        @keyup.enter="($event.target as HTMLInputElement).blur()"
        @blur="globalData.changeTitle(column.id, ($event.target as HTMLInputElement).value)"
        type="text"
        class="w-full bg-transparent no-outline focus:bg-white px-1 rounded-md title-input outline-none focus:outline-indigo-200"
        :id="`title-${column.id}`"
        />
      </div>
      <button @click="showEditBtn" class="hover:opacity-50"><Icon name="radix-icons:rows" class="p-1.5" size="25"/></button>

      <Transition name="pop">
        <TrelloEditColumn :id="column.id" v-if="showEditColumn"/>
      </Transition>
    </header>
    <div class="max-h-[780px] overflow-y-auto">
    <draggable
      v-model="column.tasks"
      :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
      item-key="id"
      :animation="150"
      handle=".drag-handler"
    >
      <template #item="{ element: task }: { element: Task }">
        <div>
        
            <TrelloBoardTask
              :columnId="column.id"
              :task="task"
              @deleteTask="emit('deleteTask', $event)"
            />
        </div>
      </template>
    </draggable>
    <TaskInput
      v-if="showTaskInput"
      @close="showTaskInput = false"
      :columnId="column.id"
    />
  </div>
    <footer>
      <button
        @click="showTaskInput = true"
        v-if="!showTaskInput"
        class="text-sm text-gray-400 py-2 block "
      >
        + Add a card
      </button>
    </footer>
  </div>
</div>
</template>

<style scoped>
.no-outline {
  border: none;
}
</style>