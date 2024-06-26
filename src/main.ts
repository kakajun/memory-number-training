import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './styles/index.scss'
import 'uno.css'

import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)
app.use(router) // 使用路由

app.mount('#app')
