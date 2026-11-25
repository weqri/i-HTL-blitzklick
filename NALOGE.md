# iHTL Blitzklick: naloge

🔵 **Luka**: igra (`igra.js`, `shop.js`)
🟢 **Matija**: zasloni (`zasloni.js`, `lestvica.js`)

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
  index.html          ← preimenuj Hausaufgaben-Hammer.html (za GitHub Pages)
  css/style.css
  js/stanje.js        ← skupne spremenljivke
  js/igra.js          🔵 polje, fotografije, klik, točke
  js/zasloni.js       🟢 zasloni, časovnik, konec runde
  js/shop.js          🔵 (faza 2)
  js/lestvica.js      🟢 (faza 2)
  img/ucitelji/       ← fotografije učiteljev
  img/kladiva/        ← slike kladiv za shop
  sounds/
```

### Povezava JS datotek
- V `index.html` vsako datoteko z `<script src="...">` na konec `<body>`.
- **Najprej `stanje.js`**, nato ostale.
- Vse so globalne (kot pri pouku), zato ena datoteka lahko kliče funkcijo iz druge.

### Dogovor v `stanje.js`

**Spremenljivke:**
- `score`: točke v trenutni rundi. Spreminja 🔵
- `mode`: `"timed"` ali `"infinite"`. Spreminja 🟢
- `running`: ali runda teče (`true` / `false`). Spreminja 🟢
- `playerName`: ime igralca, `""` za gosta. Spreminja 🟢

**Funkcije:**
- `startGame()`: počisti točke, zažene pojavljanje fotografij. Napiše 🔵, kliče 🟢
- `stopGame()`: ustavi fotografije, vse skrije. Napiše 🔵, kliče 🟢
- `showScreen(ime)`: pokaže en zaslon, ostale skrije. Napiše 🟢, kliče kdorkoli

💡 Dokler funkcija ni narejena, je lahko prazna: `function startGame() { }`. Tako drugi že lahko testira.

---

## 🎮 Faza 1: igra deluje (gost, brez shopa)

### Korak 1

🔵 **Luka: igralno polje**
- Canvas se prilagodi velikosti okna (tudi ob spremembi okna)
- 9 lukenj v mreži 3 × 3
- Funkcija `draw()`, ki nariše vse na novo
- *Preizkus:* spremeniš velikost okna, luknje ostanejo lepo razporejene

🟢 **Matija: startni zaslon**
- Naslov igre
- Gumba **Timed** in **Infinite**
- Gumb *Als Gast spielen*
- Funkcija `showScreen()`
- *Preizkus:* klik na gumb skrije start in pokaže igro

### Korak 2

🔵 **Luka: fotografije**
- Seznam fotografij (za zdaj krtki iz `img/`)
- `setInterval`: izbere naključno luknjo in naključno fotografijo
- Fotografija je vidna kratek čas, nato izgine
- *Preizkus:* fotografije se pojavljajo na različnih mestih

🟢 **Matija: HUD in videz**
- Nad canvasom prikaz **točk** in **časa**
- Ozadje strani (glej *Podrobnosti* spodaj)
- Osnovni videz gumbov in pisave
- *Preizkus:* stran izgleda kot igra, ne kot prazna stran

### Korak 3

🔵 **Luka: klik**
- Klik šteje samo, če je `running` in je v luknji fotografija
- Zadetek: `score` se poveča, fotografija takoj izgine
- Napiše `startGame()` in `stopGame()`
- *Preizkus:* klik na fotografijo da točko, klik mimo ne

🟢 **Matija: časovnik in konec runde**
- **Timed:** odštevanje 30 s, ob 0 se runda konča
- **Infinite:** brez časa, gumb **Runde beenden**
- Ob koncu pokliče `stopGame()` in pokaže zaslon *konec runde*
- *Preizkus:* runda se konča v obeh načinih

### Korak 4

🔵 **Luka: barvni robovi**
- Vsaka fotografija dobi rob z **utežnim naključjem**:
  - brez roba: 1 točka (najpogosteje)
  - 🟩 zelena: 2 točki
  - 🟪 vijolična: 5 točk
  - 🟨 zlata: 10 točk (najredkeje)
- *Preizkus:* zlato vidiš redko, točke se pravilno prištejejo

🟢 **Matija: zaslon konec runde**
- Prikaz doseženih točk
- Polje za ime (za goste)
- Gumba *Nochmal* in *Zurück*
- *Preizkus:* lahko odigraš več rund zapored

### ✅ Mejnik: igro se da odigrati od začetka do konca v obeh načinih

---

## 🛒 Faza 2: shop in lestvica (lokalno)

⚠️ V tej fazi oba spreminjata `index.html` in `style.css` (novi zasloni).
- Vsak doda svoj zaslon kot en `<div id="...">` **na konec** `<body>`.
- CSS vsak doda **na konec** `style.css` pod svoj komentar, npr. `/* === SHOP === */`.
- Tako se vrstice ne prekrivajo.

### Korak 5

🔵 **Luka: Guthaben**
- Ob koncu runde se točke prištejejo k Guthaben
- Shrani v `localStorage`, da ostane po zaprtju brskalnika
- Prikaz Guthaben na startnem zaslonu
- *Preizkus:* zapreš in odpreš stran, Guthaben ostane

🟢 **Matija: lestvica**
- Shrani vnos `{ime, mode, score}` v `localStorage`
- Dve tabeli: Timed in Infinite
- Razvrščeno po točkah, od največ do najmanj
- *Preizkus:* več vnosov, vrstni red je pravilen

### Korak 6

🔵 **Luka: shop**
- Seznam kladiv: ime, slika, cena
- Nakup: preveri, ali je dovolj denarja, odšteje ceno, odklene kladivo
- Kupljena kladiva shrani v `localStorage`
- *Preizkus:* brez denarja ne moreš kupiti, kupljeno ostane

🟢 **Matija: vpis v lestvico**
- Gumb *In Rangliste eintragen* na zaslonu konec runde
- Gost vpiše ime, prijavljen igralec ne (vzame `playerName`)
- *Preizkus:* rezultat se pokaže v pravi tabeli

### Korak 7

🔵 **Luka: izbira kladiva**
- V shopu izbereš eno od kupljenih kladiv
- Kurzor nad canvasom se zamenja v izbrano kladivo
- *Preizkus:* v naslednji rundi je kurzor novo kladivo

🟢 **Matija: navigacija**
- Gumbi za premik med zasloni: Start, Shop, Rangliste, Igra
- Iz vsakega zaslona se lahko vrneš na start
- *Preizkus:* nikjer se ne "zatakneš"

### ✅ Mejnik: vse iz opisa projekta deluje za goste

---

## ✨ Faza 3: podrobnosti

Vsak dela na svojem seznamu, v poljubnem vrstnem redu.

🔵 **Luka: igra**
- Fotografija zraste iz luknje, namesto da se kar pojavi
- Animacija zadetka: kratek blisk, `+5` leti navzgor v barvi roba
- Težavnost: proti koncu runde se fotografije pojavljajo hitreje in so vidne krajši čas
- Ista fotografija ne pride dvakrat zapored v isto luknjo
- Dvojni klik na isto fotografijo ne da dvakrat točk
- Zvoki: zadetek, zlati zadetek, zgrešen klik

🟢 **Matija: zasloni**
- Odštevanje **3, 2, 1, Los!** pred začetkom runde
- Zadnjih 5 sekund čas utripa rdeče
- *Neuer Rekord!*, če je rezultat najboljši
- Gumb za vklop / izklop zvoka (shrani v `localStorage`)
- Ikona zavihka (favicon) in naslov strani
- Videz na telefonu in tabletu: gumbi dovolj veliki, nič ne gre čez rob

---

## 🔐 Faza 4: backend (login + skupna lestvica)

Predlog: **Firebase**
- Brezplačen
- Prijava (Authentication) in baza (Firestore)
- Deluje z GitHub Pages, ne rabita svojega strežnika

⚠️ Pred začetkom vprašajta učitelja, ali je Firebase OK ali naj bo raje PHP + MySQL na šolskem strežniku.

### Korak 8

🔵 **Luka: povezava**
- Ustvari Firebase projekt, doda Matijo
- `js/firebase.js` s povezavo

🟢 **Matija: zaslon za prijavo**
- HTML in CSS za prijavo in registracijo
- Gumb *Abmelden*

### Korak 9

🔵 **Luka: prijava**
- Registracija, prijava, odjava
- `playerName` se vzame iz računa

🟢 **Matija: skupna lestvica**
- `lestvica.js` piše in bere iz Firestore namesto iz `localStorage`
- Vsi vidijo iste rezultate

### Korak 10

🔵 **Luka: shranjevanje računa**
- Prijavljeni: Guthaben in kladiva v Firestore
- Gostje: ostane `localStorage`

🟢 **Matija: varnost**
- Varnostna pravila v Firestore:
  - vsak lahko spreminja samo svoj račun
  - v lestvico se lahko samo dodaja, ne briše

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
- Ozadje strani kot slika v CSS (`background-image` na `body`)
- Luknje z rjavim robom in senco
- Ena pisava za vse, npr. *Press Start 2P* (Google Fonts), ker je kladivo pixel art
- Enaki gumbi povsod, učinek ob `:hover`

### Fotografije učiteljev
- Vse **kvadratne in enake velikosti** (npr. 300 × 300), obrezane na obraz
- **Pisno dovoljenje** vsakega učitelja
- ⚠️ GitHub Pages zahteva javni repozitorij, torej so fotografije **javno na internetu**. Učitelji morajo to vedeti in se strinjati.
- Dokler fotografij ni, uporabljajta krtke iz `img/`

### Jezik
- Opis projekta je v nemščini, zato vsi napisi v igri v nemščini
- *Runde beenden*, *Punkte*, *Zeit*, *Nochmal* ...

### Git
- Na začetku vsake ure: *Pull origin* na `main`
- Majhni PR-ji, en korak na PR
- Veja `test` se zbriše, ko je `main` urejen
