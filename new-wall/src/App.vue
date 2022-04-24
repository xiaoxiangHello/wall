<template>
  <div id="app">

      <div class="header-main">
      <el-row class="header-bg-color">
          <el-col :span="16">
             <div class="nav-header">
                 <router-link to="/content/1"  class="none-decoration">
                      万能墙
                  </router-link>
             </div>
          </el-col>
          <el-col :span="4">
              <div class="nav-edit">
                  <router-link to="/edit" class="none-decoration" v-if="isLogin">
                    <i class="el-icon-edit"></i>
                  </router-link>
              </div>
          </el-col>
          <el-col :span="4" style="float:right;">
               <userlogo ></userlogo>

          </el-col>

      </el-row>
      </div>

      <div style="height:50px;">
      </div>

      <router-view >

      </router-view>


      <el-backtop ></el-backtop>



  </div>
</template>

<script>
import userlogo from './userlogo.vue'
export default {
  name: 'App',
  components: {
     userlogo
  },
  provide(){
    return {
      reload: this.reload,

    }

  },

  data(){
    this.checkjwt();

    return{
         isRouterAlive:true,

      };

  },

  methods:{

     checkjwt(){
       if(localStorage.getItem('token').length == 0){
           this.isLogin = false
       }else{
         this.isLogin = true
       }
     },
     reload(){
       this.isRouterAlive = false
       this.$nextTick(function(){
         this.isRouterAlive = true
       })
     }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
.none-decoration{
  text-decoration:none;
  color:#fff;
}

</style>
