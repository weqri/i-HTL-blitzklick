# iHTL Blitzklick: naloge po vrsti

**L** = Luka, **M** = Matija. Vsaka naloga = en **Issue** + ena **veja** + en **Pull Request**, ki ga pregleda drugi.

## Zakaj ne bo konfliktov
Konflikt nastane samo, kadar oba hkrati spreminjata **iste vrstice v isti datoteki**. Zato:

1. **Vsak ima svoje datoteke.** Datoteke drugega ne spreminjaš. Če nekaj rabiš, napišeš komentar v njegov Issue.
2. **Skupne spremenljivke in imena funkcij se dogovorita vnaprej** (faza 0). Potem lahko vsak dela v svoji datoteki in kliče funkcije drugega, tudi če jih ta še ni dokončal.
3. **Naloge v isti vrstici tabele delata hkrati.** Naslednjo vrstico začneta šele, ko sta oba PR-ja zmergana in sta oba naredila *Pull origin* na `main`.

---

## Faza 0: struktura (skupaj, ena ura)

Naredi **en** človek (predlog: L), drugi gleda. Ko je zmergano, oba potegneta `main`.

```
blitzklick/
  index.html            ← preimenuj Hausaufgaben-Hammer.html (za GitHub Pages)
  css/style.css
  js/stanje.js          ← skupne spremenljivke (samo dogovor, malo kode)
  js/igra.js            ← L: polje, fotografije, klik, točke
  js/zasloni.js         ← M: start, konec runde, preklapljanje zaslonov, časovnik
  js/shop.js            ← L (faza 2)
  js/lestvica.js        ← M (faza 2)
  img/ucitelji/         ← fotografije učiteljev
  img/kladiva/          ← slike kladiv za shop
  sounds/
```

`index.html` naloži vse JS datoteke z ločenimi `<script src="...">` na koncu `<body>`. **Vrstni red je pomemben:** najprej `stanje.js`, nato ostale. Ker so vse globalne (kot pri pouku), lahko ena datoteka kliče funkcijo iz druge.

**Dogovor (zapišita ga v `stanje.js` kot komentarje + začetne vrednosti):**

| Ime | Kaj je | Kdo ga spreminja |
|---|---|---|
| `score` | točke v trenutni rundi | igra.js |
| `mode` | `"timed"` ali `"infinite"` | zasloni.js |
| `running` | ali runda teče (`true`/`false`) | zasloni.js |
| `playerName` | ime igralca ali `""` za gosta | zasloni.js (kasneje login) |
| `startGame()` | začne igro na polju (pobriše točke, zažene timer fotografij) | **napiše L**, kliče M |
| `stopGame()` | ustavi timer fotografij, skrije vse | **napiše L**, kliče M |
| `showScreen(ime)` | pokaže en zaslon, skrije ostale | **napiše M**, kliče kdorkoli |

Dokler funkcija ni narejena, je lahko prazna: `function startGame() { }`. Tako drugi že lahko testira.

---

## Faza 1: igra deluje (gost, brez shopa)

| Korak | Luka (`igra.js`) | Matija (`zasloni.js`, `index.html`, `style.css`) |
|---|---|---|
| **1** | Canvas se prilagodi oknu (`resize`), 9 lukenj, funkcija `draw()` | Startni zaslon v HTML: naslov, gumba **Timed** in **Infinite**, gumb *Als Gast spielen*. Funkcija `showScreen()` |
| **2** | Seznam fotografij + `setInterval`: naključna luknja + naključna fotografija se pokaže in izgine | HUD nad canvasom: **točke** in **čas**. Ozadje strani in osnovni videz (glej *Podrobnosti*) |
| **3** | Klik: zadetek samo, če `running` in je na polju fotografija. `score++`, fotografija izgine. `startGame()` / `stopGame()` | Časovnik 30 s za Timed, gumb **Runde beenden** za Infinite. Ob koncu pokliče `stopGame()` in pokaže zaslon *konec runde* |
| **4** | Barvni robovi z **utežnim naključjem**: brez roba 1, zelena 2, vijolična 5, zlata 10. Zlata najredkejša | Zaslon *konec runde*: prikaz točk, polje za ime (gost), gumb *Nochmal* in *Zurück* |

✅ **Mejnik:** igro se da igrati od začetka do konca v obeh načinih.

---

## Faza 2: shop in lestvica (lokalno, `localStorage`)

| Korak | Luka (`shop.js`) | Matija (`lestvica.js`) |
|---|---|---|
| **5** | **Guthaben** v `localStorage`: ob koncu runde se točke prištejejo. Prikaz na startnem zaslonu | Lestvica v `localStorage`: shrani `{ime, mode, score}`. Prikaz dveh tabel (Timed / Infinite), padajoče po točkah |
| **6** | Shop zaslon: seznam kladiv (ime, slika, cena). Nakup: preveri denar, odštej, odkleni. Shrani kupljena | Gumb *In Rangliste eintragen* na zaslonu konca runde. Gost vpiše ime, sicer se vzame `playerName` |
| **7** | Izbira kladiva: kurzor se zamenja (`canvas.style.cursor = ...`) | Navigacija med zasloni: Start ↔ Shop ↔ Rangliste ↔ Igra |

✅ **Mejnik:** vse iz opisa projekta deluje za goste.

> V tej fazi se `index.html` in `style.css` spreminjata pri obeh (novi zasloni). Dogovor: **vsak doda svoj zaslon kot en blok `<div id="...">` na koncu** in svoj CSS na konec `style.css` pod komentar `/* === SHOP === */`. Tako se vrstice ne prekrivajo.

---

## Faza 3: podrobnosti (lahko vzporedno, vsak svoj seznam)

**Luka (igra):**
- Fotografija se pokaže z animacijo (zraste iz luknje) namesto da se kar pojavi
- Animacija zadetka: kratek blisk, `+5` leti navzgor v barvi roba
- Težavnost: proti koncu Timed runde se fotografije pojavljajo hitreje in so krajši čas vidne
- Ena fotografija naj ne pride dvakrat zapored v isto luknjo
- Dvojni klik na isto fotografijo ne sme dati dvakrat točk
- Zvoki: zadetek, zlati zadetek, zgrešen klik

**Matija (zasloni):**
- Odštevanje **3, 2, 1, Los!** pred začetkom runde
- Zadnjih 5 sekund čas utripa rdeče
- *Neuer Rekord!* na zaslonu konca, če je rezultat najboljši
- Gumb za vklop/izklop zvoka (shrani v `localStorage`)
- Ikona zavihka (favicon) in naslov strani
- Videz na telefonu / tabletu (gumbi dovolj veliki, nič ne gre čez rob)

---

## Faza 4: backend (login + skupna lestvica)

Predlog: **Firebase** (brezplačen, Authentication + Firestore, deluje z GitHub Pages, ne rabita lastnega strežnika). Pred tem vprašajta učitelja, ali je to OK ali naj bo PHP + MySQL na šolskem strežniku.

| Korak | Luka | Matija |
|---|---|---|
| **8** | Firebase projekt (eden ga ustvari, drugega doda), `js/firebase.js` s povezavo | Zaslon za prijavo in registracijo (HTML/CSS) |
| **9** | Registracija + prijava + odjava, `playerName` iz računa | Skupna lestvica: `lestvica.js` piše/bere iz Firestore namesto `localStorage` |
| **10** | Guthaben in kupljena kladiva se za prijavljene shranjujejo v Firestore, za goste ostane `localStorage` | Varnostna pravila v Firestore: vsak lahko piše samo svoj račun, lestvica samo dodajanje |

✅ **Mejnik:** vse iz opisa projekta deluje, tudi na drugi napravi.

---

## Faza 5: zaključek (skupaj)
- Objava na **GitHub Pages**, test na dveh računalnikih in telefonu
- Vsak preizkusi del drugega in odpre Issue za vsako napako
- Kratek `README.md`: kaj je igra, kako se igra, kdo je kaj naredil

---

## Podrobnosti, ki jih ne pozabita

**Videz**
- **Ozadje:** npr. travnik ali lesena miza za igralno polje, za strani barve i:HTL. Slika ozadja v CSS (`background-image` na `body`), polje na canvasu naj ima luknje z rjavim robom in senco
- Ena pisava za vse (Google Fonts, npr. *Press Start 2P*, ker je kladivo pixel art)
- Enotne barve gumbov, `:hover` učinek

**Fotografije učiteljev**
- Vse **enake velikosti in kvadratne** (npr. 300×300), obrezane na obraz
- Pisno dovoljenje vsakega učitelja. **Pazi:** GitHub Pages zahteva javni repozitorij, torej so fotografije javno na internetu. Učitelji morajo vedeti in se strinjati s tem
- Dokler fotografij ni, uporabljajta krtke iz `img/` kot nadomestek

**Jezik**
- Opis projekta je v nemščini, zato naj bodo tudi vsi napisi v igri nemški (*Runde beenden*, *Punkte*, *Zeit* ...)

**Delo z Gitom**
- Na začetku vsake ure: *Pull origin* na `main`
- Vejo poimenujta po nalogi: `luka/3-klik`, `matija/3-casovnik`
- PR naj bo majhen (ena naloga). Drugi ga pregleda in zmerga, ne vsak svojega
- Veja `test` naj se zbriše, ko je `main` urejen
