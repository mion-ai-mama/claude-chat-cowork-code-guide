/**
 * ============================================================
 * script.js — ページの動き（コピー機能・アニメーションなど）
 * ============================================================
 * このファイルは基本的に編集不要です。
 * 文章を変更したい場合は js/content.js を編集してください。
 * ============================================================
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     文字のエスケープ（安全にHTMLへ差し込むための処理）
  ------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ------------------------------------------------------------
     SEO・OGP・favicon の反映
     ※ 検索エンジンやSNSのクローラーはJavaScriptを実行しない場合があるため、
     　 description / OGP画像などは index.html の <head> 内も
     　 あわせて書き換えることをおすすめします（README参照）。
  ------------------------------------------------------------ */
  function applyMeta(m) {
    if (!m) return;
    document.title = m.pageTitle;
    setMetaContent('meta[name="description"]', m.description);
    setMetaContent('meta[property="og:title"]', m.pageTitle);
    setMetaContent('meta[property="og:description"]', m.description);
    setMetaContent('meta[property="og:image"]', m.ogpImage);
    setMetaContent('meta[property="og:url"]', m.siteUrl);
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && m.faviconPath) favicon.setAttribute("href", m.faviconPath);
  }

  function setMetaContent(selector, value) {
    if (value == null) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute("content", value);
  }

  /* ------------------------------------------------------------
     ファーストビュー
  ------------------------------------------------------------ */
  function renderHero(c) {
    const root = document.getElementById("hero");
    if (!root || !c) return;
    root.querySelector(".hero__label").textContent = c.label;
    root.querySelector(".hero__title").innerHTML = `${c.titleLine1}<br>${c.titleLine2}`;
    root.querySelector(".hero__subtitle").innerHTML = `${c.subtitleLine1}<br>${c.subtitleLine2}`;
    root.querySelector(".hero__desc").innerHTML = c.description;
    const btn = root.querySelector(".btn");
    btn.textContent = c.buttonText;
    btn.setAttribute("href", "#" + c.buttonScrollTargetId);
  }

  function renderQuickNav(items) {
    const root = document.getElementById("quick-nav");
    if (!root || !items) return;
    root.innerHTML = items
      .map((item) => `<a class="quick-nav__link" href="#${item.targetId}" data-scroll>${escapeHtml(item.label)}</a>`)
      .join("");
  }

  /* ------------------------------------------------------------
     はじめに／著者タグ
  ------------------------------------------------------------ */
  function renderIntro(c) {
    const root = document.getElementById("intro");
    if (!root || !c) return;
    root.querySelector(".prose").innerHTML = c.paragraphs.map((p) => `<p>${p}</p>`).join("");
  }

  function renderAuthor(c) {
    const root = document.getElementById("author-tag");
    if (!root || !c) return;
    root.innerHTML = `<strong>${escapeHtml(c.name)}</strong>${escapeHtml(c.bio)}`;
  }

  /* ------------------------------------------------------------
     まずは30秒で違いを理解
  ------------------------------------------------------------ */
  function renderOverview(c) {
    const root = document.getElementById("overview");
    if (!root || !c) return;
    root.querySelector(".section__heading").innerHTML = c.heading;

    const grid = document.getElementById("overview-grid");
    grid.innerHTML = c.cards
      .map(
        (card) => `
      <div class="overview-card">
        <p class="overview-card__name">${escapeHtml(card.name)}</p>
        <span class="overview-card__badge">${escapeHtml(card.badge)}</span>
        <ul class="overview-card__cases">${card.cases.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <p class="overview-card__phrase">${escapeHtml(card.phrase)}</p>
      </div>`
      )
      .join("");

    const box = document.getElementById("decision-box");
    const d = c.decisionBox;
    box.innerHTML =
      `<p class="decision-box__heading">${d.heading}</p><div class="decision-box__rows">` +
      d.rows
        .map((row) => `<div class="decision-box__row"><span>${escapeHtml(row.question)}</span><span class="decision-box__arrow">${escapeHtml(row.answer)}</span></div>`)
        .join("") +
      `</div>`;

    document.getElementById("plan-note").innerHTML = c.planNote;
  }

  /* ------------------------------------------------------------
     活用例リスト（Chat / Cowork / Code 共通）
  ------------------------------------------------------------ */
  function buildExampleListHtml(examples) {
    return examples
      .map((ex, i) => {
        const body = ex.quote
          ? `<p class="example-list__quote">${ex.quote}</p>`
          : `<p class="example-list__detail">${ex.detail}</p>`;
        return `<li><span class="example-list__number">${i + 1}</span><div><p class="example-list__title">${ex.title}</p>${body}</div></li>`;
      })
      .join("");
  }

  /* ------------------------------------------------------------
     Chat｜一緒に考える
  ------------------------------------------------------------ */
  function renderChat(c) {
    const root = document.getElementById("chat");
    if (!root || !c) return;
    root.querySelector(".topic-eyebrow").textContent = c.eyebrow;
    root.querySelector(".topic-heading").innerHTML = c.heading;
    root.querySelector(".prose").innerHTML = c.intro.map((p) => `<p>${p}</p>`).join("");
    document.getElementById("chat-examples-heading").innerHTML = c.examplesHeading;
    document.getElementById("chat-examples").innerHTML = buildExampleListHtml(c.examples);

    renderPromptBox("chat-prompt", c.prompt);
  }

  function renderPromptBox(sectionId, p) {
    const root = document.getElementById(sectionId);
    if (!root || !p) return;
    root.querySelector(".section__heading").innerHTML = p.heading;
    const descEl = root.querySelector(".section__desc");
    if (descEl && p.description) descEl.innerHTML = p.description;
    const textEl = root.querySelector(".prompt-box__text");
    textEl.textContent = p.promptText;
    const btn = root.querySelector(".copy-btn");
    btn.querySelector(".copy-btn__label").textContent = p.buttonText;
    btn.querySelector(".copy-btn__done").textContent = p.copiedText;

    let noteEl = root.querySelector(".note-box");
    if (p.note) {
      if (!noteEl) {
        noteEl = document.createElement("div");
        noteEl.className = "note-box";
        root.querySelector(".section__inner").appendChild(noteEl);
      }
      noteEl.innerHTML = `<p class="note-box__label">${escapeHtml(p.note.label)}</p><p>${p.note.text}</p>`;
    } else if (noteEl) {
      noteEl.remove();
    }
  }

  /* ------------------------------------------------------------
     Cowork｜面倒な仕事を任せる
  ------------------------------------------------------------ */
  function renderCowork(c) {
    const root = document.getElementById("cowork");
    if (!root || !c) return;
    root.querySelector(".topic-eyebrow").textContent = c.eyebrow;
    root.querySelector(".topic-heading").innerHTML = c.heading;
    root.querySelector(".prose").innerHTML = c.intro.map((p) => `<p>${p}</p>`).join("");

    document.getElementById("cowork-examples-heading").innerHTML = c.examplesHeading;
    document.getElementById("cowork-example-list").innerHTML = buildExampleListHtml(c.examples);

    renderPromptBox("cowork-prompt", c.prompt);

    const safetyRoot = document.getElementById("cowork-safety");
    const s = c.safety;
    if (safetyRoot && s) {
      safetyRoot.querySelector(".section__heading").innerHTML = s.heading;
      const proseEls = safetyRoot.querySelectorAll(".prose p");
      if (proseEls[0]) proseEls[0].innerHTML = `<strong>${s.stepHeading}</strong>`;
      if (proseEls[1]) proseEls[1].innerHTML = s.stepText;
      const noteBoxes = safetyRoot.querySelectorAll(".note-box");
      if (noteBoxes[0]) {
        noteBoxes[0].innerHTML =
          `<p class="note-box__label">${escapeHtml(s.dontHeading)}</p><ul class="dont-list">` +
          s.dontList.map((item) => `<li>${escapeHtml(item)}</li>`).join("") +
          `</ul>`;
      }
      if (noteBoxes[1] && s.note) {
        noteBoxes[1].innerHTML = `<p class="note-box__label">${escapeHtml(s.note.label)}</p><p>${s.note.text}</p>`;
      }
    }
  }

  /* ------------------------------------------------------------
     Code｜自動化を作る
  ------------------------------------------------------------ */
  function renderCode(c) {
    const root = document.getElementById("code");
    if (!root || !c) return;
    root.querySelector(".topic-eyebrow").textContent = c.eyebrow;
    root.querySelector(".topic-heading").innerHTML = c.heading;
    root.querySelector(".prose").innerHTML = c.intro.map((p) => `<p>${p}</p>`).join("");

    document.getElementById("code-examples-heading").innerHTML = c.examplesHeading;
    document.getElementById("code-example-list").innerHTML = buildExampleListHtml(c.examples);

    renderPromptBox("code-prompt", c.prompt);
  }

  /* ------------------------------------------------------------
     CoworkとCodeの違い
  ------------------------------------------------------------ */
  function renderCompare(c) {
    const root = document.getElementById("compare");
    if (!root || !c) return;
    root.querySelector(".section__heading").innerHTML = c.heading;
    const cards = root.querySelectorAll(".compare-card");
    [c.cowork, c.code].forEach((data, i) => {
      const card = cards[i];
      if (!card) return;
      card.querySelector(".compare-card__label").textContent = data.label;
      card.querySelector(".compare-card__phrase").textContent = data.phrase;
      card.querySelector(".compare-card__example").textContent = "例：" + data.example;
      card.querySelector(".compare-card__result").textContent = data.result;
    });
    root.querySelector(".compare-summary").innerHTML = `${c.summaryTop}<br>${c.summaryBottom}`;
    root.querySelector(".compare-note").textContent = c.note;
  }

  /* ------------------------------------------------------------
     結局どれを使えばいい？
  ------------------------------------------------------------ */
  function renderWhich(c) {
    const root = document.getElementById("which");
    if (!root || !c) return;
    root.querySelector(".section__heading").innerHTML = c.heading;
    const list = root.querySelector(".qa-list");
    list.innerHTML = c.qa
      .map((item) => `<li><p class="qa-list__q">${escapeHtml(item.q)}</p><p class="qa-list__a">→ ${escapeHtml(item.a)}</p></li>`)
      .join("");

    document.getElementById("ask-claude-heading").innerHTML = c.askClaude.heading;
    const promptText = document.getElementById("ask-claude-prompt-text");
    promptText.textContent = c.askClaude.promptText;
    const btn = root.querySelectorAll(".copy-btn")[0];
    if (btn) {
      btn.querySelector(".copy-btn__label").textContent = c.askClaude.buttonText;
      btn.querySelector(".copy-btn__done").textContent = c.askClaude.copiedText;
    }
  }

  /* ------------------------------------------------------------
     今日やること
  ------------------------------------------------------------ */
  function renderToday(c) {
    const root = document.getElementById("today");
    if (!root || !c) return;
    root.querySelector(".section__heading").innerHTML = c.heading;
    root.querySelector(".section__desc").textContent = c.subheading;
    const list = root.querySelector(".todo-list");
    list.innerHTML = c.items
      .map((item) => `<li><label><input type="checkbox"><span>${escapeHtml(item)}</span></label></li>`)
      .join("");
    root.querySelector(".todo-list__foot").innerHTML = c.footNote;
  }

  /* ------------------------------------------------------------
     AIを使えるだけでは収入にはならない
  ------------------------------------------------------------ */
  function renderClosing(c) {
    const root = document.getElementById("closing");
    if (!root || !c) return;
    root.querySelector(".section__heading").innerHTML = c.heading;
    root.querySelector(".prose").innerHTML = c.paragraphs.map((p) => `<p>${p}</p>`).join("");
  }

  /* ------------------------------------------------------------
     最後の案内（CTA）
  ------------------------------------------------------------ */
  function renderCta(c) {
    const root = document.getElementById("cta");
    if (!root || !c) return;
    root.querySelector(".cta-card__heading").innerHTML = c.heading;
    const [p1, p2, p3] = c.paragraphs;
    const prose = root.querySelector(".prose");
    prose.innerHTML =
      `<p>${p1}</p><p>${p2}</p>` +
      `<p>${p3}<br><strong class="cta-card__highlight">${c.highlightText}</strong><br>${c.afterHighlight}</p>`;
    const btn = document.getElementById("cta-button");
    btn.setAttribute("href", c.buttonUrl);

    if (c.bannerImage) {
      btn.classList.remove("btn", "btn--primary", "btn--large");
      btn.classList.add("cta-card__banner-link");
      btn.innerHTML = `<img src="${c.bannerImage}" alt="${escapeHtml(c.bannerAlt || c.buttonText)}" class="cta-card__banner-img">`;
      const img = btn.querySelector("img");
      img.addEventListener(
        "error",
        () => {
          // 画像が読み込めなかった場合は、安全のため通常のテキストボタンに戻す
          btn.classList.remove("cta-card__banner-link");
          btn.classList.add("btn", "btn--primary", "btn--large");
          btn.textContent = c.buttonText;
        },
        { once: true }
      );
    } else {
      btn.classList.remove("cta-card__banner-link");
      btn.classList.add("btn", "btn--primary", "btn--large");
      btn.textContent = c.buttonText;
    }
  }

  /* ------------------------------------------------------------
     フッター
  ------------------------------------------------------------ */
  function renderFooter(c) {
    const root = document.querySelector(".footer");
    if (!root || !c) return;
    root.innerHTML = `<p>${c.copyright}</p><p>${c.notice}</p>`;
  }

  /* ------------------------------------------------------------
     コピー機能（クリップボードAPI／古いブラウザ向けの代替あり）
  ------------------------------------------------------------ */
  function legacyCopy(text) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch (e) {
      return false;
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        () => true,
        () => legacyCopy(text)
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function bindCopyDelegation() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".copy-btn[data-copy-target]");
      if (!btn) return;
      const target = document.getElementById(btn.getAttribute("data-copy-target"));
      if (!target) return;
      copyText(target.textContent).then((ok) => {
        if (!ok) return;
        btn.classList.add("is-copied");
        window.clearTimeout(btn._copyTimeout);
        btn._copyTimeout = window.setTimeout(() => btn.classList.remove("is-copied"), 2200);
      });
    });
  }

  /* ------------------------------------------------------------
     スクロールで軽くフェードインする演出
  ------------------------------------------------------------ */
  function setupRevealAnimation() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------
     初期化
     content.js が正しく読み込めた場合のみ、内容を反映します。
     content.js が読み込めなかった場合は、index.html に書かれている
     初期文章がそのまま表示されます（ページが真っ白になりません）。
  ------------------------------------------------------------ */
  function init() {
    if (typeof CONTENT !== "undefined") {
      try {
        applyMeta(CONTENT.meta);
        renderHero(CONTENT.hero);
        renderQuickNav(CONTENT.quickNav);
        renderIntro(CONTENT.intro);
        renderAuthor(CONTENT.author);
        renderOverview(CONTENT.overview);
        renderChat(CONTENT.chat);
        renderCowork(CONTENT.cowork);
        renderCode(CONTENT.code);
        renderCompare(CONTENT.compare);
        renderWhich(CONTENT.which);
        renderToday(CONTENT.today);
        renderClosing(CONTENT.closing);
        renderCta(CONTENT.cta);
        renderFooter(CONTENT.footer);
      } catch (err) {
        // content.js の書き方に誤りがある場合はここに来ます。
        // index.html に書かれた初期文章がそのまま表示されるので、ページは壊れません。
        console.error("content.js の反映中にエラーが発生しました。index.html の初期内容を表示しています。", err);
      }
    }
    bindCopyDelegation();
    setupRevealAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
