<template>
    <div class="bg">
        <p style="height:10rem"></p>
        <div style="width:50%;margin: 0 auto;">
            <input class='myinput' v-model="name" placeholder='姓名' />
            <input class='myinput' v-model="tel" placeholder='电话' />        
            <div style="margin:1.25rem auto 0 auto;text-align: center;">
                <x-button type="warn" @click.native="submit" :disabled='subed'>提交信息</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import { XInput, Selector,Alert } from 'vux'
export default {
    components: {
        XInput, Selector,Alert
    },
    data() {
        return {
            subed:false,
            name: "",
            tel: "",
            channel: ''
        }
    },
    methods: {
        submit() {
            this.subed = true;
            if(!this.name || !this.tel){
                this.showalert("请完善信息");
                this.subed = false;
                return;
            }
            let myanswer = localStorage.getItem('myanswer');
            let postdata = { "media": this.channel, "name": this.name, "phone": this.tel, "answer": myanswer}
            this.$http.post('http://www.guoanfamily.com/sign/api/v1/answer/save',
                postdata
            ).then(response => {
                // get body data
                if (response.body.code == 0) {
                    localStorage.setItem("num", response.body.data.id);
                    this.$router.push('end');
                } else {
                    this.subed = false;
                    this.showalert(response.body.msg);                    
                }
            }, response => {
                this.subed = false;
                this.showalert("服务器超时，请重试");                
            });

        },
        showalert(msg) {
            // 显示
            this.$vux.alert.show({
                title: '提示信息',
                content: msg
            })
        },
    }
}
</script>
<style>
.weui-cells {
    margin-top:10px!important;
    font-size: 14px!important;
}
</style>
<style scoped>
.myinput{
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    width: 100%;
    font-size: 18px;
    border: 0;
}

.weui-btn_warn {
    background-color: #2392FF;
}

.bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("../assets/bj.png") no-repeat top;
    background-size: 100%;
    background-size: cover;
    overflow-y: auto;
    padding-bottom: 1.25rem;
}
</style>

