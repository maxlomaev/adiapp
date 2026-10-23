# ADI Snap — prototype

Два прототипа приложения ADI Snap в одном проекте React + Vite. Переключатель «App React / Figma» находится в левой панели.

| Режим | URL | Что это |
|---|---|---|
| **App React** | `#/esplora`, `#/oggetto/panda`, … | Настоящее приложение: вёрстка, кнопки, поиск, коллекция, туториал |
| **Figma** | `#/figma/esplora`, … | Кликабельные PNG-экспорты макета с хотспотами, 1:1 с Figma |

```bash
npm install
npm run dev      # http://localhost:5180, в локальной сети — http://<ip>:5180
npm run build    # статическая сборка в dist/
npm run deploy   # сборка + публикация в ветку gh-pages (GitHub Pages)
```

## App React (`src/app/`)

- `data.js` — контент: объекты, дизайнеры, компании, категории, снапы. Тексты взяты из макета.
- `screens.jsx` — экраны: Esplora, Ricerca (3 вкладки, живой поиск и фильтры), Fotocamera → Corrispondenza → Condividi, Snap gallery, La mia collezione, карточки объекта, дизайнера и компании, архив, гид по покупке.
- `ui.jsx` — шапка, таб-бар, карточки, кнопки. `app.css` — стили по замерам макета (375×856 pt).
- `CodedApp.jsx` — роутинг с историей и «Torna a …», состояние коллекции в `localStorage`, туториал при первом запуске, toast и шторки.

Что работает: сохранение и удаление из коллекции (закладки), публикация снапа с подписью в галерею, поиск по названию, году, дизайнеру и категории, подсказки при вводе в поиске дизайнеров и компаний, фильтр и сортировка в галерее, горизонтальные карусели, внешние ссылки (ADI, музей, Horo, Subito). «Ricomincia» в панели сбрасывает состояние.

## Figma (`src/figma/`)

- `scripts/slice_screens.py` нарезает PNG из `../` в `public/screens/`. После нового экспорта запустите `npm run slice`.
- `src/figma/screens.js` — хотспоты в pt макета.

## Ресурсы

`scripts/crop_assets.py` вырезает фото и логотипы из PNG-экспортов в `public/img/` (`python3 scripts/crop_assets.py ../ public/img`).
