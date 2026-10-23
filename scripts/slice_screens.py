"""Нарезает PNG-экспорты из Figma (2x) на части для прототипа.

Каждый длинный экран в экспорте содержит фиксированные шапку и таб-бар,
«впечатанные» в позицию первого вьюпорта. Скрипт:
  - обрезает прозрачные поля от тени таб-бара;
  - вырезает шапку (0..218 px) — она становится sticky;
  - удаляет полосу таб-бара из тела — он рисуется отдельно, fixed;
  - сохраняет всё в WebP + manifest.json с размерами.

Запуск: python3 scripts/slice_screens.py "../" public/screens
"""
import json
import os
import sys

import numpy as np
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
HEADER_H = 218          # статус-бар + шапка ADI SNAP + разделитель
TAB_H = 176             # высота таб-бара
TAB_SHADOW = 23         # тень над таб-баром
VIEW_H = 1712           # высота вьюпорта (856pt)

# имя файла → id экрана; "static" — одноэкранные оверлеи, показываются целиком
SCREENS = {
    "esplora.png": "esplora",
    "lens.png": "lens",
    "corrispondenza.png": "corrispondenza",
    "Condividi SNAP.png": "condividi",
    "SNAPGALLERY.png": "snapgallery",
    "COLL/SNAP.png": "coll-snap",
    "COLL/OGG.png": "coll-ogg",
    "COLL/AZIENDE.png": "coll-aziende",
    "COLL/DESIGNERS.png": "coll-designers",
    "Ricerca oggetti.png": "ricerca-oggetti",
    "Ricerca progettisti.png": "ricerca-progettisti",
    "Ricerca aziende.png": "ricerca-aziende",
    "arredi complementi casa.png": "cat-arredi",
    "automobili.png": "cat-automobili",
    "giochi.png": "cat-giochi",
    "motocicli.png": "cat-motocicli",
    "panda1981.png": "panda",
    "panda1981-1.png": "sfera",
    "panda1981-2.png": "sity",
    "panda1981-3.png": "maralunga",
    "panda1981-4.png": "panigale",
    "archivio.png": "archivio",
    "guida acquisto.png": "guida",
    "fiat.png": "fiat",
    "giugiaro.png": "giugiaro",
    "ALESSI.png": "alessi",
    "ARTEMIDE.png": "artemide",
    "B&b.png": "bb",
    "B0ERI.png": "boeri",
    "CASTIGLIONI.png": "castiglioni",
    "CITTERIO.png": "citterio",
    "DELUCCHI.png": "delucchi",
    "DESILVA.png": "desilva",
    "Tutorial — Cerca.png": ("tut-a1", "static"),
    "Tutorial — Nuovo snap.png": ("tut-a2", "static"),
    "Tutorial — Snap gallery.png": ("tut-a3", "static"),
    "Tutorial — La mia collezione.png": ("tut-a4", "static"),
    "Tutorial — Ricerca attiva.png": ("tut-b1", "static"),
    "Tutorial — Riconosci oggetto.png": ("tut-b2", "static"),
    "Tutorial — La mia collezione-1.png": ("tut-b3", "static"),
}


def opaque_box(a):
    h = a.shape[0]
    xs = np.nonzero(a[h // 3, :, 3] > 250)[0]
    x0, x1 = xs.min(), xs.max() + 1
    ys = np.nonzero(a[:, (x0 + x1) // 2, 3] > 250)[0]
    return x0, x1, ys.max() + 1


def find_tab(rgb, tab_ref):
    best = None
    for y in range(1400, min(1700, rgb.shape[0] - 140)):
        d = np.abs(rgb[y:y + 140:7] - tab_ref[::7]).mean()
        if best is None or d < best[1]:
            best = (y, d)
    return best[0] - 24


def save(img, path):
    img.convert("RGB").save(path, "WEBP", quality=86, method=6)


def main():
    os.makedirs(OUT, exist_ok=True)
    ref = np.array(Image.open(os.path.join(SRC, "esplora.png")).convert("RGBA"))
    x0, x1, _ = opaque_box(ref)
    ref = ref[:, x0:x1, :3].astype(int)
    tab_ref = ref[1560:1700]
    save(Image.fromarray(ref[1536:1536 + TAB_H].astype("uint8")), os.path.join(OUT, "tabbar.webp"))

    manifest = {}
    for fname, spec in SCREENS.items():
        sid, kind = (spec, "scroll") if isinstance(spec, str) else spec
        img = Image.open(os.path.join(SRC, fname)).convert("RGBA")
        a = np.array(img)
        if kind == "static":
            save(img, os.path.join(OUT, f"{sid}.webp"))
            manifest[sid] = {"kind": "static", "w": img.width, "h": img.height}
            continue
        x0, x1, y1 = opaque_box(a)
        rgb = a[:y1, x0:x1, :3]
        tab = find_tab(rgb.astype(int), tab_ref)
        head = rgb[:HEADER_H]
        body = np.concatenate([rgb[HEADER_H:tab - TAB_SHADOW], rgb[tab + TAB_H:]])
        save(Image.fromarray(head), os.path.join(OUT, f"{sid}-head.webp"))
        save(Image.fromarray(body), os.path.join(OUT, f"{sid}.webp"))
        manifest[sid] = {"kind": "scroll", "w": int(x1 - x0), "h": int(body.shape[0]),
                         "src": fname, "cut": [int(tab - TAB_SHADOW), int(tab + TAB_H)]}
        print(sid, manifest[sid])

    with open(os.path.join(OUT, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)


main()
