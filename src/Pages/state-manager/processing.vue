<template>
	<div class="container">
		<el-form :inline="true" class="demo-form-inline my-form-users">
			<!--类型选择 -->
			<el-form-item>
				<el-input v-model="complainNo" placeholder="申诉号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="orderNo" placeholder="订单号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="userId" placeholder="客户ID"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="name" placeholder="客户名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="mobile" placeholder="客户电话"></el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="complainType" placeholder="申诉类型">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-select v-model="customerId" placeholder="接管处理人">
					<el-option v-for="item in receiver" :key="item.value" :label="item.name" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="queryData()">查询</el-button>
			</el-form-item>
		</el-form>

		<!-- 表格-->
		<el-table :data="tableData" border :header-cell-style="{background:'#eef1f6',color:'#606266'}">
			<el-table-column prop="complainNo" label="申诉号" align="center"></el-table-column>
			<el-table-column prop="orderNo" label="订单号" align="center"></el-table-column>
			<el-table-column prop="addTime" label="发起日期" align="center"></el-table-column>
			<el-table-column prop="startProcessingTime" label="开始处理时间" align="center"></el-table-column>
			<el-table-column prop="customerName" label="接管处理人" align="center"></el-table-column>
			<el-table-column prop="appealType" label="申诉类型" align="center"></el-table-column>
			<el-table-column prop="name" label="客户名" align="center"></el-table-column>
			<el-table-column prop="userId" label="客户ID" align="center"></el-table-column>
			<el-table-column prop="mobile" label="客户电话" align="center"></el-table-column>
			<el-table-column prop="content" label="申诉内容" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="toCancelDetail(scope.row.orderNo)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--分页 -->
		<div class="page">
			<div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" :page-sizes="[10]" :page-size="pageNum" layout="total, sizes, prev, pager, next, jumper"
				 :total="total"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				complainNo: '',
				userId: '',
				name: '',
				mobile: '',
				orderNo: '',
				pageNum: 10,
				currentPage: 1,
				total: 0,
				options: [{
						value: '1',
						label: '卖出申诉'
					},
					{
						value: '2',
						label: '充值申诉'
					},
					{
						value: '3',
						label: '提现申诉'
					}
				],
				complainType: '',
				receiver: [],
				customerId: ''
			}
		},
		created() {
			this.getList()
			this.orderNo = this.$route.query.orderNo
			this.$get("/sys/user/userListSelect").then(res => {
				this.receiver = res.data
			})
		},
		methods: {
			// OnTake() {
			// 	this.$get('/untreatedComplainOrder/update').then(res => {
			// 		console.log(res)
			// 		this.$message(message)
			// 	})
			// },
			// 跳转到详情页
			toCancelDetail(orderNo) {
				this.$router.push({
					path: '/processing_detail',
					query: {
						orderNo: orderNo
					}
				});
			},
			// 获取列表 
			getList() {
				const data = {
					complainNo: this.complainNo,
					userId: this.userId,
					orderNo: this.orderNo,
					name: this.name,
					mobile: this.mobile,
					complainType: this.complainType,
					status: 2,
					customerId: this.customerId,
					pageSize: this.pageNum,
					currentPage: this.currentPage,
				};
				this.$get(
					'/untreatedComplainOrder/getOrderComplainRecord',
					data
				).then(res => {
					// console.log(res)
					if (res.data.orderComplainRecord.length == 0) {
						this.noData = true
						this.$message.error('该条件下没有数据')
					}
					this.tableData = res.data.orderComplainRecord
					this.orderNo = res.data.orderComplainRecord.orderNo
					this.total = res.data.total
				});
			},
			// 分页
			handleCurrentChange(value) {
				this.currentPage = value
				this.getList()
			},
			// 查询  
			queryData() {
				this.getList()
			}
		}
	};
</script>

<style lang="less" scoped>
	.container {
		height: 100%;
		background-color: #f5f6fa;
		padding: 0 30px;
		box-sizing: border-box;

		a {
			text-decoration: none;
		}

		.my-form-users {
			height: 75px;
			display: flex;
			align-items: center;

			.el-form-item {
				margin-right: 18px;
			}

			.title {
				font-size: 13px;
				color: #253444;
				margin-right: 8px;
			}

			.el-button--primary {
				width: 100px !important;
				height: 28px;
				padding: 0;
				margin-left: 42px;
			}

			.el-button--warning {
				width: 60px;
				height: 28px;
				padding: 0;
			}
		}

		.page {
			height: 78px;
			display: flex;
			flex-direction: row-reverse;
			padding-right: 4px;

			.pagination {
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
