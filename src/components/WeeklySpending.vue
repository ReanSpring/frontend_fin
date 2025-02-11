<template>
  <section>
    <h2 class="text-3xl font-medium text-center mb-6 pacifico-regular">📅 Weekly Spending Overview</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card for Each Week -->
      <div
        v-for="entry in weekData"
        :key="entry.id"
        class="bg-white shadow-md p-6 rounded-lg border-t-4 border-green-500"
      >
        <h3 class="text-2xl font-bold text-green-600 mb-4 flex items-center">
          Week {{ entry.week }}
        </h3>
        <div class="mb-4">
          <h4 class="text-lg font-semibold text-gray-700">🗒️ Daily Totals:</h4>
          <ul class="list-disc pl-5 mt-2 text-gray-800">
            <li v-for="daily in entry.dailies" :key="daily.id" class="mb-1">
              {{ daily.day }} ({{ daily.date }}): {{ daily.amount }} USD - {{ daily.source }}
            </li>
          </ul>
        </div>
        <div class="mt-4">
          <h4 class="text-lg font-semibold text-gray-700">💵 Total Amount for the Week:</h4>
          <p class="text-xl font-bold text-red-600 mt-1">{{ entry.amount }} USD</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props to accept week data
const props = defineProps({
  weekData: {
    type: Array,
    required: true,
  }
});
</script>