<style lang="less">
@menu-prefix: ~"@{prefix}menu";
.menu-custom {
//   background: @white-color;
  background: #d9f1e9;
  border-radius:5px;
  margin-bottom:5px;
  .@{menu-prefix} {
    &-show {
      translate: font-size, color .3s;
      &:hover {
        // background: @yellow-color;
        font-size: 16px;
        color: @yellow-color;
      }
    }
    &-li {
      &-selected {
        font-size: 16px;
        font-weight: bold;
        // background: @yellow-color;
        color: @yellow-color;
      }
    }
  }
}
.richTextEditor{
    height:150px;
}
.rich-text-editor-vue{
    //height:200px !important;
    width: 98%;
    margin-left: 10px;
    border:0px red solid;
    margin-bottom:4px;
    margin-top:4px;
    background-color:#FFF;
}
</style>
    <template>
        <div class="app-container" style="border: 0px red solid;margin-top: 20px;">
            <!-- <Tabs :datas="this.form_param.datas" class-name="h-tabs-card" v-model="selected" @change="change"></Tabs> -->
            <div style="margin-bottom: 8px;">
                <div style="height:180px;border: 0px red solid;width: 27.5%;float: left;overflow: hidden;">
                    <img :src="prepare_detail.cover" style="width: 100%;height: 100%;border-radius: 5px;"/>
                </div>
                <div style="border: 0px red solid;width: 72%;float:right;overflow: hidden;">
                    <div style="overflow: hidden;border: 0px red solid;line-height: 36px;margin-bottom: 8px;">
                        <div style="float: left;border: 0px red solid;font-size: 24px;color: darkgreen;font-weight: bold;">{{ prepare_detail.subject }}</div>
                        <div style="float: left;padding: 0px 5px 0px 5px; border: 0px red solid;margin-left: 8px;font-size: 20px;background-color:khaki;color: darkgreen;border-radius: 5px;">{{ prepare_detail.state_title }}</div>
                        <div style="float: left;border: 0px red solid;margin-left: 8px;height: 36px;">
                            <img src="../../images/share.png" style="width: 36px;height: 36px;border-radius: 5px;cursor: pointer;" @click="submitShare" />
                            <img src="../../images/collection.png" style="width: 36px;height: 36px;border-radius: 5px;cursor: pointer;" @click="submitCollection"/>
                            <img src="../../images/like.png" style="width: 36px;height: 36px;border-radius: 5px;cursor: pointer;" @click="submitGive"/>
                        </div>
                    </div>

                    <div style="border: 0px red solid;overflow: hidden;">
                        <div style="line-height: 30px; height: 30px; padding-left: 8px; width: 45%; border: 0px red solid;font-size: 18px;background-color:#d9f1e9;border-radius: 5px;overflow: hidden;margin-bottom: 8px;float: left;">
                            {{ prepare_detail.stage_title }}&nbsp;|&nbsp;{{ prepare_detail.grade_title }}&nbsp;|&nbsp;{{ prepare_detail.textbook_version_title }}
                        </div>
                        <div style="padding-left: 8px; width: 30%; border: 0px red solid;font-size: 18px;border-radius: 5px;overflow: hidden;margin-bottom: 8px;float: right;">
                            <Button id="btuEndPrepare" transparent text-color="green" style="float: right;width: 100px;" @click="submitEndPrepare">结束备课</Button>
                        </div>
                    </div>

                    <div style="border: 0px red solid;overflow: hidden;">
                        <div style="border: 0px red solid;width:40%;float: left;overflow: hidden;line-height: 30px;padding-left:10px;">
                            <div style="height:30px;border: 0px green solid;width:100%;float: left;">
                                主备：{{ prepare_detail.teacher_name }}
                            </div>
                            <div style="height:30px;border: 0px green solid;width:100%;float: left;">
                                协备：{{ prepare_detail.teachers_string }}&nbsp;（&nbsp;{{ prepare_detail.teachers_count }}&nbsp;）
                            </div>
                            <div style="height:30px;border: 0px green solid;width:100%;float: left;">
                                时间：{{ prepare_detail.time }}
                            </div>
                        </div>
                        <div style="border: 0px red solid;width:40%;float: left;overflow: hidden;">
                            <div style="height:30px;border: 0px green solid;width:100%;float: left;line-height: 30px;">
                                简介：{{ prepare_detail.introduction }}
                            </div>
                            <div style="height:60px;border: 0px green solid;width:100%;float: left;">   

                            </div>
                        </div>
                        <div style="border: 0px red solid;width:20%;float: left;overflow: hidden;">
                            <div style="border: 0px red solid;width:100%;float: right;overflow: hidden;text-align: right;">
                                <!-- <qrcode :value="qrValue" :options="{ width: 100 ,height:100}"></qrcode> -->
                                <div ref="canvasWrapper"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SwitchList v-model="selected" :datas="this.form_param.project" @change="change" style="padding-bottom: 8px;"></SwitchList>
            <div v-for="(item, index) in current_data" >
                <div v-if="item.type === 1 || item.type === 2 || item.type === 3 ">
                    <div style="border: 0px red solid; width: 100%;overflow: hidden;">
                        <div style="border: 0px red solid; width: 19%;float: left;">
                            <Menu :datas="left_data" className="menu-custom"></Menu>
                        </div>
                        <div style="width: 80%;float: right;background: #d9f1e9;border-radius: 5px;overflow: hidden;">
                             
                            <div v-if="item.children != null">
                                <div v-for="(items, index) in item.children" style="border: 0px solid red;">
                                    <div v-if="item.children[index].children != null && item.children[index].children.length>0"> 
                                        <div v-for="(itemss, indexx) in item.children[index].children" style="border: 0px solid red;">
                                            <div v-if="itemss.type === 1" >
                                                <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{itemss.title}}</label>
                                                <project_type_1 :pnp="itemss"/>
                                            </div>
                                            <div v-else-if="itemss.type === 2">
                                                <!-- 不确定1-2 -->
                                                <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{itemss.title}}</label>
                                                <project_type_2 :pnp="itemss" :proj="selected"/>
                                            </div>
                                            <div v-else-if="itemss.type === 3">
                                                <!-- 不确定1-3 -->
                                                <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{itemss.title}}</label>
                                                <project_type_3 :pnp="itemss" :proj="selected"/>
                                            </div>
                                        </div>
                                    </div>
                                     <div v-else>
                                        <div v-if="item.children[index].type === 1" style="margin-bottom: 10px;">
                                            <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.children[index].title}}</label>
                                            <project_type_1 :pnp="item.children[index]"/>
                                        </div>
                                        <div v-else-if="item.children[index].type === 2" style="margin-bottom: 10px;">
                                            <!-- 不确定2-2 -->
                                            <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.children[index].title}}</label>
                                            <project_type_2 :pnp="item.children[index]" :proj="selected"/>
                                        </div>
                                        <div v-else-if="item.children[index].type === 3" style="margin-bottom: 10px;">
                                            <!-- 不确定2-3 -->
                                            <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.children[index].title}}</label>
                                            <project_type_3 :pnp="item.children[index]" :proj="selected"/>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="item.type === 1">
                                    <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.title}}</label>
                                    <!-- 不确定3-1 -->
                                    <project_type_1 :pnp="item"/>
                                </div>
                                <div v-else-if="item.type === 2">
                                    <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.title}}</label>
                                    <project_type_2 :pnp="item" :proj="selected"/>
                                </div>
                                <div v-else-if="item.type === 3">
                                    <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.title}}</label>
                                    <project_type_3 :pnp="item" :proj="selected"/>
                                </div>
                            </div> 

                        </div>
                    </div>
                </div>
                <div v-else-if="item.type === 4">
                    <div style="border: 0px red solid; width: 100%;overflow: hidden;">
                        <project_type_4 :pnp="item" :proj="selected"/>
                    </div>
                </div>
                <div v-else-if="item.type === 5">
                    <div style="border: 0px red solid; width: 100%;overflow: hidden;">
                        <project_type_5 :pnp="item" :proj="selected"/>
                    </div>
                </div>
                <div v-else-if="item.type === 6">
                    <div style="border: 0px red solid; width: 100%;overflow: hidden;">
                        <project_type_6 :pnp="item" :proj="selected"/>
                    </div>
                </div>
                <div v-else-if="item.type === 7">
                    <div style="border: 0px red solid; width: 100%;overflow: hidden;">
                        <project_type_7 :pnp="item" :proj="selected"/>
                    </div>
                </div>
                <div v-else-if="item.type === 8">
                    <div style="border: 0px red solid; width: 100%;overflow: hidden;">
                        <project_type_8 :pnp="item" :proj="selected"/>
                    </div>
                </div>
            </div>

        </div>
    </template>
    <script>
    import project_type_1 from './project_type_1';
    import project_type_2 from './project_type_2';
    import project_type_3 from './project_type_3';
    import project_type_4 from './project_type_4';
    import project_type_5 from './project_type_5';
    import project_type_6 from './project_type_6';
    import project_type_7 from './project_type_7';
    import project_type_8 from './project_type_8';
    import QRCode from 'qrcode'
    export default {
        components: {
            project_type_1,
            project_type_2,
            project_type_3,
            project_type_4,
            project_type_5,
            project_type_6,
            project_type_7,
            project_type_8,
        },
        name: "template_project_details",
        props: ['lessonPreparationId'],
        data() {
            return {
                qrValue: 'https://www.example.com',
                left_data:[],
                loading: false,
                selected: 0,
                project_type:[],
                form_param: {
                    raw_data:[],
                    project:{}
                },
                targetArray:[6,7,8],
                current_data:[],
                inputs: [
                    { 
                        value: '' // 初始输入框
                    } 
                ],
                prepare_detail:{
                    type: 0,
                    subject: "0",
                    team_type: 0,
                    stage: 0,
                    grade: 0,
                    term: 0,
                    course: null,
                    textbook_version: 0,
                    teacher: 0,
                    cover: "",
                    template: 0,
                    state: 0,
                    introduction: null,
                    praise: 0,
                    share: 0,
                    favorite: 0,
                    reply: 0,
                    see: 0,
                    time: "",
                    finish_time: null,
                    type_title: "",
                    team_type_title: null,
                    stage_title: "",
                    grade_title: "",
                    term_title: "",
                    textbook_version_title: "",
                    teacher_name: "",
                    school_name: null,
                    template_title: "",
                    state_title: "",
                    ip: null,
                    assists: 0,
                    teachers: [],
                    teachers_string:"",
                    teachers_count:0,

                },
                //详情页面协备教师字符串
                


            };
        },
        created() {
            this.init_Preparation_Project(this.lessonPreparationId);    
            this.getPrepareDetail(this.lessonPreparationId);   
        },
        mounted(){
            setTimeout(()=>{
                if(JSON.stringify(this.form_param.project)!='{}'){
                    let cnt = 0;
                    for(let key in this.form_param.project){
                        cnt++;
                        if(cnt == 1){
                            this.selected = key;
                            this.showHeader1 = true;
                            this.filteredList();
                        }
                    }
                }
                this.generateCode(); 
            },800);

            for (let i = 0; i < this.controls; i++) {
                const rte = this.$refs[`rte-${i}`];
                if (rte) {
                    rte.id = `rte-control-${i}`;
                }
            }
        },
        methods: {
            generateCode() {
                QRCode.toCanvas(window.location.href+"?id="+this.lessonPreparationId, {
                width: 100,
                margin: 1
                }, (error, canvas) => {
                if (error) {
                    console.error(error)
                    return
                }
                this.$refs.canvasWrapper.appendChild(canvas)
                })
            },
            getPrepareDetail(prepareId){
                Ajax.get("/prepare/get?id="+prepareId, null).then((resp) => {
                    this.loading = false;
                    if (resp.ok) {
                        this.prepare_detail.type= resp.body.type;
                        this.prepare_detail.subject= resp.body.subject;
                        this.prepare_detail.team_type= resp.body.team_type;
                        this.prepare_detail.stage= resp.body.stage;
                        this.prepare_detail.grade=resp.body.grade;
                        this.prepare_detail.term= resp.body.term;
                        this.prepare_detail.course= resp.body.course;
                        this.prepare_detail.textbook_version= resp.body.textbook_version;
                        this.prepare_detail.teacher= resp.body.teacher;
                        this.prepare_detail.cover= resp.body.cover;
                        this.prepare_detail.template= resp.body.template;
                        this.prepare_detail.state= resp.body.state;
                        //状态结束备课禁用按钮
                        if(this.prepare_detail.state==3){
                            let btuEndPrepare = document.getElementById('btuEndPrepare');
                            btuEndPrepare.disabled = true;
                        }
                        this.prepare_detail.introduction= resp.body.introduction;
                        this.prepare_detail.praise= resp.body.praise;
                        this.prepare_detail.share= resp.body.share;
                        this.prepare_detail.favorite= resp.body.favorite;
                        this.prepare_detail.reply= resp.body.reply;
                        this.prepare_detail.see= resp.body.see;
                        this.prepare_detail.time= resp.body.time;
                        this.prepare_detail.finish_time= resp.body.finish_time;
                        this.prepare_detail.type_title= resp.body.type_title;
                        this.prepare_detail.team_type_title= resp.body.team_type_title;
                        this.prepare_detail.stage_title= resp.body.stage_title;
                        this.prepare_detail.grade_title= resp.body.grade_title;
                        this.prepare_detail.term_title= resp.body.term_title;
                        this.prepare_detail.textbook_version_title= resp.body.textbook_version_title;
                        this.prepare_detail.teacher_name= resp.body.teacher_name;
                        this.prepare_detail.school_name= resp.body.school_name;
                        this.prepare_detail.template_title= resp.body.template_title;
                        this.prepare_detail.state_title= resp.body.state_title;
                        this.prepare_detail.ip= resp.body.ip;
                        this.prepare_detail.assists= resp.body.assists;
                        this.prepare_detail.teachers= resp.body.teachers;
                        this.prepare_detail.teachers_count= resp.body.teachers.length;
                        if(resp.body.teachers.length>0){
                            for(let i=0;i<resp.body.teachers.length;i++){
                                this.prepare_detail.teachers_string += resp.body.teachers[i].name+","
                            }
                            this.prepare_detail.teachers_string = this.prepare_detail.teachers_string.substring(0, this.prepare_detail.teachers_string.lastIndexOf(','));
                        }else{
                            this.prepare_detail.teachers_string = "无协备教师"
                        }
                        

                    } 
                })
            },
            filteredList() {
                /*1: '助学资料',
                    2: '教案',
                    3: '（导）学案',
                    4: '备课成果',
                    5: '教研研讨',
                    6: '教学反思',
                    7: '操作记录',
                    8: '访问记录',
                    9: '数据分析'*/
                this.loading = true;
                let url = '/prepare/get/project?id='+ this.lessonPreparationId +'&pid=0&prg=' + this.selected;
                Ajax.get(url, null).then((resp) => {
                    this.loading = false;
                    if (resp.ok) {
                        let data = resp.body;
                        this.current_data = [];
                        this.current_data.push({
                            id:data[0].id,
                            type:data[0].type,
                            title:data[0].title,
                            children:data[0].children
                        });
                        this.left_data = [];
                        let left_data_mod = {};
                        left_data_mod = {
                            key:data[0].type,
                            title:data[0].title,
                        }
                        if(data[0].children!=null){
                            let left_data_mod_children = [];
                            for(let i = 0 ; i < data[0].children.length ; i++){
                                left_data_mod_children.push({
                                    key : data[0].children[i].project,
                                    title : data[0].children[i].title,
                                });
                                let left_data_mod_children_children = [];
                                if(data[0].children[i].children != null){
                                    for(let p = 0;p < data[0].children[i].children.length ; p++){
                                        left_data_mod_children_children.push({
                                            key: data[0].children[i].children[p].project,
                                            title: data[0].children[i].children[p].title,
                                        });
                                        if(data[0].children[i].children[p].pid == data[0].children[i].project){
                                            left_data_mod_children[i].children = left_data_mod_children_children;
                                        }
                                    }
                                };
                            }
                            this.$set(left_data_mod,"children",left_data_mod_children);
                        };
                        this.left_data.push(left_data_mod);
                    } 
                })
            },
            isInArray(item) {
                console.log("isInArray")
                return this.targetArray.includes(item);
            },
            change(data) {
                this.selected = data.key;
                this.filteredList();
            },
            init_Preparation_Project(lessonPreparationId){
                this.loading = true;
                let url = '/prepare/get/project?id='+ lessonPreparationId +'&pid=0';
                Ajax.get(url, null).then((resp) => {
                    this.loading = false;
                    if (resp.ok) {
                        let data = resp.body;
                        this.form_param.raw_data = [];
                        data.forEach(e => {
                            this.$set(this.form_param.project,e.project, e.title);
                        });
                    } 
                })
            },
            //分享
            submitShare(){
                Ajax.postJson("/prepare/share", "id="+this.lessonPreparationId).then((resp) => {
                    console.log(resp)
                    if(resp.ok){
                        if (navigator.share) {
                            navigator.share({
                            title: '分享标题',
                            text: '这里是分享的文本内容，可以是链接或其他文本',
                            url: window.location.pathname + "?id="+ this.lessonPreparationId,
                            })
                            .then(() => console.log('分享成功'))
                            .catch(error => console.error('分享出错:', error));
                        } else {
                            // 对不支持Web Share API的浏览器进行回退处理
                            console.log('该浏览器不支持Web Share API');
                        }
                    }
                }).catch(ex => {
                    console.log(ex);
                });   
            },
            //结束备课
            submitEndPrepare(){
                Utils.confirm(this, '确定结束当前备课吗 ？', (modal) => {
                    modal.close();
                    Ajax.postJson('/prepare/finish', "id="+this.lessonPreparationId).then((resp) => {
                        if (resp.ok) {
                            HeyUI.$Message.success('已结束当前备课');
                            this.getPrepareDetail(this.lessonPreparationId)
                            if(this.prepare_detail.state==3){
                                let btuEndPrepare = document.getElementById('btuEndPrepare');
                                btuEndPrepare.disabled = true;
                            }
                        }else{
                            HeyUI.$Message.error(resp.msg);
                        }
                    });
                });
            },
            //收藏
            submitCollection(){
                Ajax.postJson('/prepare/favorite', "id="+this.lessonPreparationId).then((resp) => {
                    if (resp.ok) {
                        HeyUI.$Message.success('已收藏');
                    }else{
                        HeyUI.$Message.error(resp.msg);
                    }
                });
            },
            //点赞
            submitGive(){
                Ajax.postJson('/prepare/praise', "id="+this.lessonPreparationId).then((resp) => {
                    if (resp.ok) {
                        HeyUI.$Message.success('已点赞');
                    }else{
                        HeyUI.$Message.error(resp.msg);
                    }
                });
            },
            
        }
    };
    </script>
  