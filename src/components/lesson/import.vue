<template>
  <Modal v-model='opened' type='drawer-right'>
    <div class='model-right'>
      <div class='title'>导入学生</div>
      <Form ref='form' labelPosition='left'>
        <FormItem label='学年'>
          {{ year.title }}
        </FormItem>
        <FormItem label='班级' required>
          <Row type='flex' justify='space-between' align='middle'>
            <Col width='14'>
              <input
                type='text'
                v-model='query.class'
                :disabled='query.idClass != undefined'
                placeholder='请输入新班级或已有班级（如：初一三班）'
              />
            </Col>
            <Col width='2'>
              <div style='margin-left: 10px'>或</div>
            </Col>
            <Col width='8'>
              <Select
                v-model='query.idClass'
                :disabled="query.class != ''"
                :datas='classCodes'
                placeholder='班号'
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem label='毕业年份' required>
          <Select
            v-model='query.graduationYear'
            :datas='graduationYears'
            placeholder='选择毕业年份'
          />
        </FormItem>
        <FormItem label='教育阶段' required>
          <Select v-model='query.period' :datas='periods' placeholder='选择教学阶段' />
        </FormItem>
        <FormItem label='模板'>
          <div class='link'>
            <a
              href='/static/excel/%E5%AD%A6%E7%94%9F%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xlsx'
              download='学生上传模板.xlsx'
            >
              模板下载
            </a>
          </div>
        </FormItem>
        <FormItem>
          <uploader
            :options='upload.options'
            class='h-btn h-btn-circle h-btn-primary'
            :disabled="query.period == '' || query.graduationYear == ''"
            @upload-start='loading = true'
            :single='upload.single'
            :attrs='upload.attrs'
          >
            <uploader-btn :single='upload.single' :attrs='upload.attrs'>
              上传
            </uploader-btn>
          </uploader>
          <Button
            noBorder
            transparent
            text-color='primary'
            circle
            @click="$emit('update:opened', false)"
          >
            取消
          </Button>
        </FormItem>
        <Loading :loading='loading'></Loading>
      </Form>
    </div>
  </Modal>
</template>
<script>
import  { getApiURL } from '../../js/common/utils';

export default {
  name: 'ImportStudent',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    year: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      upload: {
        options: {
          target: `${getApiURL()}/student/upload`,
          headers: {
            token: ''
          },
          query: {
            idYear: 0,
            name: ''
          },
          testChunks: false,
          processParams: function (param) {
          },
          processResponse: function (resp) {
          }
        },
        attrs: {
          accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        single: true
      },
      query: {
        idClass: undefined,
        class: '',
        period: '',
        graduationYear: ''
      },
      loading: false,
      periods: [],
      graduationYears: [],
      classCodes: [],
      idYears: []
    };
  },
  computed: {
    uploadName() {
      let className = '';
      let graduateName = '';
      let periodName = '';
      if (this.query.idClass != undefined) {
        const idName = this.classCodes.find((c) => c.key == this.query.idClass)?.title;
        className = idName + '班';
      }
      if (this.query.class) {
        className = this.query.class;
      }
      if (this.query.graduationYear) {
        graduateName =
          this.graduationYears.find((c) => c.key == this.query.graduationYear)?.title +
          '级';
      }
      if (this.query.period) {
        periodName = this.periods.find((c) => c.key == this.query.period)?.title;
      }
      return `${periodName}${graduateName}${className}`;
    }
  },
  watch: {},
  created() {
    this.upload.options.processParams = this.processParams;
    this.upload.options.processResponse = this.processResponse;
    this.upload.options.headers.token = this.$store.getters['user'].token;
  },
  mounted() {
    this.getPeriod();
    this.getGraduation();
    this.getClassCodes();
  },
  methods: {
    processParams(param) {
      return {
        idYear: this.year.now,
        name: this.uploadName
      };
    },
    processResponse(resp) {
      resp = JSON.parse(resp);
      this.loading = false;
      this.$emit('update:opened', false);
      if (resp.ok) {
        HeyUI.$Message.success('上传成功');
        this.$emit('reload');
      } else {
        HeyUI.$Message.error(resp.msg);
      }
    },
    async getPeriod() {
      try {
        const res = await Ajax.get('/pcd/period/list');
        if (res.ok) {
          this.periods = res.body.map((i) => ({ key: i.order, title: i.value }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getGraduation() {
      try {
        const res = await Ajax.get('/class/year/list');
        if (res.ok) {
          this.graduationYears = res.body.map((i) => ({ key: i, title: i }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getYear() {
      try {
        const res = await Ajax.get('/year/list');
        this.idYears = res.body.map((y) => ({ key: y.id, title: y.name }));
      } catch (error) {
        console.error(error);
      }
    },
    async getClassCodes() {
      try {
        const res = await Ajax.get('/class/code/list');
        if (res.ok) {
          this.classCodes = res.body.map((i) => ({ key: i, title: i }));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.uploader-btn {
  border: 0 solid;
  padding: 0 0;
  line-height: 1;
  color: white;
}

.uploader-btn:hover {
  background-color: transparent;
}

.link {
  padding: 5px 10px;
}
</style>
