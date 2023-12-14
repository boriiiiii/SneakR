
import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const globalState = reactive({
    isLoggedIn: false
});

const app = createApp(App)

app.provide('globalState', globalState);
app.use(createPinia())
app.use(router)

app.mount('#app')
