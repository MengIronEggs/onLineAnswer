<template>
  <div class="bg">
      <div class="stars">
          <ul>
              <li :key="index" v-for="(item,index) in num1">
                <img src="https://img.guoanfamily.com/image/ks/baixing.png" alt="">
              </li>
          </ul>
      </div>
      <div class="stars1">
          <ul>
              <li :key="index" v-for="(item,index) in num">
                  <img src="https://img.guoanfamily.com/image/ks/hongxing.png" alt="">
              </li>
          </ul>
      </div>
      <div class="result">
        <div v-show="this.day == 5">恭喜你已经完成全部挑战</div>
        <div  v-show="this.day == 5">成为国安城市战略达人</div>
        <div v-show="this.day < 5">您已完成第<span>{{day}}</span>天的挑战</div>
        <div v-show="this.day < 5">请明日继续</div>
      </div>
      <!-- <div class="erweima">
          <img src="https://img.guoanfamily.com/image/ks/erweima.jpg" alt="">
      </div> -->
  </div>
</template>
<script>
// import hognxing from '../assets/hongxing.png';
// import baixing from '../assets/baixing.png';
export default {
 data(){
     return {
         num1:[1,2,3,4,5],
         num:[],
         day:null,
     }
 },
 mounted(){
     this.day =  this.$route.query.body;
     for(let i=0;i<this.day;i++){
        // console.log(this.day);
        this.num.push(0);
     }
 }
}
</script>

<style scoped lang = "less">
.bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background:url("../assets/last.png") no-repeat center;
    background-size: 100%;
}
.stars{
    width:50%;
    height: 2rem;
    position: fixed;
    left: 25%;
    bottom:35%;
  
}
.stars1{
    height: 2rem;
    width:50%;
    position: fixed;
    left: 25%;
    bottom:35%;
}
li{
    width:17%;
    height: 100%;
    margin-top: .2rem;
    margin-left: .2rem;
    float: left;
    list-style: none;
    img{
        width:100%;
    }
}
.result{
    position: fixed;
    left:10%;
    color:#fff;
    bottom: 25%;
    width:80%;
    text-align: center;
    font-size:.7rem;
}
.erweima{
    width:100px;
    height: 100px;
    position: fixed;
    bottom: 1rem;
    left:36%;
    /* background:red; */
    img{
        width:100%;
    }
}
</style>

