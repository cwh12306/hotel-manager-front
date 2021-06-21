<template>
  <div class="home">
    <Nav :propUsername="username"></Nav>
    <div class="home-body">
      <SideBar>
        <div class="sideBar-item">
          <router-link replace :to="'/home/roomInfo/' + username"
            ><span>首页</span> <i class="fas fa-home"></i
          ></router-link>
        </div>
        <div class="sideBar-item">
          <router-link :to="'/home/accommodationManagement/' + username"
            ><span>住宿管理</span> <i class="fas fa-hotel"></i
          ></router-link>
        </div>
        <div class="sideBar-item">
          <router-link :to="'/home/roomManagement/' + username"
            ><span>客房管理</span><i class="fas fa-restroom"></i
          ></router-link>
        </div>
        <div class="sideBar-item">
          <router-link :to="'/home/query/' + username"
            ><span>查询统计</span><i class="fas fa-search"></i>
          </router-link>
        </div>
      </SideBar>
      <div class="home-content-bg">
        <div class="home-content"><router-view></router-view></div>
      </div>
    </div>
    <Footer></Footer>
    <div class="transparentCover"></div>
  </div>
</template>

<script>
import Nav from "$components/content/home/Nav.vue";
import Footer from "$components/content/home/Footer.vue";
import SideBar from "$components/content/home/SideBar.vue";

export default {
  name: "Home",
  components: { Nav, Footer, SideBar },
  data() {
    return {
      username: this.$route.params.username,
    };
  },
};
</script>
<style scoped>
.sideBar-item {
  margin: 40% 0;
}
.sideBar-item > a {
  color: white;
  display: block;
  width: 140px;
  height: 60px;
  line-height: 40px;
  margin-left: 20px;
  position: relative;
  box-shadow: black 2px 2px 2px;
  transition: 0.5s linear;
  background: #333;
  border-radius: 20px;
  z-index: 9;
}
.sideBar-item > a:hover {
  transform: translateX(40px);
  border: 1px solid;
}
.sideBar-item > a:hover > span {
  text-shadow: 0 0 10px white;
}
.sideBar-item > a > span {
  margin-left: 4px;
  text-shadow: 2px 2px 9px black;
}
.sideBar-item > a > i {
  color: white;
  position: absolute;
  right: 5px;
  top: 2px;
}
.home-content-bg {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: url("~$assets/img/home-bg.jpg") no-repeat;
  background-position: center;
  background-size: cover;
}
.transparentCover {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  opacity: 0.5;
  visibility: hidden;
}
.home-content {
  position: absolute;
  top: 47%;
  left: 50%;
  height: 600px;
  width: 1000px;
  transform: translate(-50%, -50%);
  box-shadow: 10px 10px 40px black;
  background: #333;
  border-radius: 30px;
  padding: 30px;
}
</style>
