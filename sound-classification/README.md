# Teachable Machine × ml5.js 音声認識チュートリアル

## 📝 このプロジェクトについて

このプロジェクトは、Googleの[Teachable Machine](https://teachablemachine.withgoogle.com/)で作成した音声認識モデルを、ブラウザ上で動かすWebアプリケーションです。

**使用技術:**
- **p5.js** - 描画とアニメーション
- **ml5.js** - 機械学習（Teachable Machineモデルの読み込み）
- **Teachable Machine** - 音声分類モデル

---

## 🚀 始め方

### 1. 必要なもの

- Webブラウザ（Chrome、Firefox、Edgeなど）
- マイク
- Python 3（ローカルサーバー起動用）

### 2. プロジェクトの起動

1. **ターミナルを開く**

2. **このフォルダに移動**
   ```bash
   cd ml5-tutorials
   ```

3. **ローカルサーバーを起動**
   ```bash
   python3 -m http.server 8000
   ```

4. **ブラウザでアクセス**

   ブラウザを開いて以下のURLにアクセス:
   ```
   http://localhost:8000
   ```

5. **マイク権限を許可**

   ブラウザがマイクへのアクセスを求めてきたら「許可」をクリックしてください。

6. **動作確認**

   画面に「音声を聞いています...」と表示されれば成功です！
   マイクに向かって音を出すと、認識結果が表示されます。

---

## 📂 ファイル構成

```
ml5-tutorials/
├── index.html    # メインのHTMLファイル（ライブラリの読み込み）
├── sketch.js     # p5.jsのメインプログラム（音声認識のロジック）
├── style.css     # スタイルシート（見た目の設定）
└── README.md     # このファイル
```

---

## 🎓 コードの解説

### index.html - ライブラリの読み込み

```html
<!-- p5.js: 描画ライブラリ -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>

<!-- ml5.js: 機械学習ライブラリ -->
<script src="https://unpkg.com/ml5@0.12.2/dist/ml5.min.js"></script>

<!-- メインプログラム -->
<script src="sketch.js"></script>
```

**重要:** スクリプトの読み込み順序が重要です。p5.js → ml5.js → sketch.js の順で読み込む必要があります。

### sketch.js - メインプログラム

#### 1. グローバル変数の定義

```javascript
let classifier;  // ml5の音声分類器
let label = '読み込み中...';  // 画面に表示するテキスト
const soundModel = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_NAME/';
```

#### 2. setup() - 初期化

```javascript
function setup() {
  createCanvas(320, 240);  // 320x240のキャンバスを作成

  const options = { probabilityThreshold: 0.5 };  // 50%以上の確信度で認識
  classifier = ml5.soundClassifier(soundModel + 'model.json', options, modelReady);
}
```

**p5.jsの仕組み:** `setup()`はプログラム起動時に1回だけ実行されます。

#### 3. modelReady() - モデル読み込み完了

```javascript
function modelReady() {
  label = '音声を聞いています...';
  classifier.classify(gotResult);  // 音声認識を開始
}
```

**コールバック関数:** モデルの読み込みが完了すると自動的に呼ばれます。

#### 4. draw() - 描画ループ

```javascript
function draw() {
  background(0);  // 背景を黒に
  fill(255);      // テキストを白に
  textSize(24);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);  // 認識結果を表示
}
```

**p5.jsの仕組み:** `draw()`は毎秒約60回繰り返し実行されます（60FPS）。

#### 5. gotResult() - 認識結果の受け取り

```javascript
function gotResult(error, results) {
  if (error) {
    label = 'エラーが発生しました';
    return;
  }
  if (results && results[0]) {
    label = results[0].label;  // 最も確信度の高い結果を表示
  }
}
```

**コールバック関数:** 音声認識結果が得られるたびに自動的に呼ばれます。

---

## 🎨 カスタマイズ方法

### 1. 自分のTeachable Machineモデルを使う

1. [Teachable Machine](https://teachablemachine.withgoogle.com/)にアクセス
2. 「Audio Project（音声プロジェクト）」を選択
3. 様々な音をマイクで録音して学習させる
4. 「Export Model（モデルをエクスポート）」をクリック
5. 「Upload my model（モデルをアップロード）」を選択
6. 表示されたURLをコピー
7. `sketch.js`の3行目を変更:
   ```javascript
   const soundModel = 'あなたのモデルのURL/';  // 最後の/を忘れずに！
   ```

### 2. キャンバスのサイズを変更

`sketch.js`の`setup()`関数内:
```javascript
createCanvas(640, 480);  // 幅640px、高さ480pxに変更
```

### 3. 認識の感度を調整

`sketch.js`の`setup()`関数内:
```javascript
const options = { probabilityThreshold: 0.7 };  // 70%以上の確信度が必要
```

- **低い値（0.3など）**: より敏感に反応（誤認識が増える可能性）
- **高い値（0.8など）**: より慎重に認識（見逃しが増える可能性）

### 4. 確信度も表示する

`sketch.js`の`gotResult()`関数内:
```javascript
if (results && results[0]) {
  const confidence = Math.round(results[0].confidence * 100);
  label = results[0].label + ' (' + confidence + '%)';
}
```

### 5. 色やテキストサイズを変更

`sketch.js`の`draw()`関数内:
```javascript
background(255, 200, 200);  // 背景をピンク色に（RGB指定）
fill(0, 0, 255);           // テキストを青色に
textSize(32);              // テキストサイズを大きく
```

---

## 🔍 仕組みの詳細

### プログラムの実行フロー

```
1. ページ読み込み
   ↓
2. setup() 実行
   ├─ キャンバス作成
   └─ ml5でモデルを読み込み開始
   ↓
3. modelReady() 実行（モデル読み込み完了時）
   └─ classifier.classify() で音声認識開始
   ↓
4. draw() が繰り返し実行（60回/秒）
   └─ 現在のlabelを画面に表示
   ↓
5. gotResult() が継続的に実行（音声認識結果が得られるたび）
   └─ labelを更新
```

### ml5.soundClassifier の仕組み

1. **マイク入力**: ブラウザのマイクから音声データを取得
2. **前処理**: 音声データを機械学習モデルが理解できる形式に変換
3. **推論**: Teachable Machineモデルで分類
4. **結果**: 各クラスの確信度（0.0〜1.0）を返す
5. **コールバック**: `gotResult()`関数に結果を渡す

---

## 🛠️ トラブルシューティング

### 画面が表示されない

- ブラウザの開発者ツール（F12）でエラーを確認
- ローカルサーバーが起動しているか確認
- ファイルパスが正しいか確認

### 音声が認識されない

- マイク権限が許可されているか確認
- ブラウザのアドレスバーにマイクアイコンがあればクリック
- 開発者ツールのConsoleタブでエラーを確認
- 十分な音量で音を出しているか確認

### モデルが読み込めない

- インターネット接続を確認
- Teachable MachineのURLが正しいか確認
- URLの最後に「/」が付いているか確認
- 開発者ツールのNetworkタブでmodel.jsonが読み込めているか確認

### "ml5 is not defined" エラー

- `index.html`でml5.jsが正しく読み込まれているか確認
- スクリプトの読み込み順序を確認（p5.js → ml5.js → sketch.js）

---

## 📚 さらに学ぶ

### 公式ドキュメント

- [p5.js Reference](https://p5js.org/reference/) - p5.jsの全機能
- [ml5.js Documentation](https://learn.ml5js.org/) - ml5.jsの使い方
- [Teachable Machine](https://teachablemachine.withgoogle.com/) - モデル作成

### 発展的なアイデア

1. **複数のクラスを視覚化**
   - すべての認識結果を棒グラフで表示

2. **音声に応じてアニメーション**
   - 認識した音に応じて図形の色や動きを変える

3. **録音機能の追加**
   - 認識結果をログとして保存

4. **他のモデルとの組み合わせ**
   - 画像認識と音声認識を同時に使う

---

## 📄 ライセンス

このチュートリアルプロジェクトは教育目的で自由に使用できます。

---

## 🤝 貢献

改善案やバグ報告は歓迎します！

---

**楽しい機械学習ライフを！** 🎉
