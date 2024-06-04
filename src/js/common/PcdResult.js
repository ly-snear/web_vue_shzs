class PcdResult {
  constructor(rst, msg, data) {
    this.rst = rst;
    this.msg = msg;
    this.data = data;
  }

  toString() {
    return `rst:${this.rst}-->msg:${this.msg}-->data:${JSON.stringify(data)}`;
  }
}

export default PcdResult;
