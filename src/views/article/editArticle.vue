<template>
    <el-form
      ref="ruleFormRef"
      :model="article"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
    <el-form-item label="标题" prop="标题">
    <el-input v-model="data.articleTitle" autocomplete="off" />
    </el-form-item>

    <!-- <el-form-item label="创建日期" prop="创建日期">
        <el-date-picker
            v-model="article.createTime"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
        />
    </el-form-item> -->

    <el-form-item label="描述" prop="描述">
        <el-input v-model="data.articleAbstract" type="textarea" />
    </el-form-item>

    <el-form-item label="文章内容" prop="文章内容">
        <!-- <v-md-editor
            v-model="content"
            :disabled-menus="[]"
            left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image center code | save emoji"
            @upload-image="handleUploadImage"
            :toolbar="toolbar"
            height=250%>
        </v-md-editor> -->
        <mavon-editor
            ref=md 
            v-model="data.articleContent"
            style="height: 100%;width: 100%"
            @imgAdd="imgAdd"
            @imgDel="imgDel">
        </mavon-editor>  <!-- 增删图片的两个方法：imgAdd&imgDel -->    
    </el-form-item>
    </el-form>
    
    <el-button type="primary" @click="handler(ruleFormRef)">Submit</el-button><!-- 提交按钮 -->

  </template>
  
<script lang="ts" setup>
    import { reactive, ref, } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { useRoute } from "vue-router"
    import { getContent,save,uploadFile } from '@/apis/article'
    import router from '@/router';
    import type { Article } from '@/pojo/article';

    // 获取是一个页面从router传过来的值
    const route = useRoute()
    let article = route.query
    console.log("编辑页面接收的数据为：")
    console.log(article)
    let data = ref({
        id: article.id,
        articleTitle: article.articleTitle,
        articleAbstract: article.articleAbstract,
        articleContent: article.articleContent,
        isDelete: article.isDelete
    }) as unknown as Article
    // 使用响应式变量避免v-model输入卡顿
    const articleTitle = ref(article.articleTitle)
    const articleAbstract = ref(article.articleAbstract)
    const articleContent = ref(article.articleContent)

    const ruleFormRef = ref<FormInstance>()

    // 
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
    const md = ref();
    const imgAdd = async (pos:any, file:any) => {
        const formData = new FormData();
        formData.append('file', file);
        uploadFile(formData).then((res) => {
            md.value.$img2Url(pos, res.data.url);
        })
    }
    //删除本地图片
    const imgDel = () => {

    }

    //表单提交
    const handler = (formEl: FormInstance | undefined) => {
    if (!formEl) return  //表单不存在直接返回
    formEl.validate((valid) => {
        if (valid) {
            let article = data.value
            // save()保存
            save(article).then(res=>{
                if(res.data) {
                    // console.log('更新成功，正在跳转...')
                    console.log(res.data)
                    router.push('/articleList')
                } else {
                    console.log(res.data)
                    // console.log('更新失败，请重试')
                }
            })
            // console.log('submit!')
            router.push('/articleList')
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
  