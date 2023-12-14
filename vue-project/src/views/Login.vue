<script setup>
import { ref, inject } from 'vue';
import {useRouter} from "vue-router";

const globalState = inject('globalState');
const router = useRouter();

const email = ref('');
const password = ref('');
const isLoggedIn = ref(false);

const predefinedCredentials = {
  email: "borisdouady@gmail.com",
  password: "jaifoiréjavoue!123"
};

const handleLogin = () => {
  if (email.value === predefinedCredentials.email && password.value === predefinedCredentials.password) {
    globalState.isLoggedIn = true;
    console.log("Login Successful!");
    router.push({name: 'home'})
  } else {
    alert("Invalid Credentials!");
  }
};
</script>

<template>
  <header>
    <h1>LOGIN</h1>
  </header>
  <main v-if="!isLoggedIn">
    <h2>E-mail</h2>
    <input v-model="email">
    <h2>Password</h2>
    <input type="password" v-model="password">
    <button @click="handleLogin">Submit</button>
    <button @click="router.push({name: 'register'})">Register</button>
  </main>
</template>

<style scoped>
* {
  font-family: ubuntu;
}

header{
  display:flex;
  justify-content: center;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button{
  margin-top: 20px;
  border-radius: 5px;
  background-color: blue;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>

