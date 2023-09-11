<!-- v-md-editor -->
<script lang="ts" setup>
const article = {
    content: '',
}
const handler = () => {
    console.log(article.content)
}
</script>

<template>
    <v-md-editor
        v-model="article.content"
        :disabled-menus="[]"
        height="400px">
    </v-md-editor>
    <button class="btn" @click="handler()"></button>
</template>
  
<style>
    .btn {
        height: 20px;
        width: 20px;
        background-color: white;
    }
    .btn:hover {
        background-color: rgb(225, 125, 255);
    }
</style>
  
  
  