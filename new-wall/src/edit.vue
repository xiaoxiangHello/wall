<template>
    <div>
      <h2 style="color:gray;margin-bottom:0px;padding:0px;">写一些上墙</h2>
      <el-divider style="margin-top:0px;padding:0px;"></el-divider>
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
      <el-input
         type="textarea"
         :rows="6"
         placeholder="写点什么"
         v-model="textarea"
         style="margin-top:20px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
      >
      </el-input>

     <el-radio @click.native.prevent="clickitem(1)" v-model="isnomous" :label=1 border style="margin-top:20px;">匿名</el-radio>
     <el-select v-model="value" filterable clearable placeholder="请选择">
       <el-option
         v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value">
       </el-option>
     </el-select>

      <div style="height:50px;"></div>
      <el-button type="primary" @click="submit" size="medium" style="width:100px;">提交</el-button>

    </div>

</template>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top:20px;
  margin-bottom:20px;
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
        methods:{
          handleAvatarSuccess(res, file) {
            this.upimageUrl = res.data;
            console.log(this.upimageUrl);
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
               this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
          },
          clickitem(e){
            e === this.isnomous ? this.isnomous = 0 : this.isnomous = e
          },
          submit(){

            var params = {'text':this.textarea, 'isnomous':this.isnomous,
            'type':this.value, 'imgs':this.upimageUrl};
            var url = "/api/publish";
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
                if(res.data.code == 0){
                   this.$notify({
                     title:'发布成功',
                     message:'你的状态已上墙',
                     type:'success'
                   });
                }

             }).catch((error) => {

             });

          }
        },
        data () {
            return {
                textarea:"",
                imageUrl:"",
                upimageUrl:"",
                header:{

                  'x-token':localStorage.getItem('token')
                },
                isnomous:0,
                options:[

                  {
                    value:1,
                    label:'交友'
                  },
                  {
                    value:2,
                    label:'好物'
                  },
                  {
                    value:3,
                    label:'心情'
                  }
                ],
                value:''
            }
        }
    }
</script>
