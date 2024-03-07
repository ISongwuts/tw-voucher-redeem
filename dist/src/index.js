"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(phoneNumber, codeNumber) { }
}
class TWTransaction extends Transaction {
    constructor(phoneNumber, voucherURL) {
        super(phoneNumber, voucherURL);
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
    getRedeemCode(s) {
        if (this.URLChecker(s)) {
            const urlParams = new URLSearchParams(this.voucherURL.split("?")[1]);
            const url = urlParams.get("v");
            return url;
        }
        return s;
    }
    URLChecker(s) {
        const re = new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$");
        console.log(re.test(s));
        if (re.test(s))
            return true;
        return false;
    }
}
exports.default = TWTransaction;
/*
-- TEST ZONE --
***************

async function main() {
  const t = new TWTransaction(
    "0612057144",
    "https://gift.truemoney.com/campaign/voucher_detail?v=662fe462daf74b14b001fd65ad006161643"
  );
  const response = await t.redeem();
  const data = await response.json();
  console.log(data);
}
main();

---------------
***************
*/ 
