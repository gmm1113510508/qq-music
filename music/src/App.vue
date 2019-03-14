<!--主组件 用<router-view>渲染整个工程组件-->
<template>
  <div id="app">
    <!--<img src="./assets/logo.png">
    <router-view/>-->
   <!-- <p>这里是测试</p>-->
   <m-header></m-header>
   <tab></tab>
   <keep-alive>
      <router-view></router-view>
   </keep-alive>
   <player></player>
  </div>
</template>

<script>
	import {mapState} from 'vuex'
	/*common为起的别名 build*/
	import MHeader from 'common/m-header/m-header';
	import Tab from 'common/tab/tab';
	import Player from 'common/player/player';
	
	
export default {
  name: 'App',
  components:{
  	MHeader,
  	Tab,
  	Player	
  }
}
</script>

<style lang="less">
	/*样式别名加~*/
@import "~style/index.less";
/*div{
	background: @bg-color;
	.w(187.5);
}*/

</style>
