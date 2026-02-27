# 第3週：計測データの統計的処理（1）

> ⏱️ 読了時間：約35分 | 📝 確認問題：5問

## 学習目標

この週の講義を終えると、以下のことができるようになります：

- [ ] 平均・分散・標準偏差を計算できる
- [ ] 確率誤差の意味と計算方法を理解できる
- [ ] 最小二乗法の原理を説明できる
- [ ] 実験データに対して近似式を求める手順を理解できる

---

## 1. 確度と精度の定量的評価

第2週では確度（Accuracy）と精度（Precision）の概念を学びました。ここでは、それらを**数値的に評価する方法**を学びます。

### 1.1 基本変数

$N$ 個の計測データ $\{x_1, x_2, \dots, x_N\}$ が得られたとき：

### 1.2 標本の平均（算術平均）

::: info 定義
**標本の平均** $\bar{x}$ は、全データの総和をデータ数で割った値です。

$$\bar{x} = \frac{1}{N} \sum_{i=1}^{N} x_i$$
:::

- 確度の指標：平均が**真値に近い**ほど、確度が高い

### 1.3 標本の分散

::: info 定義
**標本の分散** $\sigma^2$ は、各データの平均からのずれの二乗の平均です。

$$\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} (x_i - \bar{x})^2$$
:::

- 精度の指標：分散が**小さい**ほど、精度が高い（ばらつきが少ない）

### 1.4 標本の標準偏差

::: info 定義
**標本の標準偏差** $\sigma$ は、分散の正の平方根です。

$$\sigma = \sqrt{\frac{1}{N} \sum_{i=1}^{N} (x_i - \bar{x})^2} = \sqrt{\sigma^2}$$
:::

::: tip 💡 ポイント
標準偏差は元のデータと**次元（単位）が同じ**です。
- 計測値が [mm] なら、標準偏差も [mm]
- だから加算・減算ができる → $\bar{x} \pm \sigma$ のように使える
:::

### 1.5 標準偏差の意味

正規分布において：

| 範囲 | 含まれるデータの割合 |
|------|---------------------|
| $\bar{x} \pm 1\sigma$ | 約 **68.27%** |
| $\bar{x} \pm 2\sigma$ | 約 **95.45%** |
| $\bar{x} \pm 3\sigma$ | 約 **99.73%** |

<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px; margin: 20px auto; display: block;">
  <defs>
    <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4CAF50" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#4CAF50" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <line x1="50" y1="180" x2="450" y2="180" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="180" x2="50" y2="20" stroke="#333" stroke-width="1.5"/>
  <path d="M50,180 Q100,178 130,170 Q160,155 180,130 Q200,95 220,55 Q240,30 250,25 Q260,30 280,55 Q300,95 320,130 Q340,155 360,170 Q390,178 450,180" fill="url(#bellGrad)" stroke="#4CAF50" stroke-width="2.5"/>
  <line x1="250" y1="25" x2="250" y2="185" stroke="#E91E63" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="250" y="200" text-anchor="middle" font-size="13" fill="#E91E63" font-weight="bold">x̄</text>
  <rect x="180" y="60" width="140" height="120" fill="#2196F3" fill-opacity="0.15" rx="3"/>
  <line x1="180" y1="60" x2="180" y2="185" stroke="#2196F3" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="320" y1="60" x2="320" y2="185" stroke="#2196F3" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="180" y="200" text-anchor="middle" font-size="11" fill="#2196F3">-1σ</text>
  <text x="320" y="200" text-anchor="middle" font-size="11" fill="#2196F3">+1σ</text>
  <text x="250" y="145" text-anchor="middle" font-size="12" fill="#2196F3" font-weight="bold">68.27%</text>
  <line x1="110" y1="170" x2="110" y2="185" stroke="#999" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="390" y1="170" x2="390" y2="185" stroke="#999" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="110" y="200" text-anchor="middle" font-size="11" fill="#999">-2σ</text>
  <text x="390" y="200" text-anchor="middle" font-size="11" fill="#999">+2σ</text>
  <text x="250" y="170" text-anchor="middle" font-size="10" fill="#999">95.45%</text>
  <text x="40" y="185" text-anchor="end" font-size="11" fill="#333">0</text>
  <text x="25" y="100" text-anchor="middle" font-size="11" fill="#333" transform="rotate(-90,25,100)">出現頻度</text>
</svg>

---

## 2. 練習問題：確度と精度の比較

### 2.1 問題

次の A, B の計測データについて、どちらのほうが**正確**（確度が高い）または**精密**（精度が高い）であるか？

**真値は 2.0** とする。

| No. | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| データA | 2.1 | 1.8 | 2.4 | 1.7 | 2.2 | 2.0 | 1.9 | 1.9 | 2.3 |
| データB | 2.1 | 1.8 | 1.9 | 2.0 | 1.8 | 1.7 | 1.9 | 1.6 | 2.0 |

::: tip ヒント
- **平均**を求める → 真値に近いほうが正確（確度が高い）
- **分散**を求める → 分散の小さいほうが精密（精度が高い）
:::

### 2.2 解答

**平均の計算：**

$$\bar{A} = \frac{2.1 + 1.8 + 2.4 + 1.7 + 2.2 + 2.0 + 1.9 + 1.9 + 2.3}{9} = 2.033\dots$$

$$\bar{B} = \frac{2.1 + 1.8 + 1.9 + 2.0 + 1.8 + 1.7 + 1.9 + 1.6 + 2.0}{9} = 1.867\dots$$

→ $\bar{A} = 2.033$ のほうが真値 $2.0$ に近い → **計測データAのほうが正確（確度が高い）**

**分散の計算：**

$$\sigma_A^2 = \frac{1}{9}\{(2.1 - 2.033)^2 + (1.8 - 2.033)^2 + \cdots\} = 0.0489\dots$$

$$\sigma_B^2 = \frac{1}{9}\{(2.1 - 1.867)^2 + (1.8 - 1.867)^2 + \cdots\} = 0.0222\dots$$

→ $\sigma_B^2 = 0.022$ のほうが小さい → **計測データBのほうが精密（精度が高い）**

::: warning まとめ
| | 確度（Accuracy） | 精度（Precision） |
|---|---|---|
| データA | ✅ 高い（平均が真値に近い） | ❌ 低い（ばらつきが大きい） |
| データB | ❌ 低い（平均が真値から遠い） | ✅ 高い（ばらつきが小さい） |
:::

---

## 3. 演習課題：ストップウォッチ実験

実際に自分で計測してみましょう。

1. 任意のストップウォッチを用いて、手動で**5秒間**を計測・停止し、その値を記録する
2. **10回**の計測結果を用いて、**平均、分散、標準偏差**を計算する
3. 同様に**10秒間**の計測・計算を行い、正確さ・精密さを比較する

::: tip 💡 考察ポイント
- 5秒と10秒では、どちらが正確（確度が高い）ですか？
- 5秒と10秒では、どちらが精密（精度が高い）ですか？
- なぜその結果になると思いますか？
:::

---

## 4. 確率誤差

### 4.1 確率誤差とは

::: info 定義
**確率誤差**（Probable Error）：算術平均値がどの程度まで信用できるのかを示す指標

$$\text{もっとも信頼しうる値} = \bar{x} \pm E$$
:::

### 4.2 各測定の確率誤差

$n$ 回の計測を行ったとき、各測定の確率誤差 $\epsilon$ は：

$$\epsilon = \pm\, 0.6745 \sqrt{\frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})^2}$$

::: tip 💡 補足
- $0.6745$ は正規分布の累積分布関数から導かれる定数
- $n-1$ で割るのは**不偏分散**（自由度を考慮した分散）を使っているため
:::

### 4.3 測定全体の確率誤差

$n$ 回の測定の確率誤差 $E$ は：

$$E = \frac{\epsilon}{\sqrt{n}}$$

::: tip 💡 ポイント
測定回数 $n$ を増やすほど、確率誤差 $E$ は小さくなります（$\sqrt{n}$ で割るため）。つまり、**繰り返し計測することで信頼性が向上**します。
:::

### 4.4 練習問題

下記5回の測定結果について、計測値の**平均値**と**確率誤差**を求めなさい。

$$4.66, \quad 4.65, \quad 4.67, \quad 4.66, \quad 4.64$$

<details>
<summary><strong>📖 解答を見る</strong></summary>

**ステップ1：平均値**

$$\bar{x} = \frac{4.66 + 4.65 + 4.67 + 4.66 + 4.64}{5} = 4.656$$

**ステップ2：残差と残差の二乗**

| 測定値 | 残差 $(x_i - \bar{x})$ | 残差の二乗 |
|:------:|:----------------------:|:----------:|
| 4.66 | +0.004 | 0.000016 |
| 4.65 | −0.006 | 0.000036 |
| 4.67 | +0.014 | 0.000196 |
| 4.66 | +0.004 | 0.000016 |
| 4.64 | −0.016 | 0.000256 |

残差の二乗和 $= 0.00052$

**ステップ3：各測定の確率誤差**

$$\epsilon = 0.6745 \sqrt{\frac{0.00052}{5-1}} = 0.6745 \sqrt{0.00013} = 0.6745 \times 0.01140 = 0.00769$$

**ステップ4：測定全体の確率誤差**

$$E = \frac{0.00769}{\sqrt{5}} = \frac{0.00769}{2.236} = 0.00344$$

**結果：**

$$\boxed{4.656 \pm 0.003}$$

</details>

---

## 5. 回帰分析と最小二乗法

### 5.1 回帰分析とは

::: info 定義
**回帰分析**（Regression Analysis / Fitting）：あるデータの相関関係または関数関係を調べるときに、その関数の式の係数を求める手法
:::

例えば、計測データが直線的な関係を持つと予想されるとき：

$$y = ax + b$$

の係数 $a$（傾き）と $b$（切片）を、データから求めます。

<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="max-width: 400px; margin: 20px auto; display: block;">
  <style>
    @keyframes w3dotAppear { 0% { opacity: 0; transform: scale(0); } 100% { opacity: 1; transform: scale(1); } }
    @keyframes w3lineDraw { 0% { stroke-dashoffset: 400; } 100% { stroke-dashoffset: 0; } }
    @keyframes w3residShow { 0%,75% { opacity: 0; } 80% { opacity: 1; } 95% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes w3labelFade { 0%,60% { opacity: 0; } 70% { opacity: 1; } 100% { opacity: 1; } }
    @keyframes w3residLabel { 0%,75% { opacity: 0; } 80% { opacity: 1; } 95% { opacity: 1; } 100% { opacity: 0; } }
    .w3d1 { opacity: 0; transform-origin: 80px 205px; animation: w3dotAppear 0.4s ease-out 0.3s forwards; }
    .w3d2 { opacity: 0; transform-origin: 110px 185px; animation: w3dotAppear 0.4s ease-out 0.6s forwards; }
    .w3d3 { opacity: 0; transform-origin: 140px 195px; animation: w3dotAppear 0.4s ease-out 0.9s forwards; }
    .w3d4 { opacity: 0; transform-origin: 160px 165px; animation: w3dotAppear 0.4s ease-out 1.2s forwards; }
    .w3d5 { opacity: 0; transform-origin: 190px 155px; animation: w3dotAppear 0.4s ease-out 1.5s forwards; }
    .w3d6 { opacity: 0; transform-origin: 220px 140px; animation: w3dotAppear 0.4s ease-out 1.8s forwards; }
    .w3d7 { opacity: 0; transform-origin: 250px 130px; animation: w3dotAppear 0.4s ease-out 2.1s forwards; }
    .w3d8 { opacity: 0; transform-origin: 270px 105px; animation: w3dotAppear 0.4s ease-out 2.4s forwards; }
    .w3d9 { opacity: 0; transform-origin: 300px 95px; animation: w3dotAppear 0.4s ease-out 2.7s forwards; }
    .w3d10 { opacity: 0; transform-origin: 330px 75px; animation: w3dotAppear 0.4s ease-out 3.0s forwards; }
    .w3d11 { opacity: 0; transform-origin: 360px 60px; animation: w3dotAppear 0.4s ease-out 3.3s forwards; }
    .w3regline { stroke-dasharray: 400; stroke-dashoffset: 400; animation: w3lineDraw 1.2s ease-in-out 4.0s forwards; }
    .w3eqlabel { opacity: 0; animation: w3labelFade 1s ease-out 4.8s forwards; }
    .w3resid { opacity: 0; animation: w3residShow 8s ease-in-out 5.5s infinite; }
    .w3residtxt { opacity: 0; animation: w3residLabel 8s ease-in-out 5.5s infinite; }
  </style>
  <rect x="50" y="20" width="330" height="230" fill="#fafafa" stroke="#ddd" rx="3"/>
  <line x1="50" y1="250" x2="380" y2="250" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="250" x2="50" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="215" y="270" text-anchor="middle" font-size="13" fill="#333">x</text>
  <text x="25" y="135" text-anchor="middle" font-size="13" fill="#333" transform="rotate(-90,25,135)">y</text>
  <text x="215" y="295" text-anchor="middle" font-size="11" fill="#1565C0" font-weight="bold">最小二乗法フィッティング（アニメーション）</text>
  <circle cx="80" cy="205" r="4.5" fill="#1565C0" class="w3d1"/>
  <circle cx="110" cy="185" r="4.5" fill="#1565C0" class="w3d2"/>
  <circle cx="140" cy="195" r="4.5" fill="#1565C0" class="w3d3"/>
  <circle cx="160" cy="165" r="4.5" fill="#1565C0" class="w3d4"/>
  <circle cx="190" cy="155" r="4.5" fill="#1565C0" class="w3d5"/>
  <circle cx="220" cy="140" r="4.5" fill="#1565C0" class="w3d6"/>
  <circle cx="250" cy="130" r="4.5" fill="#1565C0" class="w3d7"/>
  <circle cx="270" cy="105" r="4.5" fill="#1565C0" class="w3d8"/>
  <circle cx="300" cy="95" r="4.5" fill="#1565C0" class="w3d9"/>
  <circle cx="330" cy="75" r="4.5" fill="#1565C0" class="w3d10"/>
  <circle cx="360" cy="60" r="4.5" fill="#1565C0" class="w3d11"/>
  <line x1="65" y1="220" x2="375" y2="45" stroke="#FF5722" stroke-width="2.5" class="w3regline"/>
  <text x="340" y="38" font-size="12" fill="#FF5722" font-weight="bold" class="w3eqlabel">y = ax + b</text>
  <line x1="80" y1="205" x2="80" y2="212" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="110" y1="185" x2="110" y2="195" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="140" y1="195" x2="140" y2="178" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="160" y1="165" x2="160" y2="166" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="190" y1="155" x2="190" y2="149" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="220" y1="140" x2="220" y2="133" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="250" y1="130" x2="250" y2="116" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="270" y1="105" x2="270" y2="104" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="300" y1="95" x2="300" y2="87" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="330" y1="75" x2="330" y2="70" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <line x1="360" y1="60" x2="360" y2="54" stroke="#4CAF50" stroke-width="2" stroke-dasharray="3,2" class="w3resid"/>
  <text x="232" y="153" font-size="11" fill="#4CAF50" class="w3residtxt">eᵢ（残差）</text>
</svg>

### 5.2 残差（Residual）

計測データ $(x_i, y_i)$ と近似式 $y = ax_i + b$ との差を**残差**と呼びます。

$$e_i = (ax_i + b) - y_i$$

::: tip 💡 残差の意味
近似式の値と実際の計測データとのずれです。残差が小さいほど、近似式がデータをよく表現しています。
:::

### 5.3 最小二乗法の原理

すべてのデータについて残差を求めます：

$$e_1 = ax_1 + b - y_1$$
$$e_2 = ax_2 + b - y_2$$
$$\vdots$$
$$e_N = ax_N + b - y_N$$

これをまとめると（ベクトル・行列表記）：

$$\boldsymbol{e} = X\boldsymbol{\theta} - \boldsymbol{y}$$

ここで $\boldsymbol{\theta} = \begin{bmatrix} a \\ b \end{bmatrix}$

### 5.4 目的関数

残差の**二乗和**を目的関数 $J$ とします：

$$J(\boldsymbol{\theta}) = \boldsymbol{e}^T \boldsymbol{e} = (X\boldsymbol{\theta} - \boldsymbol{y})^T(X\boldsymbol{\theta} - \boldsymbol{y})$$

::: warning ⚠️ なぜ二乗和？
残差は正（＋）にも負（−）にもなるため、単純に足すと互いに相殺されてしまいます。二乗することで、すべてのずれを正の値として加算できます。
:::

$J$ は $a$ と $b$ の**二次式**であり、パラボラ（放物線）の形をしています。

### 5.5 最小化の条件

$J(a, b)$ を最小にするには、各変数で偏微分して 0 とおきます：

$$\frac{\partial J}{\partial a} = 0, \qquad \frac{\partial J}{\partial b} = 0$$

この連立方程式を解くことで、最適な $a$ と $b$ が求まります。

<svg viewBox="0 0 350 200" xmlns="http://www.w3.org/2000/svg" style="max-width: 350px; margin: 20px auto; display: block;">
  <line x1="40" y1="170" x2="310" y2="170" stroke="#333" stroke-width="1.5"/>
  <line x1="40" y1="170" x2="40" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="175" y="195" text-anchor="middle" font-size="12" fill="#333">パラメータ値</text>
  <text x="20" y="95" text-anchor="middle" font-size="12" fill="#333" transform="rotate(-90,20,95)">J(a, b)</text>
  <path d="M60,30 Q100,28 130,50 Q155,80 175,120 Q185,145 190,155 Q195,145 205,120 Q225,80 250,50 Q280,28 300,30" fill="none" stroke="#FF5722" stroke-width="2.5"/>
  <circle cx="190" cy="155" r="5" fill="#4CAF50"/>
  <text x="190" y="168" text-anchor="middle" font-size="11" fill="#4CAF50" font-weight="bold">最小値</text>
  <line x1="190" y1="155" x2="190" y2="175" stroke="#4CAF50" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="175" y="40" font-size="11" fill="#FF5722">J(a, b)</text>
</svg>

### 5.6 最小二乗法の利点と注意点

**利点：**
- **どんな関数であっても**、近似式の係数を計算できる

**注意点：**
- **どんな関数を当てはめるか**をよく検討する必要がある

| 関数の種類 | 式の形 |
|-----------|--------|
| 1次式（線形関数） | $y = ax + b$ |
| 2次式 | $y = ax^2 + bx + c$ |
| 三角関数 | $y = a\sin(bx) + c$ |
| 指数関数 | $y = ae^{bx}$ |
| 対数関数 | $y = a\ln x + b$ |

::: tip 💡 関数の選び方
何らかの**因果関係**（物理法則など）が見いだせるなら、そちらの関数を優先します。単にデータの形だけで判断しないこと！
:::

---

## 6. 実験データの分析例

### 6.1 データの観察

以下のような実験データが得られたとします。

<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="max-width: 400px; margin: 20px auto; display: block;">
  <rect x="50" y="20" width="330" height="240" fill="#fafafa" stroke="#ddd" rx="3"/>
  <line x1="50" y1="260" x2="380" y2="260" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="260" x2="50" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="215" y="285" text-anchor="middle" font-size="13" fill="#333">x</text>
  <text x="25" y="140" text-anchor="middle" font-size="13" fill="#333" transform="rotate(-90,25,140)">y</text>
  <text x="50" y="275" font-size="10" fill="#666">0</text>
  <text x="105" y="275" font-size="10" fill="#666">1</text>
  <text x="160" y="275" font-size="10" fill="#666">2</text>
  <text x="215" y="275" font-size="10" fill="#666">3</text>
  <text x="270" y="275" font-size="10" fill="#666">4</text>
  <text x="325" y="275" font-size="10" fill="#666">5</text>
  <text x="380" y="275" font-size="10" fill="#666">6</text>
  <circle cx="62" cy="255" r="3" fill="#1565C0"/>
  <circle cx="68" cy="240" r="3" fill="#1565C0"/>
  <circle cx="75" cy="210" r="3" fill="#1565C0"/>
  <circle cx="85" cy="185" r="3" fill="#1565C0"/>
  <circle cx="95" cy="160" r="3" fill="#1565C0"/>
  <circle cx="105" cy="140" r="3" fill="#1565C0"/>
  <circle cx="115" cy="135" r="3" fill="#1565C0"/>
  <circle cx="130" cy="120" r="3" fill="#1565C0"/>
  <circle cx="145" cy="110" r="3" fill="#1565C0"/>
  <circle cx="160" cy="100" r="3" fill="#1565C0"/>
  <circle cx="175" cy="95" r="3" fill="#1565C0"/>
  <circle cx="190" cy="88" r="3" fill="#1565C0"/>
  <circle cx="210" cy="80" r="3" fill="#1565C0"/>
  <circle cx="230" cy="75" r="3" fill="#1565C0"/>
  <circle cx="250" cy="72" r="3" fill="#1565C0"/>
  <circle cx="270" cy="68" r="3" fill="#1565C0"/>
  <circle cx="290" cy="64" r="3" fill="#1565C0"/>
  <circle cx="310" cy="62" r="3" fill="#1565C0"/>
  <circle cx="330" cy="58" r="3" fill="#1565C0"/>
  <circle cx="355" cy="55" r="3" fill="#1565C0"/>
  <circle cx="370" cy="52" r="3" fill="#1565C0"/>
</svg>

### 6.2 近似曲線の予想

**ステップ1：** どのような近似曲線になるか予想する

- 実験の理論的背景から推定する
- プロットの形状から判断する

ここでは、急激に上昇してから緩やかになる形状から、**対数関数**であると予想します：

$$y = a \ln x + b$$

### 6.3 残差の計算

計測データ $(x_i, y_i)$ の全てについて、残差を求めます：

$$r_i = (a \ln x_i + b) - y_i$$

### 6.4 二乗和の最小化

残差の二乗和：

$$J(a, b) = \sum_{i=1}^{n} r_i^2$$

- 残差は正負で現れるので二乗する
- $J$ は係数 $a, b$ を変数とする関数

$J(a,b)$ を最小化する $a, b$ を求めれば、最適な近似曲線が得られます。

<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="max-width: 400px; margin: 20px auto; display: block;">
  <rect x="50" y="20" width="330" height="240" fill="#fafafa" stroke="#ddd" rx="3"/>
  <line x1="50" y1="260" x2="380" y2="260" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="260" x2="50" y2="20" stroke="#333" stroke-width="1.5"/>
  <text x="215" y="285" text-anchor="middle" font-size="13" fill="#333">x</text>
  <text x="25" y="140" text-anchor="middle" font-size="13" fill="#333" transform="rotate(-90,25,140)">y</text>
  <circle cx="62" cy="255" r="3" fill="#1565C0"/>
  <circle cx="68" cy="240" r="3" fill="#1565C0"/>
  <circle cx="75" cy="210" r="3" fill="#1565C0"/>
  <circle cx="85" cy="185" r="3" fill="#1565C0"/>
  <circle cx="95" cy="160" r="3" fill="#1565C0"/>
  <circle cx="105" cy="140" r="3" fill="#1565C0"/>
  <circle cx="115" cy="135" r="3" fill="#1565C0"/>
  <circle cx="130" cy="120" r="3" fill="#1565C0"/>
  <circle cx="145" cy="110" r="3" fill="#1565C0"/>
  <circle cx="160" cy="100" r="3" fill="#1565C0"/>
  <circle cx="175" cy="95" r="3" fill="#1565C0"/>
  <circle cx="190" cy="88" r="3" fill="#1565C0"/>
  <circle cx="210" cy="80" r="3" fill="#1565C0"/>
  <circle cx="230" cy="75" r="3" fill="#1565C0"/>
  <circle cx="250" cy="72" r="3" fill="#1565C0"/>
  <circle cx="270" cy="68" r="3" fill="#1565C0"/>
  <circle cx="290" cy="64" r="3" fill="#1565C0"/>
  <circle cx="310" cy="62" r="3" fill="#1565C0"/>
  <circle cx="330" cy="58" r="3" fill="#1565C0"/>
  <circle cx="355" cy="55" r="3" fill="#1565C0"/>
  <circle cx="370" cy="52" r="3" fill="#1565C0"/>
  <path d="M55,260 Q70,200 90,160 Q110,125 140,105 Q175,85 215,72 Q260,60 310,52 Q355,47 380,45" fill="none" stroke="#FF5722" stroke-width="2.5"/>
  <text x="340" y="38" font-size="12" fill="#FF5722" font-weight="bold">y = a ln x + b</text>
</svg>

---

## 📝 確認問題

### Q1. 標本の分散を正しく表す式は？

- [ ] A. $\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} x_i$
- [x] B. $\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} (x_i - \bar{x})^2$
- [ ] C. $\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} |x_i - \bar{x}|$
- [ ] D. $\sigma^2 = \sum_{i=1}^{N} (x_i - \bar{x})^2$

### Q2. 標準偏差について正しい記述は？

- [ ] A. 標準偏差は分散の2倍である
- [x] B. 標準偏差は元のデータと同じ単位を持つ
- [ ] C. 標準偏差は常に1より小さい
- [ ] D. 標準偏差はデータ数に依存しない

### Q3. 計測データ A の平均が 2.03、B の平均が 1.87 で、真値が 2.0 のとき、確度が高いのは？

- [x] A. データA（平均が真値に近い）
- [ ] B. データB（平均が真値に近い）
- [ ] C. どちらも同じ
- [ ] D. 情報が不足している

### Q4. 最小二乗法で最小化するのは？

- [ ] A. 残差の総和
- [x] B. 残差の二乗和
- [ ] C. データの平均値
- [ ] D. 近似式の傾き

### Q5. 確率誤差 $E$ について正しいのは？

- [ ] A. 測定回数を増やすと大きくなる
- [x] B. 測定回数を増やすと小さくなる
- [ ] C. 測定回数に依存しない
- [ ] D. 常に一定の値である

---

## 📚 次週の予習

- **第4週**: 計測データの統計的処理(2)：回帰分析、相関
- 予習ポイント：相関係数の意味、散布図の読み方
