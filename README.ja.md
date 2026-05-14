# egvr.js

A-Frame上で3DシーンやインタラクティブなWebXRコンテンツを作成するための軽量なJavaScriptライブラリです。

## デモ

- **[Spiral](https://taisukef.github.io/vr-spiral/)**: シンプルなスパイラルアニメーション。
- **[Interactive](https://code4fukui.github.io/egvr/interactive.html)**: マウスやVRコントローラーでオブジェクトをクリックしてアクションを実行。
- **[Game](https://code4fukui.github.io/egvr/game.html)**: 「球体をクリックする」シンプルなリアクションゲーム。

## 機能

- **最小限のAPI**: シンプルな関数呼び出しで3Dシーン全体を作成。HTMLタグは不要です。
- **3Dプリミティブ**: `sphere`、`box`、`cone`、`cylinder`、`plate`、`line` オブジェクトを簡単に作成できます。
- **アセットの読み込み**: `glTF` 3Dモデル、画像、360°の `sky` 背景を表示します。Vision Proなどのプラットフォーム向けにテクスチャのエンコーディングを自動修正する機能も含まれています。
- **テキストレンダリング**: `eg.text()` による完全なUnicodeサポートを備えた高品質なテキスト描画と、高速で基本的な `eg.textASCII()` を提供します。
- **組み込みのインタラクション**: マウス、Oculus Quest、HTC Viveのコントローラー入力を自動的に処理します。作成した任意のオブジェクトに `.onclick` などのイベントハンドラを追加できます。
- **非同期制御フロー**: `await eg.waitClick()` や `await eg.sleep()` を使用して、アニメーションやゲームロジックを簡単にスクリプト化できます。
- **シーン階層**: 作成関数の引数に `parent` エンティティを渡すことで、オブジェクトをネスト（階層化）できます。

## クイックスタート

`index.html` ファイルを作成し、以下のコードを追加してください。ライブラリが自動的にA-Frameのシーン、カメラ、コントローラーを設定します。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>egvr.js Quick Start</title>
  </head>
  <body>
    <script type="module">
      import * as eg from "https://js.sabae.cc/egvr.js";

      // クリックで色が変わる箱を追加
      const box = eg.box(0, 1.6, -3, 1, "blue");
      box.onclick = () => {
        const newColor = box.getAttribute("color") === "blue" ? "orange" : "blue";
        box.setAttribute("color", newColor);
      };

      // 3Dモデルを追加
      eg.model("https://code4fukui.github.io/vr-kanazawa-it/kanta.glb", 1.5, 1, -3);

      // テキストを追加
      eg.text("Hello VR!", -1.5, 1.6, -3);
    </script>
  </body>
</html>
```

## APIリファレンス

すべてのオブジェクト作成関数は、最後の引数としてオプションの `parent` エンティティを受け取り、ネストされた階層を作成できます。

### シーンオブジェクト
- `eg.sphere(x, y, z, size, color, parent)`
- `eg.box(x, y, z, size, color, parent)`
- `eg.cone(x, y, z, size, height, color, parent)`
- `eg.cylinder(x, y, z, size, height, color, parent)`
- `eg.plate(x, y, z, width, height, color, parent)`
- `eg.line(x1, y1, z1, dx, dy, dz, color, parent)`
- `eg.model(url, x, y, z, rotationY, scale, parent)`
- `eg.image(url, x, y, z, width, height, isCircle, parent)`
- `eg.text(string, x, y, z, width, color, fontSize, parent)`
- `eg.textASCII(string, x, y, z, width, color, align, parent)`
- `eg.sky(url, radius)`

### ユーティリティ
- `await eg.sleep(milliseconds)`: 実行を一時停止します。
- `await eg.waitClick(object)`: 指定したオブジェクト（またはシーンの背景）がクリックされるまで実行を一時停止します。
- `eg.rgb(r, g, b)` / `eg.hsl(h, s, l)`: カラーヘルパー関数。

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照してください。
