<template>
	<div class="container">
		<div class="section">
			<el-button type="warning" @click="backPage">返回</el-button>
			<div class="conductor">
				<span>处理人:</span>
				<span>{{ appealResult.dealUser }}</span>
			</div>

			<el-form :model="check" :rules="rules" ref="check" class="demo-check">
				<el-form-item prop="result">
					<el-input placeholder="结果返回到客户端" v-model="check.result"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input type="textarea" placeholder="备注" v-model="check.remake"></el-input>
				</el-form-item>
				<div class="upload-name" v-show="Isblack">{{ fileImg }}</div>
				<div class="a-upload" @change="fileIMG($event)">
					<input type="file" name="file">上传图片
				</div>
				<el-button size="mini" @click="deleteImg" class="deleteImg" v-show="Isblack">删除图片</el-button>
				<el-form-item>
					<el-button type="primary" @click="submitForm('check')">处理完成</el-button>
				</el-form-item>
			</el-form>

			<div class="transfer">
				<el-select v-model="customerId" placeholder="转移到其他客服">
					<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value"></el-option>
				</el-select>
				<br>
				<el-button type="primary" @click="OnTransfer">确认转移</el-button>
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
				Isblack: false,
				orderNo: '',
				appealResult: '',
				options: [],
				customerId: '',
				fileImg: '',
				check: {
					result: '',
					remake: ''
				},
				rules: {
					result: [{
						required: true,
						message: '请输入处理结果',
						trigger: 'blur'
					}],
				}
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
			this.$get("/sys/user/userListSelect").then(res => {
				this.options = res.data
			})
		},
		methods: {
			backPage() {
				this.$router.go(-1)
			},
			fileIMG(file) {
				let fileURL = file.target.files[0].name; //本地图片名
				let pic = file.target.files[0]
				let formData = new FormData()
				formData.append('file', pic)
				this.$post('/processingComplainOrder/uploadImg', formData).then(res => {
					this.fileImg = res.data
					this.$message.success('上传成功')
					this.Isblack = true
				})
			},			
			deleteImg() {
				this.$post('/processingComplainOrder/deleteImg', {
					orderNo: this.orderNo
				}).then(res => {
					this.$message.success('删除成功')
					this.Isblack = false
				})
			},
			
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const data = {
							remake: this.check.remake,
							result: this.check.result,
							orderNo: this.orderNo,
							file: this.fileImg
						}
						this.$post('/processingComplainOrder/update', data)
							.then(res => {
								console.log(res)
								this.$message.success('操作成功')
							})
					} else {
						this.$message.error('必填项')
						return false;
					}
				})
			},
			OnTransfer() {
				if (this.customerId == '') {
					this.$message.error('请选择转移对象')
					return false
				}
				this.$post('/processingComplainOrder/confirmationTransfer', {
						orderNo: this.orderNo,
						customerId: this.customerId
					})
					.then(res => {
						this.$message.success(res.message)
						this.customerId = ''
					})
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
			padding-top: 12px;
			box-sizing: border-box;

			.demo-check {
				max-width: 40%;
			}

			.conductor {
				height: 40px;
				line-height: 40px;
				background: #F8F8FA;
				margin-bottom: 20px;

				span {
					display: inline-block;
					padding-left: 20px;
					color: #979DAC;
					font-size: 14px;
				}
			}

			.upload-name {
				font-size: 12px;
				color: skyblue;
				position: relative;
				top: 26px;

				button {
					display: none;
				}
			}

			.upload-name:hover {
				button {
					display: block;
				}
			}

			.a-upload {
				padding: 0 10px;
				line-height: 28px;
				position: relative;
				font-size: 14px;
				color: #419eff;
				overflow: hidden;
				display: inline-block;
				margin: -40px 0 6px 0;

				input {
					position: absolute;
					right: 0;
					top: 0;
					opacity: 0;
					filter: alpha(opacity=0);
					cursor: pointer;
				}
			}

			.deleteImg {
				position: relative;
				top: -10px;
				left: 60%;
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
		}
	}
</style>
