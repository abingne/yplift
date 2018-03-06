<template>
	<div class="doc">
		<search class="s-search" prompt="年货嗨抢，最高直降1000"></search>
		<!-- <div class="sort"> -->
		<div class="sort-nav">
			<ul>
				<router-link :to="{path:'#recommend'}" tag="li">有品推荐</router-link>
				<router-link :to="{path:'#atHome'}" tag="li">居家</router-link>
				<router-link :to="{path:'#appliances'}" tag="li">家电</router-link>
				<router-link :to="{path:'#miscellaneous'}" tag="li">日杂</router-link>
				<router-link to="/" tag="li">手机</router-link>
				<router-link to="/" tag="li">影音</router-link>
				<router-link to="/" tag="li">服饰</router-link>
				<router-link to="/" tag="li">健康</router-link>
				<router-link to="/" tag="li">饮食</router-link>
				<router-link to="/" tag="li">智能</router-link>
				<router-link to="/" tag="li">餐厨</router-link>
				<router-link to="/" tag="li">洗护</router-link>
				<router-link to="/" tag="li">服饰</router-link>
				<router-link to="/" tag="li">健康</router-link>
				<router-link to="/" tag="li">饮食</router-link>
				<router-link to="/" tag="li">智能</router-link>
				<router-link to="/" tag="li">餐厨</router-link>
				<router-link to="/" tag="li">洗护</router-link>
			</ul>
		</div>
		<div class="sort-view">
			<sortView></sortView>
		</div>
		<!-- </div> -->
	</div>
</template>
<script>
import search from '@/components/search'
import sortView from '@/views/sort-view'
import TWEEN from 'tween.js'
export default{
	name:'sort',
	components:{
		search,
		sortView
	},
	beforeRouteEnter(to, from, next){
      next((vm) => {
        vm.animate(to)
      })
    },
    beforeRouteUpdate(to, from, next){
      this.animate(to)
      next();
    },
    methods: {
        animate(to){

            function animateFunc(time){
                requestAnimationFrame(animateFunc)
                TWEEN.update(time)
            }

            if( to.hash ){
                var el = document.getElementById(to.hash.slice(1))
                var doc = document.getElementsByClassName("doc")[0];

                if( el ){
                  animateFunc()
                    new TWEEN.Tween({
                      number: doc.scrollTop
                    })
                      .to({
                        number: el.offsetTop
                      }, 500)
                      .onUpdate(function(){
                          doc.scrollTop = this.number.toFixed(0)
                      })
                      .start()
                }
            }
        }
    }
}
</script>
<style scoped>
	
</style>