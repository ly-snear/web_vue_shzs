<script>
import { typeMixins } from '../../../js/mixins/artsource.js';

export default {
  name: 'ImportFolderModal',
  mixins: [typeMixins],
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    pid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      submitLoading: false,
      targetId: '',
      treeDataSource: []
    };
  },
  watch: {
    modalShow(val) {
      console.log(val);
      if (val && this.treeDataSource.length == 0) {
        this.fetchTreeData();
        this.getTextbook();
      }
    }
  },
  methods: {
    // 导入
    async handleImport() {
      this.submitLoading = true;
      try {
        const resp = await Ajax.post('/resource/import', {
          catalog: this.targetId,
          pid: this.pid
        });
        if (resp.ok) {
          this.$Message.success('导入成功');
          this.targetId = '';
          this.$emit('update:modalShow', false);
          this.$emit('reload');
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.submitLoading = false;
      }
    },
    async fetchTreeData() {
      if (this.select3.val) {
        console.log('准备存储末级KEY');
        localStorage.setItem('ps3', this.select3.val);
        //console.log('完成存储末级KEY');
      }
      this.loading = true;
      try {
        const resp = await Ajax.get('/resource/tree/shared', {
          domain: this.domain
        });
        if (resp.ok) {
          this.treeDataSource = resp.body.filter((i) => i.folder);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <Modal v-model='modalShow' class='move-modal'>
    <div slot='header'>目录导入</div>
    <div class='remove-tree-body'>
      <Row type='flex' :space='20'>
        <Cell :flex='1'>
          <Select
            v-model='select1.val'
            :datas='select1.datas'
            :deletable='false'
            @change='change(1)'
          ></Select>
        </Cell>
        <Cell :flex='1'>
          <Select
            v-model='select2.val'
            :datas='select2.datas'
            :deletable='false'
            @change='change(2)'
          ></Select>
        </Cell>
        <Cell :flex='1'>
          <Select
            v-model='select3.val'
            :datas='select3.datas'
            :deletable='false'
            @change='fetchTreeData'
          ></Select>
        </Cell>
      </Row>
      <br />
      <Loading text='Loading' :loading='loading'></Loading>
      <TreePicker
        className='move-tree-picker'
        :option="{
          keyName: 'id',
          parentName: 'idUp',
          titleName: 'name',
          dataMode: 'list',
          datas: treeDataSource,
        }"
        v-model='targetId'
      ></TreePicker>
    </div>
    <template slot='footer'>
      <div>
        <button class='h-btn' @click="$emit('update:modalShow', false)">取消</button>
        <Button color='primary' :loading='loading || submitLoading' @click='handleImport'>
          导入
        </Button>
      </div>
    </template>
  </Modal>
</template>
