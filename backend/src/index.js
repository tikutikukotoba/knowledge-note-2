import express from 'express';
import swagger from 'swagger-ui-express';
import yaml from 'yaml';
import fs from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const openapi = yaml.parse(fs.readFileSync('./src/openapi.yaml', 'utf8'));
const prisma = new PrismaClient();

// Expressアプリケーションを作成
const app = express()
  // リクエストボディのJSONをパースするミドルウェア
  .use(express.json())
  .use('/api/docs', swagger.serve, swagger.setup(openapi));

app.post('/api/v1/login', (req, res) => {
  // ログイン処理は省略
  console.log('Login request received:', req.body);
  // JSON形式でレスポンスを送信
  res.json({ message: 'OK' });
});

// ユーザー登録処理
app.post('/api/v1/register', async (req, res) => {
  console.debug(req.body);
  const { email, password, username } = req.body;
  await prisma.user
    .create({
      select: {
        email: true,
        username: true,
      },
      data: {
        email,
        username,
        password: hashSync(password, 10),
      }
    })
    .then(record => res.status(200).json({ isSuccess: true, data: record }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ isSuccess: false, message: '不明なエラーが発生しました' })
    });
});

// 開発用: ユーザー全削除の処理
app.delete('/api/v1/users', async (req, res) => {
  await prisma.user
    .deleteMany()
    .then(record => res.status(200).json({ isSuccess: true, data: record }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ isSuccess: false, message: '不明なエラーが発生しました' })
    });
});

// サーバーを起動
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
