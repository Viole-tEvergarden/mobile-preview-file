<template>
  <div class="excel-container">
    <div ref="docPreview"></div>
  </div>
</template>

<script>
import mammoth from 'mammoth'
import AlloyFinger from "../../../static/js/alloyfinger.js";
import Transform from "../../../static/js/transform.js";

export default {
  name: "wordPreview",
  data () {
    return {
      url: '../../../static/file/testWord.docx',			//这里使用相对路径
      card: [],
      cardActive: '',
      workbook: {},
      data: [],
      af: null
    }
  },
  mounted () {
    this.previewFile();

    this.getData();
  },
  methods: {
    previewFile() {
      let _this=this;
      try {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.responseType = "arraybuffer";
        console.log(xhr)
        xhr.onload = function(e) {
          let arrayBuffer = xhr.response; //arrayBuffer

          mammoth
            .convertToHtml({ arrayBuffer: arrayBuffer })
            .then(displayResult)
            .done();

          function displayResult(result) {
            console.log(result);
            _this.$refs.docPreview.innerHTML = result.value || "";
          }
        };
        xhr.send();
      } catch (e) {
        console.log(e);
      }
    },
    getData() {
      let that = this;
      let element = that.$refs.docPreview;
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

<style scoped>

</style>
