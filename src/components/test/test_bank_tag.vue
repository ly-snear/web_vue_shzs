<template>
  <div class='h-panel'>
    <div class='h-panel-bar'>
      <span class='h-panel-title'>
        <div class='h-input element_row'>
          <i class='icon iconfont icon-biaoqian1' style='font-size: 24px; margin-top: 4px'></i>
          <input type='text' placeholder='标签' v-model='tag_name' style='margin-left: 5px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='search_button_box'>
          <div><button class='h-btn h-btn-green h-btn-m' style='height: 32px'
                       @click.stop='loadTageData'>查询标签</button></div>
          <div class='search_button_bottom'></div>
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='search_button_box'>
          <div><button class='h-btn h-btn-green h-btn-m' style='height: 32px' @click.stop='addTage'>新增标签</button></div>
          <div class='search_button_bottom'></div>
        </div>
      </span>
    </div>
    <div class='h-panel-body'>
      <Row :space='10'>
        <Cell v-for='(item, index) in tag_list' :key='item.id' width='2'>
          <div class='tag_box'>
            <div v-if='item.edit'>
              <input class='tag_edit' type='text' :placeholder='item.name' v-model='tag_list[index].old_name'
                     @mousemove.stop='showDeleteEdit(index)' />
            </div>
            <div v-else class='tag_text' :style='"background-color: " + item.bg'
                 @mouseover.stop='showDeleteEdit(index)'>
              {{ index + 1 }}、{{ item.name }}
            </div>
            <div v-if='tag_list[index].act && !item.edit' class='tag_act'>
              <div class='buttons icon iconfont icon-shanchu' style='color: #ff0000;'
                   @click.stop='deleteTag(index)'></div>
              <div class='buttons icon iconfont icon-xiugai' style='color: #0086b3'
                   @click.stop='startEdit(index)'></div>
            </div>
            <div v-if='tag_list[index].act && item.edit' class='tag_act'>
              <div class='buttons icon iconfont icon-shanchu6' style='color: #ff0000;'
                   @click.stop='cancelEdit(index)'></div>
              <div class='buttons icon iconfont icon-duihao' style='color: #0086b3'
                   @click.stop='completeEdit(index)'></div>
            </div>
          </div>
        </Cell>
      </Row>
    </div>
  </div>
</template>

<script>
import { getRandomInt } from '../../js/common/utils';

export default {
  name: 'test_bank_tag',
  data() {
    return {
      tag_name: '',
      tag_color: [
        '#ff0000',
        '#3c3c3c',
        '#006400',
        '#008080',
        '#20b2aa',
        '#2f4f4f',
        '#8a2be2',
        '#8b0000'
      ],
      tag_list: [],
      loading: false
    };
  },
  created() {
    // region 加载题库标签
    this.loadTageData();
    // endregion
  },
  methods: {
    /**
     * 加载标签数据
     */
    loadTageData() {
      let url = '/topics/tag/list';
      let param = {};
      if (this.tag_name) {
        param.name = this.tag_name;
      }
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log('没有找到标签数据');
          }
          // console.log(resp.body);
          this.tag_list = resp.body;
          for (let i = 0; i < this.tag_list.length; i++) {
            this.tag_list[i].bg = this.getColor();
            this.tag_list[i].edit = false;
            this.tag_list[i].act = false;
          }
        } else {
          console.log('获取标签数据，错误-->', resp.msg);
        }
      });
    },
    /**
     * 获取随机颜色
     * @returns {string}
     */
    getColor() {
      let max = this.tag_color.length;
      return this.tag_color[getRandomInt(max)];
    },
    /**
     * 显示删除、编辑
     * @param index
     */
    showDeleteEdit(index) {
      this.hiddenDeleteEdit();
      this.tag_list[index].act = true;
      this.tag_list.splice(0, 0);
    },
    /**
     * 隐藏删除编辑
     * @param index
     */
    hiddenDeleteEdit() {
      if (this.tag_list) {
        for (let i = 0; i < this.tag_list.length; i++) {
          this.tag_list[i].act = false;
        }
      }
    },
    /**
     * 开始编辑
     * @param index
     */
    startEdit(index) {
      this.tag_list[index].old_name = this.tag_list[index].name;
      this.tag_list[index].edit = true;
      this.tag_list.splice(0, 0);
    },
    /**
     * 编辑完成
     * @param index
     */
    completeEdit(index) {
      let url = '/topics/tag/save';
      let param = {
        id: this.tag_list[index].id,
        name: this.tag_list[index].old_name,
        remarks: this.tag_list[index].remarks
      };
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        if (resp.ok) {
          this.loading = false;
          this.$Message.success(`修改标签：${this.tag_list[index].old_name}，成功`);
          this.tag_list[index].name = this.tag_list[index].old_name;
          this.tag_list[index].edit = false;
          let nindex = this.tag_list.findIndex(t => t.id == 0);
          if (nindex != -1) {
            // console.log('Index:' + nindex + '-->', this.tag_list);
            this.tag_list[nindex].id = resp.body;
          }
          this.tag_list.splice(0, 0);
        } else {
          this.loading = false;
          this.$Message.error(`修改标签：${this.tag_list[index].old_name}，失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 取消编辑
     * @param index
     */
    cancelEdit(index) {
      this.$Confirm(`确认取消对标签：${this.tag_list[index].name}的修改？`, '取消修改').then(() => {
        this.tag_list[index].edit = false;
        if (this.tag_list[index].id != 0) {
          this.tag_list.splice(0, 0);
        } else {
          this.tag_list.splice(index, 1);
        }
      }).catch(() => {
        this.tag_list[index].edit = false;
        this.tag_list.splice(0, 0);
        this.$Message.info('已经取消修改');
      });
    },
    /**
     * 新增标签
     */
    addTage() {
      let newTage = {
        id: 0,
        name: '标签',
        bg: this.getColor(),
        edit: true,
        act: true
      };
      this.tag_list.push(newTage);
    },
    /**
     * 删除标签
     * @param index
     */
    deleteTag(index) {
      this.$Confirm(`确认删除标签：${this.tag_list[index].name}？`, '删除标签').then(() => {
        let url = '/topics/tag/delete';
        let param = [this.tag_list[index].id];
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          if (resp.ok) {
            this.loading = false;
            let name_tag = this.tag_list[index].name;
            this.tag_list.splice(index, 1);
            this.$Message.success(`删除标签：${name_tag}，成功`);
          } else {
            this.loading = false;
            this.tag_list[index].edit = false;
            this.$Message.error(`删除标签：${this.tag_list[index].name}--失败：${resp.msg}`);
          }
        });
      }).catch(() => {
        this.tag_list[index].edit = false;
        this.tag_list.splice(0, 0);
        this.$Message.error(`已经取消删除标签：${this.tag_list[index].name}`);
      });
    }
  }
};
</script>

<style lang='less' scoped>
.arrange_row() {
  display: flex;
  flex-direction: row;
}

.element_row {
  .arrange_row()
}

.search_button_bottom {
  width: 100%;
  height: 6px;
}

.tag_box {
  color: #ffffff;
  position: relative;
  height: 35px;

  .tag_edit {
    width: 100%;
    position: absolute;
    top: 15px;
    left: 0px;
  }

  .tag_text {
    position: absolute;
    top: 15px;
    left: 0px;
    padding: 5px;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      color: #dddddd;
    }
  }

  .tag_act {
    position: absolute;
    width: 54px;
    height: 24px;
    left: 50px;
    top: 0px;
    display: flex;
    flex-direction: row;

    .buttons {
      margin-left: 2px;
      width: 24px;
      font-size: 24px;

      &:hover {
        cursor: pointer;
        color: #ff6600;
      }
    }
  }
}
</style>
