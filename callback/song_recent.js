/* 实现：
  异步获取存放在JSON文件中的文章的标题；
  异步获取简单的HTML模板；
  把那些标题组装到HTML页面里；
  把HTML页面发送给用户。
*/

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('./titles.json', (err, data) => {
      if (err) {
        console.error(err);
        res.end('Server Error');
      } else {
        // JSON.parse解析**JSON字符串**，titles解析成一个JavaScript数组
        // data是一个buff，需要转成JSON字符串
        const titles = JSON.parse(data.toString());
        fs.readFile('./template.html', (err, data) => {
          if (err) {
            console.error(err);
            res.end('Server Error');
          } else {
            const tmpl = data.toString();
            const html = tmpl.replace('%', titles.join('</li><li>'));
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(html);
          }
        });
      }
    });
  }
}).listen(8000, () => { console.log('127.0.0.1'); });