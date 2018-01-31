<template>
<div class="home">
  <mt-header fixed title="大兴我爱我妻月嫂中心"></mt-header>
  <mt-swipe :auto="4000">
    <mt-swipe-item><img src="../assets/swipe_1.png" alt=""></mt-swipe-item>
  </mt-swipe>
  <div class="btn-group">
    <mt-button type="primary">育儿服务</mt-button>
    <router-link to="/nurse">
      <mt-button type="primary">月子服务</mt-button>
    </router-link>
  </div>
  <div class="btn-group">
    <mt-button type="primary">催乳服务</mt-button>
    <mt-button type="primary">产后服务</mt-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  margin-top: 48px;
}

.mint-swipe {
  height: 160px;
}

.mint-swipe img {
  height: 100%;
}

.btn-group {
  margin-top: 15px;
}

.btn-group button {
  margin: 10px 20px;
  width: 100px;
  height: 100px;
}
</style>
