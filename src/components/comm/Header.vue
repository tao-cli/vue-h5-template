<!-- 顶部标题组件 -->
<template>
  <div class="head-title">
    <div class="back" @click="onClickLeft">
      <van-icon name="arrow-left" class="arrow-left" />
    </div>
    <p>{{title}}</p>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  props: {
    jumpType: {
      type: [String,Number],
      default: ''
    }
  },
  components: {
    [Icon.name]: Icon
  },
  data(){return {title:''}},
  mounted(){
    this.title = this.$route.meta.title;
  },
  methods: {
    onClickLeft() {
      if (this.jumpType == 1) {
        this.$router.push({
          path: '/goods'
        })
      } else {
        window.history.go(-1)
      }
    }
  }
 }
</script>

<style lang='less' scoped>
.head-title{
  height:64px;
  width: 100%; 
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
}
.back{
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left:0;
  top: 0;
}
.arrow-left{
  color: #000;
  font-weight: 600;
  font-size: 32px;
}
p{
  display: inline-block;
  font-size: 32px;
  font-family:SFUIDisplay-Medium;
  font-weight:500;
  color:rgba(0,0,0,1);
  line-height:22px;

}
</style>
