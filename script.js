// Woman   &#128105; Man  &#128104; locatie 📍 book  &#128213;

window.ppls = null;
(async function load() {
  try {
    const res = await fetch("https://ermi-mekdi.github.io/Acts/data/ppls.json");
    if (!res.ok) throw new Error(res.status);
    window.ppls = await res.json();
    //console.log("ppls loaded", window.ppls);
  } catch (err) {
    console.error("Failed to load ppls.json", err);
    window.ppls = {};
  }
})();
window.ver = null;
(async function load() {
  try {
    const res = await fetch("https://ermi-mekdi.github.io/Acts/data/ver.json");
    if (!res.ok) throw new Error(res.status);
    window.ver = await res.json();
    //console.log("vers loaded", window.ver);
  } catch (err) {
    console.error("Failed to load vers.json", err);
    window.ver = {};
  }
})();
window.plc = null;
(async function load() {
  try {
    const res = await fetch("https://ermi-mekdi.github.io/Acts/data/plc.json");
    if (!res.ok) throw new Error(res.status);
    window.plc = await res.json();
    //console.log("vers loaded", window.word);
  } catch (err) {
    console.error("Failed to load plc.json", err);
    window.plc = {};
  }
})();
window.word = null;
(async function load() {
  try {
    const res = await fetch("https://ermi-mekdi.github.io/Acts/data/word.json");
    if (!res.ok) throw new Error(res.status);
    window.word = await res.json();
    //console.log("vers loaded", window.word);
  } catch (err) {
    console.error("Failed to load word.json", err);
    window.word = {};
  }
})();

function dP(p) {
  const d = window.ppls;
  const m = d[p];

  const display = document.createElement("div");
  display.classList.add("person");
  display.id = "pdisplay";
  document.body.appendChild(display);
  const sex = m.man === true ? "&#128104; " : "&#128105; ";
  const def1 = m.nameM1 ? m.name1 + " ማለት " + m.nameM1 : "";
  const def2 = m.nameM2 ? m.name2 + " ማለት " + m.nameM2 : "";
  const naam2 =
    m && m.name2 && String(m.name2).trim() !== ""
      ? `ካልኣይ ስም  ${m.name2}  (${m.nameE2})`
      : "";
  const info = m.info ? m.info.map((item) => `<li>${item}</li>`).join("") : "";
  const vers = m.ver ? m.ver.map((item) => `<li>${item}</li>`).join("") : "";
  const adres =
    m && m.adres && String(m.adres).trim() !== ""
      ? m.adres
          .map(
            (item) => `
            
    <li>${item}</li>`
          )
          .join("")
      : "";
  const title = m.title
    ? m.title.map((item) => `<li>${item}</li>`).join("")
    : "";

  display.innerHTML = `
  <div onclick="de()" class="x">X</div>
  <h3>${sex}</h3>
  <h2> ስም ${m.name1} (${m.nameE1}) </h2>
  <h4>${def1}</h4>
  <h3> ${naam2} </h3>  
  <h4>${def2} </h4> 
  <div class= "pdetails">  
  <h4>ስራሕ</h4>
  <ul>${title}</ul> 
  <h4>አድራሻ</h4>
  <ul>${adres}</ul>
  <ul>${vers}</ul>
  <h4>ሓበሬታ</h4>
  <ul>${info}</ul>
  </div>
  <button class="xbtn" onclick="de()">Close</button>
  `;
  // console.log(d);
  // console.log(d[p]);
}

function dPlc(c) {
  const d = window.plc;
  const p = d[c];

  const display = document.createElement("div");
  display.classList.add("person");
  display.id = "pdisplay";
  document.body.appendChild(display);

  const def1 = p.nameM1 ? p.name1 + " ማለት " + p.nameM1 : "";
  const def2 =
    p && p.name2 && String(p.name2).trim() !== ""
      ? `ካልኣይ ስም  ${p.name2}  (${p.nameE2})`
      : "";
  const vers = p.vers ? p.vers.map((item) => `<li>${item}</li>`).join("") : "";
  const gMap = p.gMap ? `<a href="${p.gMap}" target="_blank">Map</a>` : "";
  const info = p.info ? p.info.map((item) => `<li>${item}</li>`).join("") : "";
  display.innerHTML = `
  <div onclick="de()" class="x">X</div> 
  <h2> ${p.name1} (${p.nameE1})  ${p.name2}  ${p.nameE2} </h2>
  <h4>${def1}</h4>
  <h3>${def2} </h3>
  <div class= "pdetails"> 
  <ul>${vers}</ul> 
  <h4>${gMap}</h4>
  <ul>${info}</ul>
  </div>
  <button class="xbtn" onclick="de()">Close</button>
  `;
}

function de() {
  const display = document.getElementById("pdisplay").remove();
}

function dW(w, event) {
  const q = window.word;
  const m = q[w];
  const display = document.createElement("div");
  display.classList.add("word");
  display.id = "pdisplay";
  document.body.appendChild(display);
  display.innerHTML = `  
    <h2>${m.d}</h2>    
  `;
  // Position at click
  display.style.position = "absolute";
  display.style.left = event.clientX + window.scrollX + "px";
  display.style.top = Math.max(event.clientY + window.scrollY, 10) + "px";
  setTimeout(de, 2000);
}
function getVerseByPath(path) {
  if (!window.ver) {
    console.warn("ver.json not loaded yet");
    return null;
  }
  const keys = path.split("."); // e.g., ['o', 'exo', 'c20', 'v20']
  let obj = window.ver;
  for (const key of keys) {
    if (!obj || typeof obj !== "object") return null;
    obj = obj[key];
  }
  return obj;
}
function dV(b) {
  if (!Array.isArray(b)) {
    console.warn("dV: b should be an array of paths, got:", b);
    return;
  }

  // Map each path in b to its verse object, filter out any nulls
  const verses = b.map((path) => getVerseByPath(path)).filter((verse) => verse);

  if (verses.length === 0) {
    console.warn("No verses found for paths:", b);
    return;
  }

  // Pass the array of verse objects to vers() for display
  vers(verses);
  //console.log("Paths:", b);
  //console.log("Verses:", verses);
}
