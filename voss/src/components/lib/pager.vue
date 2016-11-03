<template>
<div class="vue-pager">
    <ul class="pagination pagination-sm vue-pager-pagination">
        <li v-for="item in pageRange" @click="pageClick(item.num)" :class="item.className">
            <a href="javascript:;">{{item.text}}</a>
        </li>
        <li>
            <p>当前<input type="text" class="iptpage" v-model="currPage" @change="pageClick()" lazy number/>页，共{{totalPage}}页</p>
            <button class="btn btn-default btn-sm outline-none" @click="refresh"><i class="glyphicon glyphicon-refresh"></i>刷新</button>
            <p class="count" v-if="count">{{count}}</p>
        </li>
    </ul>
</div>
</template>

<script>
module.exports = {
    props: {
        totalPage: {
            type: Number,
            default: 1
        },
        currPage: {
            type: Number,
            default: 1,
        },
        count: String,
    },
    data : function (){
        return {
            pageRange : [],
            prevShow : 3,
            nextShow : 3,
            gotoPage: 1,
        }
    },
    watch : {
        totalPage : function (){
            this.getPageRange()
        },
        currPage : function (){
            this.getPageRange()
        },
        prevShow : function (){
            this.getPageRange()
        },
        nextShow : function (){
            this.getPageRange()
        }
    },
    methods : {
        getPageRange : function (){
            var start = 0
            var end = 0
            var showLen = this.prevShow + this.nextShow + 1
            var totalPage = Math.max(this.totalPage, 1)
            var currPage = this.currPage

            if (totalPage <= 1){
                start = end = 1
            }
            else if (totalPage <= showLen){
                start = 1
                end = totalPage
            }
            else {
                if (currPage <= this.prevShow + 1){
                    start = 1
                    end = showLen
                }
                else if (currPage >= totalPage - this.nextShow){
                    end = totalPage
                    start = totalPage - showLen + 1
                }
                else {
                    start = currPage - this.prevShow
                    end = currPage + this.nextShow
                }
            }

            this.pageRange = []

            //上一页
            if (currPage != 1){
                this.pageRange.push({num:currPage-1, text:'«'})
            }
            //第一页
            if (start >= 2){
                this.pageRange.push({num:1, text:1})
            }
            //省略号
            if (start > 2){
                this.pageRange.push({text:'..'})
            }
            //显示的页码列表
            for (var i=start; i<=end; i++){
                this.pageRange.push({
                    num : i,
                    text : i,
                    className : (i==currPage) ? 'active' : ''
                })
            }
            //省略号
            if (end < totalPage-1){
                this.pageRange.push({text:'..'})
            }
            //最后一页
            if (end <= totalPage-1){
                this.pageRange.push({num:totalPage, text:totalPage})
            }
            //下一页
            if (currPage != totalPage){
                this.pageRange.push({num:currPage+1, text:'»'})
            }
        },
        pageClick : function (i){
            if (!i){
                //return false
                i = ~~(this.currPage);
                if (i < 1 || i > this.totalPage) {
                    return false;
                }
            } else if (i == this.currPage){
                return false
            }
            this.currPage = i
            this.getPageRange()

            //notify parent
            this.$dispatch('page-change', i);
        },
        refresh: function() {
            this.$dispatch('data-refresh');
        }
    },
    compiled : function (){
        this.getPageRange()
    }
}
</script>

<style>
.vue-page {
    width: 100%;
}
.vue-pager-pagination{
    width: 100%;
    position:absolute;
    left: 50%;
    bottom: 6px;
    transform:translateX(-20%);
    margin-bottom:0;
    margin-top:0;
 }
 .vue-pager p{
    display: inline-block;
    margin-left:10px;
    margin-bottom:0;
    padding-top:3px;
 }
 .iptpage{
    width:30px;
    height:20px;
    border:1px solid #ccc;
    margin: 0 5px;
    text-align:center;
 }
 .pagination-sm>li:first-child>a,
.pagination-sm>li:first-child>span {
    border-radius:0;
}

.pagination-sm>li>a, 
.pagination-sm>li>span {
    padding:3px 8px;
}

.count {
    font-weight: bold;
}
</style>