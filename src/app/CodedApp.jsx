import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { PHONE_W, PanelGroup, Stage, useViewport } from '../Stage.jsx'
import { CATEGORIES, COMPANIES, DESIGNERS, INITIAL_SAVED, ME, OBJECTS, SNAPS } from './data.js'
import * as S from './screens.jsx'
import { AppHeader, Ctx, StatusBar, TabBar } from './ui.jsx'
import { translateDom } from './i18n.js'
import './app.css'

const HOME = 'esplora'
const STORE = 'adi-snap-state-v1'
const HEADER_H = 65
const STATUS_H = 44
const TAB_H = 88

// ——— Маршруты

const parse = (route) => {
  const [path, query = ''] = route.split('?')
  const [root, id] = path.split('/')
  return { root, id, params: new URLSearchParams(query) }
}

const valid = (route) => {
  const { root, id } = parse(route)
  switch (root) {
    case 'esplora': case 'lens': case 'match': case 'condividi': case 'gallery': case 'risultati': return true
    case 'ricerca': return ['oggetti', 'progettisti', 'aziende'].includes(id)
    case 'collezione': return ['snap', 'oggetti', 'aziende', 'designer'].includes(id)
    case 'oggetto': return !!OBJECTS[id]?.story
    case 'archivio': return !!OBJECTS[id]?.archive
    case 'guida': return !!OBJECTS[id]?.market
    case 'designer': return !!DESIGNERS[id]?.bio
    case 'azienda': return !!COMPANIES[id]?.story
    case 'categoria': return !!CATEGORIES[id]
    default: return false
  }
}

function screenFor(route) {
  const { root, id, params } = parse(route)
  switch (root) {
    case 'esplora': return <S.Esplora />
    case 'ricerca': return <S.Ricerca tab={id} />
    case 'risultati': return <S.Risultati params={params} />
    case 'categoria': return <S.Categoria id={id} />
    case 'lens': return <S.Lens />
    case 'match': return <S.Match />
    case 'condividi': return <S.Condividi />
    case 'gallery': return <S.Gallery />
    case 'collezione': return <S.Collezione tab={id} />
    case 'oggetto': return <S.Oggetto id={id} />
    case 'designer': return <S.Designer id={id} />
    case 'azienda': return <S.Azienda id={id} />
    case 'archivio': return <S.Archivio id={id} />
    case 'guida': return <S.Guida id={id} />
    default: return null
  }
}

// подпись для «Torna a …»
function titleOf(route) {
  const { root, id } = parse(route)
  switch (root) {
    case 'esplora': return 'esplora'
    case 'ricerca': return 'ricerca'
    case 'risultati': return 'risultati'
    case 'categoria': return CATEGORIES[id].title.toLowerCase()
    case 'gallery': return 'snap gallery'
    case 'collezione': return 'la mia collezione'
    case 'match': return 'corrispondenza'
    case 'oggetto': return OBJECTS[id].name
    case 'designer': return DESIGNERS[id].name
    case 'azienda': return COMPANIES[id].name
    case 'archivio': return 'archivio'
    case 'guida': return 'guida all’acquisto'
    default: return null
  }
}

const routeFromHash = () => {
  const r = decodeURIComponent(location.hash.replace(/^#\/?/, ''))
  return valid(r) ? r : null
}

// ——— Состояние (переживает перезагрузку)

const freshState = () => ({ saved: INITIAL_SAVED, snaps: SNAPS, tourDone: false })
const loadState = () => {
  try {
    const s = JSON.parse(localStorage.getItem(STORE))
    if (s?.saved && s?.snaps) return s
  } catch { /* приватный режим */ }
  return freshState()
}

// ——— Туториал

const TOUR = [
  { target: 'search', title: 'Cerca', text: 'Cerca oggetti, progettisti e aziende della Collezione Storica Compasso d’Oro con il pulsante di ricerca in alto.' },
  { target: 'tab1', title: 'Nuovo snap', text: 'Fotografa un oggetto per riconoscerlo. Scopri la sua storia, il progettista e l’azienda, poi condividi il tuo scatto.' },
  { target: 'tab2', title: 'Snap gallery', text: 'Scopri gli Snap condivisi dagli altri utenti. Esplora i loro scatti e lasciati ispirare dagli oggetti che hanno fotografato.' },
  { target: 'tab3', title: 'La mia collezione', text: 'Ritrova qui gli Snap, gli oggetti, i progettisti e le aziende che hai salvato: la tua collezione personale di design, sempre a portata di mano.' },
]
const TAB_X = [77, 196, 314]

function Tour({ step, onNext, onSkip, top }) {
  const s = TOUR[step]
  const below = step === 0
  const arrowX = below ? 341 : TAB_X[step - 1]
  return (
    <div className="tour" onClick={(e) => e.stopPropagation()}>
      <div className={`tour-pop ${below ? 'is-below' : 'is-above'}`} style={below ? { top: top + 14 } : { bottom: TAB_H + 14 }}>
        <span className="tour-arrow" style={{ left: arrowX - 16 - 9 }} />
        <div className="tour-head">
          <span className="tour-kicker">Tutorial · {step + 1} di {TOUR.length}</span>
          {step < TOUR.length - 1 && <button className="tour-skip" onClick={onSkip}>Salta</button>}
        </div>
        <div className="tour-title">{s.title}</div>
        <p className="tour-text">{s.text}</p>
        <div className="tour-foot">
          <span className="tour-dots">{TOUR.map((_, i) => <i key={i} className={i === step ? 'on' : ''} />)}</span>
          <button className="btn btn-gold tour-next" onClick={onNext}>{step === TOUR.length - 1 ? 'Fine' : 'Avanti'}</button>
        </div>
      </div>
    </div>
  )
}

// ——— Приложение

export default function CodedApp() {
  const vp = useViewport()
  const [state, setState] = useState(loadState)
  const [stack, setStack] = useState(() => [routeFromHash() ?? HOME])
  const [dir, setDir] = useState('none')
  const [toastMsg, setToastMsg] = useState(null)
  const [sheet, setSheet] = useState(null)
  const [tour, setTour] = useState(() => (state.tourDone || routeFromHash() ? -1 : 0))
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('adi-snap-lang') || 'it' } catch { return 'it' }
  })
  const scroller = useRef(null)
  const scrollMemo = useRef([])
  const phoneRef = useRef(null)
  const route = stack[stack.length - 1]

  const setLang = useCallback((l) => {
    setLangState(l)
    try { localStorage.setItem('adi-snap-lang', l) } catch { /* ignore */ }
  }, [])

  // перевод поверх отрисованного DOM: после каждого рендера и при любых изменениях (toast, шторка)
  useLayoutEffect(() => { translateDom(phoneRef.current, lang) })
  useEffect(() => {
    const root = phoneRef.current
    if (!root) return
    let busy = false
    const obs = new MutationObserver(() => {
      if (busy) return
      busy = true
      requestAnimationFrame(() => { translateDom(root, lang); busy = false })
    })
    obs.observe(root, { subtree: true, childList: true, characterData: true })
    return () => obs.disconnect()
  }, [lang])
  useEffect(() => { document.documentElement.lang = lang }, [lang])

  useEffect(() => {
    try { localStorage.setItem(STORE, JSON.stringify(state)) } catch { /* ignore */ }
  }, [state])

  // ——— навигация
  const remember = () => { scrollMemo.current[stack.length - 1] = scroller.current?.scrollTop ?? 0 }
  const go = useCallback((r) => {
    if (!valid(r)) return
    remember()
    setDir('fwd')
    setStack((s) => [...s, r])
  }, [stack.length]) // eslint-disable-line react-hooks/exhaustive-deps
  const replace = useCallback((r) => {
    if (!valid(r)) return
    setDir('none')
    setStack((s) => [...s.slice(0, -1), r])
  }, [])
  const back = useCallback(() => {
    setDir('back')
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : [HOME]))
  }, [])
  const reset = useCallback((r) => {
    setDir('none')
    scrollMemo.current = []
    setStack((s) => (s.length === 1 && s[0] === r ? s : [r]))
    scroller.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useLayoutEffect(() => {
    const y = dir === 'back' ? scrollMemo.current[stack.length - 1] ?? 0 : 0
    scroller.current?.scrollTo(0, y)
  }, [route, stack.length]) // eslint-disable-line react-hooks/exhaustive-deps

  // hash ↔ стек
  useEffect(() => {
    const target = `#/${route}`
    if (location.hash !== target) history.replaceState(null, '', target)
  }, [route])
  useEffect(() => {
    const on = () => {
      const r = routeFromHash()
      if (r && r !== route) { setDir('none'); setStack([r]) }
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [route])

  // ——— toast, шторка
  const toast = useCallback((text) => setToastMsg({ text, key: Date.now() }), [])
  useEffect(() => {
    if (!toastMsg) return
    const t = setTimeout(() => setToastMsg(null), 2400)
    return () => clearTimeout(t)
  }, [toastMsg])

  // ——— коллекция
  const isSaved = useCallback((kind, id) => state.saved[kind].includes(id), [state.saved])
  const toggleSave = useCallback((kind, id) => {
    const on = !state.saved[kind].includes(id)
    setState((s) => ({
      ...s,
      saved: { ...s.saved, [kind]: on ? [id, ...s.saved[kind]] : s.saved[kind].filter((x) => x !== id) },
    }))
    toast(on ? 'Salvato nella mia collezione' : 'Rimosso dalla collezione')
  }, [state.saved, toast])

  const addSnap = useCallback((caption) => {
    const snap = { id: `u${Date.now()}`, object: 'panda', user: ME.handle, photo: 'panda-snap', caption: caption.trim() }
    setState((s) => ({ ...s, snaps: [snap, ...s.snaps], saved: { ...s.saved, snap: [snap.id, ...s.saved.snap] } }))
    reset('gallery')
    toast('Snap condiviso nella Snap Gallery')
  }, [reset, toast])

  const restart = () => {
    setState(freshState())
    scrollMemo.current = []
    setStack([HOME])
    setDir('none')
    setTour(0)
  }

  const endTour = () => { setTour(-1); setState((s) => ({ ...s, tourDone: true })) }

  const ctx = useMemo(() => ({
    route, go, back, replace, reset, toast, lang, setLang,
    prevTitle: stack.length > 1 ? titleOf(stack[stack.length - 2]) : null,
    openSheet: setSheet,
    saved: state.saved, snaps: state.snaps, isSaved, toggleSave, addSnap,
  }), [route, go, back, replace, reset, toast, lang, setLang, stack, state, isSaved, toggleSave, addSnap])

  // Esc / Backspace — назад
  useEffect(() => {
    const on = (e) => {
      if (e.target.closest?.('input,textarea,select')) return
      if (e.key === 'Escape' || e.key === 'Backspace') back()
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [back])

  const showStatus = !vp.mobile
  const top = (showStatus ? STATUS_H : 0) + HEADER_H
  const contentH = vp.height - top - TAB_H

  const phone = (
    <Ctx.Provider value={ctx}>
      <div
        ref={phoneRef}
        className="phone c-phone"
        data-tour-active={tour >= 0 ? TOUR[tour].target : undefined}
        style={{ width: PHONE_W, height: vp.height, transform: `scale(${vp.scale})`, '--content-h': `${contentH}px` }}
      >
        <div className="c-top">
          {showStatus && <StatusBar />}
          <AppHeader />
        </div>
        <div className="c-scroller" ref={scroller}>
          <div key={`${route}-${stack.length}`} className={`c-screen anim-${dir}`}>
            {screenFor(route)}
          </div>
        </div>
        <TabBar />

        {tour >= 0 && (
          <Tour
            step={tour}
            top={top}
            onNext={() => (tour < TOUR.length - 1 ? setTour(tour + 1) : endTour())}
            onSkip={endTour}
          />
        )}

        {toastMsg && <div key={toastMsg.key} className="toast">{toastMsg.text}</div>}

        {sheet && (
          <div className="sheet-backdrop" onClick={() => setSheet(null)}>
            <div className="sheet" onClick={(e) => e.stopPropagation()}>
              <div className="sheet-grip" />
              <div className="sheet-title">{sheet.title}</div>
              {sheet.options.map(([label, fn]) => (
                <button key={label} className="sheet-opt" onClick={() => { setSheet(null); fn() }}>
                  {label}<span aria-hidden>→</span>
                </button>
              ))}
              <button className="sheet-cancel" onClick={() => setSheet(null)}>Annulla</button>
            </div>
          </div>
        )}
      </div>
    </Ctx.Provider>
  )

  const jump = (r) => { setDir('none'); scrollMemo.current = []; setStack([r]) }

  return (
    <Stage
      vp={vp}
      mode="app"
      phone={phone}
      actions={(
        <>
          <button onClick={restart}>↺ Ricomincia</button>
          <button onClick={back} disabled={stack.length < 2}>← Indietro</button>
          <button onClick={() => { jump(HOME); setTour(0) }}>Tutorial</button>
        </>
      )}
    >
      <PanelGroup name="Esplora & ricerca" current={route} onPick={jump} items={[
        ['esplora', 'Esplora (home)'], ['ricerca/oggetti', 'Ricerca oggetti'],
        ['ricerca/progettisti', 'Ricerca progettisti'], ['ricerca/aziende', 'Ricerca aziende'],
      ]} />
      <PanelGroup name="Nuovo snap" current={route} onPick={jump} items={[
        ['lens', 'Fotocamera'], ['match', 'Corrispondenza trovata'], ['condividi', 'Condividi Snap'],
      ]} />
      <PanelGroup name="Snap gallery & collezione" current={route} onPick={jump} items={[
        ['gallery', 'Snap gallery'], ['collezione/snap', 'La mia collezione'],
      ]} />
      <PanelGroup name="Oggetti" current={route} onPick={jump} items={
        ['panda', 'maralunga', 'sity', 'sfera', 'panigale'].map((id) => [`oggetto/${id}`, OBJECTS[id].name])
      } />
      <PanelGroup name="Categorie" current={route} onPick={jump} items={
        ['automobili', 'arredi', 'giochi', 'motocicli'].map((id) => [`categoria/${id}`, CATEGORIES[id].title])
      } />
      <PanelGroup name="Designer" current={route} onPick={jump} items={
        Object.keys(DESIGNERS).filter((id) => DESIGNERS[id].bio).map((id) => [`designer/${id}`, DESIGNERS[id].name])
      } />
      <PanelGroup name="Aziende" current={route} onPick={jump} items={
        Object.keys(COMPANIES).filter((id) => COMPANIES[id].story).map((id) => [`azienda/${id}`, COMPANIES[id].name])
      } />
    </Stage>
  )
}
