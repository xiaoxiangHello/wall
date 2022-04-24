<template>
  <div>
    <h2 style="color:gray;margin-left:5px;">登录</h2>
    <el-divider style="margin-top:0px;"></el-divider>
    <el-input v-model="input_user" placeholder="用户名(手机号)"></el-input>
    <el-input v-model="input_pass" placeholder="密码" style="margin-top:20px;" type="password"></el-input>

    <el-button style="margin-top:25px;" @click="login">提交</el-button>

    <div style="margin-top:40px;margin-left:3px;">
      <router-link to="/register" class="n-decoration"><span >注册</span></router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link to="" class="n-decoration"><span>忘记密码</span></router-link>
    </div>

  </div>
</template>
<style>
.n-decoration{
  text-decoration:none;color:gray;
}
</style>
<script>
    export default {
      methods:{
        login(){
          var url = "/api/login";
          var params = {"username":this.input_user, "pass":this.input_pass};
          this.$axios({
            method:"POST",
            url:url,
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params,
            withCredentials:false,
          }).then((res) => {

            if(res.data.code == 0){
              var jwt = res.data.jwt;
              localStorage.clear();
              localStorage.setItem('token', jwt);
              this.$router.replace('/');

            }

          }).catch((error) => {

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
