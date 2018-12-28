const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// 用于node.js的HTTP请求记录器中间件
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// 提供默认的favicon
const favicon = require('serve-favicon');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 输出有颜色区分的日志，便于开发调试
app.use(logger('dev'));
// 解析json请求主体
app.use(express.json());
// 解析表单请求主体
// extended允许选择使用查询字符串库（如果为false）或qs库（如果为true）解析URL编码数据
app.use(express.urlencoded({ extended: false }));
// 解析Cookie头
app.use(cookieParser());
// 提供./public下的静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 指定程序路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 捕获404并转发给错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 错误处理程序：在开发时显示样式化的HTML错误显示页面
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // 设置局部变量，只提供开发中的错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // 呈现错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
