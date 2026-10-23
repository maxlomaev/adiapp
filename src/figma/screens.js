// Карта прототипа. Все координаты — в точках (pt) макета 375×856.
// Для scroll-экранов y считается от низа шапки (тело экрана),
// для static-экранов — от верха картинки в её собственных pt.
//
// Хотспот: [x1, y1, x2, y2, действие]
//   'screen-id'            — переход
//   { back: true }         — назад по истории
//   { url: '...' }         — внешняя ссылка
//   { toast: '...' }       — всплывающее сообщение
//   { sheet: 'categorie' } — нижняя шторка с вариантами

import manifest from '../../public/screens/manifest.json'

const BACK = { back: true }
const SAVE = { toast: 'Salvato nella mia collezione' }

// Общие зоны: шапка (109pt) и таб-бар (88pt)
export const HEADER_H = 109
export const TAB_H = 88
export const HEADER_SPOTS = [
  [20, 50, 190, 104, 'esplora'],
  [310, 50, 370, 104, 'ricerca-oggetti'],
]
export const TAB_SPOTS = [
  [24, 12, 130, 76, 'lens'],
  [143, 12, 249, 76, 'snapgallery'],
  [261, 12, 367, 76, 'coll-snap'],
]

const backLink = [15, 0, 280, 48, BACK]
const bookmark = [306, 418, 364, 476, { toast: 'Salvato nella mia collezione', toggle: true }]

const COLL_TABS = [
  [4, 146, 92, 188, 'coll-snap'],
  [97, 146, 185, 188, 'coll-ogg'],
  [190, 146, 278, 188, 'coll-aziende'],
  [283, 146, 371, 188, 'coll-designers'],
]
const RICERCA_TABS = [
  [28, 220, 132, 266, 'ricerca-oggetti'],
  [136, 220, 240, 266, 'ricerca-progettisti'],
  [243, 220, 347, 266, 'ricerca-aziende'],
]

const SPOTS = {
  // ——— Onboarding (versione attuale, 4 step)
  'tut-a1': [[240, 316, 332, 358, 'tut-a2'], [290, 140, 375, 170, 'esplora']],
  'tut-a2': [[240, 710, 332, 754, 'tut-a3'], [295, 535, 340, 565, 'esplora']],
  'tut-a3': [[240, 686, 332, 730, 'tut-a4'], [295, 510, 340, 540, 'esplora']],
  'tut-a4': [[240, 686, 332, 730, 'esplora'], [295, 510, 340, 540, 'esplora']],
  // ——— Onboarding (variante precedente, 3 step, frame 390pt)
  'tut-b1': [[255, 396, 332, 440, 'tut-b2']],
  'tut-b2': [[255, 325, 332, 369, 'tut-b3']],
  'tut-b3': [[255, 303, 332, 347, 'esplora']],

  // ——— Home
  esplora: [
    [48, 346, 327, 410, 'lens'],
    [48, 523, 327, 574, 'ricerca-oggetti'],
    [48, 630, 327, 682, 'ricerca-progettisti'],
    [48, 836, 327, 886, 'ricerca-aziende'],
    [48, 1044, 156, 1078, { url: 'https://www.adi-design.org' }],
    [221, 1044, 329, 1078, { url: 'https://www.adidesignmuseum.org' }],
  ],

  // ——— Nuovo snap
  lens: [
    [25, 22, 75, 72, BACK],
    [140, 600, 235, 676, 'corrispondenza'],
  ],
  corrispondenza: [
    [62, 384, 323, 450, 'panda'],
    [60, 458, 320, 486, 'ricerca-oggetti'],
    [62, 813, 323, 880, 'condividi'],
  ],
  condividi: [
    [24, 590, 350, 650, { go: 'snapgallery', toast: 'Snap condiviso nella Snap Gallery' }],
  ],

  // ——— Snap gallery
  snapgallery: [
    [24, 205, 350, 592, 'panda'],
    [57, 598, 317, 640, SAVE],
    [57, 1000, 318, 1042, SAVE],
    [25, 1098, 350, 1480, 'maralunga'],
    [57, 1488, 318, 1530, SAVE],
  ],

  // ——— La mia collezione
  'coll-snap': [...COLL_TABS, [24, 262, 350, 645, 'panda']],
  'coll-ogg': [
    ...COLL_TABS,
    [24, 262, 350, 632, 'panigale'],
    [24, 646, 350, 900, 'maralunga'],
    [25, 943, 350, 1316, 'sfera'],
    [25, 1336, 350, 1706, 'sity'],
  ],
  'coll-aziende': [
    ...COLL_TABS,
    [24, 264, 350, 600, 'alessi'],
    [24, 618, 350, 856, 'artemide'],
    [25, 872, 350, 1206, 'bb'],
    [25, 1226, 350, 1562, 'fiat'],
  ],
  'coll-designers': [
    ...COLL_TABS,
    [24, 264, 350, 624, 'boeri'],
    [24, 642, 350, 900, 'castiglioni'],
    [25, 918, 350, 1280, 'citterio'],
    [25, 1298, 350, 1658, 'delucchi'],
    [25, 1676, 350, 2036, 'desilva'],
  ],

  // ——— Ricerca
  'ricerca-oggetti': [
    backLink, ...RICERCA_TABS,
    [24, 626, 350, 648, { sheet: 'categorie' }],
    [24, 686, 350, 737, 'cat-automobili'],
  ],
  'ricerca-progettisti': [
    backLink, ...RICERCA_TABS,
    [24, 381, 350, 432, 'castiglioni'],
    [40, 516, 335, 570, 'castiglioni'],
    [40, 580, 335, 634, 'delucchi'],
  ],
  'ricerca-aziende': [
    backLink, ...RICERCA_TABS,
    [24, 381, 350, 432, 'alessi'],
    [40, 516, 335, 570, 'artemide'],
  ],

  // ——— Categorie
  'cat-automobili': [backLink, [24, 232, 350, 616, 'panda']],
  'cat-arredi': [backLink, [24, 316, 350, 650, 'maralunga']],
  'cat-giochi': [backLink],
  'cat-motocicli': [backLink, [24, 644, 350, 900, 'sfera'], [25, 938, 350, 1310, 'panigale']],

  // ——— Oggetti
  panda: [
    bookmark,
    [23, 1035, 347, 1146, 'giugiaro'],
    [23, 1162, 347, 1273, 'fiat'],
    [53, 1474, 315, 1524, 'archivio'],
    [55, 1718, 315, 1777, 'guida'],
    [270, 1846, 360, 1884, 'cat-automobili'],
  ],
  maralunga: [backLink, bookmark, [280, 1958, 360, 1990, 'cat-arredi']],
  sity: [
    backLink, bookmark,
    [23, 1148, 347, 1256, 'citterio'],
    [23, 1273, 347, 1383, 'bb'],
    [280, 2386, 360, 2420, 'cat-arredi'],
  ],
  sfera: [
    backLink, bookmark,
    [280, 1926, 360, 1956, 'cat-motocicli'],
    [18, 1994, 273, 2226, 'panigale'],
  ],
  panigale: [
    backLink, bookmark,
    [280, 2002, 360, 2032, 'cat-motocicli'],
    [18, 2068, 273, 2300, 'sfera'],
  ],
  archivio: [
    backLink,
    [56, 1860, 318, 1910, { url: 'https://horo.adi-design.org' }],
    [48, 2833, 327, 2882, { url: 'https://www.centrostoricofiat.it' }],
  ],
  guida: [backLink, [100, 943, 270, 1000, { url: 'https://www.subito.it' }]],

  // ——— Produttori
  fiat: [backLink, [265, 1292, 350, 1322, 'cat-automobili']],
  alessi: [backLink],
  artemide: [backLink],
  bb: [backLink],

  // ——— Designer
  giugiaro: [backLink, [270, 1842, 356, 1872, 'cat-automobili']],
  boeri: [backLink],
  castiglioni: [backLink],
  citterio: [backLink],
  delucchi: [backLink],
  desilva: [backLink],
}

const TITLES = {
  'tut-a1': 'Tutorial 1/4 — Cerca',
  'tut-a2': 'Tutorial 2/4 — Nuovo snap',
  'tut-a3': 'Tutorial 3/4 — Snap gallery',
  'tut-a4': 'Tutorial 4/4 — La mia collezione',
  'tut-b1': 'Tutorial v1 · 1/3 — Esplora',
  'tut-b2': 'Tutorial v1 · 2/3 — Snap gallery',
  'tut-b3': 'Tutorial v1 · 3/3 — La mia collezione',
  esplora: 'Esplora (home)',
  lens: 'Nuovo snap — fotocamera',
  corrispondenza: 'Corrispondenza trovata',
  condividi: 'Condividi Snap',
  snapgallery: 'Snap gallery',
  'coll-snap': 'La mia collezione — Snap',
  'coll-ogg': 'La mia collezione — Oggetti',
  'coll-aziende': 'La mia collezione — Aziende',
  'coll-designers': 'La mia collezione — Designer',
  'ricerca-oggetti': 'Ricerca oggetti',
  'ricerca-progettisti': 'Ricerca progettisti',
  'ricerca-aziende': 'Ricerca aziende',
  'cat-automobili': 'Automobili',
  'cat-arredi': 'Arredi e complementi casa',
  'cat-giochi': 'Giochi e articoli per l’infanzia',
  'cat-motocicli': 'Motocicli',
  panda: 'Panda',
  maralunga: 'Maralunga',
  sity: 'Sity',
  sfera: 'Sfera',
  panigale: '1199 Panigale',
  archivio: 'Materiale d’archivio',
  guida: 'Guida all’acquisto',
  fiat: 'Fiat',
  alessi: 'Alessi',
  artemide: 'Artemide',
  bb: 'B&B Italia',
  giugiaro: 'Giorgetto Giugiaro',
  boeri: 'Cini Boeri',
  castiglioni: 'Achille Castiglioni',
  citterio: 'Antonio Citterio',
  delucchi: 'Michele De Lucchi',
  desilva: 'Walter De Silva',
}

export const GROUPS = [
  ['Onboarding', ['tut-a1', 'tut-a2', 'tut-a3', 'tut-a4']],
  ['Onboarding v1', ['tut-b1', 'tut-b2', 'tut-b3']],
  ['Esplora & ricerca', ['esplora', 'ricerca-oggetti', 'ricerca-progettisti', 'ricerca-aziende']],
  ['Nuovo snap', ['lens', 'corrispondenza', 'condividi']],
  ['Snap gallery', ['snapgallery']],
  ['La mia collezione', ['coll-snap', 'coll-ogg', 'coll-aziende', 'coll-designers']],
  ['Categorie', ['cat-automobili', 'cat-arredi', 'cat-giochi', 'cat-motocicli']],
  ['Oggetti', ['panda', 'maralunga', 'sity', 'sfera', 'panigale', 'archivio', 'guida']],
  ['Produttori', ['fiat', 'alessi', 'artemide', 'bb']],
  ['Designer', ['giugiaro', 'boeri', 'castiglioni', 'citterio', 'delucchi', 'desilva']],
]

export const SHEETS = {
  categorie: {
    title: 'Categoria',
    options: [
      ['Arredi e complementi casa', 'cat-arredi'],
      ['Automobili', 'cat-automobili'],
      ['Giochi e articoli per l’infanzia', 'cat-giochi'],
      ['Motocicli', 'cat-motocicli'],
    ],
  },
}

export const START = 'tut-a1'

export const SCREENS = Object.fromEntries(
  Object.entries(manifest).map(([id, m]) => [
    id,
    {
      id,
      title: TITLES[id] ?? id,
      kind: m.kind,
      // ширина/высота картинки в pt
      w: m.w / 2,
      h: m.h / 2,
      spots: SPOTS[id] ?? [],
    },
  ]),
)

export const src = (name) => `${import.meta.env.BASE_URL}screens/${name}.webp`
