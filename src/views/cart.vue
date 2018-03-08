<template>
	<div class="main">
		<div class="c-head">
			<img src="../assets/ypLogo.png" class="logo">
			<p class="slogan">买爆品 上有品</p>
			<button class="edit" v-show="!edit" @click="changeEditHandle">编辑</button>
			<button class="edit" v-show="edit" @click="changeEditHandle">完成</button>
		</div>
		<div v-if="cartList.length<=0">没有商品</div>
		<dl class="c-shopList" v-else>
			<!-- <dt>
				<span class="radio">
					<img src="../assets/checkedIcon.png" class="radioT" v-show="status"></i>
					<i class="radioF" v-show="!status"></i>
					<input type="checkbox" :checked="status">
				</span>
				<p class="delivary">有品配送</p>
				<span class="norm">
					<img src="../assets/cNorm.png">
					<p>满99.00元免运费</p>
				</span>
			</dt> -->
			<dd v-for="item in cartList">
				<span class="radio">
					<img src="../assets/checkedIcon.png" class="radioT" v-show="item.isSelected"></i>
					<i class="radioF" v-show="!item.isSelected"></i>
					<input type="checkbox" :checked="item.isSelected" @change="changeHandel(item)">
				</span>
				<img class="image" v-lazy="item.src" @click="changeRoute(item.id)">
				<span class="c-info">
					<h3 @click="changeRoute(item.id)">{{item.title}}</h3>
					<p>小计 ￥{{item.price*item.count}}</p>
					<div class="c-add">
						<span class="c-price">￥{{item.price}}</span>
						<div class="c-inputNum">
							<span class="el-icon-minus" @click="lessCountHandle(item)"></span><!--
							--><input type="text" :value="item.count"><!--
							--><span class="el-icon-plus" @click="plusCountHandle(item)"></span>
						</div>
					</div>
				</span>
			</dd>
		</dl>
		<div class="c-footer">
			<span class="radio">
				<img src="../assets/checkedIcon.png" class="radioT" v-show="selectall"></i>
				<i class="radioF" v-show="!selectall"></i>
				<input type="checkbox" :checked="selectall" @click="selectallHandle">
			</span>
			<p class="selectall">全选</p>
			<p class="total">已选{{count}}件商品 <span>合计:<i>￥{{price}}元</i></span></p>
			<router-link to="/pay" class="c-btn" tag="button" v-show="!edit" >去结算</router-link>
			<button class="c-btn" v-show="edit" @click="delCart">删除</button>
		</div>
	</div>
</template>
<script>
export default{
	name:'cart',
	data(){
		return {
			edit:false,
			selectall:false
		}
	},
	computed:{
		// 从store中获取购物车商品总数
		cartList(){
			return this.$store.state.carPanelData
		},
		// 从store中获取已选商品总数
		count(){
			return this.$store.getters.totalSelectCount
		},
		// 从store中获取商品总价格
		price(){
			return this.$store.getters.totlePrice
		},
		status(){
			return this.cartList.every((item)=>{
				return item.isSelected == true
			})
		}
	},
	methods:{
		// 购物车进入商品详情
		changeRoute(id){
			this.$router.push('/detaview/'+id);
		},
		changeHandel(item){
			item.isSelected = !item.isSelected
		},
		changeEditHandle(){
			this.edit = !this.edit
		},
		// 删除购物车中的商品
		delCart(){
			let delList = this.cartList.filter((item)=>{
				return item.isSelected == true
			})
			this.$store.commit('delCarPanelData',delList)
		},
		// 全选
		selectallHandle(){
			this.$store.commit('selectall')
			this.selectall = !this.selectall
		},
		// 删减购物车内商品的数量
		lessCountHandle(item){
			this.$store.commit('lessCount',item)
		},
		// 增加购物车内商品的数量
		plusCountHandle(item){
			this.$store.commit('plusCount',item)
		}
	}
}
</script>
<style scoped>

</style>
