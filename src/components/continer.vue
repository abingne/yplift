<template>
	<div class="main">
		<!-- <div class="top">有品Lift</div> -->
		<search></search>
	    <swiper></swiper>
	    <homenav></homenav>
	    <div class="today">
	      <h3>今日有品</h3>
	      <span>更多<i class="el-icon-arrow-right"></i></span>
	    </div>
	    <homecontiner v-for="item,index in list" :data="item" :key="index"></homecontiner>
	    <!-- <homefooter></homefooter> -->
	</div>
</template>
<script>
import search from '@/components/search'
import swiper from '@/components/swiper'
import homenav from '@/components/homenav'
import homecontiner from '@/components/homecontiner'
import homefooter from '@/components/homefooter'

let list = [
  {
    title:'全镂空机械表',
    briefly:'双面镂空设计，中国原创力作，荣获德国红点奖',
    price: '899',
    src: 'https://shop.io.mi-img.com/app/shop/img?id=shop_fa292dcd8f5aa546f1ead7b0e4469d5d.jpeg'
  },
  {
    title:'足金萌狗吊坠',
    briefly:'狗年献礼，足金材质，3D硬金工艺',
    price: '799',
    src: 'https://shop.io.mi-img.com/app/shop/img?id=shop_fdba89254f86d6556b3ddbfba47380f2.jpeg'
  },
  {
    title:'心想胶囊咖啡机',
    briefly:'快速萃取，9档浓度预设',
    price: '499起',
    src: 'https://static.home.mi.com/app/shop/img?id=shop_4f74019190c08258fabae90bcc85a85e.jpeg'
  },
  {
    title:'小米盒子4c',
    briefly:'第四代小米盒子 存储、体验双升级 超高清4K HDR，人工智能系统',
    price: '249',
    src: 'https://shop.io.mi-img.com/app/shop/img?id=shop_49fc95174ce8fa8698d15f23fbd1c740.jpeg'
  },
  {
    title:'米家IH电饭煲 4L',
    briefly:'IH电磁加热，不粘锅粉体涂层',
    price: '599',
    src: 'https://static.home.mi.com/app/shop/img?id=shop_6f72f7a99452fee99b0b431741c59823.jpeg'
  },
  {
    title:'小米空气净化器2',
    briefly:'净化性能高达310m³/h，手机智能控制，一目了然',
    price: '699',
    src: 'https://shop.io.mi-img.com/app/shop/img?id=shop_5af19eaf8991fc71d3613fe26ced1af8.jpeg'
  }
]

export default {
  name: 'home',
  data () {
    return {
      list: list
    }
  },
  components:{
  	search,
    swiper,
    homenav,
    homecontiner,
    homefooter
  }
}
</script>
<style scoped>
	
</style>