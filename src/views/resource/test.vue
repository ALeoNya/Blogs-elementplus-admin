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
        <el-table :data="filterTableData" style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <div m="4">
                <el-table :data="props.row.family" style="margin-left: 40px;">
                  <el-table-column label="资源名称" prop="resourceName"/>
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
  
        <!-- <el-table v-if="tableData.length > 0" :data="filterTableData" style="width: 100%">
          <el-table-column label="Create time" prop="createTime" width=""/>
          <el-table-column label="Resource name" prop="resourceName" width=""/>
          <el-table-column label="Resource url" prop="url" width=""/>
          
          <el-table-column label="Request method" width="">
            <template #default="scope">
              <el-tag>{{ scope.row.requestMethod }}</el-tag>
            </template>
          </el-table-column>
  
          <el-table-column align="right">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table> -->
  
        <!-- 分页器 -->
        <div class="example-pagination-block">
          <div class="pagination">
            <el-pagination
              @size-change="handlePagination"
              @current-change="handlePagination"
              v-model:current-page="paginationProps.currentPage"
              layout="prev, pager, next"
              :total= tableData.length >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  
  
      <!-- 更新模块弹框 -->
    <el-dialog v-model="dialogFormVisible" title="更改模块信息">
        <el-form :model="Data">
          <el-form-item label="模块名称" :label-width="formLabelWidth">
            <el-input v-model="Data.resourceName" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="upd()">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
  
    <!-- 更新资源弹框 -->
    <el-dialog v-model="dialogFormVisible1" title="更改接口信息">
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
            <el-button @click="dialogFormVisible1 = false">Cancel</el-button>
            <el-button type="primary" @click="upd()">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
  
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
  
    <!-- 新增资源弹框 -->
    <el-dialog v-model="dialogFormVisible3" title="新增接口信息">
      <el-form :model="addData">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-input v-model="addData.resourceName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="接口URL" :label-width="formLabelWidth">
          <el-input v-model="addData.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请求方式" :label-width="formLabelWidth">
          <!-- 多选框 -->
          <el-select
            v-model="addData.requestMethod"
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
          <el-button @click="dialogFormVisible3 = false">Cancel</el-button>
          <el-button type="primary" @click="addApi()">  
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  
    </template>
    
    <script lang="ts" setup>
    import { allResource, updResource, delResource, addResource } from '@/apis/resource'
    import { useRouter } from "vue-router"
    import { ref, reactive, computed, } from "vue"
    
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
    const formLabelWidth = '140px'
    let dialogFormVisible = ref(false)
    let dialogFormVisible1 = ref(false)
    let dialogFormVisible2 = ref(false)
    let dialogFormVisible3 = ref(false)
  
    const search = ref('')
    
    let paginationProps = {
      // 每页显示的数据条数
      pageSize: 10,
      // 当前页码
      currentPage: 1,
      // 数据总条数
      total: 0,
    };
    let testData = ref([] as ResourceDTO[]) 
  
    let filterTableData = ref([] as ResourceDTO[]) 
    let tableData = ref([] as ResourceDTO[])
    let currentPageData = ref([] as ResourceDTO[])
    
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
    let id = ref()
  
    // 选择框
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
  
    // 分页方法
    const handlePagination = function (val:any) {
      // 根据当前页码和每页显示的数据条数，计算出当前页的数据范围
      let start = (val - 1) * paginationProps.pageSize
      let end = val * paginationProps.pageSize
      currentPageData.value = tableData.value.slice(start, end)
      filterTableData = computed(() =>
        currentPageData.value.filter(
          (data) =>
            !search.value ||
            data.resource.resourceName.toLowerCase().includes(search.value.toLowerCase())
        )
      )
    }
    
    // 列表展示
    const allList = () => {
      allResource().then(res=>{
        // tableData.value = res.data
        tableData.value = Object.values(res.data)
        testData.value = Object.values(res.data)
        console.log(tableData.value)
        console.log(testData.value)
        handlePagination(1)
      })
    }
    allList()
    const router = useRouter()
  
    // 打开模块更新框
    const openUdpModel = (index: number, row: any) => {
      id.value = index
      dialogFormVisible.value = true  //展开编辑弹框
      Data = row.resource
    }
    // 打开资源更新框
    const openUdpResource = (index: number, row: any) => {
      console.log(index)
      id.value = index
      dialogFormVisible1.value = true  //展开编辑弹框
      Data = row
    } 
    // 打开模块新增框
    const openAddModel = () => {
      Data.resourceName = ""
      dialogFormVisible2.value = true  
    }
    // 打开资源新增框
    let udpData = ref({} as Resource)
    const openAddResource = (index: number, row: any) => {
      dialogFormVisible3.value = true
      // 获取父模块id
      id.value = index
      addData.parentId = row.resource.id
      console.log(addData.parentId)
    }
    
    // 更新
    const upd = () => {
      if(localStorage.getItem('status')=='admin') {
        // 更新方法（传入categoryName
        updResource(Data).then(res=>{
          // 更新列表（修改响应式数组tagData中的值
          filterTableData.value[id.value - 1].resource.resourceName = Data.resourceName
          filterTableData.value[id.value - 1].resource.url = Data.url
          filterTableData.value[id.value - 1].resource.requestMethod = Data.requestMethod
        })
        dialogFormVisible.value = false
        dialogFormVisible1.value = false
      } else {
        console.log('权限不足，请联系管理员')
      }
    }
  
    // 添加
    let addData = reactive<Resource>({
      id: 0,
      resourceName: '',
      url: '',
      requestMethod: '',
      isAnonymous: 0,
      parentId: 0,
      createTime: 0,
      updateTime: 0
    })
    // 添加模块
    // const addModel = () => {
    //   if(localStorage.getItem('status')=='admin') {
    //     // 后端方法
    //     addResource(Data).then(res=>{
    //       // 添加到当前页面的table中
    //       const newResourceDTO: ResourceDTO = {  
    //         resource: res.data,  
    //         family: [] 
    //       }
    //       filterTableData.value.push(newResourceDTO)
    //     })
    //     dialogFormVisible2.value = false
    //   }
    // }
  
    const addModel = () => {
      if(localStorage.getItem('status')=='admin') {
        // // 后端方法
        // addResource(Data).then(res=>{
        //   // 添加到当前页面的table中
        //   const newResourceDTO: ResourceDTO = {  
        //     resource: res.data,  
        //     family: [] 
        //   };
        //   filterTableData.value.push(newResourceDTO) 
        // })  
        // 手动添加
        const newResource: Resource = {  
          id: Date.now(), // 使用当前时间戳作为示例id  
          resourceName: 'New Resource',  
          url: 'http://example.com/new-resource',  
          requestMethod: 'GET',  
          isAnonymous: 0,  
          parentId: 0, // 或者其他默认值  
          createTime: Date.now(),  
          updateTime: Date.now(),  
        };  
        const newResourceDTO: ResourceDTO = {  
          resource: newResource,  
          family: [] // 假设你只添加一个新的family成员，也可以添加多个  
        }; 
        filterTableData.value.push(newResourceDTO)
        dialogFormVisible2.value = false
      }
    }
  
      // 添加资源
    const addApi = () => {
      if(localStorage.getItem('status')=='admin') {
        addResource(addData).then(res=>{
          console.log(res)
          testData.value[id.value].family.push(res.data)  // ok
  
          filterTableData.value[id.value].family.push(res.data)
          console.log(testData.value)    
        })
  
        // 关闭新增页面
        dialogFormVisible3.value = false
      }
    }
  
    // 删除
     const handleDelete = (index: number, row: Resource) => {
      delResource(row).then(res=>{
         console.log(res)       
         currentPageData.value.splice(index, 1);  // 删除指定引索德行
       })
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