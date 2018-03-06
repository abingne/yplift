<template>
	<div class="search">
    <router-link to="/" tag="div"><i class="el-icon-search"></i>{{prompt}}</router-link>  
  </div>
</template>
<script>
export default {
  name: 'search',
  props: {
  	prompt: {
  		type:String,
  		default:'搜索你想要的商品'
  	}
  }
}
</script>
<style scoped>
	
</style>