<template>
  <div class='content' style="margin-left: 8px;">

    <Table ref="table" :datas="table_data.datas" checkbox @select="onSelect" @on-selection-change="handleSelectionChange" style="margin-bottom: 10px;width: 99%;">
        <!-- <TableItem title='' :width='200' align="center">
          <template slot-scope='{ data }'>
            <Checkbox :checked="setChecked(data)"></Checkbox>
          </template>
        </TableItem> -->
        <TableItem title="序号" prop="$serial" :width='80' align="center"></TableItem>
        <TableItem title="项目标题" :width='200' prop="title" treeOpener></TableItem>
        <TableItem title="项目类型ID" :width='200' prop="type"></TableItem>
        <TableItem title="项目类型" :width='200' prop="type_title"></TableItem>
        <!-- <TableItem title='图标' :width='200' align="center">
          <template slot-scope='{ data }'>
            <img :src="data.icon" style="width: 28px;height: 28px;"/>
          </template>
        </TableItem>
        <TableItem title="简介" prop="introduction"></TableItem> -->
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
          let url = '/prepare/resource/list';
          let param = {
            prepare: 34,                                                        //备课ID 所有参数都是可选的
            content: 9,                                                         //备课项目内容ID
            type: 0,                                                            //备课资源类型
            title: "",                                                          //备课资源标题
            extension: "",                                                      //备课资源扩展名称
            min_edits: -1,                                                      //最少修改次数
            max_edits: 100,                                                     //最多编辑次数
            version: "",                                                        //修改版本
            min_size: -1,                                                       //资源最小字节数
            max_size: 10485760,                                                  //资源最大字节数
            min_downloads: -1,                                                  //资源最少下载次数
            max_downloads: 100,                                                 //资源最大下载次数
            min_browse: -1,                                                     //资源最少浏览次数
            max_browse: 200,                                                    //资源最多浏览次数
            min_praise: -1,                                                     //资源最少点赞数量
            max_praise: 25,                                                     //资源最多点赞数量
            min_share: -1,                                                      //资源最少分享次数
            max_share: 10,                                                      //资源最多分享次数
            min_favorite: -1,                                                   //资源最少收藏数量
            max_favorite: 20,                                                   //资源最多收藏数量
            min_reply: -1,                                                      //最少研讨数量
            max_reply: 5,                                                       //最多研讨数量
            user: 75,                                                           //资源上传用户ID
            min_time: "2023-01-01",                                             //资源最早上传日期
            max_time: "2025-04-01",                                             //资源最晚上传日期
            user_name: ""                                                       //资源上传用户姓名
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
