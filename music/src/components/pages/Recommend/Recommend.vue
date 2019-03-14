<template>
	<div class="wrapper" ref='wrapper'>
		<div class="content">
			<div class='banner'>
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="item in bannerlist">
							<img :src="item.picUrl" />
						</div>
					</div>
				</div>
			</div>

			<h4>热门推荐</h4>
			<!-- <img src="../../../assets/logo.png" alt="">
        <hr>
        <img src="/static/logo.png" alt=""> -->
			<ul class='recomList'>
				<li :key='index' v-for='(item,index) in list' @click="goRecommendDetail(item)">
					<div class='icon'>
						<img width='60' height='60' v-lazy='item.imgurl' alt="">
					</div>
					<div class='text'>
						<p class='name'>{{item.creator.name}}</p>
						<p class='diss'>{{item.dissname}}</p>
					</div>
					<!-- <img v-lazy="img" alt=""> -->
				</li>
			</ul>
		</div>
		<router-view></router-view><!--嵌套路由-->
		
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Swiper from "swiper"
	export default {
		data() {
			return {
				list: [],
				bannerlist: []
			}
		},
		methods: {
			goRecommendDetail(item) {
				this.$router.push({
					name: 'RecommendDetail',
					params: item
				}) //跳转传参
				console.log(item);
			},
			initBanner() {
				var mySwiper = new Swiper('.swiper-container', {
					loop: true, // 循环模式选项
					autoplay: true
				})
			}
		},
		created() {
			let url = '/hy/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.3920376084015764'
			this.$axios.get(url)
				.then((res) => {
					this.list = res.data.list
					console.log(res)
				})
			let bannerurl = "/hehe/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1551518140669&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1"
			this.$axios.get(bannerurl)
				.then((res) => {
					/*console.log(data)*/
					this.bannerlist = res.data.slider
					this.$nextTick(() => {
						this.initBanner()
					})
				})
				.catch((err) => {
					console.log(err)
				})
		},
		mounted() {
			console.log(this.$refs.wrapper)
			//vue  中会把标记了ref的dom对象丢到 this.$refs
			let elobj = this.$refs.wrapper
			new BScroll(elobj,{click:true})
		},
		activated() {
			console.log('进入缓存页面')
		},
		deactivated() {
			console.log('离开缓存页面')
		},
		destroyed() {
			console.log('销毁了')
		}

	}
</script>
<style lang="less" scope>
	@import url("../../../../node_modules/swiper/dist/css/swiper.min.css");
	@import '~style/index.less';
	.wrapper {
		.banner {
			.w(375);
			.h(150);
			background: #fff;
			.swiper-container {
				.h(150);
				.w(375);
				.swiper-slide {
					img {
						display: inline-block;
						.h(150);
						.w(375);
					}
				}
			}
		}
		h4 {
			color: @font-color-header;
			font-size: @font-size-m;
			text-align: center;
			.padding(15,
			0,
			15,
			0)
		}
		/*.bug(red);*/
		position: fixed;
		.top(88);
		.left(0);
		.bottom(0);
		.right(0);
		/*.bug(red);*/
		overflow: hidden;
		.recomList {
			li {
				.padding(0,
				20,
				20,
				20);
				display: flex;
				font-size: @font-size-m;
				.icon {
					.padding(0,
					20,
					0,
					0);
				}
				.name {
					color: @font-color-item;
					.padding(10,
					0,
					5,
					0);
				}
				.diss {
					font-size: @font-size-s;
					color: @font-color-tab;
				}
			}
		}
	}
</style>