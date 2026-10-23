import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PHONE_W, PanelGroup, Stage, useViewport } from '../Stage.jsx'
import {
  GROUPS, HEADER_H, HEADER_SPOTS, SCREENS, SHEETS, START, TAB_H, TAB_SPOTS, src,
} from './screens.js'

const LENS_DELAY = 3000
const PREFIX = '#/figma/'

const idFromHash = () => {
  const id = decodeURIComponent(location.hash.slice(PREFIX.length))
  return SCREENS[id] ? id : START
}

// ——— Хотспоты

function Spots({ spots, k = 1, onAct }) {
  return spots.map(([x1, y1, x2, y2, act], i) => (
    <button
      key={i}
      className="spot"
      style={{ left: x1 * k, top: y1 * k, width: (x2 - x1) * k, height: (y2 - y1) * k }}
      onClick={(e) => { e.stopPropagation(); onAct(act) }}
      aria-label={typeof act === 'string' ? SCREENS[act]?.title : 'azione'}
    />
  ))
}

function ScrollScreen({ screen, onAct }) {
  return (
    <>
      <div className="scroller">
        <div className="sticky-head" style={{ height: HEADER_H }}>
          <img src={src(`${screen.id}-head`)} alt="" draggable="false" />
          <Spots spots={HEADER_SPOTS} onAct={onAct} />
        </div>
        <div className="body" style={{ height: screen.h }}>
          <img src={src(screen.id)} alt={screen.title} draggable="false" />
          <Spots spots={screen.spots} onAct={onAct} />
        </div>
        <div style={{ height: TAB_H }} />
      </div>
      <div className="tabbar" style={{ height: TAB_H }}>
        <img src={src('tabbar')} alt="" draggable="false" />
        <Spots spots={TAB_SPOTS} onAct={onAct} />
      </div>
    </>
  )
}

function StaticScreen({ screen, onAct }) {
  const k = PHONE_W / screen.w
  return (
    <div className="static">
      <div className="body" style={{ height: screen.h * k }}>
        <img src={src(screen.id)} alt={screen.title} draggable="false" />
        <Spots spots={screen.spots} k={k} onAct={onAct} />
      </div>
    </div>
  )
}

// ——— Приложение

export default function FigmaApp() {
  const vp = useViewport()
  const [stack, setStack] = useState(() => [idFromHash()])
  const [dir, setDir] = useState('none')
  const [showSpots, setShowSpots] = useState(false)
  const [flash, setFlash] = useState(false)
  const [toast, setToast] = useState(null)
  const [sheet, setSheet] = useState(null)
  const [saved, setSaved] = useState(() => new Set())
  const current = stack[stack.length - 1]
  const screen = SCREENS[current]
  const phoneRef = useRef(null)

  const go = useCallback((id, replace = false) => {
    if (!SCREENS[id]) return
    setDir('fwd')
    setStack((s) => (replace ? [...s.slice(0, -1), id] : [...s, id]))
  }, [])

  const back = useCallback(() => {
    setDir('back')
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : ['esplora']))
  }, [])

  const restart = () => { setDir('none'); setStack([START]); setSaved(new Set()) }
  const jump = (id) => { setDir('none'); setStack([id]) }

  const say = (text) => {
    setToast({ text, key: Date.now() })
  }

  const act = useCallback((a) => {
    if (typeof a === 'string') return go(a)
    if (a.back) return back()
    if (a.url) return void window.open(a.url, '_blank', 'noopener')
    if (a.sheet) return setSheet(a.sheet)
    if (a.toggle) {
      const on = !saved.has(current)
      setSaved((s) => { const n = new Set(s); on ? n.add(current) : n.delete(current); return n })
      return say(on ? 'Salvato nella mia collezione' : 'Rimosso dalla collezione')
    }
    if (a.go) go(a.go)
    if (a.toast) say(a.toast)
  }, [go, back, saved, current])

  // hash ↔ состояние
  useEffect(() => {
    const target = `${PREFIX}${current}`
    if (location.hash !== target) history.replaceState(null, '', target)
  }, [current])
  useEffect(() => {
    const on = () => { if (!location.hash.startsWith(PREFIX)) return; const id = idFromHash(); if (id !== current) jump(id) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  })

  // скролл в начало при смене экрана
  useLayoutEffect(() => {
    phoneRef.current?.querySelector('.scroller')?.scrollTo(0, 0)
  }, [stack.length, current])

  // камера «сканирует» и сама находит совпадение
  useEffect(() => {
    if (current !== 'lens') return
    const t = setTimeout(() => go('corrispondenza', true), LENS_DELAY)
    return () => clearTimeout(t)
  }, [current, go])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  // фоновая предзагрузка всех экранов
  useEffect(() => {
    const ids = Object.values(SCREENS).flatMap((s) => (s.kind === 'scroll' ? [s.id, `${s.id}-head`] : [s.id]))
    let i = 0
    const next = () => {
      if (i >= ids.length) return
      const img = new Image()
      img.onload = img.onerror = next
      img.src = src(ids[i++])
    }
    const t = setTimeout(next, 800)
    return () => clearTimeout(t)
  }, [])

  // клавиатура: Esc/Backspace — назад, H — подсветить зоны
  useEffect(() => {
    const on = (e) => {
      if (e.target.closest?.('input,textarea')) return
      if (e.key === 'Escape' || e.key === 'Backspace') back()
      if (e.key === 'h' || e.key === 'H' || e.key === 'р' || e.key === 'Р') setShowSpots((v) => !v)
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [back])

  // клик мимо зон — подсвечиваем кликабельное, как в Figma
  const missClick = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 650)
  }

  const phone = (
    <div
      ref={phoneRef}
      className={`phone ${vp.mobile ? 'is-mobile' : ''} ${showSpots ? 'show-spots' : ''} ${flash ? 'flash' : ''}`}
      style={{ width: PHONE_W, height: vp.height, transform: `scale(${vp.scale})` }}
      onClick={missClick}
    >
      <div key={`${current}-${stack.length}`} className={`screen anim-${dir}`}>
        {screen.kind === 'scroll'
          ? <ScrollScreen screen={screen} onAct={act} />
          : <StaticScreen screen={screen} onAct={act} />}
      </div>

      {current === 'lens' && <div className="scan-bar" />}

      {toast && <div key={toast.key} className="toast">{toast.text}</div>}

      {sheet && (
        <div className="sheet-backdrop" onClick={(e) => { e.stopPropagation(); setSheet(null) }}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-grip" />
            <div className="sheet-title">{SHEETS[sheet].title}</div>
            {SHEETS[sheet].options.map(([label, to]) => (
              <button key={to} className="sheet-opt" onClick={() => { setSheet(null); go(to) }}>
                {label}
                <span aria-hidden>→</span>
              </button>
            ))}
            <button className="sheet-cancel" onClick={() => setSheet(null)}>Annulla</button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <Stage
      vp={vp}
      mode="figma"
      phone={phone}
      actions={(
        <>
          <button onClick={restart}>↺ Ricomincia</button>
          <button onClick={back} disabled={stack.length < 2}>← Indietro</button>
          <label className="toggle">
            <input type="checkbox" checked={showSpots} onChange={(e) => setShowSpots(e.target.checked)} />
            Mostra zone cliccabili <kbd>H</kbd>
          </label>
        </>
      )}
    >
      {GROUPS.map(([name, ids]) => (
        <PanelGroup key={name} name={name} current={current} onPick={jump} items={ids.map((id) => [id, SCREENS[id].title])} />
      ))}
    </Stage>
  )
}
