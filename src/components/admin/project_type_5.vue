<template>
  <div style="width: 100%;">
    <div style="width: 100%;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;overflow: hidden;">
        <div v-for="(item, index) in table_data.datas" :key="index"
          style="width: 100%;border:0px green solid;float: left;padding-bottom: 8px;border-radius: 3px;padding-top: 3px;">
          <!-- <div style="border:0px green solid;text-align: center;width: 100%;height: 49%;">
            <img class="icon-x" style="border-radius: 8px;width: 96%;height: 100%;padding: 2px;" :src="item.cover" @error="handleImageError" />
          </div> -->
          <!-- <div style="border:0px green solid;"><p class="dark2-color" style="text-align: center;margin-top: 1px;font-size: 18px;font-family:'微软雅黑';color: #ffffff !important;">{{ item.subject }}</p></div> -->
          <div style="border:0px green solid;padding-left: 10px;font-weight: bold;overflow: hidden;background:#f1f1f1;">
            <div style="border:0px green solid;float: left;width: 30%;font-weight: bold;">
              <div v-if="item.pid ===0">
                <img :src="item.user_avatar" style="width: 28px;height: 28px;"/>
                {{ item.user_name }} - {{ item.user_school===null?"学校":item.user_school }} 
              </div>
              <div v-else>
                <img :src="item.user_avatar" style="width: 28px;height: 28px;"/>
                {{ item.user_name }} - {{ item.user_school===null?"学校":item.user_school }} -> {{ item.parent_user_name }} - {{ item.parent_user_school===null?"学校":item.parent_user_school }} 
              </div>
            </div>
            <div style="border:0px red solid;float: right;width: 69%;text-align: right;padding-right: 20px;">
              <button @click="addDiv(item.id)">&nbsp;{{ item.childs}}&nbsp;>></button>
            </div>
          </div>
          <div style="border:0px green solid;padding-left: 20px;padding-top: 10px;padding-right: 20px;background:#f1f1f1;"><div>{{ item.content }}</div></div>
          <div style="border:0px green solid;padding-left: 10px;padding-top: 20px;padding-bottom: 10px;overflow: hidden;background:#f1f1f1;">
            <div style="border:0px green solid;float: left;width: 30%;">{{ item.time }}</div>
            <div style="border:0px red solid;float: right;width: 69%;text-align: right;padding-right: 20px;">
              <button @click="submitLike">点赞</button>
              <button @click="submitReply(item.id)">回复</button>
              <button @click="submitDel(item.id)">删除</button>
            </div>
          </div>

<!-- 
          <div v-for="c of table_data.datas" :key="c.id">
            <div v-if="c.childs > 0">
11111111111

            </div>
            <div v-else>
22222222222222
            </div>
          </div> -->



          <div v-if="gload_datas!=null && gload_datas.length>0" >
            <div v-if="gload_datas[0].pid>0 && gload_datas[0].pid===item.id">
              <div v-for="(i,p) in gload_datas" style="border-bottom:1px green solid;border-radius: 5px; padding-bottom: 8px; margin-left: 20px;margin-top: 10px;margin-bottom: 10px;overflow: hidden;background:#f1f1f1;">
                <!--  -->
                <div style="width: 100%;border:0px green solid;overflow: hidden;">
                  <div style="border:0px green solid;padding-left: 20px;width: 30%;padding-right: 20px;overflow: hidden;float: left;">
                    <div style="float: left;">{{ i.user_name }}<img :src="i.user_avatar" style="width: 28px;height: 28px;"/>{{ i.user_school }} -> {{ i.parent_user_name }}<img :src="i.parent_user_avatar" style="width: 28px;height: 28px;"/>{{ i.parent_user_school }}</div>
                  </div>

                  <div style="border:0px red solid;float: right;width: 69%;text-align: right;padding-right: 20px;overflow: hidden;">
                    <button @click="addDiv(i.id)">&nbsp;{{ i.childs}}&nbsp;>></button>
                  </div>
                </div>

                <div style="border:0px green solid;padding-left: 20px;margin-top: 5px;padding-right: 20px;width: 100%;">
                  <div>{{ i.content }}</div>
                </div>

                <div style="border:0px green solid;padding-left: 10px;margin-top: 5px;overflow: hidden;width: 100%;">
                  <div style="border:0px green solid;float: left;width: 30%;">{{ i.time }}</div>
                  <div style="border:0px red solid;float: right;width: 69%;text-align: right;padding-right: 20px;">
                    <button @click="submitLike">点赞</button>
                    <button @click="submitReply(i.id)">回复</button>
                    <button @click="submitDel">删除</button>
                  </div>
                </div>
                <!--  -->
              </div>
            </div>
          </div>
          
        </div>
        <div style="width: 100%;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;padding-top: 3px;font-size: 18px;font-weight: bold;padding-left: 10px;">
          发表回复
        </div>
        <div style="width: 100%;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;padding-top: 3px;overflow: hidden;">
          <textarea style="width: 100%;min-height: 150px;"  v-model='form.content'></textarea>
        </div>
        <div style="width: 100%;border:0px green solid;float: left;margin-bottom: 18px;border-radius: 3px;padding-top: 3px;">
          <button class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;width: 150px;" @click="saveDetail()">发表评论</button>
        </div>
    </div>
    <Modal v-model='commentDialogVisible' v-bind="params">
        <div  style="width: 500px;overflow: hidden;">
          <textarea style="width: 100%;min-height: 150px;"  v-model='form.content'></textarea>
          <div slot="footer" class="dialog-footer" style="float: right;margin-top: 10px;">
            <button class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;color:#000;width: 150px;" @click="cancelTpoPage()">取消</button>
            <button class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;width: 150px;" @click="saveDetail()">发表</button>
          </div>
        </div>
    </Modal>
  </div>
</template>
<script>
import axios from 'axios';
export default {
    props:['pnp'],
    data() {
      return {
        if_childs:0,
        form:{
          content:"",
        },
        table_data: {
          pagination: {
            page: 1,
            size: 6,
            total: 0
          },
          datas: []
        },
        gload_datas: [],
        loading : true,
        editId:0,
        commentDialogVisible:false,
        params:{
          middle: true,//垂直居中
          closeOnMask: false,
        },
        pid:0,

      };
    },
    created() {
        console.log("参数：");
        console.log(this.pnp);
        this.getDetail();
    },
    mounted(){

    },
    methods: {
        // 添加div的方法
        addDiv(pid) {
          console.log(pid);
          let url = '/prepare/reply/page';
          let param = {
            prepare:this.pnp.id,                        //备课ID 必须提交 以下的参数都是可选的
            pid:pid,                                           //研讨ID
            content:"",                                      //研讨内容
            //"user":75,                                         //发表研讨内容的用户ID
            user_name:"",                                    //发表研讨内容的用户姓名
            min_praise:-1,                                   //被点赞的最小数量
            max_praise:100,                                  //被点赞的最大数量
            min_words:0,                                     //研讨内容的最少字数
            max_words:100,                                   //研讨内容的最多字数
            min_time:"",                           //参与研讨的最早日期
            max_time:"",                           //参与研讨的最晚日期
            size:0,                                          //分页尺寸
            page:0                                           //分页页码
          };
          console.log(param);
          // this.loading = true;
          Ajax.postJson(url, param).then((resp) => {
            console.log(resp)
            // this.loading = false;
            if (resp.ok) {
              //let data_info = this.table_data.datas;
              if(resp.body.data.length > 0){
                this.gload_datas = resp.body.data
                  // for(let i=0;i<resp.body.data.length;i++){
                  //   for(let p=0;p<this.table_data.datas.length;p++){
                  //     if(this.table_data.datas[p].id == resp.body.data[i]){

                  //     }
                  //   }
                  //   this.table_data.datas.push(resp.body.data[i]);
                  // }
              }
            }
          });
          //this.table_data.datas.sort()
          //console.log(this.table_data.datas);
          // 生成新的div对象，这里简单起见只包含text属性
          // const newDiv = { text: `Div ${this.table_data.datas.length + 1}` };
          // 将新div添加到divs数组中
          // this.table_data.datas.push(newDiv);
        },




        cancelTpoPage() {
          this.commentDialogVisible = false;
        },
        clearContent() {


        },
        // filteredList() {
        //     this.loading = true;
        //     let url = '/prepare/get/project?id='+ this.lessonPreparationId +'&pid=0&prg=' + this.selected;
        //     Ajax.get(url, null).then((resp) => {
        //         this.loading = false;
        //         if (resp.ok) {
                    
        //         } 
        //     })
        // },
        getDetail(){
          let url = '/prepare/reply/page';
          let param = {
            prepare:this.pnp.id,                        //备课ID 必须提交 以下的参数都是可选的
            pid:0,                                           //研讨ID
            content:"",                                      //研讨内容
            //"user":75,                                         //发表研讨内容的用户ID
            user_name:"",                                    //发表研讨内容的用户姓名
            min_praise:-1,                                   //被点赞的最小数量
            max_praise:100,                                  //被点赞的最大数量
            min_words:0,                                     //研讨内容的最少字数
            max_words:100,                                   //研讨内容的最多字数
            min_time:"",                           //参与研讨的最早日期
            max_time:"",                           //参与研讨的最晚日期
            size:0,                                          //分页尺寸
            page:0                                           //分页页码
          };
          console.log(param);
          this.loading = true;
          Ajax.postJson(url, param).then((resp) => {
            console.log(resp)
            this.loading = false;
            if (resp.ok) {
              let idx = this.table_data.pagination.page - 1;
              let list = resp.body.data.slice(idx * 8, (idx + 1) * 8);
              this.table_data.datas = list;
            }
          });
        },
        saveDetail(){
            let param = {
              id:this.editId,                                         //备课研讨ID 新增时为0 编辑时为编辑的研讨ID 必须提交
              pid:this.pid,                                                  //上级备课研讨ID 可选参数 默认0 表示顶级研讨
              content:this.form.content,                              //备课研讨内容 必须提交 html内容需要编码
              praise:0,                                               //点赞数量 可选参数 默认0
              share:0,                                                //分享数量 可选参数 默认0
              favorite:0,                                             //收藏数量 可选参数 默认0
              reply:0,                                                //研讨数量 可选参数 默认0
              prepare:this.pnp.id                                     //备课ID id=0 或者 pid=0时必须提交 pid>0为可选参数
            };
            if(this.form.content == ""){
                this.$Message.error("内容不允许为空！");
                return;
            }
            Ajax.postJson("/prepare/reply/save", param).then((resp) => {
                if (resp.ok) {
                    HeyUI.$Message.success("保存成功！");
                    this.getDetail();
                    setTimeout(()=>{
                      this.addDiv(this.pid)
                      this.form.content = "";
                      this.pid = 0;
                    },1000);
                }
            }).catch(ex => {
                this.$Message.error(ex);
            });
        },
        submitLike(){

        },
        submitReply(pid){
          console.log(pid);
          this.pid = pid;
          this.commentDialogVisible = true;
        },
        submitDel(id){
          Utils.confirm(this, '确定删除该记录 ？', (modal) => {
            modal.close();
            // Ajax.postJson('/prepare/reply/delete', "id="+id).then((resp) => {
            //   if (resp.ok) {
            //     HeyUI.$Message.success('删除成功');
            //     this.getDetail();
            //   }else{
            //     HeyUI.$Message.error(resp.msg);
            //   }
            // });
            const formData = new FormData();
            formData.append('id', id);

            axios({
              url:'http://192.168.110.127/api/prepare/reply/delete',
                method:'post',
                formData,
                headers:{
                  'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
              if(res.status){
                this.$message.success(123)
              }else{
                this.$message.success(456)
              }
            })
          });
        },





    },

}
</script>

<style lang='less' scoped>

</style>  