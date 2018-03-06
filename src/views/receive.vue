<template>
	<div class="receive">
		<header>
		  <span class="el-icon-arrow-left" @click="backHandle"></span>
	      <div>地址管理</div>
	    </header>
	    <section>
	    	<ul class="add-list">
	    		<li class="clearFix" v-for="item,index in addList" :key="index">
	    			<router-link :to="{path:'/pay',query:{addId:item.id}}" tag="div" class="add-info">
	    				<div class="info-title">
	    					<p class="info-name">{{item.name}}</p>
	    					<p class="info-tel">{{item.phone}}</p>
	    				</div>
	    				<p class="info-details">
	    				{{item.addressValue[0]+item.addressValue[1]+item.addressValue[2]+item.address}}
	    				</p>
	    			</router-link>
	    			<router-link :to="{path:'/modify',query:{addId:item.id}}" tag="span" class="el-icon-edit-outline"></router-link>
	    		</li>
	    	</ul>
	    </section>
	    <footer>
	    	<router-link to="/modify" tag="div"><i class="el-icon-plus"></i> 添加地址</router-link>
	    </footer>
	</div>
</template>
<script>
export default{
	computed:{
		addList(){
			return this.$store.state.receiveInfo
		}
	},
	methods:{
		backHandle(){
	  		this.$router.push('/pay');
	  	},
	}
}
</script>
<style>
	
</style>