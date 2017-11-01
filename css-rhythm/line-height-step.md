# CSS で Vertical Rhythm

「Vertical Rhythm」と呼ばれるデザイン手法があります。最近は関連記事も増えてきたので聞いたことがある、という方もいらっしゃるかもしれません。日本語のタイポグラフィでは、「行取り」と呼ばれる類似の手法があり、ほぼ全ての印刷物で使われています。

「行取り」あるいは「Vertical Rhythm」とは、要素の配置に一定のリズムを取り入れることで、デザイン上の安定感や、可読性の向上などの効果が見込めます。通常は、本文の行の高さをリズムの単位として、要素間の余白を調整します。ノートの罫線や、原稿用紙をイメージするとわかりやすいと思います。

<style>
div.side-by-side > div {
  width: 48%;
  display: inline-block;
  vertical-align: top;
}
div.example {
  font-size: 14px;
  border: thin solid;
}
div.guide {
  background-size: 100% 24px;
  background-image: linear-gradient(to bottom, #00bcd4 1px, transparent 1px);
}
div.grid {
  line-height: 24px;
}
div.grid > h2 {
  line-height: 48px;
  margin: 0;
}
div.grid > * {
  margin: 0;
}
</style>
<div class="side-by-side">
  <div class="example guide">
    <h2>「行取り」なし</h2>
    <p>
      この段落には、行取り（Vertical Rhythm）を適用していません。
      この段落には、行取り（Vertical Rhythm）を適用していません。
      この段落には、行取り（Vertical Rhythm）を適用していません。
    </p>
  </div>
  <div class="example grid guide">
    <h2>「行取り」あり</h2>
    <p>
      この段落には、行取り（Vertical Rhythm）を適用しています。
      この段落には、行取り（Vertical Rhythm）を適用しています。
      この段落には、行取り（Vertical Rhythm）を適用しています。
    </p>
  </div>
</div>

上の例のように、CSS で `line-height` や `margin` を適切に設定すれば実現可能ですが、メンテナンスが煩雑になる、レスポンシブにするのが難しい、見出しが複数行になるとうまくいかない、などの課題が残ります。

現在 W3C では、この問題を改善するために、`line-height-step` という新しいプロパティを議論しています。まだ異論や技術的課題が残っていますが、Chrome、Edge、Safari は賛同しており、Chrome では試験運用機能として実装もされています。この記事では、このプロパティを使って、Vertical Rhythm を実装する方法について解説します。

## 二つのスタイル：強いリズムと弱いリズム

まずは、どこにどのように適用するかを決めます。他のデザイン手法と同様に、「Vertical Rhythm」にもメリットとデメリットがあります。メリットとデメリットを理解して、適切に適用する方法を考えてみましょう。

一つ目のメリットは、行や要素が一定の間隔を持つことで、デザイン上の安定感が生まれることです。規則的に並んでいるデザインは、洗練、安定、安心、といった印象を与えます。

二つ目のメリットは、脳が一定のリズムをパターン認識することで、目線を次の行頭に移動する作業を助け、可読性を上げることです。より早く、より楽に読めることで、内容の理解力も高まるとされています。目線が次の行頭に移動する時は、可読性が一番妨げられる時でもあるので、その改善は効果が期待できます。

ではデメリットはなんでしょうか。一つ目は、スペースを消費することです。余白を広げて調整するため、適用しない場合と比べて、より広いスペースが必要になります。モバイルでは画面の大きさが限られているため、本文の行の高さの半分をリズムの単位にするなどの工夫もあるようです。

デメリットの二つ目は、余白が一定でなくなることです。これはちょっとわかりにくいので、例を挙げて説明します。

図版や表、引用文、コード、コラムなど、大き目のブロックが入った場合を考えてみます。「Vertical Rhythm」を適用するなら、これらのブロックの高さを本文行の高さの整数倍に揃えることになります。雑誌などデザイン重視の印刷物では、通常は図版の大きさを調整して揃えますが、Web では画像のサイズを変えたくないため、余白で調整することになります。この結果、図版が複数ある時に、図版と本文の間の余白が一定にならない、という副作用が生まれます。

二つの図版の間に、一行の本文がある場合がわかりやすいかと思います。

<style>
div.sample-image {
  height: 50px;
  background-color: gray;
  width: 90%;
  margin: 0 auto;
  text-align: center;
}
</style>
<div class="example">
  <div class="sample-image" style="margin-bottom: 5px">写真など</div>
  <div>この本文の上と下の余白が揃いません。</div>
  <div class="sample-image" style="margin-top: 20px">写真など</div>
</div>

一定のリズムを作るデザインを心がけているのに、この余白が一定で無いのは残念です。また、大きなブロックをまたいだ場合、上に挙げたメリットは小さくなってしまいます。脳が図版をまたいでパターン認識するのは困難ですし、目線が図版の次の行頭を見つけるのは簡単です。

この点から、大きな図版や表に対しては、図版をリサイズできない場合には「Vertical Rhythm」を適用せず、余白を一定にする手法が一般的に使われる、と「[日本語組版処理の要件]」および JIS X 4051「日本語文書の行組版方法」では定めています。「日本語組版処理の要件」では、[行取りの処理例]は、見出しの説明の中でのみ出てきます。

W3C での議論を見ると、この点が、英語圏由来の「Vertical Rhythm」と、日本語本来の「行取り」では大きく違うようで、英語圏由来の「Vertical Rhythm」は、より広く、常に適用する場合が多いようです。

本記事では、両方のパターンに適用できるよう、本文と見出しに適用してみます。

## CSS コーディング

では CSS を書いてみましょう。便宜上、見出しは `<h2>` と `<h3>`、本文は `<p>`、画像やコラムは `<div>` タグを使っているとします。

`line-height-step` プロパティはまだ Chrome の試験運用機能でしか使えないので、まずは `@supports` でくくります。確認する場合には、Chrome のアドレスバーに「chrome://flags」と入力し、表示された画面で「Experimental Web Platform features」を有効にしてください。

```css
article {
  font-size: 16px;
}

@supports (line-height-step: 1px) {
  article {
    --grid: 24px;
    line-height-step: var(--grid);
  }
}
```

日本語では、行間は 1.5 倍から 1.8 倍くらいが一般的ですので、ここでは `font-size` を 1.5 倍にした `24px` を基本のリズムとします。この値は他でも使うので、[CSS Custom Properties] で定義して、`line-height-step` を設定します。

```css
  article > p {
    line-height: 1.2;
    margin: 0;
  }
  article > p + p {
    margin: var(--grid) 0 0 0;
  }
```

`line-height-step` では、`margin` をリズムの整数倍に揃える必要があります。個人的には日本語の段落間の空きはない方が好みなのですが、ここでは段落間を一行アキに設定しています。後で出てきますが、margin collapsing が使えない場合が出てくるため、隣接セレクターを使っています。

また、`line-height-step` が行間を一定に揃えてくれるため、余分な空白が入らないように `line-height` を小さめに設定しています。

次に、画像や表は適用外とします。`margin` は見た目を確認しながら適当に設定してください。

```css
  article > div, article > table {
    line-height-step: 0;
    margin: .2em 1em;
  }
```

最後に、見出しを「行取り」で揃えてみましょう。

```css
  article > h2, article > h3 {
    display: inline-block;
    width: 100%;
    line-height-step: 0;
    line-height: 1.2;
    margin: var(--grid) 0 0 0;
  }
```

ちょっとおまじないが出てきました。実は、`line-height-step` は行を揃えるだけで、ブロックを揃えることができません。ブロックを揃えるための仕様も議論には上がっているのですが、行の議論でもう二年近く経っているので、ブロックの議論や実装は残念ながらまだ先です。このため、現段階でブロックを揃えるには、ブロックを `inline-block` にして行の中に収め、その行を揃える、という手法を取ります。`width` は、この `inline-block` を含む行に余分な空白が入らないためです。

これで `<h2>` や `<h3>` の高さは常に `24px` の倍数になるように上下に余白が入ります。モバイルなどの狭い画面では、見出しが複数行になる機会もあるので、このブロックの中では `line-height-step` をオフにし、小さめの `line-height` を設定します。見出しは、短めで、フォントも大きいので、通常は行間を詰めた方が見やすくなります。また、少数を使うと誤差が出てくる場合があるため、整数の `px` にしておくと安全です。

最後に、見出しの上部の空きを、下部の空きより大きくするため、`margin-top` のみを一行分に設定します。これも好みですが、実際の空きは、「行取り」の調整のためにこれよりも大きくなるため、確認しつつ適切な値を探してみてください。上下の `margin` の合計値は 24px の倍数になるようにする必要があります。また、`inline-block` にしたため、隣接したブロックとの間で margin collapsing が働きません。`<p>` の説明をご参照ください。

これで完成です。試験運用機能を有効にした Chrome で確認できるはずです。[サンプルはこちら](sample.html)にあります。確認が終わったら、試験運用機能は無効に戻しておいてください。

[CSS Custom Properties]: https://developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_variables
[line-height-step]: https://drafts.csswg.org/css-rhythm/#line-height-step
[日本語組版処理の要件]: https://www.w3.org/TR/jlreq/ja/
[行取りの処理例]: https://www.w3.org/TR/jlreq/ja/#processing_of_gyoudori