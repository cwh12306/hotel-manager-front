<!--页面底部-->
<template>
  <div class="cwh-footer">
    <p class="left">
      Site Powered by Wordpress. Design and Developed by CWH. Home | About |
      Products | Services | Contact Privacy Policy | Terms of use
    </p>
    <p class="right">Copyright 2021. Studio JLJU. All Rights Reserved.</p>
  </div></template
>

<script>
export default {
  name: "Footer",
};
</script>
<style scoped>
.cwh-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 89px;
  background: #333;
  box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.7);
  z-index: 9;
}
.cwh-footer p {
  color: #999;
  font: 11px helvetica;
}
.cwh-footer .left {
  width: 330px;
  float: left;
  margin-left: 20%;
}
.cwh-footer .right {
  text-align: right;
  margin-right: 20%;
}
</style>
