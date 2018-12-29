const redis = require('redis');
// 创建redis客户端实例
const db = redis.createClient();
class Entry {
  static getRange(from, to, cb) {
    // 用于获取消息记录
    db.lrange('entries', from, to, (err, items) => {
      if (err) return cb(err);
      let entries = [];
      items.forEach((item) => {
        // 解码之前保存为JSON的消息记录
        entries.push(JSON.parse(item));
      });
    });
  }
  constructor(obj) {
    // 循环遍历传入对象汇总的键
    for (let key in obj) {
      // 合并值
      this[key] = obj[key];
    }
  }
  save(cb) {
    // 将保存的消息转换成JSON字符串
    const entryJSON = JSON.stringify(this);
    // 将JSON字符串保存到Redis列表中
    db.lpush(
      'entries',
      entryJSON,
      (err) => {
        if (err) return cb(err);
        cb();
      }
    );
  }
}

module.exports = Entry;