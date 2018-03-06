<template>
  <ul class="footer">
    <router-link to="/" exact tag="li">
    	<i></i>
      <p>首页</p>
    </router-link>  
    <router-link to="/sort" tag="li">
    	<i></i>
      <p>分类</p>
    </router-link>  
    <router-link to="/cart" tag="li">
    	<i></i>
      <p>购物车</p>
    </router-link>  
    <router-link to="/userIndex" tag="li">
    	<i></i>
      <p>个人</p>
    </router-link>    
  </ul>
</template>
<script>
export default {
  name: 'homefooter',
  data(){
  	return {
  	}
  }
}
</script>
<style scoped>
	
</style>