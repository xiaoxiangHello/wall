<template>
<el-row >

  <div class="box" v-for="(item, i) in data">
    <el-row >
       <el-col :span="4">
         <div v-if="item.isnomous=='0'">
            <router-link :to="{ path:'/user', query:{userid:item.userid}}" >
               <el-avatar class="box-avatar" v-bind:src="item.avatarUrl">

               </el-avatar>
            </router-link>
         </div>
         <div v-else>
            <el-avatar class="box-avatar" v-bind:src="item.avatarUrl">

            </el-avatar>
         </div>

       </el-col>
       <el-col :span="20" >
           <p class="box-username">{{item.nickName}}</p>
           <p class="box-userlocal">{{item.collage}}</p>
       </el-col>
    </el-row>

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
</template>
<style>
.header-main{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 1;

}
.nav-header{
  text-align:left;
  margin-left:10px;
  font-size:18px;
  font-weight:bold;
  z-index: 1;
  top:0;
}
.nav-edit{
  text-align:center;
  font-size:25px;
  line-height:50px;
}
.nav-avatar{
  text-align:center;
  margin-top:4px;
}
.header-bg-color{
  background-color: #66b1ff;
  height: 50px;
  line-height: 50px;
  color:#fff;
}
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

    export default {
        props:{
            listdata:Object,
            userid:''
        },
        methods:{
           inffor(donw){
               this.page ++;
               console.log(this.listdata)
               his.$axios({
                 method:"GET",
                 url:url,
                 params:this.listdata,
                 headers:{
                   'Content-Type': 'application/x-www-form-urlencoded',
                   'x-token':localStorage.getItem('token')

                  },
                  withCredentials:false,
                }).then((res) => {

                   if(res.data.code == 0){

                      this.data = res.data.data;
                      this.loading = false;

                   }else{
                      this.data = [];

                   }


                }).catch((error) => {

                });
           },
           get_list(){
             var router_data = this.$route.params;
             var params = {}
             if(Object.keys(router_data).length != 0){
                params = router_data
             }else{
                params = this.listdata
             }

             console.log(params)
             var url = "/api/getlist";

             this.$axios({
               method:"GET",
               url:url,
               params:params,
               headers:{
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'x-token':localStorage.getItem('token')

                },
                withCredentials:false,
              }).then((res) => {

                 if(res.data.code == 0){

                    this.data = res.data.data;
                    this.loading = false;

                 }else{
                    this.data = [];

                 }


              }).catch((error) => {

              });
           }
        },
        data () {

            this.get_list()

            return {
              input:'',
              counts:10,
              srcList:[
                'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              ],
              data:[],
              loading:true,
              page:1

            }
        }
    }
</script>
