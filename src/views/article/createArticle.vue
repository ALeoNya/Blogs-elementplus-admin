<!-- v-md-editor
<script lang="ts" setup>
import { reactive, ref,onBeforeMount, } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute } from "vue-router"
import { getContent,save } from '@/apis/article'
import router from '@/router';
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

const article = {
    content: '',
}
const handler = () => {
    console.log(article.content)
}
</script>

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
    <div>
        <div class="btn-place">
            <button class="btn" @click="handler(ruleFormRef)">发布</button>
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
  
  
   -->

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

    <el-form-item prop="content">
        <v-md-editor
            v-model="article.content"
            :disabled-menus="[]"
            left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save emoji"
            height="400px">
        </v-md-editor>
    </el-form-item>
    
    </el-form>
    <el-button type="primary" @click="handler(ruleFormRef)">发布</el-button>

  </template>
  
<script lang="ts" setup>
    import { reactive, ref,onBeforeMount, } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { useRoute } from "vue-router"
    import { insert } from '@/apis/article'
    import router from '@/router';
    // import { ar } from 'element-plus/lib/locale/index.js';
    import Vue from 'vue';

    const route = useRoute()
    let article = ref({
        title: '',
        digest: '',
        date: '',
        content: ''
        }   
    )

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
    const checkContent = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input the content'))
        } else {
            callback()
        }
    }
    const ruleForm = reactive({
        title: '',
        date: '',
        digest: '',
        checkContent: ''
    })

    const rules = reactive<FormRules<typeof ruleForm>>({
    title: [{ validator: checkTitle, trigger: 'blur' }],
    date: [{type: 'date',required: true,message: 'Please pick a date',trigger: 'change',}],
    digest: [{ validator: checkDigest, trigger: 'blur' }],
    content: [{ validator: checkContent, trigger: 'blur' }],
    })

    const handler = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log(article.value.content)
            insert(
                article.value.content,
                article.value.title,
                article.value.digest,
                article.value.date,
            ).then(res=>{
                if(res.data) {
                    console.log('successfully to send')
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
  