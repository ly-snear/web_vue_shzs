<template>
  <div class='test_title'>
    <div v-for='(item, index) in items' :key='item.id' :data-idex='index'
         :class='item.type == 1?"test_item":"test_item fill_item"'>{{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'lesson5',
  props: {
    /**
     * 题目对象
     */
    topics: {
      type: Object,
      default: null,
      required: true
    }
  },
  created() {
    this.answers = this.topics.answers;
    // console.log('填空题--', this.answers);
    this.parseData();
  },
  data() {
    return {
      keyStr: '^',
      answers: [],
      items: []
    };
  },
  methods: {
    parseData() {
      let titles = this.topics.title.split(this.keyStr);
      if (!titles || titles.length == 1) {
        console.log(`${this.topics.title}，没有找到问题`);
        return;
      }
      let fills = titles.length - 1;
      if (!this.topics.answers) {
        console.log(`${this.topics.title}，没有找到答案`);
        return;
      }
      if (fills != this.topics.answers.length) {
        console.log(`${this.topics.title}，问题与答案数量不匹配`);
        return;
      }
      for (let i = 0; i < titles.length; i++) {
        let cp = {
          type: 1,
          index: i,
          title: titles[i]
        };
        this.items.push(cp);
        if (i < this.topics.answers.length) {
          let sw = {
            type: 2,
            index: i,
            title: this.topics.answers[i].answer
          };
          this.items.push(sw);
        }
      }
      // console.log('r-->', this.items);
    }
  }
};
</script>

<style lang='less' scoped>

.test_title {
  width: 100%;

  .test_item {
    margin-top: 5px;
    float: left;
    height: 35px;
    line-height: 35px;
    vertical-align: middle;
  }

  .fill_item {
    color: #00a983;
    border-bottom: 1px solid #00fcaf;
  }
}

</style>
