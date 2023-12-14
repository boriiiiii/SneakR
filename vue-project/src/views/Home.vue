<script setup>
import { onMounted, ref, computed, inject } from "vue";
import { SneakerStore } from "@/stores/sneaker";
import { useRouter } from "vue-router";

const globalState = inject('globalState');
const store = SneakerStore();
const router = useRouter();
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = 24;

onMounted(() => {
  store.fetchProductFromDB();
  console.log('MOUNTED !');
});

function adjustProductName(item) {
  return item.name.replace(new RegExp(item.brand, 'i'), '').trim();
}

function addToCollection(sneakerId){
  const sneakerToAdd = store.sneakers.find(s => s.id === sneakerId);
  if (sneakerToAdd) {
    console.log("Ajouté à la collection: ", sneakerId);
    store.addToCollection(sneakerToAdd);
    console.log(store.collection);
    router.push({name: 'collection'});
  }
}

function addToWhishlist(sneakerId){
  const sneakerToAdd = store.sneakers.find(s => s.id === sneakerId);
  if (sneakerToAdd) {
    console.log("Ajouté à la wishlist: ", sneakerId);
    store.addToWhishlist(sneakerToAdd);
    console.log(store.whishlist);
    router.push({name: 'whishlist'});
  }
}


const goToProductPage = (id) => {
  router.push({ name: 'product', params: { id } });
}

const filteredSneakers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return store.sneakers
      .filter(sneaker =>
          sneaker.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          sneaker.brand.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      .slice(start, end);
});

function changePage(step) {
  const newPage = currentPage.value + step;
  if (newPage > 0 && newPage <= Math.ceil(store.sneakers.length / pageSize)) {
    currentPage.value = newPage;
  }
}

</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <div>
    <div class="header">
      <img src="@/assets/logo_sneaker.png">
      <input class="filter" v-model="searchQuery" type="text" placeholder="Search...">
      <div class="collection">
        <button @click="router.push({name: 'whishlist'});;" ><i class="fa-solid fa-heart"></i></button>
        <button @click="router.push({name: 'collection'});" ><i class="fa-solid fa-check"></i></button>
        <button v-if="globalState.isLoggedIn === true"><i class="fa-solid fa-user"></i></button>
        <button v-else @click="router.push({name: 'login'})"><i class="fa-solid fa-right-to-bracket"></i></button>
      </div>
    </div>

    <h1 class="title">SNEAKERS COLLECTION</h1>

    <div class="sneakers_list">
      <div class="sneaker"
           v-for="(sneaker, index) in filteredSneakers"
           :key="index"
           @click="goToProductPage(sneaker.id)">
        <img v-if="sneaker.small_image_url === 'true'" src="../assets/default_sneaker.png">
        <img v-else :src="sneaker.small_image_url">
        <h2>{{ sneaker.brand }}</h2>
        <p>{{ adjustProductName(sneaker) }}</p>
        <p>{{ sneaker.estimatedMarketValue }}€</p>
        <div class="icons-top-right">
          <button @click.stop="addToWhishlist(sneaker.id)"><i class="fa-solid fa-heart"></i></button>
          <button @click.stop="addToCollection(sneaker.id)"><i class="fa-solid fa-check"></i></button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button @click="changePage(-1)" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }} </span>
      <button @click="changePage(1)" :disabled="currentPage * pageSize >= store.sneakers.length">Suivant</button>
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,700;1,400&display=swap');

  *{
    font-family: ubuntu;
  }

  button{
    cursor: pointer;
  }

  .sneakers_list{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .sneaker{
    position: relative;
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
    //position: fixed;
    //top: 0;
    //width: 100%;
    //background-color : white;
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

  .pagination {
    text-align: center;
    margin-top: 20px;
  }

  .pagination button {
    margin: 0 10px;
  }

  .icons-top-right {
    position: absolute;
    top: 10px;
    right: 10px;
    /* Autres styles si nécessaire */
  }
</style>