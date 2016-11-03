# voss

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm test
```

## Notice

static: 代码中引用的静态资源，使用路径'/static/images/xxx.png'

src/assets: 模板中使用的路径，如：background-url('../assets/images/xxx.png')
src/main.js: App入口
src/store.js：全局数据存储

##Deploy
cgi.js: HOST, 配置后台服务器地址
