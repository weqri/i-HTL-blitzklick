# Hausaufgaben-Hammer: kako delava skupaj (GitHub Desktop)

## 🥇 Zlato pravilo
> **1. Pull → 2. delam → 3. Commit → 4. Push**
>
> Vedno najprej poberi kolegove spremembe, šele nato začni delati.

---

## A) Enkratna priprava

### Luka (lastnik repozitorija)
1. Odpri **GitHub Desktop** → **File → Add local repository** → izberi mapo `Hausaufgaben-Hammer` → **Add repository**.
2. Zgoraj klikni **Publish repository**.
   - Ime: `hausaufgaben-hammer`
   - *Keep this code private*: po želji (privatno = vidita samo vidva)
   - → **Publish repository**
3. Na **github.com** odpri repozitorij → **Settings → Collaborators → Add people** → vpiši sošolčevo GitHub uporabniško ime.

### Sošolec
1. Sprejmi povabilo (pride po e-mailu ali kot obvestilo na github.com).
2. V GitHub Desktop: **File → Clone repository** → zavihek *GitHub.com* → izberi `hausaufgaben-hammer` → izberi mapo → **Clone**.
3. Igro odpreš tako, da dvakrat klikneš `Hausaufgaben-Hammer.html`.

---

## B) Vsakič, ko delaš

| # | Kdaj | Kaj klikneš v GitHub Desktop |
|---|------|------------------------------|
| 1 | Preden začneš | **Fetch origin**, nato **Pull origin**, če se pokaže |
| 2 | Delaš | Kodo urejaš normalno v VS Code (*Repository → Open in Visual Studio Code*) |
| 3 | Ko nekaj deluje | Levo preveri spremenjene datoteke → spodaj levo napiši kratek opis, npr. *"Krtek se skrije ob kliku"* → **Commit to main** |
| 4 | Ko želiš poslati kolegu | **Push origin** |

💡 Commitaj pogosto: vsakič, ko en majhen del deluje. Ne čakaj do konca ure.

💡 V *History* (levo zgoraj) vidiš vse, kar je kdo naredil. Če kaj pokvariš: desni klik na commit → **Revert changes in commit**.

---

## C) Delitev dela (da ni konfliktov)

1. Vsak korak iz `stopnice.txt` dodajta kot **Issue** na github.com (zavihek *Issues → New issue*).
2. Vsak si dodeli svoje (*Assignees*), da vesta, kdo dela kaj.
3. **Ne urejajta iste datoteke ob istem času.** Pred začetkom se na hitro dogovorita, npr.:
   - *"Jaz delam klik na krtka, ti časovnik. Ti ne spreminjaj funkcije X."*
4. Ko je korak narejen, Issue zapri. Če v opis commita napišeš `closes #3`, se Issue zapre sam.

---

## D) Za naprednejše: veje (branchi)
Uporabno, ko oba hkrati delata večjo stvar.

1. **Current branch → New branch** → ime, npr. `tocke-in-cas` → **Create branch**.
2. Delaš, commitaš, klikneš **Publish branch**.
3. Ko je gotovo, klikni **Preview Pull Request → Create pull request**. Odpre se brskalnik.
4. Kolega pogleda spremembe in klikne **Merge pull request**.
5. Ti nato preklopiš na `main` (**Current branch → main**) in klikneš **Pull origin**.

---

## E) Konflikt? Brez panike 😅
Zgodi se, ko sta oba spremenila iste vrstice.

1. GitHub Desktop pokaže *"Resolve conflicts before merging"*.
2. Pri datoteki klikni **Open in Visual Studio Code**.
3. VS Code pokaže oba dela kode in gumbe:
   - *Accept Current Change*: obdrži svojo kodo
   - *Accept Incoming Change*: obdrži kolegovo kodo
   - *Accept Both Changes*: obdrži obe
4. Izberi, preveri, da igra deluje, in shrani (Ctrl+S).
5. V GitHub Desktop klikni **Continue merge**, nato **Push origin**.

---

## F) Bonus: igra na spletu (GitHub Pages)
1. Na github.com: **Settings → Pages**.
2. *Source*: **Deploy from a branch** → branch `main`, mapa `/ (root)` → **Save**.
3. Čez minuto ali dve je igra dosegljiva na
   `https://<uporabnisko-ime>.github.io/hausaufgaben-hammer/Hausaufgaben-Hammer.html`

ℹ️ Pages pri privatnem repozitoriju na brezplačnem računu ne deluje. Za to mora biti repozitorij javen.
