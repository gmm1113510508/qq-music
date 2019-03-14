<template>
	<div class='rank' ref='wrapper'>
		   	<ul class='rankList'>
				<li :key='index' v-for='(item,index) in phList' class="rankLi">
					<div class='ricon'>
						<img width='100' height='100' v-lazy='item.picUrl' alt="">
					</div>
					<div class='text'>
						<ul>
							<li v-for='(rk,index) in item.songList'>{{index+1}} {{rk.songname}}-{{rk.singername}}</li>
						</ul>
					</div>
				</li>
			</ul>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				phList: []
			}
		},
		created() {
			let phurl = '/ph/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1551873290915&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
			this.$axios.get(phurl)
				.then((res) => {
					this.phList = res.data.topList
					console.log(res)
				})
		},
		mounted() {
			console.log(this.$refs.wrapper)
			//vue  中会把标记了ref的dom对象丢到 this.$refs
			let elobj = this.$refs.wrapper
			new BScroll(elobj)
		},
	}
</script>
<style lang="less">
 @import '~style/index.less';
 .rank{
 	.w(375);
 	.h(580);
 	.top(88);
	.left(0);
	.bottom(0);
	.right(0);
	overflow: hidden;
 	.rankList{
 		.w(375);
 		.rankLi{
 			   background:#333;
 			   list-style:none;
 			    display: flex;
 			    .margin(20,20,0,20);
                .h(100);
                .ricon{
                	.w(100);
                	.h(100);
                }
 		}
 		.text{
 			.padding(10,0,0,20);
 			li{
 				list-style:none;
 				font-size:12px;
 				.w(220);
 				.h(26);
 				.l_h(26);
 				color:@font-color-tab;
 				text-overflow: ellipsis;
 				overflow: hidden;
 				white-space: nowrap;	
 			}
 		}
 	}
 }
</style>