<template>
    <div class="app-container" style="background-color: red;border: 1px red solid;">
        {{this.userId}}
      <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      </el-form>
      <el-table v-loading="loading" :data="recordList" @selection-change="handleSelectionChange">
      </el-table>
      <pagination/> -->
    </div>
  </template>
  <script>
  export default {
    name: "Record",
    props: ['userId'],
    data() {
      return {
        // 遮罩层
        loading: true,
        title: "",
        // 查询参数
        queryParams: {
          userId: null,
          userName: null
        }
      };
    },
    created() {
      this.queryParams.userId = this.userId;
      this.getList();
    },
    methods: {
      getList() {
        this.loading = true;
        // 执行请求后台数据
      }
    }
  };
  </script>
  