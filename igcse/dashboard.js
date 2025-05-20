import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://tsmzmuclrnyryuvanlxl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbXptdWNscm55cnl1dmFubHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MzM5NjUsImV4cCI6MjA2MzMwOTk2NX0.-l7Klmp5hKru3w2HOWLRPjCiQprJ2pOjsI-HPTGtAiw';

const supabase = createClient(supabaseUrl, supabaseKey);

const studentid = localStorage.getItem('studentid');
const platform = localStorage.getItem('platform');

if (!studentid || platform !== 'IGCSE') {
  window.location.href = '../login.html';
}

async function loadDashboard() {
  const { data: theoryList } = await supabase
    .from('igcse_theory_points')
    .select('*')
    .order('point_order');

  const { data: levelList } = await supabase
    .from('igcse_programming_levels')
    .select('*')
    .order('level_number');

  const { data: theoryProgress } = await supabase
    .from('igcse_theory_progress')
    .select('*')
    .eq('studentid', studentid);

  const { data: programmingProgress } = await supabase
    .from('igcse_programming_progress')
    .select('*')
    .eq('studentid', studentid);

  renderTheory(theoryList, theoryProgress);
  renderProgramming(levelList, programmingProgress);
}

function renderTheory(points, progress) {
  const container = document.getElementById('theory-column');
  container.innerHTML = "<h2>Theory Points</h2>";
  for (const point of points) {
    const status = progress.find(p => p.point_id === point.point_id);
    let className = 'point locked';
    let label = point.title;

    if (status) {
      const layersDone = ['layer1_done','layer2_done','layer3_done','layer4_done']
        .map(k => status[k])
        .filter(v => v).length;
      if (layersDone === 4) {
        className = 'point completed';
      } else if (layersDone > 0) {
        className = 'point unlocked';
      }
    }

    container.innerHTML += `<div class="\${className}">\${label}</div>`;
  }
}

function renderProgramming(levels, progress) {
  const container = document.getElementById('programming-column');
  container.innerHTML = "<h2>Programming Levels</h2>";

  for (const level of levels) {
    const done = progress.find(p => p.level_number === level.level_number)?.level_done;
    let className = 'level locked';

    if (done) {
      className = 'level completed';
    } else {
      const previous = progress.find(p => p.level_number === (level.level_number - 1));
      if (level.level_number === 1 || previous?.level_done) {
        className = 'level unlocked';
      }
    }

    container.innerHTML += `<div class="\${className}">Level \${level.level_number}: \${level.title}</div>`;
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "../login.html";
}

loadDashboard();