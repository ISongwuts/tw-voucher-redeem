abstract class Transaction {
  constructor(phoneNumber: string, codeNumber: string) {}
  abstract redeem(): Promise<any>;
}
export default class TWTransaction extends Transaction {
  private phoneNumber: string;
  private voucherURL: string;

  public constructor(phoneNumber: string, voucherURL: string) {
    super(phoneNumber, voucherURL);
    this.phoneNumber = phoneNumber;
    this.voucherURL = voucherURL;
  }

  public async redeem(): Promise<Response> {
    try {
      const redeemCode = this.getRedeemCode(this.voucherURL);
      const baseUrl: string = `https://gift.truemoney.com/campaign/vouchers/${redeemCode}/redeem`;
      const payload: string = JSON.stringify({ mobile: this.phoneNumber });
      const response: Response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  private getRedeemCode(s: string): string | null {
    if (this.URLChecker(s)) {
      const urlParams: URLSearchParams = new URLSearchParams(
        this.voucherURL.split("?")[1]
      );
      const url = urlParams.get("v");
      return url;
    }
    return s;
  }

  private URLChecker(s: string): boolean {
    const re = new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$"
    );
    console.log(re.test(s));
    if (re.test(s)) return true;
    return false;
  }
}

/*
-- TEST ZONE --
***************

async function main() {
    const phoneNumber = process.env.PHONENUMBER || 'Your phone number.'
    const t = new TWTransaction(
      phoneNumber,
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
