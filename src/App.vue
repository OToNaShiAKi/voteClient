<template>
  <div id="app">
    <h1 class="title">科协换届在线投票</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less" scoped>
#app {
  min-height: 100vh;
  background: url("~@/assets/background.jpg") top center/100vw 100vh fixed
    no-repeat;
  .title {
    margin: 0;
    padding: 20px 20px 10px;
    font-size: 18px;
    color: white;
    line-height: 30px;
    height: 30px;
  }
}
</style>
