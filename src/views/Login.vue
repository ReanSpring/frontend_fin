<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <!-- Card Container -->
    <div class="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-blue-600">💵 Fin</h1>
        <p class="text-gray-600 mt-2">
          {{ isSignup ? "Create an account to manage your finances." : "Welcome back! Log in to manage your finances." }}
        </p>
      </div>

      <!-- Login/Signup Form -->
      <form @submit.prevent="handleSubmit">
        <!-- Username Field (Only for Signup) -->
        <div v-if="isSignup" class="mb-4">
          <label for="username" class="block text-gray-700 font-medium">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
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
            class="w-full mt-2 p-2 border"
            :class="{'border-red-500': passwordError, 'border-gray-300': !passwordError}"
          />
        </div>

        <!-- Confirm Password Field (Only for Signup) -->
        <div v-if="isSignup" class="mb-4">
          <label for="confirmPassword" class="block text-gray-700 font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Re-enter your password"
            class="w-full mt-2 p-2 border"
            :class="{'border-red-500': passwordError, 'border-gray-300': !passwordError}"
            @input="validatePassword"
          />
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">Passwords do not match.</p>
        </div>

        <!-- Remember Me (Only for Login) -->
        <div v-if="!isSignup" class="flex items-center mb-4">
          <input
            type="checkbox"
            id="remember"
            v-model="rememberMe"
            class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="remember" class="text-gray-700">Remember me</label>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          :disabled="isSignup && passwordError"
        >
          {{ isSignup ? "Sign Up" : "Log In" }}
        </button>
      </form>

      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-gray-600 text-sm">
          {{ isSignup ? "Already have an account?" : "Don't have an account?" }}
          <router-link
            :to="isSignup ? '/login' : '/signup'"
            class="text-blue-600 hover:underline"
          >
            {{ isSignup ? "Log in here" : "Sign up here" }}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Cookies from "universal-cookie";

const apiUrl = import.meta.env.VITE_APP_API_URL;
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const passwordError = ref(false);
const rememberMe = ref(false);
const router = useRouter();
const route = useRoute();
const cookies = new Cookies();

// Detect if the current page is signup
const isSignup = computed(() => route.path === "/signup");

// Validate Passwords
const validatePassword = () => {
  passwordError.value = isSignup.value && password.value !== confirmPassword.value;
};

// Handle Login or Signup
const handleSubmit = async () => {
  if (!email.value || !password.value) {
    alert("Please enter email and password.");
    return;
  }

  if (isSignup.value) {
    if (!username.value) {
      alert("Please enter a username.");
      return;
    }
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }
  }

  const endpoint = isSignup.value ? "auth/signup" : "auth/login";
  const payload = isSignup.value
    ? { username: username.value, email: email.value, password: password.value }
    : { email: email.value, password: password.value };

  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (response.ok) {
      cookies.set("authToken", data.token, { path: "/" });
      cookies.set("username", data.username, { path: "/" });
      location.href = "/";
    } else {
      alert(data.message || "Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
};
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
</style>
