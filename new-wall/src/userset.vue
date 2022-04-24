<template>
  <div>
    <el-row>
       <el-col :span="8">
         <div></div>
       </el-col>

       <el-col :span="16">
       <div style="margin-top:30px;">

           <el-upload
               class="avatar-uploader"
               action="/api/upload"
               :headers="header"
               :show-file-list="false"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload">
               <img v-if="imageUrl" :src="imageUrl" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

            <el-radio-group v-model="gender" style="margin-top:20px;">
               <el-radio-button value="1" label=1>男</el-radio-button>
               <el-radio-button value="2" label=2>女</el-radio-button>
            </el-radio-group>
            <el-input v-model="nickName" placeholder="昵称" style="margin-top:20px;"></el-input>

            <el-input v-model="collage" placeholder="学校" style="margin-top:20px;"></el-input>
            <el-input v-model="summary" placeholder="简介" style="margin-top:20px;"></el-input>
            </div>
            <div>
              <el-button type="primary" v-on:click="submit" style="margin-top:20px;">提交</el-button>
            </div>
        </el-col>

    </el-row>



  </div>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
<script>
export default {
  components: {
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.upimageUrl = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
         this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    submit(){

      var params = {"nickName":this.nickName, "gender":this.gender,
      "collage":this.collage, "summary":this.summary, "avatarUrl":this.upimageUrl};
      var url = "/api/uploadUser";
      this.$axios({
        method:"POST",
        url:url,
        params,
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-token':localStorage.getItem('token')

         },
         withCredentials:false,
       }).then((res) => {
          console.log(res.data);


       }).catch((error) => {

       });

    }
  },
  data () {

        return {
            msg: "",
            imageUrl:"",
            upimageUrl:"",
            nickName:"",
            summary:"",
            collage:"",
            gender:"",
            header:{

              'x-token':localStorage.getItem('token')
            }
        }

  }
}
</script>
