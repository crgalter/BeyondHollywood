# Beyond Hollywood

**Plataforma de recomanacions de pel·lícules internacionals i alternatives**

Una aplicació web completa amb interfície en català per descobrir cinema més enllà de les fronteres convencionals, amb recomanacions de joies ocultes, pel·lícules internacionals i tresors de baix pressupost.

![Beyond Hollywood](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)

---

## 🎬 Característiques

- ✅ **Interfície 100% en Català**
- ✅ **4 Modes de Recomanació**
  - Pel·lícules Similars (basades en gèneres i paraules clau)
  - Joies Ocultes (alta valoració, baixa popularitat)
  - Cinema Internacional (pel·lícules no-US/no-angleses)
  - Tresors de Baix Pressupost (pressupost < $5M)
- ✅ **Cerca Completa** (títol, gèneres, paraules clau)
- ✅ **Detalls de Pel·lícules** amb metadades completes
- ✅ **Disseny Responsiu** (mòbil, tauleta, escriptori)
- ✅ **Tema Fosc Premium**
- ✅ **Imatges TMDB** (pòsters i backdrops)

---

## 📋 Requisits Previs

### 1. Python 3.8+
Comprova si està instal·lat:
```powershell
python --version
```

Si no està instal·lat, descarrega'l des de: https://www.python.org/downloads/

### 2. Node.js 18+ i npm
Comprova si està instal·lat:
```powershell
node --version
npm --version
```

Si no està instal·lat:
- Descarrega des de: https://nodejs.org/
- Tria la versió **LTS** (recomanada)
- ✅ Assegura't de marcar "Add to PATH" durant la instal·lació
- **Reinicia PowerShell** després de la instal·lació

---

## 🚀 Instal·lació i Configuració

### Pas 1: Instal·lar Dependències de Python

```powershell
cd backend
pip install -r requirements.txt
```

Instal·la:
- `pandas` - Processament de dades
- `numpy` - Càlculs numèrics
- `scikit-learn` - Similaritat TF-IDF

---

### Pas 2: Processar el Dataset

⚠️ **Important**: Aquest pas és **obligatori** abans d'executar l'aplicació.

```powershell
python preprocess_data.py
```

**Què fa aquest script:**
1. Carrega el CSV `TMDB_movie_dataset_v11.csv` (1.2M pel·lícules)
2. Aplica filtres de qualitat:
   - Mínim 20 vots per pel·lícula
   - Popularitat ≥ 2.0
   - Ha de tenir gèneres O paraules clau
3. Calcula matrius de similaritat TF-IDF
4. Pre-computa les 20 pel·lícules més similars per cada pel·lícula
5. Genera 3 fitxers JSON a `beyond-hollywood/public/data/`:
   - `movies.json` (~50-100MB) - Totes les dades de pel·lícules
   - `metadata.json` - Gèneres, idiomes, països únics
   - `similarity_index.json` (~20-40MB) - Índex de similaritat pre-calculat

**Temps estimat**: 2-5 minuts (depenent de la teva CPU)

**Sortida esperada**:
```
=== Beyond Hollywood Data Preprocessing ===

Loading CSV: ../TMDB_movie_dataset_v11.csv
Loaded 1262991 movies

Cleaning data...
Applying quality filters to reduce dataset size...
Filtered from 1,262,960 to 85,432 movies (6.8%)
This will make processing ~218x faster!

Extracting metadata...
Creating movie records...
Computing similarity index...
Processing 85432 movies...
Computing cosine similarity...
  Processed 1000 / 85432 movies
  ...

=== Preprocessing Complete ===
Total movies: 85432
Genres: 20
Languages: 95
Countries: 156
Similarity entries: 85432

Output directory: ../beyond-hollywood/public/data
```

**Ajustar els filtres** (opcional):

Edita `backend/preprocess_data.py` línia 47:
```python
MIN_VOTES = 20    # Canvia a 10 (més pel·lícules) o 50 (menys, més qualitat)
MIN_POPULARITY = 2.0  # Canvia a 1.0 (més) o 5.0 (menys)
```

---

### Pas 3: Instal·lar Dependències de Node.js

```powershell
cd ..\beyond-hollywood
npm install
```

Instal·la:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- I altres dependències necessàries

**Temps estimat**: 1-2 minuts

---

### Pas 4: Executar el Servidor de Desenvolupament

```powershell
npm run dev
```

**Sortida esperada**:
```
> beyond-hollywood@0.1.0 dev
> next dev

  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.X:3000

 ✓ Ready in 2.5s
```

Obre el navegador a: **http://localhost:3000**

---

## 🌐 Estructura de Pàgines

| Ruta | Descripció |
|------|------------|
| `/` | Pàgina principal amb hero i carrusels |
| `/cerca?q=...` | Resultats de cerca |
| `/pellicula/:id` | Detalls de pel·lícula + similars |
| `/recomanacions/joies-ocultes` | Joies ocultes |
| `/recomanacions/internacional` | Cinema internacional |
| `/recomanacions/baix-pressupost` | Tresors de baix pressupost |

---

## 📁 Estructura del Projecte

```
TFG V2/
├── backend/
│   ├── preprocess_data.py      # Script de processament de dades
│   └── requirements.txt         # Dependències Python
│
├── beyond-hollywood/
│   ├── app/
│   │   ├── layout.tsx           # Layout principal
│   │   ├── page.tsx             # Pàgina d'inici
│   │   ├── globals.css          # Estils globals
│   │   ├── cerca/               # Pàgina de cerca
│   │   ├── pellicula/[id]/      # Detalls de pel·lícula
│   │   ├── recomanacions/[mode]/ # Pàgines de recomanació
│   │   └── api/                 # API Routes
│   │       ├── search/
│   │       ├── movie/[id]/
│   │       ├── recommend/similar/[id]/
│   │       ├── discover/
│   │       └── metadata/
│   │
│   ├── components/              # Components React reutilitzables
│   │   ├── MovieCard.tsx
│   │   ├── Navigation.tsx
│   │   ├── SearchBar.tsx
│   │   ├── MovieCarousel.tsx
│   │   └── Footer.tsx
│   │
│   ├── lib/                     # Lògica de negoci
│   │   ├── types.ts             # Tipus TypeScript
│   │   ├── catalan-text.ts      # Textos en català
│   │   ├── data-loader.ts       # Carregador de dades
│   │   └── recommender.ts       # Motor de recomanacions
│   │
│   ├── public/
│   │   └── data/                # Fitxers JSON generats
│   │       ├── movies.json
│   │       ├── metadata.json
│   │       └── similarity_index.json
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── TMDB_movie_dataset_v11.csv   # Dataset original (no inclòs al repositori)
└── README.md
```

---

## 🎨 Paleta de Colors

```css
--primary: #1a1a2e      /* Blau fosc gairebé negre */
--secondary: #16213e    /* Blau marí profund */
--accent: #e94560       /* Vermell coral vibrant */
--highlight: #0f3460    /* Blau mitjà */
--background: #0d0d0d   /* Negre profund */
```

**Tipografia**:
- Títols: Montserrat (Google Fonts)
- Text: Open Sans (Google Fonts)

---

## 🔧 Scripts Disponibles

```powershell
# Desenvolupament
npm run dev          # Inicia servidor de desenvolupament (http://localhost:3000)

# Producció
npm run build        # Construeix l'aplicació per producció
npm start            # Executa l'aplicació en mode producció (després de build)

# Altres
npm run lint         # Executa ESLint per comprovar el codi
```

---

## 🐛 Resolució de Problemes

### Error: "movies.json not found"
**Causa**: No has executat el script de preprocessament.

**Solució**:
```powershell
cd backend
python preprocess_data.py
```

---

### Error: "npm: command not found"
**Causa**: Node.js no està instal·lat o no està al PATH.

**Solució**:
1. Descarrega i instal·la Node.js: https://nodejs.org/
2. Reinicia PowerShell
3. Verifica: `node --version`

---

### Error: "ModuleNotFoundError: No module named 'pandas'"
**Causa**: Dependències Python no instal·lades.

**Solució**:
```powershell
cd backend
pip install -r requirements.txt
```

---

### El preprocessament és massa lent
**Causa**: Massa pel·lícules (fitxers sense filtres aplicats).

**Solució**: Edita `backend/preprocess_data.py` i augmenta els filtres:
```python
MIN_VOTES = 50        # Més restrictiu (menys pel·lícules)
MIN_POPULARITY = 5.0  # Més restrictiu
```

---

### Les imatges no es carreguen
**Causa**: Les URLs d'imatges TMDB poden requerir autenticació.

**Solució temporal**: Les imatges encara funcionarien si TMDB permet accés públic. Per producció, considera:
- Descarregar i hostatjar imatges localment
- Usar API key de TMDB
- Implementar cache d'imatges

---

## 📦 Desplegament

### Opció 1: Vercel (Recomanat)

1. Crea un compte a https://vercel.com
2. Puja el codi a GitHub/GitLab
3. Connecta el repositori a Vercel
4. Configura el projecte:
   - Root Directory: `beyond-hollywood`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Desplega!

**Important**: Assegura't que els fitxers JSON existeixin a `public/data/` abans de desplegar.

---

### Opció 2: Auto-hospedat

```powershell
cd beyond-hollywood
npm run build
npm start
```

L'aplicació s'executarà a http://localhost:3000

Per executar en un port diferent:
```powershell
$env:PORT=8080; npm start
```

---

## 🧪 API Endpoints

| Endpoint | Mètode | Descripció |
|----------|--------|------------|
| `/api/search?q=...&genres=...&minRating=...` | GET | Cerca pel·lícules amb filtres |
| `/api/movie/:id` | GET | Obté detalls d'una pel·lícula |
| `/api/recommend/similar/:id` | GET | Obté pel·lícules similars |
| `/api/discover?mode=...` | GET | Modes de descobriment (hidden-gems, international, low-budget) |
| `/api/metadata` | GET | Obté gèneres, idiomes, països disponibles |

---

## 🤝 Contribucions

Si vols contribuir al projecte:

1. Fork el repositori
2. Crea una branca: `git checkout -b feature/nova-funcio`
3. Fes commit dels canvis: `git commit -m 'Afegeix nova funció'`
4. Push a la branca: `git push origin feature/nova-funcio`
5. Crea un Pull Request

---

## 📄 Llicència

Aquest projecte és de codi obert i està disponible sota la llicència MIT.

---

## 👨‍💻 Autor

**TFG Beyond Hollywood**
- Universitat: [La teva universitat]
- Any: 2024

---

## 🙏 Agraïments

- **TMDB** (The Movie Database) - Dades de pel·lícules
- **Next.js** - Framework React
- **Tailwind CSS** - Estils
- **scikit-learn** - Algoritmes de machine learning

---

## 📞 Suport

Si tens problemes o preguntes:
1. Comprova la secció de [Resolució de Problemes](#-resolució-de-problemes)
2. Revisa el codi i comentaris
3. Crea un issue al repositori

---

**Fet amb ❤️ i català**
