<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Date" prop="date" width="180"/>
    <el-table-column label="Title" prop="title" width="180"/>
    <el-table-column label="Digest" prop="digest" width="450"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
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
        :total= data.length >
      </el-pagination>
    </div>
  </div>

</template>


<script lang="ts" setup>
import {getAllTitle} from '@/apis/article'
import { ref, reactive, computed } from "vue"


let paginationProps = {
  // 每页显示的数据条数
  pageSize: 10,
  // 当前页码
  currentPage: 1,
  // 数据总条数
  total: 0,
};
// 定义一个分页组件的事件处理函数
let data = ref([
  {
    title: '',
    digest: '',
    date: '',
  }
])
let currentPageData = ref([
  {
    title: '',
    digest: '',
    date: '',
  }
])
const search = ref('')
let filterTableData:any
let filterTableData2= ref()
const handlePagination = function (val:any) {
  // 根据当前页码和每页显示的数据条数，计算出当前页的数据范围
  let start = (val - 1) * paginationProps.pageSize
  let end = val * paginationProps.pageSize
  // 根据数据范围，从数据源中截取出当前页的数据
  currentPageData.value = data.value.slice(start, end)
  let currentPageDataJSON = JSON.parse(JSON.stringify(data.value.slice(start, end)) ) 
  // console.log(currentPageDataJSON)

  //筛选
  filterTableData = computed(() =>
  currentPageData.value.filter(
      (data:any) =>
        !search.value ||
        data.title.toLowerCase().includes(search.value.toLowerCase())
    )
  )
  // filterTableData2.value = filterTableData.value

  console.log(filterTableData)
};

const getlistData = () => {
    getAllTitle().then(res=>{
      data.value = res.data
      // console.log(data)
      paginationProps.total = data.value.length
      // console.log(paginationProps.total)

      // 调用分页组件的事件处理函数，显示第一页的数据
      handlePagination(1);
    })
}
getlistData()

//编辑
const handleEdit = (index: number, row: title) => {
  console.log(index, row)
}
//删除
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
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
  align-items: center;
  margin-top: 20px;
}
</style>