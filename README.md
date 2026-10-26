# YI CI LIAO｜個人作品集

這是一份可直接部署至 GitHub Pages 的完整靜態網站，包含首頁與三個專案內頁，不需要安裝套件、執行建置或設定 API 金鑰。

## 使用方式

1. 先解壓縮 ZIP；不要只把 ZIP 檔上傳到 GitHub。
2. 建立自己的 GitHub repository，例如 `portfolio`。使用 GitHub Free 時，供 Pages 使用的 repository 須為 Public。
3. 將解壓後的所有檔案與 `assets` 資料夾上傳到 repository，保留資料夾結構。`index.html` 應直接位於 repository 根目錄，避免多包一層資料夾。
4. 保留根目錄的 `.nojekyll`。若檔案總管沒有顯示它，可在 GitHub 網頁建立一個名為 `.nojekyll` 的空白檔案。
5. 進入 repository 的 **Settings → Pages**。
6. 在 **Build and deployment → Source** 選擇 **Deploy from a branch**。
7. Branch 選擇 **main**，Folder 選擇 **/(root)**，按 **Save**。
8. 等 GitHub 完成部署後，從 Pages 頁面開啟正式網址。

一般專案網址為 `https://你的帳號.github.io/portfolio/`；若 repository 命名為 `你的帳號.github.io`，則使用帳號根網址。

可以透過 GitHub Desktop、Git 指令或網頁分批上傳；使用網頁上傳時，請特別確認 `assets` 底下各子資料夾的位置正確。

## 使用 Git 指令上傳（可選）

在解壓後、含有 `index.html` 的資料夾開啟終端機。先建立一個空的 GitHub repository，再執行：

```bash
git init
git add .
git commit -m "Publish portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

將 `YOUR_USERNAME` 與 `YOUR_REPOSITORY` 換成自己的帳號及 repository 名稱。GitHub 的登入與認證由你在本機完成，不需要把任何密碼或 token 放入網站檔案。

## 頁面與資源

- `index.html`：首頁。
- `project-futures.html`：FuturesWarbler。
- `project-ai.html`：小魔法師米羅的開學日。
- `project-regular.html`：Regular。
- `assets/`：網站圖片與圖示。
- 根目錄 CSS／JavaScript：版型及頁面互動。
- `PRIVACY_REVIEW.md`：本次公開資訊檢查結果。

網站使用相對路徑，適用於 GitHub Pages 的 repository 子路徑。YouTube 影片與獲獎資訊連結仍連向各自的外部服務，需要網路連線。

## 公開範圍

這個匯出版本沒有原先網站的僅本人可見機制。GitHub Pages 一般會公開網站內容，repo 設為 Private 也不等於 Pages 網站自動保密。

原有 `noindex,nofollow` 設定已保留，但它只是對搜尋引擎的指示，不是登入或存取限制。知道網址的人仍可瀏覽，網站素材也能被下載。

上傳前請閱讀 `PRIVACY_REVIEW.md`。原本各頁的版權聲明已保留；此匯出檔沒有另行授予程式、照片、商標或團隊作品的開放授權。

## 官方說明

- [設定 GitHub Pages 發布來源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [建立 GitHub Pages 網站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

匯出日期：2026-10-22。
