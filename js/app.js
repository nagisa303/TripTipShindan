let lineUserId = null;

(async function initLiff() {
  try {
    await liff.init({ liffId: '2010379366-QgWEhDtI' });
    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile();
      lineUserId = profile.userId;
    } else {
      liff.login();
    }
  } catch (e) {
    console.error('LIFF初期化エラー:', e);
  }
})();

async function sendResultToLine(result) {
  if (!lineUserId) return;

  try {
    await fetch('https://official-line-ai.vercel.app/diagnosis-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-diagnosis-secret': 'anycafe-diag-secret',
      },
      body: JSON.stringify({
        userId:     lineUserId,
        numeral:    result.numeral,
        category:   result.category,
        prefecture: result.prefecture,
        spot:       result.spot,
        url:        result.url,
        image:      'https://trip-tip-test-vo6i.vercel.app/' + result.image.replace(/^\.\//, ''),
      }),
    });
  } catch (e) {
    console.error('送信エラー:', e);
  }
}

let currentQuestionId = "q1";
let answers = [];

function init() {
  showScreen("top");
  document.getElementById("start-btn").addEventListener("click", startDiagnosis);
  document.getElementById("retry-btn").addEventListener("click", restartDiagnosis);
}

function startDiagnosis() {
  currentQuestionId = "q1";
  answers = [];
  renderQuestion("q1");
  showScreen("question");
}

function restartDiagnosis() {
  currentQuestionId = "q1";
  answers = [];
  showScreen("top");
}

function answer(value) {
  answers.push({ questionId: currentQuestionId, value });
  const current = QUESTIONS[currentQuestionId];
  const next = value === "yes" ? current.yes : current.no;

  if (next.startsWith("result")) {
    const resultId = parseInt(next.replace("result", ""), 10);
    renderResult(resultId);
    showScreen("result");
  } else {
    currentQuestionId = next;
    renderQuestion(currentQuestionId);
  }
}

function renderQuestion(questionId) {
  const q = QUESTIONS[questionId];

  document.getElementById("progress-text").textContent = q.progress + " / 3";
  document.querySelectorAll(".progress-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i < q.progress);
  });

  const textEl = document.getElementById("question-text");
  textEl.textContent = q.text;
  textEl.classList.remove("fade-in");
  void textEl.offsetWidth;
  textEl.classList.add("fade-in");
}

function openYouTubeApp(youtubeUrl) {
  const videoIdMatch = youtubeUrl.match(/[?&]v=([^&]+)/);
  if (!videoIdMatch) {
    window.open(youtubeUrl, '_blank');
    return;
  }

  const videoId = videoIdMatch[1];
  const timeMatch = youtubeUrl.match(/[?&]t=(\d+)/);
  const time = timeMatch ? timeMatch[1] : null;

  if (/Android/i.test(navigator.userAgent)) {
    // intent:// スキームはアプリ未インストール時に browser_fallback_url へ自動遷移
    const fallback = encodeURIComponent(youtubeUrl);
    window.location.href =
      `intent://www.youtube.com/watch?v=${videoId}${time ? '&t=' + time : ''}` +
      `#Intent;package=com.google.android.youtube;scheme=https;S.browser_fallback_url=${fallback};end`;
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // vnd.youtube: スキームを試み、アプリが開かなければブラウザへフォールバック
    const appUrl = 'vnd.youtube:' + videoId + (time ? '?t=' + time : '');
    let appOpened = false;
    function onVisChange() {
      if (document.hidden) appOpened = true;
    }
    document.addEventListener('visibilitychange', onVisChange);
    window.location.href = appUrl;
    setTimeout(() => {
      document.removeEventListener('visibilitychange', onVisChange);
      if (!appOpened) window.open(youtubeUrl, '_blank');
    }, 1500);
  } else {
    window.open(youtubeUrl, '_blank');
  }
}

function renderResult(resultId) {
  const result = RESULTS.find(r => r.id === resultId);
  if (!result) return;

  document.getElementById("result-category").textContent = result.numeral + " " + result.category;

  const card = document.getElementById("destination-card");
  card.href = result.url;
  card.onclick = function(e) {
    e.preventDefault();
    openYouTubeApp(result.url);
  };

  const img = document.getElementById("result-img");
  img.src = result.image;
  img.alt = result.prefecture + " " + result.spot + "のサムネイル";

  document.getElementById("result-prefecture").textContent = result.prefecture;
  document.getElementById("result-spot").textContent = result.spot;

  const videoBtn = document.getElementById("video-btn");
  videoBtn.href = result.url;
  videoBtn.onclick = function(e) {
    e.preventDefault();
    openYouTubeApp(result.url);
  };

  sendResultToLine(result);
}

function showScreen(name) {
  ["top", "question", "result"].forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (s === name) {
      el.hidden = false;
      el.classList.remove("screen-enter");
      void el.offsetWidth;
      el.classList.add("screen-enter");
    } else {
      el.hidden = true;
      el.classList.remove("screen-enter");
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
