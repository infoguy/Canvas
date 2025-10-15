const PROJECTS = [
  { id:'create-assignments', title:'Create Assignments', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Automates bulk creation of assignments across courses.', stack:['Python','Selenium'], assets:[
      {src:'./videos/create-assignments.mp4'}, {src:'./images/create-assignments.jpg'}
    ], details:'Generates assignments from CSV/spreadsheet input.' },
  { id:'create-discussion-boards', title:'Create Discussion Boards', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Creates discussion boards with prompts and settings.', stack:['Python','Selenium'], assets:[
      {src:'./videos/create-discussion-boards.mp4'}, {src:'./images/create-discussion-boards.jpg'}
    ], details:'Batch-creates discussions with grading and availability.' },
  { id:'lock-automation', title:'Lock Automation', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Locks assignments/modules after due dates.', stack:['Python','Selenium'], assets:[
      {src:'./videos/lock-automation.mp4'}, {src:'./images/lock-automation.jpg'}
    ], details:'Nightly scan to lock items based on due dates.' },
  { id:'rubric-converter', title:'Rubric Converter', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Converts Canvas rubrics to/from Excel for bulk edits.', stack:['Python','Pandas'], assets:[
      {src:'./videos/rubric-converter.mp4'}, {src:'./images/rubric-converter.jpg'}
    ], details:'Import/export rubrics safely without data loss.' },
  { id:'validate-and-grades', title:'Validate and Grades', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Validates submitted grades and flags issues.', stack:['Python','Selenium'], assets:[{src:'./images/validate-and-grades.jpg'}], details:'Checks unposted grades, missing entries, mismatches.' },
];

const grid = document.getElementById('grid');
const modal = document.getElementById('modal');
const mTitle = document.getElementById('mTitle');
const mDetails = document.getElementById('mDetails');
const mThumbs = document.getElementById('mThumbs');
const closeBtn = document.getElementById('closeBtn');
const fiverrBtn = document.getElementById('fiverrBtn');
const modalMedia = document.querySelector('.modal-media');
document.getElementById('year').textContent = new Date().getFullYear();

function isVideo(src){ return typeof src === 'string' && src.toLowerCase().endsWith('.mp4'); }
function withFallback(src, text){ if (src && src.trim() !== '') return src; const t = encodeURIComponent(text || 'Preview Unavailable'); return 'https://placehold.co/1200x750?text='+t; }
function pickCover(project){ const first = (project.assets && project.assets[0] && project.assets[0].src) || ''; if (isVideo(first)) { const img = (project.assets.find(a => a.src && !isVideo(a.src)) || {}).src || ''; return withFallback(img || first, project.title); } return withFallback(first, project.title); }

function renderGrid(){ grid.innerHTML = ''; PROJECTS.forEach(p => { const card = document.createElement('div'); card.className = 'card'; card.innerHTML = '<div class="cover"><img alt="'+p.title+'" src="'+pickCover(p)+'"/></div>' + '<div class="body">' + '<h3><a href="'+p.link+'" target="_blank" rel="noopener">'+p.title+'</a></h3>' + '<p class="muted">'+p.blurb+'</p>' + '</div>'; card.querySelector('.cover').addEventListener('click', () => openModal(p,0)); grid.appendChild(card); }); }

function openModal(project, index){ window._openProject = project; window._currentIndex = index || 0; mTitle.textContent = project.title; mDetails.textContent = project.details; if (fiverrBtn) fiverrBtn.href = project.link || '#'; renderModalMedia(); modal.showModal(); }

function renderModalMedia(){ const p = window._openProject; const list = (p.assets || []).filter(Boolean); const safe = Math.max(0, Math.min(window._currentIndex || 0, list.length-1)); const src = (list[safe] && list[safe].src) || ''; if (isVideo(src)) { modalMedia.innerHTML = '<video id="mVideo" controls playsinline><source src="'+src+'" type="video/mp4"></video>'; } else { modalMedia.innerHTML = '<img id="mImage" alt="preview" />'; const img = document.getElementById('mImage'); img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'contain'; img.src = withFallback(src, p.title); } mThumbs.innerHTML = ''; list.forEach((a,i) => { const s = a.src || ''; const btn = document.createElement('button'); btn.innerHTML = isVideo(s) ? 'Video' : '<img src="'+withFallback(s,p.title)+'" alt="thumb '+(i+1)+'">'; btn.addEventListener('click', () => { window._currentIndex = i; renderModalMedia(); }); mThumbs.appendChild(btn); }); }

closeBtn.addEventListener('click', () => modal.close());
renderGrid();
