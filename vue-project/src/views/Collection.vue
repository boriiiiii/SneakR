<script setup>
import { useRouter } from "vue-router";
import { SneakerStore } from "@/stores/sneaker";

const store = SneakerStore();
const router = useRouter();

function removeFromCollection(id){
  store.removeFromCollection(id)
}


</script>

<template>
  <div v-if="!store.collection.length" style="text-align: center">
    <h1>Empty Collection...</h1>
    <button @click="router.push({name: 'home'})">Add one from catalog</button>
  </div>

  <div class="collection-items" v-else>
    <button @click="router.push({name: 'home'})">Back</button>
    <div class="collection-item" v-for="item in store.collection" :key="item.id">
      <div class="item-details">
        <img v-if="item.small_image_url === 'true'" src="../assets/default_sneaker.png">
        <img v-else :src="item.small_image_url">
        <span>Brand : {{ item.brand }}</span>
        <span>Name : {{ item.name }}</span>
        <span>Price : {{ item.estimatedMarketValue }}</span>
        <span>Colorway : {{ item.colorway}}</span>
        <button @click="removeFromCollection(item.id)">Remove</button>
      </div>
    </div>
  </div>

</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,700;1,400&display=swap');

*{
  font-family: ubuntu;
}

.item-details{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;
}

.item-details img{
  width: 20%;
}

img {
  width: 350px;
  height: 350px;
}

</style>