declare module '@kangc/v-md-editor';
declare module '@kangc/v-md-editor/lib/theme/vuepress.js';
declare module '@kangc/v-md-editor/lib/preview';
declare module '@kangc/v-md-editor/lib/plugins/emoji/index';
declare module 'prismjs';
declare module '@kangc/v-md-editor/lib/plugins/align';

declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
  }