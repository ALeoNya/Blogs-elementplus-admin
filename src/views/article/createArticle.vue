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
    <div>
        <div class="btn-place">
            <button class="btn" @click="handler()">发布</button>
        </div>
    </div>
</template>
  
<style>
    .btn-place {
        height: 30px;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .btn {
        height: 100%;
        width: 100px;
        background-color: white;
    }
    .btn:hover {
        background-color: rgb(225, 125, 255);
    }
</style>
  
  
  