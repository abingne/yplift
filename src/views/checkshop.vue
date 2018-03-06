<template>
	<div class="refer">
		<header>
		  <span class="el-icon-arrow-left" @click="backHandle"></span>
	      <div>有品Lift</div>
	    </header>
	    <section>
	    	<div class="orderStatus">
	    		<x-icon type="ios-checkmark" size="100" v-show="status"></x-icon>
	    		<x-icon type="ios-close" size="100" v-show="!status"></x-icon>
	    		<!-- <div class="test"></div> -->
	    		<p class="statusTxt">{{statusTxt}}</p>
	    		<p class="point">超时订单将关闭</p>
	    	</div>
	    	<ul class="orderInfo">
	    		<li>
	    			<p>订单金额</p>
	    			<p>{{orderData.price + orderData.fare - orderData.discount}}元</p>
	    		</li>
	    		<li>
	    			<p>订单编号</p>
	    			<p>{{orderData.orderId}}</p>
	    		</li>
	    		<li>
	    			<p>收货地址</p>
	    			<p class="address">{{orderData.receiveInfo.addressValue[0]+' '+orderData.receiveInfo.addressValue[1]+' '+orderData.receiveInfo.addressValue[2]+' '+orderData.receiveInfo.address+' '+orderData.receiveInfo.name+' '+orderData.receiveInfo.tel}}</p>
	    		</li>
	    		<li>
	    			<p>送货时间</p>
	    			<p>不限送货时间</p>
	    		</li>
	    		<li>
	    			<p>发票类型</p>
	    			<p>电子发票</p>
	    		</li>
	    	</ul>
	    </section>
	    <footer class="clearFix">
	    	<div class="orderTotal">
	    		<p>合计：<span>￥{{orderData.price}}</span></p>
	    		<p>距离订单关闭还有{{closeTime}}小时</p>
	    	</div>
	    	<div class="viewOrder" v-if="viewOrderShow" @click="viewOrder">查看订单</div>
	    	<div class="orderPay">支付</div>
	    </footer>
	</div>
</template>
<script>
export default{
	data(){
		return{
			status: true,
			statusTxt: '支付结果',
			viewOrderShow: true
		}
	},
	computed:{
		// 从store中获取所有订单
		getOrderData(){
			return this.$store.state.orderData
		},
		// 计算当前的订单信息
		orderData(){
			return this.getOrderData.filter((item)=>{
				return item.orderId === this.$route.query.orderId
			})[0]
		},
		// 计算距离订单关闭的时间
		closeTime(){
			let time = new Date()
			let deadline = new Date(this.orderData.deadline) - time
			let d,h,m,s
			if (deadline>=0) {
				d = Math.floor(deadline/1000/60/60/24);  
                h = Math.floor(deadline/1000/60/60%24);  
                m = Math.floor(deadline/1000/60%60);  
                s = Math.floor(deadline/1000%60); 
			}
			return deadline = h;

		}
	},
	methods:{
		backHandle(){
	  		this.$router.back();
	  	},
	  	// 查看订单
	  	viewOrder(){
	  		this.$router.push({name:'Orderdetail',query:{orderId:this.orderData.orderId}})
	  	}
	},
	created(){
		if (this.$route.query.path) {
			this.statusTxt = '支付结果'
		}else{
			this.statusTxt = '订单提交成功'
			this.viewOrderShow = false
		}
	}
}
</script>
<style>
	
</style>