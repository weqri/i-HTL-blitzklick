# iHTL Blitzklick: naloge

🔵 **Luka**: igra (`igra.js`, `shop.js`)
🟢 **Matija**: zasloni (`zasloni.js`, `lestvica.js`)

Pri vsaki nalogi piše:
- 📄 **Kje**: v kateri datoteki delaš
- 🎯 **Kaj**: kaj mora delovati
- 🛠️ **Kako**: namigi, kako se lotiš (ne rešitev, ta je vaša 😉)
- ✔️ **Preizkus**: kako veš, da je narejeno

---

## 📌 Pravila za delo brez konfliktov

Konflikt nastane samo, kadar oba hkrati spreminjata **iste vrstice v isti datoteki**.

1. **Vsak ima svoje datoteke.**
   - Datoteke drugega ne spreminjaš.
   - Če nekaj rabiš, napišeš komentar v njegov Issue.

2. **Imena se dogovorita vnaprej** (korak 0).
   - Tako lahko vsak kliče funkcije drugega, tudi če še niso dokončane.

3. **En korak = en Issue + ena veja + en Pull Request.**
   - Ime veje: `luka/3-klik`, `matija/3-casovnik`
   - PR zmerga **drugi**, ne ti. Tako drugi vedno ve, kaj se je spremenilo.

4. **Naslednji korak začneta šele, ko sta oba končala prejšnjega.**
   - Oba PR-ja zmergana
   - Oba naredita *Pull origin* na `main`

---

## 🧱 Korak 0: struktura (skupaj, ena ura)

Naredi **en** (predlog: Luka), drugi gleda. Ko je zmergano, oba potegneta `main`.

### Mape in datoteke

```
blitzklick/
  HTL-Blitzklick.html
  style.css
  stanje.js           ← skupne spremenljivke
  igra.js             🔵 polje, fotografije, klik, točke
  zasloni.js          🟢 zasloni, časovnik, konec runde
  shop.js             🔵 (faza 2)
  lestvica.js         🟢 (faza 2)
  img/ucitelji/       ← fotografije učiteljev
  img/kladiva/        ← slike kladiv za shop
  sounds/
```

💡 Git ne shrani praznih map. V vsako prazno mapo daj prazno datoteko `.gitkeep`.

### Povezava JS datotek
- V HTML vsako datoteko z `<script src="...">` na konec `<body>`.
- **Najprej `stanje.js`**, nato ostale.
- Vse so globalne (kot pri pouku), zato ena datoteka lahko kliče funkcijo iz druge.

### V `stanje.js` gredo SAMO spremenljivke

Vsaka z začetno vrednostjo:
| Spremenljivka | Začetna vrednost | Pomen | Spreminja |
|---|---|---|---|
| `score` | `0` | točke v trenutni rundi | 🔵 |
| `mode` | `0` | `0` = ni izbran, `1` = Timed, `2` = Infinite | 🟢 |
| `shopmoney` | `0` | Guthaben: vse zbrane točke za shop | 🔵 |
| `running` | `false` | ali runda teče | 🟢 |
| `playerName` | `""` | ime igralca, `""` za gosta | 🟢 |

⚠️ `mode` je **število**, ne besedilo: `mode = 1`, ne `mode = "timed"`.

⚠️ V `stanje.js` **ni funkcij**. Tako ga po koraku 0 nihče več ne ureja in ni konfliktov.

### Funkcije gredo v datoteko tistega, ki jih napiše

| Funkcija | Datoteka | Kaj naredi | Napiše | Kliče |
|---|---|---|---|---|
| `startGame()` | `igra.js` | počisti točke, zažene pojavljanje fotografij | 🔵 | 🟢 |
| `stopGame()` | `igra.js` | ustavi fotografije, vse skrije | 🔵 | 🟢 |
| `showScreen(ime)` | `zasloni.js` | pokaže en zaslon, ostale skrije | 🟢 | kdorkoli |
| `updateHud()` | `zasloni.js` | na zaslon izpiše točke in čas | 🟢 | 🔵 po zadetku |
| `addGuthaben(shoppoints)` | `shop.js` | prišteje `shoppoints` k `shopmoney` (faza 2) | 🔵 | 🟢 ob koncu runde |

💡 Že v koraku 0 vsak v **svojo** datoteko napiše prazne funkcije, npr. v `igra.js`: `function startGame() { }`. Tako drugi že lahko testira klice, čeprav funkcija še nič ne naredi.

⚠️ Ista funkcija ne sme biti v dveh datotekah. JS ne javi napake, ampak tiho uporabi zadnjo naloženo.

---

## 🎮 Faza 1: igra deluje (gost, brez shopa)

### Korak 1

🔵 **Luka: igralno polje**

📄 **Kje:** `igra.js` + en `<canvas id="...">` v HTML (nad `<script>` oznakami)

🎯 **Kaj:**
- Canvas zapolni okno, tudi ko okno spremeniš
- 9 lukenj v mreži 3 × 3
- Funkcija `draw()`, ki nariše vse na novo

🛠️ **Kako:**
- Večino si že naredil: stara koda je v commitu `164010d` (*Začetno stanje igre*), datoteka `script.js`. V GitHub Desktop: **History** → ta commit → `script.js`
- Položaji kot del širine/višine (`0.2`, `0.5`, `0.8`)
- Vsaka luknja je objekt v seznamu. Že zdaj ji dodaj lastnost za fotografijo (na začetku `null` = prazna)
- `draw()`: najprej pobriše canvas, nato z `for` nariše vse luknje
- Izračun velikosti in seznama lukenj daj v funkcijo `resize()`, ki na koncu pokliče `draw()`
- `resize()` pokliči ob zagonu in v `window.addEventListener('resize', ...)`
- Rob canvasa (`border`) doda širino, zato ga odštej, sicer dobiš drsnike

✔️ **Preizkus:** spremeniš velikost okna, luknje ostanejo lepo razporejene in ni drsnikov

---

🟢 **Matija: startni zaslon**

📄 **Kje:** HTML, `style.css`, `zasloni.js`

🎯 **Kaj:**
- Naslov igre
- Gumba **Timed** in **Infinite**
- Funkcija `showScreen(ime)`

🛠️ **Kako:**
- Vsak zaslon je svoj `<div id="...">`, npr. `start`, `igra`, `konec`. Canvas premakni v `div` za igro
- `showScreen`: vse zaslone skrije, enega pokaže. Poglej CSS lastnost `display` (`"none"` / `"block"`), ki jo v JS nastaviš z `element.style.display`
- Gumb: `addEventListener('click', ...)`, kot `mousedown` pri canvasu
- Klik na gumb: nastavi `mode`, pokaže igro, pokliče `startGame()`

✔️ **Preizkus:** klik na gumb skrije start in pokaže igro, v konzoli ni napak

### Korak 2

🔵 **Luka: fotografije**

📄 **Kje:** `igra.js`

🎯 **Kaj:**
- Seznam fotografij (za zdaj krtki)
- Fotografija se pokaže v naključni luknji in čez nekaj časa izgine

🛠️ **Kako:**
- Seznam poti do slik. Vse slike naloži z `new Image()` **enkrat ob zagonu**, ne vsakič znova
- `setInterval`: naključna luknja in naključna slika z `Math.floor(Math.random() * ...)`
- Rezultat `setInterval` shrani v spremenljivko. Brez nje ga v `stopGame()` ne moreš ustaviti (`clearInterval`)
- Kako fotografija izgine? Ideja: luknja ima tudi števec, koliko časa je še vidna. Vsak tik ga zmanjšaš, pri 0 nastaviš fotografijo na `null`
- Kaj, če je izbrana luknja že zasedena?
- Na koncu vsakega tika pokliči `draw()`. V `draw()` z `drawImage` nariši fotografijo, če luknja ni prazna

✔️ **Preizkus:** fotografije se pojavljajo na različnih mestih in izginejo same

---

🟢 **Matija: HUD in ozadje**

📄 **Kje:** HTML, `style.css`, `zasloni.js`

🎯 **Kaj:**
- Nad canvasom prikaz **točk** in **časa**
- Funkcija `updateHud()`
- Ozadje strani

🛠️ **Kako:**
- V `div` za igro dodaj element za točke in element za čas, vsakega s svojim `id`
- `updateHud()` vanju zapiše `score` in čas. Enako kot pri pouku: `innerHTML` (glej `canvas-5-intersection.html`, gumba `score` in `counter`)
- Ozadje: `background-image` na `body`. Poglej še `background-size`, da slika zapolni celo stran
- Za preizkus spremeni `score` v konzoli in pokliči `updateHud()`

✔️ **Preizkus:** stran izgleda kot igra, ne kot prazna stran

### Korak 3

🔵 **Luka: klik**

📄 **Kje:** `igra.js`

🎯 **Kaj:**
- Klik na fotografijo da točko, fotografija takoj izgine
- Klik šteje samo, če `running` in je v luknji fotografija
- Prava `startGame()` in `stopGame()`

🛠️ **Kako:**
- `canvas.addEventListener('mousedown', ...)` in `e.offsetX` / `e.offsetY` (glej `canvas-2-events.html`)
- Z `for` preveri vsako luknjo: je klik znotraj pravokotnika, kjer je narisana slika? (podobno kot `intersection` v `canvas-5`)
- Na začetku funkcije: če runda ne teče, takoj `return`
- Po zadetku: `draw()` in `updateHud()`
- `startGame()`: `score = 0`, vse luknje prazne, zažene interval
- `stopGame()`: ustavi interval, vse luknje prazne, `draw()`
- Pazi, da `startGame()` dvakrat zapored ne zažene dveh intervalov hkrati

✔️ **Preizkus:** klik na fotografijo da točko, klik mimo ne, po koncu runde klik ne šteje

---

🟢 **Matija: časovnik in konec runde**

📄 **Kje:** `zasloni.js` (+ gumb v HTML)

🎯 **Kaj:**
- **Timed:** odštevanje 30 s, pri 0 se runda konča
- **Infinite:** brez časa, gumb **Runde beenden**
- Ob koncu se pokaže zaslon *konec runde*

🛠️ **Kako:**
- Spremenljivka za preostali čas. `setInterval` na 1000 ms jo zmanjšuje in kliče `updateHud()`
- Naredi **eno** funkcijo za konec runde, ki jo kličeta oba načina: `running = false`, `stopGame()`, ustavi svoj interval, `showScreen(...)`
- Gumb *Runde beenden* je viden samo v Infinite načinu
- Pri Infinite naj HUD namesto časa pokaže npr. `∞`

✔️ **Preizkus:** runda se konča v obeh načinih, čas ne gre pod 0

### Korak 4

🔵 **Luka: barvni robovi**

📄 **Kje:** `igra.js`

🎯 **Kaj:**
- Vsaka fotografija dobi rob z **utežnim naključjem**:
  - brez roba: 1 točka (najpogosteje)
  - 🟩 zelena: 2 točki
  - 🟪 vijolična: 5 točk
  - 🟨 zlata: 10 točk (najredkeje)

🛠️ **Kako:**
- `Math.random()` vrne število od 0 do 1. Razdeli ta interval na dele različnih velikosti, npr. če je manj kot 0.05 → zlata. Večji del = pogostejša barva
- Barvo in točke shrani v objekt luknje, ko se fotografija pojavi
- Rob: pred ali po `drawImage` nariši pravokotnik z `strokeRect`, `strokeStyle` in `lineWidth`
- Pri zadetku prištej točke iz luknje, ne `+1`

✔️ **Preizkus:** zlato vidiš redko, točke se pravilno prištejejo

---

🟢 **Matija: zaslon konec runde**

📄 **Kje:** HTML, `style.css`, `zasloni.js`

🎯 **Kaj:**
- Prikaz doseženih točk
- Polje za ime (za goste)
- Gumba *Nochmal* in *Zurück*

🛠️ **Kako:**
- Nov `div` za zaslon konca. Točke vpišeš, ko se zaslon pokaže
- Polje za ime: `<input>`. Vrednost prebereš z `.value`
- *Nochmal*: isti `mode` kot prej, znova nastavi čas, pokaže igro, `startGame()`
- *Zurück*: `showScreen` na start

✔️ **Preizkus:** lahko odigraš več rund zapored, čas se vsakič začne pri 30

### ✅ Mejnik: igro se da odigrati od začetka do konca v obeh načinih

---

## 🛒 Faza 2: shop in lestvica (lokalno)

⚠️ V tej fazi oba spreminjata HTML in `style.css` (novi zasloni).
- Vsak doda svoj zaslon kot en `<div id="...">` **na konec** `<body>` (pred `<script>`).
- CSS vsak doda **na konec** `style.css` pod svoj komentar, npr. `/* === SHOP === */`.
- Tako se vrstice ne prekrivajo.

💡 `localStorage` shranjuje **samo besedilo**:
- Število: pri branju ga pretvori nazaj z `Number(...)`
- Seznam ali objekt: pri pisanju `JSON.stringify(...)`, pri branju `JSON.parse(...)`
- Če nečesa še ni shranjenega, `getItem` vrne `null`. Na to moraš paziti ob prvem zagonu

### Korak 5

🔵 **Luka: Guthaben**

📄 **Kje:** `shop.js` (+ element za prikaz na startnem zaslonu, dogovori se z Matijo za `id`)

🎯 **Kaj:**
- `addGuthaben(shoppoints)` prišteje točke k `shopmoney` in shrani
- Guthaben ostane po zaprtju brskalnika
- Prikaz na startnem zaslonu

🛠️ **Kako:**
- `localStorage.setItem("guthaben", ...)` in `localStorage.getItem("guthaben")`
- Ob zagonu preberi shranjeno vrednost. Če je `null`, začni z 0
- Matija pokliče `addGuthaben(score)` v svoji funkciji za konec runde

✔️ **Preizkus:** odigraš rundo, zapreš in odpreš stran, Guthaben ostane

---

🟢 **Matija: lestvica**

📄 **Kje:** `lestvica.js` + nov zaslon v HTML

🎯 **Kaj:**
- Seznam vnosov `{ime, mode, score}` shranjen v `localStorage`
- Dve tabeli: Timed in Infinite, od največ do najmanj točk

🛠️ **Kako:**
- Cel seznam shraniš kot en ključ z `JSON.stringify`
- Ločitev po načinih: poglej metodo `filter` za sezname
- Razvrščanje: poglej metodo `sort` s funkcijo za primerjavo. Brez nje razvršča kot besedilo (10 pred 9)
- Tabelo zgradi z `for` zanko in `innerHTML` (`<tr>`, `<td>`)
- Za preizkus dodaj nekaj vnosov kar iz konzole

✔️ **Preizkus:** več vnosov, vrstni red je pravilen, po osvežitvi ostanejo

### Korak 6

🔵 **Luka: shop**

📄 **Kje:** `shop.js` + nov zaslon v HTML

🎯 **Kaj:**
- Seznam kladiv: ime, slika, cena
- Nakup: preveri denar, odšteje ceno, odklene kladivo
- Kupljena kladiva ostanejo shranjena

🛠️ **Kako:**
- Kladiva so seznam objektov. Prvo naj bo zastonj in vedno odklenjeno
- Zaslon zgradi z `for` zanko: za vsako kladivo slika, ime, cena in gumb
- Kupljena kladiva: seznam imen v `localStorage` (z `JSON`)
- Pri nakupu najprej preveri, ali je dovolj denarja in ali kladivo že imaš
- Po nakupu znova izriši shop, da gumb pokaže *Gekauft*

✔️ **Preizkus:** brez denarja ne moreš kupiti, kupljeno ostane po osvežitvi

---

🟢 **Matija: vpis v lestvico**

📄 **Kje:** `zasloni.js` (zaslon konec runde) + `lestvica.js`

🎯 **Kaj:**
- Gumb *In Rangliste eintragen*
- Gost vpiše ime, prijavljen igralec ne (vzame `playerName`)

🛠️ **Kako:**
- Gumb vzame ime, `mode` in `score` ter jih doda v lestvico
- Prazno ime: ne dovoli vpisa, pokaži opozorilo
- Po vpisu gumb onemogoči (`disabled`), da se isti rezultat ne vpiše dvakrat

✔️ **Preizkus:** rezultat se pokaže v pravi tabeli, samo enkrat

### Korak 7

🔵 **Luka: izbira kladiva**

📄 **Kje:** `shop.js`

🎯 **Kaj:**
- V shopu izbereš eno od kupljenih kladiv
- Kurzor nad canvasom postane izbrano kladivo

🛠️ **Kako:**
- Izbrano kladivo shrani v `localStorage`, da ostane izbrano
- Kurzor nastaviš iz JS: `canvas.style.cursor = ...` z enakim besedilom kot v CSS (`url(...) x y, auto`)
- Vse slike kladiv naj bodo 32 × 32, s konico na istem mestu
- Ob zagonu nastavi kurzor na shranjeno kladivo

✔️ **Preizkus:** po osvežitvi je kurzor še vedno izbrano kladivo

---

🟢 **Matija: navigacija**

📄 **Kje:** HTML, `zasloni.js`

🎯 **Kaj:**
- Gumbi za premik med zasloni: Start, Shop, Rangliste, Igra
- Iz vsakega zaslona se lahko vrneš na start

🛠️ **Kako:**
- Vsi prehodi gredo samo prek `showScreen`
- Ko odpreš lestvico ali shop, ju znova izriši, da sta podatka sveža
- Kaj se zgodi, če med rundo klikneš na drug zaslon? Runda se mora končati

✔️ **Preizkus:** nikjer se ne "zatakneš", v konzoli ni napak

### ✅ Mejnik: vse iz opisa projekta deluje za goste

---

## ✨ Faza 3: podrobnosti

Vsak dela na svojem seznamu, v poljubnem vrstnem redu. Namig je v oklepaju.

🔵 **Luka** (`igra.js`)
- Fotografija zraste iz luknje *(višina slike se vsak tik malo poveča)*
- Animacija zadetka: `+5` leti navzgor *(seznam besedil s položajem, vsak tik `y` zmanjšaš, `fillText`)*
- Težavnost: igra postaja hitrejša *(interval z `setTimeout` namesto `setInterval`, čas se zmanjšuje)*
- Ista fotografija ne pride dvakrat zapored v isto luknjo *(zapomni si zadnjo)*
- Dvojni klik ne da dvakrat točk *(fotografijo počisti takoj ob zadetku)*
- Zvoki: zadetek, zlati zadetek, zgrešen *(`new Audio(...)`, `.play()`, glej mapo `audio-video` od pouka)*

🟢 **Matija** (`zasloni.js`, `style.css`)
- Odštevanje **3, 2, 1, Los!** *(kratek interval pred `startGame()`)*
- Zadnjih 5 s čas rdeč *(v `updateHud()` preveri čas, zamenjaj barvo ali CSS razred)*
- *Neuer Rekord!* *(primerjaj z najboljšim v lestvici)*
- Gumb za zvok *(spremenljivka `true/false` v `localStorage`, Luka jo preveri pred `.play()`)*
- Favicon in naslov strani *(`<link rel="icon">`)*
- Telefon in tablet *(F12 → ikona telefona za preizkus)*

---

## 🔐 Faza 4: backend (login + skupna lestvica)

Predlog: **Firebase**
- Brezplačen
- Prijava (Authentication) in baza (Firestore)
- Deluje z GitHub Pages, ne rabita svojega strežnika

⚠️ Pred začetkom vprašajta učitelja, ali je Firebase OK ali naj bo raje PHP + MySQL na šolskem strežniku.

💡 Firebase uporabite v načinu **compat** (navadne `<script src>` oznake). Tako deluje globalno kot ostale vaše datoteke, brez `import`.

### Korak 8

🔵 **Luka: povezava**
- 📄 `firebase.js` + `<script>` oznake v HTML
- Ustvari projekt na firebase.google.com, doda Matijo kot člana
- 🛠️ Sledi navodilom *Add Firebase to your web app*, vklopi *Authentication* (Email/Password) in *Firestore*
- ✔️ V konzoli izpišeš, da je povezava uspela

🟢 **Matija: zaslon za prijavo**
- 📄 HTML, `style.css`, `zasloni.js`
- Polji za e-mail in geslo, gumba *Anmelden* in *Registrieren*, gumb *Abmelden*
- 🛠️ Gumbi za zdaj samo `console.log`. Luka bo dodal funkcije, dogovorita se za imena
- ✔️ Zaslon izgleda kot ostali

### Korak 9

🔵 **Luka: prijava**
- 📄 `firebase.js`
- Registracija, prijava, odjava, `playerName` iz računa
- 🛠️ Poglej `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `onAuthStateChanged`
- ✔️ Po osvežitvi strani si še vedno prijavljen

🟢 **Matija: skupna lestvica**
- 📄 `lestvica.js`
- Piše in bere iz Firestore namesto iz `localStorage`
- 🛠️ Poglej `collection(...).add(...)` in `orderBy("score", "desc")`
- ✔️ Rezultat z enega računalnika vidiš na drugem

### Korak 10

🔵 **Luka: shranjevanje računa**
- 📄 `shop.js`, `firebase.js`
- Prijavljeni: Guthaben in kladiva v Firestore. Gostje: ostane `localStorage`
- 🛠️ En dokument na uporabnika, ime dokumenta = ID uporabnika
- ✔️ Kupiš kladivo, prijaviš se na drugem računalniku, kladivo je tam

🟢 **Matija: varnost**
- 📄 Firebase konzola → Firestore → *Rules*
- Vsak lahko spreminja samo svoj račun, v lestvico se lahko samo dodaja
- ✔️ Preizkusi, da ne moreš spremeniti tujega Guthaben

### ✅ Mejnik: vse iz opisa projekta deluje, tudi na drugi napravi

---

## 🚀 Faza 5: zaključek (skupaj)

- Objava na **GitHub Pages**
- Test na dveh računalnikih in na telefonu
- Vsak preizkusi del drugega in za vsako napako odpre Issue
- Kratek `README.md`: kaj je igra, kako se igra, kdo je kaj naredil

---

## 📝 Podrobnosti, ki jih ne pozabita

### Videz
- **Ozadje:** trava ali lesena miza za igralno polje, barve i:HTL za zaslone
- Luknje z rjavim robom in senco
- Ena pisava za vse, npr. *Press Start 2P* (Google Fonts), ker je kladivo pixel art
- Enaki gumbi povsod, učinek ob `:hover`

### Fotografije učiteljev
- Vse **kvadratne in enake velikosti** (npr. 300 × 300), obrezane na obraz
- **Pisno dovoljenje** vsakega učitelja
- ⚠️ GitHub Pages zahteva javni repozitorij, torej so fotografije **javno na internetu**. Učitelji morajo to vedeti in se strinjati.
- Dokler fotografij ni, uporabljajta krtke kot nadomestek

### Jezik
- Opis projekta je v nemščini, zato vsi napisi v igri v nemščini (`<html lang="de">`)
- *Runde beenden*, *Punkte*, *Zeit*, *Nochmal* ...

### Git
- Na začetku vsake ure: *Pull origin* na `main`
- Majhni PR-ji, en korak na PR
- Veja `test` se zbriše, ko je `main` urejen
