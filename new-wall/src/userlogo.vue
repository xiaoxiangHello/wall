<template>
  <div class="nav-avatar">
     <router-link v-if="isLogin" :to="{path:'/user', query:{userid:userid}}" class="none-decoration">
       <el-avatar :src=avatarUrl>
       </el-avatar>
     </router-link>
     <router-link v-else to="/login" class="none-decoration">
       <el-avatar :src="require('@/assets/login.png')">
       </el-avatar>
     </router-link>

  </div>

</template>
<script>

export default {
    components: {
    },
    inject:['reload'],
    watch:{
      '$route.path': function (newVal, oldVal) {
        if(newVal !== oldVal){
          this.$router.go(0)
        }
      }
    },
    methods:{

       get_user_logo(){

         var url = "/api/getuser";

         this.$axios({
           method:"GET",
           url:url,
           headers:{
             'Content-Type': 'application/x-www-form-urlencoded',
             'x-token':localStorage.getItem('token')

            },
            withCredentials:false,
          }).then((res) => {

             if(res.data.code != 0){
               this.isLogin = false;



             }else{
               this.isLogin = true;
               this.avatarUrl = global.hostUrl+res.data.info.avatarUrl
               this.userid = res.data.userid


             }


          }).catch((error) => {

          });

       }

    },


    data () {

      if(localStorage['token'] != ''){
          this.get_user_logo();

      }else{
          this.isLogin = false;
      }



        return {
            msg: "",
            avatarUrl:"",
            isLogin:false,
            userid:'',


        }
    }
}
</script>
