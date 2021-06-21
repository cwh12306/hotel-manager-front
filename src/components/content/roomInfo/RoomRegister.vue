<template>
  <div class="room-register">
    <div class="top-line"></div>
    <div class="check-in-cancel" @click="checkInCancel">
      <i class="fas fa-times"></i>
    </div>
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
        />
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
          <select name="rno" id=""
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
        <input
          type="submit"
          value="入住"
          :disabled="uid === '' || uname === '' || phone === ''"
          :class="{ active: !(uid === '' || uname === '' || phone === '') }"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomRegister",
  props: {
    roomIndex: {
      type: Number,
    },
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
    checkInCancel() {
      this.$emit("cancelClick", this.roomIndex);
      this.uname = "";
      this.uid = "";
      this.phone = "";
    },
  },
  data() {
    return {
      uname: "",
      uid: "",
      phone: "",
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
