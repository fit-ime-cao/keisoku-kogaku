# 第13週：力センサとひずみゲージ

> ⏱️ 読了時間：約40分 | 📝 確認問題：5問

## 学習目標

この週の講義を終えると、以下のことができるようになります：

- [ ] 応力・ひずみ・ヤング率の関係（フックの法則）を説明できる
- [ ] ひずみゲージの原理と荷重の計算ができる
- [ ] ホイートストンブリッジの平衡条件と出力電圧を計算できる
- [ ] 金属ゲージと半導体ゲージの特徴を比較できる
- [ ] トルクセンサの原理を理解できる

---

## 1. 力とひずみの基礎

### 1.1 応力とひずみ

::: info 基本定義
- **応力**（Stress）：物体の単位面積あたりに作用する力
- **ひずみ**（Strain）：物体の変形量を元の長さで割った無次元量
:::

$$\sigma = \frac{\omega}{A} \quad [\text{Pa}]$$

$$\varepsilon = \frac{\Delta l}{l} \quad [\text{無次元}]$$

- $\sigma$：応力 [Pa]
- $\omega$：荷重（力）[N]
- $A$：断面積 [m²]
- $\varepsilon$：ひずみ [-]
- $\Delta l$：伸び（変形量）[m]
- $l$：元の長さ [m]

### 1.2 フックの法則

::: info フックの法則
弾性範囲内では、応力とひずみは比例関係にあります：

$$\sigma = E\varepsilon$$

$E$：**ヤング率**（Young's modulus, 縦弾性係数）[Pa]
:::

<svg viewBox="0 0 450 200" xmlns="http://www.w3.org/2000/svg" style="max-width: 450px; margin: 20px auto; display: block;">
  <text x="225" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">フックの法則（応力-ひずみ線図）</text>
  <line x1="60" y1="170" x2="400" y2="170" stroke="#333" stroke-width="1.5"/>
  <line x1="60" y1="170" x2="60" y2="30" stroke="#333" stroke-width="1.5"/>
  <text x="400" y="185" text-anchor="end" font-size="10" fill="#333">ひずみ ε</text>
  <text x="55" y="35" text-anchor="end" font-size="10" fill="#333">応力 σ</text>
  <line x1="60" y1="170" x2="250" y2="50" stroke="#1565C0" stroke-width="2.5"/>
  <path d="M250,50 Q280,42 310,45 Q340,55 370,90" fill="none" stroke="#F44336" stroke-width="2" stroke-dasharray="5,3"/>
  <circle cx="250" cy="50" r="4" fill="#FF9800"/>
  <text x="260" y="45" font-size="10" fill="#FF9800">弾性限界</text>
  <text x="150" y="95" font-size="11" fill="#1565C0" transform="rotate(-40,150,95)">σ = Eε（線形領域）</text>
  <text x="340" y="80" font-size="10" fill="#F44336">塑性域</text>
</svg>

---

## 2. ひずみゲージの原理

### 2.1 基本原理

::: info ひずみゲージの原理
金属線や箔に力が加わると、長さと断面積の変化により**電気抵抗**が変化します。この抵抗変化からひずみを検出するのがひずみゲージです。

$$\frac{\Delta R}{R} = K\varepsilon$$

$K$：**ゲージ率**（Gauge Factor）
:::

<svg viewBox="0 0 450 160" xmlns="http://www.w3.org/2000/svg" style="max-width: 450px; margin: 20px auto; display: block;">
  <text x="225" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">ひずみゲージの構造</text>
  <rect x="100" y="40" width="250" height="100" fill="#FFF9C4" fill-opacity="0.3" stroke="#F9A825" stroke-width="1.5" rx="5"/>
  <text x="225" y="150" text-anchor="middle" font-size="10" fill="#F9A825">ベース（絶縁フィルム）</text>
  <polyline points="140,60 140,120 160,120 160,60 180,60 180,120 200,120 200,60 220,60 220,120 240,120 240,60 260,60 260,120 280,120 280,60 300,60 300,120" fill="none" stroke="#1565C0" stroke-width="2"/>
  <line x1="130" y1="60" x2="140" y2="60" stroke="#1565C0" stroke-width="2"/>
  <line x1="300" y1="120" x2="310" y2="120" stroke="#1565C0" stroke-width="2"/>
  <line x1="120" y1="60" x2="130" y2="60" stroke="#F44336" stroke-width="2"/>
  <line x1="310" y1="120" x2="320" y2="120" stroke="#F44336" stroke-width="2"/>
  <circle cx="120" cy="60" r="4" fill="#F44336"/>
  <circle cx="320" cy="120" r="4" fill="#F44336"/>
  <text x="110" y="50" text-anchor="middle" font-size="9" fill="#F44336">端子</text>
  <text x="330" y="130" text-anchor="middle" font-size="9" fill="#F44336">端子</text>
  <text x="225" y="95" text-anchor="middle" font-size="10" fill="#1565C0" font-weight="bold">金属箔パターン</text>
</svg>

### 2.2 荷重の計算

フックの法則とゲージ率の関係から、荷重 $\omega$ を算出できます：

$$\varepsilon = \frac{1}{K} \cdot \frac{\Delta R}{R}$$

$$\sigma = E\varepsilon = \frac{E}{K} \cdot \frac{\Delta R}{R}$$

$$\omega = \sigma \cdot A = \frac{EA}{K} \cdot \frac{\Delta R}{R}$$

::: details 演習：荷重の計算
**問題**：ヤング率 $E = 200$ GPa、断面積 $A = 10$ mm²、ゲージ率 $K = 2.0$ のひずみゲージで $\Delta R/R = 0.001$ を検出した。荷重は？

**解答**：

$$\omega = \frac{EA}{K} \cdot \frac{\Delta R}{R} = \frac{200 \times 10^9 \times 10 \times 10^{-6}}{2.0} \times 0.001$$

$$= \frac{2 \times 10^6}{2.0} \times 0.001 = 1000 \text{ [N]} = 1 \text{ [kN]}$$
:::

---

## 3. 抵抗変化の検出

### 3.1 分圧回路による検出

::: warning ⚠️ 問題点
単純な分圧回路では、ひずみによる微小な抵抗変化を高精度に検出することが困難です。初期電圧が大きく、微小な変化分を抽出しにくいためです。
:::

### 3.2 ホイートストンブリッジ

::: info ホイートストンブリッジ
4つの抵抗をブリッジ状に接続し、**微小な抵抗変化**を高精度に検出する回路です。
:::

<svg viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="max-width: 450px; margin: 20px auto; display: block;">
  <style>
    @keyframes resistChange { 
      0%, 40% { fill: #FFCDD2; }
      50%, 90% { fill: #EF9A9A; }
      100% { fill: #FFCDD2; }
    }
    @keyframes voltPulse { 
      0%, 40% { opacity: 0.3; }
      50%, 90% { opacity: 1; }
      100% { opacity: 0.3; }
    }
    @keyframes arrowPulse {
      0%, 40% { transform: translateY(0); }
      50%, 90% { transform: translateY(5px); }
      100% { transform: translateY(0); }
    }
    .strain-gauge { animation: resistChange 3s ease-in-out infinite; }
    .volt-indicator { animation: voltPulse 3s ease-in-out infinite; }
    .arrow-move { animation: arrowPulse 3s ease-in-out infinite; transform-origin: center; }
  </style>
  <text x="225" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">ホイートストンブリッジの動作（アニメーション）</text>
  
  <!-- ブリッジ回路 -->
  <line x1="225" y1="45" x2="100" y2="125" stroke="#333" stroke-width="2"/>
  <line x1="225" y1="45" x2="350" y2="125" stroke="#333" stroke-width="2"/>
  <line x1="100" y1="125" x2="225" y2="205" stroke="#333" stroke-width="2"/>
  <line x1="350" y1="125" x2="225" y2="205" stroke="#333" stroke-width="2"/>
  
  <!-- 抵抗 R1, R2, R4 (固定) -->
  <rect x="145" y="65" width="40" height="25" fill="#E3F2FD" stroke="#1565C0" stroke-width="1.5" rx="3"/>
  <text x="165" y="83" text-anchor="middle" font-size="10" fill="#1565C0" font-weight="bold">R₁</text>
  <rect x="265" y="65" width="40" height="25" fill="#E3F2FD" stroke="#1565C0" stroke-width="1.5" rx="3"/>
  <text x="285" y="83" text-anchor="middle" font-size="10" fill="#1565C0" font-weight="bold">R₂</text>
  <rect x="265" y="150" width="40" height="25" fill="#E3F2FD" stroke="#1565C0" stroke-width="1.5" rx="3"/>
  <text x="285" y="168" text-anchor="middle" font-size="10" fill="#1565C0" font-weight="bold">R₄</text>
  
  <!-- R3 (ひずみゲージ - 変化する) -->
  <rect x="145" y="150" width="40" height="25" class="strain-gauge" stroke="#F44336" stroke-width="2" rx="3"/>
  <text x="165" y="168" text-anchor="middle" font-size="10" fill="#C62828" font-weight="bold">R₃+ΔR</text>
  <text x="165" y="182" text-anchor="middle" font-size="8" fill="#F44336">ゲージ</text>
  
  <!-- 入力電圧 -->
  <text x="225" y="38" text-anchor="middle" font-size="10" fill="#333" font-weight="bold">V_in</text>
  <text x="225" y="222" text-anchor="middle" font-size="10" fill="#333">GND</text>
  
  <!-- 出力電圧線（点滅） -->
  <line x1="100" y1="125" x2="350" y2="125" stroke="#FF9800" stroke-width="2.5" class="volt-indicator"/>
  <circle cx="100" cy="125" r="5" fill="#FF9800" class="volt-indicator"/>
  <circle cx="350" cy="125" r="5" fill="#FF9800" class="volt-indicator"/>
  <text x="225" y="118" text-anchor="middle" font-size="11" fill="#FF9800" font-weight="bold" class="volt-indicator">V_out</text>
  
  <!-- 電圧計インジケータ -->
  <rect x="380" y="100" width="55" height="50" fill="#FFF8E1" stroke="#FFA000" stroke-width="1.5" rx="5"/>
  <text x="407" y="118" text-anchor="middle" font-size="8" fill="#F57C00">電圧計</text>
  <g class="arrow-move">
    <line x1="407" y1="128" x2="407" y2="140" stroke="#4CAF50" stroke-width="2"/>
    <polygon points="403,138 407,145 411,138" fill="#4CAF50"/>
  </g>
  <text x="407" y="145" text-anchor="middle" font-size="7" fill="#4CAF50" class="volt-indicator">↑ΔV</text>
  
  <!-- 説明 -->
  <text x="225" y="250" text-anchor="middle" font-size="10" fill="#757575">R₃が変化（ΔR）すると、ブリッジの平衡が崩れる</text>
  <text x="225" y="265" text-anchor="middle" font-size="10" fill="#FF9800">→ V_outが変化し、ひずみを検出できる</text>
</svg>

#### 平衡条件

ブリッジが**平衡**（$V_{out} = 0$）となる条件：

$$R_1 R_4 = R_2 R_3$$

#### 出力電圧

$$V_{out} = V_{in} \left(\frac{R_3}{R_1 + R_3} - \frac{R_4}{R_2 + R_4}\right)$$

::: tip 💡 ポイント
$R_1 = R_2 = R_3 = R_4 = R$ とし、$R_3$ のみひずみゲージで $R + \Delta R$ に変化した場合：

$$V_{out} \approx \frac{V_{in}}{4} \cdot \frac{\Delta R}{R} = \frac{V_{in}}{4} \cdot K\varepsilon$$
:::

::: details 演習：ホイートストンブリッジの計算
**問題**：$R_1 = R_2 = R_4 = 120\ \Omega$、$R_3 = 120.05\ \Omega$（ゲージ）、$V_{in} = 5$ V のとき、$V_{out}$ は？

**解答**：

$$V_{out} = 5 \left(\frac{120.05}{120 + 120.05} - \frac{120}{120 + 120}\right)$$

$$= 5 \left(\frac{120.05}{240.05} - \frac{120}{240}\right)$$

$$= 5 \left(0.50010 - 0.50000\right) = 5 \times 0.00010 \approx 0.52 \text{ [mV]}$$
:::

---

## 4. ゲージの種類と特徴

| 特性 | 金属線/箔ゲージ | 半導体ゲージ |
|------|---------------|-------------|
| **ゲージ率 $K$** | 約2 | 約100〜200 |
| **感度** | 高い | 超高感度 |
| **温度係数** | 小さい（安定） | 大きい（温度依存大） |
| **線形性** | 良好 | やや非線形 |
| **用途** | 汎用力計測 | 微小ひずみ検出 |

::: warning ⚠️ 温度補償
半導体ゲージは温度特性が大きいため、ブリッジ回路の**ダミーゲージ**（同一環境に設置した非計測用ゲージ）で温度補償を行います。
:::

---

## 5. トルクセンサ

### 5.1 ねじりモーメントとせん断ひずみ

::: info トルクセンサの原理
軸にねじりモーメント（トルク）$M_T$ が作用すると、表面に**せん断ひずみ**が発生します。このひずみをひずみゲージで検出します。
:::

<svg viewBox="0 0 450 160" xmlns="http://www.w3.org/2000/svg" style="max-width: 450px; margin: 20px auto; display: block;">
  <text x="225" y="18" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">トルクセンサの概念</text>
  <rect x="80" y="60" width="290" height="40" fill="#E3F2FD" stroke="#1565C0" stroke-width="2" rx="20"/>
  <text x="225" y="85" text-anchor="middle" font-size="11" fill="#1565C0" font-weight="bold">回転軸</text>
  <path d="M60,60 C40,70 40,90 60,100" fill="none" stroke="#F44336" stroke-width="2"/>
  <polygon points="58,56 68,60 60,66" fill="#F44336"/>
  <text x="40" y="85" text-anchor="end" font-size="10" fill="#F44336" font-weight="bold">M_T</text>
  <path d="M390,60 C410,70 410,90 390,100" fill="none" stroke="#F44336" stroke-width="2"/>
  <polygon points="392,104 382,100 390,94" fill="#F44336"/>
  <text x="415" y="85" font-size="10" fill="#F44336" font-weight="bold">M_T</text>
  <rect x="190" y="55" width="30" height="10" fill="#FF9800" stroke="#FF9800" stroke-width="1" rx="2" transform="rotate(45,205,60)"/>
  <text x="225" y="50" text-anchor="middle" font-size="9" fill="#FF9800">ゲージ（45°配置）</text>
  <text x="225" y="130" text-anchor="middle" font-size="10" fill="#333">ひずみゲージを軸表面に45°方向に貼付</text>
</svg>

### 5.2 トルクの公式

$$M_T = G\theta I_p$$

- $M_T$：ねじりモーメント（トルク）[N·m]
- $G$：せん断弾性係数（横弾性係数）[Pa]
- $\theta$：単位長さあたりのねじれ角 [rad/m]
- $I_p$：断面二次極モーメント [m⁴]

円形断面の場合：

$$I_p = \frac{\pi d^4}{32}$$

---

## 6. 演習問題

### 演習：ひずみゲージの総合問題

::: details 演習：応力からひずみゲージの出力まで
**問題**：鋼材（$E = 200$ GPa）の棒（断面積 $A = 50$ mm²）に 5 kN の引張荷重が作用している。ゲージ率 $K = 2.1$ のひずみゲージを用い、$V_{in} = 10$ V のホイートストンブリッジで検出するとき、出力電圧 $V_{out}$ を求めよ。

**解答**：

1. 応力：$\sigma = \dfrac{5000}{50 \times 10^{-6}} = 100 \times 10^6$ Pa $= 100$ MPa

2. ひずみ：$\varepsilon = \dfrac{\sigma}{E} = \dfrac{100 \times 10^6}{200 \times 10^9} = 5 \times 10^{-4}$

3. 抵抗変化率：$\dfrac{\Delta R}{R} = K\varepsilon = 2.1 \times 5 \times 10^{-4} = 1.05 \times 10^{-3}$

4. 出力電圧（1アクティブゲージ）：

$$V_{out} \approx \frac{V_{in}}{4} \cdot \frac{\Delta R}{R} = \frac{10}{4} \times 1.05 \times 10^{-3} = 2.625 \text{ [mV]}$$
:::

---

## 📝 確認問題

### Q1. フックの法則を正しく表す式は？

- [ ] A. σ = ε/E
- [x] B. σ = Eε
- [ ] C. ε = Eσ
- [ ] D. E = σ + ε

### Q2. ひずみゲージの出力で正しい関係式は？

- [x] A. ΔR/R = Kε
- [ ] B. ΔR/R = ε/K
- [ ] C. ΔR = Kε
- [ ] D. R = Kε

### Q3. ホイートストンブリッジの平衡条件は？

- [ ] A. R₁ + R₄ = R₂ + R₃
- [ ] B. R₁ / R₄ = R₂ / R₃
- [x] C. R₁R₄ = R₂R₃
- [ ] D. R₁R₃ = R₂ + R₄

### Q4. 半導体ゲージの特徴として正しいのは？

- [ ] A. ゲージ率が小さい
- [ ] B. 温度依存性が小さい
- [x] C. ゲージ率が非常に大きい（約100〜200）
- [ ] D. 線形性が金属ゲージより優れている

### Q5. トルクセンサでひずみゲージを軸表面に貼る角度は？

- [ ] A. 0°（軸方向）
- [x] B. 45°
- [ ] C. 90°（周方向）
- [ ] D. 180°

---

## 📚 次週の予習

- **第14週**: 圧力センサ
- 予習ポイント：圧力の定義、圧電効果、静電容量の基礎
