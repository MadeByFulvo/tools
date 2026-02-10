const tools = [
  {
    name: "Discord Slash Command Builder",
    category: "discord",
    stack: "JavaScript · TypeScript",
    desc: "Generate, validate, and export slash commands with autocomplete + permission matrix.",
  },
  {
    name: "Webhook Inspector",
    category: "discord",
    stack: "Node.js · React",
    desc: "Live inspect incoming webhook payloads and replay them against staging endpoints.",
  },
  {
    name: "Luau Snippet Optimizer",
    category: "backend",
    stack: "Luau",
    desc: "Lint and optimize Luau code blocks for Roblox experiences and internal tooling.",
  },
  {
    name: "CSS Gradient Studio",
    category: "web",
    stack: "HTML · CSS",
    desc: "Create layered gradients, glassmorphism presets, and export production-ready CSS.",
  },
  {
    name: "React State Profiler",
    category: "web",
    stack: "React · JavaScript",
    desc: "Analyze render bottlenecks and generate optimization suggestions for component trees.",
  },
  {
    name: "Java API Contract Diff",
    category: "backend",
    stack: "Java · Spring",
    desc: "Compare two OpenAPI specs and output compatible migration steps.",
  },
  {
    name: "Cross-App Automation Recipes",
    category: "automation",
    stack: "JavaScript · Python",
    desc: "Compose no-code/low-code automations between Discord, GitHub, Jira, and Notion.",
  },
  {
    name: "Rate Limit Simulation Lab",
    category: "automation",
    stack: "Node.js · Java",
    desc: "Simulate API burst traffic and preview adaptive retry behavior.",
  },
];

const toolGrid = document.querySelector("#toolGrid");
const filterButtons = document.querySelectorAll(".filter");
const themeToggle = document.querySelector("#themeToggle");
const palette = document.querySelector("#palette");
const paletteSearch = document.querySelector("#paletteSearch");
const paletteResults = document.querySelector("#paletteResults");

function renderTools(filter = "all") {
  const visible = tools.filter((tool) => filter === "all" || tool.category === filter);
  toolGrid.innerHTML = visible
    .map(
      (tool) => `
      <article class="tool-card">
        <h3>${tool.name}</h3>
        <p>${tool.desc}</p>
        <div class="tool-meta">${tool.stack}</div>
      </article>
    `,
    )
    .join("");
}

function setFilter(btn) {
  filterButtons.forEach((button) => button.classList.remove("active"));
  btn.classList.add("active");
  renderTools(btn.dataset.filter);
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn));
});

renderTools();

themeToggle.addEventListener("click", () => {
  const lightMode = document.documentElement.classList.toggle("light");
  themeToggle.textContent = lightMode ? "☀️" : "🌙";
});

const commandItems = [
  "Open Discord tools",
  "Create webhook mock",
  "Generate Luau utility",
  "Optimize React components",
  "Run API diff",
  "Copy JSON output",
];

function renderPaletteResults(query = "") {
  const filtered = commandItems.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  paletteResults.innerHTML = filtered.map((item) => `<li>${item}</li>`).join("");
}

function togglePalette(isOpen) {
  palette.classList.toggle("hidden", !isOpen);
  if (isOpen) {
    renderPaletteResults();
    paletteSearch.value = "";
    paletteSearch.focus();
  }
}

document.querySelector("#openPalette").addEventListener("click", () => togglePalette(true));
document.querySelector("#closePalette").addEventListener("click", () => togglePalette(false));

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    togglePalette(true);
  }
  if (event.key === "Escape") {
    togglePalette(false);
  }
});

paletteSearch.addEventListener("input", (event) => {
  renderPaletteResults(event.target.value);
});

const jsonInput = document.querySelector("#jsonInput");
const jsonOutput = document.querySelector("#jsonOutput");

function formatJson(mode) {
  try {
    const parsed = JSON.parse(jsonInput.value || "{}");
    jsonOutput.textContent = mode === "pretty" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
  } catch {
    jsonOutput.textContent = "Invalid JSON. Please fix syntax and try again.";
  }
}

document.querySelector("#prettyBtn").addEventListener("click", () => formatJson("pretty"));
document.querySelector("#minifyBtn").addEventListener("click", () => formatJson("minify"));
document.querySelector("#copyBtn").addEventListener("click", async () => {
  await navigator.clipboard.writeText(jsonOutput.textContent);
});
