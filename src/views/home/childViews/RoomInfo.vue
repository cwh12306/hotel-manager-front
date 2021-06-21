<template>
  <div class="room-info">
    <div
      class="room-info-item"
      v-for="(roomItem, index) in roomInfo"
      :key="index"
    >
      <div class="face">
        <div class="face-content">
          <img :src="roomItem.image" alt="" />
          <h3>{{ roomItem.rname }}</h3>
          <div class="description">
            <p>
              价格：<span>￥{{ roomItem.price }}.00/晚</span> <br />
              剩余房间：<span>{{ roomItem.count }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="backface">
        <div class="backface-content upItem">
          <h3>房间描述</h3>
          <p>
            {{ roomItem.description }}
          </p>
          <div class="checkInBtn" @click="checkIn(index)">
            <p>立即入住 <i class="fas fa-hand-point-right"></i></p>
          </div>
        </div>
        <RoomRegister
          class="downItem"
          :price="roomItem.price"
          :roomIndex="index"
          :rnos="roomItem.rnos"
          @cancelClick="checkInCancel"
        ></RoomRegister>
      </div>
    </div>
    <div class="cwh-prompt">
      注意：单次价格是按照订房当天时间到次日12点计算的
    </div>
  </div>
</template>

<script>
import { getRoomInfo } from "$network/home.js";

import RoomRegister from "$components/content/roomInfo/RoomRegister.vue";
export default {
  name: "RoomInfo",
  components: { RoomRegister },
  data() {
    return {
      roomInfo: [],
      showList: [
        { isShow: true },
        { isShow: true },
        { isShow: true },
        { isShow: true },
      ],
    };
  },
  mounted() {
    getRoomInfo().then((result) => {
      this.roomInfo = result;
    });
  },
  methods: {
    checkIn(index) {
      for (let showObj of this.showList) {
        showObj.isShow = true;
      }
      this.showList[index].isShow = false;
      this.upAndDown();
    },
    checkInCancel(index) {
      this.showList[index].isShow = true;
      this.upAndDown();
    },
    upAndDown() {
      const upNodes = document.querySelectorAll(".upItem");
      const downNodes = document.querySelectorAll(".downItem");
      for (let i = 0; i < upNodes.length; i++) {
        if (!this.showList[i].isShow) {
          upNodes[i].style.transform = "translateY(-100%)";
          downNodes[i].style.transform = "translateY(-100%)";
        } else {
          upNodes[i].style.transform = "translateY(0%)";
          downNodes[i].style.transform = "translateY(0%)";
        }
      }
    },
  },
};
</script>
<style scoped>
.cwh-prompt {
  position: absolute;
  bottom: 0;
  font-size: 20px;
  text-shadow: 0 0 10px white;
  color: white;
}
.room-info {
  display: flex;
}
.room-info-item {
  height: 500px;
  border-right: 1px solid white;
  flex: 1;
  margin: 10px;
  text-align: center;
  padding-top: 10px;
  perspective: 500px;
  transform-style: preserve-3d;
}
.room-info-item:hover .backface {
  transform: rotateY(360deg);
}
.room-info-item:hover .face {
  transform: rotateY(180deg);
}
.room-info-item:nth-of-type(4) {
  border-right: none;
}
.room-info-item > .face > .face-content > img {
  width: 90%;
}
.room-info-item > .face > .face-content > h3 {
  margin-bottom: 10px;
  color: bisque;
}
.description {
  position: relative;
  text-align: left;
  margin: auto;
  width: 160px;
  height: 280px;
  line-height: 40px;
}
.description > p {
  color: white;
  font-weight: bold;
}
.description > p > span {
  position: absolute;
  color: bisque;
  right: 0;
}
.face,
.backface {
  position: absolute;
  transition: 1s transform;
  backface-visibility: hidden;
  box-sizing: border-box;
}
.backface {
  height: 500px;
  padding: 20px;
  transform: rotateY(180deg);
  color: white;
  overflow: hidden;
  text-align: justify;
}
.backface > .backface-content {
  height: 100%;
  width: 100%;
  margin-bottom: 40px;
}
.backface > .backface-content > h3 {
  margin-left: 25%;
  color: bisque;
}
.backface > .backface-content > p {
  text-indent: 1em;
  margin-top: 20px;
}
.backface > .backface-content > .checkInBtn {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid;
  border-radius: 20px;
  height: 30px;
  width: 120px;
  line-height: 30px;
  text-align: center;
  color: white;
  background: #2e86de;
}
.backface > .backface-content > .checkInBtn:hover {
  cursor: pointer;
  background: white;
  color: #2e86de;
}
.backface > .backface-content > .checkInBtn:hover i {
  animation: handMove infinite linear 1.5s;
}
@keyframes handMove {
  from {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(10px);
  }
  to {
    transform: translateX(0px);
  }
}
.animationDown-enter-active,
.animationDown-leave-active {
  transition: 1s transform;
}
.animationDown-enter,
.animationDown-leave-to {
  transform: translateY(300%);
}
.animationUp-enter-active,
.animationUp-leave-active {
  transition: 1s transform;
}
.animationUp-enter,
.animationUp-leave-to {
  transform: translateY(-100%);
}
.upItem,
.downItem {
  transition: 1s transform;
}
</style>
