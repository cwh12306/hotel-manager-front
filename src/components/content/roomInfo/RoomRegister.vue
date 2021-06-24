<!--入住界面-->
<template>
  <div class="room-register">
    <!--上边的白线-->
    <div class="top-line"></div>
    <!--叉叉取消按钮-->
    <div class="check-in-cancel" @click="checkInCancel">
      <i class="fas fa-times"></i>
    </div>
    <!--注册表单-->
    <div class="register-form">
      <form
        action="http://localhost:8088/hm/addConsumer"
        method="post"
        enctype="application/json"
      >
        <input
          name="uname"
          type="text"
          placeholder="姓名"
          autocomplete="off"
          v-model="uname"
        />
        <input
          name="phone"
          type="text"
          placeholder="手机号"
          autocomplete="off"
          v-model="phone"
          @blur="validate()"
        />
        <div class="errorInfo">{{ errorList[0] }}</div>
        <input
          name="uid"
          type="text"
          placeholder="身份证号码"
          autocomplete="off"
          v-model="uid"
        />
        <span>性别</span>
        <div class="cwh-radio">
          <input type="radio" name="sex" value="1" checked />男
          <input type="radio" name="sex" value="0" />女
        </div>
        <span>客房号选择</span>
        <div class="cwh-select">
          <select name="rno" id="" v-model="selectedRno"
            ><option :value="rno" v-for="(rno, index) in rnos" :key="index">{{
              rno
            }}</option></select
          >
        </div>
        <span>入住天数</span>
        <div class="cwh-select">
          <select name="cdays" id=""
            ><option value="1">1 </option
            ><option value="2">2 </option
            ><option value="3">3 </option
            ><option value="4">4 </option
            ><option value="5">5 </option
            ><option value="6">6 </option
            ><option value="7">7 </option></select
          >
        </div>
        <input name="payment" type="hidden" value="0" />
        <input name="price" type="hidden" :value="price" />
        <input name="username" type="hidden" :value="username" />
        <input
          type="submit"
          value="入住"
          :disabled="
            uid === '' || uname === '' || phone === '' || !submitEnable
          "
          :class="{
            active: !(uid === '' || uname === '' || phone === ''),
          }"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { getGuestInfo } from "$network/query";
export default {
  name: "RoomRegister",
  props: {
    roomIndex: {
      type: Number,
    },
    /*数据是父组件拿到的，通过父与子组件通信拿到 */
    rnos: {
      type: Array,
      default() {
        return [];
      },
    },
    price: {
      type: Number,
    },
  },
  components: {},
  methods: {
    /*取消注册，清除已填入的表单信息，并将取消消息发送至父组件，让其滚动 */
    checkInCancel() {
      this.$emit("cancelClick", this.roomIndex);
      this.uname = "";
      this.uid = "";
      this.phone = "";
    },
    /*验证 */
    validate() {
      this.errorList = [];
      if (this.phone != "") {
        let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!reg.test(this.phone)) {
          this.errorList.push("请输入有效的电话号码");
        } else {
          getGuestInfo(this.phone).then((result) => {
            if (result) {
              this.errorList.push("电话已被使用");
            }
          });
        }
      }
      if (this.selectedRno == "") {
        this.errorList.push("房间号为空");
      }
      setTimeout(() => {
        if (this.errorList.length <= 0) {
          this.submitEnable = true;
        }
      }, 200);
    },
  },
  data() {
    return {
      uname: "",
      uid: "",
      phone: "",
      errorList: [],
      submitEnable: false,
      username: this.$route.params.username,
      selectedRno: "",
    };
  },
};
</script>
<style scoped>
.room-register {
  height: 500px;
  width: 160px;
  text-align: center;
  position: relative;
}
.top-line {
  position: absolute;
  height: 6px;
  width: 100%;
  background: whitesmoke;
}
.check-in-cancel {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  font-size: 15px;
  left: calc(50% - 15px);
  top: -13px;
  text-align: center;
  line-height: 30px;
  background: whitesmoke;
  color: black;
}
.check-in-cancel:hover {
  cursor: pointer;
  background: #ff4757;
  color: #fff;
}
.register-form {
  position: absolute;
  top: 20px;
  height: 400px;
  left: 0;
  text-align: left;
}
.register-form > form > span {
  display: block;
  margin-top: 40px;
}
.register-form > form > input[type="text"] {
  font-size: 12px;
  border: none;
  box-sizing: border-box;
  padding: 5px;
  background: transparent;
  border-bottom: 1px solid white;
  outline: none;
  color: white;
  width: 160px;
  margin-top: 20px;
}
.register-form > form > .cwh-radio,
.register-form > form > .cwh-select {
  position: absolute;
  right: 0;
}
.register-form > form > input[type="submit"] {
  position: absolute;
  font-size: 20px;
  border: 1px solid white;
  padding: 5px;
  margin-top: 10px;
  width: 150px;
  border-radius: 5px;
  background: transparent;
  transform: 0.2s linear;
  color: white;
  bottom: 0;
  left: 0;
}
.register-form > form > input[type="submit"].active:hover {
  background: white;
  color: black;
  border-bottom: 1px solid black;
  cursor: pointer;
}
</style>
