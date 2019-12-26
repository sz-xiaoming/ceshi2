<template>
    <div class="">

        <button class="btn" @click="selPic">选择照片</button>
        <div class="box">
            <img class="img" v-for="img in imgs" :src="img" :key="img" alt="">
        </div>
        
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
            imgs:[]
        };
    },
    computed: {

    },
    created() {
        this.initConfig();
    },
    mounted() {
       
    },
    methods: {
        initConfig(){
            // 后台的url
            var signatureUrl = `http://bufan.cloud/wx/user/getAccessToken?appId=${appId}`;
            axios.get(signatureUrl)
                .then(res=>{
                    var data = res.data;
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.noncestr , // 必填，生成签名的随机串
                        signature: data.signature,// 必填，签名
                        jsApiList: ['chooseImage','startRecord','stopRecord','translateVoice'] // 必填，需要使用的JS接口列表
                    });
                })

            
        },
        selPic(){
            var vm = this;
            wx.ready(function() {
                wx.chooseImage({
                    count: 8, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                     
                     vm.imgs = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    }
                });
            })
        }
    },
};
</script>

<style scoped lang="scss">
    .box{
        display: flex;
        justify-content: space-between;
        .img{
            width: 120px;
            height: 120px;
            margin: 30px auto;
        }
    }
</style>
