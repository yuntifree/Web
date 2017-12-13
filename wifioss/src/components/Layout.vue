<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.layout{
  }
.layout-logo{
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
}
.layout-assistant{
    width: 300px;
    margin: 0 auto;
    height: inherit;
}
.layout-breadcrumb{
    padding: 10px 15px 0;
}
.layout-content{
    min-height: 200px;
    overflow: hidden;
}
.layout-content-main{
  width: 100%;
  padding: 12px 20px;
  position:relative;
  background-color: #23262d;
}
.layout-copy{
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.ivu-page-self {
  float: right;
  padding-right: 20px;
  margin-top: 10px;
}
.search-content {
  width: 100%;
  height: 57px;
  padding: 10px 24px;
  line-height: 37px;
  background-color: #3b3f4b;
  border: 1px solid #595f6f;
  border-bottom: 0;
}
/* 改menu*/
.ivu-menu-dark {
  background-color: #23262d;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
.ivu-row,
.ivu-col{
  height: 100%
}
.ivu-menu-vertical {
  height: 100%;
  overflow: auto;
}
.ivu-menu-dark.ivu-menu-vertical {
  .ivu-menu-submenu {
    .ivu-menu-item-active,
    .ivu-menu-item-active:hover {
      background-color: #23262d!important;
      color: #5aa1fb;
    }
  }
} 
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  background-color: #23262d;
}
.ivu-menu-submenu {
  background-color: #495060;
} 
.ivu-menu-item-selected {
  background-color: #494f5f;
}

//改table
.ivu-table {
  color: #fff;
  overflow: auto;
  &:before,
  &:after {
    background-color: #595f6f;  //表格边框颜色
  }
  th {
   background-color: #3b3f4b; 
  }
  .ivu-table-row {
    &:nth-child(odd) td {
      background-color: #252830;
    }
    &:nth-child(even) td {
      background-color: #3b3f4b;
    }
  }
}
.ivu-table-wrapper {
  border-color: #595f6f;
}
.ivu-table-border {
  td,
  th {
    border-color: #595f6f;
  }
}
.ivu-table-row-hover td,
.ivu-table-row-highlight td{
  background-color: #2d8cf0!important;
}
//改分页
.ivu-page,
.ivu-page-item-jump-next, 
.ivu-page-item-jump-prev, 
.ivu-page-next, 
.ivu-page-prev {
  color: #fff;
}
.ivu-page-item-active {
  color: #5aa1fb;
}
.ivu-page-next, 
.ivu-page-prev,
.ivu-page-item {
  background-color: transparent;
}
.ivu-page-options-elevator input{
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  text-align: center;
}
.ivu-page-item-active {
  &:hover a,
  a {
    color: #5aa1fb;
  }
}
</style>

<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-nav">
          <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
              Item 1
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
              Item 2
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
              Item 3
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
              Item 4
          </MenuItem>
      </div>
    </Menu>
    <div class="layout-content" :style="{height:contentHeight}">
      <Row>
        <Col span="5">
            <Menu active-name="1-1" width="auto" :open-names="['1']" theme="dark" accordion>
              <Submenu name="1">
                <template slot="title">
                  <Icon type="monitor"></Icon>
                    Item 1
                </template>
                <MenuItem name="1-1">Option 1</MenuItem>
                <MenuItem name="1-2">Option 2</MenuItem>
                <MenuItem name="1-3">Option 3</MenuItem>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                    <Icon type="monitor"></Icon>
                    Item 2
                </template>
                <MenuItem name="2-1">Option 1</MenuItem>
                <MenuItem name="2-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="monitor"></Icon>
                  Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="monitor"></Icon>
                  Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="monitor"></Icon>
                  Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="monitor"></Icon>
                  Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="monitor"></Icon>
                  Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="monitor"></Icon>
                  Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
            </Menu>
        </Col>
        <Col span="19">
            <div class="layout-content-main" :style="{maxHeight:contentHeight,height:contentHeight}">
              <div style="width: 100%;float:left;">
                <div class="search-content">表格一</div>
                <template>
                  <Table class="ivu-menu-dark" 
                    border 
                    highlight-row
                    :height="tableHeight2" 
                    :columns="columns1" 
                    :data="data2">
                  </Table>
                  <Page theme="dark" class-name="ivu-page-self" size="small" :total="40" show-elevator show-total></Page>
                </template>
              </div>
              <!--div style="width: 40%;height:100%;padding-left:35px;position:absolute;top:12px;right:20px">
                <template>
                  <Form :model="formTop" label-position="top">
                    <FormItem label="Title">
                      <Input v-model="formTop.input1"></Input>
                    </FormItem>
                    <FormItem label="Title name">
                      <Input v-model="formTop.input2"></Input>
                    </FormItem>
                    <FormItem label="Aligned title">
                      <Input v-model="formTop.input3"></Input>
                    </FormItem>
                  </Form>
                </template>
              </div-->
            </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {
      contentHeight: '',
      tableHeight: '',
      tableHeight2: 0,
      formTop: {
        input1: '',
        input2: '',
        input3: ''
      },
      columns1: [{
        title: 'Name',
        key: 'name'
      }, {
        title: 'Age',
        key: 'age'
      }, {
        title: 'Address',
        key: 'address'
      }],
      data2: [{
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
      }, {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      }, {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      }, {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      }, {
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
      }, {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      }, {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      }, {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      }, {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      }, {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      }, {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      }, {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      }, {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      }, {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      }, {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      }, {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      }, {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      }, {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      }, {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      }, {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      }]
    }
  },
  mounted () {
    this.$nextTick (() => {
      var height = document.body.clientHeight;
      this.contentHeight = height - 60 + 'px';
      this.tableHeight = height - 60  - 12 - 57 - 60+ 'px';
      this.tableHeight2 = height - 60 - 12 - 57 - 60;
    })
  },
  methods: {
  }
}
</script>
