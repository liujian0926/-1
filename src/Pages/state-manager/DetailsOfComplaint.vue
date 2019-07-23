<template>
	<div class="neir">
		<el-divider></el-divider>
		<div class="content">
			<span class="title">申诉单号:</span>
			<span class="username">{{ appealUser.complainNo }}</span>
		</div>
		<div class="content">
			<span class="title">发起日期:</span>
			<span class="username">{{ appealUser.addTime }}</span>
		</div>
		<div class="content">
			<span class="title">申诉类型:</span>
			<span class="username">{{ appealUser.appealType }}</span>
		</div>
		<div class="content">
			<span class="title">客户名称:</span>
			<span class="username">{{ appealUser.name }}</span>
		</div>
		<div class="content">
			<span class="title">用户类型:</span>
			<span class="username" v-if="appealUser.userType == 1">A用户</span>
			<span class="username" v-else-if="appealUser.userType == 2">B用户</span>
		</div>
		<div class="content">
			<span class="title">保证金:</span>
			<span class="username">{{ appealUser.deposit }}</span>
		</div>
		<div class="content">
			<span class="title">实名认证:</span>
			<span class="username" v-if="appealUser.isAuth == 0">未认证</span>
			<span class="username" v-else-if="appealUser.isAuth == 1">已认证</span>
			<span class="username" v-else-if="appealUser.isAuth == 2">认证失败</span>
			<span class="username" v-else-if="appealUser.isAuth == 3">未审核</span>
		</div>
		<div class="content">
			<span class="title">发起申诉次数:</span>
			<span class="username">{{ appealUser.appealCount }}</span>
		</div>
		<div class="content">
			<span class="title">被起诉次数:</span>
			<span class="username">{{ appealUser.appealedCount }}</span>
		</div>
		<div class="content">
			<span class="title">客户电话:</span>
			<span class="username">{{ appealUser.mobile }}</span>
		</div>
		<div class="content">
			<span class="title">客户ID:</span>
			<span class="username">{{ appealUser.userId }}</span>
		</div>
		<div class="content">
			<span class="title">申诉内容:</span>
			<span class="username">{{ appealUser.content }}</span>
		</div>

		<!-- 当前订单申诉 -->
		<template v-if="appealUser.appealType == '卖出申诉'">
			<div class="shuju">
				<div class="show">
					<span>订单状态</span>
					<template v-if="appealUser.appealType == '卖出申诉'">
						<span v-if="appearlOrder.orderStatus == 1">已接单</span>
						<span v-else-if="appearlOrder.orderStatus == 2">待付款</span>
						<span v-else-if="appearlOrder.orderStatus == 3">未到账</span>
						<span v-else-if="appearlOrder.orderStatus == 4">待确认</span>
						<span v-else-if="appearlOrder.orderStatus == 5">已完成</span>
						<span v-else-if="appearlOrder.orderStatus == 6">手动取消</span>
						<span v-else-if="appearlOrder.orderStatus == 7">自动取消</span>
					</template>
					<template v-else>
						<span v-if="appearlOrder.orderStatus == 1">已提交</span>
						<span v-else-if="appearlOrder.orderStatus == 2">待付款</span>
						<span v-else-if="appearlOrder.orderStatus == 3">未到账</span>
						<span v-else-if="appearlOrder.orderStatus == 4">手动取消</span>
						<span v-else-if="appearlOrder.orderStatus == 5">已完成</span>
						<span v-else-if="appearlOrder.orderStatus == 6">已匹配</span>
						<span v-else-if="appearlOrder.orderStatus == 7">待确认</span>
						<span v-else-if="appearlOrder.orderStatus == 8">自动取消</span>
					</template>
				</div>
				<div class="show"><span>收款人</span> <span>{{ appearlOrder.payee }}</span></div>
				<div class="show"><span>收款金额</span> <span>{{ appearlOrder.collectedAmount }}</span></div>
				<div class="show"><span>卖出数量</span> <span>{{ appearlOrder.sellAmount }}</span></div>
				<div class="show"><span>接单时间</span> <span>{{ appearlOrder.receiptTime }}</span></div>
				<div class="show"><span>订单号</span> <span>{{ appearlOrder.orderNo }}</span></div>
				<div class="show">
					<span>支付方式</span>
					<span v-if="appearlOrder.payType == 0">未支付</span>
					<span v-if="appearlOrder.payType == 1">支付宝</span>
					<span v-if="appearlOrder.payType == 2">微信</span>
					<span v-if="appearlOrder.payType == 3">银行卡</span>
				</div>
				<div class="show"><span>收款账号</span> <span>{{ appearlOrder.paymentAccount }}</span></div>
			</div>
		</template>

		<template v-if="appealUser.appealType == '充值申诉'">
			<div class="shuju">
				<div class="show">
					<span>订单状态</span>
					<template v-if="appealUser.appealType == '卖出申诉'">
						<span v-if="appearlOrder.orderStatus == 1">已接单</span>
						<span v-else-if="appearlOrder.orderStatus == 2">待付款</span>
						<span v-else-if="appearlOrder.orderStatus == 3">未到账</span>
						<span v-else-if="appearlOrder.orderStatus == 4">待确认</span>
						<span v-else-if="appearlOrder.orderStatus == 5">已完成</span>
						<span v-else-if="appearlOrder.orderStatus == 6">手动取消</span>
						<span v-else-if="appearlOrder.orderStatus == 7">自动取消</span>
					</template>
					<template v-else>
						<span v-if="appearlOrder.orderStatus == 1">已提交</span>
						<span v-else-if="appearlOrder.orderStatus == 2">待付款</span>
						<span v-else-if="appearlOrder.orderStatus == 3">未到账</span>
						<span v-else-if="appearlOrder.orderStatus == 4">手动取消</span>
						<span v-else-if="appearlOrder.orderStatus == 5">已完成</span>
						<span v-else-if="appearlOrder.orderStatus == 6">已匹配</span>
						<span v-else-if="appearlOrder.orderStatus == 7">待确认</span>
						<span v-else-if="appearlOrder.orderStatus == 8">自动取消</span>
					</template>
				</div>
				<div class="show"><span>付款金额</span> <span>{{ appearlOrder.paymentAmount }}</span></div>
				<div class="show"><span>充值积分</span> <span>{{ appearlOrder.rechargeIntegral }}</span></div>
				<div class="show"><span>下单时间</span> <span>{{ appearlOrder.placeTime }}</span></div>
				<div class="show"><span>订单号</span> <span>{{ appearlOrder.cashAmount }}</span></div>
				<div class="show">
					<span>支付方式</span>
					<span v-if="appearlOrder.payType == 0">未支付</span>
					<span v-if="appearlOrder.payType == 1">支付宝</span>
					<span v-if="appearlOrder.payType == 2">微信</span>
					<span v-if="appearlOrder.payType == 3">银行卡</span>
				</div>
				<div class="show"><span>付款账户</span> <span>{{ appearlOrder.payAccount }}</span></div>
				<div class="show"><span>收款人</span> <span>{{ appearlOrder.payee }}</span></div>
				<div class="show"><span>付款时备注</span> <span>{{ appearlOrder.remake }}</span></div>
				<div class="show"><span>付款凭证</span> <span>{{ appearlOrder.paymentVouchers }}</span></div>
			</div>
		</template>

		<template v-if="appealUser.appealType == '提现申诉'">
			<div class="shuju">
				<div class="show">
					<span>订单状态</span>
					<template v-if="appealUser.appealType == '卖出申诉'">
						<span v-if="appearlOrder.orderStatus == 1">已接单</span>
						<span v-else-if="appearlOrder.orderStatus == 2">待付款</span>
						<span v-else-if="appearlOrder.orderStatus == 3">未到账</span>
						<span v-else-if="appearlOrder.orderStatus == 4">待确认</span>
						<span v-else-if="appearlOrder.orderStatus == 5">已完成</span>
						<span v-else-if="appearlOrder.orderStatus == 6">手动取消</span>
						<span v-else-if="appearlOrder.orderStatus == 7">自动取消</span>
					</template>
					<template v-else>
						<span v-if="appearlOrder.orderStatus == 1">已提交</span>
						<span v-else-if="appearlOrder.orderStatus == 2">待付款</span>
						<span v-else-if="appearlOrder.orderStatus == 3">未到账</span>
						<span v-else-if="appearlOrder.orderStatus == 4">手动取消</span>
						<span v-else-if="appearlOrder.orderStatus == 5">已完成</span>
						<span v-else-if="appearlOrder.orderStatus == 6">已匹配</span>
						<span v-else-if="appearlOrder.orderStatus == 7">待确认</span>
						<span v-else-if="appearlOrder.orderStatus == 8">自动取消</span>
					</template>
				</div>
				<div class="show"><span>提现金额</span> <span>{{ appearlOrder.cashAmount }}</span></div>
				<div class="show"><span>提现积分</span> <span>{{ appearlOrder.cashIntegral }}</span></div>
				<div class="show"><span>提现费率</span> <span>{{ appearlOrder.cashRate }}</span></div>
				<div class="show"><span>实际到账</span> <span>{{ appearlOrder.actAmount }}</span></div>
				<div class="show"><span>下单时间</span> <span>{{ appearlOrder.placeTime }}</span></div>
				<div class="show"><span>订单号</span> <span>{{ appearlOrder.cashAmount }}</span></div>
				<div class="show">
					<span>支付方式</span>
					<span v-if="appearlOrder.payType == 0">未支付</span>
					<span v-if="appearlOrder.payType == 1">支付宝</span>
					<span v-if="appearlOrder.payType == 2">微信</span>
					<span v-if="appearlOrder.payType == 3">银行卡</span>
				</div>
				<div class="show"><span>收款账户</span> <span>{{ appearlOrder.paymentAccount }}</span></div>
			</div>
		</template>

		<!-- 当前订单状态 -->
		<div class="status" :class="iSclass">
			<span>当前订单状态</span>
			<template v-if="appealUser.appealType == '卖出申诉'">
				<span v-if="appearlOrder.orderStatus == 1">已接单</span>
				<span v-else-if="appearlOrder.orderStatus == 2">待付款</span>
				<span v-else-if="appearlOrder.orderStatus == 3">未到账</span>
				<span v-else-if="appearlOrder.orderStatus == 4">待确认</span>
				<span v-else-if="appearlOrder.orderStatus == 5">已完成</span>
				<span v-else-if="appearlOrder.orderStatus == 6">手动取消</span>
				<span v-else-if="appearlOrder.orderStatus == 7">自动取消</span>
			</template>
			<template v-else>
				<span v-if="appearlOrder.orderStatus == 1">已提交</span>
				<span v-else-if="appearlOrder.orderStatus == 2">待付款</span>
				<span v-else-if="appearlOrder.orderStatus == 3">未到账</span>
				<span v-else-if="appearlOrder.orderStatus == 4">手动取消</span>
				<span v-else-if="appearlOrder.orderStatus == 5">已完成</span>
				<span v-else-if="appearlOrder.orderStatus == 6">已匹配</span>
				<span v-else-if="appearlOrder.orderStatus == 7">待确认</span>
				<span v-else-if="appearlOrder.orderStatus == 8">自动取消</span>
			</template>
		</div>

		<div class="megs">被起诉对象信息</div>
		<div class="shuju">
			<div class="show"><span>用户名称</span> <span>{{ apperledUser.name }}</span></div>
			<div class="show"><span>联系电话</span> <span>{{ apperledUser.mobile }}</span></div>
			<div class="show">
				<span>是否实名认证</span>
				<span v-if="apperledUser.isAuth == 0">未认证</span>
				<span v-if="apperledUser.isAuth == 1">已验证</span>
				<span v-if="apperledUser.isAuth == 2">认证失败</span>
				<span v-if="apperledUser.isAuth == 3">未审核</span>
			</div>
			<div class="show" v-if="appealUser.appealType == '提现申诉' || appealUser.appealType == '充值申诉'"><span>保证金</span> <span>{{ apperledUser.deposit }}</span></div>
			<div class="show"><span>用户申诉次数</span> <span>{{ apperledUser.appealCount }}</span></div>
			<div class="show"><span>订单编号</span> <span>{{ apperledUser.orderNo }}</span></div>
		</div>
		<el-button size="small" type="primary" v-if="isShow" @click="jieguan">接管处理</el-button>
	</div>
</template>
<script>
	export default {
		name: 'DetailsOfComplaint',
		data() {
			return {
				orderNo: '',
				appealUser: {},
				appearlOrder: {},
				apperledUser: {}
			};
		},
		props: {
			isShow: true
		},
		created() {
			this.orderNo = this.$route.query.orderNo
			this.getList()
		},
		computed: {
			iSclass() {
				return { //订单状态显示背景色
					huang: (this.appealUser.appealType == '卖出申诉' && this.appearlOrder.orderStatus == 2) || (this.appealUser.appealType ==
						'卖出申诉' && this.appearlOrder.orderStatus == 6) || (this.appealUser.appealType == '卖出申诉' && this.appearlOrder.orderStatus ==
						7) || this.appearlOrder.orderStatus == 3 || this.appearlOrder.orderStatus == 4,
					lan: this.appearlOrder.orderStatus ==1 || this.appearlOrder.orderStatus == 5
				}
			}
		},
		methods: {
			// 获取列表 
			getList() {
				this.$get('/untreatedComplainOrder/getOrderComplainRecordDetail', {
						orderNo: this.orderNo
					})
					.then(res => {
						// console.log(res)
						this.appealUser = res.data.appealUser //申诉人信息
						this.appearlOrder = res.data.appearlOrder //卖出申诉订单信息
						this.apperledUser = res.data.apperledUser //被起诉对象信息
					})
			},
			jieguan() {
				this.$post('/untreatedComplainOrder/update', {
					orderNo: this.orderNo
				}).then(res => {
					this.$message.success('成功')
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.neir {
		margin-bottom: 20px;
	}

	.el-button--warning {
		width: 60px;
		height: 28px;
		font-size: 12px;
		padding: 0;
		margin-bottom: 10px;
		border-radius: 2px;
		background-color: #fdb44d;
	}

	.el-button--primary {
		width: 80px;
		height: 32px;
		font-size: 12px;
		padding: 0;
		margin-top: 20px;
		border-radius: 2px;
	}

	.btn {
		width: 80px;
		height: 28px;
		font-size: 12px;
		padding: 0;
		margin-top: 0px;
		border-radius: 2px;
		margin-left: 20px;
	}

	.shuju {
		margin-top: 24px;
		display: flex;
		text-align: center;
		width: 320px;
		flex-direction: column;

		div.show {
			display: flex;
			font-size: 14px;
			height: 36px;
			line-height: 36px;
			border: 1px solid #cbcfdc;
			margin-top: -1px;

			span {
				flex: 1;
			}

			span:last-child {
				flex: 2;
				border-left: 1px solid #cbcfdc;
			}
		}
	}

	button:last-child {
		margin-bottom: 10px;
	}

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

	.status {
		height: 40px;
		width: 100%;
		background-color: #fef0f3;
		border-left: 4px solid #fd4859;
		color: #fd4859;
		padding-left: 26px;
		box-sizing: border-box;
		margin-top: 20px;

		span {
			display: inline-block;
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			margin-right: 20px;
		}

		span:nth-of-type(2) {
			font-weight: bold;
		}
	}

	.status.huang {
		background-color: #FEF7ED;
		border-left: 4px solid #FDB44D;
		color: #FDB44D;
	}

	.status.lan {
		background-color: #ECF5FF;
		border-left: 4px solid #419EFF;
		color: #419EFF;
	}

	.megs {
		height: 21px;
		width: 100%;
		line-height: 21px;
		margin-top: 20px;
		font-size: 14px;
		color: #979DAC;
	}
</style>
