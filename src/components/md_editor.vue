<!-- <template>
  <v-md-editor left-toolbar="undo redo | customToolbar" :toolbar="toolbar" />
</template>

<script lang="ts" setup>

    const toolbar = {
      customToolbar: {
        icon: 'toolbar图标类名',
        title: 'hover时显示的标题',
        action(editor:any) {
          editor.insert(function (selected:any) {
            const prefix = '(((';
            const suffix = ')))';
            const placeholder = '请输入文本';
            const content = selected || placeholder;

            return {
              text: `${prefix}${content}${suffix}`,
              selected: content,
            };
          });
        },
      },
    };
</script> -->
<template>
  <v-md-editor left-toolbar="undo redo | customToolbar1 customToolbar2 customToolbar3" :toolbar="toolbar" height="500px" v-model="text"/>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

// export default defineComponent({
  // setup() {
    const toolbar = {
      customToolbar1: {
        title: '基础工具栏',
        icon: 'v-md-icon-tip',
        action(editor: any) {
          editor.insert(function (selected: any) {
            const prefix = '(((';
            const suffix = ')))';
            const placeholder = '请输入文本';
            const content = selected || placeholder;

            return {
              text: `${prefix}${content}${suffix}`,
              selected: content,
            };
          });
        },
      },
    };
    // const text = '';
    // return {
    //   toolbar,
    //   text
    // };
  // },
// });
</script>
