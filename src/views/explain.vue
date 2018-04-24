<template>
  <div class="bg">
      <div class="explain">
          <div>答题须知</div>
          <div>1、游戏中题目均为公司战略报告内相关内容，请认真学习后参与答题。</div>
          <div>2、题目设置每日5道题，全部为选择题，全部答对当日题目即为通过。</div>
          <div>3、中间出现答错的情况，则五道题目全部重新作答，每道题目答题时间限制在1分钟内。</div>
          <div>4、本测试游戏持续时间为一周（五个工作日），要求全员每日参加。</div>
      </div>
    <div class="position">
        <button class='button' @click="next">答　题</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        company:'',
        tel:'',
        name:'',
    };
  },
  methods:{
      next(){
        //   this.$router.push('question');
          this.$router.push({ path: "question", query: { company: this.company, tel:this.tel,name:this.name}});
      }
  },
  mounted() {
    //   alert(window.location.href);
      this.company =  this.$route.query.company;
      this.tel =  this.$route.query.tel;
      this.name =this.$route.query.name;
    //   alert(this.company);
  }
}
</script>

<style lang ="less" scoped>
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("https://img.guoanfamily.com/image/ks/bj.png") no-repeat top;
  background-size: cover;
}
.position {
  position: absolute;
  bottom: 10%;
  width: 100%;
  height: 50px;
  text-align: center;
}
.button {
  /* background: url("../assets/startbutton.png") no-repeat center; */
  /* background-size: 100%; */
  border: none;
  width: 50%;
  height: 2rem;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  border-radius: 0.25rem;
  background: #0081e7;
}
.explain{
    width: 80%;
    height: auto;
    margin-left: 10%;
    position: fixed;
    top:40%;
    div{
        width:100%;
        float: left;
         font-size: .6rem;
        text-align: left;
        color:#0081e7;
    }
    div:nth-child(1){
        font-size: 1rem;
        text-align: center;
        font-weight: 600;
        color:#0081e7;
    }
    /* div:nth-child(2){
        font-size: .7rem;
        text-align: left;
    } */
}
</style>
