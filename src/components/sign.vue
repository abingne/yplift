<template>
	<div class="sList">
		<orderitem v-for="item,index in getSignOrder" :itemData="item" :key="index"></orderitem>
		<div>已加载完毕</div>
	</div>
</template>
<script>
import orderitem from '@/components/orderitem'
export default{
	name: 'orderAll',
	components:{
		orderitem
	},
	computed:{
		// 从store中获取所有订单
		getOrderData(){
			return this.$store.state.orderData
		},
		// 筛选交易完成的订单
		getSignOrder(){
			return this.getOrderData.filter((item)=>{
				return item.status == 5
			})
		}
	},
	created(){
		console.log(this.getOrderData)
	}
}
</script>
<style>
	
</style>