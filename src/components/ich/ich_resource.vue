<template>
  <div class='h-panel'>
    <div class='h-panel-bar'>
      <!-- 城市名称 -->
      <input class='search_text' type='text' placeholder='非遗城市' v-model='city' />
      <!-- 城市名称 -->
      <input class='search_text' type='text' placeholder='非遗分类' v-model='type' />
      <!-- 资源名称 -->
      <input class='search_text' type='text' placeholder='资源名称' v-model='name' />
      <!-- 资源分类 -->
      <span class='h-panel-title search_item'>
        <Select v-model='category' :datas='categorys' keyName='id' titleName='name' placeholder='选择资源类型'
                :deletable='true'
                :filterable='false'></Select>
      </span>
      <!-- 搜索按钮 -->
      <span class='h-panel-title'>
        <div class='search_button'>
          <div class='search_button_item'><button class='h-btn h-btn-green h-btn-m' @click.stop='loadIchCityResource'>查询资源</button></div>
          <div class='search_button_bottom'></div>
        </div>
      </span>
      <!-- 新增按钮 -->
      <span class='h-panel-title'>
        <div class='search_button'>
          <div class='search_button_item'><button class='h-btn h-btn-green h-btn-m'
                                                  @click.stop='addResource'>新增资源</button></div>
          <div class='search_button_bottom'></div>
        </div>
      </span>
      <!-- 删除按钮 -->
      <span class='h-panel-title'>
        <div class='search_button'>
          <div class='search_button_item'><button class='h-btn h-btn-green h-btn-m' @click.stop='deleteCityResource'>删除资源</button></div>
          <div class='search_button_bottom'></div>
        </div>
      </span>
    </div>
    <div class='h-panel-body resource_panel'>
      <div class='table_head'>
        <template v-for='(item, i) in columns'>
          <div class='table_column' v-if='item.show' :key='item.sn' :data-index='i'
               :style='item.width?"width: " + item.width + "px":"flex-grow:1"' @click='tableTitle($event, i)'>
            {{ item.title }}
          </div>
        </template>
      </div>
      <div class='table_body'>
        <!-- 遍历数据行 -->
        <div v-for='(row, i) in resources' :key='row.id' class='table_row' :data-index='i' :data-id='row.id'
             :data-region='row.region' :style='"border-bottom: 1px solid " + row.color'>
          <!-- 遍历数据列 -->
          <!-- -- 正常数据 -- -->
          <template v-if='!row.isNew'>
            <template v-for='(col, j) in columns'>
              <div class='table_column' v-if='col.show' :key='i + "_" + row.id + "_" + col.sn' :data-index='j'
                   :style='(col.width?"width: " + col.width + "px":"flex-grow:1") + "; text-align: " + col.align + ";"'>
              <span v-if='col.type == 0'>
                <Checkbox :value=' i + "_" + row.id + "_" + row.region' v-model='selecteds'></Checkbox>
              </span>
                <span v-if='col.type == 1'>
                  <span v-if='j==3' class='preview_resource' @click.stop='previewResource($event, i)'>
                    {{ row[col.prop] }}
                  </span>
                  <span v-else>
                    {{ row[col.prop] }}
                  </span>
                </span>
                <span v-if='col.type == 2'>{{ row[col.prop] }}、</span>
                <span v-if='col.type == 6'>
                <Row>
                  <Cell width='24'>
                    <Button icon='h-icon-close' color='red' @click.stop='deleteResource($event, i)'>删除</Button>
                  </Cell>
                </Row>
              </span>
              </div>
            </template>
          </template>
          <!-- -- 新增数据 -- -->
          <template v-if='row.isNew'>
            <template v-for='(col, j) in columns'>
              <div class='table_column' v-if='col.show' :key='row.id + "_" + col.sn' :data-index='j'
                   :style='(col.width?"width: " + col.width + "px":"flex-grow:1") + "; text-align: " + col.align + ";"'>
                <span v-if='j == 2'>
                  <TreePicker :option='region_tree' :useConfirm='true' ref='treepicker' placeholder='选择地区'
                              v-model='region' style='height: 34px;margin-top: 5px'></TreePicker>
                </span>
                <span v-if='j == 3'>
                  <Button color='primary' @click.stop='selectResource'>{{ new_name_resource }}</Button>
                </span>
                <span v-if='j==5'>
                  <Row>
                    <Cell width='24'>
                      <Button color='primary' @click.stop='previewAdd'>预览</Button>
                    </Cell>
                  </Row>
                </span>
                <span v-if='j == 6'>
                  <Row>
                    <Cell width='12'>
                      <Button color='primary' @click.stop='addResourceAction'>保存</Button>
                    </Cell>
                    <Cell width='12'>
                      <Button color='red' @click.stop='addCancel'>取消</Button>
                    </Cell>
                  </Row>
                </span>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
    <div class='h-panel-bar'>
      <Pagination align='center' v-model='pagination' @change='changePage($event)'></Pagination>
    </div>
    <Modal v-model='select_show' v-bind='select_pop' className='select_resources'>
      <div :style='"width: " + select_width  + ";"'></div>
      <!-- 工具栏 -->
      <div class='type_name'>
        <!-- 非遗目录 -->
        <span class='select_type'>
          <Select v-model='select_id_type' :datas='select_types' keyName='id' titleName='name' :deletable='true'
                  :filterable='false' style='margin-left: 5px'></Select>
        </span>
        <!-- 资源名称 -->
        <span class='select_name'>
          <input type='text' placeholder='非遗资源名称' v-model='select_name_resource' />
        </span>
        <!-- 查询数据 -->
        <span class='select_button'>
          <div class='search_button_item'><button class='h-btn h-btn-green h-btn-m'>查询资源</button></div>
          <div class='search_button_bottom'></div>
        </span>
      </div>
      <!-- 资源列表 -->
      <div class='list_data'>
        <div class='list_item' v-for='(item, i) in select_resource' :key='item.id' :data-index='i'
             @click.stop='selectResourceResult($event, i)'>
          <div class='list_item_name'>{{ item.name }}</div>
          <div class='list_item_type'>{{ item.type }}</div>
        </div>
      </div>
      <!-- 分页 -->
      <div class='list_page'>
        <Pagination align='center' v-model='select_pagination' @change='loadSelectResource'></Pagination>
      </div>
    </Modal>
    <Modal v-model='preview_image_show' v-bind='select_pop' className='select_resources'>
      <img :src='preview_image_url' @click.stop='preview_image_show=false' />
    </Modal>
    <Modal v-model='preview_video_show' v-bind='select_pop' className='select_resources'>
      <video controls :src='preview_video_url' autoplay='autoplay' />
    </Modal>
  </div>
</template>

<script>
import { getRandomInt, isInteger } from '../../js/common/utils';

export default {
  name: 'ich_resource',
  data() {
    return {
      picture_ext: '.jpg, .gif, .png, .jpeg, .bmp,  .tif, .tiff, .pcx, .tga, .exif, .fpx, .svg, .psd, .cdr, .pcd, .djvu, .dwg, .dxf, .ufo, .eps, .ai, .raw, .wmf, .webp'.toLowerCase(),
      video_ext: '.mp4, .avi, .wmv, .rmvb, .rm, .flv, .mov, .mkv, .mpeg, .mpg, .3gp, .3g2, .webm, .vob,  .m4v, .f4v, .swf, .flv, .m2v, .asf, .mts, .m2ts, .ts, .tp, .mxf, .roq, .nsv, .yuv, .y4m, .h264, .h265, .x264, .x265, .vp6, .vp7, .vp8, .vp9'.toLowerCase(),
      // 加载等待
      loading: false,
      // 城市名称
      city: '',
      // 非遗类别
      type: '',
      // 资源名称
      name: '',
      // 资源分类
      category: null,
      // 资源分类数据
      categorys: [
        {
          id: 1,
          name: '图片'
        },
        {
          id: 2,
          name: '视频'
        }
      ],
      // 资源列表
      columns: [
        {
          sn: 1,
          // 标题
          title: '全选',
          // 属性名称
          prop: 'checked',
          // 宽度 像素
          width: 48,
          // 类型 0:复选框 1:字符串 2:数字 3:日期 4:列表 5:对象集 6:操作
          type: 0,
          // 对齐 left center right
          align: 'center',
          // 显示
          show: true,
          // 是否执行
          exec: true
        },
        {
          sn: 2,
          title: '序号',
          prop: 'sn',
          width: 50,
          type: 2,
          align: 'center',
          show: true,
          exec: false
        },
        {
          sn: 3,
          title: '城市',
          prop: 'city',
          width: 400,
          type: 1,
          align: 'left',
          show: true,
          exec: false
        },
        {
          sn: 4,
          title: '资源名称',
          prop: 'resource',
          type: 1,
          width: undefined,
          align: 'left',
          show: true,
          exec: false
        },
        {
          sn: 5,
          title: '非遗类型',
          prop: 'name_type',
          width: 80,
          align: 'center',
          type: 1,
          show: true,
          exec: false
        },
        {
          sn: 6,
          title: '资源类型',
          prop: 'type_name',
          width: 100,
          align: 'center',
          type: 1,
          show: true,
          exec: false
        },
        {
          sn: 7,
          title: '操作',
          prop: '',
          width: 120,
          align: 'center',
          type: 6,
          show: true,
          exec: false
        }
      ],
      // 分页数据
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      // 资源数据
      resources: [],
      // 列表颜色
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
      // 选择的资源
      selecteds: [],
      // 新增资源时选择的资源ID
      new_id_resource: 0,
      // 新增资源时选择的资源ID
      new_name_resource: '选择非遗资源',
      // 新增资源时城市导航树
      region_tree: {
        keyName: 'id',
        parentName: 'parent',
        titleName: 'title',
        dataMode: 'list',
        datas: []
      },
      // 新增资源时选择的城市
      region: null,
      // 选择资源库时的非遗分类
      select_types: [],
      // 选择资源库资源分页列表
      select_resource: [],
      // 选择资源库分页
      select_pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      // 选择资源库的非遗分类
      select_id_type: null,
      // 选择资源库资源名称
      select_name_resource: '',
      // 是否显示弹窗
      select_show: false,
      // 选择资源库弹窗属性
      select_pop: {
        closeOnMask: false,
        fullScreen: false,
        middle: true,
        hasMask: true,
        hasDivider: false,
        hasCloseIcon: true,
        draggable: true
      },
      // 选择资源库弹框宽度
      select_width: '80vw',
      // 显示图片预览框
      preview_image_show: false,
      // 图片预览地址
      preview_image_url: '',
      // 显示视频预览框
      preview_video_show: false,
      // 视频预览地址
      preview_video_url: ''
    };
  },
  created() {
    this.loadIchCityResource();
    this.loadCityTree();
    this.loadSelectTypes();
    this.loadSelectResource();
  },
  methods: {
    // region 通用方法
    /**
     * 获取行颜色
     * @returns {*}
     */
    getColor() {
      let max = this.colors.length;
      return this.colors[getRandomInt(max)];
    },
    /**
     * 处理资源数据
     */
    handlResources() {
      if (this.resources && this.resources.length > 0) {
        let colors = this.colors.length;
        let sn = this.pagination.size * (this.pagination.page - 1);
        for (let i = 0; i < this.resources.length; i++) {
          this.resources[i].checked = false;
          this.resources[i].isNew = false;
          this.resources[i].sn = sn + i + 1;
          this.resources[i].type_name = this.resources[i].type == 1 ? '图片' : '视频';
          this.resources[i].color = this.colors[i % colors];
        }
      }
    },
    /**
     * 选择所有本页所有资源
     */
    selectAll() {
      let choices = [];
      if (this.resources && this.resources.length > 0) {
        for (let i = 0; i < this.resources.length; i++) {
          choices.push(`${this.resources[i].id}_${this.resources[i].region}`);
        }
        this.selecteds = choices;
      }
    },
    // endregion
    // region 接口方法
    /**
     * 加载城市非遗资源
     */
    loadIchCityResource() {
      let param = {
        size: this.pagination.size,
        page: this.pagination.page
      };
      if (this.city && this.city.trim().length > 0) {
        param.city = this.city;
      }
      if (this.type && this.type.trim().length > 0) {
        param.type = this.type;
      }
      if (this.name && this.name.trim().length > 0) {
        param.name = this.name;
      }
      if (this.category && this.category > 0) {
        param.category = this.category;
      }
      let url = '/ich/resource/page';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.pagination.size = resp.body.page.size;
          this.pagination.page = resp.body.page.page;
          this.pagination.total = resp.body.page.total;
          this.resources = resp.body.data;
          this.handlResources();
          // console.log(this.resources);
        } else {
          this.$Message.error(`查询城市非遗资源错误`);
        }
      });
    },
    /**
     * 加载城市导航树
     */
    loadCityTree() {
      let url = '/support/region/tree/data/heyadmin';
      let param = {};
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log('没有找到地区导航树数据');
          }
          this.region_tree.datas = resp.body;
        } else {
          console.log('获取地区导航树数据，错误-->', resp.msg);
        }
      });
    },
    /**
     * 加载非遗资源库目录
     */
    loadSelectTypes() {
      let url = '/ich/lib/type';
      let param = {};
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log('没有找到非遗目录数据');
          }
          this.select_types = resp.body;
          // console.log(this.select_types);
        } else {
          console.log('获取非遗目录数据，错误-->', resp.msg);
        }
      });
    },
    /**
     * 加载非遗资源库
     */
    loadSelectResource() {
      let param = {
        size: this.select_pagination.size,
        page: this.select_pagination.page
      };
      if (this.select_id_type && this.select_id_type > 0) {
        param.type = this.select_id_type;
      }
      if (this.select_name_resource && this.select_name_resource.trim().length > 0) {
        param.name = this.select_name_resource.trim();
      }
      let url = '/ich/lib/page';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.select_pagination.size = resp.body.page.size;
          this.select_pagination.page = resp.body.page.page;
          this.select_pagination.total = resp.body.page.total;
          this.select_resource = resp.body.data;
          // console.log(this.select_resource);
        } else {
          this.$Message.error(`查询非遗资源库错误`);
        }
      });
    },
    // endregion
    // region 标题事件
    /**
     * 复选框全选/取消
     * @param index
     */
    title_evt_0(index) {
      let title = this.columns[index].title;
      if (title == '全选') {
        this.columns[index].title = '取消';
        this.selectAll();
      } else {
        this.columns[index].title = '全选';
        this.selecteds = [];
      }
    },
    // endregion
    // region 事件方法
    /**
     * 标题单击
     * @param evt
     * @param index
     */
    tableTitle(evt, index) {
      let method_name = `this.title_evt_${index}(${index})`;
      if (this.columns[index].exec) {
        eval(method_name);
      }
      // console.log(index);
    },
    /**
     * 删除非遗资源
     * @param evt
     * @param index
     */
    deleteResource(evt, index) {
      let title = `确认要删除城市：${this.resources[index].city}-->非遗资源：${this.resources[index].resource}？`;
      let param = [];
      param.push({
        id: this.resources[index].id,
        region: this.resources[index].region
      });
      let indexs = [];
      indexs.push(index);
      this.$Confirm(title, '删除城市非遗资源').then(() => {
        let url = '/ich/resource/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.deleteListCityResource(indexs);
            this.$Message.success(`删除：${this.resources[index].city}--${this.resources[index].resource}，成功！`);
          } else {
            this.$Message.error(`删除城市非遗资源失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /**
     * 改变分页
     * @param evt
     */
    changePage(evt) {
      this.loadIchCityResource();
    },
    /**
     * 增加资源
     */
    addResource() {
      let news = this.resources.filter(r => r.isNew);
      if (news && news.length > 0) {
        this.$Message.error(`请先保存现有的新资源`);
        return;
      }
      let color = this.getColor();
      let res = {
        id: 0,
        region: '',
        city: '',
        resource: '',
        url: '',
        suffix: '',
        id_type: 0,
        name_type: '',
        checked: false,
        isNew: true,
        sn: 0,
        type_name: '',
        color: color,
        type: 2
      };
      if (!this.resources) {
        this.resources = [];
      }
      this.resources.splice(0, 0, res);
    },
    /**
     * 选择非遗资源
     */
    selectResource() {
      this.select_show = true;
    },
    /**
     * 选择非遗资源结果
     * @param evt
     * @param index
     */
    selectResourceResult(evt, index) {
      this.select_show = false;
      let result = this.select_resource[index];
      this.new_id_resource = result.id;
      this.new_name_resource = result.name;
      // console.log(result);
    },
    /**
     * 保存新增城市资源
     */
    addResourceAction() {
      if (!this.region || parseInt(this.region) == 0) {
        this.$Message.error('请先选择非遗城市');
        return;
      }
      if (!this.new_id_resource || this.new_id_resource == 0) {
        this.$Message.error('请先选择非遗资源');
        return;
      }
      let param = {
        id: this.new_id_resource,
        region: this.region
      };
      let url = '/ich/resource/save';
      this.loading = true;
      Ajax.post(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          let sd = resp.body;
          if (sd != null && sd.length == 1) {
            this.resources.splice(0, 1, sd[0]);
            this.handlResources();
          } else {
            this.resources.splice(0, 1);
          }
        } else {
          this.resources.splice(0, 1);
          this.$Message.error(`保存非遗城市错误`);
        }
      }).catch(ex => {
        this.resources.splice(0, 1);
        console.log(ex);
      });
    },
    /**
     * 取消新增
     */
    addCancel() {
      this.$Confirm(`确认取消：${this.select_name_resource}`, '取消新增').then(() => {
        this.resources.splice(0, 1);
      }).catch(() => {
        this.$Message.error('取消错误');
      });
    },
    /**
     * 删除城市资源
     */
    deleteCityResource() {
      if (!this.selecteds || this.selecteds.length == 0) {
        this.$Message.error('先要选择需要删除的城市非遗资源');
        return;
      }
      let titles = '';
      let indexs = [];
      let param = [];
      for (let i = 0; i < this.selecteds.length; i++) {
        let keys = this.selecteds[i].split('_');
        if (!keys || keys.length != 3) {
          this.$Message.error(`选择城市非遗资源：${this.selecteds[i]}--格式错误`);
          return;
        }
        let index = keys[0];
        if (!isInteger(index)) {
          this.$Message.error(`选择城市非遗资源：${this.selecteds[i]}--索引（${index}）数据错误`);
          return;
        }
        index = parseInt(index);
        indexs.push(index);
        let region = this.resources[index].region;
        let id = this.resources[index].id;
        titles = `${titles},${this.resources[index].city}--${this.resources[index].resource}`;
        param.push({
          id: id,
          region: region
        });
      }
      titles = titles.trim().substr(1);
      // console.log(param, titles);
      this.$Confirm(`确认删除：${titles}`, '删除城市非遗资源').then(() => {
        let url = '/ich/resource/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.deleteListCityResource(indexs);
            this.$Message.success(`删除：${titles}，成功！`);
          } else {
            this.$Message.error(`删除选择的城市非遗资源失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /***
     * 删除列表
     * @param indexs
     */
    deleteListCityResource(indexs) {
      let dis = indexs.sort();
      for (let i = dis.length - 1; i >= 0; i--) {
        this.resources.splice(dis[i], 1);
      }
    },
    /**
     * 预览资源
     * @param evt
     * @param index
     */
    previewResource(evt, index) {
      let res = this.resources[index];
      let type = res.type;
      let url = res.url;
      if (!url || url.trim().length == 0) {
        this.$Message.error(`没有找到${res.city}--${res.resource}，资源地址`);
        return;
      }
      if (type == 1) {
        this.previewImage(url);
      }
      if (type == 2) {
        this.previewVideo(url);
      }
    },
    /**
     * 预览图片
     * @param url
     */
    previewImage(url) {
      this.preview_image_url = url;
      this.preview_image_show = true;
    },
    videoStop() {
      let videos = document.getElementsByTagName('video');
      for (let j = videos.length - 1; j >= 0; j--) {
        videos[j].pause();
      }
    },
    /**
     * 预览视频
     * @param url
     */
    previewVideo(url) {
      this.videoStop();
      this.preview_video_url = url;
      this.preview_video_show = true;
    },
    /**
     * 新增前预览
     */
    previewAdd() {
      let id = this.new_id_resource;
      let title = this.new_name_resource;
      if (id == 0 || !title || title.trim().length == 0) {
        this.$Message.error(`请先选择非遗资源，然后预览`);
        return;
      }
      let resource = this.select_resource.find(sr => sr.id == id);
      if (!resource || !resource.id || resource.id != id) {
        this.$Message.error(`资源：${id}，无效`);
        return;
      }
      let url = resource.url;
      let exts = title.split('.');
      let ext = '.' + exts[exts.length - 1];
      if (this.picture_ext.indexOf(ext) != -1) {
        this.previewImage(url);
      } else if (this.video_ext.indexOf(ext) != -1) {
        this.previewVideo(url);
      } else {
        this.$Message.error(`不支持的预览格式：${ext}，当前版本只支持图片、视频`);
      }
    }
    // endregion
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

.search_text {
  margin-left: 5px;
  width: 200px;
}

.search_item {
  margin-left: 5px;
  width: 150px;

  & > Select {
    width: 100%;
  }
}

.search_button {
  .search_button_item {
    & > button {
      height: 32px;
    }
  }

  .search_button_bottom {
    width: 100%;
    height: 6px;
  }
}

.resource_panel {
  height: calc(100vh - 180px);
  padding: 0px;
  margin: 0px;

  .table_head {
    .arrange_row();
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;
    cursor: default;

    .table_column {
      margin-left: 1px;
      text-align: center;
      background-color: #0077aa;
      color: #ffffff;

      &:hover {
        cursor: pointer;
        background-color: #0086b3;
      }

      &:first-child {
        margin-left: 0px;
      }

      &:last-child {
        margin-right: 1px;
      }
    }
  }

  .table_body {
    margin-top: 5px;
    height: calc(100% - 45px);
    overflow-x: hidden;
    overflow-y: auto;

    .table_row {
      .arrange_row();
      margin-top: 3px;
      height: 40px;
      line-height: 40px;
      vertical-align: middle;

      &:first-child {
        margin-top: 0px;
      }

      .table_column {
        margin-left: 1px;
      }
    }
  }
}

.select_resources {
  .type_name {
    .arrange_row();
    width: 100%;
    height: 40px;

    .select_type {
      width: 180px;

      & > Select {
        width: 100%;
      }
    }

    .select_name {
      margin-left: 20px;
      width: 200px;

      & > input {
        width: 100%;
      }
    }

    .select_button {
      margin-left: 45px;

      .search_button_item {
        & > button {
          height: 32px;
        }
      }

      .search_button_bottom {
        width: 100%;
        height: 6px;
      }
    }
  }

  .list_data {
    width: 100%;
    height: 450px;
    overflow-x: hidden;
    overflow-y: auto;

    .list_item {
      .arrange_row();
      margin-top: 5px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      vertical-align: middle;

      &:nth-child(even) {
        background-color: #eeeeee;
      }

      &:hover {
        cursor: pointer;
        background-color: #ff6600;
        color: #ffffff;
      }

      .list_item_name {
        width: calc(100% - 105px);
        text-align: center;
      }

      .list_item_item {
        margin-left: 5px;
        width: 100px;
        text-align: center;
      }
    }
  }

  .list_page {
    width: 100%;
    height: 60px;
  }
}

.preview_resource {
  &:hover {
    cursor: pointer;
    background-color: #ff6600;
    color: #ffffff;
  }
}

</style>
