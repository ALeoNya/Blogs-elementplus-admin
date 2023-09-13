<template>
    <div>
      <el-table :data="tableData">
        <!-- <el-table-column label="Title" prop="title">
          <template #default="{row}">
            <el-input v-model="row.title" />
          </template>
        </el-table-column>
        <el-table-column label="Date" prop="date">
          <template #default="{row}">
            <el-input v-model.number="row.date" type="number" />
          </template>
        </el-table-column> -->
        <el-table-column label="Title" prop="title" width="450"/>
        <el-table-column label="Date" prop="date" width="450"/>

        <el-table-column label="Actions">
          <template #default="{row}">
            <el-button @click="addRow(row)">Add</el-button>
            <el-button @click="deleteRow(row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {ref} from 'vue'
  import { getAllTitle ,deleteArticle} from '@/apis/article'

//   export default {
//     data() {
//       return {
//         // tableData: ref([
//         //   { name: "John", age: 18 },
//         //   { name: "Jane", age: 22 },
//         //   { name: "Tom", age: 31 },
//         // ]),
//         tableData: [
//           { name: "John", age: 18 },
//           { name: "Jane", age: 22 },
//           { name: "Tom", age: 31 },
//         ],
//       };
//     },
//     methods: {
//       addRow(row) {
//         this.tableData.push({});
//       },
//       deleteRow(row) {
//         const index = this.tableData.findIndex((item) => item === row);
//         console.log(this.tableData)
//         this.tableData.splice(index, 1);
//       },
//     },
//   };
let tableData = ref()
const getlistData = () => {
    getAllTitle().then(res=>{
      tableData.value = res.data
      console.log(tableData)
    })
}
getlistData()

const deleteRow = (index: number, row: User) => {
    tableData.value.splice(index, 1);
}
const addRow = (index: number, row: User) =>{
    tableData.value.push({});
}
</script>
  