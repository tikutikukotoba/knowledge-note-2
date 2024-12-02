const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// ミドルウェア設定
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data.json');

// 検索データ保存API
app.post('/api/search', (req, res) => {
    const searchQuery = req.body.query;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const timestamp = new Date().toISOString();

    const newData = { query: searchQuery, ip, timestamp };

    // データ保存
    let currentData = [];
    if (fs.existsSync(DATA_FILE)) {
        currentData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
    currentData.push(newData);
    fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2));

    res.status(201).send({ status: 'success' });
});

// 検索データ取得API
app.get('/api/data', (req, res) => {
    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
    res.json(data);
});

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました。`);
});
