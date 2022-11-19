var assert = require('assert');
const lib = require("../lib");

describe('Single Instance sign and verify', function () {
    it('Signing and verifying with one random wallet', async function () {
        const wallet = lib.wallet();
        const randomMessage = {
            text:"Hello "+new Date().getTime(),
            number:Math.random() 
        }
        let signature = await wallet.tydids.signMessage(randomMessage);
        let verify = wallet.tydids.verifyMessage(randomMessage,signature);
        assert.equal(verify,wallet.address);
    });
    it('Signing and verifying with two random wallets', async function () {
        const wallet1 = lib.wallet();
        const wallet2 = lib.wallet();

        const randomMessage = {
            text:"Hello "+new Date().getTime(),
            number:Math.random() 
        }
        let signature = await wallet1.tydids.signMessage(randomMessage);
        let verify = wallet2.tydids.verifyMessage(randomMessage,signature);
        assert.equal(verify,wallet1.address);
        assert.notEqual(verify,wallet2.address);
    });
    it('Signing and verifying with modified message', async function () {
        const wallet1 = lib.wallet();
        const wallet2 = lib.wallet();

        const randomMessage = {
            text:"Hello "+new Date().getTime(),
            number:Math.random() 
        }
        let signature = await wallet1.tydids.signMessage(randomMessage);
        let verify = wallet2.tydids.verifyMessage({
            text:"Hello "+new Date().getTime(),
            number:Math.random() 
        },signature);
        assert.notEqual(verify,wallet1.address);
    });
});
