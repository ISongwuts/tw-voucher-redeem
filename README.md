#tw-voucher-redeem
่Just a automatically redeem wallets for <i>truemoney wallet</i>

##Introduction
this side project made for fun cuz im bored :(
Nvm, Please skip this introduction and...
credit to me!! UwU

##Installation

```
npm install -s tw-voucher-redeem
```

##Usage

```typescript
async function main() {
    /*
    TWTransaction constructor: 
        phoneNunber: string
        voucherURL: string
        * you can pass only code or url in voucherURL parameter. *
    */
  const t = new TWTransaction(
    "0612057144",
    "https://gift.truemoney.com/campaign/voucher_detail?v=662fe462daf74b14b001fd65ad006161643"
  );
  const response = await t.redeem();
  const data = await response.json();
  console.log(data); //object of transaction
}
```

###Support me :)
[Follow me!, I want connection hehehehehe]('https://github.com/ISongwuts')

###Credit to
`@ISongwuts`