const $ = (sel) => document.querySelector(sel);

const form = $("#briefForm");
const draft = $("#draft");
const copyBtn = $("#copy");
const randomizeBtn = $("#randomize");

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const nowIso = () => new Date().toISOString().slice(0, 10);

const angles = [
  "Ship a single page that converts, then iterate.",
  "Keep the story tight: problem, proof, next step.",
  "Measure one thing, improve one thing, repeat.",
  "Trust is a product feature. Make it visible.",
];

function buildBrief(data){
  const client = (data.client || "Client").trim();
  const industry = (data.industry || "the market").trim();
  const goal = data.goal || "Generate qualified leads";
  const tone = data.tone || "Confident, human";
  const deadline = data.deadline || "2 weeks";
  const budget = data.budget || "Standard";
  const angle = pick(angles);

  return [
    `Project: ${client} (${industry})`,
    `Date: ${nowIso()}`,
    "",
    `Goal: ${goal}.`,
    `Tone: ${tone}.`,
    `Deadline: ${deadline}. Budget band: ${budget}.`,
    "",
    "Scope (v1):",
    "- One landing page with clear CTA",
    "- Services overview + credibility block (proof/metrics/testimonials)",
    "- Contact capture (form or mailto) + analytics hook",
    "",
    "Success criteria:",
    "- Page loads fast on mobile",
    "- Visitor can understand offer in < 10 seconds",
    "- CTA is visible without scrolling",
    "",
    `Working note: ${angle}`,
  ].join("\n");
}

function readForm(){
  const data = Object.fromEntries(new FormData(form).entries());
  return data;
}

function setDraft(text){
  draft.textContent = text;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = readForm();
  setDraft(buildBrief(data));
});

randomizeBtn.addEventListener("click", () => {
  const goals = ["Generate qualified leads","Clarify positioning","Launch a new product","Improve conversion rate","Build trust"];
  const tones = ["Confident, human","Minimal, premium","Playful, direct","Warm, reassuring","Sharp, technical"];
  const deadlines = ["1 week","2 weeks","1 month","6 weeks"];
  const budgets = ["Starter","Standard","Premium"];
  form.goal.value = pick(goals);
  form.tone.value = pick(tones);
  form.deadline.value = pick(deadlines);
  form.budget.value = pick(budgets);
  const data = readForm();
  setDraft(buildBrief(data));
});

copyBtn.addEventListener("click", async () => {
  const text = draft.textContent || "";
  if (!text.trim()) return;
  try{
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied";
    setTimeout(() => copyBtn.textContent = "Copy", 900);
  }catch{
    copyBtn.textContent = "Copy failed";
    setTimeout(() => copyBtn.textContent = "Copy", 1200);
  }
});
