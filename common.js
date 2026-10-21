/* ===== shared: helpers, hearts, background, music player ===== */
const PINK='#ffb3c6',DPINK='#ff758f',DEEP='#c9184a',BROWN='#523d35';
function rect(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}

let ac=null;
function audioCtx(){ if(!ac) ac=new (window.AudioContext||window.webkitAudioContext)(); if(ac.state==='suspended') ac.resume(); return ac }
function tone(f,d,type='sine',g=.06){try{const a=audioCtx(),o=a.createOscillator(),v=a.createGain();o.type=type;o.frequency.value=f;v.gain.setValueAtTime(g,a.currentTime);v.gain.exponentialRampToValueAtTime(.0001,a.currentTime+d);o.connect(v);v.connect(a.destination);o.start();o.stop(a.currentTime+d)}catch(e){}}
function chime(){[523.25,659.25,783.99,1046.5].forEach((f,i)=>setTimeout(()=>tone(f,.2),i*80))}
function blowSound(){try{const a=audioCtx(),n=a.sampleRate*.4,b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const s=a.createBufferSource(),v=a.createGain();s.buffer=b;v.gain.setValueAtTime(.08,a.currentTime);v.gain.exponentialRampToValueAtTime(.001,a.currentTime+.4);s.connect(v);v.connect(a.destination);s.start()}catch(e){}}

function spawnHeart(){const h=document.createElement('div');h.className='heart';h.textContent=['💗','💖','✨','🌸'][Math.floor(Math.random()*4)];h.style.left=(Math.random()*90+5)+'vw';h.style.top='90vh';document.body.appendChild(h);setTimeout(()=>h.remove(),4000)}
function burst(n,gap){for(let i=0;i<n;i++)setTimeout(spawnHeart,i*gap)}

/* floating background */
(function(){const cv=document.getElementById('bg');if(!cv)return;const c=cv.getContext('2d');
const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};addEventListener('resize',fit);fit();
const sp=Array.from({length:26},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,s:Math.random()*14+10,v:Math.random()*.5+.2,e:Math.random()>.5?'💗':'✨'}));
(function loop(){c.clearRect(0,0,cv.width,cv.height);sp.forEach(p=>{p.y-=p.v;if(p.y<-20)p.y=cv.height+20;c.font=p.s+'px monospace';c.fillText(p.e,p.x,p.y)});requestAnimationFrame(loop)})()})();

/* ===== MUSIC PLAYER =====
   Put your own mp3 files in the "music" folder using these exact names. */
const TRACKS=[
 {t:'Photograph',f:'music/photograph.mp3'},
 {t:'Libo-Libong Buwan',f:'music/libo-libong-buwan.mp3'},
 {t:'Here With Me',f:'music/here-with-me.mp3'},
 {t:'Until I Found You',f:'music/until-i-found-you.mp3'}];
const Music=(function(){
 const au=new Audio();au.preload='auto';
 let st={i:0,t:0,on:false};
 try{st=Object.assign(st,JSON.parse(localStorage.getItem('monthsaryMusic')||'{}'))}catch(e){}
 const el=document.createElement('div');el.id='player';el.className='box';
 el.innerHTML='<button class="btn" id="pPrev" aria-label="Previous song">⏮</button><button class="btn" id="pPlay" aria-label="Play or pause">▶</button><button class="btn" id="pNext" aria-label="Next song">⏭</button><div id="pInfo"><div id="pTitle"></div><div id="pStat"></div><div id="pBar"><div id="pFill"></div></div></div>';
 document.body.appendChild(el);
 const $=id=>document.getElementById(id);
 const save=()=>{try{localStorage.setItem('monthsaryMusic',JSON.stringify({i:st.i,t:au.currentTime||0,on:!au.paused}))}catch(e){}};
 function stat(m){$('pStat').textContent=m}
 function load(i,t){st.i=(i+TRACKS.length)%TRACKS.length;au.src=TRACKS[st.i].f;au.currentTime=0;if(t)au.addEventListener('loadedmetadata',()=>{au.currentTime=t},{once:true});$('pTitle').textContent=(st.i+1)+'/'+TRACKS.length+'  '+TRACKS[st.i].t;stat('Tap play')}
 function play(){audioCtx();return au.play().catch(()=>stat('Add '+TRACKS[st.i].f.replace('music/','')+' to the music folder'))}
 function toggle(){au.paused?play():au.pause()}
 au.addEventListener('play',()=>{$('pPlay').textContent='⏸';stat('Now playing ♡')});
 au.addEventListener('pause',()=>{$('pPlay').textContent='▶';save()});
 au.addEventListener('error',()=>stat('Add '+TRACKS[st.i].f.replace('music/','')+' to the music folder'));
 au.addEventListener('ended',()=>{load(st.i+1);play()});
 au.addEventListener('timeupdate',()=>{$('pFill').style.width=(au.duration?au.currentTime/au.duration*100:0)+'%'});
 $('pPlay').onclick=toggle;$('pPrev').onclick=()=>{load(st.i-1);play()};$('pNext').onclick=()=>{load(st.i+1);play()};
 setInterval(()=>{if(!au.paused)save()},1500);addEventListener('beforeunload',save);
 load(st.i,st.t);
 if(st.on){stat('Tap anywhere to continue ♡');const go=()=>{if(au.paused)play();removeEventListener('pointerdown',go)};addEventListener('pointerdown',go);play()}
 let was=false;
 return{play:()=>{if(au.paused)play()},pause:()=>{was=!au.paused;au.pause()},resume:()=>{if(was){was=false;play()}}}
})();

/* ===== LIGHT / DARK MODE ===== */
(function(){
 const root=document.documentElement,KEY='monthsaryTheme';
 const b=document.createElement('button');b.id='themeBtn';b.className='btn';document.body.appendChild(b);
 function set(t,save){root.dataset.theme=t;b.textContent=t==='dark'?'☀️ LIGHT':'🌙 DARK';b.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode');if(save)try{localStorage.setItem(KEY,t)}catch(e){}}
 set(root.dataset.theme||'light',false);
 b.onclick=()=>set(root.dataset.theme==='dark'?'light':'dark',true);
})();

/* ===== LOADING SCREEN ===== */
(function(){
 const L=document.getElementById('loader');if(!L)return;
 const f=document.getElementById('lFill'),t=document.getElementById('lPct');
 let p=0,done=false;const start=performance.now();
 const show=()=>{f.style.width=p+'%';t.textContent=Math.round(p)+'%'};
 const tick=setInterval(()=>{p+=(90-p)*.08;show()},120);
 function finish(){if(done)return;done=true;clearInterval(tick);p=100;show();setTimeout(()=>{L.classList.add('out');setTimeout(()=>L.remove(),600)},350)}
 function ready(){setTimeout(finish,Math.max(0,2600-(performance.now()-start)))}
 document.readyState==='complete'?ready():addEventListener('load',ready);
 setTimeout(finish,7000);
})();