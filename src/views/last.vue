<template>
  <div class="bj" style="width:100%;hegiht:100%;">
        <p class="errorAnswer" v-show="notThrouth">您的第{{errorAnswer}}题回答错误</p>
        <p class="errorAnswer" style="font-size:24px;color:red;font-weight:600;" v-show="adopt">恭喜您通过了本次考试</p>
        <button class="onBtn" v-show="buttonShow" @click="onceMoreClick">再来一次</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorAnswer: "",
      adopt: false,
      notThrouth: false,
      buttonShow: false
    };
  },
  methods: {
    // 用于显示回答错误的题目
    errorAnswerFn() {
      this.errorAnswer = localStorage.getItem("errorAnswer");
    },
    // 方法用来遍历打错的题目，打错的题目覆盖原有的额题目，答题人继续答题
    errorQsload() {
      let arr = [];
      let errorQstionArr = this.errorAnswer.split(",");
      var qsArr = JSON.parse(localStorage.getItem("qsArr"));
      for (let i = 0; i < errorQstionArr.length; i++) {
        var a = errorQstionArr[i] - 1;
        arr.push(qsArr[a]);
      }
      localStorage.setItem("qsArr", JSON.stringify(arr));
    },
    // 再来一次的点击事件
    onceMoreClick() {
      this.$router.push("question");
    },
    // 提交的方法
    subMitInfo() {
    // 不同答题类型传入不同参数
      let typNum = '';
      let qstype = localStorage.getItem("strategy_qsType");
      if (qstype == "行政综合") {
        typNum = 3;
      } else {
        typNum = 2;
      }
      let name = localStorage.getItem('strategy_name');//姓名
      let phone = localStorage.getItem('strategy_tel');//电话
      let company = localStorage.getItem('strategy_company');//公司
      let post_data = {
        name:name,
        phone: phone,
        company:company
      };
      let posturl = "http://mt.guoanfamily.com/examiner/" + typNum + "/submit";
      this.$http.post(posturl, post_data).then(
        response => {
          // console.log(response);
          if (response.status == 200) {
            this.msgalert("保存成功");
          }
        },
        response => {
          this.showalert(response.body.msg);
        }
      );
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
        type: "text"
      });
    }
  },
  mounted() {
    let arrA = localStorage.getItem("errorAnswer");
    if (
      arrA == null ||
      arrA == undefined ||
      arrA == "" ||
      arrA == "null" ||
      arrA == "undefined"
    ) {
      this.adopt = true;
      this.notThrouth = false;
      this.buttonShow = false;
      this.subMitInfo();
    } else {
      this.adopt = false;
      this.notThrouth = true;
      this.buttonShow = true;
      this.errorAnswerFn();
      this.errorQsload();
    }
  }
};
</script>

<style lang='less' scoped>
.bj {
  position: fixed;
  width: 100%;
  height: 100%;
  //   background: url("https://img.guoanfamily.com/image/ks/index.jpg") no-repeat center;
  background: url("../assets/bg1.jpg") no-repeat center;
  background-size: 100% 100%;
}
.errorAnswer {
  width: 80%;
  font-size: 0.7rem;
  line-height: 1rem;
  position: absolute;
  top: 40%;
  left: 10%;
  text-align: center;
}
.onBtn {
  width: 50%;
  height: 2rem;
  position: absolute;
  left: 25%;
  top: 60%;
  background: #d7000f;
  line-height: 2rem;
  font-size: 24px;
  color:#fff;
  border:none;
  border-radius: 0.25rem;
  font-weight: 600;
//   background: url("../assets/zailaiyici.jpg") no-repeat center;
//   background-size: cover;
//   border-radius: 0.25rem;
}
</style>
