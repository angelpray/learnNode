/* 改进：
    回调层数越多，代码看起来越乱，重构和测试起来也越困难，所以最好限制一下回调的嵌套层级
  改进方法：
    如果把每一层回调嵌套的处理做成命名函数，虽然表示相同逻辑所用的代码变多了，
    但维护、测试和重构起来会更容易。
*/
// 创建中间函数以减少嵌套
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  getTitle(res);
}).listen(8000, () => { console.log('127.0.0.1'); });

function getTitle(res) {
  fs.readFile('./titles.json', (err, data) => {
    if (err) {
      hadError();
    } else {
      getTemplate(JSON.parse(data.toString()), res);
    }
  });
}

function getTemplate(titles, res) {
  fs.readFile('./template.html', (err, data) => {
    if (err) {
      hadError();
    } else {
      formatHtml(titles, data.toString(), res);
    }
  });
}

function formatHtml(titles, tmpl, res) {
  const html = tmpl.replace('%', titles.join('</li><li>'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}

function hadError() {
  console.error(err);
  res.end('server error');
}
