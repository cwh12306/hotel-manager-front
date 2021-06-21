<template>
  <div class="cwh-query">
    <div class="queryBar">
      <div class="queryBarHeader"><h3>客房信息查询</h3></div>
      <div class="queryContent-bg">
        <div class="allQueryContent">
          <input type="text" placeholder="查询所有客房信息" readonly />
          <div class="queryBtn" @click="queryAllInfo">
            <i class="fas fa-search"></i>
          </div>
        </div>

        <div class="queryContent">
          <input
            type="text"
            placeholder="输入手机号查询指定客房"
            v-model="queryPhone"
          />
          <div
            class="queryBtn"
            @click="queryGuset"
            :class="{ cwhShake: !isPhoneRight }"
          >
            <transition name="showAnimation">
              <i class="fas fa-search" v-show="isPhoneRight"></i>
            </transition>
            <transition name="showAnimation">
              <i class="fas fa-times" v-show="!isPhoneRight"></i>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="queryResult">
      <div class="qRHeader">
        <h3>查询结果</h3>
        <i class="fas fa-search"></i>
      </div>

      <div class="sortIcon">
        <transition name="showAnimation"
          ><i
            class="fas fa-sort-up sort-up"
            @click="previousPage"
            v-show="pageNum > 1 && whichScreen > 1"
          ></i
        ></transition>
        <transition name="showAnimation"
          ><i
            class="fas fa-sort-down sort-down"
            @click="nextPage"
            v-show="pageNum > 1 && whichScreen >= 1 && whichScreen != pageNum"
          ></i
        ></transition>
      </div>

      <div class="qRContent">
        <div class="queryList">
          <div class="bg-line"></div>
          <div class="bg-line"></div>
          <div class="singleQueryResult">
            <p>
              <span v-show="singleIsShow">姓名：</span>{{ guestInfo.uname }}
            </p>
            <p><span v-show="singleIsShow">性别：</span>{{ guestSex }}</p>
            <p>
              <span v-show="singleIsShow">手机号：</span>{{ guestInfo.phone }}
            </p>
            <p>
              <span v-show="singleIsShow">身份证：</span>{{ guestInfo.uid }}
            </p>
            <p>
              <span v-show="singleIsShow">入住天数：</span>{{ guestInfo.cdays }}
            </p>
            <p>
              <span v-show="singleIsShow">实付金额：￥</span
              >{{ guestInfo.payment }}
            </p>
            <p>
              <span v-show="singleIsShow">房间号：</span>{{ guestInfo.rno }}
            </p>
          </div>

          <div class="AllQueryResult" v-for="index2 in pageNum" :key="index2">
            <div
              @click="selected(index, index2)"
              class="allResultItem"
              v-for="(item, index) in sortedGuestInfo[index2 - 1]"
              :key="index"
            >
              {{ item.uname + "/" + item.phone }}
            </div>
          </div>
        </div>
        <transition name="showAnimation"
          ><div class="warnInfo" v-show="warnIsShow">
            <div class="qRHeader">
              <h3>提示信息</h3>
            </div>
            <p>确定要退房吗？</p>
            <div class="warn-checkBtn" @click="warnIsShow = false">
              <i class="fas fa-times"></i>
            </div>
            <div class="warn-checkBtn" @click="checkOut">
              <i class="fas fa-check"></i>
            </div></div
        ></transition>
        <div
          class="checkOutBtn"
          @click="warnIsShow = true"
          v-show="clickIsEnable"
        >
          退房
        </div>
        <div class="checkOutBtn2" v-show="!clickIsEnable">
          退房
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getGuestInfo,
  getAllGuestInfo,
  removeConsumer,
} from "$network/query.js";
export default {
  name: "Query",
  components: {},
  data() {
    return {
      warnIsShow: false,
      queryPhone: "",
      storePhone: "",
      guestInfo: {},
      isPhoneRight: true,
      clickIsEnable: false,
      singleIsShow: false,
      guestSex: "",
      allGuestInfo: [],
      sortedGuestInfo: [],
      whichScreen: 0,
      selectedIndex: -1,
      pageSize: 5,
      pageNum: 1,
    };
  },
  mounted() {
    const searchBtns = document.querySelectorAll(".queryBtn");
    for (let i = 0; i < searchBtns.length; i++) {
      searchBtns[i].onmousedown = () => {
        searchBtns[i].classList.remove("queryBtn");
        searchBtns[i].classList.add("queryBtn-down");
      };
      searchBtns[i].onmouseup = () => {
        searchBtns[i].classList.remove("queryBtn-down");
        searchBtns[i].classList.add("queryBtn");
      };
    }
  },
  methods: {
    checkOut() {
      if (this.whichScreen) {
        removeConsumer(
          this.allGuestInfo[this.selectedIndex].id,
          this.allGuestInfo[this.selectedIndex].rno
        );
        this.allGuestInfo.splice(this.selectedIndex, 1);
        this.sortedGuestInfo[
          Math.floor(this.selectedIndex / this.pageSize)
        ].splice(this.selectedIndex % this.pageSize, 1);
      } else if (this.guestInfo.id) {
        removeConsumer(this.guestInfo.id, this.guestInfo.rno).then((result) => {
          console.log(result);
        });
        this.guestInfo = {};
      } else {
        alert("查无此人");
      }
      this.warnIsShow = false;
      this.singleIsShow = false;
      this.guestSex = "";
    },
    queryGuset() {
      this.whichScreen = 0;
      this.boardMove(false);

      if (this.storePhone == this.queryPhone && this.storePhone != "") {
        return;
      }
      getGuestInfo(this.queryPhone).then((result) => {
        if (result != null) {
          this.guestInfo = result;
          this.guestSex = result.sex == 1 ? "男" : "女";
          this.clickIsEnable = true;
          this.singleIsShow = true;
          this.storePhone = this.queryPhone;
        } else {
          this.isPhoneRight = false;
          setTimeout(() => {
            this.isPhoneRight = true;
          }, 1500);
        }
      });
    },
    queryAllInfo() {
      this.whichScreen = 1;
      getAllGuestInfo().then((result) => {
        this.allGuestInfo = result;
        let attr1 = this.allGuestInfo.length / this.pageSize;
        let attr2 = this.allGuestInfo.length % this.pageSize == 0 ? 0 : 1;
        this.pageNum = Math.floor(attr1) + attr2; //用于标志当前数组分割到第几块了
        let count = 0;
        for (let i = 0; i < this.allGuestInfo.length; i += this.pageSize) {
          if (count < this.pageNum) {
            this.sortedGuestInfo[count] = this.allGuestInfo.slice(
              i,
              i + this.pageSize
            );
            count++;
          }
        }
      });
      this.boardMove(true);
      //给查询全部的展示面板增加监听
      setTimeout(() => {
        const allQueryResults = document.querySelectorAll(".AllQueryResult");
        const radius = 64;
        const allResultItems = document.querySelectorAll(".allResultItem");
        for (let i = 0; i < allQueryResults.length; i++) {
          allQueryResults[i].onmousemove = (evt) => {
            evt = evt || window.event;
            for (var i = 0; i < allResultItems.length; i++) {
              var rectInfo = allResultItems[i].getBoundingClientRect();

              var a = rectInfo.x + rectInfo.width / 2 - evt.clientX;
              var b = rectInfo.y + rectInfo.height / 2 - evt.clientY;
              var c = Math.sqrt(a * a + b * b);
              var ratio = 2 - c / radius;
              if (c < radius) {
                allResultItems[i].style.transform = "scale(" + ratio + ")";
              }
            }
          };
        }
        this.initPage();
      }, 500);
    },
    initPage() {
      const allQueryResults = document.querySelectorAll(".AllQueryResult");
      for (let i = 1; i < allQueryResults.length; i++) {
        allQueryResults[i].style.top = 150 + i * 100 + "%";
      }
      this.boardMove(true);
    },
    boardMove(flag) {
      const singleQueryResult = document.querySelector(".singleQueryResult");
      const allQueryResults = document.querySelectorAll(".AllQueryResult");
      if (flag) {
        singleQueryResult.style.top = 50 - this.whichScreen * 100 + "%";
        for (let i = 0; i < allQueryResults.length; i++) {
          allQueryResults[i].style.top =
            150 + i * 100 - 100 * this.whichScreen + "%";
        }
      } else {
        singleQueryResult.style.top = 50 - this.whichScreen * 100 + "%";
        for (let i = 0; i < allQueryResults.length; i++) {
          allQueryResults[i].style.top =
            150 + i * 100 - 100 * this.whichScreen + "%";
        }
      }
    },
    selected(index, index2) {
      this.clickIsEnable = true;
      this.selectedIndex = index + (index2 - 1) * this.pageSize;

      setTimeout(() => {
        const allResultItems = document.querySelectorAll(".allResultItem");
        for (let i = 0; i < allResultItems.length; i++) {
          allResultItems[i].classList.remove("selectActive");
        }
        allResultItems[this.selectedIndex].classList.add("selectActive");
      }, 200);
    },
    nextPage() {
      if (this.pageNum == this.whichScreen) {
        return;
      }
      this.whichScreen++;
      this.boardMove(true);
    },
    previousPage() {
      if (this.whichScreen == 1) {
        return;
      }
      this.whichScreen--;
      this.boardMove(false);
    },
  },
};
</script>
<style scoped>
.sortIcon {
  position: absolute;
  width: 32px;
  height: 50px;
  left: 52%;
  top: 60%;
  z-index: 9;
}
.sortIcon > i:nth-of-type(1) {
  position: fixed;
  top: 55%;
}
.sortIcon > i:nth-of-type(2) {
  position: fixed;
  top: 60%;
}
.sortIcon:hover {
  cursor: pointer;
}
.sort-up,
.sort-down {
  font-size: 50px;
  text-shadow: 0 2px 3px black;
  color: #16a085;
}
.sort-up:hover {
  color: #e74c3c;
}
.sort-down:hover {
  color: #e74c3c;
}
.allResultItem {
  width: 170px;
  height: 30px;
  margin-top: 17px;
  margin-left: 5px;
  background: #e74c3c;
  border-radius: 25px;
  line-height: 30px;
  text-align: center;
  color: white;
}
.allResultItem:hover {
  text-shadow: 0 0 10px white;
  cursor: pointer;
}
.selectActive {
  text-shadow: 0 0 10px white;
  border: 2px solid black;
}
.singleQueryResult,
.AllQueryResult {
  position: absolute;
  width: 200px;
  height: 260px;
  border: 10px solid #939394;
  left: 50%;
  top: 50%;
  background: white;
  transform: translate(-50%, -50%);
  transition: 1s top;
  overflow: hidden;
}
.AllQueryResult {
  top: 150%;
}
.singleQueryResult > p {
  width: 100%;
  margin-bottom: 10px;
}
.singleQueryResult > p > span:nth-of-type(2) {
  text-align: end;
}
.bg-line {
  position: absolute;
  left: 20%;
  height: 100%;
  width: 10px;
  background: #fad390;
}
.bg-line:nth-of-type(2) {
  left: 75%;
}
.cwh-query {
  position: relative;
  height: 100%;
}
.queryBar {
  position: absolute;
  width: 30%;
  height: 90%;
  top: 5%;
  left: 5%;
  border: 4px solid;
  border-radius: 5%;
  overflow: hidden;
}
.queryBarHeader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #f7b731;
  height: 12%;
}
.queryBarHeader h3 {
  color: white;
  margin: 10px 0 0 10px;
  font-size: 25px;
}
.queryContent-bg {
  position: absolute;
  background: white;
  height: 88%;
  top: 12%;
  width: 100%;
}
.queryContent {
  position: absolute;
  top: 25%;
  left: 10%;
}
.allQueryContent {
  position: absolute;
  top: 40%;
  left: 10%;
}
.allQueryContent > input {
  font-size: 14px;
  border: none;
  box-sizing: border-box;
  padding: 5px;
  background: #f1f3f5;
  width: 240px;
  height: 30px;
  outline: none;
  color: #c9c3cc;
  border-radius: 25px;
}
.queryContent > input {
  font-size: 14px;
  border: none;
  box-sizing: border-box;
  padding: 5px;
  background: #f1f3f5;
  width: 240px;
  height: 30px;
  outline: none;
  color: #c9c3cc;
  border-radius: 25px;
  transition: 1s;
}
.queryContent > input:focus {
  border: 1px solid #2d98da;
  box-shadow: 0 0 10px #2d98da;
}
.queryBtn {
  position: absolute;
  right: 0;
  top: 0;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: #f0f3f9;
  border: 1px solid #183153;
  border-bottom: 5px solid #183153;
  border-radius: 25px;
  color: #333;
  overflow: visible;
  cursor: pointer;
  margin-left: 0px;
  margin-top: 0px;
}
.queryBtn-down {
  position: absolute;
  right: 0;
  top: 0;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: #f0f3f9;
  color: #333;
  cursor: pointer;
  border: 1px solid #183153;
  border-bottom: 3px solid #183153;
  border-radius: 25px;
  margin-left: 2px;
  margin-top: 2px;
  overflow: visible;
}
.cwhShake {
  animation: shake 0.5s linear;
  animation-iteration-count: 2;
  background: #eb2f06;
  color: white;
}
@keyframes shake {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(2px);
  }
  50% {
    transform: translateX(0px);
  }
  75% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0px);
  }
}
.queryBtn:hover {
  cursor: pointer;
}
.queryBtn i {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
.queryResult {
  position: absolute;
  width: 60%;
  height: 90%;
  top: 5%;
  left: 40%;
  border: 4px solid;
  border-radius: 5%;
  overflow: hidden;
  background: #f0f4f9;
}

.qRHeader {
  position: absolute;
  top: 0;
  height: 12%;
  width: 100%;
  background: #396fca;
  color: white;
}
.qRHeader > h3 {
  margin: 10px 0 0 20px;
  font-size: 25px;
}
.qRHeader > i {
  display: block;
  position: absolute;
  right: 5%;
  top: 10px;
  font-size: 30px;
  animation: rotate 2s ease-in;
  animation-iteration-count: 1;
}
@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.qRContent {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 12%;
  left: 10%;
}
.queryList {
  position: absolute;
  height: 350px;
  width: 250px;
  background: white;
  top: 30px;
  left: -20px;
  border-radius: 25px;
  border-top: 5px solid;
  border-left: 12px solid;
  border-right: 5px solid;
  border-bottom: 12px solid;
  overflow: hidden;
}
.checkOutBtn,
.checkOutBtn2 {
  position: absolute;
  right: 20%;
  bottom: 20%;
  border-radius: 25px;
  width: 105px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #396fca;
  color: #f0f4f9;
}
.checkOutBtn:hover {
  cursor: pointer;
  background: #fc5c65;
  color: white;
}
.warnInfo {
  position: absolute;
  width: 200px;
  height: 270px;
  background: white;
  right: 15%;
  top: 10%;
  overflow: hidden;
  border-radius: 10%;
}
.warnInfo > .qRHeader > h3 {
  font-size: 14px;
}
.warnInfo > p {
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.warn-checkBtn {
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  background: red;
  height: 30px;
  width: 30px;
  margin-left: 30px;
  background: #08793d;
  color: white;
  text-align: center;
  line-height: 30px;
}
.warn-checkBtn:hover {
  cursor: pointer;
  background: #20bf6b;
}
.warn-checkBtn:nth-of-type(2) {
  right: 30px;
  background: #b30928;
}
.warn-checkBtn:nth-of-type(2):hover {
  background: #eb3b5a;
}
.showAnimation-enter-active,
.showAnimation-leave-active {
  transition: 1s opacity;
}
.showAnimation-enter,
.showAnimation-leave-to {
  opacity: 0;
}
</style>
