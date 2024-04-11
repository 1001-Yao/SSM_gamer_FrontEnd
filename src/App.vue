 <template>
<div>
<!--  引入Header组件/界面 头部-->
<Header/>
<!--  主体部分-->
  <div style="display:flex">
<!--    侧边栏部分-->
    <Aside/>
<!--    内容区域 这个部分通过路由展示，我们路由到HomeView.vue(再次展示内容)-->
<!--    在index.html中，路径router+/的路由为homeView,而此页面即为,自然显示-->
  <router-view style="flex: 1"/>
  </div>
</div>

</template>

 <script>
 import Header from "@/components/Header.vue";
 import Aside from "@/components/Aside.vue";
 export default {
   name:"Layout",
   components:{
     Header, Aside
   }
 }
 </script>
<style>

</style>
 <script setup>
 </script>