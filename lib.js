const { ethers } = require("ethers");

exports.wallet = function(privateKey , provider) {
    const isObject = function(payload) { if(Object.prototype.toString.call(payload).indexOf('Object') !== -1) return true; else return false; }
    
    let wallet = null;

    if(isObject(privateKey)) {
        wallet = privateKey;
    } else {

        if((typeof provider == 'undefined')||(provider == null)) {
            provider = new ethers.providers.JsonRpcProvider("https://rpc.tydids.com/");
        }
        
        
        if((typeof privateKey == 'undefined') || (privateKey == null)) {
            wallet = ethers.Wallet.createRandom();
            privateKey = wallet.privateKey;
        } 
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
            if((typeof signature == 'undefined')||(signature == null)) {
                signature = ""+payload.signature;
                delete payload.signature;
            }
            payload = JSON.stringify(payload);
        }
        return ethers.utils.verifyMessage(payload,signature);
    } 
    wallet.tydids.issuer = wallet.tydids.verifyMessage;

    wallet.tydids.hashMessage = function(payload) {
        if(isObject(payload)) {
            payload = JSON.stringify(payload);
        }
        return ethers.utils.hashMessage(payload); 
    }

    wallet.tydids.deployment = require("./ABIS");
    wallet.tydids.contracts = {};
    wallet.tydids.contracts.GHGTOKEN = new ethers.Contract('0xFBe3428A58DAF225D84Ccf2a7A87892d53CC1b88', wallet.tydids.deployment.ABIS.GHGTOKEN, wallet);
    wallet.tydids.contracts.GHGSAVINGS = new ethers.Contract('0x3DB8AdC77cc25791cE3860DFa3630c9116FA1A96', wallet.tydids.deployment.ABIS.GHG20, wallet);
    wallet.tydids.contracts.GHGEMISSIONS = new ethers.Contract('0x68c2046c5dA08B140A509afCbA6f4C715e807d28', wallet.tydids.deployment.ABIS.GHG20, wallet);
    wallet.tydids.contracts.GHGCERTIFICATES = new ethers.Contract('0xf0D4F76638b78cFB7d1CfFcFa2C8D9496f1B5DE4', wallet.tydids.deployment.ABIS.GHG721, wallet);
 
    return wallet;
}
