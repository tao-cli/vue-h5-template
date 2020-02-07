<template>
  <div >
    <div class="address-box">
      <header><i></i>兑换须知</header>
      <section class="address-detail">
        <h4>[实物礼品] 需前往杭州大厦D座兑换</h4>
        <p>浙江省杭州市西湖区杭州大厦购物城D座1层总服务台(0571-85006107)</p>
      </section>
    </div>    
    <section class="order-list">
      <h4>商品信息</h4>
      <div class="goods-box">
        <article >
          <aside ><img :src="goods.imageUrl" alt="商品图示"></aside>
          <main >
            <header><van-tag color="#D2A878" plain>{{goods.personCount}} 人团</van-tag><span class="self-title">{{goods.goodsTitle}}</span></header>
            <footer>{{actPrice}}</footer>
          </main>
        </article>
      </div>
    </section>
    <footer class="order-footer">
      <aside><p>合计：</p><span>{{actPrice}}</span></aside>
      <aside><van-button @click="confirm">确认下单</van-button></aside>
    </footer>
  </div>
</template>
<script>
import {Tag,Button} from 'vant'
export default {
  name:'order-detail',
  components:{
    [Tag.name]:Tag,
    [Button.name]:Button,
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
          oldPrice:'原价',goodsTitle:'悦诗风吟乐活自然美妆工具腮红刷',endTime:1576800000000,priceType:'1',goodsType:2,
          goodsDetail:'',shoppingAlert:'',groupRule:''},
      goodsId:null
    }
  },
  mounted(){
    let iGood = this.$route.params.goods;
    
    this.goodsId = iGood;
    iGood && this.getGoodsInfo(iGood);    
  },
  methods: {
    confirm(){
      this.submitOrder();
    },
    async submitOrder(){
      const {data} = await this.$ajaxPost(this.$API.CREATE_ORDER,{goodsId:this.goodsId,openId:'',groupId:''})
      this.$router.push({path:`/order/successed/${this.orderId||9527}`})
      if(data){
        console.log(data);
      }
    } ,   
    async getGoodsInfo(id){
      const {data} = await this.$ajaxPost(this.$API.GOODS_DETAIL,{goodsId:id});
      if(data){
        this.goods = data;
      }
    }
  },
}
</script>
<style lang="less" scoped>
  .address-box{
    border-bottom: 10px solid transparent; height:123px; padding:19px 16px;
    background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(-45deg, red 0, red 2.5%, 
        transparent 0, transparent 3.5%, #58a 0, #58a 5.5%, 
        transparent 0, transparent 6.5%) 0/10px 10px;
    header{
      display: flex; align-items: center; 
      font-size:14px;
      font-family:SFUIDisplay-Light,SFUIDisplay;
      color:rgba(0,0,0,1);
      i{display: inline-block; width: 18px; height:18px; 
        background:url(../../assets/images/gift.png) no-repeat; 
        background-size: 100%; margin-right: 8px;}
    }
    .address-detail{
      text-align: left; padding-left:23px;
      h4{
        font-size:12px;margin:10px 0;
        font-family:PingFangSC-Regular,PingFang SC;
        color:rgba(64,64,64,1);
      }
      p{
        font-size:12px;margin:0;
        font-family:PingFangSC-Light,PingFang SC;
        font-weight:300;
        color:rgba(143,143,143,1);
        line-height:20px;
      }
    }
  }
  .order-list{
    margin-top:10px; padding:0 16px;
    background:#fff;
    h4{
      font-size:14px; text-align: left;
      font-family:SFUIDisplay-Medium,SFUIDisplay;
      font-weight:600; height: 50px; line-height: 50px;
      border-bottom: solid 1px #E5E5E5;
      color:rgba(0,0,0,1); margin:0;
    }
    .goods-box{max-height: 65vh; overflow: hidden; overflow-y: auto;}
    article{
      height:122px;padding:18px 0; display: flex; border-bottom:solid 1px #E5E5E5;
      aside{width:86; height: 86px; margin-right:12px; img{width:100%; height: 100%;}}
      main{
        display: flex; flex-direction: column; justify-content: space-between; text-align: left;
        .self-title{
          font-size:14px; margin-left:6px;
          font-family:PingFangSC-Light,PingFang SC;
          font-weight:300;
          color:rgba(0,0,0,1);
        }
        footer{
          font-size:14px;
          font-family:PingFangSC-Light,PingFang SC;
          font-weight:300;
          color:rgba(0,0,0,1);
        }
      }
    }
  }
  .order-footer{
    position: absolute; bottom: 0%; width:100%; padding:8px 16px;
    display: flex; justify-content: space-between;
    align-items: center;height: 84px; background: #fff;
    aside{
      text-align: left;
      font-size:12px;
      font-family:SFUIDisplay-Light,SFUIDisplay;
      font-weight:300;
      color:rgba(0,0,0,1);
      span{
        font-size:16px;
        font-family:Helvetica;
        color:rgba(255,76,76,1);
        line-height:24px;
      }
      .van-button{
        height:40px; padding: 9px 22px;
        background:rgba(219,182,120,1);
        border-radius:4px; line-height: 20px;
        span{
          font-size:14px;
          font-family:SFUIDisplay-Medium,SFUIDisplay;
          font-weight:500;
          color:rgba(255,255,255,1);}
      }
    }
  }
</style>