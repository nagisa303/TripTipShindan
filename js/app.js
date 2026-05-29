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

function renderResult(resultId) {
  const result = RESULTS.find(r => r.id === resultId);
  if (!result) return;

  document.getElementById("result-category").textContent = result.numeral + " " + result.category;

  const card = document.getElementById("destination-card");
  card.href = result.url;

  const img = document.getElementById("result-img");
  img.src = result.image;
  img.alt = result.prefecture + " " + result.spot + "のサムネイル";

  document.getElementById("result-prefecture").textContent = result.prefecture;
  document.getElementById("result-spot").textContent = result.spot;

  const videoBtn = document.getElementById("video-btn");
  videoBtn.href = result.url;

  const resultScreen = document.getElementById("screen-result");
  resultScreen.classList.remove("fade-in");
  void resultScreen.offsetWidth;
  resultScreen.classList.add("fade-in");
}

function showScreen(name) {
  document.getElementById("screen-top").hidden = name !== "top";
  document.getElementById("screen-question").hidden = name !== "question";
  document.getElementById("screen-result").hidden = name !== "result";
}

document.addEventListener("DOMContentLoaded", init);
