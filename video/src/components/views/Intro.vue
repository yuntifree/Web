<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/common.scss';
.intro {
  padding: 0 0.2rem;
  background-color: #fff;
}
.intro-item-tit {
  @include containerSize(100%, 0.7rem);
  line-height: 0.7rem;
  border-bottom: 1px solid #ddd;
  color: #fc6719;
  font-size: 0.28rem;
  text-align: left;
}
.item-msg {
  @extend %rowFlex;
  padding: 0.4rem 0 0 0.2rem;
  dt {
    @include containerSize(1.2rem, 1.2rem);
    img {
      display: block;
      @extend %img100;
      border-radius: 50%;
    }
  }
  dd {
    max-width: 78%;
    margin-left: 0.2rem;
    .live-comp {
      text-align: left;
      color: #545964;
      font-weight: bold;
    }
    .live-tit {
      text-align: left;
      font-size: 0.28rem;
      color: #bfbfbf;
      height: 0.4rem;
      line-height: 0.4rem;
      margin-top: 0.09rem;
    }
    .live-msg {
      font-size: 0.28rem;
      color: #545964;
      text-align: justify;
      line-height: 150%;
      margin-top: 0.1rem;     
    }
    .live-look {
      color: #AAAAAA;
      font-size: 0.24rem;
      position: relative;
      &:before {
        border-top: 0.1rem solid #AAAAAA;
        border-left: 0.1rem solid transparent;
        border-right: 0.1rem solid transparent;
        content: "";
        display: block;
        height: 0;
        @include pos(top,50%,right,-0.3rem);
        transform: translateY(-50%);
      }
    }
    .live-look-all {
      &:before {
        border-top: 0;
        border-bottom:  0.1rem solid #AAAAAA;
      }
    }
  }
}
.intro-item-main {
  padding: 0.4rem 0.2rem;
  li {
    text-align: left;
    padding-left: 0.26rem;
    .intro-item-tit {
      display: inline;
      background-color: #e36c09;
      color: #fff;
      text-align: left;
      font-weight: bold;
      padding: 0.06rem 0.1rem;
      margin-top: 0.2rem;
    }
    .intro-item-msg {
      margin-bottom: 0.1rem;
      line-height: 150%;
      text-align: justify;
      color: #000;
      font-size:0.24rem;
    }
  }
}
.intro-guest {
  display: block;
  @extend %img100;
}
</style>

<template>
  <div class="intro">
    <div class="intro-item">
      <h2 class="intro-item-tit">峰会介绍</h2>
      <dl class="item-msg">
        <dt><img src="../../assets/logo.jpg" alt="logo"></dt>
        <dd>
          <h3 class="live-comp">云行智慧</h3>
          <p class="live-tit g-ellipsis">2017·北京首届国际资本领袖峰会</p>
          <p class="live-msg" :class="{'g-ellipsis':!look.show}">为汇聚国内国外资本领袖，共商全球化资本与中国经济发展，并为国内国际资本、项目、企业、机构和证券市场打造一个共融、共通、共享、共赢的资源平台，由新华社·中国财富传媒集团主办、普谛恩（中国）国际文化发展有限公司承办的国际资本领袖峰会应势而生。峰会将以“资本”为核心关键词，汇聚国内外知名投行、券商、基金、保荐人等资本圈大咖，多角度解读国内、国际资本市场，共同探讨世界经济及资本的未来趋势，寻求中国企业国内外上市融资的发展之道。 </p>
          <span class="live-look" :class="{'live-look-all': look.show}" @click="seeAll">{{look.text}}</span>
        </dd>
      </dl>
    </div>
    <div class="intro-detail">
      <h2 class="intro-item-tit">峰会概况与嘉宾简介</h2>
      <ul class="intro-item-main">
        <li v-for="item in introLists">
          <h3 class="intro-item-tit" v-text="item.tit"></h3>
          <p class="intro-item-msg" v-html="item.msg"></p>
        </li>
      </ul>
      <img class="intro-guest" src="http://imgv.xldlive.com/15115792288499.jpg?imageView/2/w/640">
    </div>
  </div>
</template>

<script>
export default {
  name: 'intro',
  data () {
    return {
      look: {
        show: false,
        text: '查看全部'
      },
      introLists: [{
        tit: '背景介绍',
        msg: '英国退欧、美国缩表、朝鲜半岛局势动荡……。风险事件、地缘政治等不确定因素如影随形。<br/>国内资本市场政策持续优化，投资人在保持谨慎投资态度下适度调整投资节奏，愈加关注全产业链投资布局。'
      },{
        tit: '峰会介绍',
        msg: '为汇聚国内国外资本领袖，共商全球化资本与中国经济发展，并为国内国际资本、项目、企业、机构和证券市场打造一个共融、共通、共享、共赢的资源平台，由新华社·中国财富传媒集团主办、普谛恩（中国）国际文化发展有限公司承办的国际资本领袖峰会应势而生。峰会将以“资本”为核心关键词，汇聚国内外知名投行、券商、基金、保荐人等资本圈大咖，多角度解读国内、国际资本市场，共同探讨世界经济及资本的未来趋势，寻求中国企业国内外上市融资的发展之道。<br/>同时，首届峰会也将推出国际精英企业家俱乐部，作为日常活动组织与资源、资金和项目落地的会员组织平台，为会员推出一系列海内外融资、并购、上市等权利与福利。'
      },{
        tit: '主办单位',
        msg: '新华社·中国财富传媒集团<br />中国财富传媒集团由国务院和中宣部批准成立，拥有中国证券报、上海证券报、经济参考报、新华出版社、中国财富网，以及资产管理公司等成员单位，是新华社重点打造的综合性、高技术、全媒体的现代传媒集团。<br/>中国证券报、上海证券报与中国证券交易市场同步诞生、共同成长，是证监会、保监会、银监会指定信息披露报纸。<br/>经济参考报作为新中国财经第一报，以“参考性+高端财经”为定位，拥有众多大型企业客户资源，受到企业高管、政府部门、专家学者广泛关注。'
      }]
    }
  },
  mounted() {

  },
  methods: {
    seeAll() {
      if (this.look.show) {
        this.look.show = false;
      } else {
        this.look.show = true;
      }
    },
  }
}
</script>

