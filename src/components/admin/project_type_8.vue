<style lang='less' scoped>
.statistics_overview{
  overflow: hidden;
}
.statistics_overview div{
  width: 14.28%;
  text-align: center;
  float: left;
  border: 0px solid red;
  height: 40px;
  line-height: 40px;
  background-color: rgba(242, 242, 242, 1);
  border-radius: 5px;
}
.divS{
  width: 100%;
  margin-top: 8px;
  border: 0px solid red;
}
</style>
<template>
<div class='content' style="margin-left: 8px;">
  <div style="width: 100%;">
    <div style="font-size: 20px;font-weight: bold;">
      数据概述
    </div>
    <div class="statistics_overview">
      <div style="color: blueviolet;">{{ this.statistical.resource }}</div>
      <div style="color:cadetblue;">{{ this.statistical.manuscript }}</div>
      <div style="color:deepskyblue;">{{ this.statistical.teacher }}</div>
      <div style="color:brown;">{{ this.statistical.discuss }}</div>
      <div style="color:darkgreen;">{{ this.statistical.word }}</div>
      <div style="color:coral;">{{ this.statistical.action }}</div>
      <div style="color:darkgoldenrod;">{{ this.statistical.record }}</div>
    </div>
    <div class="statistics_overview" style="margin-bottom: 10px;">
      <div>•&nbsp;备课资源总数</div>
      <div>•&nbsp;版本数</div>
      <div>•&nbsp;参与人数</div>
      <div>•&nbsp;研讨次数</div>
      <div>•&nbsp;研讨字数</div>
      <div>•&nbsp;操作次数</div>
      <div>•&nbsp;访问次数</div>
    </div>

    <div style="height: 300px;">
      <div id='Chart_CountDiscussWords' style='width: 600px; height: 300px;float: left;'></div>
      <div id='Chart_CountDiscussTimes' style='width: 600px; height: 300px;float: left;'></div>
    </div>

    <div style="height: 300px;">
      <div id='Chart_CountDiscussTeachers' style='width: 600px; height: 300px;'></div>
    </div>

    <div>
    </div>

    <div class="divS">
      <Table ref="table" :datas="table_data.datas" @select="onSelect" @on-selection-change="handleSelectionChange" style="overflow: hidden;">
        <TableItem title="序号" prop="$serial" :width='80' align="center"></TableItem>
        <TableItem title='备课老师' style="line-height: 40px;height: 40px;" :width='300' align="left">
          <template slot-scope='{ data }'>
            <div style="height: 40px;border: 0px solid red;">
              <div style="height: 40px;border: 0px solid red;float: left;line-height: 40px;margin-right: 5px;margin-left: 5px;width: 35px;text-align: center;">
                <label style="">{{ data.name_role }}</label>
              </div>
              <div style="height: 40px;border: 0px solid red;float: left;line-height: 40px;margin-right: 5px;">
                <div style="float: left;"><label style="">{{ data.name }}</label></div>
                <div style="float: left;margin-left: 5px;"><img :src="data.avatar" style="width: 28px;height: 28px;border-radius: 3px;margin-top: 5px;;"/></div>
              </div>
              <div style="height: 40px;border: 0px solid red;float: left;line-height: 40px;margin-right: 5px;width: 120px;">
                <label style="line-height: 30px;">{{ data.school }}</label>
              </div>
            </div>
          </template>
        </TableItem>
        <TableItem title="上传资源数" :width='100' prop="resource" treeOpener></TableItem>
        <TableItem title="在线编辑次数" :width='100' prop="edit" treeOpener></TableItem>
        <TableItem title="研讨次数" :width='100' prop="discuss" treeOpener></TableItem>
        <TableItem title="研讨字数" :width='100' prop="words" treeOpener></TableItem>
        <TableItem title="最近操作时间" :width='160' prop="time" treeOpener align="center"></TableItem>
      </Table>
      </br>
      <Pagination
        align='center'
        layout='pager'
        v-model='table_data.pagination'
        @change='init_prepare_count_data'
      ></Pagination>
    </div>
  </div>
</div>
</template>
<script>

import store, { getInitUser } from '../../js/vuex/store';
import * as echarts from 'echarts';

export default {
    props:['pnp','proj'],
    data() {
        return {
            pieOption: {},
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
            statistical:{
              resource:0,
              manuscript:0,//稿件
              teacher:0,//浏览
              discuss:0,
              word:0,//字数
              record:0,//访问
              action:0//操作
            },
            chart:null,
            option_CountDiscussWords: {
              title: {
                text: '研讨统计-字数',
                subtext: '',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: '70%',
                  data: [],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 40,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            },
            option_CountDiscussTimes: {
              title: {
                text: '备课研讨-次数',
                subtext: '',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: '70%',
                  data: [],
                  itemStyle: {
                    normal: {
                      color: function(params) {
                        const colorList = [ '#FCCE10', '#B5C334', '#E87C25','#27727B', '#C1232B'];
                        return colorList[params.dataIndex];
                      }
                    }
                  },
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0.5, 0.5, 0.5, 0.5)'
                    }
                  }
                }
              ]
            },
            option_CountDiscussTeachers: {
              title: {
                text: '备课教师研讨',
                subtext: '',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: '70%',
                  data: [],
                  itemStyle: {
                    normal: {
                      color: function(params) {
                        const colorList = ['#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B'];
                        return colorList[params.dataIndex];
                      }
                    }
                  },
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            },


        };
    },
    created() {
      this.init_prepare_count_data();
      this.init_prepare_data();
    },
    mounted(){
      this.getCountDiscussWords();
      this.getCountDiscussTimes();
      this.getCountDiscussTeachers();
    },
    methods: {
      //prepare,'14_备课统计总览',/prepare/count?id=37
      init_prepare_count_data(){
        let url = '/prepare/count?id='+this.pnp.id;
        this.loading = true;
        Ajax.get(url, null).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.statistical.action=resp.body.action;
            this.statistical.discuss=resp.body.discuss;
            this.statistical.manuscript=resp.body.manuscript;
            this.statistical.record=resp.body.record;
            this.statistical.resource=resp.body.resource;
            this.statistical.teacher=resp.body.teacher;
            this.statistical.word=resp.body.word;
          } 
        })
      },
      onSelect(){

      },
      handleSelectionChange(){

      },
      //prepare,'15_备课研讨字数统计',prepare/count/discuss/words?id=4
      getCountDiscussWords(){
        let Chart_CountDiscussWords = echarts.init(document.getElementById('Chart_CountDiscussWords'));
        let url = '/prepare/count/discuss/words?id='+this.pnp.id;
        this.loading = true;
        Ajax.get(url, null).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            if(resp.body.length>0){
              let cnt = 0;
              for(let i=0;i<resp.body.length;i++){
                cnt = resp.body[i].words;
                this.option_CountDiscussWords.series[0].data.push({name:resp.body[i].name,value:resp.body[i].words});
              }
              this.option_CountDiscussWords.series[0].data.push({name:"未使用",value:100-cnt});
            }
          } 
        })
        setTimeout(()=>{
          if(this.option_CountDiscussWords.series[0].data.length>0){
            Chart_CountDiscussWords.setOption(this.option_CountDiscussWords)
          }  
        },1000);
      },
      //prepare,'16_备课研讨次数统计',prepare/count/discuss/times?id=4
      getCountDiscussTimes(){
        let Chart_CountDiscussTimes = echarts.init(document.getElementById('Chart_CountDiscussTimes'));
        let url = '/prepare/count/discuss/times?id='+this.pnp.id;
        this.loading = true;
        Ajax.get(url, null).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            if(resp.body.length>0){
              let cnt = 0;
              for(let i=0;i<resp.body.length;i++){
                cnt = resp.body[i].times;
                this.option_CountDiscussTimes.series[0].data.push({name:resp.body[i].name,value:resp.body[i].times});
              }
              this.option_CountDiscussTimes.series[0].data.push({name:"未使用",value:100-cnt});
            }
          } 
        })
        setTimeout(()=>{
          if(this.option_CountDiscussTimes.series[0].data.length>0){
            Chart_CountDiscussTimes.setOption(this.option_CountDiscussTimes);
          }  
        },1000);
      },
      //prepare,'17_备课教师研讨统计',prepare/count/discuss/teachers?id=4
      getCountDiscussTeachers(){
        let Chart_CountDiscussTeachers = echarts.init(document.getElementById('Chart_CountDiscussTeachers'));
        let url = '/prepare/count/discuss/teachers?id='+this.pnp.id;
        this.loading = true;
        Ajax.get(url, null).then((resp) => {
          this.loading = false;
          console.log(resp);
          if (resp.ok) {
            if(resp.body.length>0){
              console.log(resp.body[0]);
              for(let i=0;i<resp.body.length;i++){
                if(resp.body[i].datas.length>0){
                  for(let p=0;p<resp.body[i].datas.length;p++){
                    this.option_CountDiscussTeachers.series[0].data.push({name:resp.body[i].datas[p].title,value:resp.body[i].datas[p].qty});
                  }
                }
              }
            }
          } 
        })
        setTimeout(()=>{
          console.log(123);
          if(this.option_CountDiscussTeachers.series[0].data.length>0){
            console.log(this.Chart_CountDiscussTeachers);
            Chart_CountDiscussTeachers.setOption(this.option_CountDiscussTeachers);
          }  
        },1000);
      },
      //prepare,'18_备课教师详情分页列表',prepare/teacher/page?id=4&size=3&page=2
      getCountDiscussTeacherPage(){
        
      },
      init_prepare_data(){
        let url = '/prepare/teacher/page?id=37&size=3&page=1';
        this.loading = true;
        Ajax.get(url, null).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.setTable(resp.body);
          }
        })
      },
      setTable(body) {
        console.log(body);
        let idx = this.table_data.pagination.page - 1;
        let list = body.data.slice(idx * 20, (idx + 1) * 20);
        this.table_data.datas = list;
        this.table_data.pagination.total = body.data.length;
      },



    },
}
</script>
