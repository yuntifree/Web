var express = require('express');
var agent = require('superagent');
var router = express.Router();
var HOST = 'http://120.76.236.185:9898/'

// post transformer
router.post('/*', function(req, res, next) {
    var action = req.params[0];
    var ServerCookie = req.headers.cookie;
    agent.post(HOST+action)
        .type('application/json')
        .send(req.body)
        .set('Cookie', ServerCookie)
        .end(function(err, res1) {
            if (err || !res1.ok) {
                var resp = makeResp(res1.status, 'error: '+res1.status, {});
                res.jsonp(resp);
            } else {
                res.send(res1.text);
            }
        });
});


function makeResp(errno, desc, data) {
    return {
        errno: errno,
        desc: desc,
        data: data
    }
}

module.exports = router;