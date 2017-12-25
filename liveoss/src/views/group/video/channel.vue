<style type="text/css" lang="less" scoped>
.form-tag {
  border: 1px solid #ddd;
  padding: 5px;
  height: 44px;
  margin-top: -1px;
  margin-left: -1px;
  overflow: hidden;
}
</style>
<template>
    <Tabs value="频道编辑">
      <TabPane label="标签一" name="name1">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="标签">
            <Button type="success">新增标签</Button>
            <Button type="success">标签列表</Button>
          </FormItem>
          <FormItem label="频道名称">
            <Input v-model="formValidate.name" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="频道轮播图">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" icon="ios-cloud-upload-outline">推荐640W*300H</Button>
            </Upload>
          </FormItem>
          <FormItem label="公众号二维码">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" icon="ios-cloud-upload-outline">推荐128W*128H</Button>
            </Upload>
          </FormItem>
          <FormItem label="直播介绍">
              <Input v-model="formValidate.liveTro" type="textarea" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="自定义标签">
            <Row>
              <Col span="12" class-name="form-tag"><span>参数</span></Col>
              <Col span="12" class-name="form-tag"><span>值</span></Col>
            </Row>
            <Row>
              <Col span="12" class-name="form-tag"><span>频道介绍</span></Col>
              <Col span="12" class-name="form-tag"><Input v-model="tag.channelIntro" placeholder="Enter something..."></Input></Col>
            </Row>
            <Row>
              <Col span="12" class-name="form-tag"><span>直播简介</span></Col>
              <Col span="12" class-name="form-tag"><Input v-model="tag.liveIntro" placeholder="Enter something..."></Input></Col>
            </Row>
            <Row>
              <Col span="12" class-name="form-tag"><span>微信公众号</span></Col>
              <Col span="12" class-name="form-tag"><Input v-model="tag.wxName" placeholder="Enter something..."></Input></Col>
            </Row>
            <Row>
              <Col span="12" class-name="form-tag"><span>默认显示频道简介</span></Col>
              <Col span="12" class-name="form-tag">
                <RadioGroup v-model="tag.showIntro">
                  <Radio label="1">是</Radio>
                  <Radio label="0">否</Radio>
                </RadioGroup>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="二维码">
            <img :src="formValidate.wxCode" alt="" style="display: block;width:100px;height: 100px">
          </FormItem>
          <FormItem label="频道地址">
             <Input placeholder="Enter something..." :disabled="true">http://www.xiangbojiubo.com/app/channel/a39e74ba4f6cc8a72df34cc723155d7c</Input>
          </FormItem>
          <FormItem label="附加功能">
             <Checkbox name="home">个人中心&收藏</Checkbox>
          </FormItem>
          <FormItem>
             <Button type="info">保存</Button>
         </FormItem>
        </Form>
      </TabPane>
    </Tabs>
</template>

<script>
  export default {
    name:'addVidep',
    data () {
      return {
        tag: {
          channelIntro: '关注',
          liveIntro: '直播简介',
          wxName: '企业公众号',
          showIntro: '1',
        },
        formValidate: {
          name: '2017-12-19',
          liveIntro: '顶播，深圳市新利迪科技有限公司旗下核心产品，国内领先的企业直播服务平台。提供专属企业直播服务，为企业量身打造直播平台，提供一站式企业直播服务解决方案。顶播采用创新性的富流媒体直播云架构设计，自主研发桌面直播工具和云服务，广泛应用于文化传媒、会务公关、体育赛事、婚庆典礼、企业年会、政务公开、渠道招商、峰会论坛、演唱会、产品发布、教育培训等行业场景。',
          attach: ['home'],
          wxCode: 'http://www.xiangbojiubo.com/manager/video/qrcode/channel?id=97'
        },
        ruleValidate: {
        }
      }
    },
    methods: {
      
    }
  }
</script>
