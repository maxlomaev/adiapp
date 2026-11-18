import { createContext, useContext } from 'react'
import { COMPANIES, DESIGNERS, OBJECTS, designerNames, hasPage, img } from './data.js'
import * as Icon from './icons.jsx'

export const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

// ——— Каркас

export function StatusBar({ dark }) {
  return (
    <div className={`statusbar ${dark ? 'is-dark' : ''}`}>
      <span>9:41</span>
      <span className="statusbar-icons" aria-hidden>
        <svg width="18" height="11" viewBox="0 0 18 11"><g fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="6" rx="1" /><rect x="10" y="2.5" width="3" height="8.5" rx="1" /><rect x="15" y="0" width="3" height="11" rx="1" /></g></svg>
        <svg width="16" height="11" viewBox="0 0 16 11"><path fill="currentColor" d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.2A10.2 10.2 0 0 0 8 .6C5.3.6 2.8 1.6.9 3.4L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.3c1.4 0 2.7.5 3.7 1.4l1.1-1.2A7 7 0 0 0 8 3.9a7 7 0 0 0-4.8 1.8l1.1 1.2c1-.9 2.3-1.4 3.7-1.4zM8 8.7c.6 0 1.1.2 1.5.6L8 11 6.5 9.3c.4-.4.9-.6 1.5-.6z" /></svg>
        <svg width="27" height="12" viewBox="0 0 27 12"><rect x=".5" y=".5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="20" height="8" rx="2" fill="currentColor" /><path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4z" fill="currentColor" opacity=".5" /></svg>
      </span>
    </div>
  )
}

export function AppHeader() {
  const { reset, go, route } = useApp()
  return (
    <header className="app-header">
      <button className="brand" onClick={() => reset('esplora')} aria-label="ADI Snap — Esplora">
        <img src={img('marchio')} alt="" width="50" height="40" />
        <span>ADI<br />SNAP</span>
      </button>
      <button
        className={`search-btn ${route.startsWith('ricerca') ? 'is-active' : ''}`}
        onClick={() => !route.startsWith('ricerca') && go('ricerca/oggetti')}
        aria-label="Cerca"
        data-tour="search"
      >
        <Icon.Search size={20} />
      </button>
    </header>
  )
}

const TABS = [
  ['lens', 'Nuovo snap', Icon.Target, ['lens', 'match', 'condividi']],
  ['gallery', 'Snap gallery', Icon.Grid, ['gallery']],
  ['collezione/snap', 'La mia collezione', Icon.Bookmark, ['collezione']],
]

export function TabBar() {
  const { route, reset } = useApp()
  const root = route.split(/[/?]/)[0]
  return (
    <nav className="tabbar-c">
      {TABS.map(([to, label, Ico, roots], i) => (
        <button
          key={to}
          className={`tab ${roots.includes(root) ? 'is-active' : ''}`}
          onClick={() => reset(to)}
          data-tour={`tab${i + 1}`}
        >
          <Ico size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

// ——— Типографика и кнопки

export function BackLink() {
  const { back, prevTitle } = useApp()
  if (!prevTitle) return null
  return (
    <button className="backlink" onClick={back}>
      <Icon.ArrowLeft size={14} strokeWidth={2.5} /><span>Torna a {prevTitle}</span>
    </button>
  )
}

export const Title = ({ children, size = 'xl', className = '' }) => (
  <h1 className={`title title-${size} ${className}`}>{children}</h1>
)

export const Kicker = ({ children, className = '' }) => <div className={`kicker ${className}`}>{children}</div>

export function Button({ children, variant = 'gold', icon, iconLeft, className = '', ...p }) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...p}>
      {iconLeft}
      <span>{children}</span>
      {icon}
    </button>
  )
}

export const AwardPill = ({ year, className = '' }) => (
  <span className={`award ${className}`}>{year ? `Compasso d’Oro ${year}` : 'Collezione storica'}</span>
)

export function Photo({ name, alt = '', className = '', ratio }) {
  return (
    <div className={`photo ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={img(name)} alt={alt} loading="lazy" draggable="false" />
    </div>
  )
}

export function SaveFab({ kind, id, label }) {
  const { isSaved, toggleSave } = useApp()
  const on = isSaved(kind, id)
  return (
    <button className={`save-fab ${on ? 'is-on' : ''}`} onClick={() => toggleSave(kind, id, label)} aria-pressed={on} aria-label="Salva">
      <Icon.Bookmark size={16} filled={on} strokeWidth={2.4} />
    </button>
  )
}

export function SaveMark({ kind, id, label }) {
  const { isSaved, toggleSave } = useApp()
  const on = isSaved(kind, id)
  return (
    <button
      className={`save-mark ${on ? 'is-on' : ''}`}
      onClick={(e) => { e.stopPropagation(); toggleSave(kind, id, label) }}
      aria-pressed={on}
      aria-label={on ? 'Rimuovi dalla collezione' : 'Salva nella collezione'}
    >
      <Icon.Bookmark size={20} filled />
    </button>
  )
}

// ——— Карточки

export function ObjectCard({ id, showAward = true }) {
  const { go } = useApp()
  const o = OBJECTS[id]
  const linked = hasPage.object(id)
  return (
    <article className={`card obj-card ${linked ? '' : 'is-static'}`} onClick={() => linked && go(`oggetto/${id}`)}>
      <div className="obj-card-photo">
        <img src={img(o.image)} alt={o.name} loading="lazy" draggable="false" />
        {showAward && <AwardPill year={o.year} className="on-photo" />}
      </div>
      <div className="obj-card-body">
        <div className="obj-card-row">
          <h3 className="card-title">{o.name}</h3>
          <SaveMark kind="oggetti" id={id} label={o.name} />
        </div>
        <Meta o={o} />
      </div>
    </article>
  )
}

export const Meta = ({ o }) => (
  <>
    <div className="meta-maker">{o.makerLabel ?? COMPANIES[o.company].name}</div>
    <div className="meta-designer">{designerNames(o)}</div>
  </>
)

export function MiniCard({ id }) {
  const { go } = useApp()
  const o = OBJECTS[id]
  const linked = hasPage.object(id)
  return (
    <article className={`card mini-card ${linked ? '' : 'is-static'}`} onClick={() => linked && go(`oggetto/${id}`)}>
      <img src={img(o.image)} alt={o.name} loading="lazy" draggable="false" />
      <div className="mini-card-body">
        <div className="mini-title">{o.name}</div>
        <div className="mini-sub">{o.year ? `Compasso d’Oro ${o.year}` : 'Collezione storica'}</div>
      </div>
    </article>
  )
}

export function Rail({ title, onAll, narrow, children }) {
  return (
    <section className="rail">
      <div className="rail-head">
        <h2 className={`rail-title ${narrow ? 'is-narrow' : ''}`}>{title}</h2>
        {onAll && <button className="link-all" onClick={onAll}>Vedi tutti</button>}
      </div>
      <div className="rail-track">{children}</div>
    </section>
  )
}

export function PersonRow({ kind, id }) {
  const { go } = useApp()
  const isDesigner = kind === 'designer'
  const entity = isDesigner ? DESIGNERS[id] : COMPANIES[id]
  const linked = isDesigner ? hasPage.designer(id) : hasPage.company(id)
  const thumb = entity.thumb
  return (
    <button
      className={`card person-row ${linked ? '' : 'is-static'}`}
      onClick={() => linked && go(`${isDesigner ? 'designer' : 'azienda'}/${id}`)}
      disabled={!linked}
    >
      <span className="person-thumb">
        {thumb ? <img src={img(thumb)} alt="" /> : <span className="wordmark">{entity.wordmark ?? entity.name}</span>}
      </span>
      <span className="person-text">
        <span className="person-kind">{isDesigner ? 'Designer' : 'Produttore'}</span>
        <span className="person-name">{entity.name}</span>
      </span>
      {linked && <Icon.Chevron size={16} strokeWidth={2.6} className="person-chevron" />}
    </button>
  )
}

export const TextCard = ({ title, paragraphs, italic }) => (
  <section className="card text-card">
    <h2 className="card-heading">{title}</h2>
    {paragraphs.map((p, i) => <p key={i} className={italic ? 'is-italic' : ''}>{p}</p>)}
  </section>
)

export function Pager() {
  const { toast } = useApp()
  return (
    <div className="pager">
      <button aria-label="Precedente" disabled><Icon.ChevronLeft size={18} /></button>
      <button className="is-current">1</button>
      <button onClick={() => toast('Pagina 2 non inclusa nel prototipo')}>2</button>
      <button aria-label="Successiva" onClick={() => toast('Pagina 2 non inclusa nel prototipo')}><Icon.Chevron size={18} /></button>
    </div>
  )
}
