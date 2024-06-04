<template>
  <div class='h-panel'>
    <div class='h-panel-bar'>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='text' placeholder='题目标题' v-model='topicsTitle' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='text' placeholder='答案标题' v-model='topicsOption' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='text' placeholder='答案内容' v-model='topicsAnswer' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='text' placeholder='连线题标题' v-model='topicsCaption' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='text' placeholder='题目标签' v-model='topicsTag' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='text' placeholder='题目备注' v-model='topicsRemarks' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='number' placeholder='最小分数' v-model='topicsMinScore' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='number' placeholder='最大分数' v-model='topicsMaxScore' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='text' placeholder='上传用户' v-model='topicsUser' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='text' placeholder='适配年级' v-model='topicsGrade' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input'>
          <input type='text' placeholder='适配章节' v-model='topicsChapters' style='margin-left: 5px; width: 100px' />
        </div>
      </span>
    </div>
    <div class='h-panel-bar'>
      <span class='h-panel-title'>
        <Select v-model='testValue' :datas='testType' keyName='id' titleName='name' :deletable='false'
                :filterable='false' style='margin-left: 5px' @change='selectTopicsType'></Select>
      </span>
      <span class='h-panel-title'>
        <Select v-model='courseValue' :datas='course' keyName='id' titleName='name' :deletable='true'
                :filterable='true' style='margin-left: 5px; width: 80px'></Select>
      </span>
      <span class='h-panel-title'>
        <Select v-model='durationValue' :datas='duration' keyName='id' titleName='name' :deletable='true'
                :filterable='true' style='margin-left: 5px; width: 80px'></Select>
      </span>
      <span class='h-panel-title'>
        <Select v-model='yearValue' :datas='year' keyName='id' titleName='name' :deletable='true'
                :filterable='true' style='margin-left: 5px; width: 80px'></Select>
      </span>
      <span class='h-panel-title'>
        <Select v-model='termValue' :datas='term' keyName='id' titleName='name' :deletable='true'
                :filterable='true' style='margin-left: 5px; width: 80px'></Select>
      </span>
      <span class='h-panel-title'>
        <Select v-model='textbooksValue' :datas='textbooks' keyName='id' titleName='name' :deletable='true'
                :filterable='true' style='margin-left: 5px; width: 80px'></Select>
      </span>
      <span class='h-panel-title'>
        <Select v-model='unitValue' :datas='unit' keyName='id' titleName='name' :deletable='true'
                :filterable='true' style='margin-left: 5px; width: 80px'></Select>
      </span>
      <span class='h-panel-title'>
        <Select v-model='chapters2Value' :datas='chapters2' keyName='id' titleName='name' :deletable='true'
                :filterable='true' style='margin-left: 5px; width: 80px'></Select>
      </span>
      <span class='h-panel-title'>
        <DateRangePicker v-model='topicsTime' :format='dateFormat' :bothChoose='dateBothChoose'></DateRangePicker>
      </span>
      <span class='h-panel-title'>
        <div class='search_button_box'>
          <div><button class='h-btn h-btn-green h-btn-m' style='height: 32px'
                       @click.stop='loadTopicsPageList'>查询{{ typeName }}</button></div>
          <div class='button_bottom'></div>
        </div>
      </span>
    </div>
    <div class='h-panel-body'>
      <component :is='typeComponentName' ref='topicsList'></component>
    </div>
    <Loading text='Loading' :loading='loading'></Loading>
  </div>
</template>

<script>
import test1 from './components/test1';
import test2 from './components/test2';
import test3 from './components/test3';
import test4 from './components/test4';
import test5 from './components/test5';
import test6 from './components/test6';
import { EventBus } from '../../js/common/event-bus';

export default {
  name: 'test_bank_Management',
  components: { test1, test2, test3, test4, test5, test6 },
  data() {
    return {
      loading: false,
      topicsTitle: '',
      topicsOption: '',
      topicsAnswer: '',
      topicsCaption: '',
      topicsTag: '',
      topicsRemarks: '',
      topicsMinScore: null,
      topicsMaxScore: null,
      topicsUser: '',
      topicsGrade: '',
      topicsChapters: '',
      dateBothChoose: false,
      dateFormat: 'YYYY-MM-DD',
      topicsTime: {},
      testValue: null,
      typeName: '',
      testType: [],
      courseValue: null,
      course: [],
      durationValue: null,
      duration: [],
      yearValue: null,
      year: [],
      termValue: null,
      term: [],
      textbooksValue: null,
      textbooks: [],
      unitValue: null,
      unit: [],
      chapters2Value: null,
      chapters2: [],
      typeComponentName: '',
      tags: []
    };
  },
  created() {
    this.loadTestType();
  },
  methods: {
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
          if (this.testType && this.testType.length > 0) {
            this.testValue = this.testType[0].id;
            this.typeName = this.testType[0].name;
            this.typeComponentName = `test${this.testValue}`;
          }
          // console.log('组件名称：' + this.typeComponentName);
          this.loadDimemsionCourse();
        } else {
          this.loading = false;
          console.log('获取题库类型数据，错误-->', resp.msg);
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
          this.course = resp.body;
          this.loadDimemsionDuration();
        } else {
          this.loading = false;
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
          this.duration = resp.body;
          this.loadDimemsionYear();
        } else {
          this.loading = false;
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
          this.year = resp.body;
          this.loadDimemsionTerm();
        } else {
          this.loading = false;
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
          this.term = resp.body;
          this.loadDimemsionTextbooks();
        } else {
          this.loading = false;
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
          this.textbooks = resp.body;
          this.loadDimemsionUnit();
        } else {
          this.loading = false;
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
          this.unit = resp.body;
          this.loadDimemsionChapters2();
        } else {
          this.loading = false;
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
          this.chapters2 = resp.body;
          this.loadTags();
        } else {
          this.loading = false;
          console.log('获取题库章节维度，错误-->', resp.msg);
        }
      });
    },
    /**
     * 加载标签列表
     */
    loadTags() {
      let name = '';
      let url = '/topics/tag/list';
      let param = { name };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到章节维度`);
          }
          this.tags = resp.body;
          // console.log(this.tags);
          this.loading = false;
        } else {
          this.loading = false;
          console.log('获取题库标签，错误-->', resp.msg);
        }
      });
    },
    /**
     * 选择题库类型
     * @param data
     */
    selectTopicsType(data) {
      this.testValue = data.id;
      this.typeName = data.name;
      this.typeComponentName = `test${this.testValue}`;
      // EventBus.$emit('selectData', '管理组件...');
      console.log('组件名称：' + this.typeComponentName);
    },
    /**
     * 获取查询参数
     */
    topicsQueryParam2() {
      let type = !this.testValue ? 0 : parseInt(this.testValue);
      let title = this.topicsTitle == null ? '' : this.topicsTitle;
      let option = this.topicsOption == null ? '' : this.topicsOption;
      let answer = this.topicsAnswer == null ? '' : this.topicsAnswer;
      let caption = this.topicsCaption == null ? '' : this.topicsCaption;
      let tag = this.topicsTag == null ? '' : this.topicsTag;
      let remarks = this.topicsRemarks == null ? '' : this.topicsRemarks;
      let min_score = this.topicsMinScore == null ? 0 : parseInt(this.topicsMinScore);
      let max_score = this.topicsMaxScore == null ? 0 : parseInt(this.topicsMaxScore);
      let user = this.topicsUser == null ? '' : this.topicsUser;
      let grade = this.topicsGrade == null ? '' : this.topicsGrade;
      let chapters = this.topicsChapters == null ? '' : this.topicsChapters;
      let min_time = '';
      if (this.topicsTime && this.topicsTime.start) {
        min_time = this.topicsTime.start;
      }
      let max_time = '';
      if (this.topicsTime && this.topicsTime.end) {
        max_time = this.topicsTime.end;
      }
      let course = '';
      if (this.courseValue) {
        course = (this.course.find(t => t.id == this.courseValue)).name;
      }
      let duration = '';
      if (this.durationValue) {
        duration = (this.duration.find(t => t.id == this.durationValue)).name;
      }
      let year = '';
      if (this.yearValue) {
        year = (this.year.find(t => t.id == this.yearValue)).name;
      }
      let term = '';
      if (this.termValue) {
        term = (this.term.find(t => t.id == this.termValue)).name;
      }
      let textbooks = '';
      if (this.textbooksValue) {
        textbooks = (this.textbooks.find(t => t.id == this.textbooksValue)).name;
      }
      let unit = '';
      if (this.unitValue) {
        unit = (this.unit.find(t => t.id == this.unitValue)).name;
      }
      let chapters2 = '';
      if (this.chapters2Value) {
        chapters2 = (this.chapters2.find(t => t.id == this.chapters2Value)).name;
      }
      return {
        type,
        title,
        option,
        answer,
        caption,
        tag,
        remarks,
        min_score,
        max_score,
        user,
        grade,
        chapters,
        min_time,
        max_time,
        course,
        duration,
        year,
        term,
        textbooks,
        unit,
        chapters2
      };
    },
    /**
     * 查询参数
     */
    topicsQueryParam() {
      let state = 1;
      let param = {
        state
      };
      if (this.testValue) {
        param.type = parseInt(this.testValue);
      }
      ;
      if (this.topicsTitle) {
        param.title = this.topicsTitle;
      }
      if (this.topicsOption) {
        param.option = this.topicsOption;
      }
      if (this.topicsAnswer) {
        param.answer = this.topicsAnswer;
      }
      if (this.topicsCaption) {
        param.caption = this.topicsCaption;
      }
      if (this.topicsTag) {
        param.tag = this.topicsTag;
      }
      if (this.topicsRemarks) {
        param.remarks = this.topicsRemarks;
      }
      if (this.topicsMinScore && parseInt(this.topicsMinScore) > 0) {
        param.min_score = parseInt(this.topicsMinScore);
      }
      if (this.topicsMaxScore && parseInt(this.topicsMaxScore) > 0) {
        param.max_score = parseInt(this.topicsMaxScore);
      }
      if (this.topicsUser) {
        param.user = this.topicsUser;
      }
      if (this.topicsGrade) {
        param.grade = this.topicsGrade;
      }
      if (this.topicsChapters) {
        param.chapters = this.topicsChapters;
      }
      if (this.topicsTime) {
        if (this.topicsTime.start) {
          param.min_time = this.topicsTime.start + ' 00:00:00';
        }
        if (this.topicsTime.end) {
          param.max_time = this.topicsTime.end + ' 00:00:00';
        }
      }
      if (this.courseValue) {
        param.course = (this.course.find(t => t.id == this.courseValue)).name;
      }
      if (this.durationValue) {
        param.duration = (this.duration.find(t => t.id == this.durationValue)).name;
      }
      if (this.yearValue) {
        param.year = (this.year.find(t => t.id == this.yearValue)).name;
      }
      if (this.termValue) {
        param.term = (this.term.find(t => t.id == this.termValue)).name;
      }
      if (this.textbooksValue) {
        param.textbooks = (this.textbooks.find(t => t.id == this.textbooksValue)).name;
      }
      if (this.unitValue) {
        param.unit = (this.unit.find(t => t.id == this.unitValue)).name;
      }
      if (this.chapters2Value) {
        param.chapters2 = (this.chapters2.find(t => t.id == this.chapters2Value)).name;
      }
      // console.log(param);
      return param;
    },
    /**
     * 调用子组件方法
     * 整合参数
     */
    loadTopicsPageList() {
      this.$refs.topicsList.loadTopicsPage();
    },
    /**
     * 执行调用
     * @param param
     */
    loadTopicsPageData(param) {
      let url = '/topics/page';
      // console.log('调用参数-->', param);
      return Ajax.postJson(url, param);
    },
    /**
     * 加载控制
     * @param show
     */
    showLoading(show) {
      this.loading = show;
    },
    /**
     * 发送选择数据
     * 子组件调用
     */
    sendSelectListData() {
      let selectListData = {
        course: this.course,
        duration: this.duration,
        year: this.year,
        term: this.term,
        textbooks: this.textbooks,
        unit: this.unit,
        chapters2: this.chapters2,
        tags: this.tags
      };
      return selectListData;
    }
  }
};
</script>

<style lang='less' scoped>
.button_bottom {
  width: 100%;
  height: 6px;
}
</style>
