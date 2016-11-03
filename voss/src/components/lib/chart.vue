<style>
	.shade {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 0;
	}
	.chart-wrap {
		width: 600px;
		height: 450px;
		position: absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		z-index: 100;
	}
	.chart {
		width: 600px;
		height: 400px;
		background-color: #fff;
		margin-top: 5px;
	}
 .btn-ops {
		text-align: right;
		z-index: 100;
	}
.btn-ops button {
	display: inline-block;
	width: 87px;
	padding: 6px 0;
	text-align: center;
}
</style>
<template>
	<section class="shade" @click="chartHide">
		<div class="chart-wrap">
		<div class="btn-ops" v-if="chartmsg.btnShow">
		  <button type="button" class="btn btn-default outline-none" @click.stop="before"><i class="glyphicon glyphicon-pencil"></i>{{chartmsg.msgLast}}</button>
		  <button type="button" class="btn btn-default outline-none" @click.stop="future"><i class="glyphicon glyphicon-pencil"></i>{{chartmsg.msgFuture}}</button>
		  <button type="button" class="btn btn-default outline-none" @click.stop="today"><i class="glyphicon glyphicon-pencil"></i>{{chartmsg.msgToday}}</button>
		</div>
			<div class="chart" v-el:chart></div>
		</div>
	</section>
</template>
<script>
import CGI from '../../lib/cgi.js'
var chartInst;
export default {
	props: {
		chart: Object,
		btnshow: Boolean,
		chartmsg: Object,
	},
	ready() {
		CGI.loadScript(__CDN__+'/js/echarts.common.min.js', 'chartjs', ()=>{
			chartInst = echarts.init(this.$els.chart);
			chartInst.setOption(this.chart);
		})
	},
	methods: {
		chartHide() {
			this.$dispatch('chart-hide');
		},
		before() {
			this.$dispatch('data-delta', -1);
		},
		today() {
			this.$dispatch('data-today');
		},
		future() {
			this.$dispatch('data-delta', 1);
		}
	},
	events: {
		'chart-refresh': function() {
			chartInst.setOption(this.chart);
		}
	}
}

</script>