<template>
    
    <div class="blogs-admin">
      <el-container class="container">
        <el-aside class="Aside">Aside</el-aside>
        <el-container>
          <el-header class="Header">Header</el-header>
          <el-main class="Main">Main</el-main>
        </el-container>
      </el-container>
    </div>
</template>

<style scoped>
  .blogs-admin {
    height: 100%;
    width: 100%;
    
    /* margin: 0;
    padding: 0; */
  }

  .container {
    height: 100%;
    width: 100%;
  }
  .Aside {
    background-color: #8A7AE8;
  }
  .Header {
    background-color: deeppink;
  }
  .Main {
    background-color: rgba(182, 182, 182, 0.87);
  }
</style>