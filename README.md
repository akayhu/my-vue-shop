# 好物選物 STORE

一個具備完整會員系統、購物車、訂單流程的 3C 週邊電商前端專案。從商品瀏覽、搜尋、登入驗證到結帳下單，涵蓋真實電商網站的核心使用者流程。

**線上展示**：`（部署後補上網址）`

## 功能特色

- 🏠 **首頁**：Hero 區塊、熱門分類導覽、最新上架商品預覽
- 🔍 **搜尋列表頁**：關鍵字搜尋，搜尋結果與網址同步（可分享、可上一頁）
- 📦 **商品詳細頁**：規格資訊、加入購物車、（登入後）可下架商品
- 🛒 **購物車**：跨頁面共用狀態、本地持久化、依帳號各自獨立保存
- 🔐 **會員系統**：JWT 登入驗證、受保護路由自動導向登入頁並記住原本要去的頁面
- 📝 **訂單建立**：結帳送出訂單，串接後端資料庫

## 技術棧

| 分類 | 技術 |
|---|---|
| 前端框架 | Vue 3（Composition API）+ Vite |
| 路由 | Vue Router 4（含導航守衛） |
| HTTP 客戶端 | Axios |
| 狀態管理 | 自製 Composables（`useAuth`、`useCart`） |
| 樣式 | 原生 CSS + 自訂設計系統（無 UI 框架） |
| 後端 | Node.js + Express |
| 資料庫 | SQLite + Prisma ORM |
| 認證 | JWT（jsonwebtoken）+ bcrypt 密碼雜湊 |

## 專案結構

src/
├── api.js # 集中管理後端 API 網址
├── main.js
├── App.vue # 骨架：NavBar + RouterView
├── style.css # 全域設計系統（色彩／字體）
├── router/
│ └── index.js # 路由設定與登入守衛
├── composables/
│ ├── useAuth.js # 登入狀態（跨元件共用）
│ └── useCart.js # 購物車（跨帳號、持久化）
├── components/
│ ├── NavBar.vue
│ ├── ProductCard.vue
│ ├── LoginForm.vue
│ └── AddProduct.vue
└── views/
├── HomeView.vue
├── ProductListView.vue
├── ProductDetailView.vue
├── CartView.vue
├── LoginView.vue
└── SellerView.vue # 受保護頁面示範


## 開始使用

### 前置需求

需要先啟動後端 API（獨立專案，見 [my-first-node-app](../my-first-node-app)），確認跑在 `http://localhost:3000`。

### 安裝與啟動

```bash
npm install
```

在專案根目錄建立 `.env`： VITE_API_URL=http://localhost:3000


啟動開發伺服器：

```bash
npm run dev
```

打開瀏覽器訪問 `http://localhost:5173`。

## 設計說明

視覺走「零件目錄」風格，取代常見的暖色系或陰影卡片樣板：髮絲細線分隔、細窄邊框卡片、等寬字體標示價格（呼應規格標籤的質感）。

- 標題字體：Space Grotesk
- 內文字體：Inter
- 價格字體：IBM Plex Mono

## 已知限制 / 未來可優化方向

- 訂單目前以 JSON 字串存進單一欄位，正式專案會拆成獨立的 `OrderItem` 資料表
- 商品圖片以色塊代替，尚未串接真實圖床
- 尚未實作訂單查詢頁面（後端 API 已備妥 `GET /orders`）

## License

MIT