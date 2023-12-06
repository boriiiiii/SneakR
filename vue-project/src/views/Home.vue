<template>
  <section>
    <h1>Je suis sur la page Home</h1>
    <div class="products-container">
      <div class="product" v-for="(item, index) in myData.slice(0, 25)" :key="index">
        <div class="item_image">
          <!-- <img :src="item.small_image_url"> -->
        </div>
        <div class="item_info">
          <div class="brand-product">{{ item.brand }}</div>
          <div class="name-product">{{ adjustProductName(item) }}</div>
          <div class="price-product">{{ item.retailPrice }}€</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      myData: [],
    };
  },
  mounted() {
    axios
        .get('http://localhost:3001/api/data')
        .then((response) => {
          this.myData = response.data;
          console.log(this.myData);
        })
        .catch((error) => {
          console.error('Erreur lors de la requête API :', error);
        });
  },
  methods: {
    adjustProductName(item) {
      // Votre logique pour ajuster le nom du produit en fonction de la marque
      return item.name.replace(new RegExp(item.brand, 'i'), '').trim();
    },
  },
};
</script>

<style scoped>
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px; /* Espace entre les produits */
}

.product {
  background-color: white;
  padding: 5px;
  border-radius: 5%;
  border: 1px solid black; /* Bordure de 1px noir */
  box-sizing: border-box;
}

.item_image {
  background-color: grey;
  height: 50%;
  border-radius: 5%;
}

.price-product {
  color: #0a0a0a;
  font-size: 0.8em;
}

.name-product {
  font-weight: bold;
  color: #0a0a0a;
}

.brand-product {
  font-weight: bold;
  color: #0a0a0a;
}

@media screen and (max-width: 600px) {
  /* Style spécifique pour les écrans de 600px de largeur et moins */
  .products-container {
    grid-template-columns: 1fr;
  }
}
</style>
