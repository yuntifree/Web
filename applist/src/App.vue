<style>
	@import './assets/css/reset.css';
</style>
<template>
  <div>
    <list></list>
  </div>
</template>

<script>
import list from './components/list.vue'
import CGI from './lib/cgi.js'

export default{
	components: {
		list,
	}
}
</script>
