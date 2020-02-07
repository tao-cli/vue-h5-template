<template>
  <div class="detail-box">
    <header @click="show = true"  :style="{ 'backgroundImage': 'url('+goods.imageUrl+')'}"></header>    
    <van-row class="detail-title"> 
      <van-col span="14" class="title-left" :title="goods.goodsTitle">{{ goods.goodsTitle }}</van-col>
      <van-col span="6" offset="4" class="title-right">{{ goods.allPerson>99999?'99999+':goods.allPerson }}已拼</van-col>
    </van-row>
    <van-row class="detail-brief">
      <van-col span="12">
        <van-tag plain color="#D2A878">{{goods.personCount}} 人团</van-tag>
        <span class="brief-price">{{actPrice}}</span>
        <label class="brief-origin-price" v-if="goods.goodsType == 1">{{goods.oldPrice}}</label>
      </van-col>
      <van-col span="12" class="brief-time">
        <!-- TODO:拼团进行中，以及未开始 -->
        <h4>拼团倒计时</h4>
        <TimePanel :time="goods.endTime" />
      </van-col>
    </van-row>
    <CommTab :tabList="tabList" :infor="goods" />
    <footer><van-button :class="{disabled:goods.status!=2}" @click="showOrder">{{mStatus[goods.status]}}</van-button></footer>
    <van-popup v-model="show" style="width:100%"><img :src="goods.imageUrl" width="100%" alt=""></van-popup>
  </div>
</template>
<script>
import {
  Row,Button,
  Col,Tab, Tabs,
  CountDown,Tag,
  Popup,
} from 'vant';
import CommTab from '@/components/comm/CommTab'
import TimePanel from '@/components/comm/TimePanel'

export default {
  name:'goods-detail',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Button.name]:Button,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag,[Popup.name]:Popup,
    [CountDown.name]:CountDown,
    CommTab,TimePanel
  },
  computed:{
    actPrice(){
      let iType = this.goods.priceType;
      if(iType == 1){
        return this.goods.pointPrice+"积分";
      }else if(iType == 2){
        return "￥"+this.goods.moneyPrice;
      }else{
        return "￥"+this.goods.moneyPrice+" "+this.goods.pointPrice+"积分";
      }
    }
  },
  data(){
    return {
      goods:{id:2133,personCount:2,imageUrl:'https://img.yzcdn.cn/vant/apple-1.jpg',pointPrice:34,moneyPrice:800,status:2,beginTime:235434525336,
          oldPrice:'原价',goodsTitle:'悦诗风吟乐活自然美妆工具腮红刷',endTime:1576800000000,priceType:'1',goodsType:2,allPerson:3453465,
          goodsDetail:'是公司时光飞逝<img src="https://img.yzcdn.cn/vant/apple-7.jpg" />',
          shoppingAlert:'<p>细致格式梵蒂冈</p><h3>agewgwgs</h3>',
          groupRule:'三国杀的故事苟富贵'},
      show:false,
      mStatus:{
        "1":"未开始，敬请期待", "2":"立即开团", 
        "3":"已售罄", "4":"已结束"
      },
      tabList:[
        {title:'商品详情',name:'desc',cont:'是公司时光飞逝<img src="https://img.yzcdn.cn/vant/apple-7.jpg" />'},
        {title:'购买须知',name:'know',cont:'<p>细致格式梵蒂冈</p><h3>agewgwgs</h3>'},
        {title:'拼团规则',name:'rule',cont:'三国杀的故事苟富贵'},
      ],
      time:30*60*60*1000,active:'',goodsId:null,
      timeData:{
        hours:3,minutes:30,seconds:30
      }
    }
  },
  mounted(){
    let curId = this.$route.params.id;
    if(curId){
      this.goodsId = curId;
      this.loadGoodsDetail(curId)
    }
  },
  methods:{
    renderTime(time){return time<10?'0'+time:time;},
    async loadGoodsDetail(id){
      const {data} = await this.$ajaxPost(this.$API.GOODS_DETAIL,{goodsId:id});
      if(data){
        this.goods = data;
        this.$set(this.tabList,0,{...this.tabList[0],cont:data.goodsDetail||''})
        this.$set(this.tabList,1,{...this.tabList[1],cont:data.shoppingAlert||''})
        this.$set(this.tabList,2,{...this.tabList[2],cont:data.groupRule||''})
      }
    },
    showOrder(){
      this.$router.push({ path: `/order/brief/${this.goodsId}`})  
    }
  },
}
</script>
<style lang="less" scoped>
  .detail-box{
    header{width:375px; height: 375px; background-repeat: no-repeat; background-size: 100%; background-position: center; background-color:#fff;}
    .detail-title{
      background:#fff; height: 84px; line-height: 50px; vertical-align: middle; text-align: left;padding:16px 12px; border-top: solid 1px #fafafa;
      .title-left{
        font-size:16px; overflow: hidden;  text-overflow: ellipsis; white-space: nowrap;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:700;
        color:rgba(0,0,0,1);
      }
      .title-right{font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(197,197,197,1);
        letter-spacing:1px;}
    }
    .detail-brief{
      display: flex; align-items: center; margin:16px 0;
      height:60px;background:rgba(255,255,255,1);
      .brief-time{
        height: 90%;
        h4{
          font-size:12px; margin:2.5px 0 10px 0;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(210,168,120,1);
        }
        .van-count-down{
          height:18px; margin-top:10px;
          span{
            width:18px; height:18px; padding: 4px; 
            font-size:10px;
            font-family:PingFangSC-Medium,PingFang SC;
            color:rgba(255,255,255,1);
            background:linear-gradient(90deg,rgba(242,197,145,1) 0%,rgba(216,160,95,1) 100%);
            border-radius:2px;
          }
        }
      }
      .brief-price{
        font-size:18px;margin:0 7px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,89,95,1);
      }
      .brief-origin-price{
        font-size:12px; text-decoration: line-through;
        font-family:Helvetica;
        color:rgba(179,179,179,1);
      }
    }
    footer{
      width:100%;
      button{width:90%; margin:5px auto;
        height:42px; color:#fff; line-height: 42px;
        background:rgba(219,182,120,1);
        border-radius:4px;border-radius:21px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      button.disabled{background: #D6D6D6;}
    }
  }
</style>