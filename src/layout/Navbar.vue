<template>
  <nav class="bg-gray-800 p-4 sticky top-0 z-50">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-2xl font-bold">
        Finance System
      </div>
      <div class="hidden md:flex space-x-4">
        <router-link to="/" class="text-gray-300 hover:text-white">Home</router-link>
        <router-link to="/balance" class="text-gray-300 hover:text-white">Balance</router-link>
        <!-- <router-link to="/task" class="text-gray-300 hover:text-white">Task</router-link> -->
        <router-link to="/newthing" class="text-gray-300 hover:text-white">NewThings</router-link>
        <router-link to="/profile" class="text-gray-300 hover:text-white">Profile</router-link>


      </div>
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-gray-300 hover:text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isMenuOpen" class="md:hidden">
      <router-link to="/" class="block text-gray-300 hover:text-white p-2">Home</router-link>
      <router-link to="/balance" class="block text-gray-300 hover:text-white p-2">Balance</router-link>
      <!-- <router-link to="/task" class="block text-gray-300 hover:text-white p-2">Task</router-link> -->
        <router-link to="/newthing" class="block text-gray-300 hover:text-white p-2">NewThings</router-link>
      <router-link to="/profile" class="block text-gray-300 hover:text-white p-2">Profile</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Add any additional styling here */
</style>