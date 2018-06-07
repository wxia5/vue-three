<template>
<div>
  <div id="Stats-output"></div>
  <div id="three">
  </div>
</div>
</template>

<script>
import {ThreeUtil} from './js'
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    console.log(ThreeUtil)
    let dom = document.getElementById("three")
    var threeUtil = new ThreeUtil(dom);
    threeUtil.init()
  }
};
</script>

<style>
#three{
  height: 100%;
  width:100%;
}
body { margin: 0; }
</style>
