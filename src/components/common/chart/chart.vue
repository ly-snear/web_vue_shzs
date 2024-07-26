<template>
    <div ref="chart" class="chart"></div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Chart',
    props: {
      // 传配置项option
      option: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        chart: null
      }
    },
    // 这里是获取我项目侧边栏的状态
    computed: {
      ...mapGetters(['sidebar'])
    },
    watch: {
      option: {
        handler(val) {
          // 判断传入的option是否有内容
          if (Object.keys(val).length) {
            this.$nextTick(() => {
              this.drawChart()
            })
          }
        },
        immediate: true,
        deep: true
      },
      // 当侧边栏打开或者收缩 都影响了图表的宽度 所以需要重绘 如果项目里没左侧侧边栏可以不用监听重绘
      'sidebar.opened': {
        handler(val) {
          this.$nextTick(() => {
            this.drawChart()
          })
        }
      }
    },
    methods: {
      drawChart() {
        this.chart = this.$echarts.init(this.$refs.chart) // 初始化echarts
        this.chart.setOption(this.option) // 设置对应配置项
        // 当窗口大小改变 echarts重置大小
        window.addEventListener('resize', () => {
          this.chart.resize()
        })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .chart {
      width: 100%;
      height: 100%;
    }
  </style>
  