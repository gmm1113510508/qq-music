<template>
	<!--最外层容器要有宽高    better-scroll不能滚动-->
	<div class='singer warpper'>
		<!--左边部分布局-->
		<div class='scorllList content'>
			<ul class="group" >
				<li v-for='(group,index) in list' :ref="group.title" :key="index" class='group-item'>
					<span class='title'>{{group.title}}</span>
					<ul class='singer-item'>
						<li v-for='(item,index) in group.items' 
						     :key='index'
						     @click='goSingerDetail(item)'
						><!--获取歌手详情页-->
							<img v-lazy="item.avator" width="50" height="50" alt="">
							<p>{{item.name}}</p>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!--右边部分布局-->
		<div class='slider'>
			<ul @touchstart='touchBegin' @touchmove='touchMove'>
				<!--优化  v-for+点击事件  写在父元素-->
				<li v-for='(item,index) of sliderData' 
					:class="{active:index==num}"><!--移动变色-->
					{{item}}
				</li>
			</ul>
		</div>
		<router-view></router-view><!--嵌套路由-->
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Data from 'data/singer.js'
	export default {
		name: "Singer",
		data() {
			return {
				list: [],//存获取的数据
				num:0,//变色
				gtheight:[],//监控左边高度
				js:0
			}
		},
		computed: { //计算属性 处理 this.lists 返回新值
			sliderData() {
				return this.list.map((item) => {
					if(item.title == '热门') {
						return '热' 
					} else {
						return item.title//A B C D..
					}
				})
			},
			getNewNum(){
				for(let i = 0;i<this.gtheight.length;i++){
					let h1=this.gtheight[i]
					let h2=this.gtheight[i+1]
					if(this.js>h1&&this.js<h2){
						return i
					}
				}
			}
		},
		methods: {
			goSingerDetail(item){
				this.$router.push({name:'detail',params:item})//跳转传参
				console.log(item);
			},
			scrollnn(){
				this.scroll = new BScroll('.warpper', {
						probeType: 2,click:true//1 非实时派发  2实时派发  0不派发
					})
				this.scroll.on('scroll', (pos) => {
					console.log(this.$refs)
					this.js=Math.abs(pos.y);
				})
			},
			getHeight(){
                for(let i=0;i<this.sliderData.length;i++){
                	this.sliderData[i]=='热'?'热门':this.sliderData[i]
	                this.gtList=this.$refs[this.sliderData[i]=='热'?'热门':this.sliderData[i]][0]
					this.gtheight.push(this.gtList.offsetTop);
           		 }
                console.log(this.gtheight)//获取高度 不成功
			},
			touchMove(e) { //移动
				let moveY = e.touches[0].clientY - this.touchStartY;//得到的数据减去点击元素的y坐标
				let index = parseInt(moveY / 17) + this.touchindex;
				//this.index<0?index=0:index=22;//边界处理
				//通过移动下标获取  title 和   绑定的元素值  得到A B C D ....
				let targe = this.sliderData[index] == '热' ? '热门' : this.sliderData[index];
				let element = this.$refs[targe][0]
				this.scroll.scrollToElement(element)
				this.num=index;
			},
			touchBegin(e) { //按下
				//获取点击的开始坐标
				this.touchStartY = e.touches[0].clientY;
				//点击的字母在数组里的下标   把下标存起来
				this.touchindex = this.sliderData.indexOf(e.target.innerText);
				let targe = e.target.innerText == '热' ? '热门' : e.target.innerText;
				let element = this.$refs[targe][0];
				this.scroll.scrollToElement(element);
				this.num=this.touchindex;
			},
			normalData(data) {
				let lists = {//改变数据为我们需要的样子
					'hot': {
						title: '热门',
						items: []
					},
					'A': {
						title: 'A',
						items: []
					}
				}
				//热门
				for(let index = 0; index < data.length; index++) {
					let img = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${data[index].Fsinger_mid}.jpg?max_age=2592000`
					if(index <= 10) {//热门
						lists.hot.items.push({
							 name:data[index].Fsinger_name,
                             id:data[index].Fsinger_id,
                             avator:img,
                             mid:data[index].Fsinger_mid
						})
					}
					//分组 按首字母 先判断key值是否存在
					if(!lists[data[index].Findex]) {
						//创建
						lists[data[index].Findex] = {
							title: data[index].Findex,
							items: [{
								name: data[index].Fsinger_name,
								id: data[index].Fsinger_id,
								avator: img,
								mid:data[index].Fsinger_mid
							}]
						}
					} else { //添加
						lists[data[index].Findex].items.push({
							name: data[index].Fsinger_name,
							id: data[index].Fsinger_id,
							avator: img,
							mid:data[index].Fsinger_mid
						})

					}
				}
				//拆分数据= hot+其他  sort排序   ---->拼接
				var hot = [];
				var arr = [];
				for(const key in lists) {
					if(key === 'hot') {
						hot.push(lists[key])
					} else {
						if(key.match(/[a-zA-Z]/)) {
							arr.push(lists[key])
						}
					}
				}
				//排序
				arr.sort((a, b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				this.list = hot.concat(arr)//合并
			}
		},
		created() {
			//1.this指vue下的 components中
			//1.vue 不会处理和监听
			this.getHeight()
			this.touchStartY = 0;
			setTimeout(() => {
				let data=Data.data.list
                this.normalData(data)
				//监听this.scroll的变化
				setTimeout(() => {
					this.scrollnn()
					this.getNewNum
				}, 20)
			}, 500)
		}
	}
</script>
<style lang="less">
	@import '~style/index.less';
	.singer {
		.w(375);
		position: fixed;
		.top(88);
		.bottom(0);
		overflow: hidden;
		.scorllList {
			.group {
				font-size: 0px;
				.group-item {
					.margin(0, 0, 20, 0);
				}
			}
			.title {
				/*.bug(red);*/
				.w(375);
				.h(40);
				display: inline-block;
				.l_h(40);
				background: #333;
				color: @font-color-tab;
				font-size: @font-size-s;
				.padding(0, 0, 0, 20);
				box-sizing: border-box;
			}
			.singer-item {
				li {
					.h(70);
					.w(375);
					.padding(20, 0, 0, 30);
					display: flex;
					box-sizing: border-box;
					font-size: @font-size-m;
					img {
						border-radius: 50%;
					}
					p {
						.h(50);
						.l_h(50);
						color: @font-color-tab;
						.padding(0, 0, 0, 20);
					}
				}
			}
		}
		// 侧边栏
		.slider {
			.w(20);
			font-size: @font-size-s;
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			background: rgba(0, 0, 0, .3);
			.padding(10, 0, 10, 0);
			border-radius: 5px;
			ul {
				list-style: none;
				color: @font-color-tab;
				li {
					text-align: center;
				
				}
			}
		}
	}
.active{
	color:@font-color-header;
}
</style>