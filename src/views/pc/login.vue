<template >
<div id="login">
  <div class="mainLogin clearfix">
		<div class="fl loginInput">
			<div class="title ac">
				查看奏折
			</div>
			<div class="loginBody ">
				<form id="loginForm" >
					<div class="clearfix">
						<div class="loginItems fl">
							<input v-model="user.userName" type="text" placeholder="请输入用户名"/>
							<div class="error"></div>
						</div>
						<div class="loginItems fl">
							<input v-model="user.passwrod" type="password" placeholder="请输入密码"/>
							<div class="error"></div>
						</div>
					</div>

					<div class="loginButton" @click="login_in">
						上朝
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="bottomImg ">
		<div class="imgCenter clearfix">
			<div class="imgItems fl ac">
				<img src="static/img/pc/floor/floor1.png" style="width:100%">
			</div>
			<div class="imgItems fl ac">
				<img src="static/img/pc/floor/floor2.png" style="width:100%">
			</div>
			<div class="imgItems fl ac">
				<img src="static/img/pc/floor/floor3.png" style="width:100%">
			</div>
			<div class="imgItems fl ac">
				<img src="static/img/pc/floor/floor4.png" style="width:100%">
			</div>
			<div class="imgItems fl ac">
				<img src="static/img/pc/floor/floor5.png" style="width:100%">
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
  data(){
    return{
      user:{}
    }
  },
  methods:{
    login_in(){
      if('' == this.user.userName){
        this.$notify_error("请输入用户名");
        return;
      }
      if('' == this.user.passwrod){
        this.$notify_error("请输入密码");
        return;
      }
      this.$postHttp("login/loginIn",this.user,res=>{
        if(res.code == '10000'){
          this.$router.push("scroeList");
        }else{
          this.$notify_error(res.message);
        }
      })
    }
  }
}
</script>

<style >
#login{width:100%;height: 100%;background:#fcc;display:flex}
.mainLogin{
	width:500px;
    height: 400px;
    margin: auto;
    background: #fff;
    border-radius: 4px;
}
.loginInput{width: 430px;height: 400px;padding:10px 35px;}
.loginInput .title{padding:10px 0;border-bottom:1px solid #FF5985;font-size: 28px;color:#FF5985;}
.loginBody{width:410px;margin-left:10px}
.loginBootm{margin-top:30px;}
.loginBootm .r{cursor:pointer;color:#5B5B5B;}
.loginButton{width:100%;height: 60px;line-height:60px;background: #FF5985;color:#fff;border-radius: 4px;
cursor: pointer;text-align: center;font-size: 20px;margin-top:40px;}

.loginItems{width:100%;height:60px;margin-top:30px;position:relative;}
.loginItems input{
	width:95%;
	border:1px #dedede solid;
	height:58px;
	line-height:58px;
	font-size:18px;
	color:#525252;
	padding-left:5%;
}
.loginItems .error{
	font-size:12px;
	position:absolute;
	left:5px;
	bottom:-15px;
	height:12px;
	line-height:12px;
	color:#f40;
}
.inputRadio{
	margin-left:5px;
	padding-top: 9px;
}

.bottomImg{
    width: 100%;
    position: absolute;
    bottom:0px;
    left:0px;
}
.bottomImg .imgCenter{
	width:1200px;
	margin:auto;
  display: flex;
}
.bottomImg .imgCenter .imgItems{
	width: 10%;
    margin: 0px 5%;
}

</style>
