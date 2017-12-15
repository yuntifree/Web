<style scoped lang="scss">
@import '../../assets/css/common.scss';
.award {
  @include containerSize(100%, auto);
  background-color: #ff8827;
}
.award-top {
  @include containerSize(100%,auto);
  img {
    display: block;
    @include containerSize(100%, auto);
  }
}
.award-lists {
  @include containerSize(100%, auto);
  background: url('http://pdnlive.cfbond.com/video/img/luck-user-list-cut.png');
  background-size: 100%;
  .list-item {
    @include containerSize(6.69376rem, 0.75rem);
    margin: 0 auto;
    @extend %rowFlex;
    span {
      line-height: 0.75rem;
    }
    &:nth-child(odd) {
      span {
        background-color: #ffefdd;
      }
    }
    &:nth-child(even) {
      span {
        background-color: #fffcf7;        
      }
    }
    .award-name {
      flex:2;
      text-align: left;
      padding-left: 0.2rem;
    }
    .award-constant {
      flex:1;
    }
    .award-variety {
      flex: 4;
      background-color: #fff;
    }
  }
}
</style>

<template>
  <div class="award">
    <div class="award-top">
      <img src="http://pdnlive.cfbond.com/video/img/luck-user-list-head.jpg">
    </div>
    <ul class="award-lists">
      <li class="list-item" v-for="list in awardLists">
        <span class="award-name g-ellipsis">{{list.name}}</span>
        <span class="award-constant">抽中</span>
        <span class="award-variety">{{list.variety}}</span>
      </li>
    </ul>
    <div class="award-top"><img src="http://pdnlive.cfbond.com/video/img/luck-user-list-footer.png"></div>
  </div>
</template>

<script>
export default {
  name: 'award',
  data () {
    return {
      awardLists: [{
        name: '咪咪',
        variety: '免费看直播'
      },{
        name: '四叶草雨荷',
        variety: '免费看直播'
      },{
        name: '鑫锐😘',
        variety: '礼盒3件套'
      },{
        name: '崔稼洺13946693445',
        variety: '礼盒3件套'
      },{
        name: '黄智滢',
        variety: '礼盒3件套'
      },{
        name: '隔壁家的老王',
        variety: 'U盘'
      },{
        name: '鲲鹏96786',
        variety: 'U盘'
      }]
    }
  },
  mounted() {

  },
  methods: {
  }
}
</script>

