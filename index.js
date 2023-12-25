const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const path = require('path');

const app = express();
const port = 8082;

const apiProxy = createProxyMiddleware('/api', {
    target: 'http://localhost:8081',  // 目标服务器的地址
    changeOrigin: true,  // 设置为 true，以便正确处理目标服务器的跨域请求
    pathRewrite: {
      '^/api': '',  // 重写路径，去掉 '/api' 前缀
    },
  });

app.use('/api', apiProxy);

// 使用 express.static 中间件来暴露静态文件
app.use('/', express.static(path.join(__dirname, 'html/hmdp')));

// 你的其他路由和中间件定义可以放在这里

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});