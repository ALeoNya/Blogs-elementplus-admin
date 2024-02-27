<!-- 给角色添加权限 -->
<!-- 给用户定义角色 -->
<template>
  <div class="all">
    <div class="page-header">
        <div class="title">
        <div class="title-block" style="font-size: large;">角色管理</div>
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
        <div class="title-block" style="font-size: large;">角色列表</div>
        <!-- 循环列表 -->
        <!-- <el-table
            ref="multipleTableRef"
            border = true
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column label="Date" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column property="name" label="Name" width="120" />
            <el-table-column property="address" label="Address" show-overflow-tooltip />
        </el-table> -->
        <el-table :data="tableData" style="width: 100%" border="true">
            <el-table-column label="Create time" prop="createTime" width="300" align="center"/>
            <el-table-column label="Role Name" prop="roleName" width="300" align="center"/>
            <el-table-column label="Role Tag" prop="roleName" width="300" align="center"/>
            <el-table-column align="right">
            <template #default="scope">
                <!-- scope 它是一个对象，包含了当前行的数据和索引等信息 -->
                <div style="text-align: center">
                    <el-button size="small" @click="openEditPage(scope.$index, scope.row)" >Edit</el-button>  
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Delete</el-button
                    >
                </div>
            </template>
            </el-table-column>
        </el-table>
    </div>
  </div>

  <el-dialog v-model="isOpenEdit" title="更改模块信息">
    <el-form :model="udpData">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="udpData.roleName" autocomplete="off" style="width: 150px;" />
      </el-form-item>
    </el-form>
    <!-- 树形控件 -->
    <div style="height: auto;width: 150px;">
      <el-tree
      ref="treeRef"
      :data="data"
      show-checkbox
      node-key="id"
      highlight-current
      :default-checked-keys="checkedNum1"
      :props="treeProps"
      />
    </div>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isOpenEdit = false,checkedNum = []">Cancel</el-button>
        <el-button type="primary" @click="Save()">Save</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
// 引用
import { ref, reactive} from 'vue'
import type { Role } from '@/apis/role';
import { getAllRole,  } from '@/apis/role';
import { ElTree } from 'element-plus'
import { allResourceByTree } from '@/apis/resource'
import { selResourceByRole } from '@/apis/roleResource'

// 数据传输对象(公共)
const formLabelWidth = '100px'
let addData = ref<Role>()
let udpData = ref<Role>()
let tableData = ref([] as Role[])  //空数组tableData应该被视为ResourceDTO类型的数组
let isOpenEdit = ref(false)
// 数据传输接口
interface Resource {
  id: number,
  resourceName: string,
  url: string,
  requestMethod: string,
  isAnonymous: number,
  parentId: number,
  createTime: number,
  updateTime: number
}
interface ResourceDTO {
  id: number,
  resourceName: string,
  url: string,
  family : Resource[]
}

// 增加角色
const addRole = () => {

}
// 删除角色
const delRole = () => {

}
// 获取角色列表
const getRoleList = () => {
    getAllRole().then(res => {
        tableData.value = res.data
        console.log(tableData.value)
    })
}
getRoleList()
// 管理角色资源/角色名（修改Role_Resource表关系）
const updRoleResource = () => {

}

// 打开编辑框
const treeProps = {  
  children: 'family', // 从 resource 对象中提取 resourceName 作为节点标签  
  label: 'resourceName', // 子节点数组在 ResourceDTO 中的 family 属性  
}
let data = ref([] as ResourceDTO[])
let checkedNum:number[] = []
let checkedNum1 = ref([])

const openEditPage = (index: number, row: Role) => {
    udpData.value = row
    checkedNum1.value = []
    // 获取树形数据对应的选中元素
    selResourceByRole(row.id).then(res => {
      checkedNum1.value = res.data
      console.log(checkedNum1)
    })
    // 获取树形数据
    allResourceByTree().then(res => {
      data.value = res.data
    })
    isOpenEdit.value = true
}

// 实现编辑方法（获取当前选中节点数组返回后台，
const Save = () => {
  
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
    padding: 20px;
    margin-top: 20px;
    box-shadow:
    6.7px 6.7px 11px rgba(0, 0, 0, 0.061),
    22.3px 22.3px 36.9px rgba(0, 0, 0, 0.089),
    100px 100px 165px rgba(0, 0, 0, 0.15);
}
</style>
