<template>
  <div class='body-head'>
    <Row :space-x='19' :space-y='5' style='margin-top: 5px'>
      <Cell width='7'>&nbsp;</Cell>
      <Cell width='2'>
        <Tooltip content='录入版本号码'>
          <input type='number' v-model='versionCode' placeholder='版本号' class='search-text' />
        </Tooltip>
      </Cell>
      <Cell width='2'>
        <Tooltip content='录入版本展示名称'>
          <input type='text' v-model='versionName' placeholder='版本展示名称' class='search-text' />
        </Tooltip>
      </Cell>
      <Cell width='2'>
        <Tooltip content='录入学校标签'>
          <input type='text' v-model='SchoolTag' placeholder='学校标签' class='search-text' />
        </Tooltip>
      </Cell>
      <Cell width='2'>
        <Tooltip content='录入安装包MD5签名'>
          <input type='text' v-model='ApkMd5' placeholder='安装包MD5签名' class='search-text' />
        </Tooltip>
      </Cell>
      <Cell width='2'>
        <Tooltip content='录入安装包名称'>
          <input type='text' v-model='AppKey' placeholder='安装包名称' class='search-text' />
        </Tooltip>
      </Cell>
      <Cell width='2'>
        <Button color='primary' @click='searchItem'>搜索</Button>
      </Cell>
      <Cell width='2'>
        <Button color='green' :loading='ossding' @click='newItem'>新增</Button>
      </Cell>
      <Cell width='2'>
        <Button color='red' :loading='ossding' @click='deleteItems($event)'>删除</Button>
      </Cell>
      <Cell width='1'>&nbsp;</Cell>
    </Row>
    <hr />
    <Table ref='update_list' :datas='datas' :border='border' :checkbox='checkbox' :stripe='stripe' :selectRow='true'
           :loading='loading'>
      <TableItem title='版本号' :width='60' align='center' prop='versionCode'></TableItem>
      <TableItem title='文件大小' :width='80' align='center' prop='apkSize'></TableItem>
      <TableItem title='更新状态' :width='60' align='center' prop='updateStatus'></TableItem>
      <TableItem title='展示名称' :width='100' align='center' prop='versionName'></TableItem>
      <TableItem title='包名称' :width='110' align='center' prop='appKey'></TableItem>
      <TableItem title='包MD5签名' :width='150' align='center' prop='apkMd5'></TableItem>
      <TableItem title='学校签名' :width='100' align='center' prop='schoolTag'></TableItem>
      <TableItem title='下载地址' :width='100' align='center'>
        <template slot-scope='{data}'>
          <Tooltip :content='`下载地址：${data.downloadUrl}`'>
            <a :href='data.downloadUrl'>下载</a>
          </Tooltip>
        </template>
      </TableItem>
      <TableItem title='升级描述' prop='modifyContent'></TableItem>
      <TableItem title='操作' :width='200' align='center'>
        <template slot-scope='{data}'>
          <Button color='primary' @click='editItem(data)'>修改</Button>
          <Button color='red' @click='deleteItem(data)'>删除</Button>
        </template>
      </TableItem>
    </Table>
    <Modal v-model='show' :hasCloseIcon='true'>
      <div class='editor'>
        <div class='title'>{{ editor.title }}</div>
        <hr />
        <div class='item'>
          <div class='label'>版本号：</div>
          <div class='input-box'>
            <input type='number' v-model='editor.versionCode' placeholder='版本号' />
          </div>
        </div>
        <div class='item'>
          <div class='label'>升级包大小：</div>
          <div class='input-box'>
            <input type='text' v-model='editor.fileSize' placeholder='升级包大小' readonly />
          </div>
        </div>
        <div class='item'>
          <div class='label'>更新方式：</div>
          <div class='input-box'>
            <Select v-model='editor.UpdateStatus' :datas='states' placeholder='选择更新方式'></Select>
          </div>
        </div>
        <div class='item'>
          <div class='label'>版本展示名称：</div>
          <div class='input-box'>
            <input type='text' v-model='editor.versionName' placeholder='版本展示名称' />
          </div>
        </div>
        <div class='item'>
          <div class='label'>包名称：</div>
          <div class='input-box'>
            <input type='text' v-model='editor.appKey' placeholder='包名称' />
          </div>
        </div>
        <div class='item'>
          <div class='label'>包MD5签名：</div>
          <div class='input-box'>
            <input type='text' v-model='editor.apkMd5' placeholder='包MD5签名' />
          </div>
        </div>
        <div class='item'>
          <div class='label'>学校标签：</div>
          <div class='input-box'>
            <input type='text' v-model='editor.schoolTag' placeholder='学校标签' />
          </div>
        </div>
        <div class='item' style='height: 96px'>
          <div class='label'>升级描述：</div>
          <div class='input-box'>
            <textarea v-model='editor.modifyContent' placeholder='升级描述' />
          </div>
        </div>
        <div class='item'>
          <div class='label'>上传升级包：</div>
          <div class='input-box'>
            <input class='select-file' type='text' v-model='editor.downloadUrl' placeholder='选择升级包' readonly
                   @click='getOss($event)' />
          </div>
        </div>
        <div class='item' v-if='editor.size>0 && editor.size<editor.total'>
          <span>正在上传：</span><span>{{ editor.size }}</span><span>/</span><span>{{ editor.total
          }}</span><span>====></span><span>{{ String(editor.percent) }}%</span>
        </div>
        <hr />
        <div class='buttons'>
          <Button color='primary' :loading='ossding' @click='saveItem($event)'>保存</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { filterSize, getTime, guid, getRandomChar } from '../../js/common/utils';
import Axios from 'axios';

export default {
  name: 'soft_update',
  data() {
    return {
      versionCode: 0,
      versionName: '',
      SchoolTag: '',
      ApkMd5: '',
      AppKey: '',
      border: false,
      stripe: false,
      checkbox: true,
      serial: false,
      loading: false,
      ossding: false,
      show: false,
      datas: [],
      states: [{ title: '不更新', key: 0 }, { title: '有更新版本', key: 1 }, { title: '强制更新', key: 2 }],
      editor: {
        id: 0,
        title: '',
        versionCode: 0,
        ApkSize: 0,
        fileSize: '',
        UpdateStatus: 2,
        versionName: '',
        appKey: '',
        apkMd5: '',
        schoolTag: '',
        modifyContent: '',
        downloadUrl: '',
        percent: 0,
        size: 0,
        total: 0,
        apk: null
      },
      selected: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let url = '/update/list';
      let param = {
        VersionCode: this.versionCode,
        VersionName: this.versionName,
        SchoolTag: this.SchoolTag,
        ApkMd5: this.ApkMd5,
        AppKey: this.AppKey
      };
      // console.log(param);
      this.loading = true;
      Ajax.get(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.datas = resp.body;
          if (this.datas && this.datas.length > 0) {
            this.$refs.update_list.rowSelected = this.datas[this.selected];
          }
        } else {
          this.$Message.error(resp.msg);
        }
      }).catch((ex) => {
        console.log(ex);
        this.$Message.error('读取升级数据错误：' + JSON.stringify(ex));
      });
    },
    deleteItem(row) {
      // console.log(row);
      let caps = `确认要删除选择的升级记录：${row.versionName}？`;
      this.$Confirm(caps, '删除记录').then(() => {
        let ids = [];
        ids.push(row.id);
        let param = ids;
        let url = '/update/delete';
        this.ossding = true;
        Ajax.postJson(url, param).then((resp) => {
          this.ossding = false;
          if (resp.ok) {
            this.$Message.success(`删除：${row.versionName}，成功！`);
            this.loadData();
          } else {
            this.$Message.error(`删除选择的记录失败-->` + resp.msg);
          }
        });
      }).catch((ex) => {
        this.ossding = false;
        this.$Message.error('取消删除');
      });
    },
    editItem(row) {
      // console.log(row);
      this.editor.id = row.id;
      this.editor.versionCode = row.versionCode;
      this.editor.ApkSize = row.apkSize;
      this.editor.fileSize = filterSize(row.apkSize);
      this.editor.UpdateStatus = row.updateStatus;
      this.editor.versionName = row.versionName;
      this.editor.appKey = row.appKey;
      this.editor.apkMd5 = row.apkMd5;
      this.editor.schoolTag = row.schoolTag;
      this.editor.modifyContent = row.modifyContent;
      this.editor.downloadUrl = row.downloadUrl;
      this.editor.title = '编辑安卓端升级记录';
      this.show = true;
    },
    searchItem() {
      this.loadData();
    },
    newItem() {
      this.editor.id = 0;
      this.editor.versionCode = 0;
      this.editor.ApkSize = 0;
      this.editor.fileSize = '';
      this.editor.UpdateStatus = 2;
      this.editor.versionName = '';
      this.editor.appKey = '';
      this.editor.apkMd5 = '';
      this.editor.schoolTag = 'beijing-nny';
      this.editor.modifyContent = '';
      this.editor.downloadUrl = '';
      this.editor.title = '新增安卓端升级记录';
      this.show = true;
    },
    getOss(evt) {
      let url = '/user/oss/token';
      let param = {
        url: url
      };
      let that = this;
      this.ossding = true;
      Ajax.get(url, param).then((resp) => {
        this.ossding = false;
        if (resp.ok) {
          let oss = resp.body;
          if (!oss) {
            this.$Message.error('获取阿里云上传令牌错误');
            return;
          }
          that.updateApk(evt, oss);
        } else {
          this.$Message.error(resp.msg);
        }
      }).catch((ex) => {
        this.ossding = false;
      });
    },
    updateApk(evt, oss) {
      let that = this;
      let apk = document.createElement('input');
      apk.setAttribute('type', 'file');
      apk.setAttribute('accept', 'application/vnd.android.package-archive');
      apk.setAttribute('style', 'display: none;');
      apk.onchange = function (e) {
        apk.remove();
        if (!e.target.files || !e.target.files[0]) {
          this.$Message.error('选择升级包');
          return;
        }
        that.editor.apk = e.target.files[0];
        that.editor.fileSize = filterSize(that.editor.apk.size);
        that.editor.ApkSize = that.editor.apk.size;
        // console.log(that.editor.ApkSize);
        // console.log(that.editor.apk);
        // console.log(oss);
        let types = that.editor.apk.name.split('.');
        let type = types[types.length - 1];
        let exts = type.split('/');
        let ext = exts[exts.length - 1].replace('jpeg', 'jpg');
        let time = getTime().replace('-', '_').replace('-', '_').replace(' ', '_').replace(':', '_').replace(':', '_');
        let key = oss.dir + '/' + ext + '/' + time + '_' + guid() + '_' + getRandomChar(7, false) + '.' + ext;

        const form = new FormData();
        form.append('key', key);
        form.append('file', that.editor.apk);
        form.append('policy', oss.policy);
        form.append('ossAccessKeyId', oss.accessid);
        form.append('signature', oss.signature);
        form.append('success_action_status', '200');

        let url = oss.host;
        let param = {
          url: url,
          method: 'post',
          processData: false,
          data: form,
          contentType: 'multipart/form-data',
          onUploadProgress: progressEvent => {
            that.editor.total = progressEvent.total;
            that.editor.size = progressEvent.loaded;
            that.editor.percent = ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2);
          }
        };

        let thiss = that;
        Axios(param).then(res => {
          if (res.status == 200 && res.statusText == 'OK') {
            let fileUrl = 'https://' + oss.domain + '/' + key;
            that.editor.downloadUrl = fileUrl;
            that.editor.size = 0;
            that.editor.total = 0;
            that.editor.percent = 0;
          } else {
            console.log(res);
            thiss.$Message.error(`AliyunOSS服务器错误-->${res.status}：${res.statusText}`);
          }
        }, error => {
          console.log(error);
          thiss.$Message.error(`上传错误：${JSON.stringify(error)}`);
        }).catch(ex => {
          console.log(ex);
          thiss.$Message.error(`上传异常：${JSON.stringify(ex)}`);
        });
      };
      apk.click();
    },
    saveItem(evt) {
      let url = '/update/save';
      let param = {
        id: this.editor.id,
        versionCode: this.editor.versionCode,
        updateStatus: this.editor.UpdateStatus,
        versionName: this.editor.versionName,
        modifyContent: this.editor.modifyContent,
        downloadUrl: this.editor.downloadUrl,
        apkSize: this.editor.ApkSize,
        apkMd5: this.editor.apkMd5,
        appKey: this.editor.appKey,
        schoolTag: this.editor.schoolTag
      };
      // console.log('保存参数:', param);
      if (!param.downloadUrl || param.downloadUrl.length == 0) {
        this.$Message.error('请选择要更新的安卓文件');
        return;
      }
      if (!param.apkMd5 || param.apkMd5.length == 0) {
        this.$Message.error('录入升级包文件MD5验证码');
        return;
      }
      if (!param.appKey || param.appKey.length == 0) {
        this.$Message.error('录入升级包文件的包名称');
        return;
      }
      if (!param.schoolTag || param.schoolTag.length == 0) {
        this.$Message.error('录入使用升级包的学校标签');
        return;
      }
      this.ossding = true;
      Ajax.postJson(url, param).then((resp) => {
        this.ossding = false;
        if (resp.ok) {
          this.$Message.success(`保存升级数据成功`);
          this.show = false;
          this.loadData();
          let _index = this.datas.findIndex(i => i.id == resp.body.id);
          _index = _index == -1 ? 0 : _index;
          this.selected = _index;
        } else {
          this.$Message.error(resp.msg);
        }
      }).catch((ex) => {
        this.$Message.error(`保存升级数据失败-->${JSON.stringify(ex)}`);
      });
    },
    deleteItems(evt) {
      let selecteds = this.$refs.update_list.getSelection();
      if (!selecteds || selecteds.length == 0) {
        this.$Message.error(`选择要删除的升级记录`);
        return;
      }
      let caps = '';
      let ids = [];
      for (let i = 0; i < selecteds.length; i++) {
        ids.push(selecteds[i].id);
        if (i == selecteds.length - 1) {
          caps += selecteds[i].versionName;
        } else {
          caps += selecteds[i].versionName + ',';
        }
      }
      let title = `确认要删除选择的升级记录：${caps}？`;
      this.$Confirm(title, '删除记录').then(() => {
        let param = ids;
        let url = '/update/delete';
        this.ossding = true;
        Ajax.postJson(url, param).then((resp) => {
          this.ossding = false;
          if (resp.ok) {
            this.$Message.success(`删除：${caps}，成功！`);
            this.loadData();
          } else {
            this.$Message.error(`删除选择的记录失败-->` + resp.msg);
          }
        });
      }).catch((ex) => {
        this.ossding = false;
        this.$Message.error('取消删除');
      });
      console.log(selecteds);
    }
  }
};
</script>

<style lang='less' scoped>
.arrange_row() {
  display: flex;
  flex-direction: row;
}

.arrange_col() {
  display: flex;
  flex-direction: column;
}

.singe-line {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}

.double-line {
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.over-line {
  height: 65px;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.body-head {
  width: 100%;

  .search-text {
    width: 100%;
  }
}

.editor {
  width: 900px;

  .title {
    width: 100%;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  .item {

    .arrange_row();
    margin-top: 5px;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;

    .label {
      margin-left: 5px;
      width: 100px;
      text-align: right;
    }

    .input-box {
      margin-left: 5px;
      width: calc(100% - 115px);

      & > input {
        width: 100%;
      }

      & > textarea {
        width: 100%;
        height: 96px;
      }
    }
  }

  .buttons {
    .arrange_row();
    justify-content: center;
    align-items: center;
  }
}

.select-file {
  &:hover {
    cursor: pointer;
  }
}
</style>
