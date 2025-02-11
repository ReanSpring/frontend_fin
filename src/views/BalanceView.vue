<template>
  <div class="relative flex flex-col items-center justify-center h-[100vh] w-screen p-6  text-white">
    <button @click="goBack" class="absolute top-4 left-4 px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-300 shadow-lg">
      Back
    </button>
    <div class="bg-white border text-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <h1 class="text-4xl font-bold mb-6">Balance</h1>
      <p class="text-2xl text-green-600 mb-6 transition duration-300 ease-in-out transform" :class="{ 'scale-110': balanceUpdated }">
        Current balance: {{ balance }} USD
      </p>
      <button @click="addBalance" class="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 mb-4 shadow-lg">
        Add balance
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const balance = ref(1000); // Replace with actual balance fetching logic
const balanceUpdated = ref(false);
const router = useRouter();

const addBalance = () => {
  balance.value += 100; // Replace with actual logic to add balance
  balanceUpdated.value = true;
  setTimeout(() => {
    balanceUpdated.value = false;
  }, 300);
};

const goBack = () => {
  router.back(); // Navigate to the previous page
};
</script>