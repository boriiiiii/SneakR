import { defineStore } from 'pinia'
import axios from 'axios'

export const SneakerStore = defineStore('sneaker', {
    state: () => {
      return{
            sneakers : [],
            whishlist : [],
            collection : []
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
        },

        addToWhishlist(sneaker){
            this.whishlist.push(sneaker)
        },

        addToCollection(sneaker){
            this.collection.push(sneaker)
        },

        removeFromWhishlist(id){
            this.whishlist = this.whishlist.filter((item) => item.id !== id)
        },

        removeFromCollection(id){
            this.collection = this.collection.filter((item) => item.id !== id)

        }
    }
  }
)
