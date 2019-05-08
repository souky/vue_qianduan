<template>
	<div id="login_user" class="moblie-body">
		<div class="top">
      <img src="static/img/moblie/top.png" style="width:100%;height:100%">
    </div>
    <div class="bottom">
      <img src="static/img/moblie/bottom.png" style="width:100%;height:100%">
    </div>
		<div class="background">
      <img src="static/img/moblie/background.jpg" style="width:100%;height:100%">
    </div>
    <div class="main">
      <div class="main_items" style="margin-top:14em;">
          <el-input v-model="userName" placeholder="请输入姓名"></el-input>
      </div>
      <div class="main_items">
          <el-input v-model="userPhone" placeholder="请输入手机号"></el-input>
      </div>
      <div class="main_items">
        <el-button type="primary" @click="userLogin">登陆</el-button>
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
				userPhone:""
	    }
	  },
	  mounted:function(){

	  },
	  methods:{
			userLogin(){
				if(this.userName == ''){
					this.$message({message: '请填写用户名',type: 'error',center: true});
					return;
				}
				if(this.userPhone == ''){
					this.$message({message: '请填写手机号',type: 'error',center: true});
					return;
				}
				this.$postHttpForMb("userscore/getUserScoreByUserPhone",{userName:this.userName,userPhone:this.userPhone},res=>{
					var flag = res.result.userFlag;
					if(flag == '0'){
						this.$router.push("answer");
						this.$setData("user",res.result);
					}else{
							this.$message({message: '您已作答完毕',type: 'success',center: true});
					}
				})
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

</style>
