const lib = require("./lib");
const { ethers } = require("ethers");



const app = async function() {
    const wallet = lib.wallet();
    console.log(wallet.privateKey);
    let signature = await wallet.tydids.signMessage({test:"TATE"});
    console.log(wallet.address);
    console.log(signature);
    const verify = wallet.tydids.verifyMessage({test:"TATE"},signature);
    console.log(verify);
    console.log(wallet.tydids.hashMessage("TEST"));
    console.log("ND.");
}

app();