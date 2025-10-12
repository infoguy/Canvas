const PROJECTS = [
  { id:'create-assignments', title:'Create Assignments', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Automates bulk creation of assignments with due dates, descriptions, and point values for multiple courses.', stack:['Python','Selenium'], assets:[{src:'./images/create-assignments.jpg'}], details:'Uses Selenium to navigate Canvas and generate assignments from CSV/spreadsheet input.' },
  { id:'create-discussion-boards', title:'Create Discussion Boards', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Creates discussion boards across multiple Canvas courses with prefilled prompts, grading settings, and publish states.', stack:['Python','Selenium'], assets:[{src:'./images/create-discussion-boards.jpg'}], details:'Batch-creates discussion topics with grading, group settings, and availability dates.' },
  { id:'lock-automation', title:'Lock Automation', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Automatically locks assignments and modules after due dates to maintain course integrity.', stack:['Python','Selenium'], assets:[
      {src:'./videos/lock-automation.mp4'}, {src:'./images/lock-automation.jpg'}], details:'Scans Canvas courses nightly and locks items automatically based on due date logic.' },
  { id:'rubric-converter', title:'Rubric Converter', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Converts exported rubrics between Canvas and Excel formats, allowing bulk edits and reuploads.', stack:['Python','Pandas'], assets:[
      {src:'./videos/rubric-converter.mp4'}, {src:'./images/rubric-converter.jpg'}], details:'Handles rubric imports and exports, ensuring compatibility and preventing data loss.' },
  { id:'validate-and-grades', title:'Validate and Grades', link:'https://www.fiverr.com/techguy4/automate-your-canvas-lms-workflows-with-python-and-selenium', blurb:'Validates submitted grades and ensures final grade posting accuracy using automated checks.', stack:['Python','Selenium'], assets:[{src:'./images/validate-and-grades.jpg'}], details:'Checks unposted grades, missing entries, and mismatches before submission.' },
];

const grid = document.getElementById('grid');
const modal = document.getElementById('modal');
const mTitle = document.getElementById('mTitle');
const mDetails = document.getElementById('mDetails');
const mThumbs = document.getElementById('mThumbs');
const fileInput = document.getElementById('fileInput');
const closeBtn = document.getElementById('closeBtn');
const fiverrBtn = document.getElementById('fiverrBtn');
const modalMedia = document.querySelector('.modal-media');
document.getElementById('year').textContent = new Date().getFullYear();

let openProject = null;
let currentIndex = 0;
const uploads = {}; // temporary blob URLs per project

function isVideo(src) {
  return typeof src === 'string' && src.toLowerCase().endsWith('.mp4');
}

function coverFor(project){
  const local = uploads[project.id];
  if(local && local.length) return local[0];
  const first = (project.assets && project.assets[0] && project.assets[0].src) || '';
  if(isVideo(first)) {
    const img = (project.assets.find(a => a.src && !isVideo(a.src)) || {}).src || '';
    return img || first;
  }
  return first;
}

function renderGrid(){
  grid.innerHTML = '';
  PROJECTS.forEach(function(p){
    const card = document.createElement('div');
    card.className = 'card';
    const inner =
      '<div class="cover"><img src="'+coverFor(p)+'" alt="'+p.title+'"/></div>' +
      '<div class="body">' +
        '<h3><a href="'+p.link+'" target="_blank" rel="noopener">'+p.title+'</a></h3>' +
        '<p class="muted">'+p.blurb+'</p>' +
        '<div class="badges">'+p.stack.map(function(s){return '<span class="badge">'+s+'</span>';}).join('')+'</div>' +
      '</div>';
    card.innerHTML = inner;
    card.querySelector('.cover').addEventListener('click', function(){ openModal(p,0); });
    grid.appendChild(card);
  });
}

function openModal(project, index){
  openProject = project;
  currentIndex = index || 0;
  mTitle.textContent = project.title;
  mDetails.textContent = project.details;
  if (fiverrBtn) fiverrBtn.href = project.link || '#';
  renderModalMedia();
  modal.showModal();
}

function renderModalMedia(){
  const sources = (uploads[openProject.id] && uploads[openProject.id].length)
    ? uploads[openProject.id].map(function(src){return {src: src};})
    : openProject.assets.filter(Boolean);
  const safe = Math.max(0, Math.min(currentIndex, sources.length-1));
  const src = (sources[safe] && (sources[safe].src || sources[safe])) || '';

  if(isVideo(src)){
    modalMedia.innerHTML = '<video id="mVideo" controls playsinline><source src="'+src+'" type="video/mp4"></video>';
  } else {
    modalMedia.innerHTML = '<img id="mImage" alt="preview" />';
    const img = document.getElementById('mImage');
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.src = src || '';
  }

  mThumbs.innerHTML = '';
  sources.forEach(function(asset,i){
    const s = asset.src || asset;
    const btn = document.createElement('button');
    if(isVideo(s)){
      btn.textContent = 'Video';
    } else {
      btn.innerHTML = '<img src="'+s+'" alt="thumb '+(i+1)+'"/>';
    }
    btn.addEventListener('click', function(){ currentIndex=i; renderModalMedia(); });
    mThumbs.appendChild(btn);
  });
}

fileInput.addEventListener('change', function(e){
  const files = Array.from(e.target.files || []);
  if(!files.length || !openProject) return;
  const urls = files.map(function(f){ return URL.createObjectURL(f); });
  uploads[openProject.id] = urls;
  currentIndex = 0;
  renderGrid();
  renderModalMedia();
});

closeBtn.addEventListener('click', function(){ modal.close(); });

renderGrid();
