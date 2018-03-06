<template>
  <div id="app">
    <!-- <header>
      <div class="top">有品Lift</div>
    </header>
    <section class="continer"> -->
      <router-view></router-view>
    <!-- </section>
    <footer>
      <homefooter></homefooter>
    </footer> -->
    
  </div>
</template>

<script>
import homefooter from '@/components/homefooter'
import home from '@/views/home'


export default {
  name: 'App',
  components:{
    homefooter,
    home
  },
  created(){
    // axios({
    //   methods: 'get',
    //   url: 'https://www.easy-mock.com/mock/5a93cdd98be1e80aa1c92ac0/yplift/list'
    // })
    // .then((response)=>{
    //   console.log(response)
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })
    this.$store.dispatch('getList')
  }
}
</script>

<style>
#app {
  position: relative;
  font-family: "Helvetica Neue", STHeiTi, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
