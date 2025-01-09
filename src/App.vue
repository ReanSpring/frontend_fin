<script setup>
import { RouterView } from 'vue-router';
import Cookies from 'universal-cookie';
import Login from './views/Login.vue';
import { ref } from 'vue';

const cookies = new Cookies();
const authToken = ref(cookies.get('authToken'));

const handleLogout = () => {
  cookies.remove('authToken', { path: '/' });
  authToken.value = null;
  location.reload();
};
</script>

<template>
  <div>
    <div v-if="authToken">
      <button @click="handleLogout" class="logout-button">Logout</button>
      <RouterView />
    </div>
    <Login v-else />
  </div>
</template>

<style scoped>
.logout-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.logout-button:hover {
  background-color: #d32f2f;
}
</style>