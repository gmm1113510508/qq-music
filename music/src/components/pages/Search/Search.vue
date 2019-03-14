<template>
	<div class="search">
		<form>
			<div class="ipcont">
				<img />
				<input class="search"/>
				<label class="hold">搜索歌曲、歌手、专辑</label>
			</div>
		</form>
		<div class="lists">
			<section>
				<h3>热门搜索</h3>
				<ul>
					<li v-for='(item,index) in seeList'>
						{{item.first}}
					</li>
				</ul>
			</section>
		</div>
	</div>
</template>
<script>
	import Data from '../../../data/search.js'
	export default {
		data() {
			return {
				seeList: [],
			}
		},
		created() {
				this.seeList=Data.result.hots;
				console.log(this.seeList);
		}
	}
</script>
<style lang="less" scoped>
	@import '~style/index.less';
	.search {
		.w(375);
		.top(100);
		.left(0);
		.bottom(0);
		.right(0);
		position:fixed;
		background: #222;
		form {
			.w(350);
			.h(30);
			padding: 15px 10px;
			position: relative;
			.ipcont {
				position: relative;
				width: 100%;
				height: 30px;
				padding: 0 30px;
				box-sizing: border-box;
				background: #333;
				border-radius: 30px;
				.search {
					position: absolute;
					left: 30px;
					top: 5px;
					width: 300px;
					height:22px;
					line-height: 18px;
					background: transparent;
					font-size: 14px;
					color: #333;
					border:none;
				}
				.hold {
					position: absolute;
					left: 30px;
					top: 5px;
					font-size: 14px;
					color: #c9c9c9;
					background: transparent;
					pointer-events: none;
				}
			}
		}
		.lists{
			section{
				h3{
					font-size: @font-size-ms;
					color:@font-color-tab;
					.padding(0,0,0,20);
				}
				ul{
					display: flex;
					flex-wrap: wrap;
					li{ 
						.margin(10,10,10,10);
						justify-content:space-around;
						font-size: @font-size-s;
						list-style: none;
						border: 1px solid #333;
						background: #333;
						text-align: center;
						.h(20);
						.l_h(20);
						.w(100);
						border-radius: 50px;
						color:@font-color-tab;
					}
				}
			}
		}
	}
</style>