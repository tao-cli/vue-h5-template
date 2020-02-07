<!--
 *@name TimePanel    通用时间倒计时
 *@author Sam
 *@date 2019/11/05
 *@desc  根据传入时间显示倒计时效果
 *@param time  毫秒时间
 *
-->
<style lang="less" scoped>
  .time-pane{
    .van-count-down{
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
</style>
<template>
  <div class="time-pane">
    <van-count-down  :time="diffTime" format="HH:mm:ss">
      <template v-slot="timeData">
        <span class="item">{{ renderTime(timeData.days)}}天</span> &nbsp;
        <span class="item">{{ renderTime(timeData.hours) }}</span>:
        <span class="item">{{ renderTime(timeData.minutes) }}</span>:
        <span class="item">{{ renderTime(timeData.seconds) }}</span>
      </template>
    </van-count-down>
  </div>
</template>
<script>
import {CountDown} from 'vant'
export default {
  name:'time-count',
  components:{
    [CountDown.name]:CountDown
  },
  props:{
    time:{required:true,type:[Number,String]}
  },
  computed:{
    diffTime(){
      let end = this.$moment(this.time),now = this.$moment(new Date());
      return end.diff(now,'milliseconds');
    },
    timeData(){
      let end = this.$moment(this.time),now = this.$moment(new Date());
      let iTime = end.diff(now,'seconds'), day = Math.floor(iTime/(24*3600));
      console.log(iTime)
      let hours = Math.floor((iTime - 24*3600*day)/3600), 
          minutes = Math.floor((iTime - 24*3600*day - 3600*hours)/60), 
          seconds = Math.floor((iTime - 24*3600*day - 3600*hours - minutes*60));
      return {hours,minutes,seconds,days:day}
    },
  },
  methods: {
    renderTime(time){return time<10?'0'+time:time;},
  },
}
</script>