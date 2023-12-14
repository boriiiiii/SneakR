<script setup>

import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
  <header>
    <h1>REGISTER</h1>
  </header>
  <main>
    <h2>First name</h2>
    <input>
    <h2>Second name</h2>
    <input>
    <h2>E-mail</h2>
    <input>
    <h2>Password</h2>
    <input type="password">
    <button @click="router.push({name: 'home'})">Submit</button>
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