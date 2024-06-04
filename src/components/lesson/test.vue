<template>
  <div class='test_panel'>
    <Layout :headerFixed='headerFixed' class='layout_test'>
      <HHeader class='layout_head' theme='white'>
        <Tooltip content='折叠展开'>
          <Button icon='h-icon-menu' size='l' noBorder class='button_icon'
                  @click='siderCollapsed = !siderCollapsed'></Button>
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='新增板块'>
          <Button icon='h-icon-plus' size='l' noBorder class='button_icon'
                  @click='plateAdd'></Button>
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='修改板块'>
          <Button icon='h-icon-edit' size='l' noBorder class='button_icon'
                  @click='plateEdit'></Button>
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='删除板块'>
          <Button icon='h-icon-close' size='l' noBorder class='button_icon'
                  @click='plateDelete'></Button>
        </Tooltip>
        <div class='hsplit'></div>
        <div class='vsplit'></div>
        <div class='hsplit'></div>
        <Tooltip content='导入题目'>
          <Button icon='button_icon icon iconfont icon-daoru' :style='"margin-top: " + buttonTop + "px"' size='l'
                  noBorder
                  @click='import_topics_from_lib'></Button>
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='新增题目'>
          <Button icon='button_icon icon iconfont icon-xinzeng2' :style='"margin-top: " + buttonTop + "px"' size='l'
                  noBorder @click='create_topics'></Button>
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='删除题目'>
          <Button icon='button_icon icon iconfont icon-shanchu7' :style='"margin-top: " + buttonTop + "px"' size='l'
                  noBorder @click='delete_topics_list'></Button>
        </Tooltip>
        <div class='hsplit'></div>
        <div class='vsplit'></div>
        <div class='hsplit'></div>
        <Tooltip content='选择题目类型'>
          <Select v-model='testValue' :datas='testType' keyName='id' titleName='name' :deletable='true'
                  :filterable='false' style='margin-top: 15px; width: 100px' @change='selectTopicsType'></Select>
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='题干关键字'>
          <input type='text' placeholder='题目标题关键字' v-model='stemKey'
                 :style='"margin-top: " + searchKeyTop + "px; width: " + searchKeyWidth + "px"' />
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='选项关键字'>
          <input type='text' placeholder='题目选项关键字' v-model='optionKey'
                 :style='"margin-top: " + searchKeyTop + "px; width: " + searchKeyWidth + "px"' />
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='答案关键字'>
          <input type='text' placeholder='题目答案关键字' v-model='answerKey'
                 :style='"margin-top: " + searchKeyTop + "px; width: " + searchKeyWidth + "px"' />
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='题目标记'>
          <input type='text' placeholder='题目标记关键字' v-model='tagKey'
                 :style='"margin-top: " + searchKeyTop + "px; width: " + searchKeyWidth + "px"' />
        </Tooltip>
        <div class='hsplit'></div>
        <Tooltip content='搜索题目'>
          <Button icon='button_icon icon iconfont icon-sousuo1' :style='"margin-top: " + buttonTop + "px"' size='l'
                  noBorder @click='loadLessonTopicsData'></Button>
        </Tooltip>
      </HHeader>
      <Layout :siderFixed='siderFixed' :siderCollapsed='siderCollapsed' class='layout_body'>
        <Sider class='list_plate' theme='white'>
          <Row :space='1' class='list_plate_box'>
            <Cell v-for='(p, i) in listPlate' :key='p.id' width='24' :data-index='i' class='list_plate_item_box'>
              <div :class='p.selected?"list_plate_item list_plate_item_selected":"list_plate_item"'
                   @click='plateSelect(p, i)'>
                {{ p.title }}
              </div>
            </Cell>
          </Row>
        </Sider>
        <Content class='layout_content' theme='white'>
          <!-- 表头 -->
          <div class='table-head'>
            <template v-for='(item, i) in columns'>
              <div class='table-columns table-columns-color' v-if='item.show' :key='item.sn' :data-index='i'
                   :style='item.width?"width: " + item.width + "px":"flex-grow:1"'>
                {{ item.title }}
              </div>
            </template>
          </div>
          <!-- 表体 -->
          <div class='lesson_topics_list_box'>
            <!-- <component :is='typeComponentName' ref='topicsList'></component> -->
            <div v-for='(row, i) in topicsList' :key='row.id' class='table-row' :data-index='i' :data-id='row.id'>
              <!-- 题目 -->
              <div class='row_title' :style='"width: calc(100% - " + extendWidth + "px)"'>
                <!-- 基本信息 -->
                <div class='base_info' draggable @dragstart='test_drop_start($event, i, row.id)'
                     @dragover.prevent='test_drop_over($event, i, row.id)'
                     @drop.stop='test_drop_complete($event, i, row.id)'>
                  <!-- 复选框 -->
                  <div class='table-columns'
                       :style='"width: " + columns[0].width + "px;text-align: " + columns[0].align'>
                    <Checkbox :value='row.id' v-model='selectList'></Checkbox>
                  </div>
                  <!-- 序号 -->
                  <div class='table-columns'
                       :style='"width: " + columns[1].width + "px;text-align: " + columns[1].align'>
                    {{ row.sn }}、
                  </div>
                  <!-- 标题 -->
                  <div class='table-columns title_info' v-if='[1,2,3,4,5].indexOf(row.id_type) != -1'
                       :style='"width:calc(100% - " + baseWidth + "px); color: " + row.color + "; text-align: " + columns[2].align'>
                    {{ row.title }}
                  </div>
                  <div class='table-columns title_info' v-if='row.id_type == 6'
                       :style='"width:calc(100% - " + baseWidth + "px); color: " + row.color + "; text-align: " + columns[2].align'
                       v-html='row.rtext'>
                  </div>
                  <!-- 分值 -->
                  <div class='table-columns'
                       :style='"width: " + columns[3].width + "px;text-align: " + columns[3].align'>
                    {{ row.score }}
                  </div>
                  <!-- 发布时间 -->
                  <div class='table-columns'
                       :style='"width: " + columns[4].width + "px;text-align: " + columns[4].align'>
                    {{ row.time }}
                  </div>
                </div>
                <!-- 答案信息 -->
                <div class='qa_info'>
                  <component :is='row.view' :topics='row'
                             :ref='"id_topics_" + row.id' :key='row.uk'></component>
                </div>
              </div>
              <!-- 标记 -->
              <div class='row_tag' :style='"width: " + columns[5].width + "px"'>
                <div v-for='(tag, k) in row.tags' :key='tag.id + "_" + tag.order' :data-index='k' :data-id='tag.id'
                     :data-order='tag.order' class='tag-item' :title='tag.tag' :style='"color: " + tag.color + ";"'>
                  {{ tag.tag }}
                </div>
              </div>
              <!-- 操作 -->
              <div class='row_act' :style='"width: " + columns[6].width + "px"'>
                <Row>
                  <Cell width='12'>
                    <Button icon='h-icon-edit' color='blue' @click.stop='open_editor(row, i)'>编辑</Button>
                  </Cell>
                  <Cell width='12'>
                    <Button icon='h-icon-close' color='red' @click='delete_topics(row, i)'>删除</Button>
                  </Cell>
                  <Cell width='24'>&nbsp;</Cell>
                  <Cell width='12'>
                    <Button icon='h-icon-plus' color='green' @click.stop='new_before(row, i)'>之前</Button>
                  </Cell>
                  <Cell width='12'>
                    <Button icon='h-icon-plus' color='green' @click.stop='new_after(row, i)'>之后</Button>
                  </Cell>
                </Row>
              </div>
            </div>
          </div>
          <!-- 分页器 -->
          <div class='page_box'>
            <Pagination align='center' v-model='pagination' @change='changePage'></Pagination>
          </div>
          <Loading text='Loading' :loading='loading'></Loading>
        </Content>
      </Layout>
    </Layout>
    <Modal v-model='openedPlate'>
      <div class='modal-center'>
        <input type='text' v-model='namePlate' placeholder='请输入板块名称' />
        <div>
          <Button color='primary' @click='plateSave' :loading='loadingPlate'>保存</Button>
          <Button @click='openedPlate = false'>取消</Button>
        </div>
      </div>
    </Modal>
    <Modal v-model='openedEditor' :middle='true' :closeOnMask='false'>
      <component :is='nameEditor' :topics='objEditor' :index='indexEditor' :manner='styleEditor'></component>
    </Modal>
    <Modal v-model='openedNew' :middle='true'>
      <div class='new_topics'>
        <div class='select_topics_type'>
          <div class='select_topics_type_title'>选择题型</div>
          <div class='select_topics_type_list'>
            <Select v-model='selectNewTopicsType' :datas='testType' keyName='id' titleName='name' :deletable='false'
                    :filterable='false'></Select>
          </div>
        </div>
        <div class='select_topics_type'>
          <div class='select_topics_type_title'>选择批次</div>
          <div class='select_topics_type_list'>
            <Select v-model='selectNewTopicsPlate' :datas='listPlate' keyName='id' titleName='title' :deletable='true'
                    :filterable='false'></Select>
          </div>
        </div>
        <div class='select_topics_type'>
          <div class='select_topics_type_title'>选择学科</div>
          <div class='select_topics_type_list'>
            <Select v-model='selectScienceId' :datas='listScience' keyName='id' titleName='title' :deletable='true'
                    :filterable='false' @change='selectedScience'></Select>
          </div>
        </div>
        <div class='select_topics_type'>
          <div class='select_topics_type_title'>选择学制</div>
          <div class='select_topics_type_list'>
            <Select v-model='selectPeriodId' :datas='listPeriod' keyName='id' titleName='title' :deletable='true'
                    :filterable='false' @change='selectedPeriod'></Select>
          </div>
        </div>
        <div class='select_topics_type'>
          <div class='select_topics_type_title'>选择教材</div>
          <div class='select_topics_type_list'>
            <Select v-model='selectMaterialId' :datas='listMaterial' keyName='id' titleName='title' :deletable='true'
                    :filterable='false' @change='selectedMaterial'></Select>
          </div>
        </div>
        <div class='select_topics_type'>
          <div class='select_topics_type_title'>选择年级</div>
          <div class='select_topics_type_list'>
            <Select v-model='selectGradeId' :datas='listGrade' keyName='id' titleName='title' :deletable='true'
                    :filterable='false' @change='selectedGrade'></Select>
          </div>
        </div>
        <div class='select_topics_type'>
          <div class='select_topics_type_title'>选择章节</div>
          <div class='select_topics_type_list'>
            <Select v-model='selectChaptersId' :datas='listChapters' keyName='id' titleName='title' :deletable='true'
                    :filterable='false'></Select>
          </div>
        </div>
      </div>
      <hr />
      <div class='new_button'>
        <Button icon='h-icon-error' color='red' @click='cancelNew'>取消</Button>
        <Button icon='h-icon-check' color='primary' @click='confirmNew'>确认</Button>
      </div>
    </Modal>
    <Modal v-model='openImport' :middle='true' :closeOnMask='false' :fullScreen='false'>
      <div class='import_layer'>
        <!-- 搜索栏 -->
        <div class='head_bar'>
          <!-- 选择模块 -->
          <div class='head_bar_palte'>
            <Select v-model='selectImportPlate' :datas='listPlate' keyName='id' titleName='title' :deletable='true'
                    :filterable='false' placeholder='选择批次'></Select>
          </div>
          <!-- 选择题型-->
          <div class='head_bar_topics_type'>
            <Select v-model='selectImportTopicsType' :datas='testType' keyName='id' titleName='name' :deletable='false'
                    :filterable='false' @change='importTopicsTypeChange'></Select>
          </div>
          <!-- 科目维度 -->
          <div class='head_bar_topics_dim_course'>
            <Select v-model='selectImportCourseValue' :datas='selectImportCourse' keyName='id' titleName='name'
                    :deletable='true'
                    :filterable='false' placeholder='选择科目'></Select>
          </div>
          <!-- 学制维度 -->
          <div class='head_bar_topics_dim_duration'>
            <Select v-model='selectImportDurationValue' :datas='selectImportDuration' keyName='id' titleName='name'
                    :deletable='true'
                    :filterable='false' placeholder='选择学制'></Select>
          </div>
          <!-- 学年维度 -->
          <div class='head_bar_topics_dim_year'>
            <Select v-model='selectImportYearValue' :datas='selectImportYear' keyName='id' titleName='name'
                    :deletable='true'
                    :filterable='false' placeholder='选择学年'></Select>
          </div>
          <!-- 学期维度 -->
          <div class='head_bar_topics_dim_temp'>
            <Select v-model='selectImportTermValue' :datas='selectImportTerm' keyName='id' titleName='name'
                    :deletable='true'
                    :filterable='false' placeholder='选择学期'></Select>
          </div>
          <!-- 教材维度 -->
          <div class='head_bar_topics_dim_book'>
            <Select v-model='selectImportTextbooksValue' :datas='selectImportTextbooks' keyName='id' titleName='name'
                    :deletable='true'
                    :filterable='false' placeholder='选择教材'></Select>
          </div>
          <!-- 单元维度 -->
          <div class='head_bar_topics_dim_unit'>
            <Select v-model='selectImportUnitValue' :datas='selectImportUnit' keyName='id' titleName='name'
                    :deletable='true'
                    :filterable='false' placeholder='选择单元'></Select>
          </div>
          <!-- 章节维度 -->
          <div class='head_bar_topics_dim_chapters2'>
            <Select v-model='selectImportChapters2Value' :datas='selectImportChapters2' keyName='id' titleName='name'
                    :deletable='true'
                    :filterable='false' placeholder='选择章节'></Select>
          </div>
          <!-- 选择时间段 -->
          <div class='head_bar_topics_time'>
            <DateRangePicker v-model='selectImportTopicsTime' :format='selectImportDateFormat'
                             :bothChoose='selectImportDateBothChoose' style='width: 100%'></DateRangePicker>
          </div>
        </div>
        <!-- 搜索栏 -->
        <div class='head_bar2'>
          <div class='head_bar2_title'>
            <input type='text' placeholder='题目标题' v-model='selectImportTopicsTitle' />
          </div>
          <div class='head_bar2_title'>
            <input type='text' placeholder='答案标题' v-model='selectImportTopicsOption' />
          </div>
          <div class='head_bar2_title'>
            <input type='text' placeholder='答案内容' v-model='selectImportTopicsAnswer' />
          </div>
          <div class='head_bar2_title'>
            <input type='text' placeholder='连线题标题' v-model='selectImportTopicsCaption' />
          </div>
          <div class='head_bar2_title'>
            <input type='text' placeholder='题目标签' v-model='selectImportTopicsTag' />
          </div>
          <div class='head_bar2_title'>
            <input type='text' placeholder='题目备注' v-model='selectImportTopicsRemarks' />
          </div>
          <div class='head_bar2_title'>
            <input type='number' placeholder='最小分数' v-model='selectImportTopicsMinScore' />
          </div>
          <div class='head_bar2_title'>
            <input type='number' placeholder='最大分数' v-model='selectImportTopicsMaxScore' />
          </div>
          <div class='head_bar2_title'>
            <input type='text' placeholder='上传用户' v-model='selectImportTopicsUser' />
          </div>
          <div class='head_bar2_title'>
            <input type='text' placeholder='适配年级' v-model='selectImportTopicsGrade' />
          </div>
          <div class='head_bar2_title'>
            <input type='text' placeholder='适配章节' v-model='selectImportTopicsChapters' />
          </div>
          <div class='search_button_box'>
            <div class='button_act'>
              <button class='h-btn h-btn-green h-btn-m button_act_text' @click='loadSelectImportTopicsData'>
                查询
              </button>
            </div>
            <div class='button_bottom'></div>
          </div>
        </div>
        <!-- 题目表头 -->
        <div class='import_table-head'>
          <template v-for='(item, i) in importColumns'>
            <div class='table-columns table-columns-color' v-if='item.show' :key='item.sn' :data-index='i'
                 :style='item.width?"width: " + item.width + "px":"flex-grow:1"'>
              {{ item.title }}
            </div>
          </template>
        </div>
        <!-- 题目列表 -->
        <div class='list_topics'>
          <div v-for='(row, i) in selectImportTopicsList' :key='row.id' class='import_table-row' :data-index='i'
               :data-id='row.id'>
            <!-- 题目 -->
            <div class='row_title' :style='"width: calc(100% - " + importExtendWidth + "px)"'>
              <!-- 基本信息 -->
              <div class='base_info'>
                <!-- 复选框 -->
                <div class='table-columns'
                     :style='"width: " + importColumns[0].width + "px;text-align: " + importColumns[0].align'>
                  <Checkbox :value='row.id' v-model='importSelectList'></Checkbox>
                </div>
                <!-- 序号 -->
                <div class='table-columns'
                     :style='"width: " + importColumns[1].width + "px;text-align: " + importColumns[1].align'>
                  {{ row.sn }}、
                </div>
                <!-- 标题 -->
                <div class='table-columns title_info' v-if='[1,2,3,4,5].indexOf(row.id_type) != -1'
                     :style='"width:calc(100% - " + importBaseWidth + "px); color: " + row.color + "; text-align: " + importColumns[2].align'>
                  {{ row.title }}
                </div>
                <div class='table-columns title_info' v-if='row.id_type == 6'
                     :style='"width:calc(100% - " + importBaseWidth + "px); color: " + row.color + "; text-align: " + importColumns[2].align'
                     v-html='row.rtext'>
                </div>
                <!-- 分值 -->
                <div class='table-columns'
                     :style='"width: " + importColumns[3].width + "px;text-align: " + importColumns[3].align'>
                  {{ row.score }}
                </div>
                <!-- 发布时间 -->
                <div class='table-columns'
                     :style='"width: " + importColumns[4].width + "px;text-align: " + importColumns[4].align'>
                  {{ row.time }}
                </div>
              </div>
              <!--题目答案-->
              <div class='qa_info'>
                <component :is='row.view' :topics='row' :ref='"id_import_topics_" + row.id' :key='row.uk'></component>
              </div>
            </div>
            <!-- 标记 -->
            <div class='row_tag' :style='"width: " + importColumns[5].width + "px"'>
              <div v-for='(tag, k) in row.tags' :key='tag.id + "_" + tag.order' :data-index='k' :data-id='tag.id'
                   :data-order='tag.order' class='tag-item' :title='tag.tag' :style='"color: " + tag.color + ";"'>
                {{ tag.tag }}
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <div class='list_page'>
          <Pagination align='center' v-model='selectImportPagination' @change='selectImportChangePage'></Pagination>
        </div>
      </div>
      <hr />
      <div class='new_button'>
        <Button icon='h-icon-error' color='red' @click='cancelImport'>取消</Button>
        <Button icon='h-icon-check' color='primary' @click='confirmImport'>导入</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { EventBus } from '../../js/common/event-bus';
import lesson1 from './components/lesson1';
import lesson2 from './components/lesson2';
import lesson3 from './components/lesson3';
import lesson4 from './components/lesson4';
import lesson5 from './components/lesson5';
import lesson6 from './components/lesson6';
import lessoneditor1 from './components/lessoneditor1';
import lessoneditor2 from './components/lessoneditor2';
import lessoneditor3 from './components/lessoneditor3';
import lessoneditor4 from './components/lessoneditor4';
import lessoneditor5 from './components/lessoneditor5';
import lessoneditor6 from './components/lessoneditor6';
import { getRandomInt, htmlDecodeByRegExp, guid, numberToLetter } from '../../js/common/utils';

export default {
  name: 'test',
  components: {
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    lesson6,
    lessoneditor1,
    lessoneditor2,
    lessoneditor3,
    lessoneditor4,
    lessoneditor5,
    lessoneditor6
  },
  created() {
    this.lesson = this.$store.state.lesson;
    // console.log(this.lesson, '-->', this.$route.query);
    if (!this.lesson) {
      this.lesson = this.$route.query;
    }
    EventBus.$emit('message_resource_lesson', this.lesson);
    // console.log(this.lesson);
    this.extendWidth = this.columns[5].width + this.columns[6].width + 2;
    this.baseWidth = this.columns[0].width + this.columns[1].width + this.columns[3].width + this.columns[4].width + 3;
    this.importExtendWidth = this.importColumns[5].width + 1;
    this.importBaseWidth = this.importColumns[0].width + this.importColumns[1].width + this.importColumns[3].width + this.importColumns[4].width + 4;
    this.getResType();
    this.testplate();
    this.loadTestType();
    this.loadLessonTopicsData();
  },
  mounted() {
  },
  data() {
    return {
      lesson: {
        type: 0,
        id: 0,
        name: ''
      },
      colors: [
        '#ff0000',
        '#3c3c3c',
        '#006400',
        '#008080',
        '#20b2aa',
        '#2f4f4f',
        '#8a2be2',
        '#8b0000'
      ],
      headerFixed: false,
      siderFixed: false,
      siderCollapsed: false,
      listPlate: [],
      openedPlate: false,
      namePlate: '',
      loadingPlate: false,
      indexPlate: -1,
      buttonTop: 3,
      testType: [],
      testValue: null,
      typeName: '',
      stemKey: '',
      optionKey: '',
      answerKey: '',
      tagKey: '',
      columns: [
        {
          sn: 1,
          // 标题
          title: 'ID',
          // 属性名称
          prop: 'id',
          // 宽度 像素
          width: 32,
          // 类型 1:字符串 2:数字 3:日期 4:列表 5:对象集 6:操作
          type: 2,
          // 对齐 left center right
          align: 'center',
          // 显示
          show: false
        },
        {
          sn: 2,
          title: '序号',
          prop: 'sn',
          width: 50,
          type: 2,
          align: 'center',
          show: true
        },
        {
          sn: 3,
          title: '题目',
          prop: 'title',
          width: undefined,
          type: 1,
          align: 'left',
          show: true
        },
        {
          sn: 4,
          title: '分值',
          prop: 'score',
          type: 2,
          width: 50,
          align: 'center',
          show: true
        },
        {
          sn: 5,
          title: '发布时间',
          prop: 'time',
          width: 120,
          align: 'center',
          type: 3,
          show: true
        },
        {
          sn: 6,
          title: '题目标记',
          prop: 'tags',
          width: 200,
          align: 'center',
          type: 4,
          show: true
        },
        {
          sn: 7,
          title: '操作',
          prop: 'name_course,name_duration,name_year,name_term,name_textbooks,name_unit,name2_chapters',
          width: 155,
          align: 'center',
          type: 6,
          show: true
        }
      ],
      baseWidth: 0,
      extendWidth: 0,
      typeComponentName: '',
      searchKeyWidth: 200,
      searchKeyTop: 15,
      topicsList: [],
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      position: 0,
      drag: {
        start: {
          index: 0,
          id: 0
        },
        end: {
          index: 0,
          id: 0
        }
      },
      openedEditor: false,
      nameEditor: '',
      objEditor: {},
      indexEditor: -1,
      styleEditor: -1,
      openedNew: false,
      selectNewTopicsType: null,
      selectNewTopicsPlate: null,
      selectList: [],
      openImport: false,
      selectImportPlate: null,
      selectImportTopicsType: 1,
      selectImportCourseValue: null,
      selectImportCourse: [],
      selectImportDurationValue: null,
      selectImportDuration: [],
      selectImportYearValue: null,
      selectImportYear: [],
      selectImportTermValue: null,
      selectImportTerm: [],
      selectImportTextbooksValue: null,
      selectImportTextbooks: [],
      selectImportUnitValue: null,
      selectImportUnit: [],
      selectImportChapters2Value: null,
      selectImportChapters2: [],
      selectImportDateBothChoose: false,
      selectImportDateFormat: 'YYYY-MM-DD',
      selectImportTopicsTime: {},
      selectImportTopicsTitle: '',
      selectImportTopicsOption: '',
      selectImportTopicsAnswer: '',
      selectImportTopicsCaption: '',
      selectImportTopicsTag: '',
      selectImportTopicsRemarks: '',
      selectImportTopicsMinScore: null,
      selectImportTopicsMaxScore: null,
      selectImportTopicsUser: '',
      selectImportTopicsGrade: '',
      selectImportTopicsChapters: '',
      selectImportTopicsList: [],
      selectImportPagination: {
        page: 1,
        size: 10,
        total: 0
      },
      importColumns: [
        {
          sn: 1,
          // 标题
          title: 'ID',
          // 属性名称
          prop: 'id',
          // 宽度 像素
          width: 32,
          // 类型 1:字符串 2:数字 3:日期 4:列表 5:对象集 6:操作
          type: 2,
          // 对齐 left center right
          align: 'center',
          // 显示
          show: false
        },
        {
          sn: 2,
          title: '序号',
          prop: 'sn',
          width: 50,
          type: 2,
          align: 'center',
          show: true
        },
        {
          sn: 3,
          title: '题目',
          prop: 'title',
          width: undefined,
          type: 1,
          align: 'left',
          show: true
        },
        {
          sn: 4,
          title: '分值',
          prop: 'score',
          type: 2,
          width: 50,
          align: 'center',
          show: true
        },
        {
          sn: 5,
          title: '发布时间',
          prop: 'time',
          width: 120,
          align: 'center',
          type: 3,
          show: true
        },
        {
          sn: 6,
          title: '题目标记',
          prop: 'tags',
          width: 150,
          align: 'center',
          type: 4,
          show: true
        }
      ],
      importExtendWidth: 0,
      importBaseWidth: 0,
      importSelectList: [],
      listScience: [],
      selectScienceId: null,
      listPeriod: [],
      selectPeriodId: null,
      listGrade: [],
      selectGradeId: null,
      listMaterial: [],
      selectMaterialId: null,
      listChapters: [],
      selectChaptersId: null,
      listResourceTypeAll: []
    };
  },
  methods: {
    /**
     * 获取行颜色
     * @returns {*}
     */
    getColor() {
      let max = this.colors.length;
      return this.colors[getRandomInt(max)];
    },
    /**
     * 获取资源类型
     */
    getResType() {
      let url = '/resource/typeall';
      let param = {
        retain: 0
      };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          console.log(resp);
          this.listResourceTypeAll = resp.body;
          this.listScience = [];
          for (let i = 0; i < resp.body.length; i++) {
            this.listScience.push({
              id: resp.body[i].id,
              title: resp.body[i].title
            });
          }
          console.log('学科:', this.listScience);
        } else {
          this.$Message.error(`获取资源类型-->失败-->${resp.msg}`);
        }
      });
    },
    selectedScience() {
      this.listPeriod = [];
      this.selectPeriodId = null;
      this.listMaterial = [];
      this.selectMaterialId = null;
      this.listGrade = [];
      this.selectGradeId = null;
      this.listChapters = [];
      this.selectChaptersId = null;
      console.log('选择：', this.selectScienceId);
      if (this.selectScienceId && this.selectScienceId > 0) {
        let _index = this.listResourceTypeAll.findIndex(t => t.id == this.selectScienceId);
        if (_index == -1 || !this.listResourceTypeAll[_index].children || this.listResourceTypeAll[_index].children.length == 0) {
          console.log('没有子级分类');
          return;
        }
        console.log('2级别：', this.listResourceTypeAll[_index].children);
        for (let i = 0; i < this.listResourceTypeAll[_index].children.length; i++) {
          this.listPeriod.push({
            id: this.listResourceTypeAll[_index].children[i].id,
            title: this.listResourceTypeAll[_index].children[i].title
          });
        }
      }
    },
    selectedPeriod() {
      this.listMaterial = [];
      this.selectMaterialId = null;
      this.listGrade = [];
      this.selectGradeId = null;
      this.listChapters = [];
      this.selectChaptersId = null;
      if (this.selectScienceId && this.selectScienceId > 0) {
        let _index = this.listResourceTypeAll.findIndex(t => t.id == this.selectScienceId);
        if (_index == -1 || !this.listResourceTypeAll[_index].children || this.listResourceTypeAll[_index].children.length == 0) {
          console.log('没有二级分类');
          return;
        }
        let _index2 = this.listResourceTypeAll[_index].children.findIndex(t => t.id == this.selectPeriodId);
        if (_index2 == -1 || !this.listResourceTypeAll[_index].children[_index2].children || this.listResourceTypeAll[_index].children[_index2].children.length == 0) {
          console.log('没有三级分类');
          return;
        }
        for (let i = 0; i < this.listResourceTypeAll[_index].children[_index2].children.length; i++) {
          this.listMaterial.push({
            id: this.listResourceTypeAll[_index].children[_index2].children[i].id,
            title: this.listResourceTypeAll[_index].children[_index2].children[i].title
          });
        }
      }
    },
    selectedMaterial() {
      this.listGrade = [];
      this.selectGradeId = null;
      this.listChapters = [];
      this.selectChaptersId = null;
      console.log(this.selectScienceId, this.selectPeriodId, this.selectMaterialId);
      if (!this.selectScienceId || !this.selectPeriodId || !this.selectMaterialId) {
        console.log('无效的domain构成参数');
        return;
      }
      let _index1 = this.listResourceTypeAll.findIndex(t => t.id == this.selectScienceId);
      let _science = this.listResourceTypeAll[_index1].key;
      let _index2 = this.listResourceTypeAll[_index1].children.findIndex(t => t.id == this.selectPeriodId);
      let _period = this.listResourceTypeAll[_index1].children[_index2].key;
      let _index3 = this.listResourceTypeAll[_index1].children[_index2].children.findIndex(t => t.id == this.selectMaterialId);
      let _material = this.listResourceTypeAll[_index1].children[_index2].children[_index3].key;
      console.log(_science, _period, _material);
      if (!_material || !_period || !_science) {
        console.log('无效的domain构成数据');
        return;
      }
      let domain = _science * 1000 + _period * 100 + _material;
      let pid = 0;
      let url = '/resource/simple/list';
      let param = {
        domain: domain,
        pid: pid
      };
      console.log('参数：', param);
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          console.log(resp);
          let lg = resp.body;
          for (let i = 0; i < lg.length; i++) {
            this.listGrade.push({
              id: lg[i].id,
              title: lg[i].title
            });
          }
        } else {
          this.$Message.error(`获取年级资源-->失败-->${resp.msg}`);
        }
      });
    },
    selectedGrade() {
      this.listChapters = [];
      this.selectChaptersId = null;
      console.log(this.selectScienceId, this.selectPeriodId, this.selectMaterialId);
      if (!this.selectScienceId || !this.selectPeriodId || !this.selectMaterialId) {
        console.log('无效的domain构成参数');
        return;
      }
      let _index1 = this.listResourceTypeAll.findIndex(t => t.id == this.selectScienceId);
      let _science = this.listResourceTypeAll[_index1].key;
      let _index2 = this.listResourceTypeAll[_index1].children.findIndex(t => t.id == this.selectPeriodId);
      let _period = this.listResourceTypeAll[_index1].children[_index2].key;
      let _index3 = this.listResourceTypeAll[_index1].children[_index2].children.findIndex(t => t.id == this.selectMaterialId);
      let _material = this.listResourceTypeAll[_index1].children[_index2].children[_index3].key;
      console.log(_science, _period, _material);
      if (!_material || !_period || !_science) {
        console.log('无效的domain构成数据');
        return;
      }
      if (!this.selectGradeId) {
        console.log('请选选择年级');
        return;
      }
      let domain = _science * 1000 + _period * 100 + _material;
      let pid = this.selectGradeId;
      let url = '/resource/simple/list';
      let param = {
        domain: domain,
        pid: pid
      };
      console.log('参数：', param);
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          console.log(resp);
          let lg = resp.body;
          for (let i = 0; i < lg.length; i++) {
            this.listChapters.push({
              id: lg[i].id,
              title: lg[i].title
            });
          }
        } else {
          this.$Message.error(`获取章节资源-->失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 课堂习题专题列表
     */
    testplate() {
      let url = '/topics/lesson/topics/plate/list';
      let param = {
        name: ''
      };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          this.listPlate = resp.body;
          if (this.listPlate && this.listPlate.length > 0) {
            for (let i = 0; i < this.listPlate.length; i++) {
              this.listPlate[i].selected = false;
            }
            /*
            this.listPlate.forEach(e => {
              e.selected = false;
            });
            */
          }
          // console.log(this.listPlate);
        } else {
          this.$Message.error(`获取课堂习题专题-->失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 选择板块
     * @param data
     * @param index
     */
    plateSelect(data, index) {
      if (this.listPlate && this.listPlate.length > 0) {
        for (let i = 0; i < this.listPlate.length; i++) {
          if (i == index) {
            this.listPlate[i].selected = !this.listPlate[i].selected;
          } else {
            this.listPlate[i].selected = false;
          }
        }
      }
      this.indexPlate = -1;
      if (this.listPlate && this.listPlate.length > 0) {
        this.indexPlate = this.listPlate.findIndex(p => p.selected);
        // console.log('index-->', selected_index, '--->', this.listPlate);
      }
      this.listPlate.splice(0, 0);
    },
    /**
     * 新增板块
     */
    plateAdd() {
      this.indexPlate = -1;
      this.namePlate = '';
      this.openedPlate = true;
    },
    /**
     * 修改模板
     */
    plateEdit() {
      if (this.indexPlate == -1) {
        this.$Message.error('选择需要修改的模块');
        return;
      }
      this.namePlate = this.listPlate[this.indexPlate].title;
      this.openedPlate = true;
    },
    /**
     * 保存板块
     * @param data
     * @param index
     */
    plateSave() {
      if (!this.namePlate || this.namePlate.trim().length == 0) {
        this.$Message.error('需要输入板块名称');
        return;
      }
      let url = '/topics/lesson/topics/plate/save';
      let param = {
        id: 0,
        title: this.namePlate,
        shared: false,
        remarks: ''
      };
      if (this.indexPlate != -1) {
        param = this.listPlate[this.indexPlate];
        param.title = this.namePlate;
      }
      this.loadingPlate = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loadingPlate = false;
        if (resp.ok) {
          console.log(resp.body);
          this.$Message.success(`保存${this.namePlate}-->成功`);
          this.openedPlate = false;
          if (this.indexPlate == -1) {
            this.listPlate.push(resp.body);
          } else {
            this.listPlate[this.indexPlate] = resp.body;
          }
        } else {
          this.$Message.error(`保存${this.namePlate}-->失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 删除板块
     */
    plateDelete() {
      if (this.indexPlate == -1) {
        this.$Message.error('选择要删除的板块');
        return;
      }
      let name = this.listPlate[this.indexPlate].title;
      let id = this.listPlate[this.indexPlate].id;
      let ids = [];
      ids.push(id);
      Utils.confirm(this, '确定删除板块-->' + name + ' ？', (modal) => {
        modal.close();
        let param = ids;
        // console.log(param);
        let url = '/topics/lesson/topics/plate/delete';
        this.loadingPlate = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loadingPlate = false;
          if (resp.ok) {
            console.log(resp.body);
            this.$Message.success(`删除${this.namePlate}-->成功`);
            this.listPlate.splice(this.indexPlate, 1);
          } else {
            this.$Message.error(`删除${this.namePlate}-->失败-->${resp.msg}`);
          }
        });
      });
    },
    /**
     * 读取题库类型
     */
    loadTestType() {
      let url = '/topics/type/list';
      let param = {};
      let that = this;
      this.loading = true;
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log('没有找到题库类型数据');
          }
          this.testType = resp.body;
          // console.log(this.testType);
        } else {
          this.loading = false;
          console.log('获取题库类型数据，错误-->', resp.msg);
        }
      });
    },
    /**
     * 选择题库类型
     * @param data
     */
    selectTopicsType(data) {
      // console.log(data);
      if (data) {
        this.testValue = data.id;
        this.typeName = data.name;
      } else {
        this.testValue = null;
        this.typeName = '';
      }
    },
    /**
     * 加载数据
     */
    loadLessonTopicsData() {
      let url = '/topics/lesson/topics/page';
      let param = {
        size: this.pagination.size,
        page: this.pagination.page,
        lesson: this.lesson.id
      };
      if (this.testValue && this.testValue > 0) {
        param.type = this.testValue;
      }
      if (this.stemKey && this.stemKey.trim().length > 0) {
        param.title = this.stemKey.trim();
      }
      if (this.optionKey && this.optionKey.trim().length > 0) {
        param.option = this.optionKey.trim();
      }
      if (this.answerKey && this.answerKey.trim().length > 0) {
        param.answer = this.answerKey.trim();
      }
      if (this.tagKey && this.tagKey.trim().length > 0) {
        param.tag = this.tagKey.trim();
      }
      if (this.indexPlate >= 0 && this.listPlate[this.indexPlate]) {
        param.id_plate = this.listPlate[this.indexPlate].id;
      }
      // console.log(param);
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          if (resp.body) {
            if (resp.body.data) {
              this.topicsList = resp.body.data;
              this.handleLessonTopics();
              this.handleLessonTopicsTags();
            }
            if (resp.body.page) {
              this.pagination.page = resp.body.page.page;
              this.pagination.total = resp.body.page.total;
            }
            // console.log(this.topicsList);
            // console.log(this.pagination);
          }
        } else {
          this.$Message.error(`读取课堂习题列表，失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 处理题目
     */
    handleLessonTopics() {
      if (this.topicsList && this.topicsList.length > 0) {
        let sn_s = (this.pagination.page - 1) * this.pagination.size;
        for (let i = 0; i < this.topicsList.length; i++) {
          this.topicsList[i].sn = sn_s + i + 1;
          this.topicsList[i].time = this.topicsList[i].time.substr(0, 10);
          this.topicsList[i].color = this.getColor();
          this.topicsList[i].view = `lesson${this.topicsList[i].id_type}`;
          this.topicsList[i].editor = `lessoneditor${this.topicsList[i].id_type}`;
          this.topicsList[i].uk = guid();
          if (this.topicsList[i].id_type == 6) {
            this.topicsList[i].rtext = htmlDecodeByRegExp(this.topicsList[i].title);
          }
        }
      }
    },
    /**
     * 处理标签
     */
    handleLessonTopicsTags() {
      if (this.topicsList && this.topicsList.length > 0) {
        for (let i = 0; i < this.topicsList.length; i++) {
          if (this.topicsList[i].tags && this.topicsList[i].tags.length > 0) {
            for (let j = 0; j < this.topicsList[i].tags.length; j++) {
              this.topicsList[i].tags[j].color = this.getColor();
            }
          }
        }
      }
    },
    /**
     * 打开编辑器
     */
    open_editor(test, index) {
      // this.editor.title = test.title;
      // this.$refs.fillblank.initData(true, index, test);
      let type = test.id_type;
      this.nameEditor = test.editor;
      this.objEditor = test;
      this.indexEditor = index;
      this.styleEditor = 0;
      this.openedEditor = true;
    },
    /**
     * 关闭编辑器
     * 子组件回调
     */
    close_editor() {
      this.openedEditor = false;
    },
    /**
     * 全新增加数据
     * @param test
     */
    add_before(test) {
      let type = test.id_type;
      let name_type = this.testType[type - 1].name;
      let title_type = `新的${name_type}`;
      let data = {
        id: 0,
        title: title_type,
        id_type: type,
        type: title_type,
        id_plate: test.id_plate,
        id_resource: test.id_resource,
        id_grade: 0,
        grade: '',
        id_chapters: 0,
        chapters: '',
        score: 0,
        reference: 0,
        state: 1,
        order: 0,
        remarks: '',
        tags: [],
        options: [],
        answers: []
      };
      // console.log(data);
      this.nameEditor = test.editor;
      this.objEditor = data;
      this.indexEditor = 0;
      this.styleEditor = 3;
      this.openedEditor = true;
    },
    /**
     * 之前插入数据
     * @param test
     * @param index
     */
    new_before(test, index) {
      let type = test.id_type;
      let name_type = this.testType[type - 1].name;
      let title_type = `新的${name_type}`;
      let data = {
        id: 0,
        title: title_type,
        id_type: type,
        type: title_type,
        id_plate: test.id_plate,
        id_resource: test.id_resource,
        id_grade: 0,
        grade: '',
        id_chapters: 0,
        chapters: '',
        score: 0,
        reference: 0,
        state: 1,
        order: 0,
        remarks: '',
        tags: [],
        options: [],
        answers: []
      };
      // console.log(data);
      this.nameEditor = test.editor;
      this.objEditor = data;
      this.indexEditor = index;
      this.styleEditor = 1;
      this.openedEditor = true;
    },
    /**
     * 之后插入
     * @param test
     * @param index
     */
    new_after(test, index) {
      let type = test.id_type;
      let name_type = this.testType[type - 1].name;
      let title_type = `新的${name_type}`;
      let data = {
        id: 0,
        title: title_type,
        id_type: type,
        type: title_type,
        id_plate: test.id_plate,
        id_resource: test.id_resource,
        id_grade: 0,
        grade: '',
        id_chapters: 0,
        chapters: '',
        score: 0,
        reference: 0,
        state: 1,
        order: 0,
        remarks: '',
        tags: [],
        options: [],
        answers: []
      };
      // console.log(data);
      this.nameEditor = test.editor;
      this.objEditor = data;
      this.indexEditor = index;
      this.styleEditor = 2;
      this.openedEditor = true;
    },
    /**
     * 开始拖动
     * @param evt
     * @param index
     * @param id
     */
    test_drop_start(evt, index, id) {
      this.drag.start.index = index;
      this.drag.start.id = id;
    },
    /**
     * 允许拖动
     * @param evt
     * @param index
     * @param id
     */
    test_drop_over(evt, index, id) {
    },
    /**
     * 拖动完成
     * @param evt
     * @param index
     * @param id
     */
    test_drop_complete(evt, index, id) {
      this.drag.end.index = index;
      this.drag.end.id = id;
      let source = this.drag.start.id;
      let target = this.drag.end.id;
      let url = '/topics/lesson/swap';
      let param = {
        source,
        target
      };
      this.loading = true;
      Ajax.post(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          let swap = this.topicsList[this.drag.start.index];
          this.topicsList[this.drag.start.index] = this.topicsList[this.drag.end.index];
          this.topicsList[this.drag.end.index] = swap;
          this.topicsList.splice(0, 0);
        } else {
          this.$Message.error(`调整${this.topicsList[this.drag.start.index].title}-->${this.topicsList[this.drag.end.index].title}，失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 保存题目
     * 子组件回调
     * @param param
     * @param index
     * @param style
     */
    save_topics(param, index, style) {
      // region 处理题目所属 科目 阶段 版本 年级 章节
      if (this.selectScienceId && this.selectScienceId > 0) {
        param.science = this.selectScienceId;
      }
      if (this.selectPeriodId && this.selectPeriodId > 0) {
        param.period = this.selectPeriodId;
      }
      if (this.selectGradeId && this.selectGradeId > 0) {
        param.grade = this.selectGradeId;
      }
      if (this.selectMaterialId && this.selectMaterialId > 0) {
        param.material = this.selectMaterialId;
      }
      if (this.selectChaptersId && this.selectChaptersId > 0) {
        param.chapters = this.selectChaptersId;
      }
      // endregion
      console.log('回调参数：', param, '--索引：', index, '--方式：', style);
      let url = '/topics/lesson/topics/save';
      this.loading = true;
      let topicsTitle = param.title;
      if (param.id_type == 6) {
        topicsTitle = '问答题';
      }
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        this.openedEditor = false;
        if (resp.ok) {
          let editData = resp.body;
          if (!editData || editData.id == 0) {
            this.$Message.success(`保存题目：${topicsTitle}，成功，但是读取数据错误`);
            return;
          }
          this.$Message.success(`保存题目：${topicsTitle}，成功`);
          this.save_update(editData, index, style);
        } else {
          this.$Message.error(`保存题目：${topicsTitle}，失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 保存后更新数据
     * @param save  编辑后的对象
     * @param index 编辑题目索引
     * @param style 0:编辑 1:之前插入 2:之后插入
     */
    save_update(save, index, style) {
      // region 编辑题目
      if (style == 0) {
        // region 检测编辑前数据
        let sdata = this.topicsList[index];
        if (!sdata) {
          this.$Message.error(`没有找到编辑前的题目：${index}`);
          return;
        }
        // console.log('保存-->', save);
        save.sn = sdata.sn;
        save.time = sdata.time;
        save.color = sdata.color;
        save.view = sdata.view;
        save.editor = sdata.editor;
        save.uk = guid();
        if (save.id_type == 6) {
          save.rtext = htmlDecodeByRegExp(save.title);
        }
        this.topicsList[index] = save;
        // this.handleLessonTopics();
        this.topicsList.splice(0, 0);
        // this.$forceUpdate();
        // endregion
      }
      // endregion
      // region 之前新增
      if (style == 1) {
        let sdata = this.topicsList[index];
        if (!sdata) {
          this.$Message.error(`没有找到编辑前的题目：${index}`);
          return;
        }
        save.sn = sdata.sn;
        save.time = save.time.substr(0, 10);
        save.color = this.getColor();
        save.view = sdata.view;
        save.editor = sdata.editor;
        save.uk = guid();
        if (save.id_type == 6) {
          save.rtext = htmlDecodeByRegExp(save.title);
        }
        for (let i = index; i < this.topicsList.length; i++) {
          this.topicsList[i].sn += 1;
        }
        this.topicsList.splice(index, 0, save);
        this.pagination.total += 1;
      }
      // endregion
      // region 之后新增
      if (style == 2) {
        let sdata = this.topicsList[index];
        if (!sdata) {
          this.$Message.error(`没有找到编辑前的题目：${index}`);
          return;
        }
        save.sn = sdata.sn + 1;
        save.time = save.time.substr(0, 10);
        save.color = this.getColor();
        save.view = sdata.view;
        save.editor = sdata.editor;
        save.uk = guid();
        if (save.id_type == 6) {
          save.rtext = htmlDecodeByRegExp(save.title);
        }
        for (let i = index + 1; i < this.topicsList.length; i++) {
          this.topicsList[i].sn += 1;
        }
        this.topicsList.splice(index + 1, 0, save);
        this.pagination.total += 1;
      }
      // endregion
      // region 全新新增
      if (style == 3) {
        save.sn = 1;
        save.time = save.time.substr(0, 10);
        save.color = this.getColor();
        save.view = `lesson${save.id_type}`;
        save.editor = `lessoneditor${save.id_type}`;
        save.uk = guid();
        if (save.id_type == 6) {
          save.rtext = htmlDecodeByRegExp(save.title);
        }
        for (let i = 0; i < this.topicsList.length; i++) {
          this.topicsList[i].sn += 1;
        }
        this.topicsList.splice(0, 0, save);
        this.pagination.total += 1;
      }
      // endregion
    },
    /**
     * 改变页码
     * @param value
     */
    changePage(value) {
      this.loadLessonTopicsData();
    },
    /**
     * 删除题目
     * @param test
     * @param index
     */
    delete_topics(test, index) {
      let type = test.id_type;
      // console.log(test, '--', type, '--', this.testType, '--', this.testType[type - 1]);
      let name_type = this.testType[type - 1].name;
      let title_topics = test.title;
      let title = `确认要删除-->${name_type}-->${title_topics}?`;
      this.$Confirm(title, '删除题目').then(() => {
        let param = [];
        param.push(test.id);
        let url = '/topics/lesson/topics/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.$Message.success(`删除题目：${title_topics}，成功`);
            for (let i = index; i < this.topicsList.length; i++) {
              this.topicsList[i].sn -= 1;
            }
            this.pagination.total -= 1;
            this.topicsList.splice(index, 1);
          } else {
            this.$Message.error(`删除题目：${title_topics}，失败-->${resp.msg}`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /**
     * 新建题目
     */
    create_topics() {
      this.openedNew = true;
    },
    /**
     * 取消新增题目
     */
    cancelNew() {
      this.openedNew = false;
    },
    /**
     * 确认新增题目
     */
    confirmNew() {
      if (!this.selectNewTopicsType || this.selectNewTopicsType < 0) {
        this.$Message.error('需要选择题型');
        return;
      }
      let test = {
        id_type: this.selectNewTopicsType,
        id_plate: this.selectNewTopicsPlate ? parseInt(this.selectNewTopicsPlate) : 0,
        id_resource: parseInt(this.lesson.id),
        editor: `lessoneditor${this.selectNewTopicsType}`
      };
      // console.log(test);
      this.openedNew = false;
      this.add_before(test);
    },
    /**
     * 删除题目
     */
    delete_topics_list() {
      if (!this.selectList || this.selectList.length == 0) {
        this.$Message.error('选择要删除的题目');
        return;
      }
      let titles = '';
      let param = [];
      for (let id of this.selectList) {
        param.push(id);
        titles += this.topicsList.find(t => t.id == id).title + '<br/>';
      }
      if (titles && titles.length > 0) {
        titles = titles.substr(0, titles.length - 5);
      }
      titles = `确认要删除：<br/>${titles}？`;
      this.$Confirm(titles, '删除题目').then(() => {
        let url = '/topics/lesson/topics/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          this.selectList = [];
          if (resp.ok) {
            this.$Message.success(`删除题目成功`);
            this.loadLessonTopicsData();
          } else {
            this.$Message.error(`删除题目失败-->${resp.msg}`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /**
     * 从题库导入
     */
    import_topics_from_lib() {
      this.importSelectList = [];
      if (!this.selectImportCourse || this.selectImportCourse.length == 0) {
        this.loadDimemsionCourse();
      }
      if (!this.selectImportDuration || this.selectImportDuration.length == 0) {
        this.loadDimemsionDuration();
      }
      if (!this.selectImportYear || this.selectImportYear.length == 0) {
        this.loadDimemsionYear();
      }
      if (!this.selectImportTerm || this.selectImportTerm.length == 0) {
        this.loadDimemsionTerm();
      }
      if (!this.selectImportTextbooks || this.selectImportTextbooks.length == 0) {
        this.loadDimemsionTextbooks();
      }
      if (!this.selectImportUnit || this.selectImportUnit.length == 0) {
        this.loadDimemsionUnit();
      }
      if (!this.selectImportChapters2 || this.selectImportChapters2 == 0) {
        this.loadDimemsionChapters2();
      }
      this.loadSelectImportTopicsData();
      this.openImport = true;
    },
    /**
     * 取消导入
     */
    cancelImport() {
      this.openImport = false;
    },
    /**
     * 确认导入
     */
    confirmImport() {
      // console.log('导入:', this.importSelectList);
      if (!this.importSelectList || this.importSelectList.length == 0) {
        this.$Message.error('选择要导入的题目');
        return;
      }
      let ids = [];
      for (let id of this.importSelectList) {
        ids.push(id);
      }
      let id_plate = this.selectImportPlate ? parseInt(this.selectImportPlate) : 0;
      let id_type = parseInt(this.selectImportTopicsType);
      let param = {
        id_resource: this.lesson.id,
        id_plate: id_plate,
        id_type: id_type,
        shared: false,
        ids: ids
      };
      let url = '/topics/lesson/topics/import';
      // console.log(param);
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        this.openImport = false;
        if (resp.ok) {
          if (resp.body) {
            // console.log('导入结果--->', resp.body);
            this.$Message.success(resp.body.msg);
            this.loadLessonTopicsData();
          }
        } else {
          this.$Message.error(`导入系统题库，失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 读取科目维度
     */
    loadDimemsionCourse() {
      let type = 1;
      let name = '';
      let url = '/topics/own/type/records';
      let param = {
        type: type,
        name: name
      };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到科目维度`);
          }
          this.selectImportCourse = resp.body;
        } else {
          console.log('获取题库科目维度，错误-->', resp.msg);
        }
      });
    },
    /**
     * 读取学制维度
     */
    loadDimemsionDuration() {
      let type = 2;
      let name = '';
      let url = '/topics/own/type/records';
      let param = {
        type: type,
        name: name
      };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到学制维度`);
          }
          this.selectImportDuration = resp.body;
        } else {
          console.log('获取题库学制维度，错误-->', resp.msg);
        }
      });
    },
    /**
     * 读取学制维度
     */
    loadDimemsionYear() {
      let type = 3;
      let name = '';
      let url = '/topics/own/type/records';
      let param = {
        type: type,
        name: name
      };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到学期维度`);
          }
          this.selectImportYear = resp.body;
        } else {
          console.log('获取题库学年维度，错误-->', resp.msg);
        }
      });
    },
    /**
     * 读取学期维度
     */
    loadDimemsionTerm() {
      let type = 4;
      let name = '';
      let url = '/topics/own/type/records';
      let param = {
        type: type,
        name: name
      };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到学期维度`);
          }
          this.selectImportTerm = resp.body;
        } else {
          console.log('获取题库学期维度，错误-->', resp.msg);
        }
      });
    },
    /**
     * 读取教材维度
     */
    loadDimemsionTextbooks() {
      let type = 5;
      let name = '';
      let url = '/topics/own/type/records';
      let param = {
        type: type,
        name: name
      };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到教材维度`);
          }
          this.selectImportTextbooks = resp.body;
        } else {
          console.log('获取题库教材维度，错误-->', resp.msg);
        }
      });
    },
    /**
     * 读取单元维度
     */
    loadDimemsionUnit() {
      let type = 6;
      let name = '';
      let url = '/topics/own/type/records';
      let param = {
        type: type,
        name: name
      };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到单元维度`);
          }
          this.selectImportUnit = resp.body;
        } else {
          console.log('获取题库单元维度，错误-->', resp.msg);
        }
      });
    },
    /**
     * 读取章节维度
     */
    loadDimemsionChapters2() {
      let type = 7;
      let name = '';
      let url = '/topics/own/type/records';
      let param = {
        type: type,
        name: name
      };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到章节维度`);
          }
          this.selectImportChapters2 = resp.body;
        } else {
          console.log('获取题库章节维度，错误-->', resp.msg);
        }
      });
    },
    /**
     * 加载导入数据
     */
    loadSelectImportTopicsData() {
      // region 构建参数
      let state = 1;
      let param = {
        state,
        size: this.selectImportPagination.size,
        page: this.selectImportPagination.page
      };
      if (this.selectImportTopicsType) {
        param.type = parseInt(this.selectImportTopicsType);
      }
      if (this.selectImportTopicsTitle) {
        param.title = this.selectImportTopicsTitle;
      }
      if (this.selectImportTopicsOption) {
        param.option = this.selectImportTopicsOption;
      }
      if (this.selectImportTopicsAnswer) {
        param.answer = this.selectImportTopicsAnswer;
      }
      if (this.selectImportTopicsCaption) {
        param.caption = this.selectImportTopicsCaption;
      }
      if (this.selectImportTopicsTag) {
        param.tag = this.selectImportTopicsTag;
      }
      if (this.selectImportTopicsRemarks) {
        param.remarks = this.selectImportTopicsRemarks;
      }
      if (this.selectImportTopicsMinScore && parseInt(this.selectImportTopicsMinScore) > 0) {
        param.min_score = parseInt(this.selectImportTopicsMinScore);
      }
      if (this.selectImportTopicsMaxScore && parseInt(this.selectImportTopicsMaxScore) > 0) {
        param.max_score = parseInt(this.selectImportTopicsMaxScore);
      }
      if (this.selectImportTopicsUser) {
        param.user = this.selectImportTopicsUser;
      }
      if (this.selectImportTopicsGrade) {
        param.grade = this.selectImportTopicsGrade;
      }
      if (this.selectImportTopicsChapters) {
        param.chapters = this.selectImportTopicsChapters;
      }
      if (this.selectImportTopicsTime) {
        if (this.selectImportTopicsTime.start) {
          param.min_time = this.selectImportTopicsTime.start + ' 00:00:00';
        }
        if (this.selectImportTopicsTime.end) {
          param.max_time = this.selectImportTopicsTime.end + ' 00:00:00';
        }
      }
      if (this.selectImportCourseValue) {
        param.course = (this.selectImportCourse.find(t => t.id == this.selectImportCourseValue)).name;
      }
      if (this.selectImportDurationValue) {
        param.duration = (this.selectImportDuration.find(t => t.id == this.selectImportDurationValue)).name;
      }
      if (this.selectImportYearValue) {
        param.year = (this.selectImportYear.find(t => t.id == this.selectImportYearValue)).name;
      }
      if (this.selectImportTermValue) {
        param.term = (this.selectImportTerm.find(t => t.id == this.selectImportTermValue)).name;
      }
      if (this.selectImportTextbooksValue) {
        param.textbooks = (this.selectImportTextbooks.find(t => t.id == this.selectImportTextbooksValue)).name;
      }
      if (this.selectImportUnitValue) {
        param.unit = (this.selectImportUnit.find(t => t.id == this.selectImportUnitValue)).name;
      }
      if (this.selectImportChapters2Value) {
        param.chapters2 = (this.selectImportChapters2.find(t => t.id == this.selectImportChapters2Value)).name;
      }
      // endregion
      // console.log(param);
      let url = '/topics/page';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          if (resp.body) {
            if (resp.body.data) {
              this.selectImportTopicsList = resp.body.data;
            }
            if (resp.body.page) {
              this.selectImportPagination.page = resp.body.page.page;
              this.selectImportPagination.total = resp.body.page.total;
            }
            this.handleImportLessonTopics();
            this.handleImportLessonTopicsTags();
            console.log(this.selectImportTopicsList);
            console.log(this.selectImportPagination);
          }
        } else {
          this.$Message.error(`读取课堂习题列表，失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 改变导入分页
     */
    selectImportChangePage() {
      this.loadSelectImportTopicsData();
    },
    /**
     * 处理题目
     */
    handleImportLessonTopics() {
      if (this.selectImportTopicsList && this.selectImportTopicsList.length > 0) {
        let sn_s = (this.selectImportPagination.page - 1) * this.selectImportPagination.size;
        for (let i = 0; i < this.selectImportTopicsList.length; i++) {
          this.selectImportTopicsList[i].sn = sn_s + i + 1;
          this.selectImportTopicsList[i].time = this.selectImportTopicsList[i].time.substr(0, 10);
          this.selectImportTopicsList[i].color = this.getColor();
          this.selectImportTopicsList[i].view = `lesson${this.selectImportTopicsList[i].id_type}`;
          if (this.selectImportTopicsList[i].id_type == 6) {
            this.selectImportTopicsList[i].rtext = htmlDecodeByRegExp(this.selectImportTopicsList[i].title);
          }
        }
      }
    },
    /**
     * 处理标签
     */
    handleImportLessonTopicsTags() {
      if (this.selectImportTopicsList && this.selectImportTopicsList.length > 0) {
        for (let i = 0; i < this.selectImportTopicsList.length; i++) {
          if (this.selectImportTopicsList[i].tags && this.selectImportTopicsList[i].tags.length > 0) {
            for (let j = 0; j < this.selectImportTopicsList[i].tags.length; j++) {
              this.selectImportTopicsList[i].tags[j].color = this.getColor();
            }
          }
        }
      }
    },
    /**
     * 变更题型
     */
    importTopicsTypeChange() {
      this.loadSelectImportTopicsData();
    }
  },
  watch: {
    headerFixed() {
      if (!this.headerFixed) {
        this.siderFixed = false;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.arrange_row() {
  display: flex;
  flex-direction: row;
}

.arrange_col() {
  display: flex;
  flex-direction: column;
}

.singe-line {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}

.test_panel {
  .layout_test {
    .layout_head {
      .arrange_row();
      /*position: fixed;*/

      .vsplit {
        margin-top: 3px;
        width: 2px;
        height: 54px;
        background-color: #3c3c3c;
      }

      .hsplit {
        width: 15px;
        height: 60px;
      }
    }

    .layout_body {
      height: calc(100vh - 120px);

      .list_plate {
        .list_plate_box {
          .list_plate_item_box {
            margin-top: 5px;

            .list_plate_item {
              font-size: 15px;
              font-weight: bold;
              .singe-line();
              margin-left: 5px;

              &:hover {
                cursor: pointer;
                color: #ff6600;
              }
            }

            .list_plate_item_selected {
              color: #0077aa;
              font-style: italic;
            }
          }
        }
      }

      .layout_content {

      }
    }
  }
}

.button_icon {
  font-size: 20px;
}

.button_icon_top {
  margin-top: 3px;
}

.search_item {
  margin-top: 10px;
}

.table-head {
  .arrange_row();
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  text-align: center;
  cursor: default;
}

.table-columns {
  margin-left: 1px;
  text-align: center;
}

.table-columns:first-child {
  margin-left: 0px;
}

.table-columns:last-child {
  margin-right: 1px;
}

.table-columns-color {
  background-color: #0077aa;
  color: #ffffff;
}

.lesson_topics_list_box {
  width: 100%;
  height: calc(100vh - 220px);
  overflow-x: hidden;
  overflow-y: auto;
}

.page_box {
  width: 100%;
  height: 60px;
}

.modal-center {
  text-align: center;

  input {
    margin: 40px;
    width: 300px;
  }

  .h-btn {
    margin-bottom: 20px;
  }
}

.table-row {
  .arrange_row();
  margin-top: 2px;

  &:nth-child(even) {
    background-color: #eeeeee;
  }

  .row_title {
    .base_info {
      .arrange_row();
      width: 100%;
      height: 35px;
      line-height: 35px;
      vertical-align: middle;

      .title_info {
        &:hover {
          cursor: pointer;
          background-color: #dddddd;
          border-radius: 5px;
          opacity: 0.5;
        }
      }
    }

    .qa_info {
      margin-top: 3px;
      width: 100%;
    }
  }

  .row_tag {
    overflow-x: hidden;
    overflow-y: auto;

    .tag-item {
      float: left;
      margin-top: 5px;
      margin-left: 5px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .row_act {
  }
}

.new_topics {
  .arrange_row();
  margin-top: 10px;
  height: 35px;
  line-height: 35px;
  vertical-align: middle;

  .select_topics_type {
    .arrange_row();
    margin-left: 10px;
    width: calc(50% - 15px);

    .select_topics_type_title {
      width: 100px;
      text-align: right;
    }

    .select_topics_type_list {
      margin-left: 10px;
      width: 150px;

      & > select {
        width: 100%;
      }
    }
  }
}

.new_button {
  margin-top: 40px;
  width: 100%;
  .arrange_row();
  justify-content: flex-end;
}

.import_layer {
  .head_bar {
    .arrange_row();
    width: 100%;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;

    .head_bar_palte {
      margin-left: 5px;
      width: 100px;
    }

    .head_bar_topics_type {
      margin-left: 5px;
      width: 100px;
    }

    .head_bar_topics_dim_course {
      margin-left: 5px;
      width: 100px;
    }

    .head_bar_topics_dim_duration {
      margin-left: 5px;
      width: 100px;
    }

    .head_bar_topics_dim_year {
      margin-left: 5px;
      width: 100px;
    }

    .head_bar_topics_dim_book {
      margin-left: 5px;
      width: 100px;
    }

    .head_bar_topics_dim_temp {
      margin-left: 5px;
      width: 100px;
    }

    .head_bar_topics_dim_unit {
      margin-left: 5px;
      width: 100px;
    }

    .head_bar_topics_dim_chapters2 {
      margin-left: 5px;
      width: 100px;
    }

    .head_bar_topics_time {
      margin-left: 5px;
      width: 300px;

      & > input {
        width: 100%;
      }
    }
  }

  .head_bar2 {
    .arrange_row();
    margin-top: 5px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;

    .head_bar2_title {
      margin-left: 5px;
      width: 100px;

      & > input {
        width: 100%;
      }
    }

    .search_button_box {
      margin-left: 5px;
      height: 40px;
      width: 100px;
      .arrange_col();

      .button_act {
        width: 100%;
        height: 32px;
        position: relative;

        .button_act_text {
          position: absolute;
          left: 0px;
          top: 0px;
          height: 32px
        }
      }

      .button_bottom {
        width: 100%;
        height: 10px;
      }
    }
  }

  .list_topics {
    margin-top: 3px;
    width: 100%;
    height: calc(100vh - 305px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .list_page {
    margin-top: 3px;
    width: 100%;
    height: 60px;
  }
}

.import_table-head {
  .arrange_row();
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  text-align: center;
  cursor: default;
}

.import_table-row {
  .arrange_row();
  margin-top: 2px;

  &:nth-child(even) {
    background-color: #eeeeee;
  }

  .row_title {
    .base_info {
      .arrange_row();
      width: 100%;
      height: 35px;
      line-height: 35px;
      vertical-align: middle;

      .title_info {
        &:hover {
          cursor: pointer;
          background-color: #dddddd;
          border-radius: 5px;
          opacity: 0.5;
        }
      }
    }

    .qa_info {
      margin-top: 3px;
      width: 100%;
    }
  }

  .row_tag {
    overflow-x: hidden;
    overflow-y: auto;

    .tag-item {
      float: left;
      margin-top: 5px;
      margin-left: 5px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

</style>
