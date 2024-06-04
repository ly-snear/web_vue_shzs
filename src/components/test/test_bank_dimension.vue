<template>
  <div class='h-panel'>
    <div class='h-panel-bar'>
      <span class='h-panel-title'>
        <div class='h-input element_row'>
          <i class='icon iconfont icon-duoweidu' style='font-size: 24px; margin-top: 4px'></i>
          <input type='text' :placeholder='typeName' v-model='searchName' style='margin-left: 5px' />
        </div>
      </span>
      <span class='h-panel-title'>
        <Select v-model='typeValue' :datas='typeList' keyName='id' titleName='title' :deletable='false'
                :filterable='false' @change='selectDimemsionType' style='width: 100px'></Select>
      </span>
      <span class='h-panel-title'>
        <div class='search_button_box'>
          <div><button class='h-btn h-btn-green h-btn-m' style='height: 32px' @click.stop='loadDimemsion'>查询{{ typeName
            }}</button></div>
          <div class='button_bottom'></div>
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='search_button_box'>
          <div><button class='h-btn h-btn-green h-btn-m' style='height: 32px' @click.stop='addTage'>新增{{ typeName
            }}</button></div>
          <div class='button_bottom'></div>
        </div>
      </span>
    </div>
    <div class='h-panel-body'>
      <Row :space='10'>
        <Cell v-for='(item, index) in dimensionList' :key='item.id' width='2'>
          <div class='dim_box'>
            <div v-if='item.edit'>
              <input class='dim_edit' type='text' :placeholder='item.name' v-model='dimensionList[index].old_name'
                     @mousemove.stop='showDeleteEdit(index)' />
            </div>
            <div v-else class='dim_text' :style='"background-color: " + item.bg'
                 @mouseover.stop='showDeleteEdit(index)'>
              {{ index + 1 }}、{{ item.name }}
            </div>
            <div v-if='dimensionList[index].act && !item.edit' class='dim_act'>
              <div class='buttons icon iconfont icon-shanchu' style='color: #ff0000;'
                   @click.stop='deleteTag(index)'></div>
              <div class='buttons icon iconfont icon-xiugai' style='color: #0086b3'
                   @click.stop='startEdit(index)'></div>
            </div>
            <div v-if='dimensionList[index].act && item.edit' class='dim_act'>
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
  name: 'test_bank_dimension',
  data() {
    return {
      searchName: '',
      typeName: '',
      typeValue: null,
      typeList: [],
      dimensionList: [],
      dimensionData: new Map(),
      dimensionColor: [
        '#ff0000',
        '#3c3c3c',
        '#006400',
        '#008080',
        '#20b2aa',
        '#2f4f4f',
        '#8a2be2',
        '#8b0000'
      ]
    };
  },
  created() {
    this.loadDimemsionType();
  },
  methods: {
    /**
     * 读取纬度类型
     */
    loadDimemsionType() {
      let url = '/topics/own/type/list';
      let param = {};
      let that = this;
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log('没有找到纬度分类数据');
          }
          this.typeList = resp.body;
          if (this.typeList && this.typeList.length > 0) {
            this.typeValue = this.typeList[0].id;
            this.typeName = this.typeList[0].title;
            this.loadDimemsion();
          }
          // console.log(this.typeList);
        } else {
          console.log('获取纬度分类数据，错误-->', resp.msg);
        }
      });
    },
    /**
     * 选择维度类型
     * @param data
     */
    selectDimemsionType(data) {
      // console.log(data);
      let selected = this.typeList.find(t => t.id == this.typeValue);
      // console.log(selected);
      if (selected) {
        this.typeName = selected.title;
        this.loadDimemsion();
      }
    },
    /**
     * 获取随机颜色
     * @returns {string}
     */
    getColor() {
      let max = this.dimensionColor.length;
      return this.dimensionColor[getRandomInt(max)];
    },
    /**
     * 读取维度分类数据
     */
    loadDimemsion() {
      let type = parseInt(this.typeValue);
      let name = this.searchName;
      let url = '/topics/own/type/records';
      let param = {
        type: type,
        name: name
      };
      Ajax.get(url, param).then((resp) => {
        // console.log(resp);
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到-->${this.typeName}数据`);
          }
          this.dimensionList = resp.body;
          if (this.dimensionList && this.dimensionList.length > 0) {
            for (let i = 0; i < this.dimensionList.length; i++) {
              this.dimensionList[i].act = false;
              this.dimensionList[i].edit = false;
              this.dimensionList[i].bg = this.getColor();
              this.dimensionList[i].old_name = '';
            }
          }
          this.dimensionData.set(type, this.dimensionList);
        } else {
          console.log('获取' + this.typeName + '数据，错误-->', resp.msg);
        }
      });
    },
    /**
     * 显示删除、编辑
     * @param index
     */
    showDeleteEdit(index) {
      this.hiddenDeleteEdit();
      this.dimensionList[index].act = true;
      this.dimensionList.splice(0, 0);
    },
    /**
     * 隐藏删除编辑
     */
    hiddenDeleteEdit() {
      if (this.dimensionList) {
        for (let i = 0; i < this.dimensionList.length; i++) {
          this.dimensionList[i].act = false;
        }
      }
    },
    /**
     * 开始编辑
     * @param index
     */
    startEdit(index) {
      this.dimensionList[index].old_name = this.dimensionList[index].name;
      this.dimensionList[index].edit = true;
      this.dimensionList.splice(0, 0);
    },
    /**
     * 取消编辑
     * @param index
     */
    cancelEdit(index) {
      this.$Confirm(`确认取消-->${this.dimensionList[index].name}，修改？`, '取消修改').then(() => {
        this.dimensionList[index].edit = false;
        if (this.dimensionList[index].id != 0) {
          this.dimensionList.splice(0, 0);
        } else {
          this.dimensionList.splice(index, 1);
        }
      }).catch(() => {
        // this.dimensionList[index].edit = false;
        // this.dimensionList.splice(0, 0);
        this.$Message.info('已经取消修改');
      });
    },
    /**
     * 编辑完成
     * @param index
     */
    completeEdit(index) {
      let url = '/topics/own/type/save';
      let type = parseInt(this.typeValue);
      let param = {
        id: this.dimensionList[index].id,
        type: type,
        name: this.dimensionList[index].old_name,
        remarks: this.dimensionList[index].remarks
      };
      // console.log('submit-->', param);
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        if (resp.ok) {
          this.loading = false;
          this.$Message.success(`修改${this.typeName}：${this.dimensionList[index].old_name}，成功`);
          this.dimensionList[index].name = this.dimensionList[index].old_name;
          this.dimensionList[index].edit = false;
          let nindex = this.dimensionList.findIndex(t => t.id == 0);
          if (nindex != -1) {
            this.dimensionList[nindex].id = resp.body;
          }
          this.dimensionList.splice(0, 0);
        } else {
          this.loading = false;
          this.$Message.error(`修改${this.typeName}：${this.dimensionList[index].old_name}，失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 新增维度
     */
    addTage() {
      let type = parseInt(this.typeValue);
      let name = this.typeName;
      let newTage = {
        id: 0,
        name: name,
        type: type,
        bg: this.getColor(),
        edit: true,
        act: true
      };
      this.dimensionList.push(newTage);
    },
    /**
     * 删除维度
     * @param index
     */
    deleteTag(index) {
      this.$Confirm(`确认删除${this.typeName}：${this.dimensionList[index].name}？`, `删除${this.typeName}`).then(() => {
        let url = '/topics/own/type/delete';
        let param = [this.dimensionList[index].id];
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          if (resp.ok) {
            this.loading = false;
            let name_tag = this.dimensionList[index].name;
            this.dimensionList.splice(index, 1);
            this.$Message.success(`删除${this.typeName}：${name_tag}，成功`);
          } else {
            this.loading = false;
            this.dimensionList[index].edit = false;
            this.$Message.error(`删除${this.typeName}：${this.dimensionList[index].name}--失败：${resp.msg}`);
          }
        });
      }).catch(() => {
        this.dimensionList[index].edit = false;
        this.dimensionList.splice(0, 0);
        this.$Message.error(`已经取消删除${this.typeName}：${this.dimensionList[index].name}`);
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

.button_bottom {
  width: 100%;
  height: 6px;
}

.dim_box {
  color: #ffffff;
  position: relative;
  height: 35px;

  .dim_edit {
    width: 100%;
    position: absolute;
    top: 15px;
    left: 0px;
  }

  .dim_text {
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

  .dim_act {
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
