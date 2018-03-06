<template>
	<div class="login">
		<header>
		  <span class="el-icon-arrow-left" @click="backHandle"></span>
	      <div>有品Lift</div>
	    </header>
	    <section>
	    	<img class="l-logo" src="../assets/mi.png">
	    	<p class="l-title">小米账号登录</p>
	    	<form @submit.prevent='sendLogin' autocomplete="off">
		        <div class="l-text">
		        	<input placeholder="邮箱/手机号码/小米ID" type="text" name="user" ref="userInput" />
					<input placeholder="请输入密码" type="password" name="password" />
		        </div>
		        <div class="l-btn"><input type="submit" value="一键登入" /></div>
		    </form>
	    </section>
	</div>
</template>
<script>
export default {
  name: 'login',
  data(){
  	return {

  	}
  },
  methods:{
  	// 点击回到上一步
  	backHandle(){
      this.$router.back();
    },
    // 登陆
    sendLogin(){
    	console.log(this.$local);
        let userName = this.$refs.userInput.value; // 获取用户名
        this.$local.save('yplift',{	//向缓存中存入一条名为miaov的数据
          login:true,
          userName:userName
        });
        let redirect = this.$route.query.redirect;
        if (!redirect) {
          redirect = "userIndex"
        }
        this.$router.push({
          path:'/'+redirect
        });
        // this.$router.push('/');
    }
  }
}
</script>
<style>
	
</style>