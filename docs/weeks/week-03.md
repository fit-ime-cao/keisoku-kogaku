# 第3週：測定値の統計的処理（1）

> ⏱️ 読了時間：約38分 | 📝 演習問題：6問

## 学習目標

この週の講義を終えると、以下のことができるようになります：

- [ ] 残差と残差二乗和の意味を説明できる
- [ ] 不偏分散と自由度の意味を、ことばで説明できる
- [ ] 正規分布の式の各部分（$\mu$, $\sigma$, $\exp$）の役割を説明できる
- [ ] 正規分布がなぜ測定誤差によく現れるのかを説明できる
- [ ] 確率誤差の意味と計算方法を理解できる
- [ ] 繰り返し測定の結果を「もっとも信頼しうる値」として表現できる

---

## 1. 第2週から第3週へ：何が新しいのか

第2週では、すでに次の内容を学びました。

- 平均・分散・標準偏差の基本的な意味
- 確度と精度の違い
- 正規分布の形のイメージ

したがって、第3週ではそれらを**最初からやり直す**のではなく、

1. ばらつきをより厳密に扱うための **残差・不偏分散**
2. 正規分布を「形」ではなく「意味」まで理解すること
3. その上で **確率誤差** を使って、平均値がどこまで信用できるかを評価すること

を目標にします。

::: info この週の中心テーマ
第3週は、**繰り返し測定したデータから、どの値をどの程度信頼してよいかを定量的に判断する週**です。
:::

---

## 2. 残差と残差二乗和

### 2.1 残差とは何か

各測定値 $x_i$ が平均値 $\bar{x}$ からどれだけずれているかを、**残差** と呼びます。

$$
d_i = x_i - \bar{x}
$$

::: tip 💡 残差の意味
- $d_i > 0$ なら、その測定値は平均より大きい
- $d_i < 0$ なら、その測定値は平均より小さい
- $|d_i|$ が大きいほど、平均から大きく外れている
:::

### 2.2 なぜ残差を見る必要があるのか

平均値だけを見ると、「中心」がわかります。
しかし、平均値だけでは、

- 測定値が平均の近くにまとまっているのか
- 大きく散らばっているのか
- 一部だけ大きく外れているのか

がわかりません。

そのため、**各データが平均からどのくらい離れているか**を個別に見る必要があります。その役割を果たすのが残差です。

### 2.3 なぜ残差の和は 0 になるのか

$$
\sum_{i=1}^{n} d_i
= \sum_{i=1}^{n}(x_i-\bar{x})
= \sum_{i=1}^{n}x_i - n\bar{x}
$$

ここで

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_i
$$

なので、

$$
\sum_{i=1}^{n} d_i
= \sum_{i=1}^{n}x_i - n\cdot\frac{1}{n}\sum_{i=1}^{n}x_i
= 0
$$

つまり、残差をそのまま足すと、正と負が打ち消し合ってしまいます。

### 2.4 だから二乗和を考える

そこで、ばらつきの大きさを見るために、残差を二乗して足し合わせます。

$$
S = \sum_{i=1}^{n} d_i^2 = \sum_{i=1}^{n}(x_i-\bar{x})^2
$$

この $S$ を **残差二乗和** と呼びます。

::: warning ⚠️ 重要
残差の和は 0 になってしまうので、**散らばりの大きさを知るには二乗和が必要**です。
:::

---

## 3. 不偏分散と自由度

### 3.1 なぜ分散だけでは足りないのか

第2週では、「分散はばらつきの大きさを表す」と学びました。

これは正しいのですが、計測工学ではしばしば、

- 今あるデータのばらつきを知りたい

だけでなく、

- その背後にある**母集団のばらつき**を推定したい

という場面があります。

このときに、そのまま

$$
\frac{1}{n}\sum_{i=1}^{n}(x_i-\bar{x})^2
$$

を使うと、平均的に少し小さめに見積もる傾向があります。そこで、その偏りを補うために**不偏分散**を使います。

### 3.2 不偏分散とは

$$
s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2
$$

::: info なぜ必要か
不偏分散は、**標本から母分散を推定するときに、平均的に過小評価しないよう補正した分散**です。
:::

### 3.3 なぜ $n-1$ で割るのか

ここが第3週で特に大切な点です。

平均値 $\bar{x}$ を一度求めると、残差は

$$
d_1 + d_2 + \cdots + d_n = 0
$$

という条件を必ず満たします。

つまり、$n$ 個の残差があっても、最後の 1 個は他の $n-1$ 個で自動的に決まります。自由に動かせるのは $n-1$ 個だけです。

これを **自由度が $n-1$** といいます。

<div style="display:flex;justify-content:center;margin:20px 0;">
<svg viewBox="0 0 520 170" width="100%" style="max-width:520px;background:#fff;border:1px solid #d8e0ec;border-radius:12px;">
  <text x="25" y="35" font-size="13" fill="#334155">残差:</text>
  <rect x="80" y="20" width="55" height="36" rx="8" fill="#dbeafe" stroke="#60a5fa"/>
  <rect x="150" y="20" width="55" height="36" rx="8" fill="#dbeafe" stroke="#60a5fa"/>
  <rect x="220" y="20" width="55" height="36" rx="8" fill="#dbeafe" stroke="#60a5fa"/>
  <rect x="290" y="20" width="55" height="36" rx="8" fill="#dbeafe" stroke="#60a5fa"/>
  <rect x="360" y="20" width="55" height="36" rx="8" fill="#fee2e2" stroke="#ef4444"/>
  <text x="107" y="43" text-anchor="middle" font-size="13">d₁</text>
  <text x="177" y="43" text-anchor="middle" font-size="13">d₂</text>
  <text x="247" y="43" text-anchor="middle" font-size="13">d₃</text>
  <text x="317" y="43" text-anchor="middle" font-size="13">…</text>
  <text x="387" y="43" text-anchor="middle" font-size="13">dₙ</text>
  <text x="80" y="90" font-size="13" fill="#334155">条件:</text>
  <text x="130" y="90" font-size="18" fill="#0f172a">d₁ + d₂ + … + dₙ = 0</text>
  <text x="80" y="130" font-size="13" fill="#334155">意味:</text>
  <text x="130" y="130" font-size="13" fill="#0f172a">最後の dₙ は他の残差で自動的に決まる → 自由に動けるのは n−1 個</text>
</svg>
</div>

::: tip 💡 直感的な説明
平均値をデータから求めた時点で、ばらつきの評価に使える「自由」が 1 つ減っています。
:::

### 3.4 なぜ「不偏」と呼ぶのか

母分散を $\sigma^2$ とすると、不偏分散 $s^2$ は

$$
E[s^2]=\sigma^2
$$

を満たします。つまり、平均的に見て、母分散を過大にも過小にも見積もらない量です。

### 3.5 標本標準偏差

不偏分散の平方根を **標本標準偏差** とします。

$$
s = \sqrt{s^2}
$$

第2週で学んだように、標準偏差は元の測定値と同じ単位を持つので、解釈しやすい量です。

---

## 4. 正規分布を直感的に理解する

### 4.1 なぜ測定誤差に正規分布が現れやすいのか

測定誤差は、多くの場合、1つの大きな原因ではなく、たくさんの小さな要因の重なりとして現れます。

- 読み取り誤差
- 温度変動
- 微小な振動
- 電気ノイズ
- 人間の反応時間の揺れ

こうした小さな要因が独立に加わると、

- **小さい誤差は起こりやすい**
- **大きい誤差は起こりにくい**
- **平均値の左右でほぼ対称**

という山形の分布が自然に現れます。

### 4.2 なぜ式の理解が必要なのか

第2週では、正規分布の形を図として学びました。しかし、第3週ではさらに一歩進んで、

- なぜ平均値 $\mu$ が中心なのか
- なぜ $\sigma$ が広がりを決めるのか
- なぜ $(x-\mu)^2$ が入るのか
- なぜ $\exp$ が現れるのか

を理解する必要があります。なぜなら、その理解が後の**確率誤差**の意味理解につながるからです。

<div style="display:flex;justify-content:center;margin:20px 0;">
<svg viewBox="0 0 460 260" width="100%" style="max-width:460px;background:#fff;border:1px solid #d8e0ec;border-radius:12px;">
  <defs>
    <linearGradient id="w3grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <line x1="50" y1="220" x2="420" y2="220" stroke="#334155" stroke-width="2"/>
  <line x1="50" y1="220" x2="50" y2="25" stroke="#334155" stroke-width="2"/>
  <path d="M50,220 C120,220 130,110 180,70 C205,50 228,40 235,40 C242,40 265,50 290,70 C340,110 350,220 420,220" fill="url(#w3grad)" stroke="#2563eb" stroke-width="3"/>
  <line x1="235" y1="40" x2="235" y2="223" stroke="#e11d48" stroke-width="2" stroke-dasharray="6 5"/>
  <line x1="165" y1="85" x2="165" y2="223" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="5 4"/>
  <line x1="305" y1="85" x2="305" y2="223" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="235" y="245" text-anchor="middle" font-size="14" fill="#e11d48">μ</text>
  <text x="165" y="245" text-anchor="middle" font-size="13" fill="#7c3aed">μ − σ</text>
  <text x="305" y="245" text-anchor="middle" font-size="13" fill="#7c3aed">μ + σ</text>
  <text x="235" y="257" text-anchor="middle" font-size="12" fill="#334155">測定値 x</text>
  <text x="23" y="120" transform="rotate(-90 23 120)" text-anchor="middle" font-size="12" fill="#334155">確率密度</text>
  <text x="235" y="62" text-anchor="middle" font-size="12" fill="#0f766e">平均の近くが最も起こりやすい</text>
</svg>
</div>

---

## 5. 正規分布の式をどう読むか

### 5.1 まず式全体を見る

正規分布の確率密度関数は

$$
f(x)=\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

です。

ここでは、**証明そのものよりも「各部分が何をしているか」** を押さえます。

| 部分 | 役割 |
|------|------|
| $\mu$ | 山の中心（平均値） |
| $\sigma$ | 山の広がり（標準偏差） |
| $(x-\mu)^2$ | 中心からの距離を左右対称に表す |
| $\exp(\cdots)$ | 中心から離れるほど急速に減少させる |
| $\frac{1}{\sqrt{2\pi}\sigma}$ | 曲線全体の面積を 1 にする |

### 5.2 なぜ $(x-\mu)^2$ が必要なのか

- 分布の中心を平均値 $\mu$ に置きたいので、$x-\mu$ を使う
- 右に同じだけずれた場合と左に同じだけずれた場合を同じように扱いたい
- そのため符号を消し、距離の大きさだけを残す必要がある

よって、

$$
(x-\mu)^2
$$

が自然に現れます。

たとえば、

$$
(\mu+0.2-\mu)^2 = (\mu-0.2-\mu)^2 = 0.04
$$

です。

### 5.3 なぜ $\exp$ が必要なのか

正規分布にしたいなら、関数には少なくとも次の性質が必要です。

1. 平均値の近くで大きい
2. 平均から離れるほど小さくなる
3. しかも滑らかに減る
4. 関数値は常に正である

これらを自然に満たすのが指数関数です。

とくに

$$
\exp(-z)
$$

は、$z$ が大きくなるほど急速に小さくなります。そこで $z=(x-\mu)^2$ と考えると、

$$
\exp\big(-(x-\mu)^2\big)
$$

のような形が自然に現れます。

::: tip 💡 要するに
$\exp$ は「中心から離れるほど起こりにくくなる」ことを、滑らかで自然な形で表すために必要です。
:::

### 5.4 なぜ $\sigma$ が分母にあるのか

$\sigma$ は分布の**広がり**を表します。

- $\sigma$ が小さい → 平均の近くに強く集中する
- $\sigma$ が大きい → より広く散らばる

式の中では

$$
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

となっているので、$\sigma$ が大きいと減少がゆるくなり、山が横に広がります。

### 5.5 なぜ前に係数がつくのか

確率密度関数では、曲線全体の面積が 1 でなければなりません。そこで、その面積を 1 にそろえるために

$$
\frac{1}{\sqrt{2\pi}\sigma}
$$

が付きます。

::: warning 附录について
厳密な導出（最大エントロピー、変分法、ガウス積分）は、このページの最後の**附录**にまとめています。本編では、まず「式の意味」を理解することを優先します。
:::

---

## 6. $\mu\pm1\sigma$, $\mu\pm2\sigma$, $\mu\pm3\sigma$ の意味

標準化変数

$$
Z=\frac{X-\mu}{\sigma}
$$

を使うと、標準正規分布

$$
\phi(z)=\frac{1}{\sqrt{2\pi}}e^{-z^2/2}
$$

に変換できます。その結果、

| 範囲 | 確率 | 意味 |
|------|------|------|
| $\mu\pm1\sigma$ | 約 68.27% | 最も典型的なばらつきの範囲 |
| $\mu\pm2\sigma$ | 約 95.45% | 多くのデータが入る範囲 |
| $\mu\pm3\sigma$ | 約 99.73% | ここを超えると外れ値の疑いが強い |

となります。

<div style="display:flex;justify-content:center;margin:20px 0;">
<svg viewBox="0 0 520 220" width="100%" style="max-width:520px;background:#fff;border:1px solid #d8e0ec;border-radius:12px;">
  <line x1="50" y1="180" x2="470" y2="180" stroke="#333" stroke-width="1.5"/>
  <path d="M50,180 Q100,178 130,170 Q160,155 180,130 Q200,95 220,55 Q240,30 260,25 Q280,30 300,55 Q320,95 340,130 Q360,155 390,170 Q420,178 470,180" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/>
  <line x1="260" y1="25" x2="260" y2="185" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,4"/>
  <line x1="190" y1="60" x2="190" y2="185" stroke="#7c3aed" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="330" y1="60" x2="330" y2="185" stroke="#7c3aed" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="120" y1="120" x2="120" y2="185" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="400" y1="120" x2="400" y2="185" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="260" y="200" text-anchor="middle" font-size="12" fill="#ef4444">μ</text>
  <text x="190" y="200" text-anchor="middle" font-size="11" fill="#7c3aed">μ-σ</text>
  <text x="330" y="200" text-anchor="middle" font-size="11" fill="#7c3aed">μ+σ</text>
  <text x="120" y="200" text-anchor="middle" font-size="11" fill="#94a3b8">μ-2σ</text>
  <text x="400" y="200" text-anchor="middle" font-size="11" fill="#94a3b8">μ+2σ</text>
  <text x="260" y="140" text-anchor="middle" font-size="12" fill="#2563eb" font-weight="bold">68.27%</text>
  <text x="260" y="165" text-anchor="middle" font-size="11" fill="#64748b">95.45%</text>
</svg>
</div>

::: info なぜこの概念が必要か
確率誤差や外れ値の判断では、「平均の周りにどの程度の範囲でデータが集まるか」を理解していることが不可欠です。
:::

---

## 7. 確率誤差

### 7.1 定義

**確率誤差**は、算術平均値がどの程度まで信用できるかを示す量です。

$$
\text{もっとも信頼しうる値} = \bar{x} \pm E
$$

### 7.2 なぜ確率誤差が必要なのか

平均値だけを出しても、

- その値がどのくらい安定しているのか
- どのくらい信用してよいのか

はわかりません。

そこで、平均値のまわりにどれくらいの不確かさがあるかを表す量として、確率誤差を導入します。

### 7.3 各測定の確率誤差

$n$ 回の計測を行ったとき、各測定の確率誤差 $\epsilon$ は

$$
\epsilon = \pm 0.6745\sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2} = \pm 0.6745\,s
$$

です。

ここで 0.6745 は、標準正規分布で中央 50% を切り出す位置から出てくる定数です。

### 7.4 測定全体の確率誤差

$n$ 回測定した平均値の確率誤差 $E$ は

$$
E = \frac{\epsilon}{\sqrt{n}}
$$

となります。

::: warning ⚠️ 重要
測定回数を増やすと、平均値の信頼性は改善しますが、その改善は $\sqrt{n}$ に比例します。したがって、回数を 4 倍にしても誤差は 1/4 ではなく 1/2 になります。
:::

---

## 8. 完全計算例

次の 5 回の測定値について、平均値と確率誤差を求めます。

$$
4.66,\quad 4.65,\quad 4.67,\quad 4.66,\quad 4.64
$$

### 8.1 平均値

$$
\bar{x}=\frac{4.66+4.65+4.67+4.66+4.64}{5}=4.656
$$

### 8.2 残差と残差二乗

| 測定値 | 残差 $d_i=x_i-\bar{x}$ | $d_i^2$ |
|------:|-------------------------:|--------:|
| 4.66 | +0.004 | 0.000016 |
| 4.65 | -0.006 | 0.000036 |
| 4.67 | +0.014 | 0.000196 |
| 4.66 | +0.004 | 0.000016 |
| 4.64 | -0.016 | 0.000256 |

したがって

$$
\sum d_i^2 = 0.00052
$$

### 8.3 不偏分散と標本標準偏差

$$
s^2 = \frac{0.00052}{5-1}=0.00013
$$

$$
s = \sqrt{0.00013}=0.01140
$$

### 8.4 各測定の確率誤差

$$
\epsilon = 0.6745\times 0.01140 = 0.00769
$$

### 8.5 平均の確率誤差

$$
E = \frac{0.00769}{\sqrt{5}} = 0.00344
$$

### 8.6 最終結果

$$
\boxed{4.656\pm0.003}
$$

::: tip 💡 読み方
「この測定では、もっとも信頼できる値は 4.656 であり、その信用幅は約 ±0.003 である」と解釈します。
:::

---

## 9. 授業後の自己復習：演習問題

### 問題1

次の 4 回の測定値の平均値を求めなさい。

$$
2.01,\quad 2.05,\quad 1.98,\quad 2.00
$$

<details>
<summary>解答</summary>

$$
\bar{x} = \frac{2.01+2.05+1.98+2.00}{4}=2.01
$$

</details>

### 問題2

残差 $d_i=x_i-\bar{x}$ の和が 0 になる理由を説明しなさい。

<details>
<summary>解答</summary>

$$
\sum_{i=1}^{n}(x_i-\bar{x}) = \sum_{i=1}^{n}x_i - n\bar{x} = 0
$$

となるためです。平均値そのものが、全データの和を $n$ で割った量だからです。

</details>

### 問題3

不偏分散で $n-1$ で割る理由を、「自由度」という言葉を用いて説明しなさい。

<details>
<summary>解答</summary>

平均値を決めると、残差は

$$
d_1+d_2+\cdots+d_n=0
$$

の制約を満たすため、自由に決められるのは $n-1$ 個です。したがって自由度は $n-1$ になります。

</details>

### 問題4

正規分布の式で $(x-\mu)^2$ が使われている理由を説明しなさい。

<details>
<summary>解答</summary>

平均値 $\mu$ からの距離だけを見たいからです。右に同じだけずれた場合と左に同じだけずれた場合を同じように扱うため、符号が消える二乗 $(x-\mu)^2$ が使われます。

</details>

### 問題5

次の空欄を埋めなさい。

- $\mu\pm1\sigma$ の範囲に入るデータは約（　　　）%
- $\mu\pm2\sigma$ の範囲に入るデータは約（　　　）%

<details>
<summary>解答</summary>

- $\mu\pm1\sigma$ ：約 68.27%
- $\mu\pm2\sigma$ ：約 95.45%

</details>

### 問題6

平均値 $\bar{x}=5.20$、各測定の確率誤差 $\epsilon=0.012$、測定回数 $n=9$ のとき、平均値の確率誤差 $E$ と最も信頼しうる値を求めなさい。

<details>
<summary>解答</summary>

$$
E=\frac{0.012}{\sqrt{9}}=\frac{0.012}{3}=0.004
$$

したがって、

$$
\boxed{5.20\pm0.004}
$$

</details>

---

## 10. 今週のまとめ

- 残差は平均からのずれを表す
- 残差の和は 0 になるので、ばらつきは二乗和で評価する
- 標本から母集団のばらつきを推定するときは、不偏分散を使う
- 正規分布の式では、$\mu$ は中心、$\sigma$ は広がり、$\exp$ は減少のしかたを表す
- 確率誤差を使うと、平均値がどの程度信用できるかを数値で表せる

::: warning 次週へのつながり
今週は「1つの量を繰り返し測ったときの統計処理」でした。次週は「2つの量の関係をどう式にするか」に進み、回帰分析と最小二乗法を扱います。
:::

---

## 附录：正規分布の厳密な導出

::: details クリックして附录を開く
以下は、本編で扱った正規分布の式を、より数学的に導くための補足です。授業では必要に応じて参照してください。

### A.1 最大エントロピーによる導出

平均 $\mu$ と分散 $\sigma^2$ だけが既知で、それ以外の余計な偏りを持たない分布を選びたいとします。

微分エントロピーを

$$
H[f] = -\int_{-\infty}^{\infty} f(x)\ln f(x)\,dx
$$

とします。

制約条件は

$$
\int f(x)\,dx = 1,
\qquad
\int x f(x)\,dx = \mu,
\qquad
\int (x-\mu)^2 f(x)\,dx = \sigma^2
$$

です。

ラグランジュ未定乗数法により、汎関数

$$
\mathcal{L}[f]
= -\int f\ln f\,dx
-\lambda_0\left(\int f\,dx -1\right)
-\lambda_1\left(\int x f\,dx -\mu\right)
-\lambda_2\left(\int (x-\mu)^2 f\,dx -\sigma^2\right)
$$

を考えます。

$f$ に関する変分をとると、停留条件は

$$
\frac{\delta \mathcal{L}}{\delta f}
= -(\ln f +1) - \lambda_0 - \lambda_1 x - \lambda_2 (x-\mu)^2 = 0
$$

となるので、

$$
\ln f(x) = -1-\lambda_0-\lambda_1 x-\lambda_2 (x-\mu)^2
$$

です。定数をまとめ直せば、

$$
\ln f(x)=C_0 + C_1 x + C_2 (x-\mu)^2
$$

したがって指数をとると、

$$
f(x)=\exp\big(C_0 + C_1 x + C_2 (x-\mu)^2\big)
= A\exp(C_1x)\exp\big(C_2(x-\mu)^2\big)
$$

となります。

ここで

1. $\int_{-\infty}^{\infty}f(x)dx$ が有限であるためには $C_2<0$
2. 制約条件は左右対称なので $C_1=0$

です。よって $C_2=-k$（$k>0$）と書けば

$$
f(x)=A\exp\big(-k(x-\mu)^2\big)
$$

が得られます。

#### 2次変分

さらに、

$$
\delta^2 H = -\int_{-\infty}^{\infty}\frac{(\delta f)^2}{f(x)}dx \le 0
$$

なので、この停留点は極大です。したがって、得られた分布は最大エントロピー分布です。

### A.2 ガウス積分による規格化定数の導出

規格化条件

$$
\int_{-\infty}^{\infty} A e^{-k(x-\mu)^2}dx = 1
$$

に対して、変数変換 $u=\sqrt{k}(x-\mu)$ を使うと、

$$
A\cdot \frac{1}{\sqrt{k}}\int_{-\infty}^{\infty} e^{-u^2}du = 1
$$

となります。そこで

$$
I=\int_{-\infty}^{\infty}e^{-u^2}du
$$

を計算します。

$$
I^2
= \left(\int_{-\infty}^{\infty}e^{-x^2}dx\right)
  \left(\int_{-\infty}^{\infty}e^{-y^2}dy\right)
= \iint_{\mathbb{R}^2} e^{-(x^2+y^2)}dxdy
$$

極座標変換 $x=r\cos\theta,\; y=r\sin\theta$ を使うと、$dxdy = r\,dr\,d\theta$ より

$$
I^2 = \int_0^{2\pi}\int_0^{\infty} e^{-r^2}r\,dr\,d\theta
= 2\pi \int_0^{\infty} e^{-r^2}r\,dr
$$

$t=r^2$ と置けば $dt=2rdr$ なので

$$
I^2 = 2\pi\cdot\frac{1}{2}\int_0^{\infty} e^{-t}dt = \pi
$$

よって

$$
\int_{-\infty}^{\infty}e^{-u^2}du = \sqrt{\pi}
$$

です。したがって

$$
A\cdot\frac{\sqrt{\pi}}{\sqrt{k}}=1
\qquad\Rightarrow\qquad
A=\sqrt{\frac{k}{\pi}}
$$

### A.3 分散条件から $k$ を決める

$y=x-\mu$ と置くと、

$$
\mathrm{Var}(X)=E[(X-\mu)^2]=\int_{-\infty}^{\infty} y^2 \cdot A e^{-ky^2}dy
$$

です。

ここで

$$
I(k)=\int_{-\infty}^{\infty}e^{-ky^2}dy = \sqrt{\frac{\pi}{k}}
$$

を $k$ で微分すると、

$$
I'(k)=\int_{-\infty}^{\infty}(-y^2)e^{-ky^2}dy
= -\frac{1}{2}\sqrt{\pi}k^{-3/2}
$$

したがって、

$$
\int_{-\infty}^{\infty}y^2e^{-ky^2}dy
= -I'(k)
= \frac{1}{2}\sqrt{\pi}k^{-3/2}
$$

です。また、$A=\sqrt{k/\pi}$ なので、

$$
\mathrm{Var}(X)
= \sqrt{\frac{k}{\pi}}\cdot \frac{1}{2}\sqrt{\pi}k^{-3/2}
= \frac{1}{2k}
$$

よって分散条件 $\mathrm{Var}(X)=\sigma^2$ から

$$
\frac{1}{2k}=\sigma^2
\qquad\Rightarrow\qquad
k=\frac{1}{2\sigma^2}
$$

となります。これを $A=\sqrt{k/\pi}$ に代入すると

$$
A=\frac{1}{\sqrt{2\pi}\sigma}
$$

です。したがって最終的に

$$
f(x)=\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

が得られます。
:::