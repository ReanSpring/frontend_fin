<script setup>
import { RouterView } from "vue-router";
import Cookies from "universal-cookie";
import Login from "./views/Login.vue";
import Balance from "./views/BalanceView.vue";
import Navbar from "./layout/Navbar.vue";
import { ref } from "vue";

const cookies = new Cookies();
const authToken = ref(cookies.get("authToken"));
const showBalance = ref(false);
const showNewthing = ref(false);

const handleLogout = () => {
  cookies.remove("authToken", { path: "/" });
  authToken.value = null;
  location.reload();
};

const toggleBalanceView = () => {};
</script>

<template>
  <div>
    <div v-if="authToken">
      <Navbar />
    
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
.balance-button {
  position: absolute;
  top: 10px;
  right: 100px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.balance-button:hover {
  background-color: #388e3c;
}
</style>
