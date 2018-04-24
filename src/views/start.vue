<template>
  <div class="bg start">
      <!-- <div class="textContent">
      依据公司战略目标及管控原则，国安城市《组织手册》、《权责手册》已正式下发执行。为了更好的贯彻落实以上组织管控文件，现将开展“公司管控我了解”答题活动。活动时间为4月23日—4月27日连续五天，每人每日随机完成五道题目。每道题目答题时间为1分钟，题型为选择题，连续答对五道题即为通过，如中途答错，五道题目全部重新作答。
      </div> -->
      <div class="InputText">
          <div class="labelStyle" style="border-top:none;border-bottom:1px solid #9fa0a0;">
            <popup-picker class="leftNamesCard" title="公　　司　" value-text-align='left' :data="companyList"  v-model="company"  placeholder="请选择公司"></popup-picker>
          </div>
          <div class="labelStyle" style="border-top:none;">
            <popup-picker class="leftNamesCard" title="题　　型　" value-text-align='left' :data="qsTypeList"  v-model="qstype"  placeholder="请选择公司"></popup-picker>
          </div>
          <div class="labelStyle">
              <x-input class="leftName" title="姓　　名" name="name"  v-model='name' placeholder="请输入姓名"></x-input>
          </div>
          <div class="labelStyle">
              <x-input class="leftName" title="手机号码"  name="tel" v-model="tel"  placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
          </div>
      </div>
      <div class="position">
        <button class='button' @click="next">开　始</button>
      </div>
  </div>
</template>
<script>
import { XInput, Selector } from "vux";
export default {
  components: {
    XInput,
    Selector
  },
  data() {
    return {
      name: "",
      tel: "",
      openid: "",
      place: "请选择公司",
      company: ["请选择公司"],
      companyList: [
        [
          "请选择公司",
          "国安城市战略投资部",
          "国安城市产品开发管理部",
          "国安城市运营管理部",
          "国安城市成本采购部",
          "国安城市资金财务部",
          "国安城市党务人事部",
          "国安城市行政综合部",
          "金融事业部",
          "国科创富",
          "一城会展",
          "中科同德",
          "北京公司",
          "一城控股",
          "上海公司",
          "北海公司",
          "峨眉公司",
          "海南公司",
          "国安社区",
          "首佳信拆迁",
          "国安物业",
          "国安瑞",
          "国安家",
          "国安创客",
          "重庆公司",
          "武汉公司",
          "石家庄公司",
          "西藏北分",
          "项目组"
        ]
      ],
      qstype:["请选择题型"],
      qsTypeList:[
       [
          "请选择题型",
          '行政综合',
          '法律事务'
       ]
     ]
    };
  },
  methods: {
    next() {
      if (
        this.company == "" ||
        this.company == undefined ||
        this.company == null ||
        this.company == "null" ||
        this.company == "undefined" ||
        this.company == "请选择公司"
      ) {
        this.msgalert("请选择公司");
        return false;
      }
      if (
        this.qstype == "" ||
        this.qstype == undefined ||
        this.qstype == null ||
        this.qstype == "null" ||
        this.qstype == "undefined" ||
        this.qstype == "请选择题型"
      ) {
        this.msgalert("请选择题型");
        return false;
      }
      if (
        this.name == "" ||
        this.name == undefined ||
        this.name == null ||
        this.name == "null" ||
        this.name == "undefined"
      ) {
        this.msgalert("请输入姓名");
        return false;
      }
       if (
        this.tel == "" ||
        this.tel == undefined ||
        this.tel == null ||
        this.tel == "null" ||
        this.tel == "undefined"
      ) {
        this.msgalert("请输入电话");
        return false;
      }
      let typNum = '';
      if(this.qstype == '行政综合'){
        typNum = 3;
      }else{
        typNum = 2;
      }
      // let geturl ="http://mt.guoanfamily.com/examiner/1/question?phone=" + this.tel;
      let geturl =  'http://mt.guoanfamily.com/examiner/' + typNum + '/question?phone=' + this.tel;
      // let geturl =  'http://192.168.1.122:8280/' + typNum + '/question?phone=' + this.tel;
      this.$http.get(geturl).then(
        response => {
          // console.log(response);
          if (response.status == 200) {
            if (response.body.isFinished == false) {
              localStorage.setItem("strategy_company", this.company);
              localStorage.setItem("strategy_name", this.name);
              localStorage.setItem("strategy_tel", this.tel);
              localStorage.setItem("strategy_qsType",this.qstype);
              var arr = response.body.bankList;
              localStorage.setItem('qsArr',JSON.stringify(arr));
              let data = {
                company: this.company,
                tel: this.tel,
                name: this.name
              };
              this.$router.push({ path: "question", query: data });
            } else {
              this.msgalert('您今天已经答过题了');
              // this.$router.push({ path: "question", query: data });
              // this.confirm();
            }
          } else {
            this.showalert(response.statusText);
          }
        },
        response => {
          this.showalert(response.statusText);
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
    },
    confirm() {
      let me = this;
      me.$vux.confirm.show({
        title: "提示信息",
        content: "您今天已经答过题了，再来一次？",
        // 组件除show外的属性
        onCancel() {},
        onConfirm() {
          let data = {
            company: me.company,
            tel: me.tel,
            name: me.name
          };
          // alert("xixi" + JSON.stringify(data));
          me.$router.push({ path: "/question", query: data });
          //  me.$router.push("explain");
        }
      });
    }
  },
  mounted() {
    let company = localStorage.getItem("strategy_company");
    if (company) {
      this.company = [];
      this.company.push(company);
    } else {
      this.company = ["请选择公司"];
    }
    let qstype = localStorage.getItem('strategy_qsType');
    if(qstype){
      this.qstype = [];
      this.qstype.push(qstype);
    }
    let name = localStorage.getItem("strategy_name");
    if (
      name !== "" ||
      name !== undefined ||
      name !== null ||
      name !== "null" ||
      name !== "undefined"
    ) {
      this.name = name;
    } else {
      this.name = "";
    }
    let phone = localStorage.getItem("strategy_tel");
    if (
      phone !== "" ||
      phone !== undefined ||
      phone !== null ||
      phone !== "null" ||
      phone !== "undefined"
    ) {
      this.tel = phone;
    } else {
      this.tel = "";
    }
    XuntongJSBridge.call("getPersonInfo", {}, userinfo => {
      this.name = userinfo.data.name;
      this.tel = userinfo.data.userName;
      this.openid = userinfo.data.openId;
      localStorage.setItem("strategy_name", this.name);
      localStorage.setItem("strategy_tel", this.tel);
    });
  }
};
</script>

<style scoped>
.textContent {
  width: 90%;
  margin-top: 7rem;
  margin-left: 5%;
  color: #ffffff;
  font-size: .6rem;
  line-height: 1rem;
  text-align: left;
  padding:10px;
}
.InputText {
  width: 76%;
  margin-top: 40%;
  margin-left: 12%;
  border-radius: 0.25rem;
  border: 3px solid #ffffff;
}
.labelStyle {
  width: 90%;
  border-top: 1px solid #9fa0a0;
  font-size: 0.6rem;
  margin-left: 5%;
}
.bg {
  /* position: fixed; */
  width: 100%;
  /* height: 26rem; */
  height: 100%;
  overflow-x: auto;
  overflow-y: scroll;
  background: url("../assets/bg1.jpg") no-repeat top;
  background-size: 100% 100%;
}
.position {
  width: 100%;
  height: 50px;
  text-align: center;
  margin-top: 3rem;
}
.button {
  border: none;
  width: 50%;
  height: 2rem;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  border-radius: 0.25rem;
  background: #d7000f;
}
</style>
<style lang="less">
.start{
  .vux-cell-box:before{
    display: none;
    opacity: 0;
  }
}
.weui-dialog__hd {
  padding-top: 0.5rem;
}
.weui-dialog__btn_primary {
  color: #e40011;
}
.labelStyle {
  .leftName {
    .weui-label {
      width: 5rem;
      text-align: left;
      color: #000;
      font-weight: 500;
    }
    .weui-input{
      color:#000;
    }
   .vux-cell-box{
     &:before{
      border-top:none !important;
    }
   }
    // .weui-label::before {
    //   content: "*";
    //   position: absolute;
    //   color: red;
    //   left: 5px;

    // }
  }
  .leftNamesCard {
    .weui-label {
      width: 3.5rem;
      text-align: left;
      //   background:red;
      color: #000;
      font-weight: 500;
    }
    .vux-cell-value{
      color:#000;
    }
    
     
    // .weui-label::before {
    //   content: "*";
    //   position: absolute;
    //   color: red;
    //   left: 5px;
    // }
  }
}
</style>

