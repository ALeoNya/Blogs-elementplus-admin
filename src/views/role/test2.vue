<template>
    <el-tree
        ref="treeRef"
        :data="data"
        show-checkbox
        node-key="id"
        highlight-current
        :props="treeProps"
    />
    <div class="buttons">
        <el-button @click="getCheckedNodes">get by node</el-button>
        <el-button @click="getCheckedKeys">get by key</el-button>
        <el-button @click="setCheckedNodes">set by node</el-button>
        <el-button @click="setCheckedKeys">set by key</el-button>
        <el-button @click="resetChecked">reset</el-button>
    </div>
</template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { ElTree } from 'element-plus'
  import type Node from 'element-plus/es/components/tree/src/model/node'
  import { allResourceByTree} from '@/apis/resource'

  interface Tree {
    id: number
    label: string
    children?: Tree[]
  }
  
  const treeRef = ref<InstanceType<typeof ElTree>>()
  
  const getCheckedNodes = () => {
    console.log(treeRef.value!.getCheckedNodes(false, false))
  }
  const getCheckedKeys = () => {
    console.log(treeRef.value!.getCheckedKeys(false))
  }
  const setCheckedNodes = () => {
    treeRef.value!.setCheckedNodes(
      [
        {
          id: 5,
          label: 'Level two 2-1',
        },
        {
          id: 9,
          label: 'Level three 1-1-1',
        },
      ] as Node[],
      false
    )
  }
  const setCheckedKeys = () => {
    treeRef.value!.setCheckedKeys([3], false)
  }
  const resetChecked = () => {
    treeRef.value!.setCheckedKeys([], false)
  }
  
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
</script>
  