export const typeMixins = {
  data() {
    return {
      select1: {
        val: 0,
        datas: []
      },
      select2: {
        val: 0,
        datas: []
      },
      select3: {
        val: 0,
        datas: []
      }
    };
  },
  computed: {
    domain() {
      console.log('domain:', this.select1.val, this.select2.val, this.select2.val);
      let result = this.select1.val * 1000 + this.select2.val * 100 + this.select3.val;
      console.log('计算结果:', result);
      return result;
    }
  },
  methods: {
    async getTextbook() {
      try {
        const res = await Ajax.get('/resource/typeall', { retain: 0 });
        console.log('分类：', res);
        if (res.body.length > 0) {
          const firstSubject = res.body[0];
          this.select1 = {
            val: firstSubject.key,
            datas: res.body
          };
          const firstGrade = (firstSubject.children || [])[0];
          if (firstGrade) {
            const firstTextBook = firstGrade.children[0];
            this.select2 = {
              val: firstGrade.key,
              datas: firstSubject.children
            };
            if (firstTextBook) {
              this.select3 = {
                val: firstTextBook.key,
                datas: firstGrade.children
              };
              if (this.tree) this.tree();
            }
          }
          let ps1 = localStorage.getItem('ps1');
          if (ps1 && this.select1) {
            this.select1.val = ps1;
            const datas = this.select1.datas.find((i) => i.key == this.select1.val);
            let id_select2 = 0;
            let data_select2 = [];
            if (datas != null && datas.children && datas.children.length > 0) {
              data_select2 = datas.children;
              id_select2 = data_select2[0].key;
            }
            let ps2 = localStorage.getItem('ps2');
            if (ps2) {
              id_select2 = ps2;
            }
            this.select2 = {
              val: id_select2,
              datas: data_select2
            };
            const datas23 = this.select2.datas.find((i) => i.key == this.select2.val);
            let id_select23 = 0;
            let data_select23 = [];
            if (datas23 != null && datas23.children && datas23.children.length > 0) {
              data_select23 = datas23.children;
              id_select23 = data_select23[0].key;
            }
            let ps3 = localStorage.getItem('ps3');
            if (ps3) {
              id_select23 = ps3;
            }
            this.select3 = { val: id_select23, datas: data_select23 };

          }
        }
      } catch (error) {
        console.error('获取资源类型错误', error);
      }
    },
    async change(idx = 1) {
      try {
        switch (idx) {
          case 1:
            if (this.select1.val) {
              // console.log('准备存储顶级KEY');
              localStorage.setItem('ps1', this.select1.val);
              // console.log('完成存储顶级KEY');
            }
            if (this.select1.val == null) {
              this.select2.val = null;
              this.select3.val = null;
            }
            const datas = this.select1.datas.find((i) => i.key == this.select1.val);
            let id_select2 = 0;
            let data_select2 = [];
            if (datas != null && datas.children && datas.children.length > 0) {
              data_select2 = datas.children;
              id_select2 = data_select2[0].key;
              // console.log(data_select2);
            }
            // console.log('二级：' + id_select2, data_select2);
            this.select2 = {
              val: id_select2,
              datas: data_select2
            };
            const datas23 = this.select2.datas.find((i) => i.key == this.select2.val);
            let id_select23 = 0;
            let data_select23 = [];
            if (datas23 != null && datas23.children && datas23.children.length > 0) {
              data_select23 = datas23.children;
              id_select23 = data_select23[0].key;
            }
            // console.log('三级：' + id_select23, data_select23);
            this.select3 = { val: id_select23, datas: data_select23 };
            // if (this.tree) this.tree();
            if (this.click && this.auto) {
              this.click({ id: 0, title: '根目录' });
            }
            if (this.tree && this.auto) {
              this.tree(this.inputId);
            }
            break;
          case 2:
            if (this.select2.val) {
              // console.log('准备存储次级KEY');
              localStorage.setItem('ps2', this.select2.val);
              // console.log('完成存储次级KEY');
            }
            if (this.select2.val == null) {
              this.select3.val = null;
            }
            const datas2 = this.select2.datas.find((i) => i.key == this.select2.val);
            let id_select3 = 0;
            let data_select3 = [];
            if (datas2 != null && datas2.children && datas2.children.length > 0) {
              data_select3 = datas2.children;
              id_select3 = data_select3[0].key;
              // console.log(data_select2);
            }
            this.select3 = {
              val: id_select3,
              datas: data_select3
            };
            // if (this.tree) this.tree();
            if (this.click && this.auto) {
              this.click({ id: 0, title: '根目录' });
            }
            if (this.tree && this.auto) {
              this.tree(this.inputId);
            }
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('获取资源类型联动错误', error);
      }
    }
  }
};
