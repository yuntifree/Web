var dataCh = {
  star: {
    img: './images/badge/badge_star.png',
    title: '星级徽章',
    level: 3,
    desc: '共分五个等级，等级越高，个人综合信用越高，一星用户新手用户，处于最初级的社交阶段，可以通过完善资料，上传真实头像，快速升级为二星用户，每天上线，积极与附近的朋友聊天，可以快速升级为三星用户，踊跃发动态与帖子，可以快速升级为四星用户，主动参与群聊和发帖互动，可以快速升级为五星用户'
  },
  charm: {
    img: './images/badge/badge_charm.png',
    title: '魅力徽章',
    level: 2,
    desc: '用户的魅力徽章是根据用户被打招呼的数量来评定用户的魅力值，被打招呼的数量越高，魅力等级就越高。魅力徽章会展示在个人主页，等级越高徽章的颜色越耀眼，吸引更多人的关注'
  },
  cramer: {
    img: './images/badge/badge_cramer.png',
    title: '自拍达人',
    desc: '用户发送超过十条带自拍照的动态，就可以点亮这个徽章。拥有自拍达人的徽章，可以让自己的主页更加个性炫酷。'
  },
  chat: {
    img: './images/badge/badge_chat.png',
    title: '聊天达人',
    desc: '经常和朋友聊天可以点亮聊天达人的徽章，如果长时间不与朋友聊天交流，将失去这个徽章，拥有这个徽章，是受欢迎用户的标志'
  }
}

var dataThai = {
  star: {
    img: './images/badge/badge_star.png',
    title: 'ตราดาว',
    level: 3,
    desc: 'จะแบ่งออกเป็นห้าดาว ดาวยิ่งสูง ความเชื่อถือโดยรวมของผู้ใช้ก็ยิ่งสูง  ผู้ใช้1ดาว อยู่ในช่วงขั้นต้น สามารถอัพถึงผู้ใช้2ดาวโดยเขียนข้อมูลส่วนตัวอย่างรอบคอบและอัพโหลดรูปภาพส่วนตัวจริง ถ้าออนไลน์ทุกวัน แชทกับคนใกล้เคียงบ่อยๆจะสามารถอัพถึงผู้ใช้3ดาวอย่างรวดเร็ว โพสต์โมเม้นต์และกระทู้บ่อยๆสามารถอัพถึงผู้ใช้4ดาวอย่างรวดเร็ว  เข้าร่วมหรือสร้างสนทนากลุ่มอย่างสามารถอัพถึงผู้ใช้5ดาวอย่างรวดเร็ว'
  },
  charm: {
    img: './images/badge/badge_charm.png',
    title: 'ตรา เสน่ห์',
    level: 2,
    desc: 'การประเมินคะแนนเสน่ห์นี้จะตามจำนวนที่ถูกทักทาย จำนวนที่ถูกทักทายยิ่งเยอะ ระดับเสน่หก็ยิ่งสูง ตรา เสน่ห์จะโชว์ที่หน้าโปรไฟล์ ระดับยิ่งสูง สีตราก็ยิ่งพราว ดึงดูดคนสนใจมากขึ้นได้'
  },
  cramer: {
    img: './images/badge/badge_cramer.png',
    title: 'คนช่างถ่ายรูปตัวเอง',
    desc: 'ผู้ใช้โพสต์โมเม้นต์ที่แนบรูปภาพส่วนตัวี่ี่เกิน10โมเม้นต์สามารถให้ตราคนส่งมากกว่าสิบโมเม้นต์สามารถให้ตราคนช่างถ่ายรูปตัวเองสว่างได้ มีตราคนช่างถ่ายรูปตัวเองสามารถให้โปรไลน์ตัวเองเท่มาก'
  },
  chat: {
    img: './images/badge/badge_chat.png',
    title: 'คนช่างแชท',
    desc: 'แชทกับเพื่อนบ่อยๆสามารถให้ตราคนช่างแชทสว่างได้ ถ้าไม่แชทคุยกับเพื่อนตั้งนาน จะสูญเสียตรานี้  มีตราคนช่างแชทเป็นสัญลักษณ์ได้รับความนิยมของผู้ใช้'
  }
}
var dataEn= {
  star:{
    img: './images/badge/badge_star.png',
    title: 'Star Badge',
    level: 3,
    desc: 'There are five levels (1 to 5 ), more the level, more the credit of the user. One star is the newest user, which can upgrade to the two star through the improvement of information. On line everyday and chatting with friends nearby actively will help you upgrade to the three star. Posting moments and topics frequently send moment and post will help you upgrade to the four star. Participating or creating group chat and post interaction will help you upgrade to the five star.'
  },
  charm: {
    img: './images/badge/badge_charm.png',
    title: 'Charm Badge',
    level: 3,
    desc: 'The user’s charm badge is based on the number of “be said hi”of users , the higher the number of “be said hi”, the higher the charm level. Charm badge will be showed on the home page, the higher the level ,the more glaring color of the badge , which can make your profile page attract more people’s attention too'
  },
  cramer: {
    img: './images/badge/badge_cramer.png',
    title: 'Selfie Master',
    desc: 'The users who post more than 10 moments with selfie can lighten this badge. Having this badge will make your profile page more special and cool'
  },
  chat: {
    img: './images/badge/badge_chat.png',
    title: 'Chat Master',
    desc: 'Chatting with friends frequently can lighten the “Chat Master” badge, If you do not chat with friends for a long time, you will lose this badge. Having this badge is a sign of popular users.'
  }
}



window.dataCh = dataCh;
window.dataEn = dataEn;
window.dataThai = dataThai;
