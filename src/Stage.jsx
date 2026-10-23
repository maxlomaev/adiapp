import { useEffect, useState } from 'react'

export const PHONE_W = 375
export const PHONE_H = 856

// Десктоп: телефон в рамке, масштаб под высоту окна. Телефон: на весь экран.
export function useViewport() {
  const read = () => {
    const vw = window.innerWidth || PHONE_W
    const vh = window.innerHeight || PHONE_H
    const mobile = vw < 640
    if (mobile) {
      const scale = vw / PHONE_W
      return { mobile, scale, height: vh / scale }
    }
    return { mobile, scale: Math.min(1, (vh - 48) / PHONE_H), height: PHONE_H }
  }
  const [vp, setVp] = useState(read)
  useEffect(() => {
    const on = () => setVp(read())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return vp
}

const MODES = [
  ['app', 'App React', '#/esplora'],
  ['figma', 'Figma', '#/figma/esplora'],
]

export function Stage({ vp, mode, actions, children, phone }) {
  if (vp.mobile) return <div className="stage mobile">{phone}</div>
  return (
    <div className="stage">
      <aside className="panel">
        <div className="panel-head">
          <div className="panel-title">ADI Snap</div>
          <div className="panel-sub">{mode === 'app' ? 'App interattiva in React' : 'Prototipo dalle schermate Figma'}</div>
        </div>
        <div className="mode-switch" role="tablist">
          {MODES.map(([m, label, href]) => (
            <a key={m} href={href} role="tab" aria-selected={m === mode} className={m === mode ? 'is-active' : ''}>{label}</a>
          ))}
        </div>
        <div className="panel-actions">{actions}</div>
        <nav className="panel-list">{children}</nav>
      </aside>
      <main className="device-area">
        <div className="device" style={{ width: PHONE_W * vp.scale, height: PHONE_H * vp.scale }}>
          {phone}
        </div>
      </main>
    </div>
  )
}

export function PanelGroup({ name, items, current, onPick }) {
  return (
    <div className="panel-group">
      <div className="panel-group-name">{name}</div>
      {items.map(([id, title]) => (
        <button key={id} className={`panel-item ${id === current ? 'active' : ''}`} onClick={() => onPick(id)}>
          {title}
        </button>
      ))}
    </div>
  )
}
