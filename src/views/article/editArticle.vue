<template>
    <el-form
      ref="ruleFormRef"
      :model="article"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
    <el-form-item label="title" prop="title">
    <el-input v-model="article.title" autocomplete="off" />
    </el-form-item>

    <el-form-item label="date" prop="date">
        <el-date-picker
            v-model="article.date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
        />
    </el-form-item>

    <el-form-item label="digest" prop="digest">
        <el-input v-model="article.digest" type="textarea" />
    </el-form-item>

    <el-form-item prop="digest">
        <v-md-editor
            v-model="content"
            :disabled-menus="[]"
            left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save emoji"
            height="400px">
        </v-md-editor>
    </el-form-item>
    
    </el-form>
    <el-button type="primary" @click="handler(ruleFormRef)">Submit</el-button>

  </template>
  
<script lang="ts" setup>
    import { reactive, ref,onBeforeMount, } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { useRoute } from "vue-router"
    import { getContent,save } from '@/apis/article'
    import router from '@/router';
    // import { ar } from 'element-plus/lib/locale/index.js';
    import Vue from 'vue';

    const route = useRoute()
    let article = ref()
    article.value = route.query

    const cid = ref(route.query.tid)
    const tid = ref(route.query.tid)
    const title = ref(route.query.title)
    const digest = ref(route.query.digest)
    const date = ref(route.query.date)
    const content = ref()
    const getData = () => {    
        getContent(Number(cid.value)).then(res=>{
            content.value = res.data.content
            console.log(content)
        })
    }

    onBeforeMount(()=>{
        getData() 
    })


    const ruleFormRef = ref<FormInstance>()

    const checkTitle = (rule: any, value: any, callback: any) => {
    if (value === '') {
        return callback(new Error('Please input the title'))
    } else {
        callback()
    }
    }

    const checkDigest = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the digese'))
    } else {
        callback()
    }
    }

    const ruleForm = reactive({
        title: '',
        date: '',
        digest: '',
    })

    const rules = reactive<FormRules<typeof ruleForm>>({
    title: [{ validator: checkTitle, trigger: 'blur' }],
    date: [{type: 'date',required: true,message: 'Please pick a date',trigger: 'change',}],
    digest: [{ validator: checkDigest, trigger: 'blur' }],
    })

    const handler = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            save(
            Number(cid.value),
            content.value,
            Number(tid.value),
            // title.value,
            article.value.title,
            article.value.digest,
            article.value.date,

            ).then(res=>{
                if(res.data) {
                    console.log('successfully to update')
                    router.push('/articleList')
                } else {
                    console.log('update faile')
                }
            })
            console.log('submit!')
            // router.push('/articleList')
        } 
        else {
            console.log('error submit!')
            return false
        }
    })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    }
</script>
  