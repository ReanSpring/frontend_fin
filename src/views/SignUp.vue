<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <!-- Card Container -->
    <div class="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-blue-600">💵 Fin</h1>
        <p class="text-gray-600 mt-2">
          Create an account to manage your.
        </p>
      </div>

      <!-- Signup Form -->
      <form @submit.prevent="handleSignup">
        <!-- Name Field -->
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Your Name"
            class="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="example@domain.com"
            class="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            class="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Signup Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>

      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-gray-600 text-sm">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "universal-cookie";

const apiUrl = import.meta.env.VITE_APP_API_URL;
const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const cookies = new Cookies();

const handleSignup = async () => {
  if (!name.value || !email.value || !password.value) {
    alert("Please fill in all fields.");
    return;
  }

  const signupData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });
    const data = await response.json();

    if (response.ok) {
      cookies.set("authToken", data.token, { path: "/" }); // Store the token in a cookie
      cookies.set("username", data.username, { path: "/" }); // Store the username in a cookie
      location.href = "/";
    } else {
      alert(data.message || "Signup failed. Please try again.");
    }
  } catch (error) {
    console.error("Error signing up:", error);
    alert("An error occurred. Please try again later.");
  }
};
</script>

<style scoped>
/* Additional styles for the signup page */
button {
  transition: background-color 0.3s;
}
</style>