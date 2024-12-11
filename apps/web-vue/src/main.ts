import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import './style.scss'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// app.use(ElementPlus);
app.use(pinia)
app.use(router) // 注册路由
app.mount('#app')
