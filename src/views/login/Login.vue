<template>
  <div class="login">
    <div class="wrap">
      <div class="login-warn"><i class="fas fa-exclamation-triangle"></i></div>
      <ul>
        <li>
          <input type="text" placeholder="USERNAME" v-model="username" />
        </li>
        <li>
          <input type="password" placeholder="PASSWORD" v-model="password" />
        </li>
        <li>
          <button
            class="activeBtn"
            v-show="!(username == '' || password == '')"
            @click="login"
          >
            LOGIN
          </button>
          <button v-show="username == '' || password == ''">
            LOGIN
          </button>
        </li>
      </ul>
    </div>
    <div class="back"></div>
  </div>
</template>

<script>
import { pixalMove } from "./index.js";
import { getUser } from "$network/login.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {
    pixalMove();
  },
  methods: {
    login() {
      getUser(this.username, this.password).then((result) => {
        if (!result) {
          const warn_info = document.querySelector(".login-warn");
          warn_info.style.top = 10 + "px";
          setTimeout(() => {
            warn_info.style.top = -warn_info.clientHeight + "px";
          }, 2000);
        } else {
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>
<style>
html,
body {
  height: 100%;
  overflow: hidden;
}
.login {
  background: #333;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}
.wrap > ul {
  list-style: none;
}
.wrap {
  height: 250px;
  width: 333px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: rgba(31, 30, 30, 0.5);
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 15%;
  overflow: hidden;
}
.wrap > ul > li {
  text-align: center;
  padding-top: 10px;
}
.wrap > ul > li > input {
  font-size: 14px;
  border: none;
  box-sizing: border-box;
  padding: 5px;
  background: transparent;
  border-bottom: 1px solid white;
  outline: none;
  color: white;
}
.wrap > ul > li > button {
  position: relative;
  font-size: 16px;
  border: 1px solid white;
  padding: 5px;
  margin-top: 10px;
  width: 150px;
  border-radius: 5px;
  background: transparent;
  transform: 0.2s linear;
  color: white;
}
.wrap > ul > li > button.activeBtn:hover {
  background: white;
  color: black;
  border-bottom: 1px solid black;
  cursor: pointer;
}
.login-warn {
  font-size: 40px;
  position: absolute;
  left: calc(50% - 20px);
  top: -42px;
  transition: 0.5s linear top;
}
span.pixal {
  position: absolute;
  left: -5px;
  top: -5px;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: white;
}
.login-info-password,
.login-info-username {
  padding: 10px;
  position: absolute;
  font-size: 12px;
  color: black;
  background: white;
  border: 1px solid thistle;
  border-radius: 30%;
}
.login-info-password {
  right: 50px;
}
</style>
