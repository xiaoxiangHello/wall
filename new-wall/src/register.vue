<template>
  <div>
    <h2 style="color:gray;margin-left:5px;">注册</h2>
    <el-divider style="margin-top:0px;padding:0px;"></el-divider>
    <el-input v-model="input_user" placeholder="用户名(手机号)"></el-input>
    <el-input v-model="input_pass" placeholder="密码" style="margin-top:20px;" type="password"></el-input>

    <el-button style="margin-top:25px;" @click="register" type="submit">提交</el-button>

    <div style="margin-top:40px;margin-left:3px;">
      <router-link to="/login" class="n-decoration"><span>登录</span></router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link to="" class="n-decoration"><span>忘记密码</span></router-link>
    </div>

  </div>
</template>
<style>
.n-decoration{
  text-decoration:none;
  color:gray;
}
</style>
<script>
    export default {
      methods:{

        register(){
          var url = "/api/register";
          var params = {"username":this.input_user, "pass":this.input_pass}
          var that = this
          this.$axios({
            timeout: 30000,
            method:"POST",
            url:url,
            headers:{
              'Content-Type':'application/x-www-form-urlencoded',
            },
            withCredentials:false,
            params,
          }).then(function(res){

            console.log(res.data);
            if(res.data.code == 0){
              var jwt = res.data.jwt
              localStorage.setItem('token', jwt);
              that.$router.replace('/userset');
            }
          })
        }
      },
        data(){
          return{
            input_user:'',
            input_pass:'',
          }
        }
    }
</script>
