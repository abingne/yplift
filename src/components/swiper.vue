<template>
  <div class="block">
    <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
    <el-carousel  arrow="never">
      <el-carousel-item v-for="item in simg" :key="item">
        <router-link to="/" tag="img" v-lazy="item"></router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'swiper',
  props:{
    simg:{
      type:Array,
      default:[]
    }
  }
  // data(){
  // 	return {
  // 		simg:[
  // 			'https://shop.io.mi-img.com/app/shop/img?id=shop_6894f68dc5b438a8b48688303f83998c.jpeg&w=1080&h=450&crop=a_0_0_1080_480&t=webp',
  // 			'https://shop.io.mi-img.com/app/shop/img?id=shop_ef8e41e7e08d9bd83ac6d2baa167ff0d.jpeg&w=1080&h=450&crop=a_0_0_1080_480&t=webp',
  // 			'https://shop.io.mi-img.com/app/shop/img?id=shop_eb7248c03db9b3365c4989f38ac5ef12.jpeg&w=1080&h=450&crop=a_0_0_1080_480&t=webp',
  // 			'https://shop.io.mi-img.com/app/shop/img?id=shop_2618198736af716b52581d51fc5a71be.jpeg&w=1080&h=450&crop=a_0_0_1080_480&t=webp'
  // 		]
  // 	}
  // }
}
</script>
<style>
  .block{
    height: 100%;
  }
  .el-carousel {	/* 设置轮播区域的大小 */
  	width: 100%;
  	height: 100%;
  }
  .el-carousel__container{
    height: 100%;
  }
  .el-carousel__indicators {	/* 设置轮播指示区域的位置 */
  	bottom: 10px;
  }
  
  .el-carousel__button{		/* 设置轮播指示区域点的样式 */
  	width: 15px;
  	height: 15px;
  	border-radius: 50%;
  	background: #9fa0a3;
  }
  .el-carousel__indicators .is-active .el-carousel__button{		/* 设置轮播指示区域当前指示点的样式 */
  	background: #000;
  }
  .el-carousel__item img{
  	width: 100%;
  	height: 100%;
  	/*background: yellow;*/
  }
</style>