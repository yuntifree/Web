<style>
	 .fade-transition{
	    width:100%;
	    height:100%;
	    overflow: hidden;
	}
	.prevideo {
		width: 100%;
		height: 100%;
		padding: 0;
	}
	
	.prevideo .prevideo-row {
		width: 98%;
		height: 100%;
		overflow-y:scroll;
		margin: 0 auto;
		padding: 0;
	} 
	.prevideo .prevideo-row div{
		margin-bottom:30px;
	}
</style>
<template>
	<div class="container-fluid  prevideo">
	  <div class="row-fluid prevideo-row">
	   	<div class="col-md-3 col-sm-3 col-lg-3" v-for="vid in videos"><img :src="vid" style="height:100%;width:100%" alt=""></div>
	  </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				videos: ['/1.jpg',
						'/1.jpg',
						'/1.jpg',
						'/1.jpg',
						'/1.jpg',
						'/1.jpg',
						'/1.jpg',
						'/1.jpg',
						'/1.jpg',
						'/1.jpg',
						'/1.jpg'
						]
			}
		}
	}
</script>