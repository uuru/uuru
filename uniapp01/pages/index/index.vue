<template>
	<!-- 打卡日历页面 -->
	<view class='all'>
		<view class="bar">
			<!-- 上一个月 -->
			<view class="previous" @click="handleCalendar(0)">
				<button class="barbtn">上一月</button>
			</view>
			<!-- 显示年月 -->
			<view class="date">{{cur_year || "--"}} 年 {{cur_month || "--"}} 月</view>
			<!-- 下一个月 -->
			<view class="next" @click="handleCalendar(1)">
				<button class="barbtn">下一月</button>
			</view>
		</view>
		<!-- 显示星期 -->
		<view class="week">
			<view class="week_ri" v-for="(item,index) in weeks_ch" :key="index">{{item}}</view>
		</view>
		<view  class="myDateTable">
			<view v-for="(item,j) in days" :key="j" class='dateCell'>
				<view v-if="item.date==undefined || item.date == null" class='cell'>
					<text :decode="true">&nbsp;&nbsp;</text>
				</view>
				<view v-else @click="clickSignUp(item.date)">
					<!-- 已订餐到日期 -->
					<view v-if="item.isSign == 5" class='cell yellow' style="background: #0000a8;color: #ffffff;">
						<text>{{item.date}}</text>
					</view>
					<view class="cell white bg-red" style="background: #0000e7;color: #ffffff;" v-else-if="item.isSign == 2">
						<text>{{item.date}}</text>
					</view>
					<!-- 点击的日期 -->
					<view class="cell white bg-red" style="background: #ffaa7f;color: #ffffff;" v-else-if="item.isSign == 3">
						<text>{{item.date}}</text>
					</view>
					<!-- 当前日期之后 -->
					<view class="whiteColor cell" v-else>
						<text>{{item.date}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				days: [],//日历
				SignUp: [{'type':1,t:1},{'type':2,t:10}],//已经订餐
				cur_year: 0, //当前选的年
				cur_month: 0, //当前选的月
				today: parseInt(new Date().getDate()), //今天
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				toYear: parseInt(new Date().getFullYear()), //本年
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
			};
		},
		props: {
			//年
			sendYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			//月
			sendMonth: {
				type: Number,
				default: new Date().getMonth() + 1
			},
		},
		created() {
			this.cur_year = this.sendYear;//年
			this.cur_month = this.sendMonth;//月
			this.calculateEmptyGrids(this.cur_year, this.cur_month);
			this.calculateDays(this.cur_year, this.cur_month);
			//网络请求
			this.onJudgeSign(this.SignUp);
		},
		methods: {
			// 获取当月共多少天
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate()
			},
			// 获取当月第一天星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			// 计算当月1号前空了几个格子，把它填充在days数组的前面
			calculateEmptyGrids(year, month) {
				//计算每个月时要清零
				this.days = [];
				const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
				if (firstDayOfWeek > 0) {
					for (let i = 0; i < firstDayOfWeek; i++) {
						var obj = {
							date: null,
							isSign: false
						}
						this.days.push(obj);
					}
				}
			},
			// 绘制当月天数占的格子，并把它放到days数组中
			calculateDays(year, month) {
				const thisMonthDays = this.getThisMonthDays(year, month);
				for (let i = 1; i <= thisMonthDays; i++) {
					var obj = {
						date: i,
						isSign: false
					}
					this.days.push(obj);
				}
				//console.log(this.days);
			},
			//匹配判断当月与当月哪些日子订餐
			onJudgeSign(date) {
				var signs = date;
				var daysArr = this.days;
				//日期相同，订过餐
				for(var i=0;i<signs.length;i++){
					for (var j=0; j<daysArr.length;j++) {
						if (daysArr[j].date == signs[i]['t']) {
							if(signs[i]['type'] == 1){
								daysArr[j].isSign = 2;//订一餐
							}else{
								daysArr[j].isSign = 5;//订两餐
							}
							
						}
					}
				}
				this.days = daysArr;
			},
			// 切换控制年月，上一个月，下一个月
			handleCalendar(type) {
				const cur_year = parseInt(this.cur_year);
				const cur_month = parseInt(this.cur_month);
				var newMonth;
				var newYear = cur_year;
				if (type === 0) { //上个月
					newMonth = cur_month - 1;
					if (newMonth < 1) {
						newYear = cur_year - 1;
						newMonth = 12;
					}
				} else {
					newMonth = cur_month + 1;
					if (newMonth > 12) {
						newYear = cur_year + 1;
						newMonth = 1;
					}
				}
				this.calculateEmptyGrids(newYear, newMonth);
				this.calculateDays(newYear, newMonth);
				
				//网络请求
				this.SignUp =[{'type':1,t:3},{'type':2,t:11}],//已经订餐
				this.onJudgeSign(this.SignUp);
 
				this.cur_year = newYear;
				this.cur_month = newMonth;
 
				// this.SignUp = []; //清空
				this.$emit('dateChange',this.cur_year+"-"+this.cur_month); //传给调用模板页面去拿新数据				
			},
			//点击日期
			clickSignUp(t){
				// console.log(this.cur_year)//年
				// console.log(this.cur_month)//月
				var t = t;//点击的天
				
				var signs = this.SignUp;
				
				var daysArr = this.days;
				//日期相同，订过餐,点击的日期
				for(var i=0;i<signs.length;i++){
					for (var j=0; j<daysArr.length;j++) {
						if (daysArr[j].date == signs[i]['t']) {
							if(signs[i]['type'] == 1){
								daysArr[j].isSign = 2;//订一餐
							}else{
								daysArr[j].isSign = 5;//订两餐
							}
						}
						if(t == daysArr[j].date){
							daysArr[j].isSign = 3
						}
						if(daysArr[j].isSign != 2 && t != daysArr[j].date && daysArr[j].isSign != 5){
							daysArr[j].isSign = 1;
						}
					}
				}
				this.days = daysArr;
			}
		}
	}
</script>
 
<style>
 
	.all .bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10rpx;
	}
 
	.bar .barbtn {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
	}
	/* 星期 */
	.all .week {
		display: flex;
		/* flex-direction: row; */
		/* justify-content: space-between; */
		padding: 20rpx;
		border-radius: 10px;
		background-color: #fff;
		width: 90%;
		margin-left: 2%;
	}
	.week_ri{
		margin-left: 19rpx;
		padding: 0 48rpx 0 0;
	}
	.myDateTable {
		margin: 2.5vw;
		border-radius: 10px;
		background: #fff;
	}
	.myDateTable .dateCell {
			width: 11vw;
			padding: 1vw;
			display: inline-block;
			text-align: center;
			font-size: 16px;
		}
 
	.dateCell .cell {
			display: flex;
			border-radius: 50%;
			height: 9vw;
			justify-content: center;
			align-items: center;
		}
 
	.greenColor {
		color: #01b90b;
		font-weight: bold;
	}
 
	.bgWhite {
		background-color: #fff;
	}
 
	.bgGray {
		background-color: rgba(255, 255, 255, 0.42);
	}
 
	.bgBlue {
		font-size: 14px;
		background-color: #4b95e6;
	}
 
	.redColor {
		color: #ff0000;
	}
	
	.TipArea{
		word-break:break-all;
		word-wrap:break-word;
		
		font-size: 14px;
		padding: 10px;
	}
	.impTip{
		display: inline-block;
		color: #ff0000;
	}
</style>
