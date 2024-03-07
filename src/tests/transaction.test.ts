import TWTransaction from "../index";

test("Transaction works properly.", async () => {
  const phoneNumber = process.env.PHONENUMBER || 'Your phone number.'
  const t = new TWTransaction(
    phoneNumber,
    "https://gift.truemoney.com/campaign/voucher_detail?v=662fe462daf74b14b001fd65ad006161643"
  );
  const response = await t.redeem();
  const data = await response.json();
  expect(typeof data).toBe("object");
});
