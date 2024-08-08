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
              <!-- <div style="width: 200px;height: 200px;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;background-color: rgb(194 217 193);"> -->
              <div style="width: 200px;height: 200px;float: left;margin-bottom: 8px;border-radius: 8px;border: 1px #72cd72 solid;position: relative;background-color: rgb(241, 241, 241);">
                <Avatar :src="teacher_detail.cover" style="margin: 5px;" :width="100" :imageTop="8">
                  <p style="font-size: 18px;margin-top: 18px;color: darkgreen;position: absolute;left: 100px;top: -10px;">{{teacher_detail.name}}&nbsp;&nbsp;{{teacher_detail.course}}</p>
                  <!-- <p class="dark2-color" style="position: absolute;top:100px;">{{teacher_detail.course}}</p> -->
                </Avatar>
                <p style="text-align: center;margin-top: 40px;font-size: 20px;font-weight: bold;color: green;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">{{teacher_detail.school}}</p>
              </div>

              <div style="width: 200px;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;padding-top: 8px;overflow: hidden;">
                <div style="width: 100%;border:0px green solid;height: 40px;margin-bottom: 13px;">
                  <button class="h-btn" style="width: 100%;font-size: 16px;border: 1px #73b8ff solid;color:aliceblue;background-color: rgb(97 158 221);height: 42px;" @click='create_form_opened = true'><i class="h-icon-inbox"></i><span>创建备课</span></button>
                </div>
                <div style="width: 100%;border:0px green solid;height: 40px;margin-bottom: 10px;">
                  <button class="h-btn h-btn" style="width: 100%;height: 40px;font-size: 16px;border-left: 10px #eb9e0f solid;color: #FFFFFF;" :style="{ backgroundColor: buttonColorLaunch }" @click="onLaunch">我发起的</button>
                </div>
                <div style="width: 100%;border:0px green solid;height: 40px;margin-bottom: 10px;">
                  <button class="h-btn h-btn-yellow" style="width: 100%;height: 40px;font-size: 16px;border-left: 10px #eb9e0f solid;color: #FFFFFF;" :style="{ backgroundColor: buttonColorParticipate }" @click="onParticipate">我参与的</button>
                </div>
                <div style="width: 100%;border:0px green solid;height: 40px;margin-bottom: 10px;">
                  <button class="h-btn h-btn-yellow" style="width: 100%;height: 40px;font-size: 16px;border-left: 10px #eb9e0f solid;color: #FFFFFF;" :style="{ backgroundColor: buttonColorCollection }" @click="onCollection">我收藏的</button>
                </div>
                <div style="width: 100%;border:0px green solid;height: 40px;margin-bottom: 10px;">
                  <button class="h-btn h-btn-yellow" style="width: 100%;height: 40px;font-size: 16px;border-left: 10px #eb9e0f solid;color: #FFFFFF;" :style="{ backgroundColor: buttonColorGive }" @click="onGive">我点赞的</button>
                </div>
              </div>

              <div style="width: 200px;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;overflow: hidden;">
                <div v-for="(item, index) in table_recommend.datas" :key="index"
                  style="width: 200px;height: 200px;border:0px green solid;float: left;margin-bottom: 8px;border-radius: 3px;background-color: rgb(156 165 164);padding-top: 3px;">
                  <div style="border:0px green solid;text-align: center;width: 100%;height: 49%;">
                    <img class="icon-x" style="border-radius: 8px;width: 96%;height: 100%;padding: 2px;" :src="item.cover" @error="handleImageError" />
                  </div>
                  <div style="border:0px green solid;"><p class="dark2-color" style="text-align: center;margin-top: 1px;font-size: 18px;font-family:'微软雅黑';color: #ffffff !important;">{{ item.subject }}</p></div>
                  <div style="border:0px green solid;padding-left: 10px;color: #ffffff;">主备:{{ item.name }}</div>
                  <div style="border:0px green solid;padding-left: 10px;color: #ffffff;">协备：{{ item.teachers_count }}人</div>
                  <div style="border:0px green solid;padding-left: 10px;color: #ffffff;">{{ item.time }}</div>
                </div>
              </div>

            </div>
            <!--右侧-->
            <Cell :flex="1" style="width: 200px;border:0px red solid;overflow: hidden;">
              <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 0px !important;background-color:rgb(241, 241, 241);border-radius: 3px;">
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
                  <Select v-model='course_main.now' 
                    :datas="course_main.selects" 
                    placeholder='选择课程'
                    @change='changeQueryCourse_main'
                    ></Select>
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
                      placeholder='选择学期'
                      @change='changeQueryTerm'
                      ></Select>
                </Cell>
                <!-- <Cell :width='4'>
                  <Select placeholder='选择课程' ></Select>
                </Cell> -->
                <Cell :width='4'>
                  <Select v-model='textbook_main.now' 
                  :datas="textbook_main.selects" 
                  placeholder='选择版本'
                  @change='changeQuerytextbook_main'
                  ></Select>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon"  style="width: 100%;">
                    <input type="text" style="width: 100%;" v-model="queryForm.master" placeholder='请输入主备教师'/>
                  </div>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon" style="width: 100%;">
                    <input type="text" style="width: 100%;" v-model="queryForm.assist" placeholder='请输入协备教师'/>
                  </div>
                </Cell>
                <Cell :width='4'>
                  <div class="h-input h-input-suffix-icon" style="width: 100%;">
                    <input type="text" style="width: 100%;" v-model="queryForm.subject" placeholder='请输入课件标题'/>
                  </div>
                </Cell>
                <Cell :width='4'>
                </Cell>
              </Row>

              <Row :space-x="0" type="flex" style="border:0px red solid;overflow: hidden;">
                <Cell :flex="1" style="width: 200px;border:0px red solid;padding: 13px 0px 13px 5px;">
                  <div style="border:0px solid green;margin: 0px !important;background-color:#f4b706;border-radius: 3px;color:azure;">
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
                </div>
                </Cell>
                <div style="width: 210px;padding: 13px 5px 13px 10px;">
                  <Button block icon="h-icon-search" style="height: 42px;font-size: 16px;background-color:rgb(92 169 66) ;color: aliceblue;" size='l' @click='init_data'>搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
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
                          <p>协备：{{item.teachers_count}}人</p>
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
                            <Cell :width='17' style="text-align: left;border: 0px salmon solid;">
                              <div style="width: 100%;border: 0px salmon solid;margin: 0px;text-align: left;height: 35px;line-height: 25px;">{{ item.time }}</div>
                            </Cell>
                            <Cell :width='7' style="text-align: right;border: 0px salmon solid;">
                              <div v-if="item.state === 3" style="width: 100%;border: 0px salmon solid;margin: 0px;cursor: pointer;height: 34px;background-color: rgb(223 218 205);" @click='showTpoPage(item)'>查看
                              </div>
                              <div v-else style="width: 100%;border: 0px salmon solid;margin: 0px;background-color: rgb(42 163 42);height: 34px;color: #FFF;" @click='showTpoPage(item)'>参与
                              </div>
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
      <Modal v-model='tpoDialogVisible' v-bind="params" @close="refreshList" style="position: relative;">
        <img style="cursor: pointer;position: absolute;right:10px; " src="./../../images/close.png" @click="refreshList" /> 
        <div  style="width: 1280px;overflow: hidden;">
          <tpo :lessonPreparationId="lessonPreparationId"></tpo>
        </div>
      </Modal>

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
              <Radio v-model='addForm.type' :datas='edit_type' @change="changeType"></Radio>
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
                  <FormItem label='学科' prop='course'>
                    <Select
                      v-model='addForm.course'
                      :datas="course_create.selects"
                      @change='changeQueryCourse_create'
                      placeholder='选择学科'
                    ></Select>
                  </FormItem>
                </div>
                <div style="border: 0px blue solid;height: 50px;">
                  <FormItem label='教材版本'>
                    <Select
                      v-model='addForm.textbook_version'   
                      :datas="textbook_create.selects"
                      placeholder='选择教材版本'
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
                  <!-- <FormItem label='课程' prop='course'>
                    <input type='text' v-model="addForm.course" placeholder='请输入课程名称' />
                  </FormItem> -->
                </div>

                <div style="border: 0px green solid;height: 50px;padding-bottom: 20px;line-height: 50px;padding-left: 80px;">
                  <Button v-show="isButtonVisible" style="width: 150px;" @click='selectAssistLessonPreparationTeachers' :loading='submitLoading'>选择协备教师</Button>
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
      <Modal v-model='imgDialogVisible' @close="" >
        <div  style="width: 400px;height: 400px;">
          <img :src="authorization_img" style="width: 300px;height: 300px;margin-top: 50px;margin-left: 50px;" />
          <label style="padding-left: 120px;">二维码有效时间30分钟</label>
        </div>
      </Modal>
      <!-- 协助备课教师 -->
      <Modal v-model='fromAssistLessonPreparationTeachers' @close="" >
        <Row type='flex' :space='5' style="margin-left: 36px;margin-top: 10px;">
          <Cell :width='3'>
            <Select v-model='province_s.now' :datas='province_s.selects' @change='changeAssistProvince'  placeholder='选择省份'></Select>
          </Cell>
          <Cell :width='3' >
            <Select v-model='city_s.now' :datas='city_s.selects' @change='changeAssistCity' placeholder='选择城市'></Select>
          </Cell>
          <Cell :width='3'>
            <Select v-model='zone_s.now' :datas='zone_s.selects' @change='changeAssistZone' placeholder='选择区县'></Select>
          </Cell>
          <Cell :width='3'>
            <Select v-model='school_s.now' :datas='school_s.selects' @change='changeAssistSchool' placeholder='选择学校'></Select>
          </Cell>
          <Cell :width='3' >
            <Select v-model='course_s.now' :datas='course_s.selects' @change='changeAssistCourse' placeholder='选择课程'></Select>
          </Cell>
          <!-- <Cell :width='3'>
            <Select v-model='grade_s.now' :datas='grade_s.selects' @change='changeAssistGrade' placeholder='选择年级'></Select>
          </Cell> -->
        </Row>
        <div class='model-right' style="width: 940px;overflow: hidden;" >
          <div style="width: 860px; float: left;border:  0px green solid;margin-bottom: 8px;">
            <Button style="width: 100px;float: left;" @click='cancelAssistLessonPreparationTeachers' :loading='confirmAssistLessonPreparationTeachersLoading'>取消</Button>
            <Button style="width: 100px;float: right;" color='primary' @click='confirmAssistLessonPreparationTeachers' :loading='confirmAssistLessonPreparationTeachersLoading' >
              确认已选
            </Button>
          </div>
          <div style="width: 400px; float: left;border:  1px green solid;">
            <Table :datas="table_teachers.datas" ref="table_teachers" @trclick="onTrClick">
              <TableItem title="ID" prop="id" align="center" :width="80" fixed="left"></TableItem>
              <TableItem title="教师" prop="name" :width="150"></TableItem>
            </Table>
            <br />
            <Pagination
              align='center'
              layout='pager'
              v-model='table_teachers.pagination'
              @change='loadAssistLessonPreparationTeachers'
            ></Pagination>
          </div>
          <div style="width: 400px; float: right;border: 1px solid green;">
            <Table :datas="table_teachers_selected.datas" ref="table_teachers" @trclick="onRomomClick" >
              <TableItem title="ID" prop="id" align="center" :width="80" fixed="left"></TableItem>
              <TableItem title="教师" prop="name" :width="150"></TableItem>
              <TableItem title='操作' :width='200'>
                <template slot-scope='{ data }'>
                  <Button
                    noBorder
                    transparent
                    text-color='primary'
                    size='xs'
                    @click='onRomomClick(data)'
                  >
                    删除
                  </Button>
                </template>
              </TableItem>
            </Table>
            <br />
            <Pagination
              align='center'
              layout='pager'
              v-model='table_teachers_selected.pagination'
              @change='loadAssistLessonPreparationTeachers'
            ></Pagination>
          </div>
          <br />
          <br />
        </div>
        <!-- <div style="width: 92%;margin-left: 40px;margin-bottom: 20px;overflow: hidden;">
            <Button style="width: 100px;float: left;" @click='cancelAssistLessonPreparationTeachers()' :loading='confirmAssistLessonPreparationTeachersLoading'>取消</Button>
            <Button style="width: 100px;float: right;" color='primary' @click='confirmAssistLessonPreparationTeachers()' :loading='confirmAssistLessonPreparationTeachersLoading' >
              确定
            </Button>
        </div> -->
      </Modal>
    </div>
  </template>


<script>
import Utils, { getApiURL } from '../../js/common/utils';
import tpo from './template_project_details';
import axios from 'axios';
const DEFAULT_VALUE = {
  closeOnMask: false,//点击遮罩可否关闭
  fullScreen: false,//全屏
  middle: false,//垂直居中
  hasMask: true,//有遮罩
  hasDivider: true,//有分割线
  hasCloseIcon: false,//关闭Icon
  draggable: false,//可拖拽
  transparent: false,//是否背景色透明
};
export default {
    components: {
      'tpo': tpo
    },
    data() {
      return {
        mode: 'checkbox',
        user:{
          avatar:"",
          course:"",
          created:0,
          expire:0,
          id:0,
          idCity:0,
          idProvince:0,
          idSchool:0,

          idZone:0,
          intro:null,
          isTemporary:false,
          level:0,
          male:null,
          name:"",
          token:"",
          username:"",
        },
        go: null,//定时器fa
        count: 0,
        timer: null,
        imgDialogVisible:false,
        authorization_img:null,//授权二维码图片
        authorization_key:"",
        confirmAssistLessonPreparationTeachersLoading:false,
        buttonColorLaunch: '#faca3d', // 初始颜色
        buttonColorParticipate: '#faca3d', // 初始颜色
        buttonColorCollection: '#faca3d', // 初始颜色
        buttonColorGive: '#faca3d', // 初始颜色
        params: {
        ...DEFAULT_VALUE
        },
        //参与 Begin
        lessonPreparationId: 0,//跳转参与页面的备课ID
        //projectId:0,
        tpoDialogVisible: false,
        //参与 End
        isDisabled: true,//创建模板按钮
        teacher_detail:{
          course: "",
          cover: "https://video.nnyun.net/col/w04.png",
          id: 0,
          name: "",
          school: "",
        },
        user_img: 'https://video.nnyun.net/col/bk01.jpg',
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
        table_teachers: {
          pagination: {
            page: 1,
            size: 10,
            total: 0
          },
          datas: []
        },
        table_teachers_selected: {
          pagination: {
            page: 1,
            size: 10,
            total: 0
          },
          datas: []
        },
        username: "",
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
          finish_time:"",//结束时间
          teachers:[]
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
          finish_time:"",
          master:"",//主备教师姓名
          assist:"",//协备教师姓名
          my_praise:0,
          my_favorite:0
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
        //学科(课程)
        course_select:
        {
          selects: [],
          now: ""
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
        selectedIndex: null,//图片选项
        //存储选中项的索引
        template_id: 0,
        template_title:"",
        fromAssistLessonPreparationTeachers:false,//协助备课教师窗体
        province_s: {
          selects: [],
          now: 0
        },
        city_s: {
          selects: [],
          now: 0
        },
        zone_s: {
          selects: [],
          now: 0
        },
        school_s: {
          selects: [],
          now: 0
        },
        stage_s: {//学段
          selects: [],
          now: 0
        },
        grade_s: {//年级
          selects: [],
          now: 0
        },
        course_s: {//学科(课程)
          selects: [
            { key: '书法', title: '书法' },
            { key: '美术', title: '美术' },
            { key: '沙画', title: '沙画' },
            { key: '非遗', title: '非遗' },
            { key: '其他', title: '其他' }
          ],
          now: ""
        },
        isButtonVisible: false, // 控制按钮是否显示
        course_main:{
          selects: [],
          now: ""
        },
        course_create:{
          selects: [],
          now: ""
        },
        textbook_main:{
          selects: [],
          now: ""
        },
        textbook_create:{
          selects: [],
          now: ""
        },
        //详情页面协备教师字符串
        teachers_string:"",
        teachers_count:0,







      }
    },
    computed: {

    },
    created() {
      let user = this.$store.getters['user'];
      if(user.token==null){
        this.imgDialogVisible = true;
        this.loadWxv2();
        let cnt = 1800000;
        this.go = window.setInterval(() => {
          let npl = cnt - 3000;
          if(npl <= 0){
            window.clearInterval(this.go);
          }else{
            setTimeout(this.v2_callback, 0);
          }
        }, 3000);
      }else{
        this.username = user.username;
        let prepare_id = this.$route.query.id;
        if(prepare_id != undefined){
          this.showTpoPageRouteQuery(prepare_id);
        }

        //课程
        this.course_main = this.init_course_list();
        this.course_create = this.init_course_list();

        this.initTeacherDetail();
        this.init_data();

        this.stage = this.init_stage_list();
        this.grade = this.init_grade_list();
        this.query_stage = this.init_stage_list();//学段
        this.query_grade = this.init_grade_list();//年级

        this.init_cover_list();
        this.init_recommend_data();
        this.init_statistics_data();

        this.init_template_data();
      }
    },
    mounted(){
      this.timer = setInterval(this.incrementCount, 5000);
    },
    methods: {
      //课程列表
      init_course_list(){
        let now = "";
        let selects = [];
        Ajax.get('/prepare/course/list', {}).then(resp => {
          if (resp.ok) {
            resp.body.forEach(e => {
              selects.push({
                title: e,
                key: e
              });
            });
          }
        });
        return {selects,now};
      },
      //教材版本
      init_textbook_list(){
        let now = "";
        let selects = [];
        Ajax.get('/prepare/textbook/list?course='+this.course_main.now, {}).then(resp => {
          if (resp.ok) {
            console.log(resp.body);
            resp.body.forEach(e => {
              console.log(e);
              selects.push({
                title: e,
                key: e
              });
            });
          }
        });
        return {selects,now};
      },
      incrementCount() {
        this.count = (this.count + 1) % 1800; // 30分钟是1800秒
      },
      showTpoPage(item) {
        this.tpoDialogVisible = true;
        this.lessonPreparationId = item.id;
      },
      showTpoPageRouteQuery(prepare_id) {
        this.tpoDialogVisible = true;
        this.lessonPreparationId = prepare_id;
      },
      cancelTpoPage() {
        this.tpoDialogVisible = false;
      },
      //我发起的
      onLaunch(){
        this.buttonColorLaunch = this.buttonColorLaunch === 'rgb(235, 158, 15)' ? '#faca3d' : 'rgb(235, 158, 15)';
        if(this.buttonColorLaunch === 'rgb(235, 158, 15)'){
          this.queryForm.master = this.username;
        }else{
          this.queryForm.master = "";
        }
        this.init_data();
      },
      //我参与的
      onParticipate(){
        this.buttonColorParticipate = this.buttonColorParticipate === 'rgb(235, 158, 15)' ? '#faca3d' : 'rgb(235, 158, 15)';
        if(this.buttonColorParticipate === 'rgb(235, 158, 15)'){
          this.queryForm.assist = this.username;
        }else{
          this.queryForm.assist = "";
        }
        this.init_data();
      },
      //我收藏的
      onCollection(){
        this.buttonColorCollection = this.buttonColorCollection === 'rgb(235, 158, 15)' ? '#faca3d' : 'rgb(235, 158, 15)';
        if(this.buttonColorCollection === 'rgb(235, 158, 15)'){
          console.log(123);
          this.queryForm.my_favorite = 1;
        }else{
          console.log(234);
          this.queryForm.my_favorite = 0;
        }
        this.init_data();
      },
      //我点赞的
      onGive(){
        this.buttonColorGive = this.buttonColorGive === 'rgb(235, 158, 15)' ? '#faca3d' : 'rgb(235, 158, 15)';
        if(this.buttonColorGive === 'rgb(235, 158, 15)'){
          console.log(123);
          this.queryForm.my_praise = 1;
        }else{
          console.log(234);
          this.queryForm.my_praise = 0;
        }
        this.init_data();
      },
      //获取当前教师信息 GET 21_获取当前教师信息  prepare/user/teacher
      initTeacherDetail(){
        Ajax.get('/prepare/user/teacher', {}).then(resp => {
          if (resp.ok) {
            this.teacher_detail.course= resp.body.course;
            this.teacher_detail.cover= resp.body.cover;
            this.teacher_detail.id= resp.body.id;
            this.teacher_detail.name= resp.body.name;
            this.teacher_detail.school= resp.body.school;
          }
        });
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
          course:this.course_main.now,                                                  //科目名称
          grade:this.query_grade.now > 0 ? this.query_grade.now : null,//年级ID
          term:this.queryForm.term > 0 ? this.queryForm.term : null,//学期ID
          textbook_version:this.textbook_main.now,                 //教材版本
          master:this.queryForm.master,                            //主备教师姓名
          assist:this.queryForm.assist,                            //协备教师姓名
          subject:this.queryForm.subject,                                            //备课标题
          //"comment":"",                                          //备课研讨内容
          min_time:null,                                            //最早备课时间
          max_time:null,                                            //最晚备课时间
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
          min_finish_time:null,                                     //最早结束日期
          max_finish_time:null,                                    //最晚结束日期
          key:null,                                                 //查询关键字 标题 主备 协备 资源名称 研讨标题 项目标题 项目内容等
          size:0,                                                  //分页大小
          page:0,                                                   //分页页码
          my_praise:this.queryForm.my_praise,
          my_favorite:this.queryForm.my_favorite
        };
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.setTable(resp.body);
          }
        })
      },
      setTable(body) {
        let idx = this.table.pagination.page - 1;
        let list = body.data.slice(idx * 20, (idx + 1) * 20);
        list.forEach(e => {
          if(e.teachers == null || e.teachers == ""){
            e.teachers_string="";
            e.teachers_count=0;
          }else{
            let teacherString = "";
            let truncatedString = JSON.stringify(e.teachers);
            let result = eval('('+truncatedString+')');
            result.forEach(e => {
              teacherString += e.name + ",";
            });
            e.teachers_string = teacherString.substring(0, teacherString.lastIndexOf(','));
            e.teachers_count=e.teachers.length;
          }
        });
        this.table.datas = list;
        this.table.pagination.total = body.data.length;
      },
      init_recommend_data(){
        Ajax.get('/prepare/recommend/list', {}).then(resp => {
          if (resp.ok) {
            let idx = this.table_recommend.pagination.page - 1;
            let list = resp.body.slice(idx * 8, (idx + 1) * 8);
            list.forEach(e => {
              if(e.teachers == null || e.teachers == ""){
                e.teachers_string="";
                e.teachers_count=0;
              }else{
                let teacherString = "";
                let truncatedString = JSON.stringify(e.teachers);
                let result = eval('('+truncatedString+')');
                result.forEach(e => {
                  teacherString += e.name + ",";
                });
                e.teachers_string = teacherString.substring(0, teacherString.lastIndexOf(','));
                e.teachers_count=e.teachers.length;
              }
            });
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
      changeQueryCourse_main(){
        this.init_data();
        this.textbook_main = this.init_textbook_list();
      },
      changeQuerytextbook_main(){
        this.init_data();
      },
      changeQueryCourse_create(){
        //this.init_data();
        this.textbook_create = this.init_textbook_list();
      },
      changeQuerytextbook_create(){
        //this.init_data();
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
          if(this.grade.now == 0){
            this.$Message.error(`请选择学科`);
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
            console.log(param);
            Ajax.postJson(url, param).then((resp) => {
              console.log(resp);
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
            console.log(error);
          } finally {
            this.submitLoading = false;
          }
        }
      },
      //清空创建窗口
      addCancel(){
        this.create_form_opened = false;

        this.addForm.id=0;
        this.addForm.type= 1;
        this.addForm.subject="";
        this.addForm.team_type=1;
        this.addForm.stage=0;
        this.addForm.grade=0;
        this.addForm.term=1;
        this.addForm.course="";
        this.addForm.textbook_version=1
        this.addForm.cover="";
        this.addForm.template=1;
        this.addForm.state=1;
        this.addForm.introduction="";
        this.addForm.praise=0;
        this.addForm.share=0;
        this.addForm.favorite=0,
        this.addForm.reply=0,
        this.addForm.finish_time="";
        this.addForm.teachers=[];
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
        if(this.addForm.type == 2){
          this.isButtonVisible = true;
        }else{
          this.isButtonVisible = false;
        }
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
        this.dialogVisible = true;
      },
      //关闭弹窗刷新父列表
      refreshList() {
        this.tpoDialogVisible = false;
        this.init_data();
      },
      loadWxv2(){
        Ajax.get('/wx/qrcode/v2', {}).then(resp => {
          if (resp.ok) {
            this.authorization_img = resp.body.qr;
            this.authorization_key = resp.body.key;
          }
        });
      },
      v2_callback(){
        try {
          console.log(getApiURL()+'/wx/qrcode/login/v2?key='+this.authorization_key);
          const response = axios.get(getApiURL()+'/wx/qrcode/login/v2?key='+this.authorization_key).then(response => {
            this.data = response.data;
            console.log(this.data);
            if(this.data.code == 4){
              if (!this.data.user.token) return;
              if (!this.data.user.avatar || this.data.user.avatar.length == 0) {
                this.data.user.avatar = '/static/images/avatar.png';
              }
              G.set('user', this.data.user);
              this.$store.commit('setUser', this.data.user);
              this.$router.go(0);
              window.clearInterval(this.go);
            }
          })
          .catch(error => {
            console.log('Error fetching data:', error);
          });
        } catch (error) {
          console.log('Error:', error);
        }
      },
      //选择协助备课教师
      selectAssistLessonPreparationTeachers(){
        this.table_teachers_selected.datas = [];
        this.table_teachers.datas = [];
        this.table_teachers.pagination.page = 1;
        this.table_teachers.pagination.size = 10;
        this.table_teachers.pagination.total = 0;

        this.province_s.now = 0;
        this.city_s.now= 0;
        this.zone_s.now = 0;
        this.school_s.now = 0;
        this.stage_s.now = 0;
        this.grade_s.now = 0;
        this.course_s.now = "";

        this.fromAssistLessonPreparationTeachers = true;
        this.province = this.init_province_original();
        this.loadAssistLessonPreparationTeachers();
      },
      //加载协助备课教师
      loadAssistLessonPreparationTeachers(){
        let url = '/prepare/teacher/list';
        let param = {
          "province":this.province_s.now,                                             //教师省份ID 所有参数都是可选的
          "city":this.city_s.now,                                                 //教师城市ID
          "zone":this.zone_s.now,                                                 //教师区县ID
          "school":this.school_s.now,                                               //教师学校ID
          "grade":0,                                                //教授年级ID
          "course":this.course_s.now,                                              //教授课程名称 例如：美术
        };
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            let idx = this.table_teachers.pagination.page - 1;
            let list = resp.body.slice(idx * 10, (idx + 1) * 10);
            this.table_teachers.datas = list;
            this.table_teachers.pagination.total = resp.body.length;
          }
        })
      },
      cancelAssistLessonPreparationTeachers(){
        this.fromAssistLessonPreparationTeachers = false;
      },
      changeSelectedAssistLessonPreparationTeachers(id,name){
        console.log(id);
        console.log(name);
      },
      //省份
      init_province_original(){
        let now = 0;
        let selects = [];
        Ajax.get('/user/organize/province', {}).then(resp => {
          if (resp.ok) {
            resp.body.forEach(e => {
              selects.push({
                title: e.text,
                key: e.id
              });
            });
          }
        });
        return {selects,now};
      },
      changeAssistProvince() {
        HeyUI.$Message.success("changeProvince");
        this.city = Utils.getCity(this.province.now);
        //this.loadAssistLessonPreparationTeachers();
      },
      changeAssistCity() {
        this.zone = Utils.getZone(this.city.now);
        this.loadAssistLessonPreparationTeachers();
      },
      changeAssistZone() {
        this.school = Utils.getSchool(this.zone.now);
        this.loadAssistLessonPreparationTeachers();
      },
      changeAssistSchool() {
        this.loadAssistLessonPreparationTeachers();
      },
      //学科（课程）
      changeAssistCourse() {
        this.loadAssistLessonPreparationTeachers();
      },
      //年级
      changeAssistGrade() {
        this.loadAssistLessonPreparationTeachers();
      },
      //确定选择按钮
      confirmAssistLessonPreparationTeachers(){
        this.addForm.teachers = [];
        if(this.table_teachers_selected.datas.length>0){
          for(let i=0;i<this.table_teachers_selected.datas.length;i++){
            this.addForm.teachers.push({id:this.table_teachers_selected.datas[i].id});
          }
        }
        //隐藏选择教师窗口
        this.fromAssistLessonPreparationTeachers = false;
      },
      //点击行添加教师
      onTrClick(data) {
        if(this.duplicates(this.table_teachers_selected.datas,data.id)){
          this.table_teachers_selected.datas.push({id:data.id,name:data.name});
        }else{
          HeyUI.$Message.error('已经选择，请重新选择');
        }
      },
      //点击行移除教师
      onRomomClick(data){
        this.table_teachers_selected.datas = this.table_teachers_selected.datas.filter(item => item.id != data.id);
      },
      duplicates(arr,param) {
        let cnt = 0;
        for(let i=0;i<arr.length;i++)
        {
          if(arr[i].id === param){
            cnt++
          }
        }
        if(cnt==0){
          return true;
        }else{
          return false;
        }
      }


    }
}

</script>