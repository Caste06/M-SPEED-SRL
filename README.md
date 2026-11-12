# M-SPEED SRL — Sito Web Istituzionale & Sistema Articoli (Astro)

Sito web vetrina per **M-SPEED SRL** (trasporti internazionali su gomma Italia – Europa), sviluppato con **Astro** in modalità SSG (Static Site Generation), senza database e ottimizzato per il deployment su **Cloudflare Pages**.

---

## 📋 Indice

1. [Panoramica e Architettura](#panoramica-e-architettura)
2. [Prerequisiti](#prerequisiti)
3. [Installazione Dipendenze](#installazione-dipendenze)
4. [Avvio in Locale](#avvio-in-locale)
5. [Esecuzione della Build di Produzione](#esecuzione-della-build-di-produzione)
6. [Come Creare un Nuovo Articolo Markdown](#come-creare-un-nuovo-articolo-markdown)
7. [Pubblicazione su GitHub](#pubblicazione-su-github)
8. [Configurazione Cloudflare Pages](#configurazione-cloudflare-pages)
9. [Struttura del Progetto](#struttura-del-progetto)

---

## 🚀 1. Panoramica e Architettura

- **Framework:** [Astro](https://astro.build/) (Static Site Generation pura, 0 JavaScript lato server, rendering istantaneo).
- **Gestione Contenuti:** [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) (`src/content/articoli/`). Gli articoli vengono pubblicati aggiungendo semplici file `.md` (Markdown).
- **Stili & UI:** CSS corporate personalizzato in `public/css/style.css`, responsive design, drawer mobile e animazioni scroll native.
- **Hosting / CDN:** Cloudflare Pages (distribuzione statica globale ad alte prestazioni).

---

## 🛠️ 2. Prerequisiti

- **Node.js:** versione `>= 22.0.0` (consigliata Node 22 LTS o superiore).
- **npm:** versione `>= 9.0.0` (incluso con Node.js).
- **Git** installato e configurato.

Verifica le versioni nel terminale:
```bash
node -v
npm -v
```

---

## 📦 3. Installazione Dipendenze

Posizionati all'interno della cartella del progetto (`M-SPEED-SRL`) ed esegui:

```bash
npm install
```

---

## 💻 4. Avvio in Locale

Per avviare il server di sviluppo locale con Hot Module Replacement (aggiornamento in tempo reale):

```bash
npm run dev
```

Il sito sarà accessibile all'indirizzo:
👉 **`http://localhost:4321/`**

Tutte le pagine principali sono disponibili:
- **Home:** `http://localhost:4321/`
- **Azienda:** `http://localhost:4321/azienda/`
- **Servizi:** `http://localhost:4321/servizi/`
- **Destinazioni:** `http://localhost:4321/destinazioni/`
- **Elenco Articoli:** `http://localhost:4321/articoli/`
- **Singolo Articolo:** `http://localhost:4321/articoli/potenziamento-nord-europa/`
- **Notizie e Avvisi:** `http://localhost:4321/notizie/`
- **Contatti:** `http://localhost:4321/contatti/`
- **Privacy:** `http://localhost:4321/privacy/`
- **Cookie:** `http://localhost:4321/cookie/`

---

## 🏗️ 5. Esecuzione della Build di Produzione

Per compilare il sito statico in formato di produzione:

```bash
npm run build
```

L'output statico viene generato interamente nella cartella:
```
dist/
```

Per testare in locale la build identica a quella che sarà pubblicata su Cloudflare Pages:

```bash
npm run preview
```

---

## ✍️ 6. Come Creare un Nuovo Articolo Markdown

Non serve toccare il codice del sito, né creare pagine HTML o configurare database.
Per pubblicare un nuovo articolo:

1. Crea un nuovo file `.md` all'interno della cartella:
   ```
   src/content/articoli/
   ```
   *Esempio nome file:* `linea-settimanale-spagna.md`

2. Inserisci in cima al file il frontmatter con i metadati richiesti:
   ```markdown
   ---
   title: "Nuova tratta diretta verso la Spagna industriale"
   description: "Potenziamento dei collegamenti settimanali da Montecosaro e Fucecchio verso Barcellona, Saragozza, Madrid e Valencia."
   date: 2026-11-20
   image: "/images/hero-truck-daylight.jpg"
   category: "Nuove Tratte"
   author: "Ufficio Traffico M-SPEED"
   ---

   Inserisci qui il testo dell'articolo in linguaggio Markdown standard...

   ## Titolo di secondo livello

   Paragrafi di approfondimento con dettagli operativi...

   - Elenco puntato con dettagli tratta
   - Finestre di carico settimanali
   - Contatto diretto con referente dedicato

   ### Link e Immagini
   Puoi inserire link come [scopri i nostri servizi](/servizi/) oppure immagini con `![Didascalia](/images/service-pallets.jpg)`.
   ```

3. **Campi del frontmatter supportati:**
   - `title` *(obbligatorio, stringa)*: Titolo dell'articolo.
   - `description` *(obbligatorio, stringa)*: Breve riassunto/estratto visualizzato nelle card e nei meta tag SEO.
   - `date` *(obbligatorio, formato YYYY-MM-DD)*: Data di pubblicazione (usata per l'ordinamento automatico dal più recente al più vecchio).
   - `image` *(opzionale, stringa)*: Percorso dell'immagine di copertina presente in `public/images/`.
   - `category` *(opzionale, stringa)*: Categoria (es. `Nuove Tratte`, `Guida Pratica`, `Normative`).
   - `author` *(opzionale, stringa)*: Autore dell'articolo (default: `M-SPEED SRL`).

4. Appena salvato il file:
   - La pagina `/articoli/` mostrerà automaticamente la nuova scheda in cima.
   - Verrà generata automaticamente la pagina `/articoli/linea-settimanale-spagna/`.
   - Nella home page comparirà tra i post recenti.

---

## 🌿 7. Pubblicazione su GitHub

Tutto il codice è sviluppato sul branch dedicato:
```
feature/astro-articoli
```

Per registrare le modifiche ed eseguire il push verso il repository remoto:

```bash
# 1. Aggiungi i file modificati
git add .

# 2. Crea un commit descrittivo
git commit -m "feat: integrazione Astro, content collection articoli markdown e configurazione Cloudflare Pages"

# 3. Pubblica il branch sul repository GitHub remoto
git push -u origin feature/astro-articoli
```

Dopo la verifica, sarà possibile aprire una **Pull Request** su GitHub per effettuare il merge su `main`.

---

## ☁️ 8. Configurazione Cloudflare Pages

Per pubblicare il sito su Cloudflare Pages collegando il repository GitHub esistente:

### Procedura passo-passo su Cloudflare Dashboard:

1. Accedi a [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Clicca su **Create application** > scheda **Pages** > **Connect to Git**.
3. Seleziona il repository GitHub: `Caste06/M-SPEED-SRL`.
4. Configura i seguenti parametri di build:

| Parametro Cloudflare | Valore da inserire | Note |
|---|---|---|
| **Project name** | `m-speed` *(o a scelta)* | Nome identificativo del progetto su Cloudflare |
| **Production branch** | `main` | Branch principale per la produzione |
| **Framework preset** | `Astro` | Cloudflare imposterà in automatico i default per Astro |
| **Build command** | `npm run build` | Comando che esegue la compilazione statica |
| **Build output directory** | `dist` | Cartella in cui Astro genera i file statici |
| **Root directory** | `/` *(vuoto / default)* | Poiché `package.json` si trova alla radice del repository Git `M-SPEED-SRL` |

> [!NOTE]
> Se in Cloudflare imposti il build su Node.js più recente, aggiungi nelle **Environment Variables** di Cloudflare Pages:
> - **Variable name:** `NODE_VERSION`
> - **Value:** `22` (o `20`)

5. Clicca su **Save and Deploy**.
6. Cloudflare effettuerà la build statica e distribuirà il sito sulla rete globale con certificato SSL automatico e URL `*.pages.dev` (configurabile con il dominio personalizzato `www.m-speed.eu`).

---

## 📁 9. Struttura del Progetto

```
M-SPEED-SRL/
├── public/                       # Risorse statiche servite direttamente
│   ├── css/
│   │   └── style.css             # Foglio di stile corporate e stili articoli
│   ├── images/                   # Immagini, loghi e bandiere vettoriali
│   │   ├── flags/
│   │   └── ...
│   ├── js/
│   │   └── main.js               # Script client-side (menu, scroll, reveal)
│   ├── robots.txt                # File robots SEO
│   └── sitemap.xml               # Sitemap XML aggiornata
├── src/
│   ├── components/               # Componenti Astro riutilizzabili
│   │   ├── TopBar.astro          # Barra superiore con sedi operative
│   │   ├── Header.astro          # Intestazione con navigazione e telefoni
│   │   ├── MobileDrawer.astro    # Menu laterale a comparsa per smartphone
│   │   ├── Footer.astro          # Piede di pagina con snodi e link legali
│   │   └── CtaSection.astro      # Box CTA per contatto commerciale
│   ├── layouts/
│   │   └── Layout.astro          # Layout master con metatag, SEO e Schema.org
│   ├── content/
│   │   └── articoli/             # Cartella dei file Markdown per gli articoli
│   │       ├── potenziamento-nord-europa.md
│   │       └── guida-trasporti-pallettizzati-europa.md
│   ├── content.config.ts         # Definizione schema Zod Content Collection
│   └── pages/                    # Route del sito web
│       ├── index.astro           # Home page con articoli recenti dinamici
│       ├── azienda.astro         # Pagina Azienda
│       ├── servizi.astro         # Pagina Servizi (pallet e colli industriali)
│       ├── destinazioni.astro    # Pagina Destinazioni europee
│       ├── notizie.astro         # Bacheca notizie operative
│       ├── contatti.astro        # Pagina Contatti con recapiti diretti
│       ├── privacy.astro         # Informativa sulla privacy
│       ├── cookie.astro          # Informativa sui cookie
│       └── articoli/
│           ├── index.astro       # Elenco articoli ordinati dal più recente
│           └── [id].astro        # Template dinamico per il singolo articolo
├── astro.config.mjs              # Configurazione Astro (static output)
├── package.json                  # Dipendenze e script npm
├── package-lock.json             # Lockfile npm
├── .gitignore                    # Esclusione node_modules/, dist/, .astro/
└── README.md                     # Questa documentazione
```
