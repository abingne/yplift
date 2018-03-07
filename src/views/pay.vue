<template>
	<div class="pay">
		<header>
		  <router-link to="/cart" tag="span" class="el-icon-arrow-left"></router-link>
	      <div>商品结算</div>
	    </header>
	    <section>
	    	<div v-if="!postAdd" class="address" @click="editAddHandle">没有地址信息，请点击添加地址<span class="el-icon-arrow-right"></span></div>
	    	<router-link v-else to="/receive" class="addressShow clearFix" tag="div">
	    		<div class="add-info">
    				<div class="info-title">
    					<p class="info-name">{{postAdd.name}}</p>
    					<p class="info-tel">{{postAdd.tel}}</p>
    				</div>
    				<p class="info-details">
    				{{postAdd.addressValue[0]+postAdd.addressValue[1]+postAdd.addressValue[2]+postAdd.address}}
    				</p>
    			</div>
	    		<span class="el-icon-arrow-right"></span>
	    	</router-link>
	    	<dl class="wait-pay">
	    		<dt class="wait-delivery">有品配送</dt>
	    		<dd class="wait-goods" v-for="item,index in getpayList" :key="index">
	    			<img :src="item.src">
	    			<div class="wait-goods-text">	
	    				<h3>{{item.title}}</h3>
	    				<p>￥{{item.price}}</p>
	    				<p class="numIcon"><i class="el-icon-close"></i>{{item.count}}</p>
	    			</div>
	    		</dd>
	    	</dl>
	    	<dl class="delivery-info">
	    		<dd class="d-method">
	    			<p>配送方式</p>
					<span>快递配送</span>
	    		</dd>
	    		<dd class="d-ticket">
	    			<p>发票类型</p>
					<!-- <span>不开发票<i class="el-icon-arrow-right"></i></span> -->
				    <popup-radio :options="invoiceArray" v-model="invoiceTitle" ></popup-radio>
				    <!-- <popup-radio :options="options1" v-model="option1"></popup-radio> -->
	    		</dd>
	    		<dd class="d-letter" v-show="invoiceTitle=='公司'">
	    			<p>发票抬头</p>
					<input type="tetx" v-model="invoiceName" placeholder="请输入公司发票抬头">
	    		</dd>
	    		<dd class="d-letter">
	    			<p>买家留言</p>
					<input type="tetx" placeholder="选填，30字以内">
	    		</dd>
	    		<dd class="d-mail">
	    			<p>邮费：{{fare = getpayListPrice>=999?0:20}}.00元</p>
					<span>共计{{getpayListCount}}件商品，小计：<span>{{getpayListPrice}}元</span></span>
	    		</dd>
	    	</dl>
	    	<div class="coupon">优惠券/优惠嘛<span class="el-icon-arrow-right"></span></div>
	    	<dl class="total-pay">
	    		<dd>商品总价<span>￥{{getpayListPrice}}.00</span></dd>
	    		<dd>运费<span>￥{{fare}}.00</span></dd>
	    		<dd>优惠<span>￥{{discount}}</span></dd>
	    	</dl>
	    </section>
	    <footer>
	    	<div class="total">合计：<p>￥{{total = getpayListPrice+fare-discount}}.00</p></div>
	    	<div class="paying" @click="submitOrderHandle">去支付</div>
	    </footer>
	</div>
</template>
<script>
import { Group, PopupRadio } from 'vux'
export default{
	components: {
    	Group,
    	PopupRadio
  	},
	data(){
		return {
			fare:0,	//订单运费
			discount:0,	//优惠券金额
			total:0,	//需要支付的费用（包含邮费，减去优惠券）
			postAdd: {},	//订单的地址信息
			invoiceTitle: '个人',	//默认的发票主题
			invoiceArray: ['个人', '公司'],	//发票主题数组
		    invoiceName: '',	//发票为公司时的抬头信息
		    isInvoice: true	//判断发票信息是否正确
		}
	},
	computed:{
		// 从store中获取地址信息
		getAddInfo(){
			return this.$store.state.receiveInfo
		},
		// 过滤出默认地址信息
		getDeaultAddInfo(){
			let defaultAdd = this.getAddInfo.filter((item)=>{
				return item.addSelect == true
			})[0]
			return defaultAdd
		},
		// 获取用户选择的地址
		getSelectAdd(){
			let addId = this.$route.query.addId
			let add = this.getAddInfo.filter((item)=>{
				return item.id == addId
			})
			return add
		},
		// 从store中获取所有待结算的商品
		getpayList(){
			return this.$store.getters.getpayList
		},
		// 计算待结算商品的数量
		getpayListCount(){
			let count = 0;
			this.getpayList.forEach((item)=>{
				count += item.count
			})
			return count
		},
		// 计算待结算商品的总价格(不包含运费及优惠券)
		getpayListPrice(){
			let price = 0
			this.getpayList.forEach((item)=>{
				price += item.price * item.count
			})
			return price
		}
	},
	methods:{
		// 顶部返回上一页
		backHandle(){
	  		this.$router.back();
	  	},
	  	// 选择地址
	  	editAddHandle(){
	  		this.$router.push('/receive')
	  	},
	  	// 提交订单
	  	submitOrderHandle(){
	  		// 判断发票的主体是否为公司，并判断是否填写抬头信息
	  		if (this.invoiceTitle == '个人') {
	  			this.invoiceName = this.postAdd.name
	  		}else{
	  			if (!this.invoiceName) {
	  				this.isInvoice = false
	  			}
	  		}
	  		if (this.getpayList.length>=1) {
	  			// 获取当前时间生成订单时间
		  		let iDate = new Date()
		  		let month = iDate.getMonth() + 1
		  		let strDate = iDate.getDate()
		  		let hours = iDate.getHours()
		  		let minutes = iDate.getMinutes()
		  		month:month<10?'0'+month:month
		  		if (strDate >= 1 && strDate <= 9) {
		  			strDate = '0' + strDate
		  		}
		  		if (hours >= 1 && hours <= 9) {
		  			hours = '0' + hours
		  		}
		  		if (minutes >= 1 && minutes <= 9) {
		  			minutes = '0' + minutes
		  		}
		  		// 订单信息对象
		  		let data = {
		  			orderId: iDate.getTime(),	//生成订单id
		  			goodsData: this.getpayList,	//订单商品列表
		  			price: this.getpayListPrice,	//订单商品价格
		  			fare: this.fare,	//订单运费
		  			discount: this.discount,	//订单优惠信息
		  			invoiceTitle: this.invoiceTitle,	//订单发票主体
		  			invoiceName: this.invoiceName,	//订单发票抬头
		  			receiveInfo: this.postAdd,	//订单地址信息
		  			currentDate: iDate.getFullYear() + '/' + month + '/' + strDate + ' ' + hours + ':' +minutes,	//订单生成的时间
		  			deadline: new Date().setHours (iDate.getHours () + 24),
		  			isPay: false,	//订单支付状态信息
		  			status: 1 	//订单状态，1表示下单待支付，2表示支付完成待配货，3表示配货完成待发货，4表示发货完成待签收，5表示签收完成,6表示退款
		  		}
		  		this.$store.commit('submitOrder',data)
		  		this.$router.push({name:'Checkshop',query:{orderId:data.orderId,path:this.$route.path.slice(1)}})
	  		}
	  		
	  	}
	},
	created(){
		// 判断用户是否更改地址
		if (this.getSelectAdd.length <= 0) {
			this.postAdd = this.getDeaultAddInfo
		}else{
			this.postAdd = this.getSelectAdd[0]
		}
	}
}
</script>
<style>
	
</style>