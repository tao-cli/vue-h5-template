<template>
  <div class="message-box">
    <h3>{{title}}</h3>
    <h2>{{name}}</h2>
  </div>
</template>
<script>
export default {
  name:'message-panel',
  props:{
    title:String,
    name:String
  }
}
</script>
<style lang="less" scoped>
  .message-box{
    h3{
      font-size:24px;
      font-family:PingFangSC-Light,PingFang SC;
      font-weight:300;
      color:rgba(255,255,255,1);
    }
    h2{
      font-size:55px; display: flex; align-items: center;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      &::before,&::after{content:'';display:inline-block; width:50px; height:5px; border:solid 1px #fff; border-left:none; border-right:none;}
      &::before{margin-right:10px;}
      &::after{margin-left:10px;}
    }
    margin-top: 20px;
  }
</style>