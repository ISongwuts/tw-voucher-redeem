abstract class Transaction {
  constructor(phoneNumber: string, codeNumber: string) {}
  abstract redeem(): Promise<any>;
}
class TWTransaction extends Transaction {
  private phoneNumber: string;
  private voucherURL: string;

  public constructor(phoneNumber: string, voucherURL: string) {
    super(phoneNumber, voucherURL);
    this.phoneNumber = phoneNumber;
    this.voucherURL = voucherURL;
  }
  public async redeem(): Promise<any> {
    try {
      const urlParams: URLSearchParams = new URLSearchParams(this.voucherURL.split("?")[1]);
      const redeemCode: string | null = urlParams.get("v");
      const baseUrl: string = `https://gift.truemoney.com/campaign/vouchers/${redeemCode}/redeem`;

      const response:Response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: this.phoneNumber }),
      });

      if(response.ok) return "Redeem Successfully please check your truemoney wallet.";
      else{
        const { status } = await response.json();
        return status
      }

    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

async function main() {
  const t = new TWTransaction(
    "0612057144",
    "https://gift.truemoney.com/campaign/?v=662fe462daf74b14b001fd65ad006161643"
  );
  const response = await t.redeem();
  console.log(response);
}

main()