<template>
  <div class="wb-coupon">
    <div class="wb-coupon__head" />
    <div class="wb-coupon__body" />
  </div>
</template>
<style lang="scss">
.wb-coupon {
  position: relative;
  width: 600px;
  height: 200px;
  display: flex;
}
.wb-coupon__head {
  width: 200px;
  height: 200px;
  background-color: #f76260;
}
.wb-coupon__head::before {
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 200px;
  content: '';
  background-size: 6px 20px;
  background-image: radial-gradient(circle at 0px 10px, white 6px, #f76260 6px);
}
.wb-coupon__body {
  position: relative;
  height: 200px;
  flex: 1;
  border: 1px solid #ddd;
}
</style>
