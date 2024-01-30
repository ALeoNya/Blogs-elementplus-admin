<template>
  <el-table v-if="tableData.length > 0" :data="filterTableData" style="width: 100%">
    <el-table-column label="id" prop="id" width="200"/>
    <el-table-column label="Tag name" prop="tagName" width="250"/>
    <el-table-column label="Create time" prop="createTime" width="250"/>
    <el-table-column label="Update time" prop="updateTime" width="250"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" style="width: 40%" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <!-- scope 它是一个对象，包含了当前行的数据和索引等信息 -->
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

<!-- 弹框：传入原本的元素并且可以更改 -->
  <el-dialog v-model="dialogFormVisible" title="更改分类信息">
      <el-form :model="tagName.value">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="tagName" autocomplete="off" />
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
import { delTag, updTag, tagList } from '@/apis/tag'
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

let data = reactive([] as Tag[])
const search = ref('')

let paginationProps = {
  // 每页显示的数据条数
  pageSize: 10,
  // 当前页码
  currentPage: 1,
  // 数据总条数
  total: 0,
};
let filterTableData = ref([] as Tag[]) 
let tableData = ref([] as Tag[])
let currentPageData = ref([] as Tag[])


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

// 编辑
let tagName = ref() // categoryName是作为弹框和列表的响应式同步使用
let id = ref()
const handleEdit = (index: number, row: any) => {
  console.log(row)
  dialogFormVisible.value = true  //展开编辑弹框
  tagName.value = row.tagName
  id = ref(row.id)
}

// 更新
const udpCategory = () => {
  if(localStorage.getItem('status')=='admin') {
    // 更新方法（传入categoryName
    updTag().then(res=>{
      console.log(res)
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

