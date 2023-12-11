<script setup>
import { onMounted, ref, computed } from "vue";
import { SneakerStore } from "@/stores/sneaker";
import { useRouter } from "vue-router";

const store = SneakerStore();
const router = useRouter();
const searchQuery = ref('');

onMounted(() => {
  store.fetchProductFromDB();
  console.log('MOUNTED !');
});

function adjustProductName(item) {
  return item.name.replace(new RegExp(item.brand, 'i'), '').trim();
}

function addToCollection(){
  router.push({name: 'collection'})
}

function addToWhishlist(){
  router.push({name: 'whishlist'})
}

const goToProductPage = (id) => {
  router.push({ name: 'product', params: { id } });
}

const filteredSneakers = computed(() => {
  return store.sneakers.filter(sneaker =>
      sneaker.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      sneaker.brand.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <div>
    <div class="header">
      <img src="@/assets/logo_sneaker.png">
      <input class="filter" v-model="searchQuery" type="text" placeholder="Search...">
      <div class="collection">
        <button @click="addToWhishlist" ><i class="fa-solid fa-heart"></i></button>
        <button @click="addToCollection" ><i class="fa-solid fa-check"></i></button>
      </div>
    </div>

    <h1 class="title">SNEAKERS COLLECTION</h1>

    <div class="sneakers_list">
      <div class="sneaker"
           v-for="(sneaker, index) in filteredSneakers.slice(0, 25)"
           :key="index"
           @click="goToProductPage(sneaker.id)">
        <img :src="sneaker.small_image_url">
        <h2>{{ sneaker.brand }}</h2>
        <p>{{ adjustProductName(sneaker) }}</p>
        <p>{{ sneaker.retailPrice }}€</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,700;1,400&display=swap');

  *{
    font-family: ubuntu;
  }

  .sneakers_list{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .sneaker{
    flex-basis: 28%;
    margin: 8px;
    padding: 16px;
    box-shadow: 0px 0px 14px 1px #e6e6e6;
    cursor: pointer;
  }

  .sneaker img {
    width: 70%;
    align-items: center;
    margin: 0 auto;
  }

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header img {
    width: 150px;
    height: 150px;
  }

  .collection button{
    margin: 40px ;
    cursor: pointer;
  }

  .title {
    text-align: center;
  }

  input{
    width: 50%;
    font-weight: bold;
  }
</style>