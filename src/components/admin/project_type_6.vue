<template>
  <div class='content' style="margin-left: 8px;">

    <Table ref="table" :datas="table_data.datas" @select="onSelect" @on-selection-change="handleSelectionChange" style="margin-bottom: 10px;width: 99%;">
        <TableItem title="序号" prop="$serial" :width='80' align="center"></TableItem>
        <TableItem title="备课老师" :width='200' prop="name_user" treeOpener></TableItem>
        <TableItem title="备课时间" :width='200' prop="time"></TableItem>
        <TableItem title="备课学校" :width='200' prop="school"></TableItem>
        <TableItem title="操作方式" :width='200' prop="action"></TableItem>
        <TableItem title="IP地址" :width='200' prop="ip"></TableItem>
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
                size: 20,
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
        //获取操作记录列表(record,'01_备课记录列表',prepare/record/list)
        init_data(){
          let url = '/prepare/record/list';
          let param = {
            id: this.pnp.id, //备课ID,必须提交
            type: 0, //记录类型， 数据来自记录类型列表接口， 可选
            school: "", //备课老师所在学校名称 可选
            user: 0, //备课老师ID 可选
            min_time: "2024-03-01", //最早记录时间 可选
            max_time: "2024-10-01" //最晚记录时间 可选
          };
          this.loading = true;
          Ajax.postJson(url, param).then((resp) => {
            console.log(resp);
            this.loading = false;
            if (resp.ok) {
              console.log(resp);
              this.setTable(resp.body);
            } else {
            }
          })
        },
        setTable(body) {
          let idx = this.table_data.pagination.page - 1;
          let list = body.slice(idx * 20, (idx + 1) * 20);
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
