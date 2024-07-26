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
            <div style="height:170px;margin-bottom: 8px;">
                <div style="height:170px;border: 1px red solid;width: 29%;float: left;">

                </div>
                <div style="height:170px;border: 1px red solid;width: 70%;float:right;">

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
                                            <div v-if="itemss.type === 1" style="padding-top: 8px;">
                                                <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{itemss.title}}</label>
                                                <project_type_1 :pnp="itemss"/>
                                            </div>
                                            <div v-else-if="itemss.type === 2">
                                                1-2
                                                <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{itemss.title}}</label>


                                            </div>
                                            <div v-else-if="itemss.type === 3">
                                                1-3
                                                <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{itemss.title}}</label>


                                            </div>
                                        </div>
                                    </div>
                                     <div v-else>
                                        <div v-if="item.children[index].type === 1" style="margin-bottom: 10px;">
                                            <!-- {{item.children[index]}} -->
                                            <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.children[index].title}}</label>
                                            <!-- <project_type_1 :lessonPreparationId="item.children[index].id" :lessonPreparationProjectId="item.children[index].project"/> -->
                                            <project_type_1 :pnp="item.children[index]"/>
                                        </div>
                                        <div v-else-if="item.children[index].type === 2" style="margin-bottom: 10px;">
                                            2-2
                                            <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.children[index].title}}</label>

                                            <button class="h-btn" style="float:left;margin-left:8px;background-color: rgb(97, 158, 221);color:#FFF;">保存</button>
                                
                                        </div>
                                        <div v-else-if="item.children[index].type === 3" style="margin-bottom: 10px;">
                                            2-3
                                            <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.children[index].title}}</label>

                                            <button class="h-btn" style="float:left;margin-left:8px;background-color: rgb(97, 158, 221);color:#FFF;">保存</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="item.type === 1">
                                    3-1
                                    <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.title}}</label>
                                    <RichTextEditor ></RichTextEditor>
                                </div>
                                <div v-else-if="item.type === 2">
                                    <label style="margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.title}}</label>
                                    <!-- 可用，下面是测试 -->
                                    <project_type_2 :pnp="item" :proj="selected"/>

                                    <!-- <project_type_55 :pnp="item"/> -->

                                </div>
                                <div v-else-if="item.type === 3">
                                    3-3
                                    <div style="border: 0px red solid;width: 100%;float: left;"><label style="margin-left: 10px;font-size: 18px;background-color: bisque;">{{item.title}}</label></div>
                                    <div style="border: 0px red solid;width: 100%;float: left;"><input type="text" style="float: left;margin-left: 10px;margin-bottom: 10px;margin-top: 10px;width: 50%;"/></div>
                                    <div style="border: 0px red solid;width: 100%;float: left;"><RichTextEditor ></RichTextEditor></div>
                                    <div style="border: 0px red solid;width: 100%;float: left;"><button class="h-btn" style="float:left;margin-left:8px;background-color: rgb(97, 158, 221);color:#FFF;">保存</button></div>
                                </div>
                            </div> 

                        </div>
                    </div>
                </div>
                <div v-else-if="item.type === 4">
                    4
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
    import project_type_4 from './project_type_4';
    import project_type_5 from './project_type_5';
    import project_type_6 from './project_type_6';
    import project_type_7 from './project_type_7';
    import project_type_8 from './project_type_8';
    import project_type_55 from './project_type_55';
    export default {
        components: {
            project_type_1,
            project_type_2,
            project_type_4,
            project_type_5,
            project_type_6,
            project_type_7,
            project_type_8,
            project_type_55,
        },
        name: "template_project_details",
        props: ['lessonPreparationId'],
        data() {
            return {
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
                ]



            };
        },
        created() {
            this.init_Preparation_Project(this.lessonPreparationId);    
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
            },800);

            for (let i = 0; i < this.controls; i++) {
                const rte = this.$refs[`rte-${i}`];
                if (rte) {
                    rte.id = `rte-control-${i}`;
                }
            }
        },
        methods: {
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
                //this.$Message.info(`切换至 ${data.key + data.title}`, 1000);
            },
            init_Preparation_Project(lessonPreparationId){
                this.loading = true;
                let url = '/prepare/get/project?id='+ lessonPreparationId +'&pid=0';
                Ajax.get(url, null).then((resp) => {
                    this.loading = false;
                    if (resp.ok) {
                        console.log(resp);
                        let data = resp.body;
                        this.form_param.raw_data = [];
                        data.forEach(e => {
                            this.$set(this.form_param.project,e.project, e.title);
                        });
                        console.log(this.form_param);
                    } 
                })
            },
            save_Preparation_Project_Detail(prepareId,prepareProjectId,detail){
                console.log(detail);

                let inputValue = this.$refs.detail.getValue();
                console.log(this.$refs.detail); // 输出控件的值

                const myDiv = document.getElementById(detail);
                console.log(myDiv);

                let ref = eval(detail)[0]
                console.log(ref);


                



                //document.getElementById(detail)
                // {
                //     "id": 1, //备课项目内容ID 新增时为0 编辑时为内容ID 必须提交
                //     "prepare": 1, //备课ID 必须提交
                //     "project": 2, //备课项目ID 必须提交
                //     "content": "&lt;div style=&#39;color:read&#39;&gt;这个我认为需要掌握的前言内容|||&lt;/div&gt;", //备课项目内容， 必须提交
                //     "praise": 0, //点赞数量 可选参数
                //     "share": 0, //分享数量 可选参数
                //     "favorite": 0, //收藏数量 可选参数
                //     "reply": 0 //研讨数量
                // }
                let param = {
                    id:0,
                    prepare:prepareId,
                    project:prepareProjectId,
                    content:detail,
                    praise:0,
                    share:0,
                    favorite:0,
                    reply:0,
                };
                //console.log(param);
                return
                Ajax.postJson("/prepare/content/save", param).then((resp) => {
                    console.log(resp)
                }).catch(ex => {
                    console.log(ex);
                });
            },
        }
    };
    </script>
  