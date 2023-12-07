import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const SneakerStore = defineStore('sneaker', {
    state: () => {
      return{
        sneakers : [],
        status : "default"
      }
     },
    actions:{
        fetchProductFromDB(){
            axios
                .get('http://localhost:3001/api/data')
                .then((response) => {
                    this.sneakers = response.data;
                    // console.log(this.sneakers);
                })
                .catch((error) => {
                    console.error('Erreur lors de la requête API :', error);
                });
        }
    }
  }
)
