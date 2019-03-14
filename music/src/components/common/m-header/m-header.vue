<!--头部信息-->
<template>
	<div class="m-header">
		<img src="../../../../static/01.jpg" />
	</div>
</template>

<script>
	export default{
		name:'MHeader'
	}
</script>

<style lang="less">
@import '~style/index.less';
.m-header{
	.w(375);
	.h(44);
	.l_h(44);
	text-align:center;
	color:@font-color-header;
	font-size:@font-size-ms;
	img{
		display: block;
		.w(375);
	    .h(44);
	}
	
}
	
</style>