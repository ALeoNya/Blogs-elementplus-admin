<!-- v-md-editor -->
<script lang="ts" setup>
import { onMounted ,ref , onBeforeMount} from 'vue';
import { useRoute } from "vue-router"
const route = useRoute()

const title = ref(route.query.title)
const digest = ref(route.query.digest)
const date = ref(route.query.date)


onBeforeMount(()=>{
    console.log(route.query)
    article.content = JSON.stringify(route.query.digest) 

})

let article = {
    content: '',
}
const handler = () => {
    // console.log(route.query)
    // article.content = JSON.stringify(route.query.digest) 
}
</script>

<template>
    <p>Enter new title :</p>
    <el-input
        v-model="title"
        autosize
        type="textarea"
        placeholder="Please input"
    />
    <div style="margin: 20px 0" />
    <p>Enter new digest :</p>
    <el-input
        v-model="digest"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input"
    />
    <div style="margin: 20px 0" />
    <p>Enter the date :</p>
    <el-input
        v-model="date"
        class="w-50 m-2"
        placeholder="Pick a date"
      />
    <div style="margin: 20px 0" />

    <v-md-editor
        v-model="article.content"
        :disabled-menus="[]"
        height="400px">
    </v-md-editor>
    <div>
        <div class="btn-place">
            <button class="btn" @click="handler()">保存修改</button>
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
  
  
  