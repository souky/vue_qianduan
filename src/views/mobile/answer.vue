<template>
	<div id="answer" class="moblie-body">

		<!-- <div class="bottom">
			<img src="static/img/moblie/bottom.png" style="width:100%;height:100%">
		</div> -->
		<div class="background">
      <img src="static/img/moblie/background.jpg" style="width:100%;height:100%">
    </div>

    <div class="main">

			<div class="top">
	      <img src="static/img/moblie/top.png" style="width:100%;height:100%">
	    </div>

			<div class="question" v-for="(e,index) in  questionList" :key="e.id" v-show="e.sort == sort">
				<div class="title">
	        {{index+1}}.{{e.question}}
	      </div>
				<div class="url_img" v-if="e.imgUrl != '' && e.imgUrl != undefined">
					<img :src="e.imgUrl" width="100%">
				</div>

	      <div v-for="ee in e.questionItems" :key="ee.id" :class="chioce_ == ee.answerKey?'answer-item active':'answer-item'" @click="chioce(ee.answerKey,e.id)">
	        {{ee.answerItem}}
	      </div>

				<div class="answerBtn" @click="nextQuestion">
					下 一 题
				</div>
			</div>

			<div class="total">
	      {{sort}}/{{questionList.length}}
	    </div>
    </div>
	</div>
</template>

<script>
export default {
	  data () {
	    return {
	      msg: 'index',
        userId:'',
        chioce_:'',
        times:0,

				sort:1,
				questionList:[],
				questionId:'',

				answerList:[]

	    }
	  },
	  mounted:function(){
      this.userId = this.$getData("userId");
      setInterval(data=>{
        this.times += 1;
      },1000);
			this.loadData();
	  },
	  methods:{
      chioce(data,questionId){
        this.chioce_ = data;
				this.questionId = questionId;
      },
			loadData(){
				this.$postHttp("questionbank/getAllQuestion",{},res=>{
					this.questionList = res.result;
				})
			},
			nextQuestion(){
				var obj = new Object();
				obj.sort = this.$unbind(this.sort);
				obj.time = this.$unbind(this.times);
				obj.userId = this.userId;
				obj.questionId = this.$unbind(this.questionId);
				obj.userAnswer = this.$unbind(this.chioce_);
				this.answerList.push(obj);
				this.times = 0;
				this.chioce_ = '',
				this.sort += 1;
				console.log(this.answerList);
			}
	  }
}
</script>

<style>
#answer .main{
	padding:0;
}
#answer .main .title{
  width: 100%;
  height: 6em;
  padding:1.5em;
  font-size: 1.5em;
  background: #85c6da;
  color: #fff;
  box-sizing: border-box;
  padding-left:2em;
  margin-bottom: 2em;
}
#answer .main .answer-item{
  width: 80%;
  font-size: 1.5em;
  color: #666;
  background: #fff;
  text-align: center;
  margin: 1em auto;
  line-height: 3.5em;
  box-shadow: 1px 1px 10px #c7c7c7;
  border-radius: 10px;
}
#answer .main .answerBtn{
	width: 90%;
  font-size: 1.5em;
  color: #fff;
  background: #85c6da;
  text-align: center;
  margin: 2em auto;
  line-height: 3.5em;
  border-radius: 5px;
}
#answer .main .answer-item.active{
  color:#fff;
  background: #409EFF;
}
#answer .moblie-body .top{
	width: 100%;
	height: 10em;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99;
}
#answer .main .question{
	width:100%;
	height: calc(100% - 12em);
	overflow: auto;
}
#answer .url_img{
	margin: 1em auto;
	width:96%;
}
#answer .total{
  text-align: center;
  width:100%;
  font-size: 2em;
  color:#888;
  position: absolute;
  bottom:0;
	height: 2em;
	line-height: 2em;
  z-index: 99;
}
</style>
