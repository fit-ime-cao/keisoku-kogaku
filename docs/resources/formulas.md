# 公式集

計測工学で使用する重要な公式をまとめています。

---

## 統計処理

### 平均値
$$\bar{x} = \frac{1}{N}\sum_{i=1}^{N}x_i$$

### 分散
$$\sigma^2 = \frac{1}{N}\sum_{i=1}^{N}(x_i - \bar{x})^2$$

### 標準偏差
$$\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \bar{x})^2}$$

### 相関係数
$$r = \frac{\sum(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum(x_i-\bar{x})^2}\sqrt{\sum(y_i-\bar{y})^2}}$$

---

## 信号処理

### サンプリング定理
$$f_s \geq 2f_{max}$$

### 量子化ステップ
$$\Delta = \frac{V_{max} - V_{min}}{2^n}$$

---

## センサ関連

### ゲージ率
$$\frac{\Delta R}{R} = K \cdot \varepsilon$$

### ヤング率
$$\sigma = E \cdot \varepsilon$$

### 静電容量
$$C = \varepsilon_0 \varepsilon_r \frac{A}{d}$$

### 角度分解能（エンコーダ）
$$\theta_{res} = \frac{360°}{N}$$

---

## 座標変換

### 回転行列（Z軸まわり）
$$R_z(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{pmatrix}$$
