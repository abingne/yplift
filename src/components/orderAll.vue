<template>
	<div class="sList">
		<orderitem v-for="item,index in getOrderData" :itemData="item" :key="index"></orderitem>
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
		}
	},
	created(){
		console.log(this.getOrderData)
	}
}
</script>
<style>
	
</style>