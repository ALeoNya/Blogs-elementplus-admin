<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <p m="t-0 b-2">文章标题: {{ props.row.articleTitle }}</p>
          <p m="t-0 b-2">文章描述: {{ props.row.articleAbstract }}</p>
          <p m="t-0 b-2">创建时间: {{ props.row.createTime }}</p>
          <p m="t-0 b-2">更新时间: {{ props.row.updateTime }}</p>
          <!-- <h3>Family</h3> -->
          <!-- 这里填入category和tag信息 -->
          <!-- <el-table :data="props.row.family" :border="childBorder">
            <el-table-column label="Name" prop="name" />
            <el-table-column label="State" prop="state" />
            <el-table-column label="City" prop="city" />
            <el-table-column label="Address" prop="address" />
            <el-table-column label="Zip" prop="zip" />
          </el-table> -->
        </div>
      </template>
    </el-table-column>


    <!-- <el-table-column label="id" prop="id" width="50"/> -->
    <el-table-column label="Article title" prop="articleTitle" width="200"/>
    <el-table-column label="Article abstract" prop="articleAbstract" width="200"/>
    <el-table-column label="Create time" prop="createTime" width="200"/>
    <el-table-column label="Update time" prop="updateTime" width="200"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" style="width: 60%" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <!-- scope 它是一个对象，包含了当前行的数据和索引等信息 -->
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>  
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
        :total= tableData.length >
      </el-pagination>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { getAllArticle ,fakeDelArticle} from '@/apis/article'
import { useRouter } from "vue-router"
import { ref, computed ,} from "vue"
import type { Article } from '@/pojo/article'

let paginationProps = {
  // 每页显示的数据条数
  pageSize: 10,
  // 当前页码
  currentPage: 1,
  // 数据总条数
  total: 0,
};
// 定义一个分页组件的事件处理函数
let tableData = ref([] as Article[])
let currentPageData = ref([] as Article[])
const search = ref('')
let filterTableData= ref()



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
        data.articleTitle.toLowerCase().includes(search.value.toLowerCase())
    )
  )
}

const a = () => {
  getAllArticle().then(res=>{
    tableData.value = Object.values(res.data)
      console.log(tableData.value)
      paginationProps.total = tableData.value.length
      // console.log(paginationProps.total)

      // 调用分页组件的事件处理函数，显示第一页的数据
      handlePagination(1);
    })
}
a()

const router = useRouter()
//编辑
const handleEdit = (index: number, row: any) => {
  console.log(row)
  if(localStorage.getItem('status')=='admin') {
    // 使用router.push将数据推送到
    router.push({
      path:'/edit',
      query: row  //query只接受对象
    })

  } else { console.log('权限不足，请联系管理员') }
}

//删除(如何获取选定行的数据)
const handleDelete = (index: number, row: Article) => {
  fakeDelArticle(row).then(res=>{
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

