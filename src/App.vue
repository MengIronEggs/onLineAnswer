<template>
  <div id="app" style="height: 100%;">
    <!-- <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px"> -->
    <!--<router-view></router-view>-->
    <!-- <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"> -->
    <keep-alive>  
      <router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
import { ViewBox } from 'vux'
export default {
  components: {
    ViewBox
  },
  data() {
    return {
      direction: 'forward',
      tostack: [],
      hlenght:0
    }
  },
  mounted() {
   
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
* {
    box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #eeeeee;
  // background: url('./assets/xixi.png') no-repeat;
  // background-position-y:bottom;
  // background-size: 100% 100%;
  // -webkit-overflow-scrolling: touch;
}

.router-view {
  width: 100%; //top: 46px;
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%; //top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.menu-title {
  color: #888;
}
</style>
