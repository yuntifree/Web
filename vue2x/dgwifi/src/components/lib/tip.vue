<style>
.tip {
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%, -50%);
	padding:.2rem;
	background-color: #000;
	border-radius: .12rem;
	color: #fff;
}
.top50 {
    top:0;
    margin-top:1rem;
}
</style>

<template>
<div class="tip g-font14" v-show="show" transition="fade" :class="{top50:tipinfo.tooltip}">
	{{tipinfo.msg}}
</div>
</template>

<script>
export default {
	props: {
		tipinfo: {
			msg: String,
			duration: Number,
			show: Boolean,
      tooltip: Boolean
		}
	},
	computed: {
		show() {
			return this.tipinfo.show;
		}
	},
	watch: {
		show(val) {
			if (this._timeout) clearTimeout(this._timeout);
			if (val && !!this.tipinfo.duration) {
			    //this._timeout = setTimeout(()=> this.show = false, this.duration);
			    this._timeout = setTimeout(()=> {
			    	this.$emit('tip-show');
			    	console.log(this.tipinfo.duration);
			    }, this.tipinfo.duration);
			}
		}
	}
}
</script>
