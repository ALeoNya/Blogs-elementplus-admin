<template>
  <div class="all">
  <div class="page-header">
    <div class="title">
      <div class="title-block" style="font-size: large;">资源管理</div>
    </div>
    <div class="button">
      <div style="font-weight:lighter;">功能</div>
      <el-button style="height: 35px;" size="big" type="danger" plain width="250" @click="openAddModel()"> + 添加模块</el-button>
    </div>
    <div class="input">
      <div class="" style="font-weight:lighter;">搜索</div>
      <el-input v-model="search" style="width: 30%;height: 35px;" size="small" placeholder="Type to search"/>
    </div>
  </div>

  <div class="page-body">
    <div class="title-block" style="font-size: large;">资源列表</div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <el-table :data="props.row.family" style="margin-left: 40px;">
              <el-table-column label="资源名称" prop="resourceName" />
              <el-table-column label="资源地址" prop="url" />
              <el-table-column label="请求方法" prop="requestMethod" />
              <el-table-column label="是否匿名" prop="isAnonymous" />
              <el-table-column label="创建时间" prop="createTime" />
              <el-table-column label="操作" >
                <template #default="scope">
                  <!-- scope 它是一个对象，包含了当前行的数据和索引等信息 -->
                  <el-button size="small" @click="openUdpResource(scope.$index, scope.row)">Edit</el-button>
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
          <el-button size="small" @click="openAddResource(scope.$index, scope.row)">Add</el-button>
          <el-button size="small" @click="openUdpModel(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
      <!-- 分页器 -->
      <!-- <div class="example-pagination-block">
        <div class="pagination">
          <el-pagination
            @size-change="handlePagination"
            @current-change="handlePagination"
            v-model:current-page="paginationProps.currentPage"
            layout="prev, pager, next"
            :total= tableData.length >
          </el-pagination>
        </div>
      </div> -->
    </div>
  </div>
  <!-- 新增模块弹框 -->
  <el-dialog v-model="isOpenAddModel" title="新增模块">
    <el-form :model="addModelData">
      <el-form-item label="模块名称" :label-width="formLabelWidth">
        <el-input v-model="addModelData.resourceName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isOpenAddModel = false">Cancel</el-button>
        <el-button type="primary" @click="addModel()">  
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 新增资源弹框 -->
  <el-dialog v-model="isOpenAddResource" title="新增接口信息">
    <el-form :model="addResourceData">
      <el-form-item label="接口名称" :label-width="formLabelWidth">
        <el-input v-model="addResourceData.resourceName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="接口URL" :label-width="formLabelWidth">
        <el-input v-model="addResourceData.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="请求方式" :label-width="formLabelWidth">
        <!-- 多选框 -->
        <el-select
          v-model="addResourceData.requestMethod"
          class="m-2"
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isOpenAddResource = false">Cancel</el-button>
        <el-button type="primary" @click="addApi()">  
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 更新模块弹框 -->
  <el-dialog v-model="isOpenUdpModel" title="更改模块信息">
    <el-form :model="Data">
      <el-form-item label="模块名称" :label-width="formLabelWidth">
        <el-input v-model="Data.resourceName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isOpenUdpModel = false">Cancel</el-button>
        <el-button type="primary" @click="upd()">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 更新资源弹框 -->
  <el-dialog v-model="isOpenUdpResource" title="更改接口信息">
    <el-form :model="Data">
      <el-form-item label="接口名称" :label-width="formLabelWidth">
        <el-input v-model="Data.resourceName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="接口URL" :label-width="formLabelWidth">
        <el-input v-model="Data.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="请求方式" :label-width="formLabelWidth">
        <el-select
          v-model="Data.requestMethod"
          class="m-2"
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isOpenUdpResource = false">Cancel</el-button>
        <el-button type="primary" @click="upd()">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { allResource, addResource, updResource, delResource } from '@/apis/resource'
import { ref,reactive } from 'vue'
const formLabelWidth = '140px'
const options = [
  {
    value: 'POST',
    label: 'POST',
  },
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'DELETE',
    label: 'DELETE',
  },
  {
    value: 'UPDATA',
    label: 'UPDATA',
  },
]
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

// 获取后端table数据
let tableData = ref([] as ResourceDTO[]) 
const getTableData = () => {
  allResource().then(res => {
    console.log(res.data)
    tableData.value = res.data
  })
}
getTableData()

// 打开模块添加框
let isOpenAddModel = ref(false)
let addModelData = reactive<Resource>({
    id: 0,
    resourceName: '',
    url: '',
    requestMethod: '',
    isAnonymous: 0,
    parentId: 0,
    createTime: 0,
    updateTime: 0
})
const openAddModel = () => {
  isOpenAddModel.value = true
}
// 添加模块方法
const addModel = () => {
  if(localStorage.getItem('status')=='admin') {
    // // 后端方法
    addResource(addModelData).then(res=>{
      // 添加到当前页面的table中
      const newResourceDTO: ResourceDTO = {  
        resource: res.data,  
        family: [] 
      };
      tableData.value.push(newResourceDTO) 
    })   
    isOpenAddModel.value = false
  }
}

// 打开资源添加框
let isOpenAddResource = ref(false)
let id = ref()
let addResourceData = reactive<Resource>({
    id: 0,
    resourceName: '',
    url: '',
    requestMethod: '',
    isAnonymous: 0,
    parentId: 0,
    createTime: 0,
    updateTime: 0
  })
const openAddResource = (index: number, row: any) => {
    isOpenAddResource.value = true
    // 获取父模块的下标,id
    addResourceData.parentId = row.resource.id
    id.value = index
  }
// 添加资源方法
const addApi = () => {
      if(localStorage.getItem('status')=='admin') {
        // 父模块id，接口名称，url,请求方法
        addResource(addResourceData).then(res=>{
          tableData.value[id.value].family.push(res.data)  // ok
        })
        isOpenAddResource.value = false
      }
    }

  // 打开模块更新框
  let isOpenUdpModel = ref(false)
  const openUdpModel = (index: number, row: any) => {
    id.value = index
    isOpenUdpModel.value = true  //展开编辑弹框
    Data = row.resource  // 向当前Data数据对象传输当前行对象
  }
  // 打开资源更新框
  let isOpenUdpResource = ref(false)
  const openUdpResource = (index: number, row: any) => {
    id.value = index
    isOpenUdpResource.value = true  //展开编辑弹框
    Data = row
  }
  // 模块/资源更新方法
  const upd = () => {
      if(localStorage.getItem('status')=='admin') {
        // 更新方法（传入categoryName
        updResource(Data).then(res=>{
          // 更新列表（修改响应式数组tagData中的值
          tableData.value[id.value - 1].resource.resourceName = Data.resourceName
          tableData.value[id.value - 1].resource.url = Data.url
          tableData.value[id.value - 1].resource.requestMethod = Data.requestMethod
        })
        isOpenUdpModel.value = false
        isOpenUdpResource.value = false
      } else {
        console.log('权限不足，请联系管理员')
      }
    }
  
  // 删除方法(根据父ID判断是否为子节点)
  const handleDelete = (index: number, row: any) => {
    // 父节点删除(里面的子节点呢？)
    if(row.parentId == 0) {
      delResource(row).then(res=> {
        tableData.value.splice(index, 1);
        console.log(res.data)
      })
    } else {
      // 如何获取父节点的序号？
      delResource(row).then(res=> {
        tableData.value[0].family.splice(index, 1);
        console.log(res.data)
      })
    }
 
  }
  
</script>

<style scoped>
    .example-pagination-block + .example-pagination-block {
      margin-top: 10px;
    }
    .example-pagination-block .example-demonstration {
      margin-bottom: 16px;
    }
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  
    .all {
      /* height: 100%;
      width: 100%; */
      /* background-color: whitesmoke; */
    }
  
    .page-header {
      background-color: white;
      box-shadow:
        1.5px 1px 0.5px rgba(0, 0, 0, 0.035),
        4.1px 2.6px 1.4px rgba(0, 0, 0, 0.05),
        9.9px 6.3px 3.3px rgba(0, 0, 0, 0.065),
        33px 21px 11px rgba(0, 0, 0, 0.1)
      ;
      margin-bottom: 30px;
      padding: 10px;
    }
  
    .title {
      margin:0px;
    }
    .title-block{
      width: 15%;
      border-left: 6px solid #8A7AE8;
      background: rgb(237, 242, 247);
      padding: 14px;
      font-size: 16px;
      letter-spacing: 1px;
    }
    
    .button {
      /* display: inline; */
      margin:10px;
    }
    
    .input {
      /* display: inline; */
      margin: 10px;
      margin-bottom: 10px;
    }
    
    .page-body {
      height: auto;
      background-color: white;
      padding: 10px;
      margin-top: 20px;
      box-shadow:
        6.7px 6.7px 11px rgba(0, 0, 0, 0.061),
        22.3px 22.3px 36.9px rgba(0, 0, 0, 0.089),
        100px 100px 165px rgba(0, 0, 0, 0.15);
    }
</style>
