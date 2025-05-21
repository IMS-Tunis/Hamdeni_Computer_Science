const theoryData = [
  { id: '13_1', label: 'P1', link: 'pages/theory/13_1.html', layers: [true, true, true] },
  { id: '13_2', label: 'P2', link: 'pages/theory/13_2.html', layers: [true, true, false] },
  { id: '13_3', label: 'P3', link: 'pages/theory/13_3.html', layers: [false, false, false] }
];

const levelData = [
  { number: 1, title: 'Level 1', link: 'pages/levels/level1.html', done: true },
  { number: 2, title: 'Level 2', link: 'pages/levels/level2.html', done: false, unlocked: true },
  { number: 3, title: 'Level 3', link: 'pages/levels/level3.html', done: false, unlocked: false }
];

const theoryContainer = document.getElementById("theory-points");
theoryData.forEach(point => {
  const a = document.createElement("a");
  a.href = point.link;
  a.className = "point-circle";
  if (point.layers.every(l => l)) {
    a.classList.add("completed");
  } else if (point.layers.some(l => l)) {
    a.classList.add("partial");
  }

  for (let i = 0; i < 3; i++) {
    const layer = document.createElement("div");
    layer.className = `layer layer${i+1}`;
    a.appendChild(layer);
  }

  const label = document.createElement("div");
  label.className = "label";
  label.textContent = point.label;
  a.appendChild(label);
  theoryContainer.appendChild(a);
});

const levelContainer = document.getElementById("programming-levels");
levelData.forEach(level => {
  const div = document.createElement("div");
  div.className = "level-box";
  div.textContent = `${level.done ? '✅' : level.unlocked ? '🔓' : '🔒'} ${level.title}`;
  if (level.done || level.unlocked) {
    div.classList.add("unlocked");
    div.onclick = () => window.location.href = level.link;
  } else {
    div.classList.add("locked");
  }
  levelContainer.appendChild(div);
});
