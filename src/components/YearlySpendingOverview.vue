<template>
  <section>
    <h2 class="text-3xl font-medium text-center mb-6 pacifico-regular">💰 Yearly Spending Overview</h2>
    <div v-for="(yearData, index) in yearDataList" :key="index" class="bg-white shadow-md p-6 rounded-lg border-t-4 border-blue-500 mb-6">
      <h3 class="text-2xl font-bold text-blue-600 mb-4">📅 Year: {{ yearData.yearKey }}</h3>
      <div class="mb-4">
        
        <ul class="list-disc pl-5 mt-2 text-gray-800">
          <li v-for="(month, index) in yearData.months" :key="index" class="mb-1">
            {{ month.month }}: {{ month.amount }} USD
          </li>
        </ul>
      </div>
      <div class="mt-4">
        <h4 class="text-lg font-semibold text-gray-700">💵 Total Yearly Amount:</h4>
        <p class="text-xl font-bold text-red-600 mt-1">{{ calculateYearlyTotal(yearData.months) }} USD</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props to accept an array of year data
const props = defineProps({
  yearDataList: {
    type: Array,
    required: true,
  }
});

// Function to calculate the total yearly amount by summing monthly totals
const calculateYearlyTotal = (months) => {
  if (!months) return 0;
  return months.reduce((total, month) => total + month.amount, 0);
};
</script>