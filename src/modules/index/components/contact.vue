<template>
  <div>
    <div id="loading-status">
      <div id="precent">app</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
  #loading-status {
    width: 300px;
    border: 1px #669CB8 solid;
    -webkit-box-shadow: 0px 2px 2px #D0D4D6;
    height: 15px;
    -webkit-border-radius: 10px;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#E1E9EE), to(white));
    padding: 1px;
  }

  #precent {
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#7BC3FF), color-stop(0.5, #42A9FF), to(#7BC3FF));
    width: 0%;
    height: 100%;
    -webkit-border-radius: 10px;
    -webkit-transition: width 1s ease-in-out;
  }
</style>
