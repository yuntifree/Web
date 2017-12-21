<style type="text/css" lang="less">
/*@import './home.less';*/
.home-fixed-top {
  padding: 10px;
  background-image:-webkit-linear-gradient(-90deg, #86c55c, #1fc2ca); 
  background-image:linear-gradient(-90deg,#86c55c,#1fc2ca);
}
.home-text {
  font-size: 14px;
  color: #fff;
  text-align: center;
  .home-text-tit {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 5px;
  }
  .home-logo {
    display: block;
    width: 62px;
    height: 62px;
    margin: 0 auto;
  }
}
.home-follow-info {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  p {
      line-height: 30px;
      i {
        margin-right: 5px;
      }
  }
}
.home-content {
  background-color: #fff;
  margin-top: 10px;
}
</style>
<template>
  <div class="home-main">
    <Row class="home-fixed-top">
      <Col span="4" class-name="home-text">
        <p class="home-text-tit">VIP用户</p>
        <p><img  class="home-logo" src="http://upload.xiangbojiubo.com/Fpu80AaJd-Q9gG5D0xRTm9tuIFWL" alt=""></p>
        <p class="home-text-comp">云行智慧</p>
      </Col>
      <Col span="20" class-name="home-follow-info">
        <p><Icon type="iphone" size="18"/>13000000000</p>
        <p><Icon type="ios-telephone" size="18"/>暂无固定电话</p>
        <p><Icon type="ios-email" size="18"/>91141100@qq.com</p>
      </Col>      
    </Row>
    <div class="home-content">
      <Tabs type="card">
        <TabPane label="认证信息">
          <confirm></confirm>
        </TabPane>
        <TabPane label="密码设置">密码设置</TabPane>
        <TabPane label="工单管理">工单管理</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import confirm from './confirm.vue'
export default {
    name: 'home',
    components: {
      confirm
    },
    data() {
      return {

      }
    }
};
</script>