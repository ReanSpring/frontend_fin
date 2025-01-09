<template>
  <section>
    <h2 class="text-3xl font-medium text-center mb-6 pacifico-regular">
      💰 Daily Spending Overview
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card for Each Day -->
      <div
        v-for="entry in weekData"
        :key="entry.id"
        class="bg-white shadow-md p-6 rounded-lg border-t-4 border-blue-500"
      >
        <div class="flex items-center justify-between">
          <h3 v-if="editingId === entry.id" class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
            📅
            <select v-model="editDay" class="w-32 p-2 border rounded">
              <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
            </select>
          </h3>
          <h3 v-else class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
            📅 {{ entry.day }}
          </h3>
          <h4 v-if="editingId === entry.id" class="text-lg font-semibold text-gray-700 pacifico-regular">
            <input v-model="editDate" type="date" class="p-2 border rounded" />
          </h4>
          <h4 v-else class="text-lg font-semibold text-gray-700 pacifico-regular">{{ entry.date }}</h4>
        </div>
        <div v-if="editingId === entry.id">
          <div class="mb-4">
            <h4 class="text-lg font-semibold text-gray-700">🗒️ Details:</h4>
            <textarea v-model="editDetail" class="w-full p-2 border rounded"></textarea>
          </div>
          <div class="mt-4">
            <h4 class="text-lg font-semibold text-gray-700">💵 Amount:</h4>
            <input v-model.number="editAmount" type="number" class="w-full p-2 border rounded" />
          </div>
          <button @click="saveEdit(entry)" class="mt-4 text-gray-600 border p-2 rounded">Save</button>
          <button @click="cancelEdit" class="mt-4 text-gray-600 p-2 mx-2 border rounded">Cancel</button>
        </div>
        <div v-else>
          <div class="mb-4">
            <h4 class="text-lg font-semibold text-gray-700">🗒️ Details:</h4>
            <p class="text-xl pacifico-regular text-gray-800 mt-1">
              {{ entry.detail }}
            </p>
          </div>
          <div class="mt-4">
            <h4 class="text-lg font-semibold text-gray-700">💵 Amount:</h4>
            <p class="text-xl font-bold text-red-600 mt-1">
              {{ entry.amount }} USD
            </p>
          </div>
          <button @click="editEntry(entry)" class="mt-4 border p-2 w-20 rounded pacifico-regular text-gray-400">Edit</button>
          <button @click="confirmDelete(entry)" class="mt-4 mx-2 border p-2 w-20 rounded pacifico-regular text-gray-400">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { defineProps } from 'vue';

// Define the props that will be passed from the parent component
const props = defineProps({
  weekData: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update-success']);

const editingId = ref(null);
const editDay = ref('');
const editDate = ref('');
const editDetail = ref('');
const editAmount = ref(0);

const editEntry = (entry) => {
  editingId.value = entry.id;
  editDay.value = entry.day;
  editDate.value = entry.date;
  editDetail.value = entry.detail;
  editAmount.value = entry.amount;
};

const cancelEdit = () => {
  editingId.value = null;
  editDay.value = '';
  editDate.value = '';
  editDetail.value = '';
  editAmount.value = 0;
};

// make day can select
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const saveEdit = async (entry) => {
  const updatedEntry = {
    ...entry,
    day: editDay.value,
    date: editDate.value,
    detail: editDetail.value,
    amount: editAmount.value,
  };

  const response = await fetch(`http://localhost:3000/dailies/${entry.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedEntry),
  });

  if (response.ok) {
    const updatedDaily = await response.json();
    const index = props.weekData.findIndex((i) => i.id === updatedDaily.id);
    props.weekData[index] = updatedDaily;
    cancelEdit();
    emit('update-success');
  } else {
    console.error('Failed to update daily entry');
  }
};

const confirmDelete = (entry) => {
  if (window.confirm('Are you sure you want to delete this entry?')) {
    deleteEntry(entry);
  }
};

const deleteEntry = async (entry) => {
  const response = await fetch(`http://localhost:3000/dailies/${entry.id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    props.weekData = props.weekData.filter((i) => i.id !== entry.id);
    emit('update-success');
  } else {
    console.error('Failed to delete daily entry');
  }
};
</script>