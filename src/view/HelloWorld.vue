<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Jump Lists</h2>
    <ul>
      <li v-for="item in jumpList">
        <button type="button" class="button green" @click="jump(item.path)">{{item.name}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      jumpList: [{name: 'pdf预览', path: 'pdfPreview'}, {name: 'word预览', path: 'wordPreview'}, {name: 'excel预览', path: 'excelPreview'}]
    }
  },
  methods: {
    jump(path) {
      this.$router.push({path: path})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.button{
  width: 140px;
  line-height: 38px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  text-shadow:1px 1px 1px #333;
  border-radius: 5px;
  margin:0 20px 20px 0;
  position: relative;
  overflow: hidden;
}
.button.green{
  border:1px solid #64c878;
  box-shadow: 0 1px 2px #b9ecc4 inset,0 -1px 0 #6c9f76 inset,0 -2px 3px #b9ecc4 inset;
  background: -webkit-linear-gradient(top,#90dfa2,#84d494);
  background: -moz-linear-gradient(top,#90dfa2,#84d494);
  background: linear-gradient(top,#90dfa2,#84d494);
}
</style>
