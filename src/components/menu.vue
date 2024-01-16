<template>
    <el-row class="tac">
      <el-menu
        unique-opened
        router 
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu v-for="item of menu" :key="item.path" :index="item.path">
          <template #title>
            <!-- <el-icon>
              <component :is="item.meta.icon" />
              <Location></Location>
            </el-icon> -->
            <!-- <icon class="item.meta.icon"></icon> -->
            <span>{{ item.meta.title }}</span>
          </template>

            <el-menu-item v-for="child of item.children" :key="child.path" :index="child.path">
              {{ child.meta.title }}
            </el-menu-item>

        </el-sub-menu>
    </el-menu>
  </el-row>


</template>
  
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  } from '@element-plus/icons-vue'
  const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
  }
  import menuList from '@/router/menuList'
  import fromatMenu from '@/util/menu_tool'
  import { useRouter } from "vue-router"
  const menu = fromatMenu(menuList,localStorage.getItem('status'))
</script>

<style scoped>
  .tac {
    width: 100%;
    height: 100%;
  }
</style>
  