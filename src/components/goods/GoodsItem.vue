<template>
  <div class="goods-item" v-if="goodsInfor">
    <van-card
      thumb="https://img.yzcdn.cn/vant/apple-1.jpg" @click="showDetail"
    >
      <div slot="title">
        <van-tag color="#D2A878" plain>{{goodsInfor.personCount}}人团</van-tag><span class="self-title">{{goodsInfor.goodsTitle}}</span>
      </div>
      <div slot="desc"  v-if="!isGroup">
        <div v-if="goodsInfor.status==2" class="goods-desc">
          <span>拼团剩余：</span>
          <TimePanel :time="goodsInfor.endTime"/>
        </div>        
        <div v-if="goodsInfor.status == 1" class="goods-desc time-box">
          <span>开始时间：</span>
          <span>{{$moment(goodsInfor.beginTime).format("YYYY-MM-DD HH:mm")}}</span>
        </div>        
      </div>
      <div slot="price">
        {{actPrice}}       
        <div slot="origin-price" v-if="goodsInfor.goodsType==1">原价：{{goodsInfor.oldPrice}}</div>
      </div>
      <div slot="bottom" v-if="!isGroup">
        <van-button :class="{disabled:goodsInfor.status!=2}">{{mStatus[goodsInfor.status]}}</van-button>
      </div>
    </van-card>
  </div>
</template>
<script>
import {Card,Tag,Button,CountDown } from 'vant'
import TimePanel from '@/components/comm/TimePanel'

export default {
  name:'goods-item',
  components:{
    [Card.name]:Card,
    [Tag.name]:Tag,
    [Button.name]:Button,
    [CountDown.name]:CountDown,
    TimePanel
  },
  props:{
    isGroup:Boolean,
    goodsInfor:{type:Object}
  },
  data(){
    return {
      mStatus:{
        "1":"未开始", "2":"去开团", 
        "3":"已售罄", "4":"已结束"
      },
    }
  },
  computed:{
    actPrice(){
      let iType = this.goodsInfor.priceType;
      if(iType == 1){
        return this.goodsInfor.pointPrice+"积分";
      }else if(iType == 2){
        return "￥"+this.goodsInfor.moneyPrice;
      }else{
        return "￥"+this.goodsInfor.moneyPrice+" "+this.goodsInfor.pointPrice+"积分";
      }
    }
  },
  methods:{
    showDetail(){
      this.$router.push({ path: `/goods/detail/${this.goodsInfor.id}`})      
    }
  }
}
</script>
<style lang="less" scoped>  
  .goods-desc{
    display: flex; align-items: center; margin-top:9px;
    >span{
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      color:rgba(210,168,120,1);
      line-height:16px;
    }
  }
  .goods-item{
    margin-bottom:16px;
    .time-box{
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(210,168,120,1);
    }
    .van-card{
      width: 100%; padding: 12px;      
      background:rgba(255,255,255,1);
      border-radius:6px;
      .van-card__thumb{width: 124px; height: 124px;border-radius: 2px;}
      .van-card__content{
        .van-tag{position: absolute;left:0;}
        span.self-title{text-indent: 4.2em;
          text-align: left; line-height: 22px;
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:700;
          color:rgba(0,0,0,1);
          display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;
        }
      }
    }
    .van-card__content{ flex-direction: column; justify-content: space-around;}
    .van-card__bottom{
      margin-top:20px; display: flex; align-items: center;
      justify-content: space-between; text-align: left;
      [slot="price"]{
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,89,95,1);
        line-height:20px;
      }
      [slot="origin-price"]{text-decoration: line-through;
        font-size:12px; margin-top:6px;
        font-family:PingFangSC-Light,PingFang SC;
        color:rgba(179,179,179,1);
        line-height:20px;
      }
      button{
        width:72px;
        height:28px; line-height: 28px;
        background:linear-gradient(90deg,rgba(242,197,145,1) 0%,rgba(216,160,95,1) 100%);
        box-shadow:0px 3px 6px 0px rgba(182,121,51,0.27);
        border-radius:17px;
        span{color: #fff;
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:18px; 
        }
      }
      button.disabled{background:#D6D6D6;}
    }
  }
</style>