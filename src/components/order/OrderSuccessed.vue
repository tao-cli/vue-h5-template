<template>
  <div>    
    <Header :jumpType="1" />
    <header class="cont-height">
      <MessagePanel :title="iMessage.title" :name="iMessage.name"  />      
      <section class="group-goods">
        <GoodsItem :goodsInfor="groupDetail" :isGroup="true" />
      </section>      
    </header>
    <!-- :class="[{isActive:showList.includes(citem.id)},'tree-item']" -->
    <main :class="['main-box']">
      <h2></h2>
      <p><span>{{groupDetail.groupList.length}}</span>人成团，还需<span>{{groupDetail.needCount}}</span>人即可拼团成功</p>
      <MemberList :members="groupDetail.groupList" :total="groupDetail.personCount" />
      <div class="btn-box">
        <van-button plain type="primary">邀请好友拼团</van-button>
        <van-button plain>查看订单</van-button>
      </div>
    </main>
    <footer>  
      <section>
        <canvas id="canvas"></canvas>
        <i v-for="item in 4" :key="item"></i>
      </section>
      <div class="qrcode-text">
        <p>请关注“杭州大厦”公众号</p>
        <p>进入公众号了解拼团订单实时状态</p>
      </div>
    </footer>
  </div>
</template>
<script>
import {Button} from 'vant'
import MessagePanel from '@/components/comm/MessagePanel'
import MemberList from '@/components/comm/MemberList'
import GoodsItem from '@/components/goods/GoodsItem'
import CommTab from '@/components/comm/CommTab'
import QRCode from 'qrcode'
import Header from '@/components/comm/Header'

export default {
  name:'group-detail',
  components:{
    MessagePanel,MemberList,GoodsItem,CommTab,
    [Button.name]:Button,Header,
  },
  data(){
    return {
      iMessage:{title:'PAYMENT SUCCEED',name:'支付成功'},
      groupDetail:{
        imageUrl:'https://img.yzcdn.cn/vant/apple-1.jpg',personCount:14,goodsTitle:'商品标题阿望各位打得过',priceType:2,
        pointPrice:23,moneyPrice:234,oldPrice:934,canJoin:2,needCount:4,endTime:45434534543534,
        groupList:[
          {isHeader:1,imageUrl:'https://img.yzcdn.cn/vant/apple-2.jpg',nickName:'sfdf'},
          {isHeader:0,imageUrl:'https://img.yzcdn.cn/vant/apple-3.jpg',nickName:'cbdfb'},
          {isHeader:0,imageUrl:'https://img.yzcdn.cn/vant/cat.jpeg',nickName:'sfderhf'},
          {isHeader:0,imageUrl:'https://img.yzcdn.cn/vant/apple-5.jpg',nickName:'cbggdfb'},
          {isHeader:0,imageUrl:'https://img.yzcdn.cn/vant/apple-6.jpg',nickName:'sfsgfsdgdf'},
          {isHeader:0,imageUrl:'https://img.yzcdn.cn/vant/apple-7.jpg',nickName:'sfbbdf'},          
          {isHeader:0,imageUrl:'https://img.yzcdn.cn/vant/apple-5.jpg',nickName:'cbgrrrgdfb'},
          {isHeader:0,imageUrl:'https://img.yzcdn.cn/vant/apple-6.jpg',nickName:'sfsttgfsdgdf'},
          {isHeader:0,imageUrl:'https://img.yzcdn.cn/vant/apple-7.jpg',nickName:'sfbyyybdf'}
        ],
        goodsDetail:'商品详情',shoppingAlert:'购物须知',groupRule:'拼团规则'
      },
      tabList:[
        {title:'商品详情',name:'商品介绍',cont:'是公司时光飞逝'},
        {title:'购买须知',name:'购买须知',cont:'<p>细致格式梵蒂冈</p><h3>agewgwgs</h3>'},
        {title:'拼团规则',name:'拼团规则',cont:'三国杀的故事苟富贵'},
      ],
      curOrder:null
    }
  },
  mounted(){
    let iOrder = this.$route.params.order;
    console.log(iOrder)
    this.curOrder = iOrder;
    iOrder && this.getOrder(iOrder);
  },
  methods: {
    getOrder(){
      QRCode.toCanvas(document.getElementById("canvas"), 'sample text',{margin:0})
    }
  },
  computed:{
    btnText(){
      let type = this.groupDetail.canJoin;
      if(type == 1){
        return '一键参团'
      }else if(type == 2){
        return "查看订单"
      }else{
        return "查看其他拼团"
      }
    },
  }
}
</script>
<style lang="less" scoped>
  header{
    background:linear-gradient(360deg,rgba(227,187,123,1) 0%,rgba(245,216,165,1) 100%);
    padding:32px; min-height: 248px; display: flex; justify-content: center;
    position: relative;
    .group-goods{
      position: absolute; bottom:-60%;
      max-width: 95%; margin:0 auto;
    }
  }
  .cont-height{min-height: 322px;}
  .main-box{
    padding-top:30%; background:#FAFAFA;
    min-height: 30vh;
    h2{
      font-size:28px;height:44px; width:204px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400; margin:10px auto; margin-bottom:15px;
      color:#666;
      background:url(../../assets/images/pintuan.png) no-repeat center; 
      background-size: 100%;
    }
    p{
      font-size:28px;margin-bottom: 20px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:#484848;
    }
    p>span{
      font-size:28px;margin:0 5px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(246,67,67,1);
    }
    .btn-box{
      padding:65px 0 ; 
      .van-button{
        height:74px; border-radius: 37px; width:240px;
        border:2px solid rgba(219,182,120,1);
        span{
          font-size:28px; color:#DBB678;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
        }
      }
      .van-button--primary {
        background:#DBB678; margin-right:44px;
        span{color:#fff;}
      }
    }
  }
  footer{
    margin-top: 40px; padding-bottom:20px;
    background:#f5f5f5;
    section{position: relative; padding:20px; width:250px; height: 245px; margin:0 auto; }
    canvas{
      width: 209px !important; height: 209px !important;     
    }
    i{
      display: inline-block; width:24px; height: 24px; border-radius: 12px; position: absolute;
      &:nth-of-type(1){border-left:solid 3px #DBB678; border-top:3px solid #DBB678; left:0; top:0; border-top-right-radius: 0;border-bottom-left-radius: 0;}
      &:nth-of-type(2){border-right:solid 3px #DBB678; border-top:3px solid #DBB678; right:0; top:0; border-top-left-radius: 0;border-bottom-right-radius: 0;}      
      &:nth-of-type(3){border-left:solid 3px #DBB678; border-bottom:3px solid #DBB678; left:0; bottom:0; border-top-left-radius: 0;border-bottom-right-radius: 0;}
      &:nth-of-type(4){border-right:solid 3px #DBB678; border-bottom:3px solid #DBB678; right:0; bottom:0; border-top-right-radius: 0;border-bottom-left-radius: 0;}
    }
    .qrcode-text{
      text-align: center; margin-top:30px;
      font-size:28px;
      font-family:PingFangSC-Light,PingFang SC;
      font-weight:300;
      color:rgba(146,148,151,1);
    }
  }
</style>