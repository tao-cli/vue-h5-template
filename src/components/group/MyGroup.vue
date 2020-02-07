<template>
  <div>
    <Header />
    <van-tabs v-model="active" class="comm-tab" sticky>
      <van-tab v-for="item in types" :title="item.title" :key="item.name"></van-tab>
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadGoodsList"
      v-if="groups.length"
    >
      <div v-for="item in groups" :key="item.id"></div>
    </van-list>
    <div v-else class="no-order">
      <van-button>去逛逛吧</van-button>
    </div>
  </div>
</template>
<script>
import {Button,List,Tab, Tabs} from 'vant';
import Header from '@/components/comm/Header'

export default {
  name:'my-group',
  components:{
    [Button.name]: Button,
    [List.name]: List,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    Header
  },
  data(){
    return {
      groups:[],active:'',
      types:[{id:'',title:'全部订单'},{id:'1',title:'待付款'},{id:'2',title:'待成团'},{id:'3',title:'待使用'},]
    }
  }
}
</script>
<style lang="less">
  @import url('../comm.less');
  .no-order{
    width:100%; height:89vh; background:url(../../assets/images/noorder.png) no-repeat center #FAFAFA; background-size: 40%;
    display: flex; justify-content: center;
    &::after{content:'当前状态暂无订单'; display: inline-block; 
      position: absolute; bottom: 33%; font-weight:bold;
      font-size:16px;
      font-family:SFUIDisplay-Medium,SFUIDisplay;
      font-weight:500;
      color:rgba(0,0,0,1);
    }
    .van-button{
      height:40px; padding:9px 22px; line-height: 20px;
      background:rgba(219,182,120,1);
      border-radius:4px; position: absolute;
      bottom: 25%;
      span{
        font-size:14px;
        font-family:SFUIDisplay-Medium,SFUIDisplay;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
  }
</style>