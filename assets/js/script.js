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
  } else {
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
  } else {
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
function loadWidgets() {
  const embed = document.querySelectorAll('blockquote.twitter-tweet');
  if (embed.length === 0) {
    return
  }
  for (let i = 0; i < embed.length; i++) {
    if (darkmode.matches) {
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

function changeEmbedX() {
  const iframe = document.querySelectorAll('div.twitter-tweet-rendered iframe');
  if (iframe.length === 0) {
    return
  }
  for (let i = 0; i < iframe.length; i++) {
    if (darkmode.matches) {
      iframe[i].src = iframe[i].src.replace('&theme=light&', '&theme=dark&');
    } else {
      iframe[i].src = iframe[i].src.replace('&theme=dark&', '&theme=light&');
    }
  }
}

function generateCalendar(startYear, startMonth) {
  const container = document.getElementById("calendar-container");
  const today = new Date();
  const endYear = today.getFullYear();
  const endMonth = today.getMonth(); // 0-indexed

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  for (let year = endYear; year >= startYear; year--) {
    const monthStart = (year === startYear) ? startMonth : 0;
    const monthEnd = (year === endYear) ? endMonth : 11;

    for (let month = monthEnd; month >= monthStart; month--) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const monthTitle = `${year}年${month + 1}月`;

      const card = document.createElement("div");
      card.className = "mb-4 card";

      const cardHeader = document.createElement("div");
      cardHeader.className = "card-header";
      cardHeader.innerHTML = `<h3 class="mb-0">${monthTitle}</h3>`;
      card.appendChild(cardHeader);

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const table = document.createElement("table");
      table.className = "table table-bordered text-center";

      const thead = document.createElement("thead");
      thead.className = "table-primary";
      const headRow = document.createElement("tr");
      weekdays.forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      let row = document.createElement("tr");

      for (let i = 0; i < firstDay.getDay(); i++) {
        const td = document.createElement("td");
        td.className = "text-muted";
        td.textContent = '';
        row.appendChild(td);
      }

      for (let date = 1; date <= lastDay.getDate(); date++) {
        const currentDate = new Date(year, month, date);
        const td = document.createElement("td");
        const y = year.toString().padStart(4, '0');
        const m = (month + 1).toString().padStart(2, '0');
        const d = date.toString().padStart(2, '0');
        const dateStr = `${y}${m}${d}`;

        const links = oha_date
          .filter(entry => entry.odate === dateStr)
          .map(entry => `<a href="https://x.com/kikiraravivi/status/${entry.id}" target="_blank">☀</a>`);

        td.innerHTML = `${date} ${links.join('')}`;

        if (
          currentDate.getFullYear() === today.getFullYear() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getDate() === today.getDate()
        ) {
          td.classList.add("bg-warning", "fw-bold");
        }

        row.appendChild(td);

        if (currentDate.getDay() === 6 || date === lastDay.getDate()) {
          tbody.appendChild(row);
          row = document.createElement("tr");
        }
      }

      table.appendChild(tbody);
      cardBody.appendChild(table);
      card.appendChild(cardBody);
      container.appendChild(card);
    }
  }
}


const oha_date = [
  { odate: "20250811", otime: "1930", id: "1952485254029361203" },
  { odate: "20250801", otime: "1930", id: "1952485254029361204" },
  { odate: "20250801", otime: "1930", id: "1952485254029361205" }
];


// 2024年10月から開始
generateCalendar(2024, 9);
window.addEventListener('DOMContentLoaded', loadWidgets);
darkmode.addEventListener('change', changeEmbedX);
