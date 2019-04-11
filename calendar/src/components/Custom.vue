<template>
    <div class="box">
        <ul class="weekDate"> 
            <li v-for="we in weebs" :key="we">{{we}} </li>
        </ul>
        <ul class="dateBox" @touchmove='touchMove' @touchend='touchend' @scroll="isscrolls">
            <li v-for="(date,idx) in dateBox" 
            :key="idx" @click="setDays(date.years,date.months,date.days)" 
            :class="date.years == isYear && date.months == isMonth && date.days == isDay && date.years!= 1 || date.isbei?'lan':''"
            ref='test'
            >
                {{date.days}}
                <i v-show='date.days==1 || date.years == isYear && date.months == isMonth && date.days == isDay || date.years == isYears && date.months == isMonths && date.days == isDays && date.years!= 1'>{{date.months}}月</i>
                <b v-show='date.months == 1 && date.days == 1'>{{date.years}}</b>
            </li>
        </ul>
        <ul class="dateBottom">
            <li class="qx">取消</li>
            <li class="qd">确定</li>
        </ul>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    name:'Custom',
    data(){
        return {
            startDate:'',
            endDate:'',
            weebs:['日','一','二','三','四','五','六'],
            dateBox:[],
            showYear:false,
            isYear:'',
            isMonth:'',
            isDay:'',
            isYears:'',
            isMonths:'',
            isDays:'',
            cboxs:[],
            isBottom:false,//判断是否到底了
            isTop:true,//判断是否到顶了
            selectTime:[],
            jztTime:[],
        }
    },
    created(){
        var Time = new Date();
        var year = Time.getFullYear();
        var month = Time.getMonth()+1;
        var startYeay = month == 1?year-1:year;
        var startMonth = month == 1?12:month-1;
        var Days = '01';
        this.startDate = startYeay+'/'+startMonth+'/'+Days;
        if(month == 10){
           var endMonth = '01';
           var endYeat = year+1;
           this.endDate = endYeat+'/'+endMonth+'/'+Days;
        }else if(month == 11){
           var endMonth = '02';
           var endYeat = year+1;
           this.endDate = endYeat+'/'+endMonth+'/'+Days;
        }else if(month == 12){
           var endMonth = '03';
           var endYeat = year+1;
           this.endDate = endYeat+'/'+endMonth+'/'+Days;
        }else{
            var endMonth = month+3;
           var endYeat = year;
           this.endDate = endYeat+'/'+endMonth+'/'+Days;
        }

        var a = this.getDiffDate(this.startDate,this.endDate);
        this.dateBox = a;
        var b = this.oneDay(this.dateBox[0].years,this.dateBox[0].months,this.dateBox[0].days);
        if(b > 0){
            for(var i=0;i<b;i++){
                var da = {
                    years:1,
                    months:1,
                    days:'',
                    isbe:false
                }
                this.dateBox.unshift(da);
            }
        }
        this.currentTimes();
        
        
        
    },
    mounted(){
        
    },
    methods:{
        getDate (datestr) {
            var temp = datestr.split('/');
            if (temp[1] === '01') {
                temp[0] = parseInt(temp[0],10) - 1;
                temp[1] = '12';
            } else {
                temp[1] = parseInt(temp[1],10) - 1;
            }
            //new Date()的月份入参实际都是当前值-1
            var date = new Date(temp[0], temp[1], temp[2]);
            return date;
        },
        getDiffDate(start, end) {
            var startTime = this.getDate(start);
            var endTime = this.getDate(end);
            var dateArr = [];
            while ((endTime.getTime() - startTime.getTime()) >= 0) {
                var year = startTime.getFullYear();
                var month =  startTime.getMonth() + 1;
                var day =  startTime.getDate();
                
                month = month>=10?month:'0'+month;
                day = day>=10?day:'0'+day;
                // dateArr.push(year + '/' + month + '/' + day);
                var dates = {
                    years:year,
                    months:month,
                    days:day,
                    isbe:false
                }
                dateArr.push(dates)
                startTime.setDate(startTime.getDate() + 1);
            }
            return dateArr;
        },
        oneDay(y,m,d){
            var myDate=new Date();
            myDate.setFullYear(y,m-1,d);
            var week = myDate.getDay()
            return week;
        },
        setDays(y,m,d){
            if(y!=1){
            this.isYear = y;
            this.isMonth = m;
            this.isDay = d;
            var time = y+'/'+m+'/'+d;
            this.selectTime.push(time);
            this.jztTime = [];
            this.jztTime.push(time);
            if(this.selectTime.length>=2){
                var isYears = this.selectTime[0].split('/');
                this.isYears = isYears[0];
                this.isMonths = isYears[1];
                this.isDays = isYears[2];

                var isYearc = this.selectTime[1].split('/');
                this.isYear = isYearc[0];
                this.isMonth = isYearc[1];
                this.isDay = isYearc[2];

                var tiema = new Date(this.selectTime[0]);
                var tiemb = new Date(this.selectTime[1]);
                var a = tiema.getTime();
                var b = tiemb.getTime();
                var c = '';
                if(a>b){
                    c = this.selectTime[0];
                    this.selectTime[0] = this.selectTime[1];
                    this.selectTime[1] = c;
                    this.jztTime =  this.selectTime;
                    var timearr = this.getDiffDate(this.selectTime[0],this.selectTime[1]);
                    for(var i=0;i<this.dateBox.length;i++){
                        for(var j=0;j<timearr.length;j++){
                            if(this.dateBox[i].years === timearr[j].years && this.dateBox[i].months === timearr[j].months && this.dateBox[i].days === timearr[j].days){
                                this.dateBox[i].isbei = true;
                            }
                        }
                    }
                }else if(a==b){
                    this.selectTime.splice(0,1);
                    this.jztTime =  this.selectTime;
                }else{
                    this.jztTime =  this.selectTime;
                    var timearr = this.getDiffDate(this.selectTime[0],this.selectTime[1]);
                    for(var i=0;i<this.dateBox.length;i++){
                        for(var j=0;j<timearr.length;j++){
                            if(this.dateBox[i].years === timearr[j].years && this.dateBox[i].months === timearr[j].months && this.dateBox[i].days === timearr[j].days){
                                this.dateBox[i].isbei = true;
                            }
                        }
                    }
                }
                this.selectTime = [];
            }else{
                for(var i=0;i<this.dateBox.length;i++){
                   this.dateBox[i].isbei = false;
               }
            }
           }
        },
        currentTimes(){
            var Time = new Date();
            var year = Time.getFullYear();
			var month = Time.getMonth()+1;
            var date = Time.getDate();
            
            month = month>=10?month:'0'+month;
            date = date>=10?date:'0'+date;

            this.isYear = year;
            this.isMonth = month;
            this.isDay = date;
        },
        touchMove (e) {
            var that = this;
            this.cboxs.push(e.targetTouches[0].clientY);
            var ids = this.cboxs.length;
            var ju = this.cboxs[this.cboxs.length-1] - this.cboxs[0];
            if(ju<-80 && this.isBottom == true){
                var end = this.endDate;
                end = end.split('/');
                if(end[1] == 12){
                    var endY = end[0]*1+1;
                    var endM = 1;
                    var ends = endY+'/'+endM+'/'+'01';
                }else{
                    var endY = end[0];
                    var endM = end[1]*1+1;
                    var ends = endY+'/'+endM+'/'+'01';
                } 
                this.pushDiffDate(this.endDate,ends);
                this.endDate = ends;
            }
            if(ju>80 && this.isTop == true){
                var start = this.startDate;
                start = start.split('/');
                if(start[1] == 1){
                    var startY = start[0]-1;
                    var startM = 12;
                    var starts = startY+'/'+startM+'/'+'01';
                }else{
                    var startY = start[0];
                    var startM = start[1]-1;
                    var starts = startY+'/'+startM+'/'+'01';
                } 
                this.dateBox = this.getDiffDate(starts,this.endDate);
                var arrs = that.dateBox[0];
                var b = that.oneDay(arrs.years,arrs.months,arrs.days);
                if(b > 0){
                    for(var i=0;i<b;i++){
                        var da = {
                            years:1,
                            months:1,
                            days:'',
                            isbei:false
                        }
                        that.dateBox.unshift(da);
                    }
                        
                }
                this.startDate = starts;
                this.isTop = false;
            }
        },
        touchend(){
            this.cboxs = [];
            this.isTop = true;
        },
        isscrolls(e){
            this.isTop = false;
            this.scrollTop = e.target.scrollTop;
            if(e.target.scrollTop == 0){
                this.isTop = true;
            }else{
                this.isTop = false;
            }
            let sh = e.target.scrollHeight
            let st = e.target.scrollTop
            let ch = e.target.clientHeight
            if (Math.ceil(st + ch) === sh) {
                this.isBottom = true;
            }else{
                this.isBottom = false;
            }
        },
         pushDiffDate(start, end) {
            var startTime = this.getDate(start);
            var endTime = this.getDate(end);
            while ((endTime.getTime() - startTime.getTime()) > 0) {
                var year = startTime.getFullYear();
                var month =  startTime.getMonth() + 1;
                var day =  startTime.getDate();

                month = month>=10?month:'0'+month;
                day = day>=10?day:'0'+day;
                // dateArr.push(year + '/' + month + '/' + day);
                var dates = {
                    years:year,
                    months:month,
                    days:day,
                    isbei:false
                }
                var that = this;
                if(JSON.stringify(this.dateBox).indexOf(JSON.stringify(dates)) == -1){
                    this.dateBox.push(dates);
                }
                startTime.setDate(startTime.getDate() + 1);
            }
           
        },
    }
}
</script>

<style scoped>
    .box{
        height:100%;
        background: #fff;
    }
    .box .weekDate{
        height:.666667rem;
        background: #eee;
        display: flex;
    }
    .box .weekDate li{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .293333rem;
    }
    .box .dateBox{
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .box .dateBox::-webkit-scrollbar {
        display: none;
    }
    .box .dateBox li{
        float: left;
        width: 14.2%;
        height:.933333rem;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background: skyblue;
        color: #fff; */
        font-size: .32rem;
        margin-bottom:.066667rem; 
        position: relative;
       
    }
    .box .dateBox li i{
        position: absolute;
        top:.026667rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: .16rem;
    }
    .box .dateBox li b{
        position: absolute;
        bottom:.026667rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: .16rem;
        font-weight: 200;
    }
    .lan{
        background: #6BB8FF;
        color: #fff;
    }
    .dateBottom{
        height: .8rem;
        background: #fff;
        display: flex;
    }
    .dateBottom li{
        flex: 1;
        font-size:.32rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dateBottom .qd{
        background: rgb(5, 132, 252);
        color: #fff;
    }
    .dateBottom .qx{
        border-top:.013333rem solid #ccc;
        border-bottom:.013333rem solid #ccc; 
    }
</style>