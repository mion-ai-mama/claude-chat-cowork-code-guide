# Claude Chat・Cowork・Code 在宅ワーク活用ガイド

Instagramリールのフォロワーに無料配布する特典ページです。GitHub Pagesで無料公開しています。
[`instagram-tokuten-template`](https://github.com/mion-ai-mama/instagram-tokuten-template) を
「Use this template」で複製して作成した、このガイド専用のリポジトリです。

このREADMEは、パソコンの操作にあまり詳しくない方でも迷わないように、
専門用語をできるだけ避けて説明しています。

---

## 目次

1. [このページの内容](#1-このページの内容)
2. [変更するファイル](#2-変更するファイル)
3. [content.js の編集方法](#3-contentjs-の編集方法)
4. [CTAリンクの変更方法](#4-ctaリンクの変更方法)
5. [GitHub Pagesで公開する方法](#5-github-pagesで公開する方法)
6. [よくあるエラーと対処方法](#6-よくあるエラーと対処方法)
7. [今後の運用でやること（TODO）](#7-今後の運用でやることtodo)

---

## 1. このページの内容

ClaudeのChat・Cowork・Codeという3つの使い方を、AI初心者さん（40〜50代・在宅ワーク未経験）向けに
やさしく解説する1ページ完結のガイドです。ページの流れは次の通りです。

はじめに → 30秒で違いを理解 → Chat（説明・活用例・プロンプト）→ Cowork（説明・活用例・
プロンプト・使う前の注意）→ Code（説明・CoworkとCodeの違い・活用例・プロンプト）→
結局どれを使えばいい？ → 今日やること（チェックリスト）→ まとめ → CTA

各セクションの文章は `js/content.js` の `CONTENT` オブジェクトにすべてまとまっています。

---

## 2. 変更するファイル

新しい情報に更新したいとき、**基本的に触るのは1つだけ**です。

| ファイル | 説明 | 編集頻度 |
|---|---|---|
| `js/content.js` | ページの文章・プロンプト・リンクをまとめたファイル | 更新のたびに編集する |
| `assets/images/` | 画像ファイルの置き場所 | 必要なときだけ |
| `index.html` の `<head>` 内 | SEO用の説明文（検索結果に出る文章） | できれば毎回確認 |
| `css/style.css` | 色やデザイン | 編集不要 |
| `js/script.js` | ページの動き（コピー機能・表示の組み立てなど） | 編集不要 |

---

## 3. content.js の編集方法

`js/content.js` をテキストエディタ（メモ帳や、GitHub上の鉛筆アイコンでも可）で開くと、
日本語の文章がたくさん並んでいます。

```js
hero: {
  label: "AI初心者さん向け",
  titleLine1: "Claude Chat・Cowork・Code",
  titleLine2: "在宅ワーク使い分け完全ガイド",
  ...
```

`"　　"`（ダブルクォーテーションで囲まれた部分）の中の日本語だけを書き換えてください。

**触ってはいけない部分**：`:`（コロン）／ `,`（カンマ）／ `{ }`（波かっこ）／ `[ ]`（角かっこ）／
`<br>` `<strong>`（タグ。残したまま前後の文字だけ変えればOK）

構成は次の通りです（それぞれの中の文章だけ書き換えればOKです）。

| キー | 内容 |
|---|---|
| `meta` | ページタイトル・検索結果の説明文・OGP画像 |
| `hero` | ファーストビューのタイトル・サブタイトル |
| `intro` | はじめにの文章 |
| `author` | 著者プロフィール（名前・一言） |
| `overview` | 「30秒で違いを理解」の3カード・「迷ったらこの3つ」ボックス |
| `chat` / `cowork` / `code` | それぞれの説明・活用例(5つ)・コピー用プロンプト |
| `cowork.safety` | Coworkを使う前の注意（専用フォルダ・入れないもの） |
| `compare` | CoworkとCodeの比較図解 |
| `which` | 「結局どれを使えばいい？」のQ&Aと最終プロンプト |
| `today` | 「今日やること」チェックリスト |
| `closing` | まとめの文章 |
| `cta` | 最後の案内（LINE誘導） |
| `footer` | フッター表記 |

書き換えたら保存して、`index.html` をブラウザで開けば反映を確認できます。

---

## 4. CTAリンクの変更方法

ページ最後の案内ボタンのリンク先は、`content.js` の `cta.buttonUrl` の**1か所だけ**を
変更すれば反映されます。

```js
cta: {
  ...
  buttonUrl: "https://sub.aione.co.jp/line/open/...", // ← LINE登録URL
  bannerImage: "assets/images/cta-banner.png",
  bannerAlt: "（バナー画像の内容を説明する文章）",
},
```

---

## 5. GitHub Pagesで公開する方法

1. GitHubでこのリポジトリを開く
2. 上部メニューの **「Settings」** → 左側メニューの **「Pages」**
3. 「Build and deployment」の「Source」で **「Deploy from a branch」** を選ぶ
4. 「Branch」で **「main」** と **「/ (root)」** を選び、「Save」をクリック
5. 数分待つと、ページ上部に公開URLが表示されます
   （例：`https://mion-ai-mama.github.io/claude-chat-cowork-code-guide/`）

> 💡 このリポジトリに変更をpushするたびに、GitHub Pagesは自動で更新されます。

---

## 6. よくあるエラーと対処方法

| 症状 | 原因の可能性 | 対処方法 |
|---|---|---|
| ページが真っ白になる | `content.js` の書き方に誤り（カンマの消し忘れなど） | 直前に保存した内容に戻し、1か所ずつ変更して確認する |
| 文章が反映されない | ブラウザのキャッシュが残っている | 強制リロードする |
| コピーボタンが反応しない | ページを`file://`で直接開いている | GitHub Pages公開後のURL（`https://`）で確認する |
| 画像が表示されない | ファイル名の大文字・小文字違い | `assets/images/` 内の実際のファイル名と `content.js` の記載を見比べる |
| 公開URLが404になる | GitHub Pagesの設定がまだ反映されていない | 数分待ってから再度アクセスする |

---

## 7. 今後の運用でやること（TODO）

- [ ] このガイド専用のOGP画像（SNSシェア用の画像）を用意し、`content.js` の `meta.ogpImage` を
      差し替える（現在はCTAバナー画像を仮で流用しています）
- [ ] Claude公式の仕様（料金・プラン・対応OS等）は変更される可能性があるため、
      定期的に [claude.com/pricing](https://claude.com/pricing) と
      [claude.com/product/cowork](https://claude.com/product/cowork) で内容を見直す

---

## 技術的なメモ（参考情報）

- ビルド（変換作業）は一切不要です。HTML・CSS・JavaScriptだけで動く「静的サイト」です
- React・Next.js・Vue・データベース・サーバーは使用していません
- フォントは各OS標準のシステムフォントを使用しています（追加読み込みなし）
