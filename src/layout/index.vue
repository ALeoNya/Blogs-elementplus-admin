<script lang="ts" setup>
  import Menu from '@/components/menu.vue'
</script>
<template> 
    <div class="blogs-admin">
      <el-container class="container">
        <el-aside class="Aside">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <el-header class="Header">Header(这里是选项栏)</el-header>
          <el-main class="Main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<style scoped>
  .blogs-admin {
    height: 100%;
    width: 100%;
  }

  .container {
    height: 100%;
    width: 100%;
  }
  .Aside {
    background-color: #8A7AE8;
    width: 200px;
  }
  .Header {
    background-color: deeppink;
  }
  .Main {
    background-color: white;
  }
</style>