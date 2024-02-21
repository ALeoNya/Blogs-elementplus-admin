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
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css" media="screen">
		div{
			margin: 100px auto;
			width: 200px;
			height: 200px;
			border: 10px solid red;
			/* box-shadow: 水平位置 垂直位置 模糊距离 阴影尺寸(影子大小) 内外阴影inset，默认外阴影 */
			/* box-shadow: 5px 5px 3px 4px rgba(0, 0, 0, 0.4); */
			transition: all 0.9s;
		}
		div:hover{
			box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
			margin-top: 90px;
		}
	</style>
</head>
<body>
	<div></div>
</body>
</html>

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

<!-- "element-plus": "^2.5.2", -->