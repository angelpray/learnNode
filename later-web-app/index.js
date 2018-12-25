const express = require('express');
const bodyParser = require('body-parser');
const {Article} = require('./db');
const read = require('node-readability');

const app = express();

// 设置端口号
app.set('port', process.env.PORT || 3000);

// 支持JSON的请求体
app.use(bodyParser.json());
// 支持编码为表单的请求消息体
app.use(bodyParser.urlencoded({
  extended: true
}));
// 响应静态文件请求
app.use(
  '/css/bootstrap.css',
  express.static("node_modules/_bootstrap@4.2.1@bootstrap/dist/css/bootstrap.css")
);
// 1.获取所有文章,HTTP路由处理器向模型发出一个的调用
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.format({
      html: () => {
        res.render('articles.ejs', {articles});
      },
      json: () => {
        res.send(articles);
      }
    });
  });
});
// 2.创建一篇文章
app.post('/articles', (req, res, next) => {
  const {url} = req.body;
  read(url, (err, result) => {
    if (err || !result) res.status(500).send('Error downloading article');
    Article.create(
      {title: result.title, content: result.content},
      (err, article) => {
        if (err) return next(err);
        res.send('OK');
      }
    );
  });
});
// 3.获取指定的文章
app.get('/articles/:id', (req, res, next) => {
  const {id} = req.params;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.format({
      html: () => {
        res.render('article.ejs', {article});
      },
      json: () => {
        res.send(article);
      }
    });
  });
});
// 4.删除指定文章
app.delete('/articles/:id', (req, res, next) => {
  const {id} = req.params;
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.send({
      message: 'Delete'
    });
  });
});
// 监听
app.listen(app.get('port'), () => {
  console.log('APP started on port', app.get('port'));
});
// 导出
module.exports = app;