<template>
  <div class="side-bar"><slot></slot></div
></template>

<script>
export default {
  name: "SideBar",
};
</script>
<style scoped>
.side-bar {
  position: absolute;
  padding-top: 44px;
  top: 0;
  bottom: 0;
  box-shadow: 0 0 10px black;
  z-index: 8;
}
</style>
