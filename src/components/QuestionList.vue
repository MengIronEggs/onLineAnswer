<template>
    <div class="bg" :class="{'dd':doudong}" >
        <!-- <span class="times">{{times}}s</span> -->
        <span class="num">{{questionNum}}/{{theSum}}</span>
        <p style="height:1rem"></p>
        <p style="font-size:.6rem;line-height:1.5rem;color:#fff;width:100%;text-align:center;color:#000;" v-show="Multiple">该题目为多选题</p>
        <transition name="slide-fade">
            <div class="questions" v-if="questionContent">
                <p style="height:0.2rem"></p>
                <group :title="title1">
                    <radio :selected-label-style="{color:'#FF3300'}" :options="answerList"  v-model="answer" v-show="Radios"  @on-change="change"></radio>
                    <checklist :label-position="labelPosition" v-show="Multiple" required :options="answerList" v-model="checklist001" @on-change="Chackchange"></checklist>
                </group>
                <!-- <p style="font-size:.7rem;padding-left:.5rem;line-height:2rem;" v-show="Multiple">该题目为多选题</p> -->
            </div>
        </transition>
        <div v-show="Multiple" class="bottomSub">
          <button class="onButton" @click="btnClick()">确认</button>
        </div>
    </div>
</template>
<script>
import { XButton, Radio, Group, Checklist } from "vux";
export default {
  components: {
    XButton,
    Radio,
    Group,
    Checklist
  },
  data() {
    return {
      doudong:false,
      Radios: false,
      Multiple: false,
      checklist001: [],
      MultipleArr: "",
      labelPosition: "left",
      questionContent: false,
      times: 60,
      // 页码
      questionNum: 1,
      // 标题集合
      titles: [],
      // 选项集合
      answers: [],
      title1: "", //"1、在全国消费升级的情况下，什么样的产业升级最心动？",
      answerList: "", //["A、一站式服务", "B、深耕行业", "C、坚持传统模式"],
      correctanswer: [],
      answer: "",
      myanswer: "",
      currentPage: 1,
      name: "",
      tel: "",
      company: "",
      openid: "",
      errorAnswerArr: [],
      //   buttonText: "下一题"
      theSum: ""
    };
  },
  methods: {
    qolt() {
      var qsArr = JSON.parse(localStorage.getItem("qsArr"));
      let phone = localStorage.getItem("strategy_tel");
      this.theSum = qsArr.length;
      for (let i = 0; i < qsArr.length; i++) {
        //  问题集合
        this.titles.push(qsArr[i].content);
        //  选项集合
        let arr = [];
        arr.push({
          key: "A",
          value: "A、" + qsArr[i].A
        });
        arr.push({
          key: "B",
          value: "B、" + qsArr[i].B
        });
        // arr.push({
        //   key: "C",
        //   value: "C、" + qsArr[i].C
        // });
        if (qsArr[i].C) {
          arr.push({
            key: "C",
            value: "C、" + qsArr[i].C
          });
        }
        if (qsArr[i].D) {
          arr.push({
            key: "D",
            value: "D、" + qsArr[i].D
          });
        }
        if (qsArr[i].E) {
          arr.push({
            key: "E",
            value: "E、" + qsArr[i].E
          });
        }
        this.answers.push(arr);
        // 答案集合
        this.correctanswer.push(qsArr[i].answer);
      }
      console.log("本轮答案", this.correctanswer);
      this.title1 = this.titles[0];
      this.answerList = this.answers[0];
      if (this.correctanswer[0].length > 1) {
        this.Multiple = true;
        this.Radios = false;
      } else {
        this.Multiple = false;
        this.Radios = true;
      }
    },
    // 单选题的点击事件
    change(val, label) {
      this.myanswer = val;
      if (this.myanswer !== this.correctanswer[this.questionNum - 1]) {
        this.errorAnswerArr.push(this.questionNum);
        this.doudong = true;
         setTimeout(() => {
         this.doudong = false;
        }, 1000);
        this.msgalert("回答错误");
      }
      if (this.questionNum < this.theSum) {
        // console.log(this.correctanswer)
        // 判断题目为多选题还是单选题
        if (this.correctanswer[this.questionNum].length > 1) {
          this.Multiple = true;
          this.Radios = false;
        } else {
          this.Multiple = false;
          this.Radios = true;
        }
      }
      this.checklist001 = [];
      this.questionContent = false;
      this.MultipleArr = [];
      setTimeout(() => {
        this.answer = "";
        this.questionContent = true;
      }, 1000);
      //清空答案
      this.myanswer = "";
      //设置题目和答案
      if (this.currentPage == this.theSum) {
        localStorage.setItem("errorAnswer", this.errorAnswerArr);
        this.$router.push({ path: "last" });
      } else if (this.currentPage < this.theSum) {
        this.questionNum++;
        this.currentPage += 1;
        this.title1 = null;
        this.answerList = null;
        this.title1 = this.titles[this.currentPage - 1];
        this.answerList = this.answers[this.currentPage - 1];
      }
    },
    Chackchange(val, label) {
      this.MultipleArr = val;
      // this.answerChange(this.MultipleArr);
    },
    answerChange(arr) {
      let b = this.correctanswer[this.questionNum - 1];
      if (b.indexOf(arr[arr.length - 1]) !== -1 && arr.length !== 0) {
        if (arr.length == b.length) {
          if (this.questionNum < this.theSum) {
            if (this.correctanswer[this.questionNum].length > 1) {
              this.Multiple = true;
              this.Radios = false;
            } else {
              this.Multiple = false;
              this.Radios = true;
            }
          }
          this.checklist001 = [];
          this[arr] = [];
          this.questionContent = false;
          setTimeout(() => {
            this.questionContent = true;
            this.answer = "";
          }, 1000);
          this.times = 60;
          //清空答案
          this.myanswer = "";
          //设置题目和答案
          if (this.currentPage == this.theSum) {
            // this.submit();
            this.$router.push({ path: "last" });
          } else if (this.currentPage < this.theSum) {
            this.questionNum++;
            this.currentPage += 1;
            this.title1 = this.titles[this.currentPage - 1];
            this.answerList = this.answers[this.currentPage - 1];
          }
        } else {
          this.msgalert("回答错误");
          this.doudong = true;
          this.errorAnswerArr.push(this.questionNum);
          this.checklist001 = [];
          this.questionContent = false;
          this.MultipleArr = [];
          setTimeout(() => {
            this.answer = "";
            this.questionContent = true;
          }, 1000);
          //清空答案
          this.myanswer = "";
          //设置题目和答案
          if (this.currentPage == this.theSum) {
            localStorage.setItem("errorAnswer", this.errorAnswerArr);
            this.$router.push({ path: "last" });
          } else if (this.currentPage < this.theSum) {
            this.questionNum++;
            this.currentPage += 1;
            this.title1 = null;
            this.answerList = null;
            this.title1 = this.titles[this.currentPage - 1];
            this.answerList = this.answers[this.currentPage - 1];
          }
          if (this.correctanswer[this.questionNum - 1].length > 1) {
            this.Multiple = true;
            this.Radios = false;
          } else {
            this.Multiple = false;
            this.Radios = true;
          }
        }
      } else if (arr.length > 0) {
        this.errorAnswerArr.push(this.questionNum);
        this.doudong = true;
         setTimeout(() => {
         this.doudong = false;
        }, 1000);
        setTimeout(() => {
         this.doudong = false;
        }, 1000);
        this.msgalert("回答错误");
        this.checklist001 = [];
        this.questionContent = false;
        this.MultipleArr = [];
        setTimeout(() => {
          this.answer = "";
          this.questionContent = true;
        }, 1000);
        //清空答案
        this.myanswer = "";
        //设置题目和答案
        if (this.currentPage == this.theSum) {
          localStorage.setItem("errorAnswer", this.errorAnswerArr);
          this.$router.push({ path: "last" });
        } else if (this.currentPage < this.theSum) {
          this.questionNum++;
          this.currentPage += 1;
          this.title1 = null;
          this.answerList = null;
          this.title1 = this.titles[this.currentPage - 1];
          this.answerList = this.answers[this.currentPage - 1];
        }
        if (this.correctanswer[this.questionNum - 1].length > 1) {
          this.Multiple = true;
          this.Radios = false;
        } else {
          this.Multiple = false;
          this.Radios = true;
        }
      }
    },
    // 按钮的点击事件
    btnClick() {
      this.answerChange(this.MultipleArr);
    },
    // 提示窗口
    showalert(msg) {
      // 显示
      this.$vux.alert.show({
        title: "提示信息",
        content: msg
      });
    },
    msgalert(msg) {
      this.$vux.toast.show({
        text: msg,
        type: "warn"
      });
    }
  },
  mounted() {
    //调用后台接口，获取会议信息、权限及是否已经签到
    // this.msgalert('您已经打过题了');
    // history(-1);
    this.company = this.$route.query.company;
    this.tel = this.$route.query.tel;
    this.name = this.$route.query.name;
    // alert(this.company.toString() + this.tel + this.name);
    // this.setTime();
    // this.questionOnLoad();
    this.qolt();

    setTimeout(() => {
      this.questionContent = true;
    }, 500);
  }
};
</script>
<style>
.weui-cells__title {
  font-size: 16px !important;
}
.weui-cells {
  font-size: 16px !important;
  border-radius: 10px;
}

</style>
<style scoped lang='less'>
.questions {
  width: 90%;
  // height: 14rem;
  background: #ffffff;
  // overflow-y:scroll ;
  // background: red;
  border-radius: 10px;
  // position: fixed;
  // margin-top: 7rem;
  margin-left: 5%;
  transition: 0.9s;
}
.weui-btn_warn {
  background-color: #ec0011;
  font-weight: 500;
}
.times {
  display: block;
  position: fixed;
  left: 1rem;
  top: 0.9rem;
  font-size: 18px;
  color: #333333;
}
.num {
  width: 100%;
  height: 2rem;
  background: red;
  line-height: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #ffffff;
  display: block;
  position: fixed;
  bottom: 0rem;
  font-size: 18px;
}
.bg {
  width: 100%;
  height:100%;
  position: fixed;
  // height: 26rem;
  // background: url("https://img.guoanfamily.com/image/ks/bj1.png") no-repeat top;
  // background: url("../assets/start.png") no-repeat top;
  // background-size: 100% 100%;
  background: #eeeeee;
  overflow-y: scroll;
  // padding-bottom: 1.25rem;
  transform: translate3d(0px 0px 0px);
  position: fixed;
}
.dd {
  animation: shake 1s;
}
@keyframes shake {
  0%,
  100% {
   transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translateX(5px);
  }
}
.bottomSub {
  width: 100%;
  height: 50px;
  // position: fixed;
  // bottom: 2rem;
  // left: 0;
  text-align: center;
  margin-top: 1rem;
}
.onButton {
  width: 6rem;
  height: 50px;
  background: red;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  // background: url("../assets/queren.png") no-repeat center;
  // background-size: cover;
  border-radius: 10px;
  border: none;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
