"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
test("Transaction works properly.", async () => {
    const t = new index_1.default("0612057144", "https://gift.truemoney.com/campaign/voucher_detail?v=662fe462daf74b14b001fd65ad006161643");
    const response = await t.redeem();
    const data = await response.json();
    expect(typeof data).toBe("object");
});
