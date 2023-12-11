<script setup>
import { useRouter } from "vue-router";
import { SneakerStore } from "@/stores/sneaker";

const store = SneakerStore();
const router = useRouter();

function removeFromWishlist(id){
  store.removeFromWhishlist(id)
}


</script>

<template>
  <div v-if="!store.whishlist.length" style="text-align: center">
    <h1>Empty Whishlist...</h1>
    <button @click="router.push({name: 'home'})">Back to catalog</button>
  </div>

  <div class="whishlist-items" v-else>
    <div class="whishlist-item" v-for="item in store.whishlist" :key="item.id">
      <div class="item-details">
        <img :src="item.small_image_url">
        <span>Brand : {{ item.brand }}</span>
        <span>Name : {{ item.name }}</span>
        <span>Price : {{ item.estimatedMarketValue }}</span>
        <span>Colorway : {{ item.colorway}}</span>
        <button @click="removeFromWishlist(item.id)">Remove</button>
      </div>
    </div>
  </div>

</template>

<style scoped>
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
</style>