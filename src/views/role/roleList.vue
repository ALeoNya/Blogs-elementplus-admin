<!-- 给角色添加权限 -->
<!-- 给用户定义角色 -->
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
  </div>
</template>

<script lang="ts" setup>
// 引用
import { ref, reactive} from 'vue'
// 数据传输接口
interface Role {
    roleName: string,
    isDisable: string,
    createTime: number
}
// 数据传输对象(公共)
let addData = ref<Role>()
// 增加角色
const addRole = () => {

}
// 删除角色
const delRole = () => {

}
// 获取角色列表
const getRoleList = () => {

}
// 管理角色资源/角色名（修改Role_Resource表关系）
const updRoleResource = () => {

}

</script>

<style scoped>

</style>
