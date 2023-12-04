import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useSneakerStore = defineStore('sneaker', {
    state: () => {
      return{
        sneakers : [],
        status : "default"
      }
     },
    getters: {
      getSneakers: state => state.sneakers,
      getStatus : state => state.status
    },
    actions:{
      async fetchSneaker(){
        this.status = "fetching"
        this.sneakers = await axios({url : "http://54.37.12.181:1337/api/sneakers", method : "get"})
        this.status = "done"
      }
    }
  }
)
