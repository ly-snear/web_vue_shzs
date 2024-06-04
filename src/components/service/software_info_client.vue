<template>
  <div class='div-container'>
    <div class='div-title'>
      <div class='div-title-word'>
        软件信息
      </div>
    </div>
    <div class='div-editor' v-html='editor_value'>
    </div>
  </div>
</template>

<script>
import { htmlDecodeByRegExp } from '../../js/common/utils';

export default {
  name: 'software_info_client',
  data() {
    return {
      editor_value: '',
      loading: false
    };
  },
  created() {
    let url = '/support/software/info/get';
    let param = {};
    Ajax.get(url, param).then((resp) => {
      if (resp.ok) {
        if (!resp.body || !resp.body.value) {
          console.log('没有找到软件信息');
          return;
        }
        this.editor_value = htmlDecodeByRegExp(resp.body.value);
        console.log(this.editor_value);
      } else {
        console.log('获取软件信息错误-->', resp.msg);
      }
    });
  },
  mounted() {

  },
  methods: {}
};
</script>

<style lang='less' scoped>
@bg-color: #ffffff;
@title-text-color: #3c3c3c;
@margin-top: 60px;
@margin-left-value: 5px;
@margin-top-value: 5px;
@margin-right-value: 5px;
@margin-bottom-value: 5px;
@container-width: calc(100% - @margin-left-value * 2);
@container-height: calc(100vh - @margin-top-value * 2 - @margin-top);
@container-title-height: 45px;
@button-bg-color: #0086b3;
@button-color: #eeeeee;
@button-ov-bg-color: #0066bb;
@button-ov-color: #ffffff;
/* 居中方法 */
.vertical-align-nny(@height:35px) {
  height: @height;
  line-height: @height;
  vertical-align: middle;
}

/* 行排列 */
.flex-direction-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

/* 标题文本 */
.div-title-text {
  font-size: 18px;
  font-weight: bold;
  color: @title-text-color;
}

/* 按钮 */
.div-button(@height:35px, @top:5px, @pad-left:5px, @pad-right:5px, @margin-left:@margin-left-value, @radio:5px, @icon-size:32px, @text-size:18px) {
  height: @height;
  padding-left: @pad-left;
  padding-right: @pad-right;
  border-radius: @radio;
  background-color: @button-bg-color;
  color: @button-color;
  .flex-direction-row();
  .vertical-align-nny(@height);
  .div-button-icon {
    margin-top: calc((@height - @icon-size) / 2);
    font-size: @icon-size;
    height: @icon-size;
    width: @icon-size;
  }
  .div-button-text {
    margin-left: @margin-left;
    font-size: @text-size;
    height: @height;
    .vertical-align-nny(@height);
  }
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    background-color: @button-ov-bg-color;
    color: @button-ov-color;
  }
}

/* 容器 */
.div-container {
  margin-left: @margin-left-value;
  margin-top: @margin-top-value;
  width: @container-width;
  height: @container-height;
  background-color: @bg-color;

  /* 标题 */

  .div-title {
    width: 100%;
    height: @container-title-height;
    border-bottom: 1px solid #0077aa;
    .vertical-align-nny(@container-title-height);
    .flex-direction-row();

    /* 标题文本 */

    .div-title-word {
      text-align: center;
      .div-title-text();
      flex-grow: 1;
    }

    .div-title-button {
      margin-top: @margin-top-value;
      margin-left: @margin-left-value;
      .div-button();
    }
  }

  /* 编辑器 */

  .div-editor {
    width: 100%;
    margin-top: @margin-top-value;
    height: calc(@container-height - @container-title-height - @margin-top-value);
    overflow: hidden;
  }

  .tox-tinymce-aux {
    display: none !important;
  }
}

</style>
