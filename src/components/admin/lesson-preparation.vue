<style lang='less' scoped>
  .h-panel{
      border: 1px rgb(219, 219, 219) solid;
      // min-height: 600px;
      // height: 100%;
  }
  .h-row>div>div{
    padding: 8px;
    color: #FFF;
    border-radius: 3px;
    text-align: center;
    //background-color: @gray-color;
    //border: 1px red solid;
    color: green;
  }

  .icon-x{
    width: 25px;
    height: 25px;
  }

</style>
<template>
    <div class='frame-page'>
      <div class='h-panel'>
        <!--<div class='h-panel-bar filter'>
           <Breadcrumb :datas='bread' @click='click'></Breadcrumb>
        </div> -->
        <div class='h-panel-body'>
          <!-- <Row :space="10">
            <Cell :xs='24' :sm='12' :md='8' :lg='4' :xl='2'><div>123</div></Cell>
          </Row> -->

          <Row :space-x="0" type="flex" style="border:0px red solid;overflow: hidden;">
            <!--左侧-->
            <div style="width: 210px;">
              <Cell style="width: 200px;height: 200px;border:1px green solid;float: left;margin-bottom: 8px;border-radius: 3px;"> 
                <Avatar :src="user_img" style="margin: 5px;" :width="100" :imageTop="8">
                  <div style="font-size: 18px;margin-top: 18px;">谭小玉</div>
                  <p class="dark2-color">书法</p>
                </Avatar>
                <p class="dark2-color" style="text-align: center;margin-top: 40px;font-size: 18px;">成都外国语学校</p>
              </Cell>
              <Cell style="width: 200px;height: 200px;border:1px green solid;float: left;margin-bottom: 8px;border-radius: 3px;"> 
                
              </Cell>
              <Cell style="width: 200px;height: 200px;border:1px green solid;float: left;margin-bottom: 8px;border-radius: 3px;"> 
                
              </Cell>
              <Cell style="width: 200px;height: 200px;border:1px green solid;float: left;border-radius: 3px;"> 
                
              </Cell>
            </div>
            <!--右侧-->
            <Cell :flex="1" style="width: 200px;border:0px red solid;overflow: hidden;">

              <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 0px !important;background-color:#dbdbdb;border-radius: 3px;">
                <Cell :width='4' style="border:0px solid green;">
                  <Select placeholder='选择备课类型'></Select>
                </Cell>
                <Cell :width='4' >
                  <Select placeholder='选择状态'></Select>
                </Cell>
                <Cell :width='4'>
                  <Select placeholder='选择学段'></Select>
                </Cell>
                <Cell :width='4'>
                  <Select placeholder='选择学科'></Select>
                </Cell>
                <Cell :width='4'>
                  <Select  placeholder='选择年级'></Select>
                </Cell>
                <Cell :width='4'>
                  <Select placeholder='选择学期'></Select>
                </Cell>
                <Cell :width='4'>
                  <Select placeholder='选择版本'></Select>
                </Cell>
                <Cell :width='4'>
                  <Select placeholder='选择课程目录'></Select>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon">
                    <Input type="text" placeholder='请输入主备教师'/>
                    <Icon type="calendar" />
                  </div>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon">
                    <Input type="text" placeholder='请输入协备教师'/>
                    <Icon type="calendar" />
                  </div>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon">
                    <Input type="text" placeholder='请输入课件标题'/>
                    <Icon type="calendar" />
                  </div>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon">
                    <Input type="text" placeholder='请输入评语'/>
                    <Icon type="calendar" />
                  </div>
                </Cell>
              </Row>

              <Row :space-x="0" type="flex" style="border:0px red solid;overflow: hidden;">
                <div style="width: 200px;padding: 13px 5px 13px 0px;">
                  <button class="h-btn" style="width: 100%;font-size: 16px;border: 1px #73b8ff solid;color:aliceblue;background-color: rgb(97 158 221);height: 42px;" @click='opened = true'><i class="h-icon-inbox"></i><span>创建备课</span></button>
                </div>
                <Cell :flex="1" style="width: 200px;border:0px red solid;padding: 13px 0px 13px 5px;">

                  <div style="border:0px solid green;margin: 0px !important;background-color:rgb(207 149 61);border-radius: 3px;color:azure;">
                  <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 0px !important;">
                    <Cell :width='5' style="border:0px solid green;">
                      <p>全部备课 （ 132 ）</p>
                    </Cell>
                    <Cell :width='5' >
                      <p>普通备课（ 156 ）</p>
                    </Cell>
                    <Cell :width='5'>
                      <p>集体备课（ 93 ）</p>
                    </Cell>
                    <Cell :width='5' style="border:0px solid green;">
                      <p>发起（ 65 ）</p>
                    </Cell>
                    <Cell :width='4' >
                      <p>参与（ 45 ）</p>
                    </Cell>
                  </Row>

                  <!-- <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 0px !important;">
                    <Cell :width='7' style="border:0px solid green;">
                      <p>发起（ 65 ）</p>
                    </Cell>
                    <Cell :width='7' >
                      <p>参与（ 45 ）</p>
                    </Cell>
                    <Cell :width='6'>
                    </Cell>
                  </Row> -->
                </div>
                </Cell>
                <div style="width: 210px;padding: 13px 5px 13px 10px;">
                  <Button block icon="h-icon-search" style="height: 42px;font-size: 16px;border: green 1px solid;background-color:green ;color: aliceblue;" size='l' @click='open()'>搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
                </div>
              </Row>

              <template>
                <Row :space="9">
                  <Cell v-for="(item, index) in table.datas" :key="index" width="6" style="border: 0px solid green;margin-bottom: 20px;">  
                    <div style="width: 99%;border:1px solid green;">
                      <div style="width: 100%;height: 100px;border:0px solid green;">
                        <img class="icon-x" style="width: 100%;height: 100px;border-radius: 3px;" src="../../images/cover.png"/>
                      </div>
                      <p style="border: 0px solid red;text-align: left;padding-left: 5px;">{{item.subject}}</p>
                      <div style="width: 100%;height: 130px;border:1px solid green;border-radius: 3px;">
                        <div style="width: 50%;height:23px;float: left;margin-bottom: 10px;">
                          <p>主备：谭小玉</p>
                        </div>
                        <div style="width: 50%;height:23px;float: left;margin-bottom: 10px;">
                          <p>协备：3人</p>
                        </div>
                        <div style="width: 100%;float: left;">
                          <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 5px;padding-top: 5PX;">
                            <Cell :width='5'><img class="icon-x" src="../../images/share.png"/></Cell>
                            <Cell :width='5'><img class="icon-x" src="../../images/collection.png"/></Cell>
                            <Cell :width='4'><img class="icon-x" src="../../images/chat.png"/></Cell>
                            <Cell :width='5'><img class="icon-x" src="../../images/like.png"/></Cell>
                            <Cell :width='5'><img class="icon-x" src="../../images/see.png"/></Cell>
                          </Row>
                        </div>
                        <div style="width: 100%;height:23px;float: left;">
                          <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 5px;">
                            <Cell :width='18' style="text-align: left">创建时间 2024-03-01 18:19:54</Cell>
                            <Cell :width='6'><button style="width: 100%;">参与</button></Cell>
                          </Row>
                        </div>
                      </div> 
                    </div>
                  </Cell>
                </Row>
              </template>

              <br /><br />

              <Pagination align='center' layout='pager' v-model='table.pagination' @change='init_data' style="margin-bottom: 10px;"></Pagination>

            </Cell>
          </Row>






         
        </div>
      </div>

      <Modal v-model='opened'>
        <div class='modal-center'>
          <input type='text' v-model='name' placeholder='请输入文件夹名称' />
          <div>
            <Button color='primary' @click='save' :loading='loading'>保存</Button>
            <Button @click='opened = false'>取消</Button>
          </div>
        </div>
      </Modal>

      <Modal v-model='opened2'>
        <div class='modal-center2'>
          <Row type='flex' :space='30'>
            <Cell :width='8'>
              <div class='h-panel'>
                <div class='h-panel-body'>
                  <Row type='flex' :space='20'>
                    <Cell :flex='1'>
                      <!-- <Select
                        v-model='select1.val'
                        :datas='select1.datas'
                        :deletable='false'
                        @change='change(1)'
                      ></Select> -->
                    </Cell>
                    <Cell :flex='1'>
                      <!-- <Select
                        v-model='select2.val'
                        :datas='select2.datas'
                        :deletable='false'
                        @change='change(2)'
                      ></Select> -->
                    </Cell>
                    <Cell :flex='1'>
                      <!-- <Select
                        v-model='select3.val'
                        :datas='select3.datas'
                        :deletable='false'
                        @change='tree'
                      ></Select> -->
                    </Cell>
                  </Row>
                  <br />
                  <div style='height: 600px; overflow-y: scroll'>
                    <!-- <Tree
                      :option='d2.option'
                      ref='menuTree'
                      v-model='d2.option.id'
                      @input='input'
                    ></Tree> -->
                  </div>
                </div>
              </div>
            </Cell>
            <Cell :width='14'>
              <div class='h-panel'>
                <div class='h-panel-bar filter'>
                  <!-- <Breadcrumb :datas='d2.bread' @click='click2'></Breadcrumb> -->
                </div>
                <div class='h-panel-bar filter'>
                  <!-- <Checkbox v-model='d2.check.val[0]' @change='filter(0)'>全部</Checkbox>
                  <Checkbox v-model='d2.check.val[1]' @change='filter(1)'>视频</Checkbox>
                  <Checkbox v-model='d2.check.val[2]' @change='filter(2)'>图片</Checkbox>
                  <Checkbox v-model='d2.check.val[3]' @change='filter(3)'>Word</Checkbox>
                  <Checkbox v-model='d2.check.val[4]' @change='filter(4)'>PPT</Checkbox>
                  <Checkbox v-model='d2.check.val[5]' @change='filter(5)'>PDF</Checkbox>
                  <span class='txt-right'>共{{ d2.table.pagination.total }}项</span> -->
                </div>
                <div class='h-panel-body'>
                    <Table class='hide-header' ><!--<Table class='hide-header' :datas='d2.table.datas'> -->
                    <TableItem>
                      <!-- <template slot-scope='{ data }'>
                        <span v-if='data.folder' class='item' @click='path2(data)'
                        ><i class='icon-folder'></i>{{ data.name }}</span
                        >
                        <span v-else class='item'
                        ><i class='icon-file'></i>{{ data.name }}</span
                        >
                      </template> -->
                    </TableItem>
                    <TableItem prop='created' :width='180'></TableItem>
                    <TableItem :width='70'>
                      <!-- <template slot-scope='{ data }'>
                        <Button
                          noBorder
                          transparent
                          text-color='primary'
                          size='xs'
                          @click='reload(data)'
                        >导入
                        </Button
                        >
                      </template> -->
                    </TableItem>
                    <div slot='empty'>没有文件资料</div>
                  </Table>
                  <br /><br />
                  <!-- <Pagination
                    align='center'
                    layout='pager'
                    v-model='d2.table.pagination'
                    @change='init2'
                  ></Pagination> -->
                </div>
              </div>
            </Cell>
          </Row>
        </div>
      </Modal>

      <!-- <ImportFolderModal :modalShow.sync='importModalShow' @reload='handleImportReload' :pid='pid' /> -->

    </div>
  </template>


<script>
export default {
    data() {
      return {
        user_img: 'https://i1.go2yd.com/image.php?url=0Kvq81cKR1',
        table: {
          pagination: {
            page: 1,
            size: 12,
            total: 0
          },
          datas: []
        },
        name: null,
        opened: false,
        opened2: false,
        loading: false,
      }
    },
    computed: {

    },
    created() {
      this.init_data();
    },
    methods: {
      init_data(){
        let url = '/prepare/page';
        let param = {
          //"type":1,                                                  //备课类型 1:个人 2:集体备课 所有参数均可选
          //"state":1,                                                 //备课状态 1:创建 2:备课 3:结束
          stage:0,                                                 //学段ID 小初高
          course:"",                                               //科目名称
          grade:0,                                                 //年级ID
          term:0,                                                  //学期ID
          //"textbook_version":1,                                      //教材版本
          "master":"",                                               //主备教师姓名
          "assist":"",                                               //协备教师姓名
          "subject":"",                                              //备课标题
          //"comment":"",                                              //备课研讨内容
          "min_time":"2024-03-01",                                   //最早备课时间
          "max_time":"2024-10-01",                                   //最晚备课时间
          //"content":"",                                              //备课项目名称
          //"content_comment":"",                                      //备课项目研讨内容
          //"content_ext":"",                                          //备课项目扩展关键字
          //"content_ext_comment":"",                                   //备课项目扩展研讨内容
          //"resource":"",                                             //备课资源标题 内容 URL地址
          //"resource_comment":"",                                       //备课资源研讨内容
          min_praise:0,                                              //最小点赞数
          max_praise:100,                                            //最大点赞数
          min_share:0,                                               //最小分享数
          max_share:100,                                             //最大分享数
          min_favorite:0,                                            //最小收藏数
          max_favorite:100,                                          //最大收藏数
          min_reply:0,                                               //最小研讨数
          max_reply:100,                                             //最大研讨数
          min_finish_time:"2024-04-01",                              //最早结束日期
          max_finish_time:"2024-08-30",                              //最晚结束日期
          key:"",                                                    //查询关键字 标题 主备 协备 资源名称 研讨标题 项目标题 项目内容等
          size:0,                                                    //分页大小
          page:0                                                     //分页页码
        };
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.setTable(resp.body);
          } else {

          }
        })
      },
      setTable(body) {
        let idx = this.table.pagination.page - 1;
        let list = body.data.slice(idx * 12, (idx + 1) * 12);
        list.forEach(e => {
          // e.province = Utils.getName(e.idProvince)==null ? '' : Utils.getName(e.idProvince);
          // e.city = Utils.getName(e.idCity);
          // e.zone = Utils.getName(e.idZone);
          // e.school = Utils.getName(e.idSchool);
        });
        this.table.datas = list;
        this.table.pagination.total = body.data.length;
      },
      save(){

      },
      user_img_click(event){
        console.log(event);
      },
    }
}
</script>