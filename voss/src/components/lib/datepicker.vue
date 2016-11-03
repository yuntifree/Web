<template>
<div class="vue-datepicker" tabindex="-1">
    <input class=" form-control vue-datepicker-input" type="text" @click="inputClick" v-model="value"/>
    <i class="iconfont icon-rili" @click="inputClick"></i>
    <div class="vue-datepicker-popup" :style="{display:popupDisplay}">
        <div class="vue-datepicker-inner">
            <div class="vue-datepicker-head">
                <div class="vue-datepicker-label">选择日期</div>
            </div>
            <div class="vue-datepicker-body">
                <div class="vue-datepicker-ctrl">
                    <i class="vue-month-btn vue-datepicker-preMonthBtn" @click="preNextMonthClick(0)">&lt;</i>
                    <i class="vue-month-btn vue-datepicker-nextMonthBtn" @click="preNextMonthClick(1)">&gt;</i>
                    <p>{{stringify(currDate, "yyyy年MM月")}}</p>
                </div>
                <div class="vue-datepicker-weekRange">
                    <span v-for="w in weekRange">{{w}}</span>
                </div>
                <div class="vue-datepicker-dateRange">
                    <span v-for="d in dateRange" :class="d.sclass" @click="itemClick(d.date)">{{d.text}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data : function (){
        return {
            config : {},
            weekRange : ['一', '二', '三', '四', '五', '六', '日'],
            dateRange : [], //需要绘制的日期区间
            currDate : new Date, //当前日期
            popupDisplay : 'none'
        }
    },
    watch : {
        currDate : function (){
            this.getDateRange()
        },
        value: function (){
            var valueDate = this.parse(this.value)
            if (valueDate){
                this.currDate = valueDate
            }
        }
    },
    ready: function() {
        if (this.value == '') {
            this.value = this.stringify(this.currDate)
        }
    },
    methods : {
        inputClick : function (e){
            this.popupDisplay = this.popupDisplay=='none' ? 'block' : 'none'
        },
        preNextMonthClick : function (flag){
            var year = this.currDate.getFullYear()
            var month = this.currDate.getMonth()
            var date = this.currDate.getDate()

            if (flag == 0){
                var preMonth = this.getYearMonth(year, month-1)
                this.currDate = new Date(preMonth.year, preMonth.month, date)
            }
            else {
                var nextMonth = this.getYearMonth(year, month+1)
                this.currDate = new Date(nextMonth.year, nextMonth.month, date)
            }
        },
        itemClick : function (date){
            this.currDate = date
            this.value = this.stringify(this.currDate)
            this.$dispatch('data-date',this.value)
            this.popupDisplay = 'none'
        },
        getYearMonth : function (year, month){
            if (month > 11){
                year++
                month = 0
            }
            else if (month < 0){
                year--
                month = 11
            }
            return {year:year, month:month}
        },
        stringify : function (date, format){
            format = format || 'yyyy-MM-dd'

            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var day = date.getDate()

            return format
                .replace(/yyyy/g, year)
                .replace(/MM/g, ('0'+month).slice(-2))
                .replace(/dd/g, ('0'+day).slice(-2))
                .replace(/yy/g, year)
                .replace(/M/g, month)
                .replace(/d/g, day)
        },
        parse : function (str){
            var date = new Date(str)
            return isNaN(date.getFullYear()) ? null : date
        },
        getDayCount : function (year, month){ //得到每月总天数
            var dict = [31,28,31,30,31,30,31,31,30,31,30,31]

            //如果2月
            if (month == 1){
                //如果瑞年
                if ( (year%400==0) || (year%4==0 && year%100!=0) ){
                    return 29
                }
                return 28
            }

            return dict[month]
        },
        getDateRange : function (){
            this.dateRange = []

            var time = {
                year : this.currDate.getFullYear(),
                month : this.currDate.getMonth(),
                day : this.currDate.getDate()
            }
            //本月第一天
            var currMonthFirstDay = new Date(time.year, time.month, 1)
            //本月第一天是周几？
            var firstDayWeek = currMonthFirstDay.getDay()
            if (firstDayWeek == 0){
                firstDayWeek = 7
            }
            //本月总天数
            var dayCount = this.getDayCount(time.year, time.month)

            //如果需要补足上月
            if (firstDayWeek > 1){
                var preMonth = this.getYearMonth(time.year, time.month-1)

                //上月总天数
                var prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month)
                for (var i=1; i<firstDayWeek; i++){
                    var dayText = prevMonthDayCount - firstDayWeek + i + 1
                    this.dateRange.push({
                        text : dayText,
                        date : new Date(preMonth.year, preMonth.month, dayText),
                        sclass : 'vue-datepicker-item-gray'
                    })
                }
            }

            //本月
            for (var i=1; i<=dayCount; i++){
                var date = new Date(time.year, time.month, i)
                var week = date.getDay()
                var sclass = ''
                if (week==6 || week==0){
                    sclass = 'vue-datepicker-item-red'
                }
                //如果日子和当前相等
                if (i==time.day){
                    //如果value有值
                    if (this.value){
                        var valueDate = this.parse(this.value)
                        //如果value是有效的日期
                        if (valueDate){
                            //如果value的年和月和当前相等
                            if (valueDate.getFullYear() == time.year && valueDate.getMonth() == time.month){
                                sclass = 'vue-datepicker-dateRange-item-hover'
                            }
                        }
                    }
                }
                this.dateRange.push({
                    text : i,
                    date : date,
                    sclass : sclass
                })
            }

            //如果需要补足下个月
            if (this.dateRange.length < 42){
                //需要补足的天数
                var nextMonthNeed = 42 - this.dateRange.length
                var nextMonth = this.getYearMonth(time.year, time.month+1)

                for (var i=1; i<=nextMonthNeed; i++){
                    this.dateRange.push({
                        text : i,
                        date : new Date(nextMonth.year, nextMonth.month, i),
                        sclass : 'vue-datepicker-item-gray'
                    })
                }
            }
        }
    },
    ready: function (){
        var me = this
        me.getDateRange()
        window.winClick(me.$el, function() {
            me.popupDisplay = 'none'
        })
    }
}
</script>

<style>
@import '../../assets/iconfont/iconfont.css';

.vue-datepicker{
    position: relative;
    display: inline-block;
}
.ipt-date{
    padding:2px 0 2px 5px;
    position: relative;
    width:120px;
    height:auto;
}
.ipt-date:focus{
    border-color:#ccc;
    box-shadow:none;
    outline:none;
}

.vue-datepicker-popup{
    position: absolute;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    display: none;
    background: #fff;
    margin-top: 2px;
    z-index: 1000;
    top: 31px;
    right: 0px;
}
.vue-datepicker-inner{
    width: 218px;
    border: 1px solid #ccc;
}
.vue-datepicker-body{
    padding: 5px 10px;
}
.vue-datepicker-body span{
    display: inline-block;
    width: 28px;
    line-height: 28px;
    height: 28px;
    text-align: center;
    cursor: pointer;
}
.vue-datepicker-item-gray{
    color: #999;
}
.vue-datepicker-item-red{
    color: #ff5555;
}
.vue-datepicker-dateRange span{
}
.vue-datepicker-dateRange span:hover, .vue-datepicker-dateRange-item-hover{
    background-color : #dbebff;
}
.vue-datepicker-weekRange{
    border-bottom: 1px solid #ccc;
}
.vue-datepicker-label{
    background-color: #f8f8f8;
    border-bottom: 1px solid #e5e5e5;
    font-weight: 700;
    padding: 7px 0;
    text-align: center;
}
.vue-datepicker-ctrl{
    position: relative;
    height: 30px;
    line-height: 30px;
    color: #3775c0;
    text-align: center;
    border-bottom: 1px solid #ccc;
}
.vue-datepicker-ctrl i{
    position: absolute;
    cursor: pointer;
    top: 1px;
}
.vue-month-btn{
    font-weight: bold;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.vue-datepicker-preMonthBtn{
    left: 4px;
}
.vue-datepicker-nextMonthBtn{
    right: 4px;
}

.vue-datepicker .iconfont{
    position: absolute;
    top:-4px;
    right: 4px;
    font-size: 24px;
}

:focus {
    outline:0;
}
</style>