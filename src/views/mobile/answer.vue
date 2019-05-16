<template>
	<div id="answer" class="moblie-body" v-loading="loading">

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
			<div class="topText">
	      {{title}}
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

				<div class="textArea" v-if="e.type == '2'">
					<el-input v-model="chioce_" type="textarea" maxlength="300" rows="6" resize="none"></el-input>
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
				timeInt:0,
				done:false,

				sort:1,
				questionList:[],
				questionId:'',

				answerList:[],
				loading:true,

				title:'选择题'

	    }
	  },
	  mounted:function(){
      this.userId = this.$getData("userId");
      this.timeInt = setInterval(data=>{
        this.times += 1;
      },1000);
			this.$postHttpForMb("userscore/getUserScoreById",this.userId,res=>{
				var flag = res.result.userFlag;
				if(flag == '1'){
					this.$router.push("/finish");
				}
				this.loadData();
			})

	  },
	  methods:{
      chioce(data,id){
        this.chioce_ = data;
				this.questionId = id;
      },
			loadData(){
				this.$postHttpForMb("questionbank/getAllQuestion",{},res=>{
					this.questionList = res.result;
					this.loading = false;
				})
			},
			nextQuestion(){
				var len = this.questionList.length;
				if(!this.done){
					var obj = new Object();
					obj.sort = this.$unbind(this.sort);
					obj.time = this.$unbind(this.times);
					obj.userId = this.userId;
					obj.questionId = this.$unbind(this.questionId);
					obj.userAnswer = this.$unbind(this.chioce_);
					this.answerList.push(obj);
				}
				if(len == this.sort){
					// 答题结束
					this.loading = true;
					clearInterval(this.timeInt);
					this.$postHttpForMb("useranswer/saveUserAnswers",this.answerList,res=>{
						if(res.code != '10000'){
							this.$message({message: '网络开小差啦',type: 'error',center: true});
						}else{
							this.$router.push("/finish");
						}
					});
					this.done = true;
				}else{
					this.times = 0;
					this.chioce_ = '',
					this.sort += 1;
				}
				if(this.sort == 7){
					this.title = '简答题'
				}
				if(this.sort == 11){
					this.title = '自我评价'
				}
			}
	  },
		beforeDestroy:function(){
			clearInterval(this.timeInt);
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
  padding: 1em;
  font-size: 2em;
  background: #85c6da;
  color: #fff;
	box-sizing: border-box;
  font-family: 'u5FAEu8F6Fu96C5u9ED1';
  box-sizing: border-box;
  margin-bottom: 2em;
}
#answer .main .answer-item{
  width: 80%;
  font-size: 1.8em;
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
#answer.moblie-body .top{
	width: 100%;
	height: 6em;
	z-index: 99;
}
#answer.moblie-body .topText{
	width: 100%;
	height: 2em;
	line-height: 2em;
	text-align: center;
	color: #7ec7c0;
	font-size: 3em;
	z-index: 99;
}
#answer .main .question{
	width:100%;
	height: calc(100% - 14em);
	overflow: auto;
}
#answer .url_img{
	margin: 1em auto;
	width:96%;
}
#answer .textArea{
	margin: 1em auto;
	width:94%;
}
#answer .textArea .el-textarea__inner{
	font-size: 1.5em!important;
	height: 15em;
}
#answer textarea{
	font:400 1.5em 'u5FAEu8F6Fu96C5u9ED1';
}

#answer .total{
  text-align: center;
  width:100%;
  font-size: 2em;
  color:#888;
  background: #fff;
  bottom:0;
	height: 2em;
	line-height: 2em;
  z-index: 99;
}
</style>
