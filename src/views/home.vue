<template>
  <div id="app">
    <header>
      <div class="top">有品Lift</div>
    </header>
    <section class="continer">
      <router-view></router-view>
    </section>
    <footer>
      <homefooter></homefooter>
    </footer>
    
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
