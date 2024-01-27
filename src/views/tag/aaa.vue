<template>
  <el-table v-if="tableData.length > 0" :data="filterTableData" style="width: 100%">
    <el-table-column label="Id" prop="id" />
    <el-table-column label="CategoryName" prop="categoryName" />
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
</template>

<script lang="ts" setup>
import { allCategory, updcatagoryName } from '@/apis/category'
import { useRouter } from "vue-router"
import { ref, reactive, computed, } from "vue"
interface Category {
  id: number,
  categoryName: string,
  createTime: string,
  updateTime: string
} 
let paginationProps = {
  // 每页显示的数据条数
  pageSize: 10,
  // 当前页码
  currentPage: 1,
  // 数据总条数
  total: 0,
};
const search = ref('')
let filterTableData = ref([] as Category[]) 
let tableData = ref([] as Category[])
let currentPageData = ref([] as Category[])

// 分页
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

// 所有列表
const allList = () => {
  allCategory().then(res=>{
    tableData.value = Object.values(res.data)
    handlePagination(1)
    console.log(tableData.value)
  })
}
allList()

const handleEdit = (index: number, row: Category) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: Category) => {
  console.log(index, row)
}



</script>