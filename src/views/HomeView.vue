<template>
  <main class="flex justify-center flex-col px-4 sm:px-10 my-10">
    <!-- Header -->
    <h1
      class="text-2xl sm:text-4xl pacifico-regular font-medium w-full text-center mb-8"
    >
      Welcome {{ username }} to your Financial Management System
    </h1>
    <section class="grid gap-4 sm:gap-6 mb-10">
      <div
        v-for="income in incomes"
        :key="income.id"
        class="bg-gray-100 p-4 sm:p-6 rounded shadow-md flex flex-col sm:flex-row justify-between items-center"
      >
        <div class="flex flex-col w-full">
          <input
            :id="income.source"
            v-model="income.source"
            @change="updateIncome(income)"
            type="text"
            class="text-black font-semibold text-lg sm:text-xl bg-transparent border-gray-300 rounded px-2 mb-2"
          />
          <div class="flex items-center gap-2">
            <input
              :id="income.source"
              v-model.number="income.amount"
              @change="updateIncome(income)"
              type="number"
              class="text-red-600 font-semibold text-lg sm:text-xl w-20 sm:w-24 bg-transparent border-gray-300 rounded px-2"
            />
            <span class="text-red-600 font-semibold text-lg sm:text-xl"
              >USD</span
            >
            <div>
              <!-- show date -->
              <input
                :id="income.source"
                v-model="income.date"
                @change="updateIncome(income)"
                type="date"
                class="text-gray-600 bg-transparent border-gray-300 rounded px-2 mt-2"
              />
            </div>
          </div>
        </div>
        <button
          @click="deleteIncome(income.id)"
          class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300 mt-2 sm:mt-0 sm:ml-4"
        >
          Delete
        </button>
      </div>
      <div class=" w-full flex justify-center gap-3">
          <div class="flex justify-between gap-3 items-center mt-6">
          <button
            @click="prevPageIncome"
            :disabled="currentPageIncome === 0"
            class=" p-3 w-28 border rounded-lg font-semibold hover:border-gray-800 transition duration-300"
          >
            Previous
          </button>
          <div class="text-center">
            <span class="text-gray-700 font-semibold"
              >Page {{ currentPageIncome + 1 }} of {{ totalPagesIncome }}</span
            >
          </div>
          <button
            @click="nextPageIncome"
            :disabled="currentPage === totalPagesIncome - 1"
            class=" p-3 w-28 border rounded-lg font-semibold hover:border-gray-800 transition duration-300"
          >
            Next
          </button>
        </div>
        </div>
      <div
        class="bg-green-100 p-4 sm:p-6 rounded shadow-md flex items-center justify-between"
      >
        <span class="text-lg sm:text-xl font-bold text-gray-800"
          >💵 Total Income</span
        >
        <span class="text-xl sm:text-2xl font-bold text-green-600"
          >{{ totalIncomes }} USD</span
        >
      </div>
      <button
        @click="showAddIncome = true"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mt-4"
      >
        Add New Income
      </button>
      <div
        v-if="showAddIncome"
        class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded shadow-md w-11/12 sm:w-1/3">
          <h2 class="text-2xl font-bold mb-4">Add New Income</h2>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newIncomeSource"
              >Source</label
            >
            <input
              id="newIncomeSource"
              v-model="newIncome.source"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newIncomeAmount"
              >Amount</label
            >
            <input
              id="newIncomeAmount"
              v-model.number="newIncome.amount"
              type="number"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newIncomeDate"
              >Date</label
            >
            <input
              id="newIncomeDate"
              v-model="newIncome.date"
              type="date"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="flex justify-end">
            <button
              @click="addIncome"
              class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mr-2"
            >
              Add
            </button>
            <button
              @click="showAddIncome = false"
              class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
    <!-- Tab Navigation -->
    <div class="flex justify-center gap-2 sm:gap-4 mb-6">
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
        All Daily
      </button>
      <button
        :class="[
          'py-2 px-4 rounded',
          {
            'bg-blue-500 text-white': activeTab === 'week',
            'bg-gray-100 text-gray-800': activeTab !== 'week',
          },
        ]"
        @click="setActiveTab('week')"
      >
        Weekly
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
          class="bg-gray-100 p-4 sm:p-6 rounded shadow-md my-5 flex flex-col sm:flex-row justify-between items-start"
        >
          <!-- show day -->
          <input
            v-model="newDaily.day"
            type="text"
            class="text-black font-semibold text-lg sm:text-xl bg-transparent border-gray-300 rounded px-2"
          />
          <div>
            <input
              v-model.number="newDaily.amount"
              type="number"
              class="text-red-600 font-semibold text-lg sm:text-xl w-20 sm:w-24 bg-transparent border-gray-300 rounded px-2"
            />
            <span class="text-red-600 font-semibold text-lg sm:text-xl"
              >USD</span
            >
          </div>
          <textarea
            v-model="newDaily.source"
            placeholder="List your spending details"
            class="text-gray-600 bg-transparent w-full sm:w-96 border-gray-300 rounded px-2 mt-2 sm:mt-0"
          ></textarea>
          <button
            class="p-2 border rounded-md bg-blue-500 text-white mt-2 sm:mt-0"
            @click="postDaily"
          >
            Save
          </button>
        </div>
      </div>
      <div class="mt-5 lg:mt-0">
        <DailySpendingOverview
          :weekData="dailies"
          @update-success="fetchIncome"
        />
        <div class=" w-full flex justify-center gap-3">
          <div class="flex justify-between gap-3 items-center mt-6">
          <button
            @click="prevPage"
            :disabled="currentPage === 0"
            class=" p-3 w-28 border rounded-lg font-semibold hover:border-gray-800 transition duration-300"
          >
            Previous
          </button>
          <div class="text-center">
            <span class="text-gray-700 font-semibold"
              >Page {{ currentPage + 1 }} of {{ totalPages }}</span
            >
          </div>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages - 1"
            class=" p-3 w-28 border rounded-lg font-semibold hover:border-gray-800 transition duration-300"
          >
            Next
          </button>
        </div>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'week'">
      <WeeklySpending :weekData="weeks" />
    </div>
    <div v-if="activeTab === 'month'">
      <MonthlySpendingOverview
        :monthData="months"
        :downloadMonthlyReport="downloadMonthlyReport"
      />
      <div
        class="bg-blue-100 p-4 sm:p-6 rounded shadow-md flex items-center justify-between mt-4"
      >
        <span class="text-lg sm:text-xl font-bold text-gray-800"
          >🗓️ Remaining Balance</span
        >
        <span class="text-xl sm:text-2xl font-bold text-blue-600"
          >{{ totalSpending }} USD</span
        >
      </div>
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
import WeeklySpending from "../components/WeeklySpending.vue";
import Cookies from "universal-cookie";

// Initial data
const apiUrl = import.meta.env.VITE_APP_API_URL;
const cookies = new Cookies();
const token = cookies.get("authToken");
const username = cookies.get("username");
const showAddIncome = ref(false);

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const cambodia_airways = ref(270);
const prince_foundation = ref(50);
const total = ref(cambodia_airways.value + prince_foundation.value);
const incomes = ref([]);
const totalIncomes = ref(0);
const dailies = ref([]);
const totalDailies = ref(0);
const show = ref(false);
const years = ref([]);
const months = ref([]);
const weeks = ref([]);

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

const newDaily = ref({
  day: daysOfWeek[today],
  source: "",
  amount: 0,
  date: new Date().toLocaleDateString(),
});

// Watch for changes in income sources
watch([cambodia_airways, prince_foundation], () => {
  total.value = cambodia_airways.value + prince_foundation.value;
});

// Pagination variables
const currentPage = ref(0);
const totalPages = ref();
const pageSize = ref(9);

const currentPageIncome = ref(0);
const totalPagesIncome = ref();
const pageSizeIncome = ref(3);

// fetch data from API with axios
const fetchIncome = async (page = 0, size = 9, incomePage = 0, incomeSize = 3) => {
  const response = await fetch(`${apiUrl}/income?page=${incomePage}&size=${incomeSize}`, { headers });
  const response2 = await fetch(`${apiUrl}/daily?page=${page}&size=${size}`, { headers });
  const responseyear = await fetch(`${apiUrl}/yearly`, { headers });
  const responsemonth = await fetch(`${apiUrl}/monthly`, { headers });
  const responseweekly = await fetch(`${apiUrl}/weekly`, { headers });

  const dataIncomeResponse = await response.json();
  const dataIncome = dataIncomeResponse.data.content;
  const dataDailyResponse = await response2.json();
  const dataDaily = dataDailyResponse.data.content;
  const dataYear = (await responseyear.json()).data;
  const dataMonth = (await responsemonth.json()).data;
  const dataWeekly = (await responseweekly.json()).data;

  incomes.value = dataIncome;
  dailies.value = dataDaily;
  years.value = dataYear;
  months.value = dataMonth;
  weeks.value = dataWeekly;

  totalIncomes.value = incomes.value.reduce(
    (total, income) => total + income.amount,
    0
  );
  totalDailies.value = dailies.value.reduce(
    (total, daily) => total + daily.amount,
    0
  );
  currentPage.value = page;
  totalPages.value = dataDailyResponse.data.totalPages;
  currentPageIncome.value = incomePage;
  totalPagesIncome.value = dataIncomeResponse.data.totalPages;

  console.log(totalPages.value);

  // format date
  dailies.value.forEach((daily) => {
    daily.date = new Date(daily.date).toLocaleDateString();
  });
};

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    fetchIncome(currentPage.value + 1, pageSize.value, currentPageIncome.value, pageSizeIncome.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    fetchIncome(currentPage.value - 1, pageSize.value, currentPageIncome.value, pageSizeIncome.value);
  }
};

const nextPageIncome = () => {
  if (currentPageIncome.value < totalPagesIncome.value - 1) {
    fetchIncome(currentPage.value, pageSize.value, currentPageIncome.value + 1, pageSizeIncome.value);
  }
};

const prevPageIncome = () => {
  if (currentPageIncome.value > 0) {
    fetchIncome(currentPage.value, pageSize.value, currentPageIncome.value - 1, pageSizeIncome.value);
  }
};


const updateIncome = async (income) => {
  const response = await fetch(`${apiUrl}/income/${income.id}`, {
    method: "PUT",
    headers: headers,
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

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

// post daily spend
const postDaily = async () => {
  try {
    // Format the date in newDaily.value
    newDaily.value.date = formatDate(newDaily.value.date);

    const response = await fetch(`${apiUrl}/daily`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        day: newDaily.value.day,
        amount: newDaily.value.amount,
        source: newDaily.value.source,
        date: newDaily.value.date,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to post daily data:", errorData);
      return;
    }

    const data = await response.json();
    dailies.value.push(data);
    totalDailies.value = dailies.value.reduce(
      (total, daily) => total + daily.amount,
      0
    );
    newDaily.value = {
      day: daysOfWeek[today],
      source: "",
      amount: 0,
      date: new Date().toLocaleDateString(),
    };
    fetchIncome();
    show.value = false;
  } catch (error) {
    console.error("Error posting daily data:", error);
  }
};

// delete income
const deleteIncome = async (id) => {
  const isConfirmed = confirm("Are you sure you want to delete this income?");
  if (!isConfirmed) {
    return;
  }

  const response = await fetch(`${apiUrl}/income/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (response.ok) {
    incomes.value = incomes.value.filter((income) => income.id !== id);
    totalIncomes.value = incomes.value.reduce(
      (total, income) => total + income.amount,
      0
    );
  } else {
    const errorData = await response.json();
    console.error("Failed to delete income:", errorData);
  }
};

// Add new income
const newIncome = ref({
  source: "",
  amount: 0,
});

const addIncome = async () => {
  try {
    const response = await fetch(`${apiUrl}/income`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newIncome.value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to add new income:", errorData);
      return;
    }

    const data = await response.json();
    incomes.value.push(data);
    totalIncomes.value = incomes.value.reduce(
      (total, income) => total + income.amount,
      0
    );
    newIncome.value = {
      source: "",
      amount: 0,
    };
    fetchIncome();
    showAddIncome.value = false;
  } catch (error) {
    console.error("Error adding new income:", error);
  }
};

// calculate total spending 1 month with total income
const totalSpending = computed(() => {
  return totalIncomes.value - totalDailies.value;
});

// show Remaining balance
const remainingBalance = computed(() => {
  return total.value - totalDailies.value;
});

const downloadMonthlyReport = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/monthly/download/${id}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to download monthly report:", errorData);
      return;
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType !== "text/csv;charset=ISO-8859-1") {
      console.error("Unexpected content type:", contentType);
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const now = new Date();
    const month = months.value.find((month) => month.id === id).month;

    a.download = `monthly-report-${month}.csv`;

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading monthly report:", error);
  }
};

onMounted(fetchIncome);

// Manage the active tab state
const activeTab = ref("day");

// Function to switch active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<style scoped>
/* Optional: Add styles for tab buttons */
button {
  transition: background-color 0.3s;
}
</style>
