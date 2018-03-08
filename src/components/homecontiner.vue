<template>
	<ul class="homecontiner">
		<router-link :to="{path:'/detaview/'+data.id}" tag="li">
			<img v-lazy="data.src" alt=""><!--
			--><div class="info">
				<h3 class="title">{{data.title}}</h3>
				<p class="briefly">{{data.briefly}}</p>
				<p class="price">￥ {{data.price}}</p>
			</div>
		</router-link>
	</ul>
</template>
<script>
export default {
  name: 'homecontiner',
  props:{
  	data:{
  		type:Object,
  		default:{}
  	}
  }
}
</script>
<style scoped>
	
</style>