import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* Element-Plus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';  // highlightjs
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});


const app = createApp(App)

app.use(createPinia())
app.use(router)
    .use(ElementPlus)
    .use(VMdEditor)

app.mount('#app')
