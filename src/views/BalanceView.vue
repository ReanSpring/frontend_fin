<template>
  <div class="relative flex flex-col items-center min-h-[100vh] w-screen p-3 text-white">
    <div class="bg-white border mt-14 rounded-lg shadow-lg px-3 py-8 md:p-8 w-full max-w-7xl text-center">
      <div class="my-10">
        <h1 class="text-4xl font-bold uppercase mb-6 text-gray-800 pacifico-regular">Your Balance</h1>
        <p class="text-3xl font-bold text-green-600 uppercase my-10 transition duration-300 ease-in-out transform" :class="{ 'scale-110': balanceUpdated }">
          Current balance: <span class="text-red-500">{{ balance }} USD</span>
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-2 justify-between mb-4">
        <button @click="openModal('add')" class="pacifico-regular w-full px-6 py-3 border-2 border-green-600 text-gray-800 uppercase rounded-lg hover:text-gray-600 hover:bg-green-100 transition duration-300">
          Add balance
        </button>
        <button @click="openModal('subtract')" class="pacifico-regular w-full px-6 py-3 border-2 border-red-600 text-gray-800 uppercase rounded-lg hover:text-gray-600 hover:bg-red-100 transition duration-300 shadow-lg">
          Subtract balance
        </button>
      </div>
      <ul class="text-left mt-4">
        <li v-for="(transaction, index) in transactions" :key="index" class="mb-2 p-4 border rounded-lg bg-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <span :class="{ 'text-green-600 font-bold': transaction.type === 'ADD', 'text-red-600 font-bold': transaction.type === 'SUBTRACT' }">
              {{ transaction.type === "ADD" ? "+" : "-" }}{{ transaction.amount }} USD
            </span>
            <span class="text-gray-700 ml-2 font-thin">{{ transaction.reason }}</span>
            <div class="text-gray-500 text-sm">{{ transaction.date }}</div>
          </div>
          <div :class="{ 'bg-green-100 text-green-600': transaction.type === 'ADD', 'bg-red-100 text-red-600': transaction.type === 'SUBTRACT' }" class="px-3 py-1 rounded-full text-sm font-semibold mt-2 md:mt-0">
            {{ transaction.type === "ADD" ? "Add" : "Subtract" }}
          </div>
        </li>
      </ul>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div :class="['bg-white border p-6 rounded-lg shadow-lg w-full max-w-lg', modalType === 'add' ? 'border-green-500': 'border-red-500']">
        <h2 class="text-2xl font-bold mb-4">{{ modalType === "add" ? "Add Balance" : "Subtract Balance" }}</h2>
        <input v-model.number="transactionAmount" type="number" placeholder="Amount" :class="['px-4 py-2 border rounded mb-2 w-full focus:outline-none focus:ring-2 text-black', modalType === 'add' ? 'focus:ring-green-500 border-green-500' : 'focus:ring-red-500 border-red-500']" />
        <input v-model="transactionReason" placeholder="Reason" :class="['px-4 py-2 border rounded mb-2 w-full focus:outline-none focus:ring-2 text-black', modalType === 'add' ? 'focus:ring-green-500 border-green-500' : 'focus:ring-red-500 border-red-500']" />
        <div class="flex flex-col md:flex-row justify-between gap-2 mt-4">
          <button @click="submitTransaction" class="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-lg">Submit</button>
          <button @click="closeModal" class="w-full md:w-auto px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 shadow-lg">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Cookies from "universal-cookie";

const apiUrl = import.meta.env.VITE_APP_API_URL;
const cookies = new Cookies();
const token = cookies.get('authToken');

const balance = ref(0); // Initialize balance to 0
const balanceUpdated = ref(false);
const transactions = ref([]);
const transactionReason = ref("");
const transactionAmount = ref(0);
const isModalOpen = ref(false);
const modalType = ref("");
const router = useRouter();

const openModal = (type) => {
  modalType.value = type;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  transactionReason.value = "";
  transactionAmount.value = 0;
};

const fetchBalance = async () => {
  const response = await fetch(`${apiUrl}/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  transactions.value = data.data;
  if (transactions.value.length > 0) {
    balance.value = transactions.value[0].total; // Set balance to the total of the first transaction
  } else {
    balance.value = 0; // Set balance to 0 if there are no transactions
  }
  console.log(data.data);
};

onMounted(() => {
  fetchBalance();
});

const submitTransaction = async () => {
  if (transactionAmount.value > 0 && transactionReason.value) {
    const date = new Date().toLocaleString();
    const transactionType = modalType.value === "add" ? "ADD" : "SUBTRACT";
    const transactionData = {
      type: transactionType,
      amount: transactionAmount.value,
      reason: transactionReason.value,
    };

    // Update balance and transactions locally
    if (transactionType === "ADD") {
      balance.value += transactionAmount.value;
    } else {
      balance.value -= transactionAmount.value;
    }
    transactions.value.unshift({
      ...transactionData,
      date,
      total: balance.value,
    });

    // Post the transaction data to the server
    await fetch(`${apiUrl}/balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    });

    balanceUpdated.value = true;
    setTimeout(() => {
      balanceUpdated.value = false;
    }, 300);
    closeModal();
  }
};

const goBack = () => {
  router.back(); // Navigate to the previous page
};
</script>

<style scoped>
body {
  background-color: #1a202c;
}
</style>