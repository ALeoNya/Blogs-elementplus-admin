<!-- <template>
    <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
</template>
<script>
export default {
    methods: {
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               $vm.$img2Url(pos, url);
           })
        }
    }
}
</script>

<template>
    <mavon-editor ref="md" @imgAdd="imgAdd" @imgDel="imgDel"></mavon-editor>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const md = ref();
const imgAdd = async (pos:any, file:any) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data: url } = await axios({
        url: 'server url',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    md.value.$img2Url(pos, url);
};

const imgDel = () => {
    // 你的imgDel方法的实现
};
</script> -->
