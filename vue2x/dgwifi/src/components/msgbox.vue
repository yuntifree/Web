<style>
	.msgbox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 70%;
		border:1px solid #ccc;
		border-radius: .25rem;
		background-color: #fff;
	}
	.msgbox-title {
		margin-top: .36rem;
		font-size: .32rem;
		color: rgba(0, 0, 0, 0.8);
		padding:0 .6rem;
	}
	.msg-info {
		font-size: .3rem;
		color: rgba(0, 0, 0, 0.6);
		padding: 0 .6rem;
	}
	.msg-account {
		margin: .32rem 0 .24rem 0;
	}
	.footer-btn {
		margin-top:.36rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 1.1rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}
	.footer-btn button {
		width: 50%;
		font-size: .32rem;
		color: #fb6801;
		border-right: 1px solid rgba(0, 0, 0, 0.1);
	}
	.footer-btn button:last-child{
		border-right: 0;
		color: rgba(0, 0, 0, 0.6);
	}
</style>
<template>
	<div class="msgbox g-font12">
		<h2 class="msgbox-title g-tac">确认充值</h2>
		<p class="msg-info msg-account">账号：{{infos.name}}(ID:{{infos.tuid}})</p>
		<p class="msg-info">金额：{{infos.price | price}}元</p>
		<div class="footer-btn">
			<button @click="charge">充值</button>
			<button @click="cancel">取消</button>
		</div>
	</div>
</template>
<script>
	export default{
		props: {
			infos: Object,
		},
		methods: {
			cancel() {
				this.$dispatch('msgbox-cancel');
			},
			charge() {
				this.$dispatch('msgbox-sure')
			}
		}
	}
</script>