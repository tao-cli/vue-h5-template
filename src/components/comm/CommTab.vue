<template>
  <div>
    <van-tabs v-model="active" swipeable class="comm-tab" @click="goAnchor">
      <van-tab v-for="item in tabList" :title="item.title" > </van-tab>
    </van-tabs>
    <section v-for="item in tabList" :key="item.name" class="comm-tab-item" :id="item.title">
      <h3 class="tab-name"><i></i>{{item.title}}</h3>
      <div v-html="item.cont" class="tab-cont"></div>
    </section>
  </div>
</template>
<script>
import {Tab, Tabs,} from 'vant'

export default {
  name:'comm-tab',
  components:{
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  props:{
    tabList:{required:true,type:Array}
  },
  data(){
    return {
      active:''
    }
  },
  methods: {
    goAnchor(name,title){
      this.$el.querySelector('#'+title).scrollIntoView()
    }
  },
}
</script>
<style lang="less">
  .comm-tab{
    .van-tabs__wrap{
      height:108px;
      .van-tab{
        height:100%;background:rgba(255,255,255,1);
        // border-bottom:solid 1px #E5E5E5; 
        line-height: 108px;
        span{
          font-size:24px;
          font-family:SFUIDisplay-Light,SFUIDisplay;
          font-weight:300;
          color:rgba(127,127,127,1);
        }
      }  
      .van-tab--active span{color:#000000; font-weight: bold;}     
      .van-tabs__line{
        height:8px; bottom:5vw; max-width: 100px;
        background:rgba(219,182,120,1);
      } 
    }
  }
  .comm-tab-item{
    text-align: left; padding:32px;
    background:#fff; 
    h3{margin:0; margin-bottom: 40px;
      font-size:32px; display: flex; align-items: center;
      font-family:SFUIDisplay-Medium,SFUIDisplay;
      color:rgba(0,0,0,1); 
      i{
        display: inline-block; width:32px; height: 32px; 
        background: url(../../assets/images/detail-icon.png) no-repeat center; 
        background-size: 100%; margin-right: 15px;
      }
    }
    .tab-cont{
      font-size:28px;
      font-family:SFUIDisplay-Light,SFUIDisplay;
      font-weight:300;
      color:rgba(64,64,64,1);
      line-height:44px;
      img{width:100%;}
    }
  }
</style>