<template>
	<div class="modify">
		<header>
		  <span class="el-icon-arrow-left" @click="backHandle"></span>
	      <div>收货地址</div>
	    </header>
	    <section>
	    	<form>
	    		<ul>
	    			<li>
	    				<p>收货人姓名</p>
	    				<input type="text" name="name" v-model="receive.name">
	    			</li>
	    			<li>
	    				<p>手机号码</p>
	    				<input type="number" name="tel" v-model="receive.tel" @blur="inspectPhone">
	    			</li>
	    			<li class="province">
	    				<p>选择省市</p>
	    				<group>
					      <!-- <x-address title="" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address> -->
					      <x-address @on-shadow-change="onShadowChange" title="" v-model="receive.addressValue" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></x-address>
					    </group>
	    			</li>
	    			<li>
	    				<p>详细地址</p>
	    				<input type="text" name="address" v-model="receive.address">
	    			</li>
	    			<li>
	    				<p>邮政编码</p>
	    				<input type="number" name="code">
	    			</li>
	    			<li>
						<x-icon type="ios-checkmark-outline" size="30" v-show="!receive.addSelect"></x-icon>
      					<x-icon type="ios-checkmark" size="30" v-show="receive.addSelect"></x-icon>
      					<input type="checkbox" v-model="receive.addSelect">
	    				<p>默认地址</p>
	    			</li>
	    		</ul>
	    	</form>
	    </section>
	    <footer>
	    	<button class="del" v-if="delShow" @click="delReceiveHandle(receive.id)">删除</button>
	    	<button class="save" @click="submitReceiveHandle(receive.id)">保存</button>
	    </footer>
	</div>
</template>
<script>
import { Group, Datetime, ChinaAddressV4Data, XAddress } from 'vux'
  export default {
    components: {
      Group,
      Datetime,
      XAddress
    },
    props:{
    	rawValue: true
    },
    data () {
      return {
      	//这个对象是地址信息
      	receive:{	
      		id: '',	//地址信息的id
      		name: '',	//收件人姓名
	        tel: '',	//收件人电话
	        addressValue: [],	//收件地址数组
	        addressId: [],	//收件地址id数组
	        address: '',	//收件人的详细地址
	        addSelect: false	//是否默认地址
      	},
      	showAddress: false,	//地区选择框是否自动弹出
	    addressData: ChinaAddressV4Data,	//地区信息
      	isSave: false,	//判断是保存新数据还是修改数据
      	phoneError: false,	//检验手机号码是否正常
      	delShow: false	//控制删除按钮是否显示
      }
    },
    computed:{
    	// 获取所有地址信息
    	getAddList(){
    		return this.$store.state.receiveInfo
    	},
    	// 获取需要修改的地址信息
    	getAddInfo(){
    		let id = this.$route.query.addId
    		let addInfo = this.getAddList.filter((item)=>{
    			return item.id == id
    		})
    		return addInfo
    	}
    },
    methods:{
    	backHandle(){
	  		this.$router.back();
	  	},
	  	logHide (str) {
	      console.log('on-hide', str)
	    },
	    logShow (str) {
	      console.log('on-show')
	    },
	    onShadowChange (ids, names) {
	      // console.log(ids, names)
	      this.receive.addressId = ids
	      this.receive.addressValue = names
	      // console.log(this.receive.addressId,1)
	      // console.log(this.receive.addressValue,2)
	    },
	    // 验证电话号码
	    inspectPhone(){
	    	let regExp = /^1[3,4,5,7,8]\d{9}$/
	    	if(regExp.test(this.receive.tel)){
	    		this.phoneError = true
	    	}else{
	    		alert("请填写正确的电话号码")
	    	}
	    },
	    // 保存新的地址
	    submitReceiveHandle(id){
	    	console.log(this.receive)
	    	if (this.isSave) {
	    		this.$store.commit('saveReceive',[id,this.receive])
		    	this.$router.push('/receive');
	    	}else{
	    		// 用时间戳设置地址的ID，保证唯一性
		    	this.receive.id = new Date().getTime()
		    	// 判断信息是否填写完善
		    	if (this.receive.name && this.phoneError && this.receive.addressValue && this.receive.addressId && this.receive.address) {
		    		this.$store.commit('submitReceive',this.receive)
		    		this.$router.push('/receive');
		    	}else{
		    		alert('请填写完整的地址信息')
		    	}
		    	// console.log(this.receive)
	    	}
	    },
	    // 删除一条地址信息
	    delReceiveHandle(id){
	    	this.$store.commit('delReceive',id)
	    	this.$router.push('/receive');
	    }
    },
    created(){
    	let addInfo = this.getAddInfo
    	if (addInfo.length >= 1) {
    		this.receive.id = addInfo[0].id
    		this.receive.name = addInfo[0].name
    		this.receive.tel = addInfo[0].tel
    		this.receive.addressValue = addInfo[0].addressValue
    		this.receive.address = addInfo[0].address
    		this.receive.addSelect = addInfo[0].addSelect
    		this.delShow = true
    		this.phoneError = true
    		this.isSave = true
    	}
    }
  }
</script>
<style>
	.vux-x-icon {
	  fill: #845f3f;
	}
</style>