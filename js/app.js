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
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (!isMobile) {
    window.open(youtubeUrl, '_blank');
    return;
  }

  const videoIdMatch = youtubeUrl.match(/[?&]v=([^&]+)/);
  if (!videoIdMatch) {
    window.open(youtubeUrl, '_blank');
    return;
  }

  const videoId = videoIdMatch[1];
  const timeMatch = youtubeUrl.match(/[?&]t=(\d+)/);
  const appUrl = 'vnd.youtube:' + videoId + (timeMatch ? '?t=' + timeMatch[1] : '');

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
