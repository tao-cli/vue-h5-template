<template>
  <div>
    <ul class="member-box" :style="{'justifyContent':showTotal?'flex-start':'center'}">
      <li v-for="item in actMember" :key="item.nickName" :class="{'leader-label':item.isHeader}">
        <img :src="item.imageUrl" :alt="item.nickName">
        <!-- <i :style="`backgroundImage:url(${item.imageUrl})`"></i> -->
      </li>
      <li v-for="item in leftMember" :key="item">
        <i>?</i>
      </li>
      <li v-if="members.length>5" @click="toggleTotal" class="toggle-btn"><span>{{showTotal?'收起':'全部'}}</span></li>
    </ul>
  </div>
</template>
<script>
import { Grid, GridItem } from 'vant'
export default {
  name:'member-list',
  components:{
    [Grid.name]:Grid,
    [GridItem.name]:GridItem
  },
  props:{
    members:{required:true,type:Array},
    total:{required:true,type:Number}
  },
  computed:{
    leftMember(){ return this.total-this.members.length>0&&this.showTotal?this.total-this.members.length:0;},
    actMember(){
      let isTotal = this.showTotal;
      return isTotal?this.members:this.members.filter((item,index)=>index<5);
    }
  },
  methods: {
    toggleTotal(){this.showTotal = !this.showTotal;}
  },
  data(){
    return {
      showTotal:false
    }
  }
}
</script>
<style lang="less" scoped>
  .member-box{
    display: flex;
    justify-content: center;
    flex-wrap: wrap; min-height: 70px;
    max-width: 90%;
    margin: 0 auto;
    li{
      width:42px; height: 42px;  margin:14px 7px; 
      img{width:100%; height: 100%;border-radius: 50%;}
      i{display: inline-block; width:100%; height: 100%;  font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC; line-height: 42px;
        font-weight:400; font-style: normal;
        color:rgba(186,186,186,1);text-align: center; border-radius: 50%;  background:rgba(237,237,236,1);
        border:1px dashed rgba(200,200,200,1);
      }
    }
    
    .leader-label{
      position: relative;
      &::after{
        content:'团长'; display: inline-block;  position: absolute;
        height:14px; padding: 1px 5px; bottom:-15%; left:5px;
        background:linear-gradient(360deg,rgba(227,187,123,1) 0%,rgba(245,216,165,1) 100%);
        border-radius:7px;
        font-size:8px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
    .toggle-btn{
      span{
        width:42px; height:42px; border-radius: 50%; line-height: 42px;
        font-size:12px; display: inline-block;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        background:rgba(236,211,171,1);
      }
    }
  }
</style>