(function(){
"use strict";
/* ===== 組別與組員：只需在這裡修改一次，四個分頁的頁尾都會更新 ===== */
const TEAM={zh:{g:"第 ○ 組",m:"○○○、○○○、○○○"},en:{g:"Group ○",m:"Name 1, Name 2, Name 3"}};
/* ================================================================ */
const C={
zh:{brand:"DASS 研究",nHome:"首頁",nRes:"研究結果",nAsk:"問答",nAbout:"關於研究",tl:"淺色",td:"深色",tp:"粉橘",tc:"米黃",tg:"淺綠",fg:"組別",fm:"組員"},
en:{brand:"DASS Study",nHome:"Home",nRes:"Results",nAsk:"Q&A",nAbout:"About",tl:"Light",td:"Dark",tp:"Peach",tc:"Cream",tg:"Green",fg:"Group",fm:"Members"}};
const PAGES=[["index","nHome"],["results","nRes"],["ask","nAsk"],["about","nAbout"]];
const page=document.body.dataset.page;
let lang="zh";
const tr=k=>{const p=(window.PAGE_TEXT||{})[lang]||{};return k in p?p[k]:C[lang][k]};
const NMZ={dep:"憂鬱",anx:"焦慮",str:"壓力"},NME={dep:"Depression",anx:"Anxiety",str:"Stress"};
const LV=["正常","輕度","中度","重度","極重度"],LVE=["Normal","Mild","Moderate","Severe","Extremely severe"];
const GN={"未婚":"Never married","已婚":"Married","曾婚":"Previously married"};
const nm=k=>(lang=="en"?NME:NMZ)[k],gname=n=>lang=="en"?(GN[n]||n):n,LVL=()=>lang=="en"?LVE:LV;

/* ----- 共用導覽列與頁尾 ----- */
document.getElementById("nav").innerHTML='<strong data-i="brand"></strong>'+PAGES.map(([p,k])=>`<a href="${p}.html" data-i="${k}"${p==page?' aria-current="page"':""}></a>`).join("");
document.getElementById("tools").innerHTML='<div class="themes" id="themes">'+[["light","tl"],["dark","td"],["peach","tp"],["cream","tc"],["green","tg"]].map(([a,k])=>`<button data-t="${a}" data-i="${k}"></button>`).join("")+'</div><div class="emo"><button id="lang">EN</button><button class="e" id="sad">😢</button><button class="e" id="happy">😄</button></div>';

function applyLang(){
  document.documentElement.lang=lang=="en"?"en":"zh-Hant";
  document.title=tr("doc");
  document.querySelectorAll("[data-i]").forEach(e=>e.textContent=tr(e.dataset.i));
  document.querySelectorAll("[data-h]").forEach(e=>e.innerHTML=tr(e.dataset.h));
  document.querySelectorAll("[data-n]").forEach(e=>e.textContent=nm(e.dataset.n));
  const c=lang=="en"?": ":"：";
  document.getElementById("foot").textContent=tr("fg")+c+TEAM[lang].g+"　"+tr("fm")+c+TEAM[lang].m;
  document.getElementById("lang").textContent=lang=="en"?"中文":"EN";
  try{localStorage.setItem("dassLang",lang)}catch(e){}
  if(window.onLang)window.onLang();
}
function setTheme(x){
  document.documentElement.setAttribute("data-theme",x);
  document.querySelectorAll("#themes button").forEach(b=>b.classList.toggle("on",b.dataset.t==x));
  try{localStorage.setItem("dassTheme",x)}catch(e){}
}
function rain(list){
  for(let i=0;i<28;i++){
    const e=document.createElement("span");
    e.className="fall";e.textContent=list[i%list.length];
    e.style.left=Math.random()*94+"vw";
    e.style.fontSize=(22+Math.random()*18)+"px";
    e.style.animationDelay=(Math.random()*0.6)+"s";
    document.body.appendChild(e);
    setTimeout(()=>e.remove(),2000);
  }
}
document.getElementById("lang").addEventListener("click",()=>{lang=lang=="en"?"zh":"en";applyLang()});
document.querySelectorAll("#themes button").forEach(b=>b.addEventListener("click",()=>setTheme(b.dataset.t)));
document.getElementById("sad").addEventListener("click",()=>rain(["😢","😭","🥲","😿","😞"]));
document.getElementById("happy").addEventListener("click",()=>rain(["😄","😆","😊","😁","🥰"]));

/* ----- 摘要檔讀取（與先前版本相同） ----- */
const DASS={
G:[
 {n:"未婚",N:3604,dep:[21.24278579,12.08886242],anx:[16.39150943,10.0725178],str:[21.29189789,10.34480383]},
 {n:"已婚",N:455,dep:[15.0021978,11.61354573],anx:[10.64835165,8.949409483],str:[17.93186813,10.68315071]},
 {n:"曾婚",N:100,dep:[17.4,12.50212103],anx:[11.65,9.23254564],str:[18.67,10.44954689]}],
P:{
 dep:[[0.2100443951,0.09378468368,0.1867369589,0.1645394007,0.3448945616],[0.4087912088,0.1054945055,0.1912087912,0.1230769231,0.1714285714],[0.38,0.08,0.14,0.16,0.24]],
 anx:[[0.2272475028,0.07103218646,0.1845172031,0.1545504994,0.3626526082],[0.4659340659,0.08351648352,0.178021978,0.09450549451,0.178021978],[0.37,0.11,0.22,0.11,0.19]],
 str:[[0.288845727,0.1243063263,0.2269700333,0.2125416204,0.147336293],[0.4307692308,0.1208791209,0.189010989,0.1604395604,0.0989010989],[0.37,0.14,0.21,0.21,0.07]]}};
const SHEET_ID="1-8FWvrXA9-53zMIAmGU6LfARd43RJSLAgBUuWRvH0Og",TAB="工作表1";
const URL_CSV=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(TAB)}`;
const PUB_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJlfLuPCKbERmMfOVieTyRd-JybA5awR0AZGjkErai_YSXyqZuZWOdVtbFet3agWgJ2Lejf0xKsfC/pub?gid=0&single=true&output=csv";
function parseCSV(s){const r=[];let row=[],c="",q=false;
  for(let i=0;i<s.length;i++){const ch=s[i];
    if(q){if(ch=='"'){if(s[i+1]=='"'){c+='"';i++}else q=false}else c+=ch}
    else if(ch=='"')q=true;
    else if(ch==","){row.push(c);c=""}
    else if(ch=="\n"||ch=="\r"){if(ch=="\r"&&s[i+1]=="\n")i++;row.push(c);r.push(row);row=[];c=""}
    else c+=ch}
  if(c!==""||row.length){row.push(c);r.push(row)}return r}
const num=s=>{s=String(s||"").trim();if(!s)return NaN;const p=s.endsWith("%");const v=parseFloat(s.replace(/[%,]/g,""));return p?v/100:v};
function build(rows){
  const T=rows.map(r=>r.map(c=>c.trim()));
  const hi=T.findIndex(r=>r.includes("人數")&&r.includes("憂鬱平均"));
  if(hi<0)throw new Error("找不到主表欄名「人數」「憂鬱平均」");
  const h=T[hi],ix=n=>{const i=h.indexOf(n);if(i<0)throw new Error("缺少欄名："+n);return i};
  const ng=[];
  for(let i=hi+1;i<T.length;i++){
    const r=T[i],N=num(r[ix("人數")]);
    if(!r[ix("婚姻狀態")]||isNaN(N))break;
    ng.push({n:r[ix("婚姻狀態")],N,dep:[num(r[ix("憂鬱平均")]),num(r[ix("憂鬱SD")])],anx:[num(r[ix("焦慮平均")]),num(r[ix("焦慮SD")])],str:[num(r[ix("壓力平均")]),num(r[ix("壓力SD")])]});
  }
  if(!ng.length)throw new Error("主表沒有資料列");
  const np={};
  for(const k in NMZ){
    const ti=T.findIndex(r=>r.some(c=>c.includes(NMZ[k]+"分級")));
    if(ti<0)throw new Error("找不到「"+NMZ[k]+"分級」區塊");
    const hj=T.findIndex((r,i)=>i>ti&&r.includes("正常"));
    if(hj<0)throw new Error(NMZ[k]+"分級區塊缺少欄名");
    const hh=T[hj],ci0=hh.indexOf("婚姻狀態");
    np[k]=ng.map(g=>{
      const row=T.slice(hj+1).find(r=>r[ci0]===g.n);
      if(!row)throw new Error(NMZ[k]+"分級缺少："+g.n);
      return LV.map(l=>{const v=num(row[hh.indexOf(l)]);if(isNaN(v))throw new Error(NMZ[k]+"分級「"+g.n+"/"+l+"」不是數字");return v});
    });
  }
  return {G:ng,P:np};
}
const $=id=>document.getElementById(id);
DASS.load=async function(){
  const s=$("src");
  if(s)s.textContent="正在讀取 Google Sheets…";
  let err="";
  for(const u of [PUB_URL,URL_CSV].filter(Boolean)){
    try{
      const res=await fetch(u);
      if(!res.ok)throw new Error("HTTP "+res.status);
      const d=build(parseCSV(await res.text()));
      DASS.G=d.G;DASS.P=d.P;
      if(s)s.textContent="資料來源：Google Sheets（已讀取）";
      return true;
    }catch(e){err=e.message}
  }
  if(s)s.textContent="無法讀取 Google Sheets（"+err+"），目前顯示內建備用資料。可在下方「手動貼上資料」套用最新數字。";
  if($("paste"))$("paste").open=true;
  return false;
};
if($("apply"))$("apply").addEventListener("click",()=>{
  const s=$("src");
  try{
    const d=build($("ta").value.split(/\r?\n/).map(l=>l.split("\t")));
    DASS.G=d.G;DASS.P=d.P;s.textContent="資料來源：手動貼上的試算表內容";
    if(window.onData)window.onData();
  }catch(e){s.textContent="貼上的內容無法解析："+e.message}
});
if($("reload"))$("reload").addEventListener("click",()=>DASS.load().then(()=>window.onData&&window.onData()));
if(location.hash=="#debug")document.querySelectorAll(".hid").forEach(e=>e.classList.remove("hid"));

Object.assign(window,{tr,nm,gname,LVL,DASS,getLang:()=>lang});
let saved="light";try{saved=localStorage.getItem("dassTheme")||"light";lang=localStorage.getItem("dassLang")||"zh"}catch(e){}
setTheme(saved);
applyLang();
})();
