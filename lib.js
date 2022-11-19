const { ethers } = require("ethers");

exports.wallet = function(privateKey , provider) {
    const isObject = function(payload) { if(Object.prototype.toString.call(payload).indexOf('Object') !== -1) return true; else return false; }

    let wallet = null;
    if((typeof privateKey == 'undefined') || (privateKey == null)) {
        wallet = ethers.Wallet.createRandom();
    } else {
        wallet =  new ethers.Wallet( privateKey , provider );
    }
    
    // Overwrite and Extend standard ethers JS implementation;
    wallet.tydids = {};

    wallet.tydids.signMessage = async function(payload) {
        if(isObject(payload)) {
            payload = JSON.stringify(payload);
        }
        return await wallet.signMessage(payload);
    }

    wallet.tydids.verifyMessage = function(payload,signature) {
        if(isObject(payload)) {
            payload = JSON.stringify(payload);
        }
        return ethers.utils.verifyMessage(payload,signature);
    } 

    wallet.tydids.hashMessage = function(payload) {
        if(isObject(payload)) {
            payload = JSON.stringify(payload);
        }
        return ethers.utils.hashMessage(payload); 
    }

    return wallet;
}
