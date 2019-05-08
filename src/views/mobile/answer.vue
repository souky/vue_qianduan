<template>
	<div id="answer" class="moblie-body">
    <div class="top">
      <img src="static/img/moblie/top.png" style="width:100%;height:100%">
    </div>
    <div class="bottom">
      <img src="static/img/moblie/bottom.png" style="width:100%;height:100%">
    </div>
		<div class="background">
      <img src="static/img/moblie/background.jpg" style="width:100%;height:100%">
    </div>
    <div class="total">
      1/10
    </div>
    <div class="main">
      <div class="title">
        1.是假的加上基地啊是降低地啊是降低地啊是降低地啊是降低地啊是降低地啊是降低地啊是降低
      </div>

      <div :class="chioce_ == 'A'?'answer-item active':'answer-item'" @click="chioce('A')">
        A.基地啊是降低
      </div>
      <div class="answer-item">
        B.基地啊是降低
      </div>
      <div class="answer-item">
        C.基地啊是降低
      </div>
      <div class="answer-item">
        D.基地啊是降低
      </div>

    </div>
	</div>
</template>

<script>
export default {
	  data () {
	    return {
	      msg: 'index',
        user:{},
        chioce_:'',
        times:0
	    }
	  },
	  mounted:function(){
      this.user = this.$getData("user");
      // setInterval(data=>{
      //   this.times += 1;
      // },1000);
	  },
	  methods:{
      chioce(data){
        this.chioce_ = data;
        console.log(this.times);
        this.times = 0;
      },
	  }
}
</script>

<style>
#answer .main .title{
  width: 100%;
  height: 6em;
  padding:1.5em;
  font-size: 1.5em;
  background: #85c6da;
  color: #fff;
  margin-top: 2em;
  box-sizing: border-box;
  padding-left:2em;
  margin-bottom: 2em;
}
#answer .main .answer-item{
  width: 80%;
  font-size: 2em;
  color: #666;
  background: #fff;
  text-align: center;
  margin: 1em auto;
  line-height: 3.5em;
  box-shadow: 1px 1px 10px #c7c7c7;
  border-radius: 10px;
}
#answer .main .answer-item.active{
  color:#fff;
  background: #409EFF;
}
#answer .total{
  text-align: center;
  width:100%;
  font-size: 2em;
  color:#888;
  position: absolute;
  bottom:20%;
  z-index: 99;
}
</style>
