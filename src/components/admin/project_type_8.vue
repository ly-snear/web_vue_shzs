<style lang='less' scoped>
.statistics_overview{
  overflow: hidden;
}
.statistics_overview div{
  width: 14.28%;
  text-align: center;
  float: left;
  border: 0px solid red;
  height: 50px;
  line-height: 50px;
  background-color: bisque;
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
      <div>{{ this.statistical.resource }}</div>
      <div>{{ this.statistical.manuscript }}</div>
      <div>{{ this.statistical.teacher }}</div>
      <div>{{ this.statistical.discuss }}</div>
      <div>{{ this.statistical.word }}</div>
      <div>{{ this.statistical.record }}</div>
      <div>{{ this.statistical.action }}</div>
    </div>
    <div class="statistics_overview">
      <div>备课资源总数</div>
      <div>浏览次数</div>
      <div>参与人数</div>
      <div>研讨次数</div>
      <div>研讨字数</div>
      <div>操作总次数</div>
      <div>访问总次数</div>
    </div>

    <div>
      <!-- <Chart class="chart" :option="pieOption" /> -->
    </div>

    <div>

    </div>

    <div>

    </div>

    <div>

    </div>

    <div>

    </div>

    <div class="divS">
      <Table ref="table" :datas="table_data.datas" @select="onSelect" @on-selection-change="handleSelectionChange" style="overflow: hidden;">
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
      </br>
      <Pagination
        align='center'
        layout='pager'
        v-model='table_data.pagination'
        @change='init_data'
      ></Pagination>
    </div>
  </div>

</div>

</template>
<script>

//import Chart from './../common/chart/echarts.vue'
//import chart from "./../common/chart/chart.vue";
//import * as echarts from 'echarts'
export default {
    props:['pnp','proj'],
    // components: { Chart },
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
              manuscript:0,
              teacher:0,
              discuss:0,
              word:0,
              record:0,
              action:0
            },
            chart:null,
            option : {
              title: {
                text: '饼图示例'
              },
              series: [{
                type: 'pie', // 图表类型为饼图
                data: [
                  {value: 335, name: '项目1'}, // 饼图数据
                  {value: 310, name: '项目2'},
                  {value: 234, name: '项目3'},
                  {value: 135, name: '项目4'},
                  {value: 1548, name: '项目5'}
                ]
              }]
            },
        };
    },
    created() {
      //this.initPie();
      // console.log(this.pnp.project)
      // if(this.pnp.project !== undefined && this.pnp.project !== null){
        
      // }else{
      //   this.pnp.project = this.proj;
      // }
      // console.log(this.pnp.project)
      this.init_data();


      //this.initChart();
    },
    mounted(){
      

      // // 初始化图表
      // let myChart = echarts.init(this.$refs.echartsContainer);
      
      // // 指定图表的配置项和数据
      // let option = {
      //     // ... ECharts 配置项
      // };

      // // 使用刚指定的配置项和数据显示图表。
      // myChart.setOption(option);
    },
    methods: {
      // initPie() {
      //   const color = [
      //     "#6080EB",
      //     "rgba(96, 128, 235, 0.42)",
      //     "rgba(96, 128, 235, 0.03)",
      //   ];
      //   const xData = [
      //     "2021-11-21",
      //     "2021-11-22",
      //     "2021-11-23",
      //     "2021-11-24",
      //     "2021-11-25",
      //     "2021-11-26",
      //     "2021-11-27",
      //   ];
      //   const yData = [1220, 182, 491, 234, 790, 330, 310];
      //   this.pieOption = {
      //     color: color[0],
      //     dataZoom: {
      //       type: "inside",
      //       xAxisIndex: [0],
      //     },
      //     tooltip: {
      //       show: true,
      //       trigger: "axis",
      //     },
      //     grid: {
      //       top: 10,
      //       bottom: 40,
      //     },
      //     xAxis: {
      //       boundaryGap: false,
      //       splitLine: {
      //         show: false,
      //       },
      //       axisTick: {
      //         show: false,
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: "#d8d8d8",
      //         },
      //       },
      //       axisLabel: {
      //         color: "rgba(0, 0, 0, 0.65)",
      //       },
      //       data: xData,
      //     },
      //     yAxis: {
      //       splitNumber: 4,
      //       splitLine: {
      //         show: true,
      //       },
      //       axisTick: {
      //         show: false,
      //       },
      //       axisLine: {
      //         show: true,
      //         lineStyle: {
      //           color: "#d8d8d8",
      //         },
      //       },
      //       axisLabel: {
      //         color: "rgba(0, 0, 0, 0.65)",
      //       },
      //     },
      //     series: [
      //       {
      //         type: "line",
      //         showSymbol: false,
      //         smooth: true,
      //         lineStyle: {
      //           color: color[0],
      //           width: 3,
      //         },
      //         areaStyle: {
      //           //区域填充样式
      //           normal: {
      //             color: this.$echarts.graphic.LinearGradient(
      //               0,
      //               0,
      //               0,
      //               1,
      //               [
      //                 {
      //                   offset: 0,
      //                   color: color[1],
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: color[2],
      //                 },
      //               ],
      //               false
      //             ),
      //           },
      //         },
      //         data: yData,
      //       },
      //     ],
      //   };
      // },
      initChart() {
        const chartContainer = this.$refs.chartContainer;
        console.log(chartContainer);
        this.chart = echarts.init(chartContainer);
        const option = {
          title: {
            text: '饼图示例'
          },
          series: [{
            type: 'pie', // 图表类型为饼图
            data: [
              {value: 335, name: '项目1'}, // 饼图数据
              {value: 310, name: '项目2'},
              {value: 234, name: '项目3'},
              {value: 135, name: '项目4'},
              {value: 1548, name: '项目5'}
            ]
          }]
        }
        this.chart.setOption(option)
      },
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
      //prepare,'14_备课统计总览',prepare/count?id=4
      getCountData(){
        
      },
      //prepare,'15_备课研讨字数统计',prepare/count/discuss/words?id=4
      getCountDiscussWords(){
        
      },
      //prepare,'16_备课研讨次数统计',prepare/count/discuss/times?id=4
      getCountDiscussTimes(){
        
      },
      //prepare,'17_备课教师研讨统计',prepare/count/discuss/teachers?id=4
      getCountDiscussTeachers(){
        
      },
      //prepare,'18_备课教师详情分页列表',prepare/teacher/page?id=4&size=3&page=2
      getCountDiscussTeacherPage(){
        
      },
      //prepare,'19_备课列表统计',prepare/list/count
      getListCount(){
        
      },




    },
}
</script>
