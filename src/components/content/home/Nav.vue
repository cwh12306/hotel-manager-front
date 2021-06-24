<!--页面导航-->
<template>
  <div class="cwh-nav">
    <h1 class="cwh-title">酒店客房管理系统</h1>
    <div class="cwh-loginInfo">欢迎您，{{ username }}</div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      username: "",
    };
  },
  props: {
    propUsername: {
      type: String,
      default() {
        return "陌生人";
      },
    },
  },
  mounted() {
    this.username = this.propUsername;
  },
};
</script>
<style scoped>
.cwh-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  text-align: center;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7);
  z-index: 9;
}
.cwh-title {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  font-size: 40px;
  color: white;
  text-shadow: black 6px 6px 18px;
  background: #333;
}
.cwh-loginInfo {
  position: absolute;
  bottom: 0;
  right: 20px;
  color: aliceblue;
  text-shadow: 0 0 10px white;
}
</style>
