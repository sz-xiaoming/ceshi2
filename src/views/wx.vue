<template>
    <div class="">
        <button @click="doLogin">点击登陆</button>
        <img class="avatar" :src="avatar"  style="" alt="">
        <p class="nickname">{{nickname}}</p>
    </div>
</template>

<script>
var appId = "wxb10344d6be4e46ee";
import axios from 'axios'
export default {
    components: {

    },
    data() {
        return {
            avatar:'',
            nickname:'',
            userInf: {}
        };
    },
    computed: {

    },
    created() {
        console.log('created...')
        //如果url存在code说明已经交换完毕
        if(this.getUrlParams('code')){
            console.log('有code 获取用户信息...');
            //2. 发送请求到后台,根据code获取用户基本信息
            var code = this.getUrlParams('code');
            var url = `http://bufan.cloud/wx/user/getUserInfo?code=${code}&appid=${appId}`;
            axios.get(url)
                .then(res=>{
                    // console.log(res);
                    // alert(JSON.stringify(res));
                    this.userInf = res.data.data;
                    this.avatar = res.data.data.headimgurl;
                    this.nickname = res.data.data.nickname;
                })
        }
    },
    mounted() {

    },
    methods: {
        doLogin(){
             
            var rUrl = "http://bufan.natapp1.cc/wx";
            // 1. 引导用户获取code
            var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${rUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
            window.location.href = url;
        },
        //用于解析url 并获取name对应的值
        getUrlParams(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    },
};
</script>

<style scoped lang="scss">
    *{
        text-align: center;
    }
    .avatar{
        width: 100px;
        height: 100px;
        margin: 100px auto;

    }
</style>
