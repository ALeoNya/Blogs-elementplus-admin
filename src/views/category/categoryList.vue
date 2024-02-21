<template>
  <!--  -->
  <div class="hearder">
    <el-button size="small" type="danger" plain width="250" @click="dialogFormVisible1 = true">添加行</el-button>&ensp;
    <el-input v-model="search" style="width: 30%" size="small" placeholder="Type to search" />
  </div>

  <el-table v-if="tableData.length > 0" :data="filterTableData" style="width: 100%">
    <el-table-column label="id" prop="id" width="50"/>
    <el-table-column label="Category name" prop="categoryName" width="250"/>
    <el-table-column label="Create time" prop="createTime" width="250"/>
    <el-table-column label="Update time" prop="updateTime" width="250"/>
    <el-table-column align="right">
      <template #default="scope">
        <!-- scope 它是一个对象，包含了当前行的数据和索引等信息 -->
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

<!-- 弹框：传入原本的元素并且可以更改 -->
  <el-dialog v-model="dialogFormVisible" title="更改分类信息">
      <el-form :model="categoryName.value">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="categoryName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="udpCategory()">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

      <!-- 新增弹框 -->
  <el-dialog v-model="dialogFormVisible1" title="新增分类信息">
      <el-form :model="categoryName.value">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="categoryName" autocomplete="off" />
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

  <!-- 分页器 -->
  <div class="example-pagination-block">
    <div class="pagination">
      <el-pagination
        @size-change="handlePagination"
        @current-change="handlePagination"
        v-model:current-page="paginationProps.currentPage"
        layout="prev, pager, next"
        :total= data.length >
      </el-pagination>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { allCategory, updCatagoryName, delCatagory, addCatagory } from '@/apis/category'
import { useRouter } from "vue-router"
import { ref, reactive, computed, } from "vue"
import type { Category } from '@/pojo/category'

const formLabelWidth = '140px'
let dialogFormVisible = ref(false)

let data = reactive([] as Category[])
const search = ref('')

let paginationProps = {
  // 每页显示的数据条数
  pageSize: 10,
  // 当前页码
  currentPage: 1,
  // 数据总条数
  total: 0,
};
let filterTableData = ref([] as Category[]) 
let tableData = ref([] as Category[])
let currentPageData = ref([] as Category[])
let dialogFormVisible1 = ref(false)
// let newTagName = ref('')  // 一开始没有值为空会报错所以预先放入''占位符
let categoryName = ref('') // categoryName是作为弹框和列表的响应式同步使用
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
        data.categoryName.toLowerCase().includes(search.value.toLowerCase())
    )
  )
}

// 列表展示方法
const allList = () => {
  allCategory().then(res=>{
    tableData.value = Object.values(res.data)
    handlePagination(1)
    // console.log(tableData.value)
  })
}
allList()

// 打开编辑框
const handleEdit = (index: number, row: any) => {
  console.log(row)
  dialogFormVisible.value = true
  categoryName.value = row.categoryName
  id = ref(row.id)
}

// 打开新增框
const handleAdd = (index: number, row: any) => {
  console.log(row)
  dialogFormVisible1.value = true  
  categoryName.value = row.categoryName
  id = ref(row.id)
}

// 新增方法
const add = () => {
  if(localStorage.getItem('status')=='admin') {
    // 数据库id
    let id = filterTableData.value[filterTableData.value.length - 1].id + 1
    console.log(id)

    addCatagory(id,categoryName.value).then(res=>{
      // 添加新的一行
      filterTableData.value.push(res.data)
    })
  } else {
    console.log('权限不足，请联系管理员')
  }
}

// 更新方法
const udpCategory = () => {
  if(localStorage.getItem('status')=='admin') {
    // 更新方法（传入categoryName
    updCatagoryName(categoryName.value,id.value).then(res=>{
      console.log(res)
      // 更新列表（修改响应式数组tagData中的值
      filterTableData.value[id.value - 1].categoryName = categoryName.value
    })
    dialogFormVisible.value = false
  } else {
    console.log('权限不足，请联系管理员')
  }
}

//删除方法
const handleDelete = (index: number, row: Category) => {
  delCatagory(row.id, row.categoryName).then(res=>{
    console.log(res)
    currentPageData.value.splice(row.id, 1);  // 删除指定引索德行
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
  /* align-items: center; */
  margin-top: 20px;
}
</style>

