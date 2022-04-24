<template>
    <div>
         <div style="text-align:center;margin-top:30px;">
             <el-avatar :size="100" :src=avatarUrl></el-avatar>


             <p><b>{{nickName}}</b></p>
             <p>{{summary}}</p>
             <el-button size="small" v-on:click="logout" v-if="is_self">退出登录</el-button>
         </div>

         <el-divider style="margin-top:0px;padding:0px;"></el-divider>

         <h3 style="color:gray;margin-left:10px;">历史发布</h3>

         <el-row>
           <div class="box" v-for="(item, i) in data">
             <el-row>
               <el-col :span="24">
                  <p class="box-content">
                     {{item.title}}
                  </p>

                  <el-image
                    v-if=item.hasImg
                    v-loading="loading"
                    v-bind:src=item.imgs[0]
                    :preview-src-list=[item.imgs[0]]
                    style="margin-top:0;width:60%;margin-left:10px;"
                   >
                   </el-image>
                </el-col>

                <el-col :span="24">
                   <p class="box-time">{{item.create_time}}</p>
                </el-col>
             </el-row>
           </div>
         </el-row>
    </div>
</template>
<style>
.box{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
.box-avatar{
  margin-left:10px;
  margin-top:10px;
}
.box-username{
  font-size:12px;
}
.box-userlocal{
  font-size:6px;line-height:5px;
}
.box-content{
  padding:8px;
  font-size:15px;
  line-height:25px;
  margin-top:0px;
  margin-bottom: 0px;
}
.box-time{
  margin-top:10px;
  font-size:8px;
  margin-left:12px;
  color:gray;
}
</style>
<script>
    import abc from './content.vue'
    export default {
        components: {
            abc,
        },
        methods:{
          setData(){
              this.$emit("userid", this.$route.query.userid)
          },

          logout(){
            localStorage.setItem('token', '');
            this.$router.replace('/content/1');
          },

          get_user_list(token){

            var url = "/api/getuserlist"
            var userid = this.$route.query.userid

            this.$axios({
              method:"GET",
              url:url,
              params:{'userid':userid, 'pageNum':1},
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-token':token
              },
              withCredentials:false,
            }).then((res)=>{

              if(res.data.code == 0){
                  this.data = res.data.data
                  console.log(res.data)
                  this.loading = false
              }else{

              }
            }).catch((error)=>{

            })
          },

          get_user_info(token){
            var url = "/api/getuser"
            var userid = this.$route.query.userid
            console.log("userid:"+userid)
            this.$axios({
              method:"GET",
              url:url,
              params:{'userid':userid},
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-token':token
               },
               withCredentials:false,
             }).then((res) => {
                this.nickName = res.data.info.nickName
                this.summary = res.data.info.summary
                this.collage = res.data.info.collage
                this.avatarUrl = global.hostUrl+res.data.info.avatarUrl
                if(res.data.origin_userid == res.data.userid){
                    this.is_self = true
                }
             }).catch((error) => {

             });

          }
        },
        data () {

            var token = localStorage.getItem('token')
            if(token != null){
              this.get_user_info(token)
              this.get_user_list(token)
            }
            return {
                msg: "",
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                getlist_data:{pageNum:"1",user_id:this.$route.query.userid},
                nickName:"",
                collage:"",
                summary:"",
                avatarUrl:"",
                is_self:false,
                data:[],
                loading:true,

            }
        }
    }
</script>
