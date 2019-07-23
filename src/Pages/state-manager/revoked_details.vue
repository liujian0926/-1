<template>
	<div class="container">
		<div class="section">
			<el-button type="warning" size="small" @click="backPage">返回</el-button>
			<div class="conductor">
				<span>撤销时间:</span>
				<span>{{ appealResult.updateTime }}</span>
			</div>
			<detailsofcomplaint></detailsofcomplaint>
		</div>
	</div>
</template>

<script>
	import detailsofcomplaint from './DetailsOfComplaint.vue'
	export default {
		data() {
			return {
				orderNo: '',
				appealResult: '',
			}
		},
		methods: {
			backPage() {
				this.$router.go(-1)
			}
		},
		created() {
			this.orderNo = this.$route.query.orderNo
			this.$get('/completeComplainOrder/getOrderCompleteRecordDetail', {
				orderNo: this.orderNo
			}).then(res => {
				// console.log(res)
				this.appealResult = res.data.appealResult //头部数据调用
			})
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
			
			.conductor {
				height: 40px;
				line-height: 40px;
				background: #F8F8FA;
				margin-top: 10px;

				span {
					display: inline-block;
					padding-left: 20px;
					color: #979DAC;
					font-size: 14px;
				}
			}
		}
	}
</style>
