import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* Element-Plus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// /* v-md-Editor */
// import VueMarkdownEditor from '@kangc/v-md-editor';
// import '@kangc/v-md-editor/lib/style/base-editor.css';

// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// import Prism from 'prismjs';

// import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
// import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

// // /* 居中 */
// import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';

/* mavon Editor */
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


// VueMarkdownEditor.use(vuepressTheme, {
//   Prism,
// })
// .use(createAlignPlugin())
// .use(createEmojiPlugin());

const app = createApp(App)

app.use(createPinia())
app.use(router)
    .use(ElementPlus)
    // .use(VueMarkdownEditor)
    .use(mavonEditor)

app.mount('#app')
