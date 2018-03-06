<template>
	<div class="main">
		<div class="u-head">
			<img src="../assets/logo.png">
			<div class="loginInfo" @click="loginHandel">
				<p class="userName">{{userName}}</p>
				<span v-show="!isLogin" class="more"><i class="el-icon-arrow-right"></i></span>
			</div>
		</div>
		<ul class="u-list">
			<router-link to="/orderlist" tag="li">
				<img src="../assets/uOrderIcon.png">
				<span>我的订单</span>
				<i class="el-icon-arrow-right"></i>
			</router-link>
			<li>
				<img src="../assets/uCouponIcon.png">
				<span>优惠券</span>
				<i class="el-icon-arrow-right"></i>
			</li>
			<li>
				<img src="../assets/uSpecialIcon.png">
				<span>特权购</span>
				<i class="el-icon-arrow-right"></i>
			</li>
			<li>
				<img src="../assets/uAddressIcon.png">
				<span>收货地址</span>
				<i class="el-icon-arrow-right"></i>
			</li>
			<li>
				<img src="../assets/uAboutmeIcon.png">
				<span>关于我们</span>
				<i class="el-icon-arrow-right"></i>
			</li>
		</ul>
	</div>
</template>
<script>
export default{
	name:'userIndex',
	data(){
		return {
			userName: '请登录',
			isLogin: false
		}
	},
	created(){
		// 获取登录信息
		let info = this.$local.fetch('yplift');
		
		if (info.userName) {
			this.userName = info.userName;
			this.isLogin = info.login;
		}else{
			this.userName = '请登录';
			this.isLogin = false;
		}	
	},
	methods:{
		loginHandel(){
			let info = this.$local.fetch('yplift');
			console.log(info);
			if (!info.userName) {
				console.log(1);
				this.$router.push('/login');
			}
		}
	}
}
</script>
<style scoped>

</style>