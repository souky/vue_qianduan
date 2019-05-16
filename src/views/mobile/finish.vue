<template>
	<div id="finish" class="moblie-body">
		<div class="top">
      <img src="static/img/moblie/top.png" style="width:100%;height:100%">
    </div>
		<div class="topText">
      海选测试题
    </div>
    <div class="bottom">
      <img src="static/img/moblie/bottom.png" style="width:100%;height:100%">
    </div>
		<div class="background">
      <img src="static/img/moblie/background.jpg" style="width:100%;height:100%">
    </div>
    <div class="main">
      <div class="title">
        您已作答完毕,得分以及能力评估报告将在面试环节揭晓,请留意面试晋级名单或等候面试通知
      </div>
    </div>
	</div>
</template>

<script>
export default {
	  data () {
	    return {
	      msg: 'index',
        times:0,
        beyoned:"100%"
	    }
	  },
	  mounted:function(){
      var userId = this.$getData("userId");
      // this.$postHttpForMb("userscore/getUserScoreByIdCount",userId,res=>{
      //   this.times = res.result.times;
      //   this.beyoned = res.result.beyoned;
      // })
	  },
	  methods:{
	  }
}
</script>

<style>
#finish .main_items{
  width:90%;
  margin:2em auto;
}
#finish .main{
  overflow: auto;
}
#finish .title{
  margin: 2em auto 1em auto;
  width:100%;
  line-height: 2em;
  font-size: 2.5em;
  text-align: center;
  color:#7ec6c2;
	box-sizing: border-box;
  padding: 1em 1.5em;
}
#finish .times{
  margin: auto;
  width:100%;
  line-height: 2em;
  font-size: 2.5em;
  text-align: center;
  color:#7ec6c2;
}
#finish .times i{
  color:#c77e7e;
}
#finish .beyoned{
  margin: auto;
  width:100%;
  line-height: 2em;
  font-size: 2.5em;
  text-align: center;
  color:#7ec6c2;
}
#finish .beyoned font{
  color:#c77e7e;
}
#finish.moblie-body .top{
	width: 90%;
	height: 6em;
	position: absolute;
	top: 5%;
	left: 5%;
	z-index: 99;
}
#finish.moblie-body .topText{
	width: 90%;
	height: 2em;
	line-height: 2em;
	text-align: center;
	color: #7ec7c0;
	position: absolute;
	top: calc(5% + 2em);
	left: 5%;
	font-size: 3em;
	z-index: 99;
}
#finish.moblie-body .bottom{
	width: 90%;
	height: 13em;
	position: absolute;
	bottom: 5%;
	left: 5%;
	z-index: 99;
}
</style>
