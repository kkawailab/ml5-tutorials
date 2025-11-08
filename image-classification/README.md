# Teachable Machine × ml5.js 画像認識チュートリアル

## 📝 このプロジェクトについて

このプロジェクトは、Googleの[Teachable Machine](https://teachablemachine.withgoogle.com/)で作成した画像認識モデルを、ブラウザ上でリアルタイムに動かすWebアプリケーションです。

**使用技術:**
- **p5.js** - 描画とアニメーション、カメラ制御
- **ml5.js** - 機械学習（Teachable Machineモデルの読み込み）
- **Teachable Machine** - 画像分類モデル

---

## 🚀 始め方

### 1. 必要なもの

- Webブラウザ（Chrome、Firefox、Edgeなど）
- Webカメラ
- Python 3（ローカルサーバー起動用）

### 2. プロジェクトの起動

1. **ターミナルを開く**

2. **このフォルダに移動**
   ```bash
   cd ml5-tutorials/image-classification
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

5. **カメラ権限を許可**

   ブラウザがカメラへのアクセスを求めてきたら「許可」をクリックしてください。

6. **動作確認**

   画面に「画像を認識中...」と表示され、カメラ映像が表示されれば成功です！
   カメラに物体を映すと、認識結果が画面下部に表示されます。

---

## 📂 ファイル構成

```
image-classification/
├── index.html    # メインのHTMLファイル（ライブラリの読み込み）
├── sketch.js     # p5.jsのメインプログラム（画像認識のロジック）
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
let classifier;  // ml5の画像分類器
let video;       // Webカメラの映像
let label = '読み込み中...';  // 画面に表示するテキスト
const imageModel = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_NAME/';
```

#### 2. setup() - 初期化

```javascript
function setup() {
  createCanvas(640, 480);  // 640x480のキャンバスを作成

  // Webカメラを起動
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();  // ビデオ要素を非表示（キャンバスに描画するため）

  // ml5の画像分類器を初期化
  classifier = ml5.imageClassifier(imageModel + 'model.json', video, modelReady);
}
```

**p5.jsの仕組み:** `setup()`はプログラム起動時に1回だけ実行されます。

#### 3. modelReady() - モデル読み込み完了

```javascript
function modelReady() {
  label = '画像を認識中...';
  classifyVideo();  // 画像認識を開始
}
```

**コールバック関数:** モデルの読み込みが完了すると自動的に呼ばれます。

#### 4. draw() - 描画ループ

```javascript
function draw() {
  background(0);  // 背景を黒に
  image(video, 0, 0, 640, 480);  // カメラ映像を描画

  // 半透明の黒い矩形を下部に描画（ラベル用の背景）
  fill(0, 0, 0, 150);
  rect(0, 400, 640, 80);

  // 認識結果を表示
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, 440);
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
  classifyVideo();  // 継続的に認識を行う
}
```

**コールバック関数:** 画像認識結果が得られるたびに自動的に呼ばれ、継続的に認識を行います。

---

## 🎨 カスタマイズ方法

### 1. 自分のTeachable Machineモデルを使う

1. [Teachable Machine](https://teachablemachine.withgoogle.com/)にアクセス
2. 「Image Project（画像プロジェクト）」を選択
3. Webカメラで様々な物体を撮影して学習させる
4. 「Export Model（モデルをエクスポート）」をクリック
5. 「Upload my model（モデルをアップロード）」を選択
6. 表示されたURLをコピー
7. `sketch.js`の15行目を変更:
   ```javascript
   const imageModel = 'あなたのモデルのURL/';  // 最後の/を忘れずに！
   ```

### 2. キャンバスとカメラのサイズを変更

`sketch.js`の`setup()`関数内:
```javascript
createCanvas(1280, 720);  // 幅1280px、高さ720pxに変更
video = createCapture(VIDEO);
video.size(1280, 720);  // カメラサイズも同じに
```

`draw()`関数内も同じサイズに:
```javascript
image(video, 0, 0, 1280, 720);
rect(0, 600, 1280, 120);  // 背景矩形の位置も調整
text(label, width / 2, 660);  // テキストの位置も調整
```

### 3. 確信度も表示する

`sketch.js`の`gotResult()`関数内:
```javascript
if (results && results[0]) {
  const confidence = Math.round(results[0].confidence * 100);
  label = results[0].label + ' (' + confidence + '%)';
}
```

### 4. 複数のクラスを表示する

`sketch.js`の`gotResult()`関数内:
```javascript
if (results && results.length >= 3) {
  label = '1位: ' + results[0].label + '\n' +
          '2位: ' + results[1].label + '\n' +
          '3位: ' + results[2].label;
}
```

### 5. 色やテキストサイズを変更

`sketch.js`の`draw()`関数内:
```javascript
fill(255, 200, 200, 200);  // 背景を半透明のピンク色に（RGBA指定）
rect(0, 400, 640, 80);

fill(255, 255, 0);         // テキストを黄色に
textSize(40);              // テキストサイズを大きく
```

---

## 🔍 仕組みの詳細

### プログラムの実行フロー

```
1. ページ読み込み
   ↓
2. setup() 実行
   ├─ キャンバス作成
   ├─ Webカメラ起動
   └─ ml5でモデルを読み込み開始
   ↓
3. modelReady() 実行（モデル読み込み完了時）
   └─ classifyVideo() で画像認識開始
   ↓
4. draw() が繰り返し実行（60回/秒）
   ├─ カメラ映像を描画
   └─ 現在のlabelを画面に表示
   ↓
5. gotResult() が継続的に実行（画像認識結果が得られるたび）
   ├─ labelを更新
   └─ classifyVideo() を再度呼び出す
```

### ml5.imageClassifier の仕組み

1. **カメラ入力**: ブラウザのWebカメラから映像データを取得
2. **前処理**: 映像データを機械学習モデルが理解できる形式に変換
3. **推論**: Teachable Machineモデルで分類
4. **結果**: 各クラスの確信度（0.0〜1.0）を返す
5. **コールバック**: `gotResult()`関数に結果を渡す
6. **継続**: `classifyVideo()`を再度呼び出して継続的に認識

---

## 🛠️ トラブルシューティング

### 画面が表示されない

- ブラウザの開発者ツール（F12）でエラーを確認
- ローカルサーバーが起動しているか確認
- ファイルパスが正しいか確認

### カメラが起動しない

- カメラ権限が許可されているか確認
- ブラウザのアドレスバーにカメラアイコンがあればクリック
- 他のアプリケーションがカメラを使用していないか確認
- HTTPSまたはlocalhostでアクセスしているか確認（file://では動作しません）

### 画像が認識されない

- 開発者ツールのConsoleタブでエラーを確認
- モデルが正しく読み込まれているか確認
- カメラの明るさが十分か確認
- 物体をカメラの中心に映しているか確認

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

2. **認識結果に応じてエフェクト**
   - 認識した物体に応じて背景色や図形を変える

3. **スクリーンショット機能の追加**
   - 認識結果と一緒に画像を保存

4. **他のモデルとの組み合わせ**
   - 音声認識と画像認識を同時に使う

5. **物体検出への拡張**
   - COCO-SSDモデルなどを使って物体の位置も検出

---

## 🔄 音声認識版との違い

| 項目 | 音声認識版 | 画像認識版 |
|------|------------|------------|
| 入力デバイス | マイク | Webカメラ |
| ml5の関数 | `ml5.soundClassifier()` | `ml5.imageClassifier()` |
| 映像表示 | なし | あり（`image(video, ...)` で描画） |
| キャンバスサイズ | 320x240 | 640x480 |
| 認識開始 | `classifier.classify(gotResult)` | `classifyVideo()` で継続的に呼び出し |

---

## 📄 ライセンス

このチュートリアルプロジェクトは教育目的で自由に使用できます。

---

## 🤝 貢献

改善案やバグ報告は歓迎します！

---

**楽しい機械学習ライフを！** 🎉
