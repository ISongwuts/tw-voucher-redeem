"use strict";
class Transaction {
    constructor(phoneNumber, codeNumber) { }
}
class TWTransaction extends Transaction {
    constructor(phoneNumber, voucherURL) {
        super(phoneNumber, voucherURL);
        this.isURL = false;
        this.phoneNumber = phoneNumber;
        this.voucherURL = voucherURL;
    }
    async redeem() {
        try {
            const redeemCode = this.getRedeemCode(this.voucherURL);
            const baseUrl = `https://gift.truemoney.com/campaign/vouchers/${redeemCode}/redeem`;
            const payload = JSON.stringify({ mobile: this.phoneNumber });
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload,
            });
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
async function main() {
    const t = new TWTransaction("0612057144", "https://gift.truemoney.com/campaign/?v=662fe462daf74b14b001fd65ad006161643");
    const response = await t.redeem();
    console.log(response);
}
main();
