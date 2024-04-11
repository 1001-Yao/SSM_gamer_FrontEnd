<template>
  <div class="home-page">
    <!-- 背景图 -->
    <div class="background-image">
      <img src="@/assets/background.jpg" alt="Background Image" />
    </div>

    <!-- 导航链接 -->
    <div class="nav-links">
      <ul>
        <li><a href="/">首页</a></li>
<!--        <li><a href="/about">关于我们</a></li>-->
        <li><a href="/home">主要业务</a></li>
        <li><a href="/ygq">关于我</a></li>
      </ul>
    </div>

    <!-- 页面内容 -->
    <div class="page-content">
      <h1>欢迎来到首页</h1>
      <p>目的是总结一个SSM项目如何整合并运行，记录其使用的依赖、技术，与其心得体会为学习使用Spring Boot做项目做铺垫。<br>
        简单的后台管理系统，实现对数据的增删改查。<br>
        前端技术栈：vue3 + node.js + Axios + Element plus<br>
        后端框架：SpringMVC + Spring + Mybatis<br>
        依赖管理： Maven<br>
        分页：    pagehelper<br>
        逆向工程：MyBatis Generator<br>
        数据库：Mysql<br>
      </p>

      <!-- 其他页面元素，如图片、按钮等 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.background-image img {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.nav-links {
  margin-bottom: 20px;
}

.nav-links ul {
  list-style-type: none;
  padding: 0;
}

.nav-links li {
  display: inline-block;
  margin-right: 10px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.page-content {
  text-align: center;
}
</style>