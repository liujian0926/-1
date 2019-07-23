<template>
	<div class="container">
		<div class="section">
			<el-button type="warning" size="small" @click="backPage">返回</el-button>
			<div class="content">
				<span class="title">处理人:</span>
				<span class="username">{{ appealResult.dealUser }}</span>
			</div>

			<div class="content">
				<span class="title">处理结果:</span>
				<span class="username">{{ appealResult.dealResult }}</span>
			</div>
			<div class="content">
				<span class="title">客服备注:</span>
				<span class="username">{{ appealResult.remake }}</span>
			</div>
			<div class="content">
				<span class="title">上传图片:</span>
				<span class="username" v-if="appealResult.imgUrl==''">
					<el-button type="text">未上传图片</el-button>
				</span>
				<span class="username" v-else>
					{{ appealResult.imgUrl }}
				</span>
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
				appealResult: {}
			}
		},
		created() {
			this.orderNo = this.$route.query.orderNo
			const data = {
				orderNo: this.orderNo
			}
			this.$get('/completeComplainOrder/getOrderCompleteRecordDetail', data).then(res => {
				// console.log(res)
				this.appealResult = res.data.appealResult //头部数据调用
			})
		},
		methods: {
			backPage() {
				this.$router.go(-1)
			}
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
			padding-top: 26px;
			box-sizing: border-box;

			.content {
				height: 21px;
				margin-top: 13px;

				.title {
					display: inline-block;
					height: 21px;
					width: 88px;
					color: #979dac;
					font-size: 14px;
					line-height: 21px;
					text-align: right;
					margin-right: 30px;
				}

				span {
					color: #253444;
					font-size: 14px;
				}

				input {
					height: 20px;
					width: 280px;
				}
			}
		}
	}
</style>
