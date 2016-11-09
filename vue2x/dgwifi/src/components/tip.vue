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
</style>

<template>
<div class="tip g-font14" v-show="show" transition="fade">
	{{msg}}
</div>
</template>

<script>
export default {
	props: {
		msg: String,
		duration: Number,
		show: Boolean,
	},
	watch: {
		show(val) {
			if (this._timeout) clearTimeout(this._timeout)
			if (val && !!this.duration) {
			    this._timeout = setTimeout(()=> this.show = false, this.duration);
			}
		}
	}
}
</script>