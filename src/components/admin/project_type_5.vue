<template>
  <div style="width: 100%;">
    <div style="width: 100%;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;overflow: hidden;">
        <div v-for="(item, index) in table_data.datas" :key="index"
          style="width: 100%;border:0px green solid;float: left;padding-bottom: 8px;border-radius: 3px;padding-top: 3px;">
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
            <div style="border:0px red solid;float: right;width: 69%;text-align: right;padding-right: 20px;padding-top: 5px;">
              <button style="width: 60px;border: 0px;background-color:cadetblue;border-radius: 5px;cursor: pointer;color: #f1f1f1;" @click="addDiv(item.id)">&nbsp;{{ item.childs}}&nbsp;+</button>
            </div>
          </div>
          <div style="border:0px green solid;padding-left: 20px;padding-top: 10px;padding-right: 20px;background:#f1f1f1;"><div>{{ item.content }}</div></div>
          <div style="border:0px green solid;padding-left: 10px;padding-top: 20px;padding-bottom: 10px;overflow: hidden;background:#f1f1f1;">
            <div style="border:0px green solid;float: left;width: 30%;">{{ item.time }}</div>
            <div style="border:0px red solid;float: right;width: 69%;text-align: right;padding-right: 20px;">
              <button @click="submitReply(item.id)" style="width: 80px;background-color: #f9bc0b;border-radius: 5px;border: 0px;" >回复</button>
            </div>
          </div>

          <div v-if="gload_datas!=null && gload_datas.length>0" >
            <div v-if="gload_datas[0].pid>0 && gload_datas[0].pid===item.id">
              <div v-for="(i,p) in gload_datas" style="border-bottom:1px green solid;border-radius: 5px; padding-bottom: 8px; margin-left: 20px;margin-top: 10px;margin-bottom: 10px;overflow: hidden;background:#f1f1f1;">
                <div style="width: 100%;border:0px green solid;overflow: hidden;">
                  <div style="border:0px green solid;padding-left: 20px;width: 30%;padding-right: 20px;overflow: hidden;float: left;">
                    <div style="float: left;">
                      {{ i.user_name }}
                      <img :src="i.user_avatar" style="width: 28px;height: 28px;"/>
                      {{ i.user_school }} -> {{ i.parent_user_name }}
                      <img :src="i.parent_user_avatar" style="width: 28px;height: 28px;"/>
                      {{ i.parent_user_school }}
                    </div>
                  </div>
                </div>

                <div style="border:0px green solid;padding-left: 20px;margin-top: 5px;padding-right: 20px;width: 100%;">
                  <div>{{ i.content }}</div>
                </div>

                <div style="border:0px green solid;padding-left: 10px;margin-top: 5px;overflow: hidden;width: 100%;">
                  <div style="width: 69%;float: left;overflow: hidden;">{{ i.time }}</div>
                  <div style="width: 30%;float: right;height: 26px;text-align: right;">
                    <button style="width: 60px; color:#FFF;border: 0px;background-color: brown;border-radius: 5px;" @click="remove_discuss(item)">删除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div style="width: 100%;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;padding-top: 3px;font-size: 18px;font-weight: bold;padding-left: 10px;">
          发表评论主题
        </div>
        <div style="width: 100%;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;padding-top: 3px;overflow: hidden;">
          <textarea style="width: 100%;min-height: 150px;"  v-model='form.content'></textarea>
        </div>
        <div style="width: 100%;border:0px green solid;float: left;margin-bottom: 18px;border-radius: 3px;padding-top: 3px;">
          <button class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;width: 150px;" @click="saveDetail()">发表</button>
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
export default {
    props:['pnp'],
    data() {
      return {
        isButtonEnabled:true,
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
        this.getDetail();
    },
    mounted(){},
    methods: {
      getPrepareState(){
        this.loading = true;
        Ajax.get("/prepare/get?id="+this.pnp.id, null).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            if(resp.body.state == 3){
              this.isButtonEnabled = false;
            }
          } 
        })
      },
      // 添加div的方法
      addDiv(pid) {
        let url = '/prepare/reply/page';
        let param = {
          prepare:this.pnp.id,                        //备课ID 必须提交 以下的参数都是可选的
          pid:pid,                                           //研讨ID
          content:"",                                      //研讨内容
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
        Ajax.postJson(url, param).then((resp) => {
          if (resp.ok) {
            if(resp.body.data.length > 0){
              this.gload_datas = resp.body.data
            }
          }
        });
      },
      cancelTpoPage() {
        this.commentDialogVisible = false;
      },
      clearContent() {

      },
      getDetail(){
        let url = '/prepare/reply/page';
        let param = {
          prepare:this.pnp.id,                        //备课ID 必须提交 以下的参数都是可选的
          pid:0,                                           //研讨ID
          content:"",                                      //研讨内容
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
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
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
                  this.commentDialogVisible = false;
                },1000);
            }
        }).catch(ex => {
            this.$Message.error(ex);
        });
      },
      //研讨-点赞
      like_discuss(data) {
        let param={};
        param = {
          id : data.id
        };
        Ajax.post('/prepare/reply/praise', param).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success('点赞成功');
            this.getDetail();
          }else{
            HeyUI.$Message.error(resp.msg);
          }
        });
      },
      //研讨-删除
      remove_discuss(data) {
        if(!this.isButtonEnabled){
          HeyUI.$Message.error('当前备课已结束，不允许本操作！');
          return;
        }

        Utils.confirm(this, '确定删除该记录 ？', (modal) => {
          modal.close();
          let param={};
          param = {
            id : data.id
          };
          Ajax.post('/prepare/reply/delete', param).then((resp) => {
            if (resp.ok) {
              HeyUI.$Message.success('删除成功');
              this.getDetail();
            }else{
              HeyUI.$Message.error(resp.msg);
            }
          });
        });
      },
      submitReply(pid){
        console.log(pid);
        this.pid = pid;
        this.commentDialogVisible = true;
      },
    },
}
</script>