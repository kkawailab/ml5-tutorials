# Teachable Machine × ml5.js チュートリアル集

## 📝 このプロジェクトについて

Googleの[Teachable Machine](https://teachablemachine.withgoogle.com/)で作成した機械学習モデルを、ブラウザ上で動かすWebアプリケーションのチュートリアル集です。

**使用技術:**
- **p5.js** - 描画とアニメーション、カメラ制御
- **ml5.js** - 機械学習（Teachable Machineモデルの読み込み）
- **Teachable Machine** - 音声分類・画像分類モデル

---

## 🎯 チュートリアル一覧

### 1. 音声認識（Sound Classification）

マイクから入力された音声をリアルタイムに認識するアプリケーションです。

**ディレクトリ:** `sound-classification/`

**特徴:**
- マイク入力からの音声認識
- シンプルなテキスト表示
- 初心者向けの詳細なコメント付きコード

**学べること:**
- p5.jsの基本的な描画処理
- ml5.jsでの音声分類
- コールバック関数の使い方

[📖 音声認識チュートリアルへ →](./sound-classification/)

---

### 2. 画像認識（Image Classification）

Webカメラから取得した映像をリアルタイムに認識するアプリケーションです。

**ディレクトリ:** `image-classification/`

**特徴:**
- Webカメラ映像のリアルタイム認識
- カメラ映像の表示と認識結果のオーバーレイ
- 継続的な画像分類処理

**学べること:**
- p5.jsでのビデオキャプチャ
- ml5.jsでの画像分類
- 映像と認識結果の統合表示

[📖 画像認識チュートリアルへ →](./image-classification/)

---

## 🚀 始め方

### 1. 必要なもの

- Webブラウザ（Chrome、Firefox、Edgeなど）
- Python 3（ローカルサーバー起動用）
- マイクまたはWebカメラ（チュートリアルによる）

### 2. プロジェクトの起動

各チュートリアルのディレクトリに移動してローカルサーバーを起動します。

**音声認識版の場合:**
```bash
cd sound-classification
python3 -m http.server 8000
```

**画像認識版の場合:**
```bash
cd image-classification
python3 -m http.server 8000
```

その後、ブラウザで `http://localhost:8000` にアクセスしてください。

詳しい手順は各チュートリアルのREADMEをご覧ください。

---

## 📂 プロジェクト構成

```
ml5-tutorials/
├── README.md                    # このファイル（プロジェクト全体の説明）
├── CLAUDE.md                    # Claude Code向けプロジェクト情報
│
├── sound-classification/        # 音声認識チュートリアル
│   ├── index.html              # HTMLファイル
│   ├── sketch.js               # メインプログラム（詳細なコメント付き）
│   ├── style.css               # スタイルシート
│   └── README.md               # 音声認識の詳細ガイド
│
└── image-classification/        # 画像認識チュートリアル
    ├── index.html              # HTMLファイル
    ├── sketch.js               # メインプログラム（詳細なコメント付き）
    ├── style.css               # スタイルシート
    └── README.md               # 画像認識の詳細ガイド
```

---

## 🎨 自分のモデルを使う

### Teachable Machineでモデルを作成

1. [Teachable Machine](https://teachablemachine.withgoogle.com/)にアクセス
2. プロジェクトタイプを選択:
   - **Audio Project** - 音声認識用
   - **Image Project** - 画像認識用
3. データを収集して学習
4. 「Export Model」をクリック
5. 「Upload my model」を選択してURLを取得

### コードにモデルURLを設定

各チュートリアルの`sketch.js`ファイルを編集します。

**音声認識の場合（sound-classification/sketch.js）:**
```javascript
const soundModel = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_NAME/';
```

**画像認識の場合（image-classification/sketch.js）:**
```javascript
const imageModel = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_NAME/';
```

**重要:** URLの最後に `/` を忘れずに付けてください！

---

## 🎓 学習の進め方

### 初心者の方へ

1. **音声認識から始める** - より簡単な構造なので理解しやすい
2. **コードを読む** - 各行に日本語コメントが付いています
3. **カスタマイズする** - 色やサイズを変更してみる
4. **自分のモデルを作る** - Teachable Machineで独自のモデルを訓練

### 中級者の方へ

1. **両方のチュートリアルを比較** - 音声認識と画像認識の違いを理解
2. **確信度の表示を追加** - 認識結果の信頼度を表示
3. **複数クラスの可視化** - 棒グラフなどで全結果を表示
4. **エフェクトの追加** - 認識結果に応じてアニメーションを変更

### 上級者の方へ

1. **モデルの組み合わせ** - 音声認識と画像認識を同時に実行
2. **他のml5機能の追加** - 姿勢推定や物体検出を統合
3. **データの記録** - 認識結果をログとして保存
4. **リアルタイム処理の最適化** - パフォーマンス改善

---

## 🔍 技術スタック詳細

### p5.js
- **バージョン:** 1.7.0
- **役割:** キャンバス描画、アニメーション、カメラ/マイク制御
- **公式サイト:** https://p5js.org/

### ml5.js
- **バージョン:** 0.12.2
- **役割:** 機械学習モデルの読み込みと推論
- **公式サイト:** https://ml5js.org/

### Teachable Machine
- **提供元:** Google
- **役割:** 機械学習モデルの訓練とホスティング
- **公式サイト:** https://teachablemachine.withgoogle.com/

---

## 🛠️ よくある質問

### Q: ビルドツールは必要ですか？
A: 不要です。すべてCDN経由でライブラリを読み込むため、HTMLファイルをブラウザで開くだけで動作します（ただしローカルサーバー経由が推奨）。

### Q: なぜローカルサーバーが必要なのですか？
A: カメラやマイクへのアクセスには、セキュリティ上の理由でHTTPSまたはlocalhostからのアクセスが必要だからです。

### Q: モデルのURLが長すぎて入力が大変です
A: Teachable Machineで「Download my model」を選択してローカルに保存し、同じディレクトリに配置することもできます。その場合、URLを `./` に変更してください。

### Q: スマートフォンでも動きますか？
A: はい、モバイルブラウザでも動作します。ただし、パフォーマンスはデバイスのスペックに依存します。

### Q: オフラインで動作しますか？
A: p5.jsとml5.jsをダウンロードしてローカルに配置すれば、一部オフライン動作が可能です。ただし、Teachable Machineのモデルはダウンロードしてローカルでホストする必要があります。

---

## 📚 参考資料

### 公式ドキュメント
- [p5.js Reference](https://p5js.org/reference/) - p5.jsの全機能リファレンス
- [ml5.js Documentation](https://learn.ml5js.org/) - ml5.jsの使い方
- [Teachable Machine FAQs](https://teachablemachine.withgoogle.com/faq) - よくある質問

### チュートリアル・記事
- [The Coding Train - ml5.js tutorials](https://thecodingtrain.com/tracks/ml5js-beginners-guide) - 動画で学ぶml5.js
- [p5.js Examples](https://p5js.org/examples/) - p5.jsのサンプルコード集

---

## 🤝 貢献

改善案やバグ報告は歓迎します！

---

## 📄 ライセンス

このチュートリアルプロジェクトは教育目的で自由に使用できます。

---

**楽しい機械学習ライフを！** 🎉
