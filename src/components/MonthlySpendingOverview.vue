<template>
  <section>
    <h2 class="text-3xl font-medium text-center mb-6 pacifico-regular">💰 Monthly Spending Overview</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card for Each Month -->
      <div
        v-for="entry in monthData"
        :key="entry.month"
        class="bg-white shadow-md p-6 rounded-lg border-t-4 border-blue-500"
      >
        <h3 class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
          📅 {{ entry.month }}
        </h3>
        <div class="mb-4">
          <h4 class="text-lg font-semibold text-gray-700">🗒️ Weekly Totals:</h4>
          <ul class="list-disc pl-5 mt-2 text-gray-800">
            <li v-for="(week, index) in entry.weekData" :key="index" class="mb-1">
              Week {{ index + 1 }}: {{ week.amount }} USD
            </li>
          </ul>
        </div>
        <div class="mt-4">
          <h4 class="text-lg font-semibold text-gray-700">💵 Total Amount for the Month:</h4>
          <p class="text-xl font-bold text-red-600 mt-1">{{ entry.totalAmount }} USD</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props to accept month data
const props = defineProps({
  monthData: {
    type: Array,
    required: true,
  }
});

// Function to calculate total monthly spending by summing weekly totals
const calculateMonthlyTotal = (weekData) => {
  return weekData.reduce((total, week) => total + week.amount, 0);
};

// Modify the monthData before rendering to include total calculated from weekly data
props.monthData.forEach((entry) => {
  entry.totalAmount = calculateMonthlyTotal(entry.weekData);
});
</script>