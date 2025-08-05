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
          .map(entry => `<br><a href="https://x.com/kikiraravivi/status/${entry.id}" target="_blank">${entry.icon}</a>`);

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

  { odate: "20250226", otime: "1426", id: "1894619947491627287",icon:"🔆" },
  { odate: "20250225", otime: "1522", id: "1894271803172032648",icon:"🔆" },
  { odate: "20250224", otime: "1058", id: "1893842974947069960",icon:"🔆" },
  { odate: "20250223", otime: "1458", id: "1893540951622328752",icon:"🔆" },
  { odate: "20250222", otime: "1448", id: "1893176006061461790",icon:"🔆" },
  { odate: "20250221", otime: "1757", id: "1892861103517937884",icon:"🔆" },
  { odate: "20250220", otime: "1829", id: "1892506770699911483",icon:"🔆" },
  { odate: "20250219", otime: "1358", id: "1892076170587369934",icon:"🔆" },
  { odate: "20250218", otime: "1253", id: "1891697417046593958",icon:"🔆" },
  { odate: "20250217", otime: "1525", id: "1891373270294741221",icon:"🔆" },
  { odate: "20250216", otime: "0855", id: "1890912782809215289",icon:"🔆" },
  { odate: "20250214", otime: "2119", id: "1890375302318088556",icon:"🔆" },
  { odate: "20250213", otime: "0948", id: "1889838977244692586",icon:"🔆" },
  { odate: "20250211", otime: "1938", id: "1889262678306423235",icon:"🔆" },
  { odate: "20250210", otime: "1326", id: "1888806709881389101",icon:"🔆" },
  { odate: "20250209", otime: "1059", id: "1888407253042315628",icon:"🔆" },
  { odate: "20250208", otime: "1709", id: "1888137982114422865",icon:"🔆" },
  { odate: "20250207", otime: "0039", id: "1887526619025449042",icon:"🔆" },
  { odate: "20250207", otime: "2201", id: "1887849288442523715",icon:"🔆" },
  { odate: "20250205", otime: "1754", id: "1887062251657720234",icon:"🔆" },
  { odate: "20250204", otime: "2031", id: "1886739307832205792",icon:"🔆" },
  { odate: "20250203", otime: "1802", id: "1886339476001313197",icon:"🔆" },
  { odate: "20250202", otime: "1047", id: "1885867519069860063",icon:"🔆" },
  { odate: "20250202", otime: "1955", id: "1886005424417316912",icon:"🔆" },
  { odate: "20250201", otime: "2112", id: "1885662510763962824",icon:"🔆" },

  { odate: "20250131", otime: "0913", id: "1885119206611693670",icon:"🔆" },
  { odate: "20250131", otime: "2132", id: "1885305053101383701",icon:"🔆" },
  { odate: "20250130", otime: "0858", id: "1884752972191789206",icon:"🔆" },
  { odate: "20250129", otime: "1033", id: "1884414477871038938",icon:"🔆" },
  { odate: "20250128", otime: "2119", id: "1884214814135996676",icon:"🔆" },
  { odate: "20250127", otime: "1827", id: "1883808999642218959",icon:"🔆" },
  { odate: "20250126", otime: "1352", id: "1883377344750211502",icon:"🔆" },
  { odate: "20250125", otime: "1218", id: "1882991297226805282",icon:"🔆" },
  { odate: "20250124", otime: "0105", id: "1882459701671350283",icon:"🔆" },
  { odate: "20250122", otime: "2312", id: "1882068736943022511",icon:"🔆" },
  { odate: "20250121", otime: "2038", id: "1881667775208542407",icon:"🔆" },
  { odate: "20250120", otime: "1747", id: "1881262283046977977",icon:"🔆" },
  { odate: "20250119", otime: "1259", id: "1880827346896478325",icon:"🔆" },
  { odate: "20250118", otime: "0656", id: "1880373545982902783",icon:"🔆" },
  { odate: "20250118", otime: "2011", id: "1880573692843090393",icon:"🔆" },
  { odate: "20250117", otime: "1734", id: "1880171714069557708",icon:"🔆" },
  { odate: "20250116", otime: "0923", id: "1879685995777671278",icon:"🔆" },
  { odate: "20250116", otime: "2109", id: "1879863664184078822",icon:"1⃣" },
  { odate: "20250115", otime: "0704", id: "1879288503491801458",icon:"🔆" },
  { odate: "20250115", otime: "2024", id: "1879489862488977563",icon:"🔆" },
  { odate: "20250114", otime: "1143", id: "1878996328333857243",icon:"🔆" },
  { odate: "20250113", otime: "0949", id: "1878605269003010195",icon:"🔆" },
  { odate: "20250112", otime: "1356", id: "1878305021290221994",icon:"🔆" },
  { odate: "20250111", otime: "1257", id: "1877927881353109588",icon:"1⃣" },
  { odate: "20250110", otime: "2012", id: "1877674792980976042",icon:"🔆" },
  { odate: "20250109", otime: "1316", id: "1877207905843212780",icon:"🔆" },
  { odate: "20250108", otime: "1406", id: "1876857925324427323",icon:"🔆" },
  { odate: "20250107", otime: "1323", id: "1876484720890106054",icon:"1⃣" },
  { odate: "20250106", otime: "1847", id: "1876203806071074905",icon:"1⃣" },
  { odate: "20250105", otime: "0420", id: "1875623456018239687",icon:"🎥" },
  { odate: "20250105", otime: "1209", id: "1875741386018062691",icon:"🔆" },
  { odate: "20250104", otime: "1310", id: "1875394358431850684",icon:"🔆" },
  { odate: "20250104", otime: "1934", id: "1875490981262585984",icon:"🎥" },
  { odate: "20250103", otime: "2308", id: "1875182513678942612",icon:"1⃣" },
  { odate: "20250102", otime: "1226", id: "1874658605271822485",icon:"1⃣" },
  { odate: "20250101", otime: "0056", id: "1874122481663172908",icon:"🏆" },
  { odate: "20250101", otime: "1944", id: "1874406249485464019",icon:"1⃣" },
  { odate: "20241231", otime: "1452", id: "1873970471089430793",icon:"🔆" },
  { odate: "20241229", otime: "1714", id: "1873281404626514388",icon:"1⃣" },
  { odate: "20241228", otime: "1533", id: "1872893501568082023",icon:"🔆" },
  { odate: "20241223", otime: "1027", id: "1871004596728218004",icon:"💄" },
  { odate: "20241222", otime: "0144", id: "1870510583495455213",icon:"🎥" },
  { odate: "20241222", otime: "1216", id: "1870669833274315084",icon:"🎥" },
  { odate: "20241219", otime: "1752", id: "1869667066925678640",icon:"🔆" },
  { odate: "20241217", otime: "1711", id: "1868932137283653888",icon:"💄" },
  { odate: "20241215", otime: "0110", id: "1867965346298392937",icon:"🎥" },
  { odate: "20241214", otime: "0301", id: "1867630899753636249",icon:"🎥" },
  { odate: "20241213", otime: "0659", id: "1867328493945860155",icon:"🎥" },
  { odate: "20241211", otime: "0144", id: "1866524458741375280",icon:"🎥" },
  { odate: "20241209", otime: "0105", id: "1865789772377284800",icon:"🎥" },
  { odate: "20241208", otime: "1007", id: "1865563856912941453",icon:"🎥" },
  { odate: "20241207", otime: "0203", id: "1865079738634768569",icon:"🎥" },
  { odate: "20241206", otime: "0045", id: "1864697701058924831",icon:"🎥" },
  { odate: "20241206", otime: "1407", id: "1864899457151832100",icon:"🎥" },
  { odate: "20241205", otime: "0738", id: "1864439087769505882",icon:"🎥" },
  { odate: "20241204", otime: "0320", id: "1864011908514525510",icon:"🎥" },
  { odate: "20241204", otime: "0754", id: "1864080714955977209",icon:"🎥" },
  { odate: "20241203", otime: "0026", id: "1863605783449256029",icon:"🎥" },
  { odate: "20241203", otime: "0815", id: "1863723687809368483",icon:"🎥" },
  { odate: "20241202", otime: "0846", id: "1863369201496498294",icon:"🎥" },
  { odate: "20241201", otime: "0205", id: "1862905754803634373",icon:"🎥" },
  { odate: "20241130", otime: "1702", id: "1862769095726571995",icon:"🎥" },
  { odate: "20241129", otime: "1228", id: "1862337934864916624",icon:"1⃣" },
  { odate: "20241127", otime: "1335", id: "1861629937515667883",icon:"1⃣" },
  { odate: "20241126", otime: "0052", id: "1861075569645158733",icon:"🎥" },
  { odate: "20241125", otime: "0322", id: "1860750770381238367",icon:"🎥" },
  { odate: "20241124", otime: "1528", id: "1860571262667620846",icon:"1⃣" },
  { odate: "20241124", otime: "2218", id: "1860674359347802315",icon:"1⃣" },
  { odate: "20241123", otime: "0203", id: "1860006273200410930",icon:"🎥" },
  { odate: "20241123", otime: "1000", id: "1860126179770138822",icon:"1⃣" },
  { odate: "20241123", otime: "2340", id: "1860332636482511294",icon:"🎥" },
  { odate: "20241122", otime: "0644", id: "1859714523810365778",icon:"1⃣" },
  { odate: "20241121", otime: "0137", id: "1859274940467614190",icon:"🎥" },
  { odate: "20241121", otime: "1109", id: "1859418899365888213",icon:"🎥" },
  { odate: "20241120", otime: "0103", id: "1858904004140699984",icon:"🎥" },
  { odate: "20241119", otime: "0846", id: "1858657953324429601",icon:"🎥" },
  { odate: "20241118", otime: "2233", id: "1858503838166028738",icon:"🎥" },
  { odate: "20241117", otime: "1358", id: "1858011840435073485",icon:"1⃣" },
  { odate: "20241117", otime: "2003", id: "1858103693889179670",icon:"🎥" },
  { odate: "20241117", otime: "2253", id: "1858146569855570072",icon:"🎥" },
  { odate: "20241116", otime: "0031", id: "1857446446842388648",icon:"🎥" },
  { odate: "20241116", otime: "2240", id: "1857780889586921937",icon:"🎥" },
  { odate: "20241115", otime: "1504", id: "1857303563422302312",icon:"1⃣" },
  { odate: "20241114", otime: "1322", id: "1856915706845302958",icon:"1⃣" },
  { odate: "20241114", otime: "2259", id: "1857060895676879075",icon:"1⃣" },
  { odate: "20241109", otime: "0547", id: "1854989261420056989",icon:"1⃣" },
  { odate: "20241109", otime: "1617", id: "1855147746006909193",icon:"1⃣" },
  { odate: "20241108", otime: "1423", id: "1854756712840069506",icon:"1⃣" },
  { odate: "20241108", otime: "1507", id: "1854767587223388577",icon:"1⃣" },
  { odate: "20241108", otime: "2212", id: "1854874746187378712",icon:"1⃣" },
  
  

];

// 2024年10月から開始
generateCalendar(2024, 9);
