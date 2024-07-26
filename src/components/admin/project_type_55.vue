<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange">
    <div
      class="drop-zone"
      @dragover.prevent
      @drop.prevent="handleDrop">
      <p>拖拽文件到此处或点击上传</p>
    </div>
    <div v-if="fileUrl">
      <img :src="fileUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      fileUrl: null
    }
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0]
      this.uploadFile()
    },
    handleDrop(event) {
      this.file = event.dataTransfer.files[0]
      this.uploadFile()
    },
    async uploadFile() {
      // 文件上传逻辑
      const response = await this.$axios.post('/upload', this.file)
      this.fileUrl = response.data.url
    }
  }
}
</script>

<style>
.drop-zone {
  border: 2px dashed gray;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>