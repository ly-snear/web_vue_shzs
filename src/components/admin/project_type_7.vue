<template>
  <div class='content' style="margin-left: 8px;">

    <Table ref="table" :datas="table_data.datas" checkbox @select="onSelect" @on-selection-change="handleSelectionChange" style="margin-bottom: 10px;width: 99%;">
        <TableItem title="序号" prop="$serial" style="width: 8%;" align="center"></TableItem>
        <TableItem title="备课老师" style="width: 20%;" prop="name_user" treeOpener></TableItem>
        <TableItem title='图标' style="width: 20%;" align="center">
          <template slot-scope='{ data }'>
            <img :src="data.avatar_user" style="width: 28px;height: 28px;"/>
          </template>
        </TableItem>
        <TableItem title="学校" style="width: 20%;" prop="school" treeOpener></TableItem>
        <TableItem title="操作时间" style="width: 20%;" prop="time"></TableItem>
        <TableItem title="IP地址" style="width: 20%;" prop="ip"></TableItem>
    </Table>

    <Pagination
      align='center'
      layout='pager'
      v-model='table_data.pagination'
      @change='init_data'
    ></Pagination>

  </div>

</template>
<script>

import Editor from '@tinymce/tinymce-vue';
import { htmlEncodeByRegExp, htmlDecodeByRegExp } from '../../js/common/utils';

export default {
    components: {
        'editor': Editor
    },
    props:['pnp','proj'],
    data() {
        return {
            loading : true,
            table_data: {
              pagination: {
                page: 1,
                size: 6,
                total: 0
              },
              datas: []
            },
            disabled: false,
        };
    },
    created() {
      console.log(this.pnp.project)
      if(this.pnp.project !== undefined && this.pnp.project !== null){
        
      }else{
        this.pnp.project = this.proj;
      }
      console.log(this.pnp.project)
      this.init_data();
    },
    mounted(){

    },
    methods: {
        //获取备课资源列表(resource,'03_获取备课（项目）资源列表',prepare/resource/list)
        init_data(){
          let url = '/prepare/action/list';
          let param = {
            id: this.pnp.id, //备课ID,必须提交
            type: 0, //记录类型， 数据来自记录类型列表接口， 可选
            school: "", //备课老师所在学校名称 可选
            course: "", //备课老师所教科目 可选
            user: 0, //备课老师ID 可选
            min_time: "2024-03-01", //最早记录时间 可选
            max_time: "2024-10-01" //最晚记录时间 可选
          };
          this.loading = true;
          Ajax.postJson(url, param).then((resp) => {
            console.log(resp);
            this.loading = false;
            if (resp.ok) {
              this.setTable(resp.body);
            } else {
            }
          })
        },
        setTable(body) {
          let idx = this.table_data.pagination.page - 1;
          let list = body.slice(idx * 10, (idx + 1) * 10);
          this.table_data.datas = list;
          this.table_data.pagination.total = body.length;
        },
        onSelect(){

        },
        handleSelectionChange(){

        },








    },
}
</script>
