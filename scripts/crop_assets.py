"""Вырезает фото и логотипы из PNG-экспортов для кодовой версии приложения.

Координаты — в pt «тела» экрана (как в src/screens.js: y от низа шапки,
без полосы таб-бара). Скрипт пересчитывает их в пиксели исходного PNG.

Запуск: python3 scripts/crop_assets.py ../ public/img
"""

import os
import sys

from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
HEADER = 218
CUT_FROM, CUT_LEN = 1513 - HEADER, 199   # полоса таб-бара в px тела

FILES = {
    'esplora': 'esplora.png', 'lens': 'lens.png', 'condividi': 'Condividi SNAP.png',
    'snapgallery': 'SNAPGALLERY.png', 'coll-snap': 'COLL/SNAP.png', 'coll-ogg': 'COLL/OGG.png',
    'coll-designers': 'COLL/DESIGNERS.png', 'panda': 'panda1981.png', 'sfera': 'panda1981-1.png',
    'sity': 'panda1981-2.png', 'maralunga': 'panda1981-3.png', 'panigale': 'panda1981-4.png',
    'archivio': 'archivio.png', 'fiat': 'fiat.png', 'alessi': 'ALESSI.png', 'artemide': 'ARTEMIDE.png',
    'bb': 'B&b.png', 'giugiaro': 'giugiaro.png', 'boeri': 'B0ERI.png', 'castiglioni': 'CASTIGLIONI.png',
    'citterio': 'CITTERIO.png', 'delucchi': 'DELUCCHI.png', 'desilva': 'DESILVA.png',
    'cat-automobili': 'automobili.png', 'cat-arredi': 'arredi complementi casa.png',
    'cat-giochi': 'giochi.png', 'cat-motocicli': 'motocicli.png',
}

# имя: (экран, x1, y1, x2, y2) в pt тела
CROPS = {
    # объекты
    'panda': ('panda', 21, 161, 348, 405),
    'panda-vintage': ('panda', 25, 836, 343, 1018),
    'panda-snap': ('condividi', 24, 186, 350, 377),
    'maralunga': ('maralunga', 21, 195, 348, 420),
    'maralunga-2': ('maralunga', 25, 932, 343, 1115),
    'maralunga-snap': ('snapgallery', 25, 1140, 350, 1340),
    'sity': ('sity', 21, 212, 348, 420),
    'sity-2': ('sity', 25, 948, 343, 1130),
    'sfera': ('sfera', 21, 195, 348, 420),
    'sfera-2': ('sfera', 25, 905, 343, 1080),
    'panigale': ('coll-ogg', 25, 300, 350, 495),
    'panigale-2': ('panigale', 25, 862, 343, 1045),
    'eclisse-snap': ('coll-snap', 25, 650, 350, 838),
    'grillo-snap': ('coll-snap', 25, 1082, 350, 1281),
    'fiat500': ('panda', 18, 1920, 273, 2062),
    'brera': ('cat-automobili', 25, 976, 350, 1183),
    'k1340': ('cat-arredi', 25, 650, 350, 857),
    'abitacolo': ('cat-arredi', 25, 1064, 350, 1267),
    'spun': ('cat-giochi', 25, 358, 350, 560),
    'trioli': ('cat-giochi', 25, 650, 350, 857),
    'zizi': ('cat-giochi', 25, 1050, 350, 1250),
    'tender': ('cat-motocicli', 25, 272, 350, 477),
    'espresso9090': ('alessi', 26, 1396, 279, 1537),
    'parentesi': ('castiglioni', 1, 1953, 254, 2094),
    # логотипы и миниатюры
    'logo-alessi': ('alessi', 25, 168, 350, 498),
    'logo-artemide': ('artemide', 25, 168, 350, 498),
    'logo-bb': ('bb', 25, 168, 350, 498),
    'logo-fiat': ('fiat', 25, 168, 350, 498),
    'thumb-giugiaro': ('panda', 46, 1048, 106, 1110),
    'thumb-fiat': ('panda', 46, 1186, 106, 1248),
    'thumb-magistretti': ('maralunga', 46, 1157, 106, 1217),
    'thumb-citterio': ('sity', 46, 1172, 106, 1232),
    'thumb-bb': ('sity', 46, 1298, 106, 1358),
    'thumb-piaggio': ('sfera', 46, 1130, 106, 1190),
    'thumb-ducati': ('panigale', 46, 1086, 106, 1146),
    'thumb-fabbro': ('panigale', 46, 1212, 106, 1272),
    # дизайнеры
    'boeri': ('coll-designers', 25, 265, 350, 508),
    'citterio': ('coll-designers', 25, 920, 350, 1164),
    'delucchi': ('coll-designers', 25, 1300, 350, 1543),
    'desilva': ('coll-designers', 25, 1677, 350, 1920),
    'hero-giugiaro': ('giugiaro', 26, 246, 349, 484),
    'hero-castiglioni': ('castiglioni', 26, 246, 349, 484),
    'hero-boeri': ('boeri', 26, 246, 349, 484),
    'hero-citterio': ('citterio', 26, 246, 349, 484),
    'hero-delucchi': ('delucchi', 26, 241, 349, 479),
    'hero-desilva': ('desilva', 26, 272, 349, 510),
    'video-giugiaro': ('giugiaro', 1, 1433, 287, 1593),
    'video-castiglioni': ('castiglioni', 1, 1480, 287, 1640),
    # прочее
    'avatar': ('coll-snap', 26, 34, 100, 108),
    'camera': ('lens', 0, 0, 375, 550),
    'esplora-oggetti': ('esplora', 24, 458, 350, 640),
    'esplora-aziende': ('esplora', 24, 770, 350, 980),
    'tile-adi': ('esplora', 25, 980, 178, 1130),
    'tile-museo': ('esplora', 197, 980, 350, 1130),
    'poster-1981': ('archivio', 49, 223, 326, 500),
    'horo': ('archivio', 56, 1513, 333, 1700),
    'blueprint': ('archivio', 25, 2043, 280, 2295),
    'video-fiat': ('archivio', 48, 2420, 327, 2600),
}


# вырезки в пикселях исходного PNG (вне тела экрана): имя -> (экран, x1, y1, x2, y2)
RAW = {
    'logo': ('esplora', 72, 110, 152, 196),
}


def body_to_px(y):
    y = round(y * 2)
    return HEADER + y + (CUT_LEN if y >= CUT_FROM else 0)


def main():
    os.makedirs(OUT, exist_ok=True)
    cache = {}
    for name, (scr, x1, y1, x2, y2) in CROPS.items():
        if scr not in cache:
            im = Image.open(os.path.join(SRC, FILES[scr])).convert('RGBA')
            # левое поле от тени таб-бара
            x0 = next(x for x in range(40) if im.getpixel((x, im.height // 3))[3] > 250)
            cache[scr] = (im, x0)
        im, x0 = cache[scr]
        box = (x0 + x1 * 2, body_to_px(y1), x0 + x2 * 2, body_to_px(y2))
        if y1 * 2 < CUT_FROM < y2 * 2:
            print('warning: crosses tab bar band', name)
        part = im.crop(box).convert('RGB')
        part.save(os.path.join(OUT, f'{name}.webp'), 'WEBP', quality=86, method=6)
    for name, (scr, *box) in RAW.items():
        im = Image.open(os.path.join(SRC, FILES[scr])).convert('RGBA').crop(box)
        im.save(os.path.join(OUT, f'{name}.png'))
    print(len(CROPS), 'assets')


main()
