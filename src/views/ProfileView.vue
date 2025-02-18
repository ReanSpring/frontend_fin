<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl relative">
      <div class="absolute inset-0 bg-cover bg-center rounded-lg opacity-20" style="background-image: url('https://via.placeholder.com/600x400');"></div>
      <div class="relative z-10 flex flex-col items-center">
        <div class="w-24 h-24 rounded-full shadow-lg border-4 border-gray-500 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'user']" class="text-4xl" />
        </div>
        <h2 class="text-2xl font-bold mt-4 text-gray-800">{{ username }}</h2>
        <p class="text-gray-600" v-if="profile">{{ profile.email }}</p>
      </div>
      <div class="relative z-10 mt-6" v-if="profile">
        <h3 class="text-xl font-semibold text-gray-800">Account Details</h3>
        <div class="mt-4 space-y-2">
          <p class="text-gray-600"><span class="font-bold">Username:</span> {{ profile.username }}</p>
          <p class="text-gray-600"><span class="font-bold">Member Since:</span> {{ profile.createdAt }}</p>
          <p class="text-gray-600"><span class="font-bold">Total Balance:</span> {{ profile.balance }}</p>
        </div>
      </div>
      <div class="relative z-10 mt-6 flex gap-2 justify-between">
        <button
          @click="editProfile"
          class="px-4 py-2 0 text-gray-700 w-full border rounded-md hover:border-gray-900 transition duration-300"
        >
          Edit Profile
        </button>
        <button
          @click="handleLogout"
          class="px-4 py-2  text-gray-700 w-full border rounded-md hover:border-gray-900 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'universal-cookie';

const router = useRouter();
const cookies = new Cookies();
const authToken = ref(cookies.get("authToken"));
const token = cookies.get("authToken");
const apiUrl = import.meta.env.VITE_APP_API_URL;
const profile = ref(null);

const editProfile = () => {
  router.push('/edit-profile');
};

const username = cookies.get('username');

const fetprofile = async () => {
  try {
    const response = await fetch(`${apiUrl}/auth/profile`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    profile.value = data.data;
    console.log(profile);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetprofile();
});

const handleLogout = () => {
  cookies.remove("authToken", { path: "/" });
  authToken.value = null;
  location.reload();
};
</script>

<style scoped>
/* Add any additional styling here */
</style>