<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <!-- Card Container -->
    <div class="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-blue-600">💵 Fin</h1>
        <p class="text-gray-600 mt-2">
          Welcome back! Log in to manage your finances.
        </p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium"
            >Email Address</label
          >
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
          <label for="password" class="block text-gray-700 font-medium"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            class="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Remember Me -->
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            id="remember"
            v-model="rememberMe"
            class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="remember" class="text-gray-700">Remember me</label>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Log In
        </button>
      </form>

      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-gray-600 text-sm">
          Don't have an account?
          <router-link to="/register" class="text-blue-600 hover:underline"
            >Sign up</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "universal-cookie";

const email = ref("");
const password = ref("");
const router = useRouter();
const cookies = new Cookies();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert("Please enter both email and password.");
    return;
  }

  const loginData = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();

    if (response.ok) {
      cookies.set("authToken", data.token, { path: "/" }); // Store the token in a cookie
      // not use router push to navigate to the home page
      location.href = "/";
    } else {
      alert(data.message || "Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("An error occurred. Please try again later.");
  }
};
</script>

<style scoped>
/* Additional styles for the login page */
button {
  transition: background-color 0.3s;
}
</style>
