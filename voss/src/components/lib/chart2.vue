<style>
	.chart2-wrap {
		width: 800px;
		height: 450px;
		margin: 5% auto 0;
	}
	.chart2 {
		width: 800px;
		height: 400px;
		background-color: #fff;
		margin-top: 5px;
	}
</style>
<template>
		<div class="chart2-wrap">
			<div class="chart2" v-el:chart></div>
		</div>
	</section>
</template>
<script>
import CGI from '../../lib/cgi.js'
var chartInst;
export default {
	props: {
		chart: Object,
	},
	ready() {
		CGI.loadScript('http://cdn.hcharts.cn/highcharts/highcharts.js', 'chartjs', ()=>{
			$(this.$els.chart).highcharts(this.chart);
		})
	},
	events: {
		'chart-refresh': function() {
			$(this.$els.chart).highcharts(this.chart);
		}
	}
}

</script>