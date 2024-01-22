<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="id" prop="id" width="50"/>
    <el-table-column label="Article title" prop="categoryName" width="180"/>
    <el-table-column label="Create time" prop="createTime" width="150"/>
    <el-table-column label="Update time" prop="updateTime" width="150"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
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

<!-- 弹框：传入原本的元素并且可以更改 -->
  <el-dialog v-model="dialogFormVisible" title="更改分类信息">
      <el-form :model="categoryName">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="categoryName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
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
import { allCategory, updcatagoryName } from '@/apis/category'
import { useRouter } from "vue-router"
import { ref, computed ,} from "vue"
import type { Article } from '@/pojo/article'

const formLabelWidth = '140px'
let dialogFormVisible = ref(false)
let article = {
  userId: 1,
  articleTitle: '',
  articleAbstract: '',
  articleContent: '',
} as Article

let paginationProps = {
  // 每页显示的数据条数
  pageSize: 10,
  // 当前页码
  currentPage: 1,
  // 数据总条数
  total: 0,
};
// 定义一个分页组件的事件处理函数
let data = ref([{} as Article])
let currentPageData = ref([{} as Article])
const search = ref('')
let filterTableData= ref()


// 分页方法
const handlePagination = function (val:any) {
  // 根据当前页码和每页显示的数据条数，计算出当前页的数据范围
  let start = (val - 1) * paginationProps.pageSize
  let end = val * paginationProps.pageSize
  // 根据数据范围，从数据源中截取出当前页的数据
  currentPageData.value = data.value.slice(start, end)
  let currentPageDataJSON = JSON.parse(JSON.stringify(data.value.slice(start, end)) ) 
  //筛选
  filterTableData = computed(() =>
  currentPageData.value.filter(
      (data:any) =>
        !search.value ||
        data.title.toLowerCase().includes(search.value.toLowerCase())
    )
  )
};

// 列表展示
const allList = () => {
  allCategory().then(res=>{
      data.value = Object.values(res.data)
      console.log(data.value)
      paginationProps.total = data.value.length

      // 调用分页组件的事件处理函数，显示第一页的数据
      handlePagination(1);
    })
}
allList()

const router = useRouter()

//编辑
let categoryName = ref()
const handleEdit = (index: number, row: any) => {
  console.log(row)
  dialogFormVisible.value = true  //展开编辑弹框
  categoryName = ref(row.categoryName)
  if(localStorage.getItem('status')=='admin') {
    // 更新方法（传入categoryName
    updcatagoryName(categoryName.value).then(res=>{
      
    })
  } else {
    console.log('权限不足，请联系管理员')
  }
}

//删除(如何获取选定行的数据)
// const handleDelete = (index: number, row: Article) => {
//   fakeDelArticle(row).then(res=>{
//     console.log(res)
//     currentPageData.value.splice(index, 1);  // 删除指定引索德行
//   })
// }
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

