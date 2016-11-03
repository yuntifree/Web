<template>
  <div id="container">
    <button id="selectfiles" class='btn btn-info pull-left right10'>选择文件</button>
    <label class="sex-margin" v-if="labelshow">
      <input type="radio" class="radio-sex sex-outline" :value="1" v-model="imgtype">图片</label>
    <label class="sex-margin" v-if="labelshow">
      <input type="radio" class="radio-sex sex-outline" :value="0" v-model="imgtype">banner</label>
    <button id="postfiles" class='btn btn-info pull-left right10' :disabled="filename == ''">开始上传</button>
    <span id="ossfile"></span>
  </div>
</template>
<script>
import CGI from '../../lib/cgi.js'

var uploadName = '';

export default {
  data() {
    return {
      filename: ''
    }
  },
  props: {
    labelshow: Boolean
  },
  events: {
    'modal-close': function() {
      document.getElementById('ossfile').innerHTML = '';
      this.filename = '';
      uploadName = '';
    }
  },
  ready() {
    var self = this;
    CGI.loadScript(/*__CDN__*/'http://yuntifile.oss-cn-shenzhen.aliyuncs.com' + '/js/plupload.2.1.2.min.js', 'uploadjs', () => {
      var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'selectfiles',
        multi_selection: false,
        container: document.getElementById('container'),
        flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
        url: 'http://oss.aliyuncs.com',
        init: {
          PostInit() {
            document.getElementById('postfiles').onclick = function() {
              // 这里偷懒少了超时逻辑，必要的时候补回来
              CGI.post(self.$store.state, 'get_oss_image_policy', {
                // debug: 1,
                format: get_suffix(self.filename)
              }, (resp) => {
                if (resp.errno === 0) {
                  var obj = resp.data;
                  uploadName = obj['dir'] + obj['name'];
                  var new_multipart_params = {
                    'key': uploadName,
                    'policy': obj['policy'],
                    'OSSAccessKeyId': obj['accessid'],
                    'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                    'callback': obj['callback'],
                    'signature': obj['signature'],
                  };
                  uploader.setOption({
                    'url': obj['host'],
                    'multipart_params': new_multipart_params
                  });
                  uploader.start();
                }
              })
              return false;
            };
          },

          FilesAdded(up, files) {
            plupload.each(files, function(file) {
              document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div  class="progress-bar progress-bar-info progress-bar-striped" style="width: 0%"></div></div>' + '</div>';
              self.filename = file.name;
            });
          },

          UploadProgress(up, file) {
            this.prog = true;
            var d = document.getElementById(file.id);
            d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            var prog = d.getElementsByTagName('div')[0];
            var progBar = prog.getElementsByTagName('div')[0]
            progBar.style.width = 2 * file.percent + 'px';
            progBar.setAttribute('aria-valuenow', file.percent);
          },

          FileUploaded(up, file, info) {
            if (info.status == 200) {
              document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '完成';
              self.$dispatch('upload-done', 'http://images.youcaitv.cn/' + uploadName);
              //self.imageurl = __CDN__+'/'+uploadName;
            } else {
              document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
            }
          },
          Error(up, err) {
            document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
          }
        }
      });
      uploader.init();
    })
  }
}

function get_suffix(filename) {
  var pos = filename.lastIndexOf('.')
  var suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos + 1)
  }
  return suffix;
}
</script>
<style>
#container {
  /* padding: 0 15px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.right10 {
  margin-right: 10px;
}

.progress {
  margin-bottom: 0;
  height: 14px;
  width: 200px;
}

#ossfile {
  height: auto;
  padding: 10px;
  background-color: #fff;
}
</style>
