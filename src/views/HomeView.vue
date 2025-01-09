<template>
  <main class="flex justify-center flex-col px-10 mb-10">
    <!-- Header -->
    <h1 class="text-4xl pacifico-regular font-medium w-full text-center mb-8">
      Welcome back Sen Sunneng to your Financial Management System
    </h1>
    <section class="grid gap-6 mb-10">
      <div
        v-for="income in incomes"
        :key="income.id"
        class="bg-gray-100 p-6 rounded shadow-md"
      >
        <input
          :id="income.source"
          v-model.number="income.source"
          @change="updateIncome(income)"
          type="text"
          class="text-black font-semibold text-xl bg-transparent border-gray-300 rounded px-2"
        />
        <div class="flex items-center gap-2 mt-2">
          <input
            :id="income.source"
            v-model.number="income.amount"
            @change="updateIncome(income)"
            type="number"
            class="text-red-600 font-semibold text-xl w-24 bg-transparent border-gray-300 rounded px-2"
          />
          <span class="text-red-600 font-semibold text-xl">USD</span>
        </div>
      </div>
      <div
        class="bg-green-100 p-6 rounded shadow-md flex items-center justify-between"
      >
        <span class="text-xl font-bold text-gray-800">💵 Total Income</span>
        <span class="text-2xl font-bold text-green-600"
          >{{ totalIncomes }} USD</span
        >
      </div>
    </section>

    <!-- Tab Navigation -->
    <div class="flex justify-center gap-4 mb-6">
      <button
        :class="[
          'py-2 px-4 rounded',
          {
            'bg-blue-500 text-white': activeTab === 'day',
            'bg-gray-100 text-gray-800': activeTab !== 'day',
          },
        ]"
        @click="setActiveTab('day')"
      >
        Daily
      </button>
      <button
        :class="[
          'py-2 px-4 rounded',
          {
            'bg-blue-500 text-white': activeTab === 'month',
            'bg-gray-100 text-gray-800': activeTab !== 'month',
          },
        ]"
        @click="setActiveTab('month')"
      >
        Monthly
      </button>
      <button
        :class="[
          'py-2 px-4 rounded',
          {
            'bg-blue-500 text-white': activeTab === 'year',
            'bg-gray-100 text-gray-800': activeTab !== 'year',
          },
        ]"
        @click="setActiveTab('year')"
      >
        Yearly
      </button>
    </div>

    <!-- Dynamic Content Based on Active Tab -->
    <div v-if="activeTab === 'day'">
      <!-- click to create dailyspend -->
      <button
        class="p-2 border rounded-md bg-blue-500 text-white"
        @click="show = true"
      >
        Create Daily Spend
      </button>
      <div v-if="show === true">
        <div
          class="bg-gray-100 p-6 rounded shadow-md my-5 flex justify-between items-start"
        >
          <!-- show day -->
          <input
            v-model="newDaily.day"
            type="text"
            class="text-black font-semibold text-xl bg-transparent border-gray-300 rounded px-2"
          />

          <div>
            <input
            v-model.number="newDaily.amount"
            type="number"
            class="text-red-600 font-semibold text-xl w-24 bg-transparent border-gray-300 rounded px-2"
          />
          <span class="text-red-600 font-semibold text-xl">USD</span>
          </div>
          <textarea
            v-model="newDaily.detail"
            placeholder="List your spending details"
            class="text-gray-600 bg-transparent w-96   border-gray-300 rounded px-2"
          ></textarea>

          <button
            class="p-2 border rounded-md bg-blue-500 text-white"
            @click="postDaily"
          >
            Save
          </button>
        </div>
      </div>
      <DailySpendingOverview :weekData="dailies" @update-success="fetchIncome" />

      <div
        class="bg-blue-100 p-6 rounded shadow-md flex items-center justify-between mt-4"
      >
        <span class="text-xl font-bold text-gray-800"
          >🗓️ Total Weekly Spending</span
        >
        <span class="text-2xl font-bold text-blue-600"
          >{{ totalDailies }} USD</span
        >
      </div>
    </div>

    <div v-if="activeTab === 'month'">
      <MonthlySpendingOverview :monthData="months" />

    </div>
    <div v-if="activeTab === 'year'">
    <YearlySpendingOverview :yearDataList="years" />
    </div>
  </main>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import DailySpendingOverview from "../components/DailySpendingOverview.vue";
import MonthlySpendingOverview from "../components/MonthlySpendingOverview.vue";
import YearlySpendingOverview from "../components/YearlySpendingOverview.vue";
import { data } from "autoprefixer";

// Initial data
const cambodia_airways = ref(270);
const prince_foundation = ref(50);
const total = ref(cambodia_airways.value + prince_foundation.value);
const incomes = ref();
const totalIncomes = ref(0);
const dailies = ref();
const totalDailies = ref(0);
const show = ref(false);
const years = ref();
const months = ref();


const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = new Date().getDay();
console.log(years);

const newDaily = ref({
  day: daysOfWeek[today],
  detail: "",
  amount: 0,
});

// Watch for changes in income sources
watch([cambodia_airways, prince_foundation], () => {
  total.value = cambodia_airways.value + prince_foundation.value;
});

// fetch data from API with axios
const fetchIncome = async () => {
  const response = await fetch("http://localhost:3000/incomes");
  const response2 = await fetch("http://localhost:3000/dailies");
  const responseyear = await fetch("http://localhost:3000/dailies/calculate_years");
  const responsemonth = await fetch("http://localhost:3000/dailies/calculate_month");
  incomes.value = await response.json();
  dailies.value = await response2.json();
  years.value = await responseyear.json();
  months.value = await responsemonth.json();

  totalIncomes.value = incomes.value.reduce(
    (total, income) => total + income.amount,
    0
  );
  totalDailies.value = dailies.value.reduce(
    (total, daily) => total + daily.amount,
    0
  );

  // fomart date
  dailies.value.forEach((daily) => {
    daily.date = new Date(daily.date).toLocaleDateString();
  });
};

const updateIncome = async (income) => {
  const response = await fetch(`http://localhost:3000/incomes/${income.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(income),
  });
  const updatedIncome = await response.json();
  const index = incomes.value.findIndex((i) => i.id === updatedIncome.id);

  incomes.value[index] = updatedIncome;

  totalIncomes.value = incomes.value.reduce(
    (total, income) => total + income.amount,
    0
  );
};

// post daily spend
const postDaily = async () => {
  try {
    const response = await fetch("http://localhost:3000/dailies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDaily.value),
    });

    if (response.ok) {
      const daily = await response.json();
      dailies.value.push(daily);
      totalDailies.value = dailies.value.reduce(
        (total, daily) => total + daily.amount,
        0
      );

      // Clear form data
      newDaily.value = {
        day: daysOfWeek[new Date().getDay()],
        detail: "",
        amount: 0,
      };

      // Close form (assuming you have a variable to control form visibility)
      show.value = false;
      fetchIncome();
    } else {
      console.error("Failed to post daily data");
    }
  } catch (error) {
    console.error("Error posting daily data:", error);
  }
};

// update daily spend
const updateDaily = async (daily) => {
  const response = await fetch(`http://localhost:3000/dailies/${daily.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(daily),
  });
  const updatedDaily = await response.json();
  const index = dailies.value.findIndex((i) => i.id === updatedDaily.id);

  dailies.value[index] = updatedDaily;

  totalDailies.value = dailies.value.reduce(
    (total, daily) => total + daily.amount,
    0
  );
};

onMounted(fetchIncome);

// Data for yearly spending
const yearData = ref({
  year: "2025",
  months: [
    { month: "January", totalAmount: 200 },
    { month: "February", totalAmount: 180 },
    { month: "March", totalAmount: 220 },
    { month: "April", totalAmount: 190 },
    { month: "May", totalAmount: 210 },
    { month: "June", totalAmount: 230 },
    { month: "July", totalAmount: 240 },
    { month: "August", totalAmount: 250 },
    { month: "September", totalAmount: 220 },
    { month: "October", totalAmount: 240 },
    { month: "November", totalAmount: 260 },
    { month: "December", totalAmount: 280 },
  ],
  totalAmount: 0, // Initially 0, will be calculated
});

// Computed property to calculate total weekly spending
const totalWeeklySpending = computed(() => {
  return weekData.value.reduce((total, day) => total + day.totalAmount, 0);
});

// Computed property to calculate total monthly spending
const totalMonthlySpending = computed(() => {
  return monthData.value.reduce((total, month) => total + month.totalAmount, 0);
});

// Manage the active tab state
const activeTab = ref("day");

// Function to switch active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
};

// Compute total income
watch([cambodia_airways, prince_foundation], () => {
  total.value = cambodia_airways.value + prince_foundation.value;
});
</script>

<style scoped>
/* Optional: Add styles for tab buttons */
button {
  transition: background-color 0.3s;
}
</style>
