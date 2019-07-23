<template>
	<div class="container">
		<h3>会员等级买卖次数设置</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="普通用户" class="w60"></el-form-item>
			<el-form-item label="买入">
				<el-input placeholder="请输入数字" :disabled="user_level_trade_limit.common_out.isLimit" v-model="user_level_trade_limit.common_in.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="卖出">
				<el-input placeholder="请输入数字" :disabled="user_level_trade_limit.common_out.isLimit" v-model="user_level_trade_limit.common_out.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="user_level_trade_limit.common_out.isLimit" @change="Tick(user_level_trade_limit.common_out.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP1" class="w60"></el-form-item>
			<el-form-item label="买入">
				<el-input placeholder="请输入数字" :disabled="user_level_trade_limit.vip1_out.isLimit" v-model="user_level_trade_limit.vip1_in.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="卖出">
				<el-input placeholder="请输入数字" :disabled="user_level_trade_limit.vip1_out.isLimit" v-model="user_level_trade_limit.vip1_out.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="user_level_trade_limit.vip1_out.isLimit" @change="Tick(user_level_trade_limit.vip1_out.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP2" class="w60"></el-form-item>
			<el-form-item label="买入">
				<el-input placeholder="请输入数字" :disabled="user_level_trade_limit.vip2_out.isLimit" v-model="user_level_trade_limit.vip2_in.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="卖出">
				<el-input placeholder="请输入数字" :disabled="user_level_trade_limit.vip2_out.isLimit" v-model="user_level_trade_limit.vip2_out.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="user_level_trade_limit.vip2_out.isLimit" @change="Tick(user_level_trade_limit.vip2_out.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP3" class="w60"></el-form-item>
			<el-form-item label="买入">
				<el-input placeholder="请输入数字" :disabled="user_level_trade_limit.vip3_out.isLimit" v-model="user_level_trade_limit.vip3_in.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="卖出">
				<el-input placeholder="请输入数字" :disabled="user_level_trade_limit.vip3_out.isLimit" v-model="user_level_trade_limit.vip3_out.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="user_level_trade_limit.vip3_out.isLimit" @change="Tick(user_level_trade_limit.vip3_out.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(1)">保存该项设置</el-button>
		
		<h3>保证设置</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="激活买入接单并且享受团队收益需缴纳保证金">
				<el-input placeholder="请输入数字" v-model="deposit.dicVal"></el-input>
			</el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(2)">保存该项设置</el-button>

		<h3>买入额度设置</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="普通会员最大买入不超过">
				<el-input placeholder="请输入数字" :disabled="buy_limit.common_in.isLimit" v-model="buy_limit.common_in.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="buy_limit.common_in.isLimit" @change="Tick(buy_limit.common_in.isLimit)">不超过缴纳保证金额度</el-checkbox>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP1最大买入不超过">
				<el-input placeholder="请输入数字" :disabled="buy_limit.vip1.isLimit" v-model="buy_limit.vip1.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="buy_limit.vip1.isLimit" @change="Tick(buy_limit.vip1.isLimit)">不超过缴纳保证金额度</el-checkbox>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP2最大买入不超过">
				<el-input placeholder="请输入数字" :disabled="buy_limit.vip2.isLimit" v-model="buy_limit.vip2.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="buy_limit.vip2.isLimit" @change="Tick(buy_limit.vip2.isLimit)">不超过缴纳保证金额度</el-checkbox>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP3最大买入不超过">
				<el-input placeholder="请输入数字" :disabled="buy_limit.vip3.isLimit" v-model="buy_limit.vip3.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="buy_limit.vip3.isLimit" @change="Tick(buy_limit.vip3.isLimit)">不超过缴纳保证金额度</el-checkbox>
			</el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(3)">保存该项设置</el-button>

		<h3></h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP1团队奖励">
				<el-input placeholder="请输入数字" v-model="team_award.vip1.dicVal"></el-input>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP2团队奖励">
				<el-input placeholder="请输入数字" v-model="team_award.vip2.dicVal"></el-input>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP3团队奖励">
				<el-input placeholder="请输入数字" v-model="team_award.vip3.dicVal"></el-input>
			</el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(4)">保存该项设置</el-button>

		<h3>会员晋升条件设置</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP1" class="w60"></el-form-item>
			<el-form-item label="直推下级人数">
				<el-input placeholder="请输入数字" v-model="user_promotion_condition.vip1.dicVal"></el-input>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP2" class="w60"></el-form-item>
			<el-form-item label="直推下级人数">
				<el-input placeholder="请输入数字" v-model="user_promotion_condition.vip2.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="直推下级人数VIP1不少于">
				<el-input placeholder="请输入数字" v-model="user_promotion_condition.vip2_vip1.dicVal"></el-input>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP3" class="w60"></el-form-item>
			<el-form-item label="直推下级人数">
				<el-input placeholder="请输入数字" v-model="user_promotion_condition.vip3.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="直推下级人数VIP2不少于">
				<el-input placeholder="请输入数字" v-model="user_promotion_condition.vip3_vip2.dicVal"></el-input>
			</el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(5)">保存该项设置</el-button>
		
		<h3>不同等级会员卖出最大额度</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="普通会员" class="w60"></el-form-item>
			<el-form-item label="卖出最大额度">
				<el-input placeholder="请输入数字" :disabled="user_sell_limit.common_out.isLimit" v-model="user_sell_limit.common_out.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="user_sell_limit.common_out.isLimit" @change="Tick(user_sell_limit.common_out.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP1" class="w60"></el-form-item>
			<el-form-item label="卖出最大额度">
				<el-input placeholder="请输入数字" :disabled="user_sell_limit.vip1.isLimit" v-model="user_sell_limit.vip1.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="user_sell_limit.vip1.isLimit" @change="Tick(user_sell_limit.vip1.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP2" class="w60"></el-form-item>
			<el-form-item label="卖出最大额度">
				<el-input placeholder="请输入数字" :disabled="user_sell_limit.vip2.isLimit" v-model="user_sell_limit.vip2.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="user_sell_limit.vip2.isLimit" @change="Tick(user_sell_limit.vip2.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item label="会员VIP3" class="w60"></el-form-item>
			<el-form-item label="卖出最大额度">
				<el-input placeholder="请输入数字" :disabled="user_sell_limit.vip3.isLimit" v-model="user_sell_limit.vip3.dicVal"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="user_sell_limit.vip3.isLimit" @change="Tick(user_sell_limit.vip3.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(6)">保存该项设置</el-button>

		<h3>连续多少天未发生一笔交易(充值、买入、卖出)自动停止享受团队收益</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item>
				<el-input placeholder="请输入数字" :disabled="auto_stop_team_award_days.isLimit" v-model="auto_stop_team_award_days.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="天">
				<el-checkbox v-model="auto_stop_team_award_days.isLimit" @change="Tick(auto_stop_team_award_days.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(7)">保存该项设置</el-button>
		
		<h3>手动或超时未付款到账订单取消，超过设定次数将被禁止交易24小时</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item>
				<el-input placeholder="请输入数字" :disabled="cancel_order_times_limit.isLimit" v-model="cancel_order_times_limit.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="次">
				<el-checkbox v-model="cancel_order_times_limit.isLimit" @change="Tick(cancel_order_times_limit.isLimit)">不限制</el-checkbox>
			</el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(8)">保存该项设置</el-button>
		
		<h3>USDT兑换积分奖励比例</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item>
				<el-input placeholder="请输入数字" v-model="usdt_conversion_rate.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="%"></el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(9)">保存该项设置</el-button>

		<h3>USDT提现矿工费</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item>
				<el-input placeholder="请输入数字" v-model="usdt_miner_fee.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="USDT"></el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(10)">保存该项设置</el-button>

		<h3>买入奖励比例</h3>
		<el-form :inline="true" size="mini" class="demo-form-inline">
			<el-form-item>
				<el-input placeholder="请输入数字" v-model="buy_award_rate.dicVal"></el-input>
			</el-form-item>
			<el-form-item label="%"></el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="OnSave(11)">保存该项设置</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user_level_trade_limit: {},
				deposit: {},
				buy_limit: {},
				team_award: {},
				user_promotion_condition: {},
				user_sell_limit: {},
				auto_stop_team_award_days: {},
				cancel_order_times_limit: {},
				usdt_conversion_rate: {},
				usdt_miner_fee: {},
				buy_award_rate: {},
			}
		},
		created() {
			this.$get('/B/getByDicType', {
				dicType: 'user_level_trade_limit'
			}).then(res => {
				// console.log(res)
				this.user_level_trade_limit = res.data
			})
			this.$get('/B/getByDicType', {
				dicType: 'deposit'
			}).then(res => {
				// console.log(res)
				this.deposit = res.data.deposit
			})
			this.$get('/B/getByDicType', {
				dicType: 'buy_limit'
			}).then(res => {
				// console.log(res)
				this.buy_limit = res.data
			})
			this.$get('/B/getByDicType', {
				dicType: 'team_award'
			}).then(res => {
				// console.log(res)
				this.team_award = res.data
			})
			this.$get('/B/getByDicType', {
				dicType: 'user_promotion_condition'
			}).then(res => {
				// console.log(res)
				this.user_promotion_condition = res.data
			})
			this.$get('/B/getByDicType', {
				dicType: 'user_sell_limit'
			}).then(res => {
				// console.log(res)
				this.user_sell_limit = res.data
			})
			this.$get('/B/getByDicType', {
				dicType: 'auto_stop_team_award_days'
			}).then(res => {
				// console.log(res)
				this.auto_stop_team_award_days = res.data.auto_stop_team_award_days
			})
			this.$get('/B/getByDicType', {
				dicType: 'cancel_order_times_limit'
			}).then(res => {
				// console.log(res)
				this.cancel_order_times_limit = res.data.cancel_order_times_limit
			})
			this.$get('/B/getByDicType', {
				dicType: 'usdt_conversion_rate'
			}).then(res => {
				// console.log(res)
				this.usdt_conversion_rate = res.data.usdt_conversion_rate
			})
			this.$get('/B/getByDicType', {
				dicType: 'usdt_miner_fee'
			}).then(res => {
				// console.log(res)
				this.usdt_miner_fee = res.data.usdt_miner_fee
			})
			this.$get('/B/getByDicType', {
				dicType: 'buy_award_rate'
			}).then(res => {
				// console.log(res)
				this.buy_award_rate = res.data.buy_award_rate
			})
		},
		methods: {
			OnSave (idx) {
				if (idx == 1) {
					this.$post('/B/updateByDicType', {
							dicType: 'user_level_trade_limit',
							terminalBS: [{ dicKey: this.user_level_trade_limit.common_in.dicKey, dicVal: this.user_level_trade_limit.common_in.dicVal, isLimit: this.user_level_trade_limit.common_out.isLimit },
								{ dicKey: this.user_level_trade_limit.common_out.dicKey, dicVal: this.user_level_trade_limit.common_out.dicVal, isLimit: this.user_level_trade_limit.common_out.isLimit },
								{ dicKey: this.user_level_trade_limit.vip1_in.dicKey, dicVal: this.user_level_trade_limit.vip1_in.dicVal, isLimit: this.user_level_trade_limit.vip1_out.isLimit },
								{ dicKey: this.user_level_trade_limit.vip1_out.dicKey, dicVal: this.user_level_trade_limit.vip1_out.dicVal, isLimit: this.user_level_trade_limit.vip1_out.isLimit },
								{ dicKey: this.user_level_trade_limit.vip2_in.dicKey, dicVal: this.user_level_trade_limit.vip2_in.dicVal, isLimit: this.user_level_trade_limit.vip2_out.isLimit },
								{ dicKey: this.user_level_trade_limit.vip2_out.dicKey, dicVal: this.user_level_trade_limit.vip2_out.dicVal, isLimit: this.user_level_trade_limit.vip2_out.isLimit },
								{ dicKey: this.user_level_trade_limit.vip3_in.dicKey, dicVal: this.user_level_trade_limit.vip3_in.dicVal, isLimit: this.user_level_trade_limit.vip3_out.isLimit },
								{ dicKey: this.user_level_trade_limit.vip3_out.dicKey, dicVal: this.user_level_trade_limit.vip3_out.dicVal, isLimit: this.user_level_trade_limit.vip3_out.isLimit }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 2) {
					this.$post('/B/updateByDicType', {
							dicType: 'deposit',
							terminalBS: [{ dicKey: this.deposit.dicKey, dicVal: this.deposit.dicVal, isLimit: false }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 3) {
					this.$post('/B/updateByDicType', {
							dicType: 'buy_limit',
							terminalBS: [{ dicKey: this.buy_limit.common_in.dicKey, dicVal: this.buy_limit.common_in.dicVal, isLimit: this.buy_limit.common_in.isLimit },
								{ dicKey: this.buy_limit.vip1.dicKey, dicVal: this.buy_limit.vip1.dicVal, isLimit: this.buy_limit.vip1.isLimit },
								{ dicKey: this.buy_limit.vip2.dicKey, dicVal: this.buy_limit.vip2.dicVal, isLimit: this.buy_limit.vip2.isLimit },
								{ dicKey: this.buy_limit.vip3.dicKey, dicVal: this.buy_limit.vip3.dicVal, isLimit: this.buy_limit.vip3.isLimit }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 4) {
					this.$post('/B/updateByDicType', {
							dicType: 'team_award',
							terminalBS: [{ dicKey: this.team_award.vip1.dicKey, dicVal: this.team_award.vip1.dicVal, isLimit: false },
								{ dicKey: this.team_award.vip2.dicKey, dicVal: this.team_award.vip2.dicVal, isLimit: false },
								{ dicKey: this.team_award.vip3.dicKey, dicVal: this.team_award.vip3.dicVal, isLimit: false }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 5) {
					this.$post('/B/updateByDicType', {
							dicType: 'user_promotion_condition',
							terminalBS: [{ dicKey: this.user_promotion_condition.vip1.dicKey, dicVal: this.user_promotion_condition.vip1.dicVal, isLimit: false },
								{ dicKey: this.user_promotion_condition.vip2.dicKey, dicVal: this.user_promotion_condition.vip2.dicVal, isLimit: false },
								{ dicKey: this.user_promotion_condition.vip2_vip1.dicKey, dicVal: this.user_promotion_condition.vip2_vip1.dicVal, isLimit: false },
								{ dicKey: this.user_promotion_condition.vip3.dicKey, dicVal: this.user_promotion_condition.vip3.dicVal, isLimit: false },
								{ dicKey: this.user_promotion_condition.vip3_vip2.dicKey, dicVal: this.user_promotion_condition.vip3_vip2.dicVal, isLimit: false }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 6) {
					this.$post('/B/updateByDicType', {
							dicType: 'user_sell_limit',
							terminalBS: [{ dicKey: this.user_sell_limit.common_out.dicKey, dicVal: this.user_sell_limit.common_out.dicVal, isLimit: this.user_sell_limit.common_out.isLimit },
								{ dicKey: this.user_sell_limit.vip1.dicKey, dicVal: this.user_sell_limit.vip1.dicVal, isLimit: this.user_sell_limit.vip1.isLimit },
								{ dicKey: this.user_sell_limit.vip2.dicKey, dicVal: this.user_sell_limit.vip2.dicVal, isLimit: this.user_sell_limit.vip2.isLimit },
								{ dicKey: this.user_sell_limit.vip3.dicKey, dicVal: this.user_sell_limit.vip3.dicVal, isLimit: this.user_sell_limit.vip3.isLimit }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 7) {
					this.$post('/B/updateByDicType', {
							dicType: 'auto_stop_team_award_days',
							terminalBS: [{ dicKey: this.auto_stop_team_award_days.dicKey, dicVal: this.auto_stop_team_award_days.dicVal, isLimit: this.auto_stop_team_award_days.isLimit }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 8) {
					this.$post('/B/updateByDicType', {
							dicType: 'cancel_order_times_limit',
							terminalBS: [{ dicKey: this.cancel_order_times_limit.dicKey, dicVal: this.cancel_order_times_limit.dicVal, isLimit: this.cancel_order_times_limit.isLimit }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 9) {
					this.$post('/B/updateByDicType', {
							dicType: 'usdt_conversion_rate',
							terminalBS: [{ dicKey: this.usdt_conversion_rate.dicKey, dicVal: this.usdt_conversion_rate.dicVal, isLimit: false }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 10) {
					this.$post('/B/updateByDicType', {
							dicType: 'usdt_miner_fee',
							terminalBS: [{ dicKey: this.usdt_miner_fee.dicKey, dicVal: this.usdt_miner_fee.dicVal, isLimit: false }]
					}).then(res => {
						this.$message.success(res.message)
					})
				} else if (idx == 11) {
					this.$post('/B/updateByDicType', {
							dicType: 'buy_award_rate',
							terminalBS: [{ dicKey: this.buy_award_rate.dicKey, dicVal: this.buy_award_rate.dicVal, isLimit: false }]
					}).then(res => {
						this.$message.success(res.message)
					})
				}
			},
			Tick (reverse) {
				reverse = !reverse //取反
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		.el-button--mini:last-child {
			margin-bottom: 20px;
		}
		h3 {
			margin: 15px 0;
			color: #666;
			font-size: 16px;
			padding-top: 10px;
			border-top: 1px solid #eee;
		}
		h3:first-child {
			border-top: none 
		}
		.w60 {
			width: 90px;
		}
		.el-input.el-input--mini {
			width: 100px;
		}
		.el-form-item.el-form-item--mini:nth-child(2), .el-form-item.el-form-item--mini:nth-child(3), .el-form-item.el-form-item--mini:nth-child(4) {
			margin-left: 10px;
		}
	}
</style>
