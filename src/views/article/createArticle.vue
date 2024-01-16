<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { insert,uploadFile } from '@/apis/article'
    import router from '@/router';
    import type { Article } from '@/pojo/article'



    // TODO 获取当前用户id : 解析token中的id
    // export interface Article {
    //     userId: number,
    //     articleTitle: string,
    //     articleAbstract: string,
    //     articleContent: string,
    // } 
    let timestamp = new Date().getTime()
    //使用 as 关键字将接口转化为对象类型 
    let article = {
        id: '',
        userId: localStorage.getItem("userId") as unknown as number,
        articleTitle: '',
        articleAbstract: '',
        articleContent: '',
    } as Article
    // 使用reactive将接口转换为响应式代理
    let state = reactive(article)

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
    // date: [{type: 'date',required: true,message: 'Please pick a date',trigger: 'change',}],
    digest: [{ validator: checkDigest, trigger: 'blur' }],
    checkContent: [{ validator: checkContent, trigger: 'blur' }],
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

    const md = ref();
    const imgAdd = async (pos:any, file:any) => {
        const formData = new FormData();
        formData.append('file', file);
        uploadFile(formData).then((res) => {
            md.value.$img2Url(pos, res.data.url);
        })
    }

    
    // 删除图片
    const imgDel = () => {}

    // 新增文章
    const handler = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log(state)
            insert(state).then(res=>{
                if(res.data) {
                    console.log(res)
                    console.log('新增博客成功...正在返回博客列表')
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
    <el-input v-model="state.articleTitle" autocomplete="off" />
    </el-form-item>

    <!-- <el-form-item label="date" prop="date">
        <el-date-picker
            v-model="state.create_time"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
        />
    </el-form-item> -->

    <el-form-item label="digest" prop="digest">
        <el-input v-model="state.articleAbstract" type="textarea" />
    </el-form-item>

    <el-form-item prop="content">
        
    <div class="mavonEditor">
        <mavon-editor
            v-model="state.articleContent"
            ref=md 
            style="height: 100%;width: 100%"
            @imgAdd="imgAdd"
            @imgDel="imgDel">
        </mavon-editor>    
    </div>
    </el-form-item>
    </el-form>
    <el-button  class="button" type="primary" @click="handler(ruleFormRef)">发布</el-button>

</template>
<style scoped>
.mavonEditor {
  width: 100%;
  height: 500px;
}
.button {
    padding: 20px;
    text-align: center;
    width: 80%;
    margin-left: 15%;
    /* margin-right: 0%; */
}
</style>