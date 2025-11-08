// ========================================
// グローバル変数の宣言
// ========================================

// ml5.jsの画像分類器を格納する変数
let classifier;

// Webカメラの映像を格納する変数
let video;

// 画面に表示するラベル（画像認識結果）
let label = '読み込み中...';

// Teachable Machineで作成したモデルのURL
// 注意: URLの最後には必ず「/」を付けてください
// 例: 'https://teachablemachine.withgoogle.com/models/あなたのモデル名/'
const imageModel = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_NAME/';

// モデルが読み込まれたかどうかを管理するフラグ
let modelLoaded = false;

// ========================================
// p5.js セットアップ関数
// ========================================
/**
 * setup() はプログラム開始時に1回だけ実行される関数です
 * ここでキャンバスの作成とカメラ、モデルの読み込みを行います
 */
function setup() {
  // 640x480ピクセルのキャンバスを作成
  createCanvas(640, 480);

  // Webカメラを起動
  // 引数: 幅, 高さ, ビデオモード
  video = createCapture(VIDEO);
  video.size(640, 480);

  // ビデオ要素を非表示にする（キャンバスに描画するため）
  video.hide();

  // ml5の画像分類器を初期化
  // 引数:
  //   1. モデルのURL (model.jsonファイルのパス)
  //   2. ビデオ要素
  //   3. モデル読み込み完了時に呼ばれるコールバック関数
  classifier = ml5.imageClassifier(imageModel + 'model.json', video, modelReady);
}

// ========================================
// モデル読み込み完了時のコールバック関数
// ========================================
/**
 * modelReady() はml5がモデルの読み込みを完了したときに自動的に呼ばれます
 * ここで画像認識を開始します
 */
function modelReady() {
  console.log('モデルの読み込みが完了しました');

  // 表示ラベルを更新
  label = '画像を認識中...';
  modelLoaded = true;

  // 画像認識を開始
  // gotResult関数が継続的に呼ばれ、認識結果を受け取ります
  classifyVideo();
}

// ========================================
// 画像認識を継続的に実行する関数
// ========================================
/**
 * classifyVideo() は画像認識を実行し、結果を受け取ったら再度実行します
 */
function classifyVideo() {
  classifier.classify(gotResult);
}

// ========================================
// p5.js 描画関数
// ========================================
/**
 * draw() は毎フレーム（通常60回/秒）繰り返し実行される関数です
 * ここで画面にカメラ映像と認識結果を表示します
 */
function draw() {
  // 背景を黒色で塗りつぶし
  background(0);

  // カメラ映像をキャンバスに描画
  // 引数: 画像, x座標, y座標, 幅, 高さ
  image(video, 0, 0, 640, 480);

  // 半透明の黒い矩形を下部に描画（ラベル用の背景）
  fill(0, 0, 0, 150);
  rect(0, 400, 640, 80);

  // テキストの色を白に設定
  fill(255);

  // テキストのサイズを32ピクセルに設定
  textSize(32);

  // テキストを中央揃えに設定
  textAlign(CENTER, CENTER);

  // 認識結果のラベルを画面下部中央に表示
  text(label, width / 2, 440);
}

// ========================================
// 画像認識結果を受け取るコールバック関数
// ========================================
/**
 * gotResult() は画像認識結果が得られるたびに自動的に呼ばれます
 *
 * @param {Object} error - エラーが発生した場合のエラーオブジェクト
 * @param {Array} results - 認識結果の配列（確信度の高い順にソート済み）
 *                          各要素には label（ラベル名）と confidence（確信度）が含まれる
 */
function gotResult(error, results) {
  // エラーチェック
  if (error) {
    console.error(error);
    label = 'エラーが発生しました';
    return;
  }

  // 認識結果が存在する場合、最も確信度の高い結果（results[0]）を取得
  if (results && results[0]) {
    // ラベルを更新（この変数はdraw()関数で画面に表示される）
    label = results[0].label;

    // オプション: 確信度も表示したい場合は以下のようにします
    // const confidence = Math.round(results[0].confidence * 100);
    // label = results[0].label + ' (' + confidence + '%)';
  }

  // 継続的に認識を行うため、再度classifyVideo()を呼び出す
  classifyVideo();
}
