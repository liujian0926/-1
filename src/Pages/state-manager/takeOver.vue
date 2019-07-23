<template>
	<div class="container">
		<div class="section">
		<el-button type="warning" size="small" @click="backPage">返回</el-button>
		<el-button type="primary" size="small" class="btn" @click="jieguan">接管处理</el-button>
			<detailsofcomplaint :isShow="true"></detailsofcomplaint>
		</div>
	</div>
</template>
<script>
	import detailsofcomplaint from './DetailsOfComplaint.vue'
	export default {
		created() {
			this.orderNo = this.$route.query.orderNo
		},
		methods: {
			backPage() {
				this.$router.go(-1)
			},
			jieguan() {
				this.$post('/untreatedComplainOrder/update', {
						orderNo: this.orderNo
				}).then(res => {
					this.$message.success('成功')
				})
			},
		},
		components: {
			detailsofcomplaint
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;

		.section {
			height: 100%;
			width: 100%;
			padding-top: 12px;
			box-sizing: border-box;
		}
	}
</style>
