// currency是一个目录
const Currency = require('./currency');

const canadianDollar = 0.91;
const currency = new Currency(canadianDollar);
console.log('美元转加拿大元', currency.USToCanadian(10));
console.log('加拿大元转美元', currency.canadianToUS(100));