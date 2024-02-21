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
            <router-view style="margin: 0%;padding: 0%;"></router-view>
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
    background-color: rgb(237, 242, 247);
  }
</style>