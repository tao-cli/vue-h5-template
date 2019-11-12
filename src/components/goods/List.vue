<template>
  <main class="goods-list">
    <section class="btn-box">
      <van-button plain  ><i></i>我的拼团</van-button>
    </section>
    <section class="content-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadGoodsList"
        v-if="goods.length"
      >
        <div v-for="item in goods" :key="item.id">
          <GoodsItem :goodsInfor="item" />
        </div>
      </van-list>
      <div v-else class="no-data"></div>
    </section>  
  </main>
</template>
<script>
import {Button,List} from 'vant';
import GoodsItem from './GoodsItem';

export default {
  name:'goods-list',
  components:{
    [Button.name]: Button,
    [List.name]: List,
    GoodsItem
  },
  data(){
    return {
      goods:[
        {id:2133,personCount:2,imgUrl:'https://img.yzcdn.cn/vant/apple-1.jpg',pointPrice:34,moneyPrice:800,status:2,beginTime:235434525336,
          oldPrice:'原价',goodsTitle:'悦诗风吟乐活自然美妆工具腮红刷',endTime:1576800000000,priceType:'1',goodsType:1}
      ],loading:false,finished:true
    }
  },
  mounted(){
    this.loadGoodsList();
  },
  methods:{
    async loadGoodsList(){
      const {data} = await this.$ajaxGet("");
      if(data){
        console.log(data);
      }
    }
  }
}
</script>
<style lang="less">
  @import url('../comm.less');
</style>
<style lang="less" scoped>
  .goods-list{
    padding:32px 24px;
  }
  .btn-box{
    width:100%;
    height:90px; 
    background:rgba(255,255,255,1);
    border-radius:12px;
    button{
      width:100%; height: 90px;
      background:rgba(255,255,255,1);
      border-radius:12px;
      span{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:32px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:700;
        color:rgba(50,50,50,1);
      }
      i{
        display: inline-block; width:40px; height: 40px; margin-right: 10px;
        background: url(../../assets/images/pinicon.png) no-repeat;
        background-size: 100%;
      }
    }
  }
  .content-box{margin-top: 32px;}  
</style>