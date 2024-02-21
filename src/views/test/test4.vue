<template>
  <div class="button">
    <div style="font-weight:lighter;">功能</div>
    <el-button style="height: 35px;" size="big" type="danger" plain width="250" @click="openAddModel()"> + 添加模块</el-button>
  </div>
  <el-table :data="tableData1" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <el-table :data="props.row.family">
            <el-table-column label="资源名称" prop="resourceName" />
            <el-table-column label="资源地址" prop="url" />
            <el-table-column label="请求方法" prop="requestMethod" />
            <el-table-column label="是否匿名" prop="isAnonymous" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="操作" >
              <template #default="scope">
                <!-- scope 它是一个对象，包含了当前行的数据和索引等信息 -->
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="模块名称" prop="resource.resourceName" />
    <el-table-column label="创建时间" prop="resource.createTime" />
    <el-table-column label="操作" >
      <template #default="scope">
        <!-- scope 它是一个对象，包含了当前行的数据和索引等信息 -->
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Add</el-button>
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!-- 新增模块弹框 -->
  <el-dialog v-model="dialogFormVisible2" title="新增模块">
    <el-form :model="Data">
      <el-form-item label="模块名称" :label-width="formLabelWidth">
        <el-input v-model="Data.resourceName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">Cancel</el-button>
        <el-button type="primary" @click="addModel()">  
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { allResource, addResource } from '@/apis/resource'
import { ref,reactive } from 'vue'
const parentBorder = ref(false)
const childBorder = ref(false)

let Data = reactive<Resource>({
    id: 0,
    resourceName: '',
    url: '',
    requestMethod: '',
    isAnonymous: 0,
    parentId: 0,
    createTime: 0,
    updateTime: 0
  })
export interface Resource {
  id: number,
  resourceName: string,
  url: string,
  requestMethod: string,
  isAnonymous: number,
  parentId: number,
  createTime: number,
  updateTime: number
}
export interface ResourceDTO {
  resource: Resource,
  family : Resource[]
}

// 获取后端table数据
// let tableData1 = ref([])
let tableData1 = ref([] as ResourceDTO[]) 

const getTableData = () => {
  allResource().then(res => {
    console.log(res.data)
    tableData1.value = res.data
  })
}
getTableData()

let dialogFormVisible2 = ref(false)
const openAddModel = () => {
  dialogFormVisible2.value = true  
}

const addModel = () => {
    if(localStorage.getItem('status')=='admin') {
      // // 后端方法
      addResource(Data).then(res=>{
        // 添加到当前页面的table中
        const newResourceDTO: ResourceDTO = {  
          resource: res.data,  
          family: [] 
        };
        tableData1.value.push(newResourceDTO) 
      })  
      // 手动添加
      // 添加新的ResourceDTO到testData数组中  
      // const newResource: Resource = {  
      //   id: Date.now(), // 使用当前时间戳作为示例id  
      //   resourceName: 'New Resource',  
      //   url: 'http://example.com/new-resource',  
      //   requestMethod: 'GET',  
      //   isAnonymous: 0,  
      //   parentId: null, // 或者其他默认值  
      //   createTime: Date.now(),  
      //   updateTime: Date.now(),  
      // };  
      // const newResourceDTO: ResourceDTO = {  
      //   resource: newResource,  
      //   family: [] // 假设你只添加一个新的family成员，也可以添加多个  
      // };  
      dialogFormVisible2.value = false
    }
  }
</script>
