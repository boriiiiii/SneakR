import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from "@/views/Product.vue";
import Whishlist from "@/views/Whishlist.vue";
import Collection from "@/views/Collection.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/whishlist',
      name: 'whishlist',
      component: Whishlist
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router
