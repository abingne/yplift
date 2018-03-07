<template>
	<div class="oDetail">
		<header>
		  <span class="el-icon-arrow-left" @click="backHandle"></span>
	      <div>订单详情</div>
	    </header>
	    <section>
	    	<div class="d-orderInfo">
	    		<div class="d-orderStatus">
	    			<p>订单状态</p>
	    			<p>{{statusTxt}}</p>
	    		</div>
	    		<flow>
			      	<flow-state state="1" title="下单" :is-done="order"></flow-state>
			      	<flow-line :is-done="payment"></flow-line>

			      	<flow-state state="2" title="付款" :is-done="payment"></flow-state>
			      	<flow-line :is-done="matchgoods"></flow-line>

			      	<flow-state state="3" title="配货" :is-done="matchgoods"></flow-state>
			      	<flow-line :is-done="false"></flow-line>

			      	<flow-state state="4" title="发货" :is-done="false"></flow-state>
			      	<flow-line :is-done="complete"></flow-line>

			      	<flow-state state="5" title="完成" :is-done="complete"></flow-state>
			    </flow>
			    <ul class="react-view">
			    	<li>
			    		<p>订单编号</p>
			    		<p>{{orderData.orderId}}</p>
			    	</li>
			    	<li>
			    		<p>订单日期</p>
			    		<p>{{orderData.currentDate}}</p>
			    	</li>
			    	<li>
			    		<p>订单金额</p>
			    		<p>￥{{orderData.price + orderData.fare - orderData.discount}}</p>
			    	</li>
			    </ul>
	    	</div>
	    	<div class="orderGoods">
		    	<div class="goods" v-for="item,index in getGoodsData">
		    		<img :src="item.src">
		    		<div class="goodsInfo">
		    			<h3>{{item.title}}</h3>
		    			<div>
		    				<p>￥{{item.price}}</p>
		    				<p><i class="el-icon-close"></i>{{item.count}}</p>
		    			</div>
		    		</div>
		    	</div>
		    	<div class="orderTotal">
		    		共{{getGoodsData.length}}件商品，合计：<span>{{getGoodsPrice}}元</span>
		    	</div>
		    </div>
		    <div class="orderAddress">
		    	<div>
		    		<p>{{orderData.receiveInfo.name}}</p>
		    		<p>{{orderData.receiveInfo.tel}}</p>
		    	</div>
		    	<p>{{orderData.receiveInfo.addressValue[0]+' '+orderData.receiveInfo.addressValue[1]+' '+orderData.receiveInfo.addressValue[2]+' '+orderData.receiveInfo.address}}</p>
		    </div>
		    <ul class="orserSendInfo">
		    	<li>
		    		<p>运费</p>
		    		<p>{{orderData.fare}}元</p>
		    	</li>
		    	<li>
		    		<p>优惠券</p>
		    		<p>{{orderData.discount}}元</p>
		    	</li>
		    	<li>
		    		<p>送货时间</p>
		    		<p>不限时间</p>
		    	</li>
		    	<li>
		    		<p>发票类型</p>
		    		<p>电子发票</p>
		    	</li>
		    	<li>
		    		<p>发票信息</p>
		    		<p>{{orderData.invoiceTitle}}</p>
		    	</li>
		    	<li>
		    		<p>买家留言</p>
		    		<p>匿名购买</p>
		    	</li>
		    </ul>
	    </section>
	    <footer>
	    	<p>{{closeTime}}小时后订单将关闭</p>
	    	<button>去付款</button>
	    </footer>
	</div>
</template>
<script>
import { Flow, FlowState, FlowLine } from 'vux'
export default{
	props:{
		isDone:{
			type: Boolean,
			default: true
		}
	},
	components: {
	    Flow,
	    FlowState,
	    FlowLine
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
		// 从当前订单中获取到订单中的商品
		getGoodsData(){
			return this.orderData.goodsData
		},
		// 计算订单中所有商品的总价格（不包含运费）
		getGoodsPrice(){
			let price = 0
			this.getGoodsData.forEach((item)=>{
				price += Number(item.price) * item.count
			})
			return price
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
	  		this.$router.push('/orderlist');
	  	}
	},
	created(){
		let status = this.orderData.status
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