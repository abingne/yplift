<template>
	<div class="list-item">
		<div class="item-info">
			<div class="info-data">
				<div>
					<p>订单日期：{{itemData.currentDate}}</p>
					<p>{{statusTxt}}</p>
				</div>
				<p>{{closeTime}}小时后订单将关闭</p>
			</div>
	    	<div class="goods" v-for="item,index in itemData.goodsData">
	    		<img v-lazy="item.src">
	    		<div class="goodsInfo">
	    			<h3>{{item.title}}</h3>
	    			<div>
	    				<p>￥{{item.price}}</p>
	    				<p><i class="el-icon-close"></i>{{item.count}}</p>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="orderTotal">
	    		共{{itemData.goodsData.length}}件商品，总金额：<span>{{getOrderPrice + itemData.fare - itemData.discount}}元</span>
	    	</div>
	    	<div class="info-btns">
	    		<button>取消订单</button>
	    		<button>去付款</button>
	    	</div>
		</div>
	</div>
</template>
<script>
export default{
	props:{
		itemData:{
			type:Object,
			default: []
		}
	},
	data(){
		return {
			order: false,
			payment: false,
			matchgoods: false,
			ship: false,
			complete: false,
			statusTxt: ''
		}
	},
	computed:{
		// 计算距离订单关闭的时间
		closeTime(){
			let time = new Date()
			let deadline = new Date(this.itemData.deadline) - time
			let h
			if (deadline>=0) {
                h = Math.floor(deadline/1000/60/60%24);  
			}
			return deadline = h;
		},
		// 计算订单总金额
		getOrderPrice(){
			let price = 0
			this.itemData.goodsData.forEach((item)=>{
				price += item.price * item.count
			})
			return price
		}
	},
	created(){
		let status = this.itemData.status
		switch(status)
		{
		    case 1:
		        this.order = true
		        this.statusTxt = '待付款'
		        break;
		    case 2:
		    	this.order = true
		    	this.payment = true
		    	this.statusTxt = '配货中'
		        break;
		    case 3:
		    	this.order = true
		    	this.payment = true
		    	this.matchgoods = true
		    	this.statusTxt = '发货中'
		        break;
		    case 4:
		    	this.order = true
		    	this.payment = true
		    	this.matchgoods = true
		    	this.ship = true
		    	this.statusTxt = '待签收'
		        break;
		    case 5:
		    	this.order = true
		    	this.payment = true
		    	this.matchgoods = true
		    	this.ship = true
		    	this.complete = true
		    	this.statusTxt = '完成'
		        break;
		}
	}
}
</script>
<style>
	
</style>