<template>
  <div>    
    <header :class="{'cont-height':groupDetail.canJoin!=1}">
      <MessagePanel :title="iMessage[groupDetail.canJoin-1].title" :name="iMessage[groupDetail.canJoin-1].name" v-if="groupDetail.canJoin!=1" />      
      <section class="group-goods">
        <GoodsItem :goodsInfor="groupDetail" :isGroup="true" />
      </section>      
    </header>
    <!-- :class="[{isActive:showList.includes(citem.id)},'tree-item']" -->
    <main :class="['main-box',{'main-cont-box':groupDetail.canJoin!=1}]">
      <h2>{{groupStatus}}</h2>
      <MemberList :members="groupDetail.groupList" :total="groupDetail.personCount" />
    </main>
    <footer>      
      <CommTab :tabList="tabList" />
    </footer>
    <van-button class="text-btn" @click="handleBtn">{{btnText}}</van-button>
  </div>
</template>
<script>
import {Button} from 'vant'
import MessagePanel from '@/components/comm/MessagePanel'
import MemberList from '@/components/comm/MemberList'
import GoodsItem from '@/components/goods/GoodsItem'
import CommTab from '@/components/comm/CommTab'

export default {
  name:'group-detail',
  components:{
    MessagePanel,MemberList,GoodsItem,CommTab,
    [Button.name]:Button,
  },
  data(){
    return {
      iMessage:[{title:'WAIT',name:'待参团'},{title:'TEAM SUCCESS',name:'拼团成功'},{title:'END OF TEAMWORK',name:'拼团结束'}],
      groupDetail:{
        imageUrl:'https://img.yzcdn.cn/vant/apple-1.jpg',personCount:14,goodsTitle:'商品标题阿望各位打得过',priceType:2,
        pointPrice:23,moneyPrice:234,oldPrice:934,canJoin:2,needCount:4,endTime:45434534543534,orderNo:98989435,
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
        {title:'商品详情',name:'商品介绍',cont:'是公司时光飞逝<img src="https://img.yzcdn.cn/vant/apple-1.jpg" />'},
        {title:'购买须知',name:'购买须知',cont:'<p>细致格式梵蒂冈</p><h3>agewgwgs</h3>'},
        {title:'拼团规则',name:'拼团规则',cont:'三国杀的故事苟富贵'},
      ],
      curGroup:null
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
    groupStatus(){
      let type = this.groupDetail.canJoin;
      if(type == 1){
        return '可参团'
      }else if(type == 2){
        return "拼团成功啦，记得按时使用哦~"
      }else{
        return "拼团已结束！"
      }
    }
  },
  mounted(){
    let iGroup = this.$route.params.group;
    console.log(iGroup)
    if(iGroup){
      this.curGroup = iGroup;
      this.getGroupInfor(iGroup)
    }
  },
  methods: {
    async getGroupInfor(){
      const {data} = await this.$ajaxPost(this.$API.GROUP_DETAIL)
    },
    handleBtn(){
      let type = this.groupDetail.canJoin;
      if(type == 1){
        alert('一键参团')
      }else if(type == 2){
        // 拼团成功，查看订单
        this.$router.push({ path: `/order/successed?order=${this.groupDetail.orderNo}&goods=${this}`})  
      }
    }
  },
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
      font-size:28px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:#666;
    }
  }
  footer{margin-top:32px; min-height: 48vh; background:#fff; padding-bottom:10vh; }
  .text-btn{
    position: fixed; bottom:3%; width:90%;
    height:84px;  text-align: center; left:5%;
    background:linear-gradient(300deg,rgba(225,196,144,1) 0%,rgba(191,157,95,1) 100%);
    box-shadow:0px 16px 32px 0px rgba(77,77,77,0.16);
    border-radius:42px;
    span{color:#fff; font-size:32px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1)
    }
  }
</style>