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
    }
  }
)
