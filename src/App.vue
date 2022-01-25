<template>
  <div class="container">
  <Header/>
  <router-view></router-view>
  <Footer v-show="$route.meta.show==true"/>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: "App",
  components: {Header,Footer},
  data() {
    return {};
  },
  mounted(){
    this.$store.dispatch("home/catagoryList");
  }
};
</script>

<style>
button {
  margin-left: 5px;
}
</style>