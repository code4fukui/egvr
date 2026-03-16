# egvr.js

egvr.jsは、A-Frameを使用して、ブラウザ上で簡単に3Dシーンやインタラクティブなコンテンツを作成できるJavaScriptライブラリです。

## デモ
[DEMO](https://taisukef.github.io/vr-spiral/)では、簡単なスパイラル表現を見ることができます。
[Interactive DEMO](https://code4fukui.github.io/egvr/interactive.html)では、マウスやVRコントローラーによる対話的なコンテンツを体験できます。
[Game DEMO](https://code4fukui.github.io/egvr/game.html)では、簡単なゲームを体験できます。

## 機能
- 3Dオブジェクト(球体、直方体、円柱、円錐)の描画
- 3Dモデル(glTF)の読み込み
- テキストの描画
- 画像の表示
- 空の表示
- マウス/VRコントローラーのイベントハンドリング

## 使い方
HTMLファイルに以下のように記述します:

```html
<script type="module">
import * as eg from "https://js.sabae.cc/egvr.js";

eg.box(0, .5, -5, 1, eg.hsl(180, 1, 0.5));
eg.model("https://code4fukui.github.io/vr-kanazawa-it/kanta.glb", 1, 0, -5);
eg.text("Hello", -.3, 2, -1.5);
</script>
```

## ライセンス
MIT License