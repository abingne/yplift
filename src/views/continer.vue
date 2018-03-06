<template>
  <div class="main">
    <!-- <div class="top">有品Lift</div> -->
    <search></search>
      <div class="swiper">
      	<swiper :simg="simg"></swiper>
      </div>
      <homenav></homenav>
      <div class="today">
        <h3>今日有品</h3>
        <span>更多<i class="el-icon-arrow-right"></i></span>
      </div>
      <homecontiner v-for="item,index in list" :data="item" :key="index"></homecontiner>
  </div>
</template>
<script>
import search from '@/components/search'
import swiper from '@/components/swiper'
import homenav from '@/components/homenav'
import homecontiner from '@/components/homecontiner'

export default {
  name: 'home',
  data () {
    return {
      simg:[
       'https://shop.io.mi-img.com/app/shop/img?id=shop_6894f68dc5b438a8b48688303f83998c.jpeg&w=1080&h=450&crop=a_0_0_1080_480&t=webp',
       'https://shop.io.mi-img.com/app/shop/img?id=shop_ef8e41e7e08d9bd83ac6d2baa167ff0d.jpeg&w=1080&h=450&crop=a_0_0_1080_480&t=webp',
       'https://shop.io.mi-img.com/app/shop/img?id=shop_eb7248c03db9b3365c4989f38ac5ef12.jpeg&w=1080&h=450&crop=a_0_0_1080_480&t=webp',
       'https://shop.io.mi-img.com/app/shop/img?id=shop_2618198736af716b52581d51fc5a71be.jpeg&w=1080&h=450&crop=a_0_0_1080_480&t=webp'
     ]
    }
  },
  computed:{
    list(){
      return this.$store.state.list
    }
  },
  components:{
    search,
    swiper,
    homenav,
    homecontiner
  }
}
</script>
<style scoped>
  
</style>