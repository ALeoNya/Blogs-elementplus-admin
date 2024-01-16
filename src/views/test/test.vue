<template>
  <icon class="iconfont icon-github"></icon>
  <p>这是一个前端接口调试页面，保证后端接口的数据成功被前端接收</p>
  <icon name="" type="class"></icon>

  <!-- <template>
  <div class="menu">
    <ul>
      <li v-for="route in routes" :key="route.name">
        <router-link :to="route.path">
          <i :class="route.meta.icon"></i>
          {{route.meta.title}}
        </router-link>
      </li>
    </ul>
  </div>
</template> -->

</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { getAllArticle } from '@/apis/article';
  import { useRoute, useRouter } from 'vue-router'

  // 获取route对象
  const route = useRoute()
  // 获取router实例
  const router = useRouter()
  //通过ruter获取所有路由对象
  const routes = router.options.routes
  console.log(routes)

   
  let getAllTitle = () => {
    getAllArticle().then(res => {
      const a = Object.values(res.data)
      console.log("a is : ")
      console.log(a )

    })
  }
  getAllTitle()
</script>