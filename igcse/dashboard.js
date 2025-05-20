const studentid = localStorage.getItem('studentid');
const platform = localStorage.getItem('platform');

if (!studentid || platform !== 'igcse') {
  alert('Invalid login. Redirecting to login.');
  window.location.href = '../login.html';
}

async function fetchData(url) {
  const res = await fetch(url, {
    headers: { 'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbXptdWNscm55cnl1dmFubHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MzM5NjUsImV4cCI6MjA2MzMwOTk2NX0.-l7Klmp5hKru3w2HOWLRPjCiQprJ2pOjsI-HPTGtAiw' }
  });
  return res.json();
}

async function renderDashboard() {
  const theoryPoints = await fetchData('https://tsmzmuclrnyryuvanlxl.supabase.co/rest/v1/igcse_theory_points?select=*');
  const theoryProgress = await fetchData(`https://tsmzmuclrnyryuvanlxl.supabase.co/rest/v1/igcse_theory_progress?studentid=eq.${studentid}`);
  const programmingLevels = await fetchData('https://tsmzmuclrnyryuvanlxl.supabase.co/rest/v1/igcse_programming_levels?select=*');
  const programmingProgress = await fetchData(`https://tsmzmuclrnyryuvanlxl.supabase.co/rest/v1/igcse_programming_progress?studentid=eq.${studentid}`);

  const progressMap = {};
  theoryProgress.forEach(row => progressMap[row.point_id] = row);
  const theoryDiv = document.getElementById('theory-points');

  theoryPoints.sort((a,b) => a.point_order - b.point_order).forEach(point => {
    const circle = document.createElement('div');
    circle.className = 'point-circle';
    const progress = progressMap[point.point_id];
    if (progress && progress.layer1_done && progress.layer2_done && progress.layer3_done && progress.layer4_done) {
      circle.classList.add('completed');
    }
    circle.title = point.title;
    theoryDiv.appendChild(circle);
  });

  const levelDiv = document.getElementById('programming-levels');
  programmingLevels.sort((a,b) => a.level_number - b.level_number).forEach(level => {
    const box = document.createElement('div');
    box.className = 'level-box';
    const status = programmingProgress.find(p => p.level_number === level.level_number);
    if (status && status.level_done) {
      box.classList.add('unlocked');
      box.innerText = `✅ Level ${level.level_number}: ${level.title}`;
    } else if (!status && (level.level_number === 1 || (programmingProgress.find(p => p.level_number === level.level_number - 1)?.level_done))) {
      box.classList.add('unlocked');
      box.innerText = `🔓 Level ${level.level_number}: ${level.title}`;
    } else {
      box.classList.add('locked');
      box.innerText = `🔒 Level ${level.level_number}: ${level.title}`;
    }
    levelDiv.appendChild(box);
  });
}

function logout() {
  localStorage.clear();
  window.location.href = '../login.html';
}

renderDashboard();
