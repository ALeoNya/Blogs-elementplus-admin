<template>
    <el-form
      ref="ruleFormRef"
      :model="article"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Activity name" prop="title">
        <el-input v-model="title" />
      </el-form-item>
      <div style="margin: 20px 0" />
      <el-form-item label="Activity time" required>
        <el-form-item prop="date1">
        <el-date-picker
            v-model="date"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
        />
        </el-form-item>
      </el-form-item>
      <div style="margin: 20px 0" />
      <el-form-item label="Activity form" prop="digest">
        <el-input v-model="digest" type="textarea" />
      </el-form-item>
      <div style="margin: 20px 0" />
      <el-form-item label="" prop="">

      </el-form-item>

      <div style="margin: 20px 0" />
      <el-form-item>
        <!-- <el-button type="primary" @click="submitForm(ruleFormRef)">Save</el-button> -->
        <button class="btn" @click="handler()">保存修改</button>
      </el-form-item>
    </el-form>
    <v-md-editor
            v-model="content"
            :disabled-menus="[]"
            left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save emoji"
            height="400px">
        </v-md-editor>
  </template>
  
<script lang="ts" setup>
    import { reactive,ref ,onBeforeMount } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { useRoute } from "vue-router"
    import { getContent,save } from '@/apis/article'
    import router from '@/router';

    const route = useRoute()
    let article = ref()
    // article.value = route.query
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


    const formSize = ref('default')

    const ruleFormRef = ref<FormInstance>()

    const checkTitle = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the title'))
    }
    setTimeout(() => {
        if (value === '') {
        callback(new Error('Please input title'))
        } else {
        if (article.value.title.lenght < 3) {
            callback(new Error('title must be greater than 3 words'))
        } else {
            callback()
        }
        }
    }, 1000)
    }

    const checkDigest = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input the password'))
        }
    }
    const checkDate = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input the password again'))
        } else {
            callback()
        }
    }

    const ruleForm = reactive({
    title: '',
    digest: '',
    date: '',
    })

    const rules = reactive<FormRules<typeof ruleForm>>({
    title: [{ validator: checkTitle, trigger: 'blur' }],
    digest: [{ validator: checkDigest, trigger: 'blur' }],
    date: [{ validator: checkDate, trigger: 'blur' }],
    })

    const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
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
        console.log('submit!')
        } else {
        console.log('error submit!')
        return false
        }
    })
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