<template>
	<div class="oList">
		<header>
		  <span class="el-icon-arrow-left" @click="backHandle"></span>
	      <div>我的订单</div>
	    </header>
	    <section>
		    <ul>
		    	<router-link to="/orderlist" tag="li">全部订单</router-link>
		    	<router-link to="/waitPay" tag="li">待付款<span v-show="getWaitPayOrder.length>=1">{{getWaitPayOrder.length}}</span></router-link>
		    	<router-link to="/receiving" tag="li">待收货<span v-show="getReceivingOrder.length>=1">{{getReceivingOrder.length}}</span></router-link>
		    	<router-link to="/refund" tag="li">退款订单<span v-show="getRefundOrder.length>=1">{{getRefundOrder.length}}</span></router-link>
		    	<router-link to="/sign" tag="li">已收货<span v-show="getSignOrder.length>=1">{{getSignOrder.length}}</span></router-link>
		    </ul>
		    <div class="router">
		    	<router-view></router-view>
		    </div>
	    </section>
	</div>
</template>
<script>
import { Tab, TabItem } from 'vux'
export default{
	components: {
	    Tab,
	    TabItem
	},
	data(){
		return {
			orderAll: false,
			ship: false,
			receiving: false,
			refund: false,
			sign: false
		}
	},
	methods:{
		backHandle(){
	  		this.$router.push('/userIndex');
	  	}
	},
	computed:{
		// 从store中获取所有订单
		getOrderData(){
			return this.$store.state.orderData
		},
		// 筛选待付款的订单
		getWaitPayOrder(){
			return this.getOrderData.filter((item)=>{
				return item.status == 1
			})
		},
		// 筛选待收货的订单
		getReceivingOrder(){
			return this.getOrderData.filter((item)=>{
				return item.status == 2 || item.status == 3 || item.status == 4
			})
		},
		// 筛选退款的订单
		getRefundOrder(){
			return this.getOrderData.filter((item)=>{
				return item.status == 6
			})
		},
		// 筛选交易完成的订单
		getSignOrder(){
			return this.getOrderData.filter((item)=>{
				return item.status == 5
			})
		}
	},
}
</script>
<style>
	.router-link-active{
		color: #845f3f;
	}
</style>