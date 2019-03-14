<!--列表信息-->
<template>
	<div class="tab">
		<!--推荐 歌手 排行 搜索-->
		<!--路由配置 需要页面-->
		<router-link tag="div" to="/recommend" active-class="selected">
			<span class="item">推荐</span>
		</router-link>
		<router-link tag="div" to="/singer" active-class="selected">
			<span class="item">歌手</span>
		</router-link>
		<router-link tag="div" to="/rank" active-class="selected">
			<span class="item">排行</span>
		</router-link>
		<router-link tag="div" to="/search" active-class="selected">
			<span class="item">搜索</span>
		</router-link>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style lang="less" scope>
  /*引入样式*/
 @import '~style/index.less';
 .tab{
 	display:flex;
    .w(375);
    .h(44);
 	div{
 		color:@font-color-tab;
 		font-size:@font-size-ms;
 		/*.bug(red);*/
 		flex:1;
 		text-align: center;
        .l_h(44);
        .item{
        	padding-bottom:5px;
        }	
 	}
 	.selected{
 		color:@font-color-header;
 		.item{
 			border-bottom:2px solid @font-color-header;	
 		}
 	}
 }
</style>