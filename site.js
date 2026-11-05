const menu=document.getElementById('menu'),nav=document.getElementById('links');
function toggleMenu(open){nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open))}
menu.onclick=()=>toggleMenu(!nav.classList.contains('open'));
nav.onclick=()=>toggleMenu(false);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){toggleMenu(false);menu.focus()}});
const query=document.querySelector('#query');
if(query)query.oninput=()=>{let visible=0;for(const post of document.querySelectorAll('#posts article')){post.hidden=!post.textContent.toLowerCase().includes(query.value.trim().toLowerCase());if(!post.hidden)visible++}document.querySelector('#empty').hidden=visible>0};
const stories=[...document.querySelectorAll('.story')];let current=0;
function change(step){stories[current].hidden=true;current=(current+step+stories.length)%stories.length;stories[current].hidden=false;document.querySelector('#position').textContent=(current+1)+' / '+stories.length}
if(stories.length){document.querySelector('#prev').onclick=()=>change(-1);document.querySelector('#next').onclick=()=>change(1)}
const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (motionAllowed && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('entered');
        observer.unobserve(entry.target);
      }
    }
  }, {threshold: 0.12});
  for (const section of document.querySelectorAll('.split > div, .services article, #ebook h2, #appointment h2')) {
    section.classList.add('reveal');
    observer.observe(section);
  }
}
const enquiryDialog = document.createElement('dialog');
enquiryDialog.setAttribute('aria-labelledby', 'enquiryTitle');
document.body.append(enquiryDialog);
for (const opener of document.querySelectorAll('.enquiry')) {
  opener.addEventListener('click', () => {
    const application = opener.dataset.kind === 'application';
    const title = application ? 'Join Jeannie’s team' : 'Request the e-book';
    const fields = [['Name','text'], ['Email','email']];
    if (application) fields.push(['Highest qualification','text'], ['Phone','tel'], ['Earliest start date','date']);
    enquiryDialog.innerHTML = '<button class="dismiss" aria-label="Close">×</button><h2 id="enquiryTitle">'+title+'</h2><p>Review and send your request in your email app. You can also write to <a href="mailto:jeannielooyr@pruadviser.com.sg">jeannielooyr@pruadviser.com.sg</a>.</p><form>'+fields.map(([name,type])=>'<label>'+name+'<input required name="'+name+'" type="'+type+'"></label>').join('')+'<button class="button">Prepare email <i aria-hidden="true" class="ui-arrow arrow-out"></i></button></form>';
    enquiryDialog.querySelector('.dismiss').onclick = () => enquiryDialog.close();
    enquiryDialog.querySelector('form').onsubmit = event => {
      event.preventDefault();
      const body = [...new FormData(event.target)].map(([key,value])=>key+': '+value).join('\n');
      location.href = 'mailto:jeannielooyr@pruadviser.com.sg?subject='+encodeURIComponent(title)+'&body='+encodeURIComponent(body);
    };
    enquiryDialog.showModal();
  });
}
const filmControl = document.querySelector('.film-control');
if (filmControl) filmControl.onclick = () => {
  const paused = filmControl.closest('.cover').classList.toggle('paused');
  filmControl.setAttribute('aria-pressed', String(paused));
  filmControl.textContent = paused ? 'Play motion' : 'Pause motion';
};

const sampleDay = document.getElementById('sample-day');
if (sampleDay) {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' });
  const day = new Date(today + 'T12:00:00+08:00');
  for (let i = 0; i < 5; i++) {
    day.setUTCDate(day.getUTCDate() + 1);
    const label = day.toLocaleDateString('en-SG', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Asia/Singapore' });
    sampleDay.add(new Option(label, label));
  }
  sampleDay.closest('.schedule-preview').addEventListener('change', () => {
    const time = document.querySelector('input[name="sample-time"]:checked');
    document.getElementById('sample-result').textContent = time ? 'Sample selection: ' + sampleDay.value + ', ' + time.value + ' (SGT).' : '';
  });
}
