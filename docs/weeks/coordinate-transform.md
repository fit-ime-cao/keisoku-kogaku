# 補足：座標変換と同次変換行列

> ⏱️ 読了時間：約40分 | 📝 確認問題：5問

## 学習目標

この補足資料を学ぶと、以下のことができるようになります：

- [ ] 位置ベクトルと座標系の関係を理解できる
- [ ] 回転行列の意味と性質を説明できる
- [ ] 基本回転行列 Rx, Ry, Rz を導出できる
- [ ] 同次変換行列を用いた座標変換計算ができる
- [ ] ハンド・アイ・コーディネーションの概念を理解できる

---

## 1. 空間の記述

### 1.1 座標系と位置ベクトル

::: info なぜ座標系が重要か？
ロボットがセンサで計測したデータは、**どの座標系で表現されているか**が極めて重要です。カメラで見た対象物の位置は「カメラ座標系」で表現されますが、ロボットの手先を動かすには「ベース座標系」での位置が必要です。
:::

座標系 $\{A\}$ における点の位置は、**位置ベクトル**で表現されます：

$$^Ap = \begin{bmatrix} p_x \\ p_y \\ p_z \end{bmatrix}$$

左上の添字 $A$ は「座標系 $\{A\}$ から見た」ことを意味します。

### 1.2 正規直交基底

座標系 $\{A\}$ は、互いに直交する3つの単位ベクトル（**正規直交基底**）で定義されます：

$$\hat{X}_A, \quad \hat{Y}_A, \quad \hat{Z}_A$$

これらは以下の性質を満たします：

$$\hat{X}_A \cdot \hat{Y}_A = 0, \quad \hat{Y}_A \cdot \hat{Z}_A = 0, \quad \hat{Z}_A \cdot \hat{X}_A = 0$$

$$|\hat{X}_A| = |\hat{Y}_A| = |\hat{Z}_A| = 1$$

<svg viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px; margin: 20px auto; display: block;">
  <style>
    @keyframes pointPulse { 0%, 100% { r: 5; opacity: 1; } 50% { r: 8; opacity: 0.7; } }
    @keyframes dashFlow { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -20; } }
    @keyframes labelFadeA { 0%, 40% { opacity: 1; } 50%, 90% { opacity: 0.2; } 100% { opacity: 1; } }
    @keyframes labelFadeB { 0%, 40% { opacity: 0.2; } 50%, 90% { opacity: 1; } 100% { opacity: 0.2; } }
    .point-anim { animation: pointPulse 2s ease-in-out infinite; }
    .dash-anim { animation: dashFlow 1.5s linear infinite; }
    .label-a { animation: labelFadeA 4s ease-in-out infinite; }
    .label-b { animation: labelFadeB 4s ease-in-out infinite; }
  </style>
  <text x="250" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">2つの座標系から見た同一点 P</text>

  <line x1="60" y1="260" x2="200" y2="260" stroke="#1565C0" stroke-width="2.5"/>
  <polygon points="200,255 210,260 200,265" fill="#1565C0"/>
  <text x="215" y="264" font-size="11" fill="#1565C0" font-weight="bold">X_A</text>
  <line x1="60" y1="260" x2="60" y2="120" stroke="#4CAF50" stroke-width="2.5"/>
  <polygon points="55,120 60,110 65,120" fill="#4CAF50"/>
  <text x="48" y="108" font-size="11" fill="#4CAF50" font-weight="bold">Y_A</text>
  <line x1="60" y1="260" x2="15" y2="295" stroke="#F44336" stroke-width="2.5"/>
  <polygon points="10,293 8,303 18,298" fill="#F44336"/>
  <text x="5" y="312" font-size="11" fill="#F44336" font-weight="bold">Z_A</text>
  <text x="60" y="280" text-anchor="middle" font-size="10" fill="#333" font-weight="bold">{A}</text>

  <line x1="280" y1="220" x2="410" y2="190" stroke="#1565C0" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="408,185 418,188 410,195" fill="#1565C0"/>
  <text x="422" y="192" font-size="11" fill="#1565C0">X_B</text>
  <line x1="280" y1="220" x2="250" y2="90" stroke="#4CAF50" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="245,90 250,80 255,90" fill="#4CAF50"/>
  <text x="240" y="78" font-size="11" fill="#4CAF50">Y_B</text>
  <line x1="280" y1="220" x2="235" y2="255" stroke="#F44336" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="230,253 228,263 238,258" fill="#F44336"/>
  <text x="220" y="272" font-size="11" fill="#F44336">Z_B</text>
  <text x="280" y="240" text-anchor="middle" font-size="10" fill="#333" font-weight="bold">{B}</text>

  <circle cx="350" cy="130" r="5" fill="#9C27B0" class="point-anim"/>
  <text x="360" y="125" font-size="12" fill="#9C27B0" font-weight="bold">P</text>

  <line x1="60" y1="260" x2="350" y2="130" stroke="#9C27B0" stroke-width="1.5" stroke-dasharray="5,5" class="dash-anim"/>
  <text x="180" y="185" font-size="10" fill="#9C27B0" class="label-a" font-weight="bold">ᴬp</text>

  <line x1="280" y1="220" x2="350" y2="130" stroke="#FF9800" stroke-width="1.5" stroke-dasharray="5,5" class="dash-anim"/>
  <text x="330" y="180" font-size="10" fill="#FF9800" class="label-b" font-weight="bold">ᴮp</text>

  <text x="250" y="325" text-anchor="middle" font-size="10" fill="#757575">同じ点 P でも、座標系 {A} と {B} では異なる座標値を持つ</text>
</svg>

::: tip 💡 ポイント
同じ点 $P$ でも、どの座標系から見るかによって座標値が異なります。座標変換とは、ある座標系での表現を別の座標系での表現に変換する操作です。
:::

---

## 2. 座標系間の位置の記述

### 2.1 原点の位置関係

座標系 $\{A\}$ から見た座標系 $\{B\}$ の原点位置を次のように表します：

$$^Ap_{B,\text{ORG}}$$

これは「座標系 $\{A\}$ の座標で表した、座標系 $\{B\}$ の原点の位置ベクトル」です。

### 2.2 位置ベクトルの変換

座標系 $\{B\}$ で表された点 $P$ の位置 $^Bp$ を、座標系 $\{A\}$ での表現 $^Ap$ に変換するには：

$$^Ap = ^Ap_{B,\text{ORG}} + {^A_BR} \cdot {^Bp}$$

::: info 変換の意味
この式は2つの操作の組み合わせです：
1. **回転**：$^A_BR \cdot {^Bp}$ — 座標系 $\{B\}$ での座標を $\{A\}$ の軸方向に回転変換
2. **並進**：$+ {^Ap_{B,\text{ORG}}}$ — 座標系 $\{B\}$ の原点位置分だけ平行移動
:::

---

## 3. 回転行列

### 3.1 回転行列の定義

座標系 $\{B\}$ の姿勢を座標系 $\{A\}$ から記述する **回転行列** $^A_BR$ は、$\{B\}$ の各軸の単位ベクトルを $\{A\}$ の各軸に射影して構成されます：

$$^A_BR = \begin{bmatrix} \hat{X}_B \cdot \hat{X}_A & \hat{Y}_B \cdot \hat{X}_A & \hat{Z}_B \cdot \hat{X}_A \\ \hat{X}_B \cdot \hat{Y}_A & \hat{Y}_B \cdot \hat{Y}_A & \hat{Z}_B \cdot \hat{Y}_A \\ \hat{X}_B \cdot \hat{Z}_A & \hat{Y}_B \cdot \hat{Z}_A & \hat{Z}_B \cdot \hat{Z}_A \end{bmatrix}$$

各要素は2つの単位ベクトルの**内積**（= 方向余弦）です。

### 3.2 回転行列の性質

::: info 直交行列の性質
回転行列は**直交行列**であり、以下の重要な性質を持ちます：

$$^A_BR = \left(^B_AR\right)^T = \left(^B_AR\right)^{-1}$$

$$\det(R) = 1$$

$$R^T R = R R^T = I$$
:::

つまり、**逆変換は転置するだけ**で得られます。これは計算上非常に便利な性質です。

<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px; margin: 20px auto; display: block;">
  <style>
    @keyframes rotateFrame { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes angleShow { 0%, 100% { opacity: 0.3; } 25%, 75% { opacity: 1; } }
    .rotating-frame { animation: rotateFrame 8s linear infinite; transform-origin: 300px 160px; }
    .angle-label { animation: angleShow 4s ease-in-out infinite; }
  </style>
  <text x="250" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">回転行列：座標系 {B} が {A} に対して回転</text>

  <line x1="100" y1="240" x2="240" y2="240" stroke="#1565C0" stroke-width="2.5"/>
  <polygon points="240,235 250,240 240,245" fill="#1565C0"/>
  <text x="255" y="244" font-size="11" fill="#1565C0" font-weight="bold">X_A</text>
  <line x1="100" y1="240" x2="100" y2="100" stroke="#4CAF50" stroke-width="2.5"/>
  <polygon points="95,100 100,90 105,100" fill="#4CAF50"/>
  <text x="88" y="88" font-size="11" fill="#4CAF50" font-weight="bold">Y_A</text>
  <circle cx="100" cy="240" r="3" fill="#333"/>
  <text x="100" y="260" text-anchor="middle" font-size="10" fill="#333" font-weight="bold">{A} 固定</text>

  <g class="rotating-frame">
    <line x1="300" y1="160" x2="430" y2="160" stroke="#FF9800" stroke-width="2"/>
    <polygon points="430,155 440,160 430,165" fill="#FF9800"/>
    <text x="445" y="164" font-size="11" fill="#FF9800" font-weight="bold">X_B</text>
    <line x1="300" y1="160" x2="300" y2="30" stroke="#9C27B0" stroke-width="2"/>
    <polygon points="295,30 300,20 305,30" fill="#9C27B0"/>
    <text x="288" y="18" font-size="11" fill="#9C27B0" font-weight="bold">Y_B</text>
  </g>
  <circle cx="300" cy="160" r="3" fill="#333"/>
  <text x="300" y="180" text-anchor="middle" font-size="10" fill="#333" font-weight="bold">{B} 回転中</text>

  <path d="M 340,160 A 40,40 0 0,0 300,120" fill="none" stroke="#F44336" stroke-width="1.5" class="angle-label"/>
  <text x="345" y="135" font-size="11" fill="#F44336" font-weight="bold" class="angle-label">θ</text>

  <text x="250" y="290" text-anchor="middle" font-size="10" fill="#757575">座標系 {B} が回転すると、回転行列 R の各要素が変化する</text>
</svg>

::: tip 💡 ポイント
回転行列の逆行列は転置行列に等しい：$R^{-1} = R^T$。これにより、逆変換の計算が非常に簡単になります。
:::

---

## 4. 基本回転行列

### 4.1 X軸まわりの回転 $R_X(\theta)$

X軸を中心に角度 $\theta$ だけ回転する行列：

$$R_X(\theta) = \begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{bmatrix}$$

X成分は変化せず、Y-Z平面内で回転します。

### 4.2 Y軸まわりの回転 $R_Y(\theta)$

$$R_Y(\theta) = \begin{bmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{bmatrix}$$

Y成分は変化せず、Z-X平面内で回転します。

### 4.3 Z軸まわりの回転 $R_Z(\theta)$

$$R_Z(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

Z成分は変化せず、X-Y平面内で回転します。

::: tip 💡 覚え方
各基本回転行列では、**回転軸に対応する行と列が単位行列と同じ**（対角要素が1、他が0）になります。残りの2×2部分が $\cos\theta, \sin\theta$ で構成されます。
:::

### 4.4 合成回転

任意の姿勢は、基本回転の**積**で表現できます。例えば、Z軸→Y軸→X軸の順に回転する場合：

$$R = R_X(\alpha) \cdot R_Y(\beta) \cdot R_Z(\gamma)$$

::: warning ⚠️ 注意
行列の積は**非可換**です。回転の順序を変えると結果が異なります：

$$R_X(\alpha) \cdot R_Z(\gamma) \neq R_Z(\gamma) \cdot R_X(\alpha)$$
:::

---

## 5. 同次変換行列

### 5.1 なぜ同次変換行列が必要か？

::: info 動機
位置の変換式 $^Ap = {^Ap_{B,\text{ORG}}} + {^A_BR} \cdot {^Bp}$ は、回転（行列の積）と並進（ベクトルの和）が**混在**しています。これを**1つの行列の積**で統一的に扱うために、同次変換行列を導入します。
:::

### 5.2 同次変換行列の定義

$4 \times 4$ の同次変換行列：

$$^A_BT = \begin{bmatrix} ^A_BR & ^Ap_{B,\text{ORG}} \\ 0 \quad 0 \quad 0 & 1 \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} & p_x \\ r_{21} & r_{22} & r_{23} & p_y \\ r_{31} & r_{32} & r_{33} & p_z \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

位置ベクトルも4次元に拡張します：

$$\tilde{p} = \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}$$

### 5.3 変換の実行

座標変換が**1つの行列の積**で表現できます：

$$^A\tilde{p} = {^A_BT} \cdot {^B\tilde{p}}$$

### 5.4 変換の合成

複数の座標変換を**行列の積**で合成できます：

$$^A_CT = {^A_BT} \cdot {^B_CT}$$

::: info 合成の意味
$\{C\} \to \{B\} \to \{A\}$ と順に変換する場合、右から左へ行列を掛けます。これにより、何段階もの座標変換を1つの行列にまとめることができます。
:::

<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px; margin: 20px auto; display: block;">
  <style>
    @keyframes transformPoint { 
      0%, 20% { cx: 400; cy: 80; fill: #F44336; } 
      40%, 60% { cx: 320; cy: 150; fill: #FF9800; } 
      80%, 100% { cx: 160; cy: 200; fill: #4CAF50; } 
    }
    @keyframes showStep1 { 0%, 20% { opacity: 0; } 30%, 60% { opacity: 1; } 70%, 100% { opacity: 0; } }
    @keyframes showStep2 { 0%, 60% { opacity: 0; } 70%, 100% { opacity: 1; } }
    @keyframes showStepInit { 0%, 20% { opacity: 1; } 30%, 100% { opacity: 0.3; } }
    .transform-pt { animation: transformPoint 6s ease-in-out infinite; }
    .step-init { animation: showStepInit 6s ease-in-out infinite; }
    .step-1 { animation: showStep1 6s ease-in-out infinite; }
    .step-2 { animation: showStep2 6s ease-in-out infinite; }
  </style>
  <text x="250" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">同次変換行列による座標変換</text>

  <line x1="50" y1="270" x2="180" y2="270" stroke="#4CAF50" stroke-width="2"/>
  <polygon points="180,265 190,270 180,275" fill="#4CAF50"/>
  <line x1="50" y1="270" x2="50" y2="140" stroke="#4CAF50" stroke-width="2"/>
  <polygon points="45,140 50,130 55,140" fill="#4CAF50"/>
  <text x="50" y="290" text-anchor="middle" font-size="10" fill="#4CAF50" font-weight="bold">{A}</text>

  <line x1="220" y1="220" x2="340" y2="190" stroke="#FF9800" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="338,185 348,188 340,195" fill="#FF9800"/>
  <line x1="220" y1="220" x2="200" y2="100" stroke="#FF9800" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="195,100 200,90 205,100" fill="#FF9800"/>
  <text x="220" y="240" text-anchor="middle" font-size="10" fill="#FF9800" font-weight="bold">{B}</text>

  <line x1="350" y1="140" x2="450" y2="100" stroke="#F44336" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="448,95 458,98 450,105" fill="#F44336"/>
  <line x1="350" y1="140" x2="330" y2="40" stroke="#F44336" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="325,40 330,30 335,40" fill="#F44336"/>
  <text x="350" y="158" text-anchor="middle" font-size="10" fill="#F44336" font-weight="bold">{C}</text>

  <circle cx="400" cy="80" r="6" fill="#9C27B0" class="transform-pt"/>

  <text x="415" y="70" font-size="10" fill="#F44336" class="step-init" font-weight="bold">ᶜp</text>
  <text x="335" y="145" font-size="10" fill="#FF9800" class="step-1" font-weight="bold">ᴮp = ᴮ_CT · ᶜp</text>
  <text x="100" y="195" font-size="10" fill="#4CAF50" class="step-2" font-weight="bold">ᴬp = ᴬ_BT · ᴮp</text>

  <rect x="80" y="295" width="340" height="20" rx="3" fill="#E8EAF6" stroke="#5C6BC0" stroke-width="1"/>
  <text x="250" y="310" text-anchor="middle" font-size="10" fill="#5C6BC0" font-weight="bold">ᴬ_CT = ᴬ_BT · ᴮ_CT （合成変換）</text>
</svg>

---

## 6. 逆変換

### 6.1 同次変換行列の逆行列

同次変換行列の逆行列は、回転行列の直交性を利用して効率的に計算できます：

$$T^{-1} = \begin{bmatrix} R^T & -R^T p \\ 0 \quad 0 \quad 0 & 1 \end{bmatrix}$$

::: info 導出
$T = \begin{bmatrix} R & p \\ 0 & 1 \end{bmatrix}$ に対して $T \cdot T^{-1} = I$ を満たす $T^{-1}$ を求めると：

$$\begin{bmatrix} R & p \\ 0 & 1 \end{bmatrix} \begin{bmatrix} R^T & -R^T p \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} RR^T & -RR^Tp + p \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} I & 0 \\ 0 & 1 \end{bmatrix} = I$$

$RR^T = I$（直交行列の性質）を利用しています。
:::

::: tip 💡 ポイント
一般の $4 \times 4$ 行列の逆行列計算は複雑ですが、同次変換行列は特殊な構造を持つため、**転置と積だけ**で逆行列が求まります。
:::

---

## 7. 変換の順序の重要性

### 7.1 並進→回転 vs 回転→並進

::: warning ⚠️ 重要
並進と回転の**順序を変えると結果が異なります**。これは行列の積が非可換であることに対応しています。
:::

**例**：X方向に $d$ だけ並進してからZ軸まわりに $90°$ 回転する場合と、先にZ軸まわりに $90°$ 回転してからX方向に $d$ だけ並進する場合を比較します。

#### ケース1：並進→回転

$$T_1 = R_Z(90°) \cdot \text{Trans}(d, 0, 0)$$

$$= \begin{bmatrix} 0 & -1 & 0 & 0 \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 & d \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 0 & -1 & 0 & 0 \\ 1 & 0 & 0 & d \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

結果：原点は $(0, d, 0)$ に移動

#### ケース2：回転→並進

$$T_2 = \text{Trans}(d, 0, 0) \cdot R_Z(90°)$$

$$= \begin{bmatrix} 1 & 0 & 0 & d \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 0 & -1 & 0 & 0 \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 0 & -1 & 0 & d \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

結果：原点は $(d, 0, 0)$ に移動

<svg viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px; margin: 20px auto; display: block;">
  <style>
    @keyframes case1dot { 0%, 15% { cx: 80; cy: 210; } 35%, 50% { cx: 160; cy: 210; } 70%, 100% { cx: 80; cy: 130; } }
    @keyframes case1xEnd { 0%, 15% { x2: 115; y2: 210; } 35%, 50% { x2: 195; y2: 210; } 70%, 100% { x2: 80; y2: 165; } }
    @keyframes case1yEnd { 0%, 15% { x2: 80; y2: 175; } 35%, 50% { x2: 160; y2: 175; } 70%, 100% { x2: 115; y2: 130; } }
    @keyframes case2dot { 0%, 15% { cx: 330; cy: 210; } 35%, 50% { cx: 330; cy: 210; } 70%, 100% { cx: 410; cy: 210; } }
    @keyframes case2xEnd { 0%, 15% { x2: 365; y2: 210; } 35%, 50% { x2: 330; y2: 175; } 70%, 100% { x2: 410; y2: 175; } }
    @keyframes case2yEnd { 0%, 15% { x2: 330; y2: 175; } 35%, 50% { x2: 365; y2: 210; } 70%, 100% { x2: 445; y2: 210; } }
    @keyframes step1show { 0%, 15% { opacity: 0; } 30%, 55% { opacity: 1; } 65%, 100% { opacity: 0; } }
    @keyframes step2show { 0%, 55% { opacity: 0; } 70%, 100% { opacity: 1; } }
    @keyframes finalGlow { 70%, 80% { r: 6; } 85% { r: 10; } 90%, 100% { r: 6; } }
  </style>
  <text x="250" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">変換の順序による結果の違い（Z軸 90°回転 + X方向に d 並進）</text>
  <text x="120" y="42" text-anchor="middle" font-size="11" fill="#1565C0" font-weight="bold">ケース1：先に並進 → 後に回転</text>
  <rect x="15" y="50" width="220" height="230" fill="#E3F2FD" fill-opacity="0.2" stroke="#1565C0" stroke-width="1" rx="5"/>
  <line x1="40" y1="210" x2="220" y2="210" stroke="#BDBDBD" stroke-width="1"/>
  <line x1="80" y1="260" x2="80" y2="70" stroke="#BDBDBD" stroke-width="1"/>
  <text x="225" y="215" font-size="9" fill="#757575">x</text>
  <text x="72" y="68" font-size="9" fill="#757575">y</text>
  <circle cx="80" cy="210" r="3" fill="#333"/>
  <text x="68" y="225" font-size="8" fill="#333">O</text>
  <circle cx="160" cy="210" r="4" fill="#FF9800" opacity="0.4"/>
  <text x="150" y="230" font-size="7" fill="#FF9800" style="animation: step1show 6s ease-in-out infinite;">Step1:(d,0)</text>
  <circle cx="80" cy="130" r="6" fill="#F44336" opacity="0.3" style="animation: finalGlow 6s ease-in-out infinite;"/>
  <text x="90" y="125" font-size="9" fill="#F44336" font-weight="bold" style="animation: step2show 6s ease-in-out infinite;">→ (0, d)</text>
  <line x1="80" y1="210" x2="115" y2="210" stroke="#F44336" stroke-width="2" style="animation: case1xEnd 6s ease-in-out infinite;"/>
  <line x1="80" y1="210" x2="80" y2="175" stroke="#4CAF50" stroke-width="2" style="animation: case1yEnd 6s ease-in-out infinite;"/>
  <circle cx="80" cy="210" r="5" fill="#FF9800" style="animation: case1dot 6s ease-in-out infinite;"/>
  <text x="375" y="42" text-anchor="middle" font-size="11" fill="#9C27B0" font-weight="bold">ケース2：先に回転 → 後に並進</text>
  <rect x="265" y="50" width="220" height="230" fill="#F3E5F5" fill-opacity="0.2" stroke="#9C27B0" stroke-width="1" rx="5"/>
  <line x1="290" y1="210" x2="470" y2="210" stroke="#BDBDBD" stroke-width="1"/>
  <line x1="330" y1="260" x2="330" y2="70" stroke="#BDBDBD" stroke-width="1"/>
  <text x="475" y="215" font-size="9" fill="#757575">x</text>
  <text x="322" y="68" font-size="9" fill="#757575">y</text>
  <circle cx="330" cy="210" r="3" fill="#333"/>
  <text x="318" y="225" font-size="8" fill="#333">O</text>
  <circle cx="330" cy="210" r="4" fill="#FF9800" opacity="0.4"/>
  <text x="300" y="240" font-size="7" fill="#FF9800" style="animation: step1show 6s ease-in-out infinite;">Step1:回転のみ</text>
  <circle cx="410" cy="210" r="6" fill="#9C27B0" opacity="0.3" style="animation: finalGlow 6s ease-in-out infinite;"/>
  <text x="420" y="200" font-size="9" fill="#9C27B0" font-weight="bold" style="animation: step2show 6s ease-in-out infinite;">→ (d, 0)</text>
  <line x1="330" y1="210" x2="365" y2="210" stroke="#F44336" stroke-width="2" style="animation: case2xEnd 6s ease-in-out infinite;"/>
  <line x1="330" y1="210" x2="330" y2="175" stroke="#4CAF50" stroke-width="2" style="animation: case2yEnd 6s ease-in-out infinite;"/>
  <circle cx="330" cy="210" r="5" fill="#FF9800" style="animation: case2dot 6s ease-in-out infinite;"/>
  <line x1="120" y1="300" x2="200" y2="300" stroke="#F44336" stroke-width="2"/>
  <text x="210" y="305" font-size="10" fill="#F44336" font-weight="bold">原点 → (0, d)</text>
  <line x1="300" y1="300" x2="380" y2="300" stroke="#9C27B0" stroke-width="2"/>
  <text x="390" y="305" font-size="10" fill="#9C27B0" font-weight="bold">原点 → (d, 0)</text>
  <text x="250" y="335" text-anchor="middle" font-size="12" fill="#F44336" font-weight="bold">(0, d) ≠ (d, 0)：順序が異なると結果も異なる！</text>
  <text x="250" y="355" text-anchor="middle" font-size="9" fill="#757575">R·T ≠ T·R（行列の積は非可換）</text>
</svg>

---

## 8. ハンド・アイ・コーディネーション

### 8.1 問題設定

::: info ハンド・アイ・コーディネーション
ロボットの**カメラ（Eye）**で対象物を認識し、**手先（Hand）**を対象物まで移動させる問題です。計測工学において、センサデータを実際の制御に結びつける重要な応用例です。
:::

関係する座標系：

| 記号 | 座標系 | 説明 |
|------|--------|------|
| $\{B\}$ | ベース座標系 | ロボットの基準（固定） |
| $\{T\}$ | 手先座標系 | ロボットの手先（ツール） |
| $\{C\}$ | カメラ座標系 | カメラの視点 |
| $\{O\}$ | 対象物座標系 | 把持したい対象物 |

### 8.2 座標変換の連鎖

手先座標系 $\{T\}$ から見た対象物 $\{O\}$ の位置を求めるには：

$$^T_OT = \left(^B_TT\right)^{-1} \cdot {^B_CT} \cdot {^C_OT}$$

::: details 各変換行列の意味
- $^B_TT$：ベースから見た手先の位置・姿勢（ロボットの順運動学から既知）
- $^B_CT$：ベースから見たカメラの位置・姿勢（キャリブレーションで既知）
- $^C_OT$：カメラから見た対象物の位置・姿勢（画像処理で計測）
- $^T_OT$：手先から見た対象物の位置・姿勢（**これを求めたい**）
:::

::: tip 💡 ポイント
この問題は「センサ（カメラ）で得た情報を、アクチュエータ（ロボットの手先）の座標系に変換する」という、計測工学の本質的な応用です。座標変換の連鎖を正しく構成することが鍵となります。
:::

---

## 9. 計算例

### 9.1 Z軸まわり回転 + 並進

::: details 演習：同次変換行列の計算
**問題**：座標系 $\{B\}$ は座標系 $\{A\}$ に対して、Z軸まわりに $30°$ 回転し、原点が $^Ap_{B,\text{ORG}} = [3, 2, 0]^T$ にある。座標系 $\{B\}$ で $^Bp = [1, 0, 0]^T$ にある点を、座標系 $\{A\}$ で表せ。

**解答**：

**Step 1**：回転行列を求める

$$^A_BR = R_Z(30°) = \begin{bmatrix} \cos 30° & -\sin 30° & 0 \\ \sin 30° & \cos 30° & 0 \\ 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 0.866 & -0.5 & 0 \\ 0.5 & 0.866 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

**Step 2**：同次変換行列を構成する

$$^A_BT = \begin{bmatrix} 0.866 & -0.5 & 0 & 3 \\ 0.5 & 0.866 & 0 & 2 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Step 3**：変換を実行する

$$^A\tilde{p} = {^A_BT} \cdot {^B\tilde{p}} = \begin{bmatrix} 0.866 & -0.5 & 0 & 3 \\ 0.5 & 0.866 & 0 & 2 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \\ 0 \\ 1 \end{bmatrix}$$

$$= \begin{bmatrix} 0.866 \times 1 + (-0.5) \times 0 + 0 \times 0 + 3 \times 1 \\ 0.5 \times 1 + 0.866 \times 0 + 0 \times 0 + 2 \times 1 \\ 0 \times 1 + 0 \times 0 + 1 \times 0 + 0 \times 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 3.866 \\ 2.5 \\ 0 \\ 1 \end{bmatrix}$$

**結果**：$^Ap = [3.866, \ 2.5, \ 0]^T$
:::

### 9.2 逆変換の計算

::: details 演習：逆変換の計算
**問題**：上の例で、座標系 $\{A\}$ で $^Ap = [3.866, 2.5, 0]^T$ にある点を、座標系 $\{B\}$ で表せ。

**解答**：

**Step 1**：逆変換行列を求める

$$R^T = \begin{bmatrix} 0.866 & 0.5 & 0 \\ -0.5 & 0.866 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

$$-R^T p = -\begin{bmatrix} 0.866 & 0.5 & 0 \\ -0.5 & 0.866 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 3 \\ 2 \\ 0 \end{bmatrix} = -\begin{bmatrix} 3.598 \\ 0.232 \\ 0 \end{bmatrix} = \begin{bmatrix} -3.598 \\ -0.232 \\ 0 \end{bmatrix}$$

**Step 2**：逆変換を実行する

$$^B\tilde{p} = T^{-1} \cdot {^A\tilde{p}} = \begin{bmatrix} 0.866 & 0.5 & 0 & -3.598 \\ -0.5 & 0.866 & 0 & -0.232 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 3.866 \\ 2.5 \\ 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1.0 \\ 0.0 \\ 0 \\ 1 \end{bmatrix}$$

**結果**：$^Bp = [1, \ 0, \ 0]^T$（元の値に戻る ✓）
:::

---

## 📝 確認問題

### Q1. 回転行列の逆行列は何に等しいか？

- [ ] A. 零行列
- [x] B. 転置行列
- [ ] C. 単位行列
- [ ] D. 元の行列の2乗

### Q2. 同次変換行列のサイズは？

- [ ] A. 2×2
- [ ] B. 3×3
- [x] C. 4×4
- [ ] D. 6×6

### Q3. 複数の座標変換を合成する方法は？

- [x] A. 変換行列の積を計算する
- [ ] B. 変換行列の和を計算する
- [ ] C. 変換行列の差を計算する
- [ ] D. 変換行列の逆行列の和を計算する

### Q4. 並進→回転と回転→並進の結果は？

- [ ] A. 常に同じ
- [x] B. 一般に異なる
- [ ] C. 2次元の場合のみ同じ
- [ ] D. 回転角が90°のときのみ同じ

### Q5. ハンドアイ座標変換で必要な情報の組み合わせとして正しいのは？

- [ ] A. カメラの焦点距離のみ
- [ ] B. ロボットの関節角度のみ
- [x] C. カメラ位置、対象物位置、手先位置の関係
- [ ] D. 対象物の質量と形状

---

## 📚 前の講義に戻る

- **第14週**: [圧力センサ](/weeks/week-14)
- 本ページは座標変換の補足資料です。ロボットビジョンやセンサフュージョンの基礎として活用してください。

# 補足：座標変換と同次変換行列

> ⏱️ 読了時間：約40分 | 📝 確認問題：5問

## 学習目標

この補足資料を学ぶと、以下のことができるようになります：

- [ ] 位置ベクトルと座標系の関係を理解できる
- [ ] 回転行列の意味と性質を説明できる
- [ ] 基本回転行列 $R_X, R_Y, R_Z$ を導出できる
- [ ] 同次変換行列を用いた座標変換計算ができる
- [ ] ハンド・アイ・コーディネーションの概念を理解できる

---

## 1. 空間の記述

### 1.1 なぜ座標系が重要か

::: info ロボット計測における座標系
ロボットがセンサで計測したデータは、**どの座標系で表現されているか**が非常に重要です。カメラで取得した対象物の位置はカメラ座標系で表現されており、ロボットの手先を動かすためにはベース座標系に変換する必要があります。
:::

### 1.2 座標系と位置ベクトル

座標系 $\{A\}$ における位置ベクトル：

$${}^Ap = \begin{bmatrix} p_x \\ p_y \\ p_z \end{bmatrix} \in \mathbb{R}^3$$

正規直交基底を用いた記述：

$${}^Ap = p_x \hat{X}_A + p_y \hat{Y}_A + p_z \hat{Z}_A$$

ここで $\hat{X}_A, \hat{Y}_A, \hat{Z}_A$ は単位方向ベクトルです：

$$\hat{X}_A = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}, \quad \hat{Y}_A = \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}, \quad \hat{Z}_A = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$$

<svg viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="max-width: 450px; margin: 20px auto; display: block;">
  <style>
    @keyframes pointMove { 0%, 20% { cx: 280; cy: 80; } 50%, 70% { cx: 320; cy: 60; } 100% { cx: 280; cy: 80; } }
    @keyframes projX { 0%, 20% { x2: 280; } 50%, 70% { x2: 320; } 100% { x2: 280; } }
    @keyframes projY { 0%, 20% { y2: 80; } 50%, 70% { y2: 60; } 100% { y2: 80; } }
    @keyframes coordLabel { 0%, 20% { opacity: 0.5; } 40%, 70% { opacity: 1; } 100% { opacity: 0.5; } }
  </style>
  <text x="225" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">座標系と位置ベクトル</text>
  <line x1="100" y1="220" x2="380" y2="220" stroke="#333" stroke-width="2"/>
  <polygon points="380,215 395,220 380,225" fill="#333"/>
  <text x="400" y="225" font-size="11" fill="#F44336" font-weight="bold">X_A</text>
  <line x1="100" y1="220" x2="100" y2="30" stroke="#333" stroke-width="2"/>
  <polygon points="95,30 100,15 105,30" fill="#333"/>
  <text x="90" y="15" font-size="11" fill="#4CAF50" font-weight="bold">Y_A</text>
  <line x1="100" y1="220" x2="40" y2="260" stroke="#333" stroke-width="1.5"/>
  <text x="30" y="270" font-size="11" fill="#1565C0" font-weight="bold">Z_A</text>
  <text x="105" y="235" font-size="10" fill="#333">O_A</text>
  <circle cx="280" cy="80" r="6" fill="#FF9800" style="animation: pointMove 5s ease-in-out infinite;"/>
  <text x="290" y="70" font-size="10" fill="#FF9800" font-weight="bold" style="animation: coordLabel 5s ease-in-out infinite;">P(px, py, pz)</text>
  <line x1="100" y1="220" x2="280" y2="80" stroke="#FF9800" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="280" y1="220" x2="280" y2="80" stroke="#4CAF50" stroke-width="1" stroke-dasharray="3,3" style="animation: projY 5s ease-in-out infinite;"/>
  <line x1="100" y1="80" x2="280" y2="80" stroke="#F44336" stroke-width="1" stroke-dasharray="3,3" style="animation: projX 5s ease-in-out infinite;"/>
  <text x="190" y="240" text-anchor="middle" font-size="9" fill="#F44336">px</text>
  <text x="85" y="150" font-size="9" fill="#4CAF50">py</text>
</svg>

---

## 2. 座標系間の位置の記述

### 2.1 位置ベクトルの変換

座標系 $\{A\}$ から見た座標系 $\{B\}$ の原点位置を ${}^Ap_{B,ORG}$ とすると、座標系 $\{B\}$ で表現された点 ${}^Bp$ は、座標系 $\{A\}$ では以下のように表されます：

$${}^Ap = {}^Ap_{B,ORG} + {}^A_BR \cdot {}^Bp$$

::: info 各記号の意味
- ${}^Ap$：座標系 $\{A\}$ での点 $P$ の位置ベクトル
- ${}^Ap_{B,ORG}$：座標系 $\{A\}$ から見た $\{B\}$ の原点位置
- ${}^A_BR$：座標系 $\{A\}$ から見た $\{B\}$ の姿勢（回転行列）
- ${}^Bp$：座標系 $\{B\}$ での点 $P$ の位置ベクトル
:::

---

## 3. 回転行列

### 3.1 回転行列の定義

座標系 $\{B\}$ の姿勢を座標系 $\{A\}$ から記述する**回転行列**：

$${}^A_BR = \begin{bmatrix} {}^A\hat{X}_B & {}^A\hat{Y}_B & {}^A\hat{Z}_B \end{bmatrix} = \begin{bmatrix} \hat{X}_B \cdot \hat{X}_A & \hat{Y}_B \cdot \hat{X}_A & \hat{Z}_B \cdot \hat{X}_A \\ \hat{X}_B \cdot \hat{Y}_A & \hat{Y}_B \cdot \hat{Y}_A & \hat{Z}_B \cdot \hat{Y}_A \\ \hat{X}_B \cdot \hat{Z}_A & \hat{Y}_B \cdot \hat{Z}_A & \hat{Z}_B \cdot \hat{Z}_A \end{bmatrix}$$

### 3.2 回転行列の性質

::: info 直交行列の性質
回転行列は**直交行列**であり、以下の重要な性質を持ちます：

$${}^A_BR = ({}^B_AR)^T = ({}^B_AR)^{-1}$$

つまり、**転置行列が逆行列**になります。これは座標変換の逆変換を求める際に非常に便利です。
:::

<svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px; margin: 20px auto; display: block;">
  <style>
    @keyframes rotateB { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes rotAngle { 0%, 25% { opacity: 0.3; } 50%, 75% { opacity: 1; } 100% { opacity: 0.3; } }
  </style>
  <text x="250" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">2つの座標系と回転行列</text>
  <g>
    <line x1="120" y1="200" x2="250" y2="200" stroke="#333" stroke-width="2"/>
    <polygon points="250,195 260,200 250,205" fill="#333"/>
    <text x="260" y="205" font-size="10" fill="#F44336" font-weight="bold">X_A</text>
    <line x1="120" y1="200" x2="120" y2="70" stroke="#333" stroke-width="2"/>
    <polygon points="115,70 120,60 125,70" fill="#333"/>
    <text x="108" y="58" font-size="10" fill="#4CAF50" font-weight="bold">Y_A</text>
    <text x="125" y="215" font-size="10" fill="#333">{A}</text>
  </g>
  <g transform-origin="120 200" style="animation: rotateB 12s linear infinite;">
    <line x1="120" y1="200" x2="230" y2="160" stroke="#1565C0" stroke-width="2" stroke-dasharray="5,3"/>
    <polygon points="228,155 238,158 230,165" fill="#1565C0"/>
    <text x="238" y="155" font-size="10" fill="#1565C0" font-weight="bold">X_B</text>
    <line x1="120" y1="200" x2="80" y2="90" stroke="#9C27B0" stroke-width="2" stroke-dasharray="5,3"/>
    <polygon points="75,88 78,78 85,90" fill="#9C27B0"/>
    <text x="65" y="78" font-size="10" fill="#9C27B0" font-weight="bold">Y_B</text>
  </g>
  <text x="135" y="175" font-size="11" fill="#FF9800" font-weight="bold" style="animation: rotAngle 6s ease-in-out infinite;">θ</text>
  <text x="350" y="80" font-size="10" fill="#333">回転行列 R は</text>
  <text x="350" y="100" font-size="10" fill="#333">{B}の軸を{A}から</text>
  <text x="350" y="120" font-size="10" fill="#333">見た射影で構成</text>
  <text x="350" y="155" font-size="10" fill="#9C27B0" font-weight="bold">R^T = R^(-1)</text>
  <text x="350" y="175" font-size="9" fill="#757575">転置 = 逆行列</text>
</svg>

---

## 4. 基本回転行列

各座標軸まわりの回転行列は以下の通りです。

### 4.1 X軸まわりの回転 $R_X(\theta)$

$$R_X(\theta) = \begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{bmatrix}$$

### 4.2 Y軸まわりの回転 $R_Y(\theta)$

$$R_Y(\theta) = \begin{bmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{bmatrix}$$

### 4.3 Z軸まわりの回転 $R_Z(\theta)$

$$R_Z(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

::: tip 💡 覚え方
各回転行列で、**回転軸に対応する行と列は単位行列**のままです。例えば $R_X$ では1行目と1列目が $(1, 0, 0)$ のままです。残りの $2 \times 2$ 部分に $\cos\theta$ と $\sin\theta$ が配置されます。
:::

---

## 5. 同次変換行列

### 5.1 同次変換行列の定義

回転と並進を**1つの行列**で表現するために、4×4の**同次変換行列**を用います：

$${}^A_BT = \begin{bmatrix} {}^A_BR & {}^Ap_{B,ORG} \\ 0 \quad 0 \quad 0 & 1 \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} & p_x \\ r_{21} & r_{22} & r_{23} & p_y \\ r_{31} & r_{32} & r_{33} & p_z \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

### 5.2 拡張位置ベクトル

同次変換行列を使うために、位置ベクトルを4次元に拡張します：

$$\tilde{p} = \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}$$

座標変換：

$${}^A\tilde{p} = {}^A_BT \cdot {}^B\tilde{p}$$

### 5.3 複数座標系の連鎖

$\{A\} \to \{B\} \to \{C\}$ のように複数の座標系を経由する場合：

$${}^A_CT = {}^A_BT \cdot {}^B_CT$$

::: tip 💡 ポイント
行列の添え字を見ると、隣接する添え字が打ち消し合うように乗算します。
:::

<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px; margin: 20px auto; display: block;">
  <style>
    @keyframes pointTransform { 0%, 15% { cx: 380; cy: 80; fill: #1565C0; } 50%, 65% { cx: 220; cy: 140; fill: #F44336; } 85%, 100% { cx: 380; cy: 80; fill: #1565C0; } }
    @keyframes labelB { 0%, 15% { opacity: 1; } 40%, 70% { opacity: 0.2; } 85%, 100% { opacity: 1; } }
    @keyframes labelA { 0%, 30% { opacity: 0.2; } 50%, 65% { opacity: 1; } 80%, 100% { opacity: 0.2; } }
  </style>
  <text x="250" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">同次変換行列による座標変換</text>
  <g>
    <line x1="60" y1="180" x2="160" y2="180" stroke="#F44336" stroke-width="2"/>
    <polygon points="160,176 170,180 160,184" fill="#F44336"/>
    <line x1="60" y1="180" x2="60" y2="80" stroke="#4CAF50" stroke-width="2"/>
    <polygon points="56,80 60,70 64,80" fill="#4CAF50"/>
    <text x="65" y="195" font-size="11" fill="#333" font-weight="bold">{A}</text>
  </g>
  <g>
    <line x1="300" y1="120" x2="400" y2="120" stroke="#F44336" stroke-width="1.5" stroke-dasharray="5,3"/>
    <polygon points="400,116 410,120 400,124" fill="#1565C0"/>
    <line x1="300" y1="120" x2="300" y2="40" stroke="#4CAF50" stroke-width="1.5" stroke-dasharray="5,3"/>
    <polygon points="296,40 300,30 304,40" fill="#1565C0"/>
    <text x="305" y="135" font-size="11" fill="#1565C0" font-weight="bold">{B}</text>
  </g>
  <line x1="60" y1="180" x2="300" y2="120" stroke="#FF9800" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="170" y="145" font-size="9" fill="#FF9800">p_B,ORG</text>
  <circle cx="380" cy="80" r="7" style="animation: pointTransform 5s ease-in-out infinite;"/>
  <text x="395" y="75" font-size="9" fill="#1565C0" style="animation: labelB 5s ease-in-out infinite;">Bp</text>
  <text x="210" y="130" font-size="9" fill="#F44336" style="animation: labelA 5s ease-in-out infinite;">Ap</text>
  <text x="250" y="205" text-anchor="middle" font-size="10" fill="#9C27B0" font-weight="bold">Ap = T · Bp</text>
</svg>

---

## 6. 逆変換

### 6.1 逆同次変換行列

${}^A_BT$ の逆変換は以下のように求められます：

$${}^B_AT = ({}^A_BT)^{-1} = \begin{bmatrix} {}^A_BR^T & -{}^A_BR^T \cdot {}^Ap_{B,ORG} \\ 0 \quad 0 \quad 0 & 1 \end{bmatrix}$$

::: info なぜ転置で良いのか
回転行列は直交行列であるため $R^{-1} = R^T$ が成り立ちます。そのため、逆変換行列を求める際に逆行列の計算（行列式やCramerの法則）は不要で、**転置するだけ**で済みます。
:::

::: details 📝 逆変換の導出
${}^Ap = {}^Ap_{B,ORG} + {}^A_BR \cdot {}^Bp$ を ${}^Bp$ について解くと：

$${}^Bp = {}^A_BR^{-1}({}^Ap - {}^Ap_{B,ORG}) = {}^A_BR^T \cdot {}^Ap - {}^A_BR^T \cdot {}^Ap_{B,ORG}$$

これを同次変換行列の形にまとめると：

$${}^B_AT = \begin{bmatrix} {}^A_BR^T & -{}^A_BR^T \cdot {}^Ap_{B,ORG} \\ 0 \quad 0 \quad 0 & 1 \end{bmatrix}$$
:::

---

## 7. 変換の順序の重要性

### 7.1 並進→回転 vs 回転→並進

::: warning ⚠️ 重要
行列の乗算は**非可換**です。並進してから回転する場合と、回転してから並進する場合では、結果が**異なります**。
:::

### 7.2 並進してから回転（通常の座標変換）

$${}^B_CT = T_{trans} \cdot T_{rot} = \begin{bmatrix} \cos\theta & -\sin\theta & 0 & p_x \\ \sin\theta & \cos\theta & 0 & p_y \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

### 7.3 回転してから並進

$${}^B_CT = T_{rot} \cdot T_{trans} = \begin{bmatrix} \cos\theta & -\sin\theta & 0 & p_x\cos\theta - p_y\sin\theta \\ \sin\theta & \cos\theta & 0 & p_x\sin\theta + p_y\cos\theta \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

::: tip 💡 ポイント
回転→並進の場合、並進成分が回転行列の影響を受けます。「ある座標系から見た別の座標系の位置と姿勢」を表す場合は、通常**並進→回転**の形を使います。
:::

<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px; margin: 20px auto; display: block;">
  <style>
    @keyframes transFirst { 0%, 10% { transform: translate(0,0) rotate(0deg); } 30%, 40% { transform: translate(100px,0) rotate(0deg); } 60%, 70% { transform: translate(100px,0) rotate(30deg); } 90%, 100% { transform: translate(0,0) rotate(0deg); } }
    @keyframes rotFirst { 0%, 10% { transform: translate(0,0) rotate(0deg); } 30%, 40% { transform: translate(0,0) rotate(30deg); } 60%, 70% { transform: translate(100px,0) rotate(30deg); } 90%, 100% { transform: translate(0,0) rotate(0deg); } }
    @keyframes stepLabel1 { 0%, 10% { opacity: 0; } 25%, 45% { opacity: 1; } 55%, 100% { opacity: 0; } }
    @keyframes stepLabel2 { 0%, 50% { opacity: 0; } 60%, 75% { opacity: 1; } 85%, 100% { opacity: 0; } }
  </style>
  <text x="125" y="18" text-anchor="middle" font-size="11" fill="#333" font-weight="bold">① 並進 → 回転</text>
  <text x="375" y="18" text-anchor="middle" font-size="11" fill="#333" font-weight="bold">② 回転 → 並進</text>
  <line x1="250" y1="25" x2="250" y2="270" stroke="#E0E0E0" stroke-width="1"/>
  <g>
    <line x1="50" y1="200" x2="200" y2="200" stroke="#E0E0E0" stroke-width="1"/>
    <line x1="50" y1="200" x2="50" y2="50" stroke="#E0E0E0" stroke-width="1"/>
    <g transform-origin="50 200" style="animation: transFirst 8s ease-in-out infinite;">
      <line x1="0" y1="0" x2="60" y2="0" stroke="#1565C0" stroke-width="2"/>
      <polygon points="60,-4 70,0 60,4" fill="#1565C0"/>
      <line x1="0" y1="0" x2="0" y2="-60" stroke="#4CAF50" stroke-width="2"/>
      <polygon points="-4,-60 0,-70 4,-60" fill="#4CAF50"/>
      <circle cx="40" cy="-30" r="5" fill="#FF9800"/>
    </g>
    <text x="125" y="245" text-anchor="middle" font-size="9" fill="#1565C0" style="animation: stepLabel1 8s ease-in-out infinite;">Step 1: 並進</text>
    <text x="125" y="260" text-anchor="middle" font-size="9" fill="#4CAF50" style="animation: stepLabel2 8s ease-in-out infinite;">Step 2: 回転</text>
  </g>
  <g>
    <line x1="300" y1="200" x2="450" y2="200" stroke="#E0E0E0" stroke-width="1"/>
    <line x1="300" y1="200" x2="300" y2="50" stroke="#E0E0E0" stroke-width="1"/>
    <g transform-origin="300 200" style="animation: rotFirst 8s ease-in-out infinite;">
      <line x1="0" y1="0" x2="60" y2="0" stroke="#F44336" stroke-width="2"/>
      <polygon points="60,-4 70,0 60,4" fill="#F44336"/>
      <line x1="0" y1="0" x2="0" y2="-60" stroke="#9C27B0" stroke-width="2"/>
      <polygon points="-4,-60 0,-70 4,-60" fill="#9C27B0"/>
      <circle cx="40" cy="-30" r="5" fill="#FF9800"/>
    </g>
    <text x="375" y="245" text-anchor="middle" font-size="9" fill="#F44336" style="animation: stepLabel1 8s ease-in-out infinite;">Step 1: 回転</text>
    <text x="375" y="260" text-anchor="middle" font-size="9" fill="#9C27B0" style="animation: stepLabel2 8s ease-in-out infinite;">Step 2: 並進</text>
  </g>
</svg>

---

## 8. ハンド・アイ・コーディネーション

### 8.1 問題設定

::: info ハンド・アイ・コーディネーションとは
ロボットの**手先**（ツール）を**対象物**まで移動させるために、複数の座標系間の変換を合成する問題です。

関連する座標系：
- $\{B\}$：ベース座標系（ロボットの基準）
- $\{T\}$：ツール座標系（手先）
- $\{C\}$：カメラ座標系
- $\{O\}$：対象物座標系
:::

### 8.2 座標変換の合成

手先座標系から対象物座標系への変換：

$${}^T_OT = ({}^B_TT)^{-1} \cdot {}^B_CT \cdot {}^C_OT$$

| 変換行列 | 意味 | 取得方法 |
|----------|------|----------|
| ${}^B_CT$ | ベース→カメラ | 初期設定・校正（キャリブレーション） |
| ${}^C_OT$ | カメラ→対象物 | センサ（画像処理）で取得 |
| ${}^B_TT$ | ベース→手先 | ロボットの関節角度から計算（順運動学） |

::: tip 💡 ポイント
この合成により、カメラで検出した対象物の位置を、ロボットの手先を動かすための座標系に変換できます。
:::

---

## 9. 計算例

::: details 📝 Z軸まわりの回転 + 並進の計算例
**問題**：座標系 $\{B\}$ を原点とし、Z軸まわりに $\theta = 90°$ 回転、かつ $x$ 方向に $3$、$y$ 方向に $2$ 並進した座標系 $\{C\}$ がある。同次変換行列 ${}^B_CT$ を求めよ。

**解答**：

$\cos 90° = 0, \quad \sin 90° = 1$

回転行列（Z軸まわり90°）：

$${}^B_CR = R_Z(90°) = \begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

並進ベクトル：

$${}^Bp_{C,ORG} = \begin{bmatrix} 3 \\ 2 \\ 0 \end{bmatrix}$$

同次変換行列（並進→回転）：

$${}^B_CT = \begin{bmatrix} 0 & -1 & 0 & 3 \\ 1 & 0 & 0 & 2 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**検証**：座標系 $\{C\}$ の原点 ${}^Cp = (0,0,0)$ を $\{B\}$ に変換：

$${}^Bp = {}^B_CT \begin{bmatrix} 0 \\ 0 \\ 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 3 \\ 2 \\ 0 \\ 1 \end{bmatrix}$$

正しく $(3, 2, 0)$ が得られます。
:::

::: details 📝 逆変換の計算例
**問題**：上記の ${}^B_CT$ の逆変換 ${}^C_BT$ を求めよ。

**解答**：

$$R^T = \begin{bmatrix} 0 & 1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

$$-R^T \cdot p = -\begin{bmatrix} 0 & 1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} 3 \\ 2 \\ 0 \end{bmatrix} = \begin{bmatrix} -2 \\ 3 \\ 0 \end{bmatrix}$$

$${}^C_BT = \begin{bmatrix} 0 & 1 & 0 & -2 \\ -1 & 0 & 0 & 3 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**検証**：${}^B_CT \cdot {}^C_BT = I_4$（単位行列）
:::

---

## 📝 確認問題

### Q1. 回転行列の逆行列は何に等しいか？

- [ ] A. 零行列
- [x] B. 転置行列
- [ ] C. 単位行列
- [ ] D. 元の行列の2乗

### Q2. 同次変換行列のサイズは？

- [ ] A. 2×2
- [ ] B. 3×3
- [x] C. 4×4
- [ ] D. 6×6

### Q3. 複数の座標変換を合成する方法は？

- [ ] A. 行列の和
- [x] B. 行列の積
- [ ] C. 行列の差
- [ ] D. 行列の逆

### Q4. 並進→回転と回転→並進の結果は一般にどうなるか？

- [ ] A. 常に同じ
- [x] B. 異なる（行列の乗算は非可換）
- [ ] C. 回転角度が90°のときだけ同じ
- [ ] D. 並進量が0のときだけ異なる

### Q5. ハンドアイ座標変換で必要な情報はどれか？

- [ ] A. カメラ画像のみ
- [ ] B. ロボットの関節角度のみ
- [x] C. カメラ位置、対象物位置、手先位置
- [ ] D. 対象物の質量

---

## 📚 関連ページ

- **第14週**: [圧力センサ](/weeks/week-14) — 各種圧力センサの原理と応用
- **第15週**: [総合演習](/weeks/week-15) — 全体のまとめと復習