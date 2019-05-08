<template>
  <div id="app">
  		<router-view></router-view>
  </div>
</template>

<script>
	import Vue from 'vue'
	export default {
	 	name: 'app',
	    mounted:function(){
	  	}
	}
</script>

<style>
#app {
  font-family: '\u5FAE\u8F6F\u96C5\u9ED1', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  height:100%;
}
</style>
