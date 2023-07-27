<script setup lang="ts">
import { useDataStore } from "../stores/dataStore";
import { Task, ID } from "types";
import { storeToRefs } from "pinia";

const globalData = useDataStore();
const { showOverlay } = storeToRefs(globalData);
const props = defineProps<{
  task: Task;
  columnId: ID;
}>();

const colors = ref(["#22d3ee", "#a3e635", "#e879f9", "#facc15", "#fca5a5"]);

const emit = defineEmits(["deleteTask"]);
const focused = ref(false);
const showEditIcon = ref(false);
const editTask = ref(false);
const editableText = ref(false);

const showEditBtn = () => {
  editTask.value = true;
  showOverlay.value = true;
};
watch(showOverlay, () => {
  if (globalData.showOverlay === false) {
    editTask.value = false;
  }
});

const editText = (e: Event) => {
  globalData.changeTaskTitle(
    props.columnId,
    props.task.id,
    (e.target as HTMLInputElement).textContent
  );
  editableText.value = false;
};

const toggleLabel = (color: string) => {
  if (props.task.labels.some((label) => label.name === color)) {
    globalData.deleteLabel(props.columnId, props.task.id, color)
  }else{
    globalData.addLabel(props.columnId, props.task.id, color)
  }
}
</script>

<template>
  <div
    @focus="focused = true"
    @blur="focused = false"
    tabindex="0"
    @mouseover="showEditIcon = true"
    @mouseleave="showEditIcon = false"
    :title="new Date(task.createdAt).toLocaleDateString()"
    class="task flex min-h-[49px] justify-between items-center relative bg-white mb-1 px-1 py-2 rounded shadow-sm hover:bg-gray-100 border-b border-gray-400"
    :class="{ 'z-30': editTask }"
  >
    <!-- <figure class="max-h-52 sm:max-h-36 overflow-hidden flex items-center">
    <img src="/img/img1.jpg" alt="walking in forrest">
  </figure> -->

    <div class="flex flex-col relative">
      <div class="flex ml-5" >
        <span
          v-show="editTask"
          class="w-8 h-2 mr-2 rounded-full  hover:opacity-100 cursor-pointer "
          :style="{ backgroundColor: color }"
          :class="[task.labels.some((label) => label.name === color) ? 'opacity-100 shadow-sm shadow-black' : 'opacity-30']"
          @click="toggleLabel(color)"
          v-for="color in colors"
        ></span>
        <span v-show="!editTask"
          class="w-8 h-2 mr-2 rounded-full items-start"
          :style="{ backgroundColor: label.name }"
          v-for="label in task.labels"
        ></span>
        <!-- <span class="w-8 h-2 bg-blue-300 rounded-full"></span> -->
      </div>

      <span class="flex items-center">
        <DragHandle v-show="!editTask" />
        <p
          :class="{ 'pl-1 pr-5 -translate-x-1': editableText }"
          @blur="editText($event)"
          :contenteditable="editableText"
          @dblclick="editableText = true"
          class="border-none outline-indigo-400"
        >
          {{ task.title }}
        </p>
      </span>
    </div>

    <button
      @click="showEditBtn(task.id)"
      class="opacity-50 hover:bg-gray-300 rounded-md p-0.5"
      v-show="showEditIcon && !editTask && !showOverlay"
    >
      <Icon name="carbon:edit" size="24" />
    </button>
  </div>

  <Transition name="pop">
    <TrelloPopup :taskId="task.id" :columnId="columnId" v-show="editTask" />
  </Transition>

  <!-- <Transition name="overlay">
  <ModalOverlay v-if="showOverlay" @click="showOverlay = false"/>
</Transition> -->
</template>

<style>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.1s ease-in;
}

.pop-enter-from,
.pop-leave-to {
  transform: translateX(-25%);
  opacity: 0;
}
</style>

<style>
.sortable-drag .task {
  transform: rotate(5deg); /* Equal to rotateZ(45deg) */
}

.sortable-ghost .task {
  position: relative;
}
.sortable-ghost .task::after {
  content: "";
  @apply absolute top-0 bottom-0 right-0 left-0 bg-slate-300 rounded;
}
.task:focus,
.task:focus-visible {
}
</style>
