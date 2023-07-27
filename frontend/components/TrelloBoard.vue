<script setup lang="ts">
import type { Column } from "../types";
import { nanoid } from "nanoid";
import draggable from "vuedraggable";
import {useDataStore} from "../stores/dataStore"

const globalData = useDataStore()
await globalData.fetchData()

// const columns = ref<Column[]>([
//   {
//     title: "Backlog",
//     id: nanoid(),
//     tasks: [
//       {
//         title: "Create marketing landing pag Create marketing landing pageCreate marketing landing pagee",
//         createdAt: new Date(),
//         id: nanoid(),
//       },
//       {
//         title: "Develop cool new feature",
//         createdAt: new Date(),
//         id: nanoid(),
//       },
//       { title: "Fix page nav bug", createdAt: new Date(), id: nanoid() },
//       {
//         title: "Create marketing landing page",
//         createdAt: new Date(),
//         id: nanoid(),
//       },


//     ],
//   },
//   { title: "Selected for Dev", id: nanoid(), tasks: [] },
//   // { title: "In Progress", id: nanoid(), tasks: [] },
//   // { title: "QA", id: nanoid(), tasks: [] },
//   // { title: "Complete", id: nanoid(), tasks: [] },

// ]);

const addTask = (id: string, title: string) => {
  if (title != "") {
    const column = columns.value.find((column) => column.id === id);
    column?.tasks.push({
      title: title,
      createdAt: new Date(),
      id: nanoid(),
    });
  }
};

</script>

<template>
  <div class="sm:flex items-start gap-4 h-full ">
    <draggable 
    v-model="globalData.data"
    group="columns"
    item-key="id"
    :animation="150"
    handle=".drag-handler"
    class="sm:flex sm:space-x-4 sm:space-y-0 space-y-4 items-start "
    >
      <template #item="{ element: column }: { element: Column}">
        <TaskColumn
          :key="column.id"
          :column="column"
          @deleteTask="column.tasks = column.tasks.filter((task) => task.id !== $event)"
        />

      </template>
    </draggable>
    <button @click="globalData.addColumn" class="hover:bg-gray-100 mt-4 sm:mt-0 bg-white whitespace-nowrap  opacity-50 rounded-md px-2 py-1">+ Add another card</button>
  </div>
</template>
<style></style>
