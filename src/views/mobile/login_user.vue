<template>
	<div id="login_user" class="moblie-body">
		<div class="top" @click.ctrl="backFunction">
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
      <div class="main_items" style="margin-top:9em;">
          <el-input v-model="userName" placeholder="请输入姓名"></el-input>
      </div>
			<div class="main_items">
          <el-input v-model="userAge" placeholder="年龄"></el-input>
      </div>
      <div class="main_items">
          <el-input v-model="userPhone" placeholder="请输入手机号"></el-input>
      </div>
      <div class="main_items">
        <el-button type="primary" @click="userLogin">开始测试</el-button>
      </div>
    </div>
	</div>
</template>

<script>
export default {
	  data () {
	    return {
	      msg: 'index',
        userName:"",
				userPhone:"",
				userAge:''
	    }
	  },
	  mounted:function(){

	  },
	  methods:{
			userLogin(){
				var userNames =/^[\u4e00-\u9fa5]{1,}$/;
				var userPhone =/^1[345789]\d{9}$/;
				var userAge = /^\+?[1-9][0-9]*$/;
		    if(!userNames.test(this.userName)){
					this.$message({message: '姓名必须为中文',type: 'error',center: true});
					return;
		    }
				if(!userAge.test(this.userAge)){
					this.$message({message: '请填写真实年龄',type: 'error',center: true});
					return;
				}
				if(!userPhone.test(this.userPhone)){
					this.$message({message: '请填写正确手机号',type: 'error',center: true});
					return;
				}
				this.$confim_jy('	为了便于您接收面试通知,请确保以上信息真实准确','',data=>{
					this.$postHttpForMb("userscore/getUserScoreByUserPhone",{userName:this.userName,userPhone:this.userPhone,userAge:this.userAge},res=>{
						var flag = res.result.userFlag;
						if(flag == '0'){
							this.$router.push("/answer");
							this.$setData("userId",res.result.id);
						}else{
							this.$router.push("/finish");
							this.$message({message: '您已作答完毕',type: 'success',center: true});
						}
					})
				})
			},
			backFunction(){
				this.$router.push("/login");
			}
	  }
}
</script>

<style>
#login_user .main_items{
  width:90%;
  margin:2em auto;
}
#login_user .el-input__inner{
  height: 3em;
  font-size: 3em;
  padding: 0 1em;
}
#login_user .el-button{
  width: 90%;
  margin: 4em auto;
  display: block;
  line-height: 3em;
  font-size: 2em;
}
#login_user.moblie-body .top{
	width: 90%;
	height: 6em;
	position: absolute;
	top: 5%;
	left: 5%;
	z-index: 99;
}
#login_user.moblie-body .topText{
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
#login_user.moblie-body .bottom{
	width: 90%;
	height: 13em;
	position: absolute;
	bottom: 5%;
	left: 5%;
	z-index: 99;
}
.el-message-box *{
	font-size:1.3em;
}
.el-message-box{
	width:80%;
}
.el-message-box__title{
	height: 1.3em;
}
.el-message-box__message p {
  margin: 0;
  line-height: 1.5em;
	text-indent: 1em;
}
.el-button--small, .el-button--small.is-round {
  padding: 9px 50px;
	line-height: 2em;
}
</style>
