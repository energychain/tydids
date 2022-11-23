const lib = require("./lib");
const { ethers } = require("ethers");

const app = async function() {
    const wallet = lib.wallet();
    const hash = '0x54476e19525abcebdbe3fd61c3eaa8399d7f449f37f786a188a190c3cb2786cf';
    let signature = await wallet.tydids.signMessage(hash);
    console.log('Signature',signature);
    console.log('Owner',wallet.address);
    console.log('Hash',hash);
    console.log(wallet.tydids.NFT.instance.owner());
}

app();