<template>
	<div class="details">
		<header>
		  <span class="el-icon-arrow-left" @click="backHandle"></span>
	      <div>商品详情</div>
	    </header>
	    <section>
	      <div class="swiperImg">
	      	<swiper :simg="currentItem.swiperImg"></swiper>
	      </div>
	      <div class="data-title">
	      	<h3>{{currentItem.title}}</h3>
	      	<p class="desc">{{currentItem.briefly}}</p>
	      	<p class="price">￥{{currentItem.price}}<a href="javascript:;">￥999</a></p>
	      </div>
	      <div class="select">
	      	<p class="selected">已选：</p>
	      	<p class="parameter">便携式果蔬料理机</p>
	      	<span class="el-icon-arrow-right"></span>
	      </div>
	      <div>
	      	
	      </div>
	    </section>
	    <footer>
	      <div class="cart">
			<img src="../assets/cartIcon.png" class="cartImg">
			<p>购物车</p>
			<span v-show="count">{{count}}</span>
	      </div>
	      <router-link to="/pay" class="buy" tag="div">立即购买</router-link>
	      <div class="plus" @click="addCarPanelHandle(currentItem)">加入购物车</div>
	    </footer>
	</div>
</template>
<script>
import swiper from '@/components/swiper'

export default {
  name: 'detaview',
  components:{
    swiper
  },
  data(){
  	return {
  		currentItem:{},
  		ball:{
  			show:false
  		}
  	}
  },
  computed:{
  	list(){
  		return this.$store.state.list
  	},
  	count(){
  		return this.$store.getters.totleCount
  	}
  },
  watch:{
  	$route(){
  		this.getData()
  	}
  },
  created(){
  	this.getData()
  },
  methods:{
  	// 返回上一页
  	backHandle(){
  		this.$router.back();
  	},
  	// 获取当前这个页面应该渲染的商品对象
  	getData(){
  		let id = this.$route.params.gid;
  		if(id){
			this.currentItem = this.list.filter((item)=>{
				return item.id == id
			})[0];
		}else{
			this.currentItem = {};
		}
  	},
  	addCarPanelHandle (data) {
        this.$store.commit('addCarPanelData',data)
        this.ball.show = true
    }
  }
  
}
</script>
<style>
	.ball-enter-active{
	    transition: .5s;
	}
	.ball-enter-active .alert{
		opacity: 1;
	    transition: .5s;
	}
</style>