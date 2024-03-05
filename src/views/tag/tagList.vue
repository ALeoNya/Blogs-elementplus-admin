<template>
  <!-- <el-button size="small" type="danger" plain width="250" @click="dialogFormVisible1 = true">添加行</el-button>&ensp;
  <el-input v-model="search" style="width: 30%" size="small" placeholder="Type to search" /> -->

  <div class="all">
    <div class="page-header">
      <div class="title">
        <div class="title-block" style="font-size: large;"><span class="aaa">标签管理</span></div>
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
  <!-- Tag List -->
  <div class="page-body">
      <div class="title-block" style="font-size: large;">标签列表</div>
      <el-table v-if="tableData.length > 0" :data="filterTableData" style="width: 100%">
        <el-table-column label="Create time" prop="createTime" width="200"/>
        <el-table-column label="id" prop="id" width="200"/>
        <el-table-column label="Tag name" prop="tagName" width="200"/>
        <el-table-column label="Update time" prop="updateTime" width="250"/>
        <el-table-column align="right">
          <template #default="scope">
            <!-- scope 它是一个对象，包含了当前行的数据和索引等信息 -->
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  <!-- Edit弹框 -->
  <el-dialog v-model="dialogFormVisible" title="更改分类信息">
    <el-form :model="tagName.value">
      <el-form-item label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="tagName" autocomplete="off" />
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
  <!-- Add弹框 -->
  <el-dialog v-model="dialogFormVisible1" title="新增分类信息">
    <el-form :model="newTagName.value">
      <el-form-item label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="newTagName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="add()">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { delTag, updTag, tagList, addTag } from '@/apis/tag'
import { useRouter } from "vue-router"
import { ref, reactive, computed, } from "vue"

interface Tag {
  id: number,
  tagName: string,
  createTime: number,
  updateTime: number
}
const formLabelWidth = '140px'
let dialogFormVisible = ref(false)
let dialogFormVisible1 = ref(false)
const search = ref('')

let paginationProps = {
  // 每页显示的数据条数
  pageSize: 10,
  // 当前页码
  currentPage: 1,
  // 数据总条数
  total: 0,
};
let filterTableData = ref([] as Tag[]) // 最后数据
let tableData = ref([] as Tag[])  // 原始数据
let currentPageData = ref([] as Tag[])  // 分页数据
let tagName = ref() // categoryName是作为弹框和列表的响应式同步使用
let id = ref()

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
        data.tagName.toLowerCase().includes(search.value.toLowerCase())
    )
  )
}

// 列表展示
const allList = () => {
  tagList().then(res=>{
    tableData.value = Object.values(res.data)
    handlePagination(1)
    console.log(tableData.value)
  })
}
allList()
// console.log(filterTableData.value)

const router = useRouter()

// 打开编辑框
const handleEdit = (index: number, row: any) => {
  console.log(row)
  dialogFormVisible.value = true  
  tagName.value = row.tagName
  id = ref(row.id)
}

// 打开新增框
let newTagName = ref('')  // 一开始没有值为空会报错所以预先放入''占位符
const handleAdd = (index: number, row: any) => {
  console.log(row)
  dialogFormVisible1.value = true  
  tagName.value = row.tagName
  id = ref(row.id)
}

// 添加
const add = () => {
  if(localStorage.getItem('status')=='admin') {
    // 数据库id
    let id = filterTableData.value[filterTableData.value.length - 1].id + 1
    console.log(id)

    addTag(newTagName.value,id).then(res=>{
      // 添加新的一行
      console.log(res.data)
      tableData.value.push(res.data)
      console.log(filterTableData.value)
    })
  } else {
    console.log('权限不足，请联系管理员')
  }
}

// 更新
const upd = () => {
  if(localStorage.getItem('status')=='admin') {
    // 更新方法（传入categoryName
    updTag().then(res=>{
      // console.log(res)
      // 更新列表（修改响应式数组tagData中的值
      filterTableData.value[id.value - 1].tagName = tagName.value
    })
    dialogFormVisible.value = false
  } else {
    console.log('权限不足，请联系管理员')
  }
}

//删除(如何获取选定行的数据)
 const handleDelete = (index: number, row: Tag) => {
   delTag().then(res=>{
     console.log(res)
     currentPageData.value.splice(index, 1);  // 删除指定引索德行
   })
 }
</script>
<style scoped>
@import '/src/assets/css/list.css';

.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
.pagination {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin-top: 20px;
}
</style>

