/** @type {() => string} - 今日の日付を"YYYY-MM-DD"形式の文字列で取得 */
function getTodayDate() {
  return new Date().toLocaleDateString('sv-SE', {
    timeZone: 'Asia/Tokyo'
  });
}
/** @type {() => string} - 昨日の日付を"YYYY-MM-DD"形式の文字列で取得 */
function getYesterdayDate() {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toLocaleDateString('sv-SE', {
    timeZone: 'Asia/Tokyo'
  });
}

window.addEventListener('load', function updateUntilDate() {
  const today = getTodayDate();
  document.getElementById('textboxUntilDate').value = today;
})

function clickSinceYesterdayButton() {
  const yesterday = getYesterdayDate();
  document.getElementById('textboxSinceDate').value = yesterday;
  document.getElementById('checkboxSinceEnabled').checked = true;
}

function clickResetKeywordButton() {
  document.getElementById('textboxKeyword').value = "";
}

function onClickTagButton(event) {
  let hashTag = event.target.textContent;
  let keyword = document.getElementById('textboxKeyword').value;
  let tags = new Set(keyword.split(" ").filter(tag => tag !== ""));
  hashTag.split(" ").forEach(tag => {
    tags.add(tag);
  });
  // "既にある場合は削除"にしたい場合は、上の行を「tags[tags.has(hashTag) ? "delete" : "add"](hashTag);」に変更する
  document.getElementById('textboxKeyword').value = Array.from(tags).join(" ");
}

function openPage() {
  let keyword = document.getElementById('textboxKeyword').value;
  let searchQuery = null;
  if (document.getElementById('radioSearchOptionOr').checked === true) {
    searchQuery = keyword.replaceAll(" ", " OR ");
  } else {
    searchQuery = keyword;
  }
  if (document.getElementById('checkboxKikiraraViviModeEnabled').checked === true) {
    searchQuery += " from:kikiraravivi";
  }
  if (document.getElementById('radioFilterOptionMedia').checked === true) {
    searchQuery += " filter:media";
  }
	 if (document.getElementById('radioFilterOptionSpace').checked === true) {
    searchQuery += " filter:spaces";
  }
  if (document.getElementById('checkboxSinceEnabled').checked === true) {
    searchQuery += " since:" + document.getElementById('textboxSinceDate').value + "_" + document.getElementById('textboxSinceTime').value + "_JST";
  }
  if (document.getElementById('checkboxUntilEnabled').checked === true) {
    searchQuery += " until:" + document.getElementById('textboxUntilDate').value + "_" + document.getElementById('textboxUntilTime').value + "_JST";
  }
  const openUrl = "https://x.com/search?q=" + encodeURIComponent(searchQuery) + "&f=live";
  window.open(openUrl);
}

function remainBirthDay() {
  const now = new Date();
  const birthDay = new Date(now.getFullYear(), 7, 27);


  if (now.getMonth() == 7 && now.getDate() == 27) {
    document.getElementById('todayBirth').style.display = "";
    document.getElementById('nextBirth').style.display = "none";
  }

  if (now.getMonth() > 7 || now.getMonth() == 7 && now.getDate() >= 27) {
    birthDay.setFullYear(now.getFullYear() + 1);
  }

  let text_date = "";
  const time = birthDay.getTime() - now.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  if (date == 0) {
    text_date = "";
  }else{
    text_date = date + "D ";
  }
  text_date += String(hour).padStart(2, '0') + ":" + String(minute).padStart(2, '0') + ":" + String(second).padStart(2, '0');
  document.getElementById('rBirthDate').textContent = text_date;

}

function remainAnivDay() {
  const now = new Date();
  const anivDay = new Date(now.getFullYear(), 10, 9);

  if (now.getMonth() == 10 && now.getDate() == 9) {
    document.getElementById('todayAniv').style.display = "";
    document.getElementById('nextAniv').style.display = "none";
  }

  if (now.getMonth() > 10 || now.getMonth() == 10 && now.getDate() >= 9) {
    anivDay.setFullYear(now.getFullYear() + 1);
  }

  let text_date = "";
  const time = anivDay.getTime() - now.getTime();
  const year = anivDay.getFullYear() - 2024;
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  if (date == 0) {
    text_date = "";
  }else{
    text_date = date + "D ";
  }
  text_date += String(hour).padStart(2, '0') + ":" + String(minute).padStart(2, '0') + ":" + String(second).padStart(2, '0');
  document.getElementById('rAnivYear').textContent = year;
  document.getElementById('rAnivDate').textContent = text_date;
}

setInterval(remainBirthDay, 1000);
setInterval(remainAnivDay, 1000);

// X埋め込み テーマ切り替え
const darkmode = window.matchMedia('(prefers-color-scheme: dark)');
function loadWidgets(){
  const embed = document.querySelectorAll('blockquote.twitter-tweet');
  if(embed.length === 0){
    return
  }
  for(let i = 0; i < embed.length; i++){
    if(darkmode.matches){
      embed[i].setAttribute('data-theme', 'dark');
      } else {
      embed[i].setAttribute('data-theme', 'light'); 
    }
    embed[i].setAttribute('data-width', '550');
    embed[i].setAttribute('data-align', 'center');
  }
  const script = document.createElement('script');
  script.src = "https://platform.twitter.com/widgets.js";
  document.body.appendChild(script);
}
  
function changeEmbedX(){
  const iframe = document.querySelectorAll('div.twitter-tweet-rendered iframe');
  if(iframe.length === 0){
    return
  }
  for(let i = 0; i < iframe.length; i++){
    if(darkmode.matches){
      iframe[i].src = iframe[i].src.replace('&theme=light&', '&theme=dark&');
    } else {
      iframe[i].src = iframe[i].src.replace('&theme=dark&', '&theme=light&');
    }
  }
}

window.addEventListener('DOMContentLoaded', loadWidgets);
darkmode.addEventListener('change', changeEmbedX);
