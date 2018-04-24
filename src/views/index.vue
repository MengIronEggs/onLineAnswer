<template>
  <div class="bg" @click="next">
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
   methods:{
      next(){
          this.$router.push("start");
      }
   }
}
</script>

<style lang='less' scoped>
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
//   background: url("https://img.guoanfamily.com/image/ks/index.jpg") no-repeat center;
  background: url("../assets/index.jpg") no-repeat center;
  background-size: 100% 100%;
}
</style>
