const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const path = require('path');

const app = express();
const port = 8082;

const targets = [
    'http://localhost:8081',
    'http://localhost:8083',
];

let currentTargetIndex = 0;

const apiProxy = (req, res, next) => {
    const target = targets[currentTargetIndex];
    currentTargetIndex = (currentTargetIndex + 1) % targets.length;

    console.log('[p0.1] target',target)
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        },
    })(req, res, next);
};

app.use('/api', apiProxy);

// 使用 express.static 中间件来暴露静态文件
app.use('/', express.static(path.join(__dirname, 'html/hmdp')));

// 你的其他路由和中间件定义可以放在这里

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});