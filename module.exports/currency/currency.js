class Currency {
  constructor(canadianDollar) {
    this.canadianDollar = canadianDollar;
  }
  roundTwo(amount) {
    return Math.round(amount * 100) / 100;
  }
  canadianToUS(canadian) {
    return this.roundTwo(canadian * this.canadianDollar);
  }
  USToCanadian(us) {
    return this.roundTwo(us / this.canadianDollar);
  }
}
// 返回的是一个构造函数，这是面向对象编程的实现
module.exports = Currency;