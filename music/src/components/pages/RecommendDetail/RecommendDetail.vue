<template>
	<div class='recommend-detail'>
		<img :src="params.imgurl" alt="" id="djimg" />
		<div>
			<div class='header'>
				<span @click="back" class="back"> << </span>
				<p class="singername"> {{params.dissname}} </p>
			</div>
			<div class="wrapper wrapper-Dj" ref='wrapper'>
				<div class="content">
					<div class="space"></div>
					<div class='recsonglist'>
						<!--在动-->
						<ul>
							<li v-for="(item,index) in recsongs" :key="index">
								<h1>{{item.songname}}</h1>
								<p class="singer-name">{{item.name}}.{{item.albumname}}</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	export default {
		data() {
			return {
				recsongs: []
			}
		},
		computed: {
			params() {
				return this.$route.params
			}
		},
		methods: {
			back() {
				this.$router.back();
			},
			recnormalSongList(list) { //处理数据
				let arr = []
				list.forEach(element => {
					arr.push({
						albumname: element.albumname,
						name: element.singer[0].name,
						songname: element.songname,
						mid: element.singer[0].mid
					})
					console.log(arr);
				})
				this.recsongs = arr
				console.log(this.recsongs)
			},
			recinitSongData() {
				let url = `/hy/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=${this.$route.params.dissid}&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0`
				this.$axios.get(url)
					.then((res) => {
						this.recnormalSongList(res.cdlist[0].songlist);
						console.log(res.cdlist[0].songlist)
						console.log(res.cdlist)
					})
			}
		},
		created() { /*刷新数据消失 解决*/
			console.log(this.$route.params) /*接收参数*/
			if(!this.$route.params.dissid) {
				return this.$router.replace('/recommend')
			}
			this.recinitSongData()
		},
		mounted() {
			console.log(this.$refs.wrapper);
			//vue  中会把标记了ref的dom对象丢到 this.$refs
			let elobj = this.$refs.wrapper
			new BScroll(elobj)
		}
	}
</script>
<style lang="less" scoped>
	@import '~style/index.less';
	.wrapper-Dj {
		.bug(red);
		.padding(262, 0, 0, 0);
		overflow: hidden;
		position: fixed;
		.top(44);
		.bottom(0);
		.left(0);
		.right(0);
	}
	
	.recommend-detail {
		/*background:red;*/
		position: fixed;
		top: 0;
		.w(375);
		bottom: 0;
		z-index: 8;
		flex-direction: column;
		display: flex;
		background: #222;
	}
	.space {
		.padding(0, 0, 218, 0);
	}
	.header {
		.h(44);
		.w(375);
		text-align: center;
		position: absolute;
		z-index: 8;
		span {
			position: absolute;
			.top(10);
			.left(10);
			font-size: @font-size-m;
			color: #FFCD32;
		}
		p {
			font-size: @font-size-l;
			color: #fff;
			.margin(10, 0, 0, 0);
		}
	}
	
	#djimg {
		position: absolute;
		.top(0);
		.left(0);
		width: 100%;
		opacity: .5;
	}
	
	.recsonglist {
		.w(375);
		color: #fff;
		font-size: @font-size-s;
		background: #222;
		ul {
			.padding(20, 20, 30, 30);
			li {
				.padding(8, 8, 0, 0);
				.l_h(24);
				list-style: none;
				h1 {
					font-size: @font-size-m;
				}
				p {
					font-size: @font-size-s;
					color: @font-color-tab;
				}
			}
		}
	}
</style>