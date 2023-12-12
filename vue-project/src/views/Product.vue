<script setup>
  import { computed } from "vue";
  import { SneakerStore } from "@/stores/sneaker";
  import { useRoute,useRouter } from "vue-router";

  const store = SneakerStore()

  const router = useRouter()
  const route = useRoute()

  const selectedProduct = computed(() => {
    return store.sneakers.find((item) => item.id === Number(route.params.id));
  });

  function adjustProductName(item) {
    return item.name.replace(new RegExp(item.brand, 'i'), '').trim();
  }

  function addToCollection(){
    store.addToCollection(selectedProduct.value)
    router.push({name: 'collection'})
  }

  function addToWhishlist(){
    store.addToWhishlist(selectedProduct.value)
    router.push({name: 'whishlist'})
  }

</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <button @click="router.push({name: 'home'})">Back</button>
  <div class="products">
      <div class="product-image">
        <img :src="selectedProduct.small_image_url">
      </div>
      <div class="product-details">
        <h2>{{ selectedProduct.brand }}</h2>
        <p>{{ adjustProductName(selectedProduct) }}</p>
        <p>{{ selectedProduct.retailPrice }}€</p>
        <button @click="addToWhishlist" ><i class="fa-solid fa-heart"></i></button>
        <button @click="addToCollection" ><i class="fa-solid fa-check"></i></button>
      </div>
  </div>


</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,700;1,400&display=swap');

*{
  font-family: ubuntu;
}

.products{
  display: flex;
  margin-top: 50px;
}

.product-image{
  margin-right: 24px;
}

</style>
