const API='https://pe-platform-algeria.onrender.com';
const TOKEN_KEY='pe_platform_access_token_v3';
const TRIAL_MS=30*60*1000;
const $=id=>document.getElementById(id);
localStorage.removeItem('pe_token');localStorage.removeItem('pe_platform_access_token_v2');
let token=localStorage.getItem(TOKEN_KEY)||null;
function message(t){const el=$('msg');if(el)el.textContent=t}
async function jsonFetch(path,options={}){const r=await fetch(API+path,{...options,cache:'no-store'});let d={};try{d=await r.json()}catch{}if(!r.ok){const e=new Error(d.error||`خطأ HTTP ${r.status}`);e.code=d.code;throw e}return d}
function setToken(t){token=t;localStorage.setItem(TOKEN_KEY,t)}
function clearToken(){token=null;localStorage.removeItem(TOKEN_KEY)}
function hideAll(){['auth','trial','expired'].forEach(id=>$(id)?.classList.add('hidden'))}
function showAuth(t='جاهز.'){hideAll();$('auth').classList.remove('hidden');message(t)}
function showExpired(t){hideAll();$('expired').classList.remove('hidden');message(t)}
function openWhatsApp(){const text=encodeURIComponent('السلام عليكم، أرسل لكم وصل دفع 1000 دج لتفعيل حسابي في PE Platform Algeria. الاسم: '+($('name')?.value.trim()||'')+' البريد: '+($('email')?.value.trim()||''));window.open('https://wa.me/?text='+text,'_blank','noopener')}
async function openApp(){if(!token)return showAuth('يجب تسجيل الدخول أولًا.');try{const r=await fetch(API+'/api/v1/app',{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});const body=await r.text();if(!r.ok){let d={};try{d=JSON.parse(body)}catch{}const e=new Error(d.error||'تعذر فتح المنصة.');e.code=d.code;if(e.code==='TRIAL_EXPIRED')return showExpired(e.message);throw e}document.open();document.write(body);document.close()}catch(e){if(e.code==='TRIAL_EXPIRED')showExpired(e.message);else message(e.message)}}
function startTimer(ms){clearInterval(window.__trialTimer);let end=Date.now()+Math.max(0,ms);const tick=()=>{let left=Math.max(0,end-Date.now());const sec=Math.ceil(left/1000),m=Math.floor(sec/60),s=sec%60;if($('timer'))$('timer').textContent=`التجربة المتبقية: ${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;if(left<=0){clearInterval(window.__trialTimer);check()}};tick();window.__trialTimer=setInterval(tick,1000)}
function showTrial(user){hideAll();$('trial').classList.remove('hidden');startTimer(user.trialRemainingMs??TRIAL_MS);message('تم الدخول. لديك فترة تجريبية مجانية مدتها 30 دقيقة.')}
async function register(){message('جارٍ إنشاء الحساب...');try{const d=await jsonFetch('/api/v1/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:$('name').value.trim(),email:$('email').value.trim(),password:$('password').value})});setToken(d.accessToken);await check()}catch(e){message(e.message)}}
async function login(){message('جارٍ تسجيل الدخول...');try{const d=await jsonFetch('/api/v1/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:$('email').value.trim(),password:$('password').value})});setToken(d.accessToken);await check()}catch(e){clearToken();message(e.message);if(e.code==='TRIAL_EXPIRED')showExpired(e.message)}}
async function check(){if(!token)return showAuth();try{const d=await jsonFetch('/api/v1/me',{headers:{Authorization:`Bearer ${token}`}});if(d.user.status==='ACTIVE')return openApp();if(d.user.trialAllowed)return showTrial(d.user);showExpired('انتهت الفترة التجريبية (30 دقيقة). أرسل وصل الدفع عبر واتساب لتفعيل الحساب.')}catch(e){if(e.code==='TRIAL_EXPIRED')showExpired(e.message);else{clearToken();showAuth(e.message)}}}
$('registerBtn').addEventListener('click',register);$('loginBtn').addEventListener('click',login);$('openBtn').addEventListener('click',openApp);$('whatsappBtn').addEventListener('click',openWhatsApp);$('whatsappExpiredBtn').addEventListener('click',openWhatsApp);window.addEventListener('load',check);