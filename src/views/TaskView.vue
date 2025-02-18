<template>
  <div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-7xl w-full">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
        Task Manager
      </h1>
      <button
        @click="showForm = !showForm"
        class="w-full bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300 mb-6"
      >
        {{ showForm ? "Close" : "Add New Task" }}
      </button>
      <form v-if="showForm" @submit.prevent="addTask" class="mb-6">
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold">Task Name</label>
          <input
            v-model="taskName"
            type="text"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter task name"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold">Repeat</label>
          <select
            v-model="repeat"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          Add Task
        </button>
      </form>
      <div class="mt-8">
        <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Tasks</h2>
        <div class="task-grid">
          <div
            v-for="category in nonEmptyCategories"
            :key="category"
            class="mb-8 border-2 p-3 rounded-md"
          >
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
              {{ category.charAt(0).toUpperCase() + category.slice(1) }}
            </h3>
            <ul>
              <li
                v-for="task in filteredTasks(category)"
                :key="task.id"
                :class="['p-4 rounded-lg flex justify-between items-center']"
              >
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="task.completed"
                    class="mr-3 h-5 w-5 text-gray-800 border border-gray-300 rounded-full appearance-none checked:bg-gradient-to-r checked:from-blue-500 checked:to-green-500 checked:border-transparent"
                  />
                  <span
                    :class="{ 'line-through': task.completed }"
                    class="text-gray-800 font-medium"
                    >{{ task.name }}</span
                  >
                </div>
                <button
                  @click="removeTask(task.id)"
                  class="bg-red-500 text-white px-1.5 py-0 text-sm rounded-full hover:bg-red-600 transition duration-300"
                >
                  X
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const showForm = ref(false);
const taskName = ref("");
const repeat = ref("none");
const tasks = ref([]);

const taskCategories = ["none", "daily", "weekly", "monthly"];

const addTask = () => {
  const newTask = {
    id: Date.now(),
    name: taskName.value,
    repeat: repeat.value,
    completed: false,
  };
  tasks.value.push(newTask);
  taskName.value = "";
  repeat.value = "none";
  showForm.value = false;
};

const removeTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id);
};

const filteredTasks = (category) => {
  return tasks.value.filter((task) => task.repeat === category);
};

const nonEmptyCategories = computed(() => {
  return taskCategories.filter((category) => filteredTasks(category).length > 0);
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
.task-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>