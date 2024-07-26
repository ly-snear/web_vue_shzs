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

  .disabled {
    pointer-events: none; /* 防止点击事件 */
    opacity: 1; /* 设置不透明度为1，显示完全可见 */
    cursor: default; /* 改变鼠标指针为默认样式 */
    /* 添加其他你需要的样式 */
    background-color: hwb(0 60% 37%);
    color: azure;
    width: 40%;
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
              <div style="width: 200px;height: 200px;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;background-color: lemonchiffon;">
                <Avatar :src="user_img" style="margin: 5px;" :width="100" :imageTop="8">
                  <div style="font-size: 18px;margin-top: 18px;">谭小玉</div>
                  <p class="dark2-color">书法</p>
                </Avatar>
                <p class="dark2-color" style="text-align: center;margin-top: 40px;font-size: 18px;">成都外国语学校</p>
              </div>

              <div style="width: 200px;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;padding-top: 8px;overflow: hidden;">
                <div style="width: 100%;border:0px green solid;height: 40px;margin-bottom: 10px;">
                  <button class="h-btn h-btn-yellow" style="width: 100%;height: 40px;font-size: 16px;border-left: 10px #eb9e0f solid;">我发起的</button>
                </div>
                <div style="width: 100%;border:0px green solid;height: 40px;margin-bottom: 10px;">
                  <button class="h-btn h-btn-yellow" style="width: 100%;height: 40px;font-size: 16px;border-left: 10px #eb9e0f solid;">我参与的</button>
                </div>
              </div>

              <div style="width: 200px;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;overflow: hidden;">
                <div v-for="(item, index) in table_recommend.datas" :key="index"
                  style="width: 200px;height: 200px;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;background-color: rgb(129, 211, 248);padding-top: 3px;">
                  <div style="border:0px green solid;text-align: center;width: 100%;height: 49%;">
                    <img class="icon-x" style="border-radius: 8px;width: 96%;height: 100%;padding: 2px;" :src="item.cover" @error="handleImageError" />
                  </div>
                  <div style="border:0px green solid;"><p class="dark2-color" style="text-align: center;margin-top: 1px;font-size: 18px;font-family:'微软雅黑';color: #ffffff !important;">{{ item.subject }}</p></div>
                  <div style="border:0px green solid;padding-left: 10px;color: #ffffff;">主备:{{ item.name }}</div>
                  <div style="border:0px green solid;padding-left: 10px;color: #ffffff;">协备：{{ item.team }}人</div>
                  <div style="border:0px green solid;padding-left: 10px;color: #ffffff;">{{ item.time }}</div>
                  <!-- <img class="icon-x" style="border-radius: 8px;width: 106px;height: 75px;padding: 2px;margin-left: 2px;" :src="item.url" /> -->
                  <!-- <Avatar :src="item.cover" style="margin: 5px;border:0px green solid;" :width="100" :imageTop="8">
                    <div style="font-size: 18px;margin-top: 18px;">谭小玉</div>
                    <p class="dark2-color">书法</p>
                  </Avatar> -->

                </div>
              </div>
              <!-- <Cell style="width: 200px;height: 200px;border:1px green solid;float: left;border-radius: 3px;">

              </Cell> -->
            </div>
            <!--右侧-->
            <Cell :flex="1" style="width: 200px;border:0px red solid;overflow: hidden;">
              <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 0px !important;background-color:#dbdbdb;border-radius: 3px;">
                <Cell :width='4' style="border:0px solid green;">
                  <Select
                      v-model='queryForm.type'
                      :datas="query_type"
                      placeholder='选择备课类型'
                      @change='changeQueryType'
                    ></Select>
                </Cell>
                <Cell :width='4' >
                  <Select
                      v-model='queryForm.state'
                      :datas="query_state"
                      placeholder='选择状态'
                      @change='changeQueryState'
                  ></Select>
                </Cell>
                <Cell :width='4'>
                  <Select  v-model='query_stage.now'
                      :datas="query_stage.selects"
                      placeholder='选择学段'
                      @change='changeQueryStage'
                      ></Select>
                </Cell>
                <Cell :width='4'>
                  <Select placeholder='选择学科'></Select>
                </Cell>
                <Cell :width='4'>
                  <Select  v-model='query_grade.now'
                      :datas="query_grade.selects"
                      placeholder='选择年级'
                      @change='changeQueryGrade'
                      ></Select>
                </Cell>
                <Cell :width='4'>
                  <Select  v-model='queryForm.term'
                      :datas="query_term"
                      placeholder='选择备课学期'
                      @change='changeQueryTerm'
                      ></Select>
                </Cell>
                <Cell :width='4'>
                  <Select placeholder='选择版本'></Select>
                </Cell>
                <Cell :width='4'>
                  <Select placeholder='选择课程目录'></Select>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon">
                    <input type="text" placeholder='请输入主备教师'/>
                    <!-- <icon type="calendar" /> -->
                  </div>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon">
                    <input type="text" placeholder='请输入协备教师'/>
                    <!-- <icon type="calendar" /> -->
                  </div>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon">
                    <input type="text" placeholder='请输入课件标题'/>
                    <!-- <icon type="calendar" /> -->
                  </div>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon">
                    <input type="text" placeholder='请输入评语'/>
                    <!-- <icon type="calendar" /> -->
                  </div>
                </Cell>
              </Row>

              <Row :space-x="0" type="flex" style="border:0px red solid;overflow: hidden;">
                <div style="width: 200px;padding: 13px 5px 13px 0px;">
                  <button class="h-btn" style="width: 100%;font-size: 16px;border: 1px #73b8ff solid;color:aliceblue;background-color: rgb(97 158 221);height: 42px;" @click='create_form_opened = true'><i class="h-icon-inbox"></i><span>创建备课</span></button>
                </div>
                <Cell :flex="1" style="width: 200px;border:0px red solid;padding: 13px 0px 13px 5px;">

                  <div style="border:0px solid green;margin: 0px !important;background-color:rgb(207 149 61);border-radius: 3px;color:azure;">
                  <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 0px !important;">
                    <Cell :width='5' style="border:0px solid green;">
                      <p>全部备课({{this.homePageStatisticsFields.total}})</p>
                    </Cell>
                    <Cell :width='5' >
                      <p>普通备课({{this.homePageStatisticsFields.person}})</p>
                    </Cell>
                    <Cell :width='5'>
                      <p>集体备课({{this.homePageStatisticsFields.team}})</p>
                    </Cell>
                    <Cell :width='5' style="border:0px solid green;">
                      <p>发起({{this.homePageStatisticsFields.establish}})</p>
                    </Cell>
                    <Cell :width='4' >
                      <p>参与({{this.homePageStatisticsFields.attend}})</p>
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
                    <div style="width: 99%;border:0px solid green;background-color: #f1f1f1;">
                      <div style="width: 100%;height: 160px;border:0px solid green;">
                        <img class="icon-x" style="width: 100%;height: 160px;border-radius: 3px;" :src="item.cover" @error="handleImageError" />
                      </div>
                      <p style="border: 0px solid red;text-align: left;padding-left: 5px;font-weight: bold;font-size:16px;">{{item.subject}}</p>
                      <div style="width: 100%;height: 145px;border:0px solid green;border-radius: 3px;">
                        <div style="width: 50%;height:34px;float: left;margin-bottom: 10px;background-color: #FFF;">
                          <p>主备：{{ item.teacher_name }}</p>
                        </div>
                        <div style="width: 50%;height:34px;float: left;margin-bottom: 10px;background-color: #FFF;">
                          <p>协备：{{item.term}}人</p>
                        </div>
                        <div style="width: 100%;float: left;background-color: #FFF;">
                          <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 5px;padding-top: 5PX;">
                            <Cell :width='6'><Badge :count="item.share" :max-count="99"><img class="icon-x" src="../../images/share.png"/></Badge></Cell>
                            <Cell :width='6'><Badge :count="item.favorite" :max-count="99"><img class="icon-x" src="../../images/collection.png"/></Badge></Cell>
                            <Cell :width='6'><Badge :count="item.reply" :max-count="99"><img class="icon-x" src="../../images/chat.png"/></Badge></Cell>
                            <Cell :width='6'><Badge :count="item.praise" :max-count="99"><img class="icon-x" src="../../images/like.png"/></Badge></Cell>
                            <!-- <Cell :width='5'><Badge :count="item." :max-count="99"><img class="icon-x" src="../../images/see.png"/></Badge></Cell> -->
                          </Row>
                        </div>
                        <div style="width: 100%;height:23px;float: left;">
                          <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 5px;">
                            <Cell :width='18' style="text-align: left">{{ item.time }}</Cell>
                            <Cell :width='6'>
                              <!-- <button style="width: 100%;" @click='participate_form_opened = true'>参与</button> -->
                              <button class="h-btn h-btn-yellow" style="width: 100%;" @click='showTpoPage(item)'>参与</button>
                            </Cell>
                            <Cell :width='6'>

                            </Cell>
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

      <!-- 参与 -->
      <Modal v-model='tpoDialogVisible' v-bind="params">
        <div  style="width: 1280px;overflow: hidden;">
          <tpo :lessonPreparationId="lessonPreparationId"></tpo>
          <div slot="footer" class="dialog-footer" style="float: right;margin-top: 10px;">
            <Button style="width: 150px;" @click='cancelTpoPage()'>取消</Button>
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

      <!-- 新增备课窗体 Begin-->
      <Modal v-model='create_form_opened' style="width: 1024px;" >
        <div class='model-right' style="width: 1024px;" >
          <div class='title'>{{ editId ? '编辑' : '新增' }}备课</div>
          <Form
            ref='form'
            labelPosition='left'
            :model='addForm'
            :rules='validationRules'
          >
            <FormItem label='类型' prop='type'>
              <Radio v-model='addForm.type' :datas='edit_type' @change="changeType()"></Radio>
            </FormItem>

            <div style="width: 100%;border: 0px red solid;height: 290px;">

              <div style="width: 50%;border: 0px blue solid;float: left;overflow: hidden;">
                <div style="border: 0px blue solid;height: 50px;">
                  <FormItem label='标题' prop='subject'><input type='text' v-model='addForm.subject' placeholder='请输入备课标题' /></FormItem>
                </div>
                <div style="border: 0px blue solid;height: 50px;">
                  <FormItem label='学段' prop='stage'>
                    <Select v-model='stage.now' :datas='stage.selects' @change='changeStage()' placeholder='选择学段'></Select>
                  </FormItem>
                </div>
                <div style="border: 0px blue solid;height: 50px;">
                  <FormItem label='年级' prop='grade'>
                    <Select v-model='grade.now' :datas='grade.selects' @change='changeGrade()' placeholder='选择年级'></Select>
                  </FormItem>
                </div>
                <div style="border: 0px blue solid;height: 50px;">
                  <FormItem label='学期' prop='term'>
                    <Radio v-model='addForm.term' :datas='edit_term'></Radio>
                  </FormItem>
                </div>
                <div style="border: 0px blue solid;height: 50px;">
                  <FormItem label='学科'>
                    <Select
                      v-model='course_select'
                      :datas="[
                        { key: '1', title: '书法' },
                        { key: '2', title: '美术' },
                        { key: '3', title: '沙画' },
                        { key: '4', title: '非遗' },
                        { key: '5', title: '其他' }
                      ]"
                      placeholder='选择学科'
                    ></Select>
                  </FormItem>
                </div>
                <div style="border: 0px blue solid;height: 40px;">
                  <FormItem label='模板项目' prop='title'>
                    <Button style="background-color: #3b91ff;color: #fff;width: 40%;" @click="template_form_opened = true"><i class="h-icon-inbox"></i><span>导入模板</span></Button>
                    <Button :class="{ disabled: isDisabled }" >创建模板</Button>
                  </FormItem>
                </div>
              </div>

              <div style="width: 50%;border: 0px green solid;float: right;height: 280px;">
                <div style="border: 0px green solid;height: 150px;">
                  <FormItem label='简介' prop='title'>
                    <textarea v-model="addForm.introduction" style="height: 130px;max-height: 150px;" ></textarea>
                  </FormItem>
                </div>
                <div style="border: 0px green solid;height: 50px;">

                </div>
                <div style="border: 0px green solid;height: 39px;">
                  <FormItem label='课程' prop='course'>
                    <input type='text' v-model="addForm.course" placeholder='请输入课程名称' />
                  </FormItem>
                </div>

                <div style="border: 0px green solid;height: 50px;">
                  <FormItem label='已选模板' >
                    <p style="padding-top: 7px;background-color: #f1f1f1;border-radius: 3px;padding-left: 5px;padding-bottom: 3px;height: 24px;">{{ this.template_title }}</p>
                  </FormItem>
                </div>
              </div>

              <div style="overflow: hidden;border: 0px green solid;float:left;">
                  <FormItem label='系统封面' prop='title'>
                    <div v-for="(item, index) in table_img.datas" :key="index"
                        @click="changeSelectImage(item)"
                        :class="{ 'selected': selectedIndex === index }" style="overflow: hidden;border: 0px green solid;float:left;border-radius: 5px;">
                      <img class="icon-x" style="border-radius: 8px;width: 106px;height: 75px;padding: 2px;margin-left: 2px;" :src="item.url" />
                    </div>
                  </FormItem>
                  <FormItem label='上传封面' prop='title'>
                    <Qiniu :options="options" type="image" data-type="url" v-model="file" @fileUpload='upload'></Qiniu>
                  </FormItem>
              </div>
            </div>
          </Form>
          <div style="float: right;">
            <Button style="width: 150px;" @click='addCancel()' :loading='submitLoading'>取消</Button>
            <Button style="width: 150px;" color='primary' @click='addSubmit()' :loading='submitLoading' >
              确定
            </Button>
          </div>
        </div>
      </Modal>
      <!-- 导入模板 Begin-->
      <Modal v-model='template_form_opened' style="width: 600px;" >
        <div class='model-right' style="width: 500px;" >
          <div>
            <table>
              <tr>
                <td style="width: 80px;"></td>
                <td style="width: 80px;">序号</td>
                <td style="width: 150px;">模板名称</td>
                <td style="width: 150px;">模板类型</td>

              </tr>
              <tr v-for="(item, index) in table_template.datas" :key="index">
                <td><input type="radio" :value="index" @change="changeSelectedItem(item.id,item.title)"/></td>
                <td>{{ index+1 }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.type_title }}</td>
              </tr>
            </table>
          </div>
          <br />
          <Pagination
            align='center'
            layout='pager'
            v-model='table_template.pagination'
            @change='init_template_data'
          ></Pagination><br /><br />
          <div style="width: 100%;">
            <Button style="width: 100px;float: left;" @click='confirmSelectionCancel()' :loading='confirmSelectionLoading'>取消</Button>
            <Button style="width: 100px;float: right;" color='primary' @click='confirmSelection()' :loading='confirmSelectionLoading' >
              确定
            </Button>
          </div>
        </div>
      </Modal>
      <!-- 导入模板 End-->
    </div>
  </template>


<script>
import tpo from './template_project_details';
const DEFAULT_VALUE = {
  closeOnMask: false,//点击遮罩可否关闭
  fullScreen: false,//全屏
  middle: false,//垂直居中
  hasMask: true,//有遮罩
  hasDivider: true,//有分割线
  hasCloseIcon: true,//关闭Icon
  draggable: false,//可拖拽
  transparent: false,//是否背景色透明
};
export default {
    components: {
      'tpo': tpo
    },
    data() {
      return {
        params: {
        ...DEFAULT_VALUE
        },
        //参与 Begin
        lessonPreparationId: 0,//跳转参与页面的备课ID
        //projectId:0,
        tpoDialogVisible: false,
        //参与 End
        isDisabled: true,//创建模板按钮
        user_img: 'https://video.nnyun.net/col/bk02.jpg',
        table: {
          pagination: {
            page: 1,
            size: 20,
            total: 0
          },
          datas: []
        },
        table_img: {
          pagination: {
            page: 1,
            size: 8,
            total: 0
          },
          datas: []
        },
        table_recommend: {
          pagination: {
            page: 1,
            size: 6,
            total: 0
          },
          datas: []
        },
        table_template: {
          pagination: {
            page: 1,
            size: 10,
            total: 0
          },
          datas: []
        },
        name: null,
        create_form_opened: false,
        opened2: false,
        template_form_opened:false,//导入模板窗体
        participate_form_opened:false,//导入模板窗体
        loading: false,
        // 新增窗体
        validationRules:{ required: ['type','subject','stage','grade','term','course']},
        submitLoading: false,
        confirmSelectionLoading:false,
        homePageStatisticsFields:{
          attend:0,
          establish:0,
          person:0,
          team:0,
          total:0,
        },
        addForm: {
          id:0,
          type: 1,//备课类型 1:个人 2:集体备课 可选参数 默认1
          subject:"",//备课标题 必须提交
          team_type:1,//集备类型 1:本校 2:跨校 type=1时 不提交 type=2时
          stage:0,//学段（小学、初中、高中） 可选
          grade:0,//年级ID 可选
          term:1,//学期ID 可选
          course:"",//课程名称 必须提交
          textbook_version:1,//教材版本 可选参数
          cover:"",//备课封面URL
          template:1,//备课引用的项目模板ID
          state:1,//备课状态 1:创建 2:备课 3:结束 可选参数 默认1
          introduction:"",//备课简介 可选参数
          praise:0,//点赞数量 可选参数
          share:0,//分享数量 可选参数
          favorite:0,//收藏数量 可选参数
          reply:0,//研讨数量 可选参数
          finish_time:""//结束时间
        },
        queryForm: {
          type: null,
          subject:"",
          team_type:1,
          stage:null,
          grade:null,
          term:null,
          course:"",
          textbook_version:1,
          cover:"",
          template:1,
          state:null,
          introduction:"",
          praise:0,
          share:0,
          favorite:0,
          reply:0,
          finish_time:""
        },
        editId: 0,
        query_type: [
          { title: '普通备课', key: 1 },
          { title: '集体备课', key: 2 }
        ],
        query_term: [
          { title: '上学期', key: 1 },
          { title: '下学期', key: 2 }
        ],
        //状态
        query_state: [
          { title: '创建', key: 1 },
          { title: '备课', key: 2 },
          { title: '结束', key: 3 }
        ],
        //学段
        query_stage: {
          selects: [],
          now: 0
        },
        //年级
        query_grade: {
          selects: [],
          now: 0
        },
        edit_type: [
          { title: '普通备课', key: 1 },
          { title: '集体备课', key: 2 }
        ],
        edit_term: [
          { title: '上学期', key: 1 },
          { title: '下学期', key: 2 }
        ],
        edit_state: [
          { title: '创建', key: 1 },
          { title: '备课', key: 2 },
          { title: '结束', key: 3 }
        ],
        //学段
        stage: {
          selects: [],
          now: 0
        },
        //年级
        grade: {
          selects: [],
          now: 0
        },
        //学科
        course_select:
        {
          selects: [],
          now: 0
        },
        //文件参数
        options: {
          max_file_size: '1mb',
          filters: {
            mime_types: [
              { title: 'Image files', extensions: 'jpg,gif,png' }
            ]
          }
        },
        file: null,
        bread: [
          {
            title: '根目录',
            id: 0
          }
        ],
        //图片选项
        selectedIndex: null,
        //存储选中项的索引
        template_id: 0,
        template_title:""

      }
    },
    computed: {

    },
    created() {
      this.init_data();

      this.stage = this.init_stage_list();
      this.grade = this.init_grade_list();

      this.query_stage = this.init_stage_list();//学段
      this.query_grade = this.init_grade_list();//年级

      this.init_cover_list();
      this.init_recommend_data();
      this.init_statistics_data();

      this.init_template_data();
    },
    mounted(){

    },
    methods: {
      showTpoPage(item) {
        this.tpoDialogVisible = true;
        this.lessonPreparationId = item.id;
        //this.projectId= item.template;
      },
      cancelTpoPage() {
        this.tpoDialogVisible = false;
      },
      //首页统计5值
      init_statistics_data(){
        Ajax.get('/prepare/list/count', {}).then(resp => {
          if (resp.ok) {
            this.homePageStatisticsFields.attend = resp.body.attend;
            this.homePageStatisticsFields.establish = resp.body.establish;
            this.homePageStatisticsFields.person = resp.body.person;
            this.homePageStatisticsFields.team = resp.body.team;
            this.homePageStatisticsFields.total = resp.body.total;
          }
        });
      },
      init_data(){
        let url = '/prepare/page';
        let param = {
          type:this.queryForm.type > 0 ? this.queryForm.type : null,//备课类型 1:个人 2:集体备课 所有参数均可选
          state:this.queryForm.state > 0 ? this.queryForm.state : null,//备课状态 1:创建 2:备课 3:结束
          stage:this.query_stage.now > 0 ? this.query_stage.now : null,//学段ID 小初高
          //course:null,//科目名称
          grade:this.query_grade.now > 0 ? this.query_grade.now : null,//年级ID
          term:this.queryForm.term > 0 ? this.queryForm.term : null,//学期ID
          //"textbook_version":1,                                  //教材版本
          master:null,                                             //主备教师姓名
          assist:null,                                             //协备教师姓名
          subject:null,                                            //备课标题
          //"comment":"",                                          //备课研讨内容
          min_time:null,                                 //最早备课时间
          max_time:null,                                 //最晚备课时间
          //"content":"",                                          //备课项目名称
          //"content_comment":"",                                  //备课项目研讨内容
          //"content_ext":"",                                      //备课项目扩展关键字
          //"content_ext_comment":"",                              //备课项目扩展研讨内容
          //"resource":"",                                         //备课资源标题 内容 URL地址
          //"resource_comment":"",                                 //备课资源研讨内容
          min_praise:null,                                            //最小点赞数
          max_praise:null,                                          //最大点赞数
          min_share:null,                                             //最小分享数
          max_share:null,                                           //最大分享数
          min_favorite:null,                                          //最小收藏数
          max_favorite:null,                                        //最大收藏数
          min_reply:null,                                             //最小研讨数
          max_reply:null,                                           //最大研讨数
          min_finish_time:null,                            //最早结束日期
          max_finish_time:null,                            //最晚结束日期
          key:null,                                                  //查询关键字 标题 主备 协备 资源名称 研讨标题 项目标题 项目内容等
          size:0,                                                  //分页大小
          page:0                                                   //分页页码
        };
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            //console.log(resp);
            this.setTable(resp.body);
          }
        })
      },
      setTable(body) {
        let idx = this.table.pagination.page - 1;
        let list = body.data.slice(idx * 20, (idx + 1) * 20);
        this.table.datas = list;
        this.table.pagination.total = body.data.length;
      },
      init_recommend_data(){
        Ajax.get('/prepare/recommend/list', {}).then(resp => {
          if (resp.ok) {
            let idx = this.table_recommend.pagination.page - 1;
            let list = resp.body.slice(idx * 8, (idx + 1) * 8);
            this.table_recommend.datas = list;
          }
        });
      },
      init_template_data() {
        let url = '/prepare/template/list';
        let param = {
          "state":1, //项目模板状态（保留） 1:正常 0:删除 可选参数
          "type":this.temp_type,   //项目模板类型 1:备课 2:集体备课 可选参数
          "title":this.temp_title,    //项目标题 可选参数
          "introduction":this.temp_introduction,//项目简介 可选参数
          "children":true//是否显示姓名 必须提交
        };
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            let idx = this.table_template.pagination.page - 1;
            let list = resp.body.slice(idx * 10, (idx + 1) * 10);
            this.table_template.datas = list;
            this.table_template.pagination.total = resp.body.length;
          }
        })
      },
      changeQueryType(){
        this.init_data();
      },
      changeQueryTerm(){
        this.init_data();
      },
      changeQueryState(){
        this.init_data();
      },
      changeQueryStage(){
        this.init_data();
      },
      changeQueryGrade(){
        this.init_data();
      },
      changeSelectedItem(id,title){
        this.template_id = id;
        this.template_title = title;
      },
      confirmSelection(){
        this.template_form_opened = false;//关闭模板窗体
      },
      confirmSelectionCancel(){
        this.template_id = 0;
        this.template_form_opened = false;//关闭模板窗体
        this.init_template_data();
      },
      //保存
      async addSubmit(){
        let validResult = await this.$refs.form.valid()
        if (validResult.result) {
          if(this.stage.now == 0){
            this.$Message.error(`请选择学段`);
            return
          }
          if(this.grade.now == 0){
            this.$Message.error(`请选择年级`);
            return
          }
          this.submitLoading = true;
          this.addForm.stage = this.stage.now;
          this.addForm.grade = this.grade.now;
          this.addForm.cover = this.file;
          if(this.template_id>0){
            this.addForm.template = this.template_id;
          }
          try {
            let url = '/prepare/save';
            let param = {};
            if(this.editId == 0){
              param = {
                ...this.addForm,
                id: this.editId
              };
            }
            Ajax.postJson(url, param).then((resp) => {
              if (resp.ok) {
                HeyUI.$Message.success("创建备课成功");
                this.addCancel();
                this.table.pagination.page = 1;
                this.init_data();
              } else {
                this.$Message.error(`保存${this.form.title}，失败-->${resp.msg}`);
              }
            }).catch(ex => {
              console.log(ex);
            });
          } catch (error) {
            console.error(error);
          } finally {
            this.submitLoading = false;
          }
        }
      },
      //清空
      addCancel(){

      },
      //学段
      init_stage_list(){
        let now = 0;
        let selects = [];
        Ajax.get('/class/period/list', {}).then(resp => {
          if (resp.ok) {
            resp.body.forEach(e => {
              selects.push({
                title: e.title,
                key: e.id
              });
            });
          }
        });
        return {selects,now};
      },
      //年级
      init_grade_list(){
        let now = 0;
        let selects = [];
        Ajax.get('/class/grade/list', {}).then(resp => {
          if (resp.ok) {
            resp.body.forEach(e => {
              selects.push({
                title: e.title,
                key: e.id
              });
            });
          }
        });
        return {selects,now};
      },
      //封面
      init_cover_list(){
        Ajax.get('/prepare/cover/list', {}).then(resp => {
          if (resp.ok) {
            let idx = this.table_img.pagination.page - 1;
            let list = resp.body.slice(idx * 8, (idx + 1) * 8);
            this.table_img.datas = list;
          }
        });
      },
      //备课类型
      changeType(){

      },
      changeStage(){

      },
      changeGrade(){

      },
      changeSelectImage(index) {
        this.file = index.url;
      },
      upload(file){
        this.file = "http:" + file.url;
      },
      handleImageError(event) {
        event.target.src = this.user_img;
      },
      openDialog() {
        console.log(123)
        this.dialogVisible = true;
      },
    }
}

</script>