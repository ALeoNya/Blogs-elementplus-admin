<template>
  <el-tree
      ref="treeRef"
      :data="data"
      show-checkbox
      node-key="id"
      highlight-current
      :default-checked-keys="checkedNum"
      :props="treeProps"
  />
  <div class="buttons">
      <el-button @click="getCheckedNodes">get by node</el-button>
      <el-button @click="getCheckedKeys">get by key</el-button>
      <el-button @click="setCheckedKeys">set by key</el-button>
      <el-button @click="resetChecked">reset</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { allResourceByTree} from '@/apis/resource'
import { selResourceByRole} from '@/apis/roleResource'


// 接口     
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

const treeRef = ref<InstanceType<typeof ElTree>>()

const getCheckedNodes = () => {
  console.log(treeRef.value!.getCheckedNodes(false, false))
}
const getCheckedKeys = () => {
  console.log(treeRef.value!.getCheckedKeys(false))
}

const setCheckedKeys = () => {
  treeRef.value!.setCheckedKeys([3], false)
}
const resetChecked = () => {
  treeRef.value!.setCheckedKeys([], false)
}

const treeProps = {  
  children: 'family', // 从 resource 对象中提取 resourceName 作为节点标签  
  label: 'resourceName', // 子节点数组在 ResourceDTO 中的 family 属性  
}
let data = ref([] as ResourceDTO[])
const showList = () => {
  allResourceByTree().then(res => {
    data.value = res.data
  })
}
showList()

// 获取默认选中的资源
let checkedNum:number[] = []
let roleId = 1
const getCheckedNumber = () => {
  selResourceByRole(roleId).then(res=> {
    checkedNum = res.data
  })
}
getCheckedNumber()
</script>
