<template>
  <div class="excel-container">
    <div ref="preview"></div>
  </div>
</template>

<style sceped>
.excel-container {
  width: 100%;
}
table {
  table-layout: fixed !important;
  width: 100% !important;
  border-collapse:collapse;
  border:none;
  font-size:0.23rem;
}
td,th {
  width:1px;
  white-space:nowrap; /* 自适应宽度*/
  word-break:keep-all; /* 避免长单词截断，保持全部 */
  border:solid #676767 1px;
  text-align:center;
  white-space:pre-line;
  word-break:break-all !important;
  word-wrap:break-word !important;
  display:table-cell;
  vertical-align:middle !important;
  white-space: normal !important;
  height:auto;
  vertical-align:text-top;
  padding:2px 2px 0 2px;
  display: table-cell;
}
</style>

<script>
import * as XLSX from 'xlsx'
import AlloyFinger from "../../../static/js/alloyfinger.js";
import Transform from "../../../static/js/transform.js";

export default {
  name: "excelPreview",
  data () {
    return {
      id: '',
      url: '../../../static/file/testExcel.xlsx',			//excel文件地址，这里使用相对路径
      goPath: '',       //将要去的界面
      af: null
    }
  },
  created(){
    //目前是本地url，真实情况向会请求后台获取到文件流，转为url传到此页面
    // this.getParams()
  },
  mounted () {
    this.readWorkbookFromRemoteFile(this.url);

    this.getData();
  },
  methods: {
    //获取文件url
    getParams() {
      // 取到路由带过来的参数
      let routerParams = this.$route.params.id
      // 将数据放在当前组件的数据内
      this.id = routerParams
      this.url = this.$route.params.url
    },
    //读取文件中的工作簿
    readWorkbookFromRemoteFile(url) {
      let xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'arraybuffer'
      let _this = this
      xhr.onload = function (e) {
        let binary = "";
        if (xhr.status === 200) {
          let bytes  = new Uint8Array(xhr.response)
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          console.log(binary)
          let wb = XLSX.read(binary, { type: "binary" });
          let sheetName = wb.SheetNames[0];
          console.log(wb)
          let ws = wb.Sheets[sheetName];
          let HTML = XLSX.utils.sheet_to_html(ws);
          if (_this.$refs.preview) {
            _this.$refs.preview.innerHTML = HTML;
          }
        }
      }
      xhr.send()
    },
    getData() {
      let that = this;
      let element = that.$refs.preview;
      Transform(element);
      let initScale = 1;
      this.af = new AlloyFinger(element, {
        // rotate: function (evt) {  //实现旋转
        //   element.rotateZ += evt.angle;
        // },
        multipointStart: function () {
          initScale = element.scaleX;
        },
        pinch: function (evt) {   //实现缩放
          element.scaleX = element.scaleY = initScale * evt.zoom;
        },
        pressMove: function (evt) {   //实现移动
          element.translateX += evt.deltaX;
          element.translateY += evt.deltaY;
          evt.preventDefault();
        },
      });
    },
  }
}
</script>

