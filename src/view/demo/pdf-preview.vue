<template>
  <div class="pdf">
    <div class="pdf-tab">
      <div
        class="btn-def btn-pre"
        @click.stop="prePage">上一页
      </div>
      <div
        class="btn-def btn-next"
        @click.stop="nextPage">下一页
      </div>
    </div>
    <div>{{pageNum}}/{{pageTotalNum}}</div>
    <div class="any-scroll-view">
      <div ref="body" :style="bodyStyle">
        <pdf
          id="pdfPreview"
          ref="pdf"
          :src="pdfUrl"
          :page="pageNum"
          :rotate="pageRotate"
          @password="password"
          @progress="loadedRatio = $event"
          @page-loaded="pageLoaded($event)"
          @num-pages="pageTotalNum=$event"
          @error="pdfError($event)"
          @link-clicked="page = $event">
        </pdf>
      </div>
    </div>
  </div>
</template>


<script>
import pdf from 'vue-pdf'
import AlloyFinger from "../../../static/js/alloyfinger.js";
import Transform from "../../../static/js/transform.js";
import To from "../../../static/js/to.js";


export default {
  name: "pdfPreview",
  data() {
    return {
      acceleration: 3600,         // 减速度, 单位px/s²
      id: '',
      pdfUrl:'../../../static/file/testPdf.pdf',                  // pdf文件地址
      pageNum:1,
      pageTotalNum:1,
      pageRotate:0,
      loadedRatio:0,               // 加载进度
      curPageNum:0,
      transitionDuration: 300,
      af: null
    };
  },
  created(){
    //目前是本地url，真实情况向会请求后台获取到文件流，转为url传到此页面
    // this.getParams()
  },
  computed: {
    bodyStyle() {
      return {
        transitionDuration: `${this.transitionDuration}ms`,
        transform: `translate(${this.scrollLeft}px, ${
          this.scrollTop
        }px)`
      };
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      let routerParams = this.$route.params.id
      // 将数据放在当前组件的数据内
      this.id = routerParams
      this.pdfUrl = pdf.createLoadingTask(this.$route.params.url)
    },
    getData() {
      let that = this;
      let element = document.getElementById("pdfPreview");
      Transform(element);
      let initScale = 1;
      this.af = new AlloyFinger(element, {
        rotate: function (evt) {  //实现旋转
          element.rotateZ += evt.angle;
        },
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
    prePage(){
      let p = this.pageNum
      p = p>1?p-1:this.pageTotalNum
      this.pageNum = p
    },
    nextPage(){
      let p = this.pageNum
      p = p<this.pageTotalNum?p+1:1
      this.pageNum = p
    },
    password(updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
    },
    pageLoaded(e){
      this.curPageNum = e
    },
    pdfError(error){
      console.error(error)
    },
  },
  components:{
    pdf
  },
}
</script>

<style scoped>
#app {
  font-family: Avenir,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  min-height: 100vh;
}
.pdf-tab {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0 .4rem;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.pdf-tab .btn-def {
  border-radius: .2rem;
  font-size: .98rem;
  height: 1.93333rem;
  width: 6.4rem;
  text-align: center;
  line-height: 1.93333rem;
  background: #409eff;
  color: #fff;
  margin-bottom: 1.26667rem;
}
.pdf-total {
  text-align: center;
  font-size: 1.45333rem;
}
.pdf-process, .pdf-total {
  text-align: center;
  font-size: 1.45333rem;
}
.pdf-num {
  margin-bottom: 1.2rem;
}
</style>
