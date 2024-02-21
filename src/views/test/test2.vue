<template>
    <el-tabs v-model="tabValue" type="card" @tab-remove="removeTab">
      <el-tab-pane label="首页" name="home">
        <Home />
      </el-tab-pane>
      <el-tab-pane
        v-for="item in tabList"
        :name="item.name"
        :key="item.name"
        closable
      >
        <component :is="item.componentName" v-bind="item.data"></component>
      </el-tab-pane>
    </el-tabs>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  interface TabType {
    title: string; //标签页显示名称
    componentName: string; //动态组件名
    data: any; //动态组件传参
  }
  
  interface TabListType extends TabType {
    name: string; //标签页唯一标识，添加标签页时根据 componentName 自动生成
  }
  
  const tabList = ref<TabListType[]>([]); //存放标签页数组
  const tabValue = ref("home"); //存放当前激活标签页，默认激活首页
  
  //添加标签页的方法
  const addTab = (tab: TabType) => {
    //保证相同组件路径标签页 name 标识唯一
    const name = `${tab.componentName}_${Date.now()}`;
    tabList.value.push({ ...tab, name });
    tabValue.value = name;
  };
  
  //移除标签页的方法
  const removeTab = (targetName: string) => {
    const index = tabList.value.findIndex((item) => item.name === targetName);
    tabList.value.splice(index, 1);
    //当前激活标签页与触发右键菜单标签页是同一页
    if (targetName === tabValue.value) {
      //当前激活标签页是标签页数组的第一个，则将激活标签页设置为 home
      //当前激活标签页不是标签页数组的第一个，则将激活标签页设置为当前激活标签页的前一页
      tabValue.value = index === 0 ? "home" : tabList.value[index - 1].name;
    }
  };
  </script>
  