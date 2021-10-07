'use strict';
// /**
// * @param {dw.web.HttpParameterMap} httpParameterMap .
// */
var ISML = require('dw/template/ISML');
var guard = require('~/cartridge/scripts/guard');
var parameterMap = require('dw/web/HttpParameterMap');
var customObjectMgr = require('dw/object/CustomObjectMgr');
var trans = require('dw/system/Transaction');
function saveMail() {
    var mail = request.httpParameterMap.source.value;
    trans.wrap(function () {
        customObjectMgr.createCustomObject('footerEmailSubscribe', mail);
    });
    var response = customObjectMgr.getCustomObject('footerEmailSubscribe',mail);
    if(response!=null){
        let r = require('~/cartridge/scripts/util/Response');
        r.renderJSON({
              status: 'success'
        })
    }else{
        r.renderJSON({
            status: 'fail'
      })
    }
}
exports.SaveMail = guard.ensure(['get'], saveMail);
