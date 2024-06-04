<template>
  <div class='test_editor'>
    <!-- 编辑器 -->
    <remote-script src='/static/tinymce/tinymce.min.js' @load='initTinymce'></remote-script>
    <!-- 最小宽度 -->
    <div :style='"width: " + editor.width  + "px;margin-top: " + editor.top + "px;"'></div>
    <!-- 标题 -->
    <div class='editor_title'>{{ title }}</div>
    <!-- 得分 -->
    <div class='form_dim'>
      <!-- 得分 -->
      <div class='item_dim'>
        <div>得分：</div>
        <input type='number' v-model='edata.score' placeholder='题目得分' />
      </div>
    </div>
    <!-- 答案 标签 -->
    <div class='form_tag'>
      <!-- 问答 -->
      <div>
        <div class='form_questions'>
          <textarea :id='id_questions' v-model='question'></textarea>
        </div>
        <div class='form_answers'>
          <textarea :id='id_answer' v-model='answer'></textarea>
        </div>
      </div>
      <!-- 标签 -->
      <div>
        <template v-if='edata.tags'>
          <div v-for='(tag, index) in edata.tags' :key='tag.id + "_" + tag.order' :data-index='index' :data-id='tag.id'
               :data-order='tag.order' :data-tag='tag.id_tag' class='tag_item'>
            <div class='tag_item_title'>
              <Select v-model='edata.tags[index].id_tag' :datas='tags' keyName='id' titleName='name'
                      :deletable='false' @change='tagChange($event, tag, index)'></Select>
            </div>
            <div class='tag_item_btns'>
              <div class='tag_item_btn icon iconfont icon-shanchu' @click='tagDelete($event, tag, index)'></div>
              <div class='tag_item_btn icon iconfont icon-jia' @click='tagAdd($event, tag, index)'></div>
              <div class='tag_item_btn icon iconfont icon-xiangshang' v-if='index>0'
                   @click='tagUp($event, tag, index)'></div>
              <div class='tag_item_btn icon iconfont icon-xiangxia' v-if='index<edata.tags.length-1'
                   @click='tagDown($event, tag, index)'></div>
            </div>
          </div>
        </template>
        <template v-if='!edata.tags || edata.tags.length == 0'>
          <div class='add_button icon iconfont icon-jia' @click='tagNew'></div>
        </template>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class='form_button'>
      <Button icon='h-icon-error' color='red' @click='closeEditor'>取消</Button>
      <Button icon='h-icon-check' color='primary' @click='saveTopics'>保存</Button>
    </div>
  </div>
</template>

<script>
import '../../../js/common/importJs';
import { htmlDecodeByRegExp, htmlEncodeByRegExp, objectClone } from '../../../js/common/utils';
import Person from '../../../js/common/PcdResult';

export default {
  name: 'lessoneditor6',
  props: {
    /**
     * 题目对象
     */
    topics: {
      type: Object,
      default: null,
      required: true
    },
    /**
     * 索引
     */
    index: {
      type: Number,
      default: -1,
      required: true
    },
    /**
     * 打开方式
     * 0:编辑
     * 1:之前插入
     * 2:之后插入
     */
    manner: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      edata: {},
      editor: {
        width: 1200,
        top: 40
      },
      tags: [],
      question: null,
      answer: null,
      title: '编辑问答题',
      id_questions: 'id_questions',
      id_answer: 'id_answer'
    };
  },
  created() {
    this.edata = objectClone(this.topics);
    this.initData();
    this.loadTags();
  },
  methods: {
    /**
     * 处理数据
     */
    initData() {
      this.question = htmlDecodeByRegExp(this.edata.title);
      if (this.edata.answers && this.edata.answers.length == 1) {
        this.answer = htmlDecodeByRegExp(this.edata.answers[0].answer);
      }
    },
    /**
     * 读取标记列表
     */
    loadTags() {
      let name = '';
      let url = '/topics/tag/list';
      let param = { name };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到题目标记`);
          }
          this.tags = resp.body;
        } else {
          console.log('获取题库标签库，错误-->', resp.msg);
        }
      });
    },
    /**
     * 关闭编辑器
     */
    closeEditor() {
      this.$parent.$parent.close_editor();
    },
    /**
     * 检测数据
     * @returns {PcdResult}
     */
    testSave() {
      let person = new Person(false, null, null);
      // region 保存参数
      let param = {
        id: this.edata.id,
        id_type: 6,
        state: 1,
        id_plate: this.edata.id_plate,
        id_resource: this.edata.id_resource
      };
      // endregion
      // region 检测数据
      if (!this.edata) {
        person = new Person(false, '需要录入题目', null);
        return person;
      }
      // endregion
      // region 检测问题
      let val_questions = tinymce.get(this.id_questions).getContent();
      if (!val_questions || val_questions.length == 0) {
        person = new Person(false, '需要问答题问题', null);
        return person;
      }
      param.title = htmlEncodeByRegExp(val_questions);
      // endregion
      // region 检测答案
      let val_answer = tinymce.get(this.id_answer).getContent();
      if (!val_answer || val_answer.length == 0) {
        person = new Person(false, '需要问答题答案', null);
        return person;
      }
      if (!this.edata.answers || this.edata.answers.length == 0) {
        this.edata.answers = [];
        this.edata.answers.push(
          {
            id: 0,
            order: 1,
            answer: val_answer,
            score: 0,
            remarks: ''
          }
        );
      }
      // endregion
      // region 检测积分
      if (this.edata.score && this.edata.score > 0) {
        param.score = parseFloat(this.edata.score);
      }
      // endregion
      // region 处理答案
      if (!this.edata.answers || this.edata.answers.length == 0) {
        person = new Person(false, '需要录入题目答案', null);
        return person;
      }
      param.answers = [];
      let option = {
        answer: htmlEncodeByRegExp(val_answer),
        score: 0
      };
      param.answers.push(option);
      //
      // endregion
      // region 问题标记
      if (this.edata.tags && this.edata.tags.length > 0) {
        param.tags = [];
        for (let i = 0; i < this.edata.tags.length; i++) {
          let tag = {
            id_tag: this.edata.tags[i].id_tag
          };
          param.tags.push(tag);
        }
      }
      // endregion
      person = new Person(true, null, param);
      return person;
    },
    /**
     * 保存问答题
     */
    saveTopics() {
      let result = this.testSave();
      if (!result.rst) {
        this.$Message.error(result.msg);
        return;
      }
      let param = result.data;
      // console.log('参数：', param);
      this.$parent.$parent.save_topics(param, this.index, this.manner);
    },
    /**
     * 初始化编辑器
     */
    initTinymce() {
      tinymce.init({
        selector: '#' + this.id_questions,
        language: 'zh_CN',
        plugins: ['link', 'image', 'emoticons', 'table'],
        menubar: false,
        toolbar: 'bold italic | forecolor backcolor | link image | alignleft aligncenter alignright | emoticons | table',
        height: '100%',
        width: '100%',
        images_upload_url: 'https://yiqi.nnyun.net/FileAction/UploadTinyMCEFileV2',
        images_upload_base_path: '',
        file_picker_callback: function (callback, value, meta) {
          let file_type = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
          let input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', file_type);
          input.click();
          input.onchange = function () {
            let file = this.files[0];
            let xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', '/FileAction/UploadTinyMCEFileV2');
            xhr.onload = function () {
              let json;
              if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
              }
              json = JSON.parse(xhr.responseText);
              if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
              }
              callback(json.location, { text: file.name });
            };
            formData = new FormData();
            formData.append('file', file, file.name);
            xhr.send(formData);
          };
        }
      });
      tinymce.init({
        selector: '#' + this.id_answer,
        language: 'zh_CN',
        plugins: ['link', 'image', 'emoticons', 'table'],
        menubar: false,
        toolbar: 'bold italic | forecolor backcolor | link image | alignleft aligncenter alignright | emoticons | table',
        height: '100%',
        width: '100%',
        images_upload_url: 'https://yiqi.nnyun.net/FileAction/UploadTinyMCEFileV2',
        images_upload_base_path: '',
        file_picker_callback: function (callback, value, meta) {
          let file_type = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
          let input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', file_type);
          input.click();
          input.onchange = function () {
            let file = this.files[0];
            let xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', '/FileAction/UploadTinyMCEFileV2');
            xhr.onload = function () {
              let json;
              if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
              }
              json = JSON.parse(xhr.responseText);
              if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
              }
              callback(json.location, { text: file.name });
            };
            formData = new FormData();
            formData.append('file', file, file.name);
            xhr.send(formData);
          };
        }
      });
    },
    /**
     * 新增标记
     */
    tagNew() {
      if (this.edata.tags == null) {
        this.edata.tags = [];
      }
      let tag = {
        id: this.edata.id,
        order: 1,
        id_tag: null,
        tag: ''
      };
      this.edata.tags.push(tag);
    },
    /**
     * 向上移动
     * @param evt
     * @param tag
     * @param index
     */
    tagUp(evt, tag, index) {
      if (index == 0) {
        this.$Message.error(`已经到顶啦`);
        return;
      }
      let m = this.edata.tags[index];
      this.edata.tags[index] = this.edata.tags[index - 1];
      this.edata.tags[index - 1] = m;
      this.edata.tags.splice(0, 0);
    },
    /**
     * 向下移动
     * @param evt
     * @param opt
     * @param index
     */
    tagDown(evt, tag, index) {
      if (index == this.edata.tags.length - 1) {
        this.$Message.error(`已经到底啦`);
        return;
      }
      let m = this.edata.tags[index];
      this.edata.tags[index] = this.edata.tags[index + 1];
      this.edata.tags[index + 1] = m;
      this.edata.tags.splice(0, 0);
    },
    /**
     * 新增标记
     * @param evt
     * @param opt
     * @param index
     */
    tagAdd(evt, tag, index) {
      let order = tag.order;
      for (let i = index + 1; i < this.edata.tags.length; i++) {
        this.edata.tags[i].order += 1;
      }
      let newTag = objectClone(tag);
      newTag.order = tag.order + 1;
      newTag.id_tag = null;
      newTag.tag = '';
      this.edata.tags.splice(index + 1, 0, newTag);
    },
    /**
     * 修改标记
     * @param evt
     * @param tag
     * @param index
     */
    tagChange(evt, tag, index) {
      let ttag = this.edata.tags.filter(t => t.id_tag == evt.id);
      if (ttag && ttag.length > 1) {
        this.$Message.error(`标记：${evt.name}，已经存在`);
        this.edata.tags[index].id_tag = null;
        for (let i = index + 1; i < this.edata.tags.length; i++) {
          this.edata.tags[i].order -= 1;
        }
        this.edata.tags.splice(index, 1);
        return;
      }
      this.edata.tags[index].tag = evt.name;
    },
    /**
     * 删除标记
     * @param evt
     * @param opt
     * @param index
     */
    tagDelete(evt, tag, index) {
      this.$Confirm(`确认删除：${tag.tag}`, '删除标记').then(() => {
        for (let i = index + 1; i < this.edata.tags.length; i++) {
          this.edata.tags[i].order -= 1;
        }
        this.edata.tags.splice(index, 1);
        if (this.edata.tags.length == 0) {
          this.edata.tags = null;
        }
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    }
  }
};
</script>

<style lang='less' scoped>
.singe-line {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}

.arrange_row() {
  display: flex;
  flex-direction: row;
}

.arrange_col() {
  display: flex;
  flex-direction: column;
}

.test_editor {

  .editor_title {
    .singe-line();
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: #3c3c3c;
  }

  .form_title {
    margin-top: 10px;
    width: 100%;
    .arrange_row();

    & > div {
      width: 50px;
      line-height: 32px;
      vertical-align: middle;
    }

    & > input {
      flex-grow: 1;
    }
  }

  .form_dim {
    margin-top: 10px;
    width: 100%;
    .arrange_row();

    .item_dim {
      flex: 1;
      margin-left: 5px;
      .arrange_row();

      & > div:first-child {
        width: 50px;
        line-height: 32px;
        vertical-align: middle;
      }

      & > input {
        flex-grow: 1;
        width: 140px;
      }

      & > div:last-child {
        flex-grow: 1;
        width: 140px;
      }

      &:first-child {
        margin-left: 0px;
      }
    }
  }

  .form_tag {
    margin-top: 10px;
    width: 100%;
    height: calc(60vh - 110px);
    .arrange_row();

    & > div:first-child {
      .arrange_row();
      flex-grow: 1;
      width: 100%;
      height: 100%;

      .form_questions {
        width: calc(50% - 5px);
        height: 100%;
      }

      .form_answers {
        margin-left: 10px;
        width: calc(50% - 5px);
        height: 100%;
      }
    }

    & > div:last-child {
      margin-left: 5px;
      width: 342px;
      .arrange_col();

      .tag_item {
        margin-top: 8px;
        width: 100%;
        height: 35px;
        .arrange_row();
        /*
        &:nth-child(2n+1) > div {
          &:hover {
            cursor: pointer;
            background-color: #0077aa;
            color: #ffffff;
          }
        }

        &:nth-child(2n) > div {
          background-color: #0077aa;
          color: #ffffff;

          &:hover {
            cursor: pointer;
            background-color: #0080bb;
            color: #dddddd;
          }
        }
        */

        .tag_item_title {
          flex-grow: 1;
          /*
          line-height: 35px;
          vertical-align: middle;
          font-size: 16px;
          text-indent: 6px;
          */
        }

        .tag_item_btns {
          margin-left: 5px;
          width: 143px;
          .arrange_row();

          .tag_item_btn {
            margin-left: 5px;
            width: 32px;
            font-size: 32px;
            background-color: #00a573;
            color: #ffffff;
            border-radius: 5px;

            &:first-child {
              margin-left: 0px;
            }

            &:hover {
              cursor: pointer;
              background-color: #00a983;
              color: #eeeeee;
            }
          }
        }
      }
    }
  }

  .form_button {
    margin-top: 80px;
    width: 100%;
    .arrange_row();
    justify-content: flex-end;
  }

  .add_button {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 48px;
    background-color: #0077aa;
    color: #ffffff;
    width: 48px;
    height: 48px;
    border-radius: 24px;

    &:hover {
      background-color: #0088bb;
      color: #eeeeee;
      cursor: pointer;
    }
  }
}
</style>
