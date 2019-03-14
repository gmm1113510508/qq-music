
<template>
	<div class='singer-detail'>
		<img :src="params.avator" alt="" id="singerimg"/>
		<div>
			<div class='header'>
				<span @click="back" class="back"> <<  </span>
				<p> {{params.name}} </p>
			</div>
			<div class='songlist' ref="wrapper">
				<div class="content">
					<div class="space"></div>
					<div class='singerlist'>
						<!--在动-->
						<ul>
							<li v-for="(item,index) in songs" :key="index" @click="playMusic(index)">
								<h1>{{item.songname}}</h1>
								<p>{{item.name}}.{{item.albumname}}</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import jsonp from '@/common/js/josnp.js' /*jsonp 获取数据*/
	import BScroll from 'better-scroll';
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				songs: []
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
			//...mapMutations({/*注册*/
			//addSongList=play.addSongList
			//}),
			playMusic(index) {
				this.$store.commit('changeIndex', index); //当前下标
				this.$store.commit('addSongList', this.songs); //整条数据
				this.$store.commit('changeShow'); 
				
			},
			normalSongList(list) { //处理数据
				let arr = []
				list.forEach(element => {
					arr.push({
						albumname: element.musicData.albumname,
						name: element.musicData.singer[0].name,
						songname: element.musicData.songname,
						mid: element.musicData.singer[0].mid,
						songmid: element.musicData.songmid,
						albid: element.musicData.albummid,
						interval: (element.musicData.interval/60).toFixed(2) //播放总时间
					})
				});
				console.log(arr)
				this.songs = arr
			},
			initSongData() {
				let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${this.$route.params.mid}`
				jsonp(url)
					.then((data) => {
						this.normalSongList(data.data.list)
						console.log(data)
					})
			}
		},
		created() { /*刷新数据消失 解决*/
			console.log(this.$store);
			console.log(this.$route.params) /*接收参数*/
			if(!this.$route.params.name) { //返回singer页面
				return this.$router.replace('/singer')
			}
			this.initSongData()
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
	.songlist{
		.padding(262, 0, 0, 0);
		overflow: hidden;
		position: fixed;
		.top(44);
		.bottom(0);
		.left(0);
		.right(0);
	}
	.singer-detail{
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
	
	#singerimg {
		position: absolute;
		.top(0);
		.left(0);
		width: 100%;
		opacity: .5;
	}	
	.singerlist {
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