<template>
  <div>
      <!-- 选择时间 -->
    <div>
      <div class="labelStyle" style="background:#ffffff;">
            <!-- <datetime-range style="margin-left:.4rem;font-size:.6rem" placeholder="请选择时间" title="" :start-date="startdate" :end-date="enddate" :value="Showingsdate" @on-change="onChange"></datetime-range> -->
            <selector class="leftNamesCard" style="font-size:.7rem;" title=""  :options="typeList" v-model="qstype" placeholder='请选择题目类型' @on-change='onChange1'></selector>
        </div>
        <div class="labelStyle" style="background:#ffffff;top:47px;">
            <!-- <datetime-range style="margin-left:.4rem;font-size:.6rem" placeholder="请选择时间" title="" :start-date="startdate" :end-date="enddate" :value="Showingsdate" @on-change="onChange"></datetime-range> -->
            <selector class="leftNamesCard" style="font-size:.7rem;" title=""  :options="timeList" v-model="answerTime" placeholder="请选择时间" @on-change='onChange'></selector>
        </div>
    </div>
    <!-- 列表 -->
    <div class="companyList">
        <ul>
            <li :key="index" v-for="(item,index) in company" @click="companyListClick(item)">
                <div class="companyDom">
                    <span>{{item.companyName}}</span>
                    <span>{{item.examinerNum}}/{{item.peopleNum}}</span>
                    <span>{{item.percentage}}</span>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answerTime: "",
      company: [],
      timeList: [],
      typeList: ["行政综合", "法律事务"],
      qstype: "行政综合"
    };
  },
  methods: {
    // 获取时间接口方法
    timeListonLoad() {
      this.timeList = [];
      let typeNum = '';
      // let qstype = localStorage.getItem("strategy_qsType");
      if (this.qstype == "行政综合") {
        typeNum = 3;
      } else {
        typeNum = 3;
      }
      let geturl = "http://mt.guoanfamily.com/examiner/"+ typeNum +"/gettimerange";
      this.$http.get(geturl).then(
        response => {
          if (response.status == 200) {
            for (let i = 0; i < response.body.length; i++) {
              this.timeList.push(response.body[i].createtime);
            }
            // console.log(this.answerTime);
            this.timeList.push(this.answerTime);
            this.timeList = Array.from(new Set(this.timeList));
          } else {
            this.showalert(response.statusText);
          }
        },
        response => {
          this.showalert(response.statusText);
        }
      );
    },
    // 时间筛选的点击值变化事件
    onChange(value) {
      // console.log(value);
      if (this.qstype) {
        this.timeListonLoad();
        let typeNum = "";
        if (this.qstype == "行政综合") {
            typeNum = 3;
          } else {
            typeNum = 2;
          }
        let fiLterUrl = "http://mt.guoanfamily.com/examiner/" + typeNum + "/statistics?time=" + this.answerTime;
        this.$http.get(fiLterUrl).then(
          response => {
            if (response.status == 200) {
              if (response.body.length > 0) {
                for (let i = 0; i < response.body.length; i++) {
                  response.body[i].percentage =
                    (
                      response.body[i].examinerNum /
                      response.body[i].peopleNum *
                      100
                    ).toFixed(2) + "%";
                }
                this.company = response.body;
                // console.log("3  response.body:", response.body);
              } else {
                this.msgalert("当天没有人答题");
              }
            } else {
              this.showalert(response.statusText);
            }
          },
          response => {
            this.showalert(response.statusText);
          }
        );
      } else {
        this.msgalert("请选择答题类型");
        return false;
      }
    },
    onChange1(){
      this.timeList = [];
      this.onChange();
    },
    // 跳转到公司的详情
    companyListClick(item) {
      localStorage.removeItem("companyStaff");
      if (item.examinerList !== null) {
        localStorage.setItem("companyStaff", JSON.stringify(item.examinerList));
        this.$router.push("companylistdetials");
      } else {
        this.msgalert("该公司暂无答题记录");
      }
    },
    // 弹窗方法
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
    let date = new Date();
    let year = date.getFullYear();
    let mounth = date.getMonth() + 1;
    if(mounth < 10){
      mounth = "0" + mounth.toString();
    }
    let day = date.getDate();
    this.answerTime = year + "-" + mounth + "-" + day;
    // this.timeListonLoad();
  }
};
</script>

<style scoped lang="less">
body {
  background: red;
}
.labelStyle {
  width: 100%;
  height: 2rem;
  // background:red;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #e6e6e6;
}
.companyList {
  width: 100%;
  margin-top: 4rem;
  background: #ffffff;
  li {
    list-style: none;
    width: 100%;
    // margin-left: 2%;
    height: 2rem;
    border-bottom: 1px solid #e6e6e6;
    .companyDom {
      width: 100%;
      height: 100%;
      line-height: 2rem;
      span {
        display: block;
        float: left;
      }
      span:nth-child(1) {
        width: 55%;
        color: #333333;
        font-size: 0.7rem;
        padding-left: 0.5rem;
        font-weight: 500;
      }
      span:nth-child(2) {
        width: 15%;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
      }
      span:nth-child(3) {
        width: 30%;
        line-height: 2rem;
        color: red;
        font-size: 0.7rem;
        text-align: center;
      }
    }
  }
}
</style>
<style lang ='less'>
.labelStyle {
  .vux-cell-box {
    .weui-label {
      background: yellow;
      width: 0%;
    }
    span {
      display: block;
      width: 100%;
      height: 100%;
      text-align: left;
      font-size: 0.7rem;
      line-height: 2rem;
      padding-left: 1rem;
      font-weight: 500;
    }
  }
}
</style>
