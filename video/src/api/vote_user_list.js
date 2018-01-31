var raw
try {
  raw = JSON.parse(
  '{"code":200,"msg":"\u83b7\u53d6\u6570\u636e\u6210\u529f1","data":[{"id":16215,"no":"94","user_id":16215,"vote_count":"33","name":"\u5434\u6587\u6770-\u5954\u8dd1","image":"http:\/\/imgv.xldlive.com\/FnZ7njYeIdwmjLl3RZVqvETEJqt8?imageView2\/2\/w\/520","ranking":null},{"id":16297,"no":"64","user_id":16297,"vote_count":"26","name":"\u4efb\u6089\u7eee-\u8bed\u8a00 \u64ad\u97f3\u4e3b\u6301","image":"http:\/\/imgv.xldlive.com\/Ftbcpf8lblwZxl8SaDTiotNFWVbV?imageView2\/2\/w\/520","ranking":null},{"id":16301,"no":"48","user_id":16301,"vote_count":"20","name":"\u7d97\u5929\u60c5-\u8bed\u8a00  \u64ad\u97f3\u4e3b\u6301","image":"http:\/\/imgv.xldlive.com\/Fgkpqsec_jKxS_m5j8yN-bSnGw7b?imageView2\/2\/w\/520","ranking":null},{"id":16293,"no":"39","user_id":16293,"vote_count":"13","name":"\u5218\u61ff\u8431-\u8bed\u8a00 \u64ad\u97f3\u4e3b\u6301","image":"http:\/\/imgv.xldlive.com\/FtFIeEvAV9_PRkdm0STOEkt2ssOs?imageView2\/2\/w\/520","ranking":null},{"id":16207,"no":"21","user_id":16207,"vote_count":"6","name":"\u674e\u99a8\u7476-\u6625\u82d7","image":"http:\/\/imgv.xldlive.com\/FjSQQgBEt_4usj3BDVjewXAT3Oun?imageView2\/2\/w\/520","ranking":null},{"id":16275,"no":"84","user_id":16275,"vote_count":"3","name":"\u91d1\u5e78\u5c14-\u94a2\u7434\u72ec\u594f\u300a\u7267\u6c11\u6b4c\u5531\u6bdb\u4e3b\u5e2d\u300b","image":"http:\/\/imgv.xldlive.com\/FopAXpspsxhjJlTSuvuRC3LYQATY?imageView2\/2\/w\/520","ranking":null},{"id":16250,"no":"75","user_id":16250,"vote_count":"3","name":"\u8303\u827a\u96ef-\u7267\u6b4c","image":"http:\/\/imgv.xldlive.com\/FvzZawC9Oew-D1DY7eZRzeGCwXYo?imageView2\/2\/w\/520","ranking":null},{"id":16251,"no":"76","user_id":16251,"vote_count":"2","name":"\u6c88\u82b7\u5349-\u5c0f\u6b65\u821e\u66f2","image":"http:\/\/imgv.xldlive.com\/Fr5oOGR9QJSGLsO-nr1NCWS_-x8v?imageView2\/2\/w\/520","ranking":null},{"id":16243,"no":"33","user_id":16243,"vote_count":"2","name":"\u9646\u7814-\u7eba\u7ec7\u5fd9","image":"http:\/\/imgv.xldlive.com\/FitiEJQEtg_1wQkCDjHg2XVTgYay?imageView2\/2\/w\/520","ranking":null},{"id":16213,"no":"08","user_id":16213,"vote_count":"2","name":"\u6a0a\u6668-This is love","image":"http:\/\/imgv.xldlive.com\/Ft1RbALhcqD9YozNiMBV3LKUCJ22?imageView2\/2\/w\/520","ranking":null},{"id":16299,"no":"60","user_id":16299,"vote_count":"1","name":"\u6c88\u4e50\u8a00-\u8bed\u8a00  \u64ad\u97f3\u4e3b\u6301","image":"http:\/\/imgv.xldlive.com\/FhroD5nQqPFAQ6FgXqIxHm47YEi_?imageView2\/2\/w\/520","ranking":null},{"id":16258,"no":"83","user_id":16258,"vote_count":"1","name":"\u8ba1\u5f08\u665f-\u68a6\u4e2d\u7684\u5a5a\u793c","image":"http:\/\/imgv.xldlive.com\/Fhdph9gczS9YA1b-KKUri9FnMQXV?imageView2\/2\/w\/520","ranking":null},{"id":16214,"no":"93","user_id":16214,"vote_count":"1","name":"\u80e1\u591a\u827a-\u7956\u56fd\u7956\u56fd\u6211\u4eec\u7231\u4f60","image":"http:\/\/imgv.xldlive.com\/Fi3qGvJS6iwoAMO5X3eUjAXzX96-?imageView2\/2\/w\/520","ranking":null},{"id":16292,"no":"52","user_id":16292,"vote_count":"0","name":"\u5218\u4e50\u6600-\u8bed\u8a00 \u64ad\u97f3\u4e3b\u6301","image":"http:\/\/imgv.xldlive.com\/Fp58NmPDCmSnUA23yiE8J7N6Pa6K?imageView2\/2\/w\/520","ranking":null},{"id":16286,"no":"53","user_id":16286,"vote_count":"0","name":"\u5085\u6208\u97f5- \u8bed\u8a00 \u64ad\u97f3\u4e3b\u6301","image":"http:\/\/imgv.xldlive.com\/Ft2bUNoJmZkj8psMY18N7Le2PDgd?imageView2\/2\/w\/520","ranking":null},{"id":16232,"no":"13","user_id":16232,"vote_count":"0","name":"\u5f20\u5b87\u6052-It\'s my life","image":"http:\/\/imgv.xldlive.com\/FkjRcg5ZMliFt8TdK-h5thDgZ13W?imageView2\/2\/w\/520","ranking":"0"}]}'
  )
} catch(e) {
  console.log('Json parse error!')
}
function hereDoc(f) {　
  return f.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '')
}
module.exports = {
  data: raw.data,
  rule: {
    start: '2017-12-31 18:00:00',
    end: '2018-01-07 18:00:00',
    content: hereDoc(function() { /*
【活动介绍】<br>
“中华童星”全国青少年艺术人才选拔大赛，由中国文化管理协会和中国大众音乐协会和东方文化艺术研究院主办，中华童星文化艺术活动上海组委会协办。<br>
【投票时间】<br>
本次活动投票时间为2017年12月31日18:00——2018年1月18日18:00 <br>
【奖项设定】  <br>
本次活动分为现场评委打分和网络投票两条通道， 各为一套打分体系，互不影响，不做叠加 。<br>
１.评委打分：设置金奖、银奖、铜奖；金奖、银奖的获奖节目将取得总决赛邀请函。各类别分为幼儿组、儿童A组、儿童B组、少年A组、少年B组五组，按分组统筹， 不分节目类别，各组（仅限上面五组）得分第一名的五位选手的培训老师将获得优秀指导教师证书和五百元奖金；          <br>
２.网络投票奖（截止到2018年1月18号18:00，本次活动所有节目的网络投票将进行综合累计排名，所有网络投票票数和奖励均以节目为准，不计个人）<br>
1）网络投票排名第1的节目，将获得最佳表演奖，该节目选手成为2018年中华童星上海赛区形象代言人，并获得五千元现金奖励（个税自理）；<br>
2）  网络投票排名第2的节目，将获得最佳风采奖，并获得三千元现金奖励（个税自理）；<br>
3）网络投票排名第3的节目，将获得最佳荧屏奖，并获得一千元现金奖励（个税自理）;<br>
4）网络投票排名前10的节目将获得全国总决赛邀请函;<br>
注：获奖名单将在“中华童星”微信公众号公布，请扫描下方二维码并添加关注；<br>
【投票方法】<br>
1、  关注“顶播”或“中华童星”公众号，点击“关注现场”-“现场直播”进入投票通道；<br>
2、  搜索节目名称或序号，进入投票<br>
3、  转发邀请投票<br>
【投票方式】<br>
1、  每人每天可对任一选手赠送1朵鲜花，1朵鲜花代表一票；<br>
2、  每个参与者还可为自己喜欢的节目送礼物，购买礼物即兑换相应的票数，礼物分为3类：<br>
A.气球，15点/个=30票；<br>
B.话筒，40点/个=90票；<br>
C.皇冠，80点/个=200票；<br>
注：礼物购买不限次数与个数； <br>
【注意事项】<br>
投票活动以友好、和谐、丰富文化生活为宗旨。<br>
礼物价值有限，请不要恶意攀比，恶意竞争。<br>
严禁恶意刷票，一经核实将立即取消投票资格。<br>
本活动公平、公正、公开、欢迎监督，但对蓄意诽谤、破坏、干扰活动的诋毁造谣之言论及恶意行为，本公司将诉诸法律手段维护本次活动的合法权益，并严格追究法律责任。<br>
本次活动最终解释权归“中华童星文化艺术活动上海组委会”所有。
*/})
  }
}