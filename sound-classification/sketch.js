// ========================================
// グローバル変数の宣言
// ========================================

// ml5.jsの音声分類器を格納する変数
let classifier;

// 画面に表示するラベル（音声認識結果）
let label = '読み込み中...';

// Teachable Machineで作成したモデルのURL
// 注意: URLの最後には必ず「/」を付けてください
// 例: 'https://teachablemachine.withgoogle.com/models/あなたのモデル名/'
const soundModel = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_NAME/';

// モデルが読み込まれたかどうかを管理するフラグ
let modelLoaded = false;

// ========================================
// p5.js セットアップ関数
// ========================================
/**
 * setup() はプログラム開始時に1回だけ実行される関数です
 * ここでキャンバスの作成とml5モデルの読み込みを行います
 */
function setup() {
  // 320x240ピクセルのキャンバスを作成
  createCanvas(320, 240);

  // ml5.soundClassifierのオプション設定
  // probabilityThreshold: 認識の確信度の閾値（0.0〜1.0）
  // 0.5 = 50%以上の確信度がある場合のみ結果を返す
  const options = { probabilityThreshold: 0.5 };

  // ml5の音声分類器を初期化
  // 引数:
  //   1. モデルのURL (model.jsonファイルのパス)
  //   2. オプション設定
  //   3. モデル読み込み完了時に呼ばれるコールバック関数
  classifier = ml5.soundClassifier(soundModel + 'model.json', options, modelReady);
}

// ========================================
// モデル読み込み完了時のコールバック関数
// ========================================
/**
 * modelReady() はml5がモデルの読み込みを完了したときに自動的に呼ばれます
 * ここで音声認識を開始します
 */
function modelReady() {
  console.log('モデルの読み込みが完了しました');

  // 表示ラベルを更新
  label = '音声を聞いています...';
  modelLoaded = true;

  // 音声認識を開始
  // gotResult関数が継続的に呼ばれ、認識結果を受け取ります
  classifier.classify(gotResult);
}

// ========================================
// p5.js 描画関数
// ========================================
/**
 * draw() は毎フレーム（通常60回/秒）繰り返し実行される関数です
 * ここで画面に認識結果を表示します
 */
function draw() {
  // 背景を黒色で塗りつぶし
  background(0);

  // テキストの色を白に設定
  fill(255);

  // テキストのサイズを24ピクセルに設定
  textSize(24);

  // テキストを中央揃えに設定
  // 第1引数: 水平方向の配置（CENTER = 中央）
  // 第2引数: 垂直方向の配置（CENTER = 中央）
  textAlign(CENTER, CENTER);

  // 認識結果のラベルを画面中央に表示
  // width/2, height/2 = キャンバスの中心座標
  text(label, width / 2, height / 2);
}

// ========================================
// 音声認識結果を受け取るコールバック関数
// ========================================
/**
 * gotResult() は音声認識結果が得られるたびに自動的に呼ばれます
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

    // オプション: 確信度も確認したい場合は以下のようにします
    // console.log('認識結果:', results[0].label, '確信度:', results[0].confidence);
  }
}
