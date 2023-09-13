<!-- v-md-editor -->
<script lang="ts" setup>
import { onMounted ,ref , onBeforeMount} from 'vue';
import { useRoute } from "vue-router"
import { getContent,save } from '@/apis/article'
import router from '@/router';
const route = useRoute()

const cid = ref(route.query.tid)
const tid = ref(route.query.tid)
const title = ref(route.query.title)
const digest = ref(route.query.digest)
const date = ref(route.query.date)
const content = ref()

const getData = () => {    
    getContent(Number(cid.value)).then(res=>{
        content.value = res.data.content
        // console.log(content)
    })
}

onBeforeMount(()=>{
    getData() 
})

let article = {
    content: '',
}

// 提交更新
const handler = () => {
    save(
        Number(cid.value),
        content.value,
        Number(tid.value),
        title.value,
        digest.value,
        date.value
        ).then(res=>{
        if(res.data) {
            console.log('successfully to update')
            router.push('/articleList')
        } else {
            console.log('update faile')
        }

    })
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
        v-model="content"
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
  
  
  