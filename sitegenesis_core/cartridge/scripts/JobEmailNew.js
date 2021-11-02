'use strict';
importPackage(dw.io);
importPackage(dw.catalog);
importPackage(dw.system);

var file = require('dw/io/File');
var customObjectMgr = require('dw/object/CustomObjectMgr');
var csvWrite = require('dw/io/CSVStreamWriter');
var fileWrite = require('dw/io/FileWriter');
var PromotionMgr = require('dw/campaign/PromotionMgr');

function execute() {
    var fileLocation = new File(File.IMPEX + File.SEPARATOR + 'src/Subscriptions' + File.SEPARATOR + 'EmailSubscription.csv');
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

function promotions(){
    var promos = PromotionMgr.getPromotions();
    var promoIter = promos.iterator();
    while (promoIter.hasNext()) {
     promoItem = promoIter.next();
    }
}

function removeCustomObject(){
    var mailObj = customObjectMgr.getAllCustomObjects('footerEmailSubscribe');
    while (mailObj.hasNext()) {
        customObjectMgr.remove(mailObj.next());
    }
}



module.exports = {
    execute: execute
};

module.exports = {
    promotions: promotions
};

module.exports = {
    removeCustomObject: removeCustomObject
};
// exports.promotions = promotions;