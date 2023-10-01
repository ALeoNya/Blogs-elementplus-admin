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
            left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image center code | save emoji"
            @upload-image="handleUploadImage"
            :toolbar="toolbar"
            height=250%>
        </v-md-editor>
    </el-form-item>
    
    </el-form>
    <el-button type="primary" @click="handler(ruleFormRef)">Submit</el-button>

  </template>
  
<script lang="ts" setup>
    import { reactive, ref,onBeforeMount, } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { useRoute } from "vue-router"
    import { getContent,save,uploadFile } from '@/apis/article'
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

    const toolbar = {
        center: {
        title: '居中',
        icon: 'v-md-icon-tip',
        action(editor: any) {
          editor.insert(function (selected: any) {
            const prefix = '::: align-center';
            const suffix = ':::';
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

    //上传本地图片
    const handleUploadImage = (event:any, insertImage:any, files:any) => {
        const formData = new FormData();
        formData.append('file', files[0]);
        // console.log(files);
        uploadFile(formData).then(res=>{
            // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
            insertImage({
                url: res.data.url,
                desc: res.data.desc,

                width: 'auto',
                margin: "100px",
                height: 'auto',
            })
        }).catch(error=>{
            console.log("上传文件失败,请重试")
        })
    }

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
  