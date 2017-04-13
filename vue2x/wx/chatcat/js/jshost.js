// iOS does not has window.JSHost
if (!window.JSHost) {
  window.JSHost = {
    callApp: function(cmd, data) {
      var param = {
        cmd: cmd,
        data: data
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.JSHost.postMessage(param);
      } else {
        console.log('No JSHost for:'+JSON.stringify(param));
      }
    },
    share: function(key) {
      window.JSHost.callApp('share', {key: key})
    },
    toast: function(msg) {
      window.JSHost.callApp('toast', {msg: msg});
    },
    invite: function(code) {
      window.JSHost.callApp('invite', {code: code});
    }
  }
} else {  // Android has window.JSHost
  window.JSHost.share = function(key) {
    try {
      key += '';
      window.JSHost.share_native(key);
    } catch (e) {
      console.log('no JSHost for share');
    }
  },
  window.JSHost.toast = function(msg) {
    try {
      window.JSHost.toast_native(msg);
    } catch (e) {
      console.log('no JSHost for toast');
    }
  },
  window.JSHost.invite = function(code) {
    try {
      window.JSHost.invite_native(code);
    } catch (e) {
      console.log('no JSHost for invite');
    }
  }
}
