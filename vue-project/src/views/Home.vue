<template>
  <div class="sneakers_list">
    <div
        class="sneaker"
        v-for="sneaker in store.sneakers"
    >
      {{sneaker.name}}
    </div>
  </div>
</template>

<script setup>
  import {onMounted} from "vue";
  import { SneakerStore } from "@/stores/sneaker";

  const store = SneakerStore()

  onMounted(() => {
    store.fetchProductFromDB()
    console.log('MOUNTED !')
  })


</script>
