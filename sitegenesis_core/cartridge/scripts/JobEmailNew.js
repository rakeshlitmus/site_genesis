'use strict';
importPackage(dw.io);
importPackage(dw.catalog);
importPackage(dw.system);

var file = require('dw/io/File');
var customObjectMgr = require('dw/object/CustomObjectMgr');
var csvWrite = require('dw/io/CSVStreamWriter');
var fileWrite = require('dw/io/FileWriter');
function execute() {
    var fileLocation = new File(File.IMPEX + File.SEPARATOR + 'src/Subscriptions' + File.SEPARATOR + 'EmailSubscription.csv');
    // var updateFile = 'https://zzum-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.servlet/webdav/Sites/Impex/src/Subscriptions/EmailSubscription.csv';
    var count = 1;
    var mailList = customObjectMgr.getAllCustomObjects('footerEmailSubscribe');
    var csvWriter = new CSVStreamWriter(new FileWriter(fileLocation));
    csvWriter.writeNext(['Number', 'Email', 'UUID']);
    while (mailList.hasNext()) {
       var temp= mailList.next();
        csvWriter.writeNext([count,temp.custom.footerEmailSubscribeUUID, temp.UUID]);
        count++;
        if(mailList.count <= count){
            break;
        }
    }
    csvWriter.close();
}
module.exports = {
    execute: execute
};