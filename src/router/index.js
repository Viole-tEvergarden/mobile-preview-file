import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'


import pdfPreview from '@/view/demo/pdf-preview'
import wordPreview from '@/view/demo/word-preview'
import excelPreview from '@/view/demo/excel-preview'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pdfPreview',      //pdf预览
      name: 'pdfPreview',
      component: pdfPreview
    },
    {
      path: '/wordPreview',     //word预览
      name: 'wordPreview',
      component: wordPreview
    },
    {
      path: '/excelPreview',    //excel预览
      name: 'excelPreview',
      component: excelPreview
    }
  ]
})
