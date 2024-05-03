# Study Friend

## What is it
專為電腦設計的待機畫面，馬上來[這裡](https://cjchang925.github.io/study-friend/edit)體驗看看！

## Develop and Deploy on Local Environment

- 將專案 clone 到本地

```bash
git clone git@github.com:cjchang925/study-friend.git
```

- 建立本地伺服器以進行開發，請先安裝 npm 與 angular-cli 以順利執行指令

```bash
cd study-friend
npm i --legacy-peer-deps
ng serve
```

- 自動部署至 GitHub gh-pages 靜態網頁伺服器

```bash
npm run deploy
```

這個指令會編譯網頁並將生成的檔案移至 remote `gh-pages` 這個 branch，請到 GitHub 設定 gh-pages 伺服器部署設定，選擇 deploy from branch 並指向 `gh-pages`，即可進行自動化部署。

**歡迎所有 pull request 與 issue，共同讓這個網站變得更好！**
