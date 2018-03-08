<template>
	<div class="sList">
		<orderitem v-for="item,index in getReceivingOrder" :itemData="item" :key="index"></orderitem>
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
		// 筛选待收货的订单
		getReceivingOrder(){
			return this.getOrderData.filter((item)=>{
				return item.status == 2 || item.status == 3 || item.status == 4
			})
		}
	}
}
</script>
<style>
	
</style>