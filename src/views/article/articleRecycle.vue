<template>
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
      <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="id" prop="id" width="50"/>
        <el-table-column label="Article title" prop="articleTitle" width="180"/>
        <el-table-column label="Article abstract" prop="article_abstract" width="180"/>
        <el-table-column label="Create time" prop="createTime" width="150"/>
        <el-table-column label="Update time" prop="updateTime" width="150"/>
        <el-table-column align="right">
          <!-- <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template> -->
          <template #default="scope">
            <!-- scope 它是一个对象，包含了当前行的数据和索引等信息 -->
            <!-- 恢复删除文章 -->
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Recover</el-button>  
            <!-- 彻底删除文章 -->
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
    </div>
  </div>
  </template>
  
  <script lang="ts" setup>
  import { recoverArticle, getAllDelArticle, deleteArticle} from '@/apis/article'
  import { useRouter } from "vue-router"
  import { ref, computed ,} from "vue"
  import type { Article } from '@/pojo/article'
  
//   let article = {
//     userId: 1,
//     articleTitle: '',
//     articleAbstract: '',
//     articleContent: '',
//   } as Article
  
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
      // id: '',
      // userId: '',
      // categoryId: '',
      // articleCover: '',
      // articleTitle: '',
      // articleAbstract: '',
      // articleContent: '',
      // isTop: '',
      // isFeatured: '',
      // isDelete: '',
      // status: '',
      // type: '',
      // password: '',
      // originalUrl: '',
      // createTime: '',
      // updateTime: '',
    } 
  ])
  let currentPageData = ref([
    {
    //   id: '',
    //   userId: '',
    //   categoryId: '',
    //   articleCover: '',
    //   articleTitle: '',
    //   articleAbstract: '',
    //   articleContent: '',
    //   isTop: '',
    //   isFeatured: '',
    //   isDelete: '',
    //   status: '',
    //   type: '',
    //   password: '',
    //   originalUrl: '',
    //   createTime: '',
    //   updateTime: '',
    } as Article
  ])
  const search = ref('')
  let filterTableData= ref()
  
  
  
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
  
  const a = () => {
    getAllDelArticle().then(res=>{
        data.value = Object.values(res.data)
        console.log(data.value)
        paginationProps.total = data.value.length
        // console.log(paginationProps.total)
        // 调用分页组件的事件处理函数，显示第一页的数据
        handlePagination(1);
      })
  }
  a()
  
  const router = useRouter()
  //恢复
  const handleEdit = (index: number, row: Article) => {
    console.log(row)
    if(localStorage.getItem('status')=='admin') {
      recoverArticle(row).then(res=>{
        console.log(res.data)
      })
    } else { console.log('权限不足，请联系管理员') }
  }
  
  // 真删除
  const handleDelete = (index: number, row: Article) => {
    deleteArticle(row).then(res=>{
      console.log(res.data)
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
  
  