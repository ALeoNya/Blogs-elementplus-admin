import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* Element-Plus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/* mavon Editor */
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

/* Icon Font图标 */
import '@/assets/iconfont/iconfont.css'
/* Icon Font图标组件 */
import Icon from "@/components/Icon.vue";


const app = createApp(App)

app.component('icon',Icon) //注册组件

app.use(createPinia())
app.use(router)
    .use(ElementPlus)
    // .use(VueMarkdownEditor)
    .use(mavonEditor)
    

app.mount('#app')
