<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/common.scss';
.vote {
  margin-top: 0.525rem;
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: rgb(246, 244, 245);
  font-family: '微软雅黑';
  font-size: 0.35rem;
  padding-top: 0.15rem;
}
.vote .row {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.vote .row .btn {
  float: right;
}
.vote .row .btn, .vote .row .search {
  width: 4.5rem;
  height: 1.25rem;
  display: inline-block;
}
.vote .row input[type=text] {
  border: 1px solid rgb(245, 112, 45);
  padding: 0.235rem 0.15rem;
  border-radius: 0.05rem;
  color: gray;
  font-family: '微软雅黑';
  font-size: 0.35rem;
  width: 5.5rem;
}
.vote .search-btn {
  position: absolute;
  margin-right: 0.335rem;
  width: 1.25rem;
  height: 1rem;
  background-color: rgb(245, 112, 45);
  margin-top: -1rem;
  border-bottom-right-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  background-image: url(../../assets/search.png);
  background-repeat: no-repeat;
  background-position: 0.3285rem 0.175rem;
  background-size: 0.675rem;
  margin-left: 4.62rem;
}
.vote .label {
  margin-top: 0.025rem;
  color: gray;
  background-color: white;
  margin-bottom: 0.1rem;
  width: 10rem;
}
.vote .vote-tabs {
  height: 1rem;
  width: 9.6rem;
  text-align: center;
  margin: 0 auto;
}
.vote .vote-tabs ul {
  display: -webkit-flex;
  color: gray;
  list-style: none;
  padding-left: 0;
}
.vote .vote-tabs ul li {
  flex: 1;
  text-align: center;
  margin-top: 0.1rem;
}
.vote .label ul li {
  flex: 1;
  text-align: center;
}
.vote .label ul li:first-child {
  margin-left: -1px;
}
.vote .vote-tabs ul li .btn-tab {
  margin: 0 0.075rem;
  padding: 0.175rem;
  border: 1px solid #e9e9e9;
  border-radius: 0.05rem;
  background-color: white;
}
.vote .vote-tabs ul li .active-tab {
  margin: 0 0.075rem;
  padding: 0.175rem;
  background: rgb(245, 112, 45);
  border: 1px solid rgb(245, 112, 45);
  border-radius: 0.05rem;
  color: white;
}
.vote .vote-member,
.vote .vote-member-new {
  width: 9.38rem;
  margin: 0 auto;
  margin-bottom: 0.25rem;
  min-height: 24rem;
}
.vote .vote-member .item ul,
.vote .vote-member-new .item ul {
  list-style: none;
}
.vote .vote-member ul li,
.vote .vote-member-new ul li {
  margin-top: 0.25rem;
  width: 4.6rem;
  display: inline-block;
  background-color: white;
  padding-bottom: 0.15rem;
}
.vote .vote-member ul li:nth-child(odd),
.vote .vote-member-new ul li:nth-child(odd) {
  float: left;
}
.vote .vote-member ul li:nth-child(even),
.vote .vote-member-new ul li:nth-child(even){
  float: right;
}
.vote .vote-member .item ul li .flag,
.vote .vote-member-new .item ul li .flag {
  position: absolute;
  background-image: url(../../assets/q.png);
  background-repeat: no-repeat;
  background-size: 100% 80%;
  display: block;
  min-width: 1rem;
  height: 1rem;
  color: white;
  font-size: 0.25rem;
  text-align: center;
  line-height: 0.675rem;
  margin-left: 0.2rem;
}
.vote .vote-member .item ul li .image,
.vote .vote-member-new .item ul li .image {
  height: 5.6rem;
  overflow: hidden;
}
.vote .vote-member .item ul li img,
.vote .vote-member-new .item ul li img {
  width: 100%;
}
.vote .vote-member .item ul li .desc,
.vote .vote-member-new .item ul li .desc {
  font-size: 0.35rem;
  padding: 0 0.15rem;
  color: gray;
  height: 0.75rem;
  line-height: 0.75rem;
}
.vote .vote-member .item ul li .btn,
.vote .vote-member-new .item ul li .btn {
  text-align: center;
  line-height: 0rem;
}
.vote .vote-member .item ul li input,
.vote .vote-member-new .item ul li input {
  background: rgb(245, 112, 45);
  border: 1px solid rgb(245, 112, 45);
  border-radius: 0.05rem;
  color: white;
  padding: 0.185rem 1.725rem;
  font-weight: 100;
  -webkit-appearance: none;
}
.vote .vote-member-new {
  width: 9.38rem;
  margin: 0 auto;
  margin-bottom: 0.25rem;
}
.vote .vote-member-ranking {
  margin-top: 0.25rem;
  background-color: white;
  margin-left: 0.275rem;
  margin-right: 0.275rem;
  margin-bottom: 0.25rem;
}
.vote .vote-member-ranking ul li {
  margin: 0 auto;
  width: 9.4rem;
  display: flex;
}
.vote .vote-member-ranking ul li:first-child .ranking-column {
  color: #212121;
  display: inline-block;
  flex: 1;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 1px solid #EAEAEA;
}
.vote .vote-member-ranking .ranking-column {
  color: gray;
  display: inline-block;
  flex: 1;
  text-align: center;
  border-bottom: 1px solid #EAEAEA;
}
.vote .vote-member-ranking ul li:first-child .ranking-column:nth-child(3) {
  color: #212121;
  display: inline-block;
  flex: 3;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 1px solid #EAEAEA;
}
.vote .vote-member-ranking .ranking-column:nth-child(3) {
  color: gray;
  display: inline-block;
  flex: 3;
  text-align: center;
  border-bottom: 1px solid #EAEAEA;
}
.vote .vote-member-ranking .ranking-column:last-child {
  color: rgb(245, 112, 45);
  display: inline-block;
  flex: 1;
  text-align: center;
  border-bottom: 1px solid #EAEAEA;
}
.vote .vote-member-ranking .ranking-column span {
  margin-top: 0.225rem;
  margin-bottom: 0.225rem;
  display: inline-block;
}
.vote .vote-member-ranking .ranking-column:first-child span {
  border: 1px solid rgba(245, 112, 45, 1);
  width: 0.5rem;
  height: 0.5rem;
  font-size: 0.25rem;
  line-height: 0.5rem;
  border-radius: 0.05rem;
}
.vote .vote-member-ranking ul li:nth-child(2) .ranking-column:first-child span {
  width: 0.5rem;
  height: 0.575rem;
  font-size: 0.25rem;
  line-height: 0.5rem;
  border-radius: 0.05rem;
  box-shadow: none;
  border: none;
  background-image: url(../../assets/gold.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.vote .vote-member-ranking ul li:nth-child(3) .ranking-column:first-child span {
  width: 0.5rem;
  height: 0.575rem;
  font-size: 0.25rem;
  line-height: 0.5rem;
  border-radius: 0.05rem;
  box-shadow: none;
  border: none;
  background-image: url(../../assets/silver.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.vote .vote-member-ranking ul li:nth-child(4) .ranking-column:first-child span {
  width: 0.5rem;
  height: 0.575rem;
  font-size: 0.25rem;
  line-height: 0.5rem;
  border-radius: 0.05rem;
  box-shadow: none;
  border: none;
  background-image: url(../../assets/cu.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.vote .vote-member-rule {
  margin-left: 0.275rem;
  margin-right: 0.275rem;
  margin-top: 0.25rem;
  background-color: white;
  font-size: 0.35rem;
  padding: 0 0.5rem;
  line-height: 0.625rem;
  color: gray;
}
.vote .vote-member-rule .row {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.4rem;
  color: #212121;
}
.vote .vote-member-rule .label {
  height: 0.5rem;
  line-height: 0.5rem;
  color: rgb(245, 112, 45);
  width: 5rem;
}
.vote .vote-member-rule p {
  margin-bottom: 0.35rem;
}
.vote .vote-member-sign-up {
  margin: 0.25rem;
}
.vote .vote-member-info {
  background-color: white;
  margin: 0.25rem;
  color: gray;
  line-height: 0.5rem;
  padding-bottom: 1rem;
}
.vote .vote-member-info .head {
  height: 0.75rem;
  padding: 0.5rem 0.5rem 0 0.5rem;
  color: #212121;
}
.vote .vote-member-info .content {
  padding: 0 0.5rem;
}
.vote .vote-member-info .label {
  height: 0.75rem;
  line-height: 0.75rem;
  color: rgb(245, 112, 45);
  width: 5rem;
}
.vote .vote-dialog {
  display: none;
  position: fixed;
  bottom: 0.5rem;
  height: 10rem;
  width: 8rem;
  background-color: white;
  margin-left: 1rem;
  border-radius: 0.25rem;
  background-size: 100% 100%;
  z-index: 20170427;
}
.vote .vote-code {
  display: none;
  width: 6rem;
  height: 5rem;
  background-color: white;
  position: fixed;
  bottom: 2rem;
  margin-left: 2rem;
  border-radius: 0.25rem;
}
.vote .label ul {
  list-style: none;
  display: -webkit-flex;
  border-top: 1px solid #EAEAEA;
  border-bottom: 1px solid #EAEAEA;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0;
}
.vote .label ul li:first-child {
  margin-left: -1px;
}
.vote .label ul li {
  flex: 1;
  text-align: center;
}
.vote .label ul li div:nth-child(2) {
  color: rgb(245, 112, 45);
}
</style>
<template>
<div class="vote" v-if="mounted">
  <div class="row">
    <div class="btn"></div>
    <div class="search">
      <input type="text" placeholder="请输入姓名或编号" id="search_key" value="">
      <div class="search-btn" @click="search_user_list()"></div>
    </div>
  </div>
  <div class="label">
    <ul>
      <li>
        <div style="border-right: 1px solid #EAEAEA;">
          <div>参与节目</div>
          <div>96</div>
        </div>
      </li>
      <li>
        <div>累计投票</div>
        <div>107968</div>
      </li>
    </ul>
  </div>
  <div class="vote-tabs">
    <ul>
      <li>
        <div class="btn-tab" id="vote-member" :class="selectIdx==0 && 'active-tab'" @click="selectIdx = 0">全部参赛</div>
      </li>
      <li>
        <div class="btn-tab" id="vote-member-new" :class="selectIdx==1 && 'active-tab'" @click="selectIdx = 1">最新参赛</div>
      </li>
      <li>
        <div class="btn-tab" id="vote-member-ranking" :class="selectIdx==2 && 'active-tab'" @click="selectIdx = 2">排名</div>
      </li>
      <li>
        <div class="btn-tab" id="vote-member-rule" :class="selectIdx==3 && 'active-tab'" @click="selectIdx = 3">活动规则</div>
      </li>
    </ul>
  </div>
  <div class="vote-member" v-show="selectIdx == 0">
    <div class="item" id="vote_member_items">
      <ul>
        <li v-for="voteItem in voteList">
          <div class="flag">{{voteItem.no}}号</div>
          <div class="image" @click="member_info(voteItem.id, true)">
            <img :src="voteItem.image" :alt="voteItem.name">
          </div>
          <div class="desc">
            <span style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;width: 2.8rem;float: left;">{{voteItem.name}}</span>
            <span class="pull-right" style="width: 1.5rem;overflow: hidden;white-space: nowrap;text-align: right;">{{voteItem.vote_count}}票</span>
          </div>
          <div class="btn"><input type="button" @click="member_vote(voteItem.id, voteItem.name)" value="投票"></div>
        </li>
      </ul>
    </div>
    <div style="clear: both;"></div>
    <div style="text-align: center;"><input type="button" value="点击加载更多" @click="member_to_next()" style="display: inline;"></div>
  </div>
  <div class="vote-member-new" v-show="selectIdx == 1">
    <div class="item" id="vote_member_new_items">
      <ul>
        <li v-for="voteNewItem in voteNewlist">
          <div class="flag">{{voteNewItem.no}}号</div>
          <div class="image" @click="member_info(voteNewItem.id, true)">
            <img :src="voteNewItem.image" :alt="voteNewItem.name">
          </div>
          <div class="desc">
            <span style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;width: 2.8rem;float: left;">{{voteNewItem.name}}</span>
            <span class="pull-right" style="width: 1.5rem;overflow: hidden;white-space: nowrap;text-align: right;">{{voteNewItem.vote_count}}票</span>
          </div>
          <div class="btn"><input type="button" @click="member_vote(voteNewItem.id, voteNewItem.name)" value="投票"></div>
        </li>
      </ul>
    </div>
    <div style="clear: both;"></div>
    <div style="text-align: center;"><input type="button" value="点击加载更多" @click="member_new_to_next()" style="display: inline;"></div>
  </div>
  <div class="vote-member-ranking" v-show="selectIdx == 2">
    <ul>
      <li>
        <div class="ranking-column">排名</div>
        <div class="ranking-column">编号</div>
        <div class="ranking-column">参赛姓名</div>
        <div class="ranking-column">票数</div>
      </li>
      <li v-for="(voteRankItem, index) in voteRankList">
        <div class="ranking-column"><span>{{index < 2 ? '' : index}}</span></div>
        <div class="ranking-column"><span>{{voteRankItem.no}}</span></div>
        <div class="ranking-column"><span>{{voteRankItem.name}}</span></div>
        <div class="ranking-column"><span>{{voteRankItem.vote_count}}</span></div>
      </li>
    </ul>
  </div>
  <div class="vote-member-rule" v-show="selectIdx == 3">
    <div class="row">活动规则</div>
    <div>
      <p class="label">活动时间</p>
      <p>{{rule.start}} 至 {{rule.end}}</p>
      <p class="label">活动介绍</p>
      <p v-html="rule.content"></p>
    </div>
  </div>
  <div class="vote-member-sign-up" style="display:none;">
    <div class="oneline">
      <span><b>*</b>参赛姓名：</span>
      <span><input type="text" name="name" id="name" placeholder="请输入姓名"></span>
    </div>
    <div class="oneline">
      <span><b>*</b>联系电话：</span>
      <span><input type="text" name="phone" id="phone" placeholder="请输入手机号码"></span>
    </div>
    <div class="oneline" style="height:1.75rem;line-height:1.75rem;">
      <span><b>*</b>参赛图片：</span>
      <span>
        <input type="hidden" name="image" id="image">
        <form id="upload-form" method="post" onsubmit="return false;" enctype="multipart/form-data" style="text-align: left;">
          <input type="file" id="upload-image" accept="image/*;capture=camera" name="file" value="参赛图片" @onchange="fileSelected()" style="opacity:0;height: 1.5rem;line-height: 1.5rem;width: 1.5rem;">
          <div class="upload-image" id="upload-image-div"></div>
        </form>
        <b style="position: absolute;font-size: 0.25rem;height: 0.1rem;line-height: 0.1rem;margin-top: -0.7rem;">图片大小推荐640宽*960高</b>
      </span>
    </div>
    <div class="dub">
      <span><b>*</b>自我介绍：</span>
      <span><textarea name="content" id="content" cols="25" rows="5" placeholder="请填写自我介绍"></textarea></span>
    </div>
    <div class="oneline"><input type="button" value="提交"></div>
  </div>
  <!--参赛人员信息-->
  <div class="vote-member-info" v-show="selectIdx == 5">
    <div class="head">
      <div class="pull-left"><i class="member-icon"></i> 47号&nbsp;&nbsp;&nbsp;吴俊熠-语言类 播音主持</div>
      <div class="pull-right"><i class="member-q-icon"></i> 97 &nbsp;&nbsp;&nbsp;<i class="member-p-icon"></i> 75</div>
    </div>
    <div class="content">
      <p style="text-align: center;"><input type="button" @ontouchend="member_vote(raw.videoId, vote.title)" value="为Ta投票"></p>
      <p><img :src="vote.pic" :alt="vote.title"></p>
      <p class="label">介绍</p>
      <p>vote.content</p>
      <p style="text-align: center;"><input type="button" @ontouchend="member_vote(raw.videoId, vote.title)" value="为Ta投票"></p>
      <p style="margin-top:0.35rem">
        <a style="display:block;" :href="vote.adurl"><img :src="vote.adpic"></a>
      </p>
    </div>
  </div>
  <div class="vote-dialog" v-show="selectIdx == 6">
    <h3></h3>
    <div class="vote-banner"></div>
    <div class="vote-tips">投票成功</div>
    <div class="vote-btn">确定</div>
  </div>
  <div class="vote-code" v-show="selectIdx == 7">
    <div class="vote-code-title">验证码</div>
    <div class="vote-code-img">
      <img src="http://imgv.xldlive.com/FpyFeWmpWLFnkmtX5QHERqb0T3Ol?imageView2/2/w/520" alt="">
    </div>
    <div class="vote-code-input">
      <input type="text" placeholder="请输入验证码">
    </div>
    <div class="vote-code-btn">
      <input type="button" value="确定">
    </div>
  </div>
  <div id="layui-m-layer8" class="layui-m-layer layui-m-layer1" v-show="selectIdx == 8">
    <div class="layui-m-layermain">
      <div class="layui-m-layersection">
        <div class="layui-m-layerchild custom-bottom-style layui-m-anim-up" style="position:fixed; bottom:0; left:0; width: 100%; height: 9.75rem; padding:0.5rem 0; border:none;">
          <h3 style="undefined">支持夏子涵-送别</h3>
          <div class="layui-m-layercont">
            <ul class="emoji-btn vote-gift-list">
              <li onclick="member_vote.click(this,0,0)">
                <i class="gift0" item-name="1票" item-ballot="1" style="background-image:url(http://imgv.xldlive.com/gift/%E7%BB%84-2.png)">
                  <span></span>
                </i>
                <br><span>1票</span><br>免费</li>
              <li onclick="member_vote.click(this,1,15)">
                <i class="gift1 " item-name="30票" item-ballot="30" style="background-image:url(http://imgv.xldlive.com/Fm7xVnENeFFFDdAAjjLPXqOQFFp1?imageView2/2/w/640)">
                  <span></span>
                </i>
                <br><span>30票</span><br>15点</li>
              <li onclick="member_vote.click(this,2,40)">
                <i class="gift2 active" item-name="90票" item-ballot="90票" style="background-image:url(http://imgv.xldlive.com/FjrUakktIByFK2Yx3OB90_OnNGJW?imageView2/2/w/640)">
                  <span></span>
                </i>
                <br><span>90票</span><br>40点
              </li>
              <li onclick="member_vote.click(this,3,80)">
                <i class="gift3 " item-name="200票" item-ballot="200票" style="background-image:url(http://imgv.xldlive.com/FuiWPiUuUQRpekRdeZJydjcqC5oJ?imageView2/2/w/640)">
                  <span></span>
                </i>
                <br><span>200票</span><br>80点
              </li>
            </ul>
            <div class="emoji-tips" style="height: 0.75rem;line-height: 0.75rem;margin-top: 0.5rem;">请选择礼物数量</div>
            <div class="emoji-input">
              <span onclick="member_vote.minus(this)">-</span>
              <input type="number" value="1" placeholder="1" class="vote-number" onblur="member_vote.blur(this)">
              <span onclick="member_vote.plus(this)">+</span>
            </div>
            <div class="emoji-tips">点数可兑换礼物 1点等于1元</div>
            <div class="emoji-send">
              <input onclick="member_vote.pay(this)" type="button" value="投票支持"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import voteUserList from '../../api/vote_user_list.js'
export default {
  name: 'vote',
  data() {
    return {
      voteList: [],
      voteNewlist: [],
      voteRankList: [],
      rule: {},
      raw: {},
      vote: {},
      mounted: false,
      selectIdx: 0,
      showInfo: false,
    }
  },
  mounted() {
    this.initData()
    this.mounted = true
  },
  methods: {
    initData() {
      this.voteList = voteUserList.data
      this.voteNewlist = voteUserList.data
      this.voteRankList = voteUserList.data
      this.rule = voteUserList.rule
    },
    search_user_list() {

    },
    member_vote(videoId, title) {

    },
    member_new_to_next() {

    },
    member_to_next() {

    },
    fileSelected() {

    },
    member_info(voteId, bShow) {
      this.selectIdx = 5
    }
  }
}
</script>
