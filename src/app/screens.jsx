import { useEffect, useMemo, useState } from 'react'
import {
  CATEGORIES, COMPANIES, DESIGNERS, ME, OBJECTS, YEARS, designerNames, hasPage, img,
  objectsBy, objectsIn, objectsOf,
} from './data.js'
import * as Icon from './icons.jsx'
import {
  AwardPill, BackLink, Button, Kicker, Meta, MiniCard, ObjectCard, Pager, PersonRow, Photo, Rail,
  SaveFab, SaveMark, TextCard, Title, useApp,
} from './ui.jsx'

const LENS_DELAY = 3200

// ——— Esplora

export function Esplora() {
  const { go } = useApp()
  const searches = [
    ['Ricerca oggetti', 'ricerca/oggetti', 'esp-ogg', 'is-solid'],
    ['Ricerca progettisti', 'ricerca/progettisti', 'esp-prog', ''],
    ['Ricerca aziende', 'ricerca/aziende', 'esp-az', ''],
  ]
  return (
    <div className="page esplora">
      <section className="hero-card">
        <img src={img('esp-hero')} alt="" className="deco" draggable="false" />
        <h1 className="hero-title">Il design a portata di mano.</h1>
        <p className="hero-text">
          Riconosci subito qualsiasi oggetto della Collezione Storica Compasso d’Oro. Scopri la sua storia, chi l’ha
          disegnato e l’azienda che lo produce, e condividi il tuo scatto nella Snap Gallery.
        </p>
        <button className="btn-esp hero-btn" onClick={() => go('lens')}>
          <Icon.Plus size={18} /><span>Scatta e condividi<br />nuovo snap</span>
        </button>
      </section>

      {searches.map(([label, to, bg, mod]) => (
        <section key={to} className={`search-card ${mod}`} onClick={() => go(to)}>
          <img src={img(bg)} alt="" className="deco" draggable="false" />
          <button className="btn-esp">{label}</button>
        </section>
      ))}

      <div className="tiles">
        <a className="search-card tile" href="https://www.adi-design.org" target="_blank" rel="noreferrer">
          <img src={img('esp-adi')} alt="" className="deco" />
          <span className="btn-esp">Sito ADI</span>
        </a>
        <a className="search-card tile is-solid" href="https://www.adidesignmuseum.org" target="_blank" rel="noreferrer">
          <img src={img('esp-museo')} alt="" className="deco" />
          <span className="btn-esp">Il museo</span>
        </a>
      </div>
    </div>
  )
}

// ——— Ricerca

const RICERCA = {
  oggetti: ['Ricerca oggetti', 'Esplora la Collezione Storica Compasso d’Oro. Cerca un oggetto o combina i filtri.'],
  progettisti: ['Ricerca progettisti', 'Esplora i progettisti degli oggetti della Collezione Storica Compasso d’Oro.'],
  aziende: ['Ricerca aziende', 'Esplora le aziende produttrici degli oggetti della Collezione Storica Compasso d’Oro.'],
}

export function Ricerca({ tab }) {
  const { replace } = useApp()
  const [title, sub] = RICERCA[tab]
  return (
    <div className="page">
      <BackLink />
      <Title>{title}</Title>
      <p className="lead">{sub}</p>
      <div className="segmented">
        {Object.keys(RICERCA).map((t) => (
          <button key={t} className={t === tab ? 'is-active' : ''} onClick={() => replace(`ricerca/${t}`)}>
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {tab === 'oggetti' ? <SearchObjects /> : <SearchPeople kind={tab} />}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  )
}

function SearchObjects() {
  const { go } = useApp()
  const [q, setQ] = useState('')
  const [anno, setAnno] = useState('')
  const [des, setDes] = useState('')
  const [cat, setCat] = useState('')
  const [premio, setPremio] = useState('')
  const designers = useMemo(
    () => [...new Set(Object.values(OBJECTS).flatMap((o) => o.designers))].sort((a, b) => DESIGNERS[a].name.localeCompare(DESIGNERS[b].name)),
    [],
  )
  const submit = (e) => {
    e?.preventDefault()
    const p = new URLSearchParams()
    if (q.trim()) p.set('q', q.trim())
    if (anno) p.set('anno', anno)
    if (des) p.set('designer', des)
    if (cat) p.set('cat', cat)
    if (premio) p.set('premio', premio)
    go(`risultati?${p}`)
  }
  return (
    <form onSubmit={submit} className="search-form">
      <Field label="Nome dell’oggetto">
        <span className="input">
          <Icon.Search size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Digita il nome del prodotto…" enterKeyHint="search" />
        </span>
      </Field>
      <div className="adv-head">
        <h2 className="section-title">Ricerca avanzata</h2>
        <button type="button" className="link-reset" onClick={() => { setQ(''); setAnno(''); setDes(''); setCat(''); setPremio('') }}>Azzera</button>
      </div>
      <div className="filters">
      <Field label="Anno">
        <Select value={anno} onChange={setAnno} placeholder="Tutti gli anni" options={YEARS.map((y) => [y, y])} />
      </Field>
      <Field label="Progettista">
        <Select value={des} onChange={setDes} placeholder="Tutti i progettisti" options={designers.map((d) => [d, DESIGNERS[d].name])} />
      </Field>
      <Field label="Categoria">
        <Select value={cat} onChange={setCat} placeholder="Tutte le categorie" options={Object.entries(CATEGORIES).map(([k, c]) => [k, c.title])} />
      </Field>
      <Field label="Tipo di premio">
        <Select value={premio} onChange={setPremio} placeholder="Tutti i premi" options={PREMI} />
      </Field>
      </div>
      <button type="submit" className="btn-search">Cerca oggetti<Icon.ArrowRight size={16} /></button>
      <div className="hint-card" style={{ marginTop: 4 }}>
        <div className="hint-title"><Icon.Filter size={16} /><span>Modula la ricerca</span></div>
        <p>Puoi usare anche un solo filtro. Lascia tutti i campi liberi per esplorare l’intera collezione.</p>
      </div>
    </form>
  )
}

const PREMI = [['cdo', 'Compasso d’Oro'], ['menzione', 'Menzione d’onore'], ['carriera', 'Compasso d’Oro alla carriera']]

function Select({ value, onChange, placeholder, options }) {
  return (
    <span className="input select">
      <select value={value} onChange={(e) => onChange(e.target.value)} className={value ? '' : 'is-empty'}>
        <option value="">{placeholder}</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <Icon.ChevronDown size={16} />
    </span>
  )
}

const SUGG_IMG = { castiglioni: 'sugg-castiglioni', delucchi: 'sugg-delucchi', mari: 'sugg-mari', magistretti: 'sugg-magistretti' }

function SearchPeople({ kind }) {
  const { go, toast } = useApp()
  const [q, setQ] = useState('')
  const isDes = kind === 'progettisti'
  const source = isDes ? DESIGNERS : COMPANIES
  const linked = Object.keys(source).filter((id) => (isDes ? hasPage.designer(id) : hasPage.company(id)))
  const term = q.trim().toLowerCase()
  const matches = term ? linked.filter((id) => source[id].name.toLowerCase().includes(term)) : []
  const suggestions = isDes ? ['castiglioni', 'delucchi', 'mari', 'magistretti'] : ['artemide', 'olivetti', 'alessi', 'fiat']
  const open = (id) => {
    if (linked.includes(id)) return go(`${isDes ? 'designer' : 'azienda'}/${id}`)
    const objs = isDes ? objectsBy(id) : objectsOf(id)
    if (objs.length) return go(`risultati?${isDes ? 'designer' : 'azienda'}=${id}`)
    toast(`Scheda di ${source[id].name} non inclusa nel prototipo`)
  }
  const submit = (e) => {
    e.preventDefault()
    if (matches.length) open(matches[0])
    else toast(term ? 'Nessun risultato' : `Digita il nome ${isDes ? 'del progettista' : 'dell’azienda'}`)
  }
  const list = term ? matches : suggestions
  return (
    <form onSubmit={submit} className="search-form people">
      <Field label={isDes ? 'Nome o cognome del progettista' : 'Nome dell’azienda'}>
        <span className="input">
          <Icon.Search size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={isDes ? 'Digita il nome del progettista…' : 'Digita il nome dell’azienda…'}
            enterKeyHint="search"
          />
        </span>
      </Field>
      <button type="submit" className="btn-search">{isDes ? 'Cerca progettisti' : 'Cerca aziende'}<Icon.ArrowRight size={16} /></button>
      <section className="card suggest-card" style={{ marginTop: 8 }}>
        <div className="suggest-head"><Icon.Sparkle size={16} /><span>{term ? 'Risultati' : 'Suggerimenti per te'}</span></div>
        {list.length === 0 && <p className="muted">Nessun risultato per “{q}”.</p>}
        {list.map((id) => {
          const e = source[id]
          const thumb = isDes ? (SUGG_IMG[id] ?? e.thumb ?? e.portrait) : e.logo
          return (
            <button key={id} type="button" className="suggest-row" onClick={() => open(id)}>
              <span className={`suggest-thumb ${isDes ? '' : 'is-logo'}`}>
                {thumb ? <img src={img(thumb)} alt="" /> : <span className="suggest-initial">{e.wordmark ?? e.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>}
              </span>
              <span className="suggest-name">{e.name}</span>
              <Icon.ArrowUpRight size={16} />
            </button>
          )
        })}
      </section>
    </form>
  )
}

// ——— Списки: категория и результаты поиска

export function Categoria({ id }) {
  return <ObjectList title={CATEGORIES[id].title} ids={objectsIn(id)} />
}

export function Risultati({ params }) {
  const q = (params.get('q') ?? '').toLowerCase()
  const ids = Object.keys(OBJECTS).filter((id) => {
    const o = OBJECTS[id]
    if (q && !`${o.name} ${designerNames(o)} ${COMPANIES[o.company].name}`.toLowerCase().includes(q)) return false
    if (params.get('anno') && String(o.year) !== params.get('anno')) return false
    if (params.get('designer') && !o.designers.includes(params.get('designer'))) return false
    if (params.get('azienda') && o.company !== params.get('azienda')) return false
    if (params.get('cat') && o.category !== params.get('cat')) return false
    if (params.get('premio') && (o.award ?? 'cdo') !== params.get('premio')) return false
    return true
  })
  const title = params.get('designer') && !q && !params.get('anno') && !params.get('cat')
    ? `Oggetti di ${DESIGNERS[params.get('designer')].name}`
    : params.get('azienda') ? `Oggetti ${COMPANIES[params.get('azienda')].name}` : 'Risultati'
  return <ObjectList title={title} ids={ids} />
}

function ObjectList({ title, ids }) {
  const { openSheet, replace } = useApp()
  const filter = () => openSheet({
    title: 'Filtra per categoria',
    options: Object.entries(CATEGORIES).map(([k, c]) => [c.title, () => replace(`categoria/${k}`)]),
  })
  return (
    <div className="page">
      <BackLink />
      <Title size="lg">{title}</Title>
      <p className="found">Trovati {ids.length} oggetti premiati</p>
      <div className="chip-row">
        <Button variant="dark" className="btn-chip" iconLeft={<Icon.Filter size={14} />} onClick={filter}>Filtra</Button>
      </div>
      <div className="list-bg">
        {ids.length === 0 && <p className="empty">Nessun oggetto corrisponde ai filtri scelti.</p>}
        {ids.map((id) => <ObjectCard key={id} id={id} />)}
        {ids.length > 2 && <Pager />}
      </div>
    </div>
  )
}

// ——— Nuovo snap

export function Lens() {
  const { replace, back, lang } = useApp()
  useEffect(() => {
    const t = setTimeout(() => replace('match'), LENS_DELAY)
    return () => clearTimeout(t)
  }, [replace])
  // в макете нет кнопки затвора: распознавание идёт само, тап по кадру ускоряет
  return (
    <div className="lens" onClick={() => replace('match')}>
      <img src={img(lang === 'en' ? 'camera-en' : 'camera')} alt="" className="lens-feed" draggable="false" />
      <button className="lens-close" onClick={(e) => { e.stopPropagation(); back() }} aria-label="Chiudi" />
      <div className="lens-scan" />
    </div>
  )
}

export function Match() {
  const { go, replace } = useApp()
  return (
    <div className="page match-page">
      <section className="match-hero">
        <img src={img('match-hero')} alt="Fiat Panda" />
        <span className="match-badge">Corrispondenza trovata</span>
        <div className="match-title">Panda</div>
        <button className="match-go" onClick={() => go('oggetto/panda')}>
          Vai alla scheda<Icon.ArrowRight size={16} />
        </button>
      </section>
      <section className="card match-card">
        <img src={img('match-snap')} alt="Il tuo snap" className="match-snap" />
        <button className="btn-share" onClick={() => go('condividi')}>
          <Icon.Share2 size={16} />Condividi nella snap gallery
        </button>
      </section>
      <section className="card match-card">
        <button className="match-retry" onClick={() => replace('ricerca/oggetti')}>Non è l’oggetto giusto? Cerca ancora</button>
      </section>
    </div>
  )
}

export function Condividi() {
  const { addSnap } = useApp()
  const [caption, setCaption] = useState('')
  return (
    <div className="page share-page">
      <Title size="md" className="center">Condividi il tuo snap</Title>
      <p className="lead center small">Fai scoprire questo oggetto e la sua storia agli altri utenti ADI Snap.</p>
      <section className="card share-card">
        <div className="snap-photo">
          <img src={img('panda-snap')} alt="" />
          <SnapPill user={ME.handle} />
        </div>
        <div className="share-body">
          <h3 className="card-title lg">Panda</h3>
          <div className="muted small">Snap di {ME.handle}</div>
          <Field label="Didascalia (opzionale)">
            <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Aggiungi un messaggio…" rows={3} maxLength={160} />
          </Field>
        </div>
      </section>
      <button className="btn-share share-main" onClick={() => addSnap(caption)}>
        <Icon.Share2 size={16} />Condividi nella snap gallery
      </button>
    </div>
  )
}

// ——— Snap gallery

const SnapPill = ({ user }) => (
  <span className="snap-pill">
    <img src={img(user === ME.handle ? 'avatar' : 'thumb-giugiaro')} alt="" />
    Snap di {user}
  </span>
)

function SnapCard({ snap, saveButton }) {
  const { go, isSaved, toggleSave } = useApp()
  const o = OBJECTS[snap.object]
  const saved = isSaved('snap', snap.id)
  return (
    <article className="card snap-card">
      <div className="snap-photo" onClick={() => go(`oggetto/${snap.object}`)}>
        <img src={img(snap.photo)} alt={o.name} loading="lazy" />
        <SnapPill user={snap.user} />
      </div>
      <div className="snap-body" onClick={() => go(`oggetto/${snap.object}`)}>
        <div className="obj-card-row">
          <h3 className="card-title">{o.name}</h3>
          {!saveButton && <SaveMark kind="snap" id={snap.id} label="Snap" />}
        </div>
        <Meta o={o} />
        {snap.caption && <p className="quote">“{snap.caption}”</p>}
      </div>
      {saveButton && (
        <div className="snap-actions">
          <button className={`btn-save ${saved ? 'is-on' : ''}`} onClick={() => toggleSave('snap', snap.id, 'Snap')}>
            {saved ? <Icon.Check size={14} strokeWidth={3} /> : <Icon.Bookmark size={12} filled />}
            {saved ? 'Salvato nella collezione' : 'Salva nella mia collezione'}
          </button>
        </div>
      )}
    </article>
  )
}

export function Gallery() {
  const { snaps, openSheet } = useApp()
  const [cat, setCat] = useState('')
  const [oldest, setOldest] = useState(false)
  let list = snaps.filter((s) => !s.hidden && (!cat || OBJECTS[s.object].category === cat))
  if (oldest) list = [...list].reverse()
  const usedCats = [...new Set(snaps.filter((s) => !s.hidden).map((s) => OBJECTS[s.object].category))]
  return (
    <div className="page">
      <Title className="gallery-title">Snap gallery</Title>
      <p className="lead">Guarda gli Snap condivisi dagli altri utenti.</p>
      <div className="chip-row">
        <Button variant="dark" className="btn-chip" iconLeft={<Icon.Filter size={14} />} onClick={() => openSheet({
          title: 'Filtra per categoria',
          options: [['Tutte le categorie', () => setCat('')], ...usedCats.map((c) => [CATEGORIES[c].title, () => setCat(c)])],
        })}>{cat ? CATEGORIES[cat].title : 'Filtra'}</Button>
        <Button variant="dark" className="btn-chip" iconLeft={<Icon.Sort size={14} />} onClick={() => setOldest((v) => !v)}>
          {oldest ? 'Meno recenti' : 'Ordina'}
        </Button>
      </div>
      <div className="list-bg">
        {list.map((s) => <SnapCard key={s.id} snap={s} saveButton />)}
        <Pager />
      </div>
    </div>
  )
}

// ——— La mia collezione

const COLL_TABS = [['snap', 'Snap'], ['oggetti', 'Oggetti'], ['aziende', 'Aziende'], ['designer', 'Designer']]

export function Collezione({ tab }) {
  const { saved, snaps, replace, go } = useApp()
  const [az, setAz] = useState(false)
  const total = Object.values(saved).reduce((n, l) => n + l.length, 0)
  let ids = saved[tab]
  if (az) {
    const name = (id) => tab === 'snap' ? OBJECTS[snaps.find((s) => s.id === id).object].name
      : tab === 'oggetti' ? OBJECTS[id].name : tab === 'aziende' ? COMPANIES[id].name : DESIGNERS[id].name
    ids = [...ids].sort((a, b) => name(a).localeCompare(name(b)))
  }
  return (
    <div className="page coll-page">
      <div className="profile">
        <img src={img('avatar')} alt="" className="profile-avatar" />
        <div>
          <div className="profile-title">La mia collezione</div>
          <div className="profile-sub">{ME.handle}</div>
          <div className="profile-sub">{total} elementi salvati</div>
        </div>
      </div>
      <div className="coll-tabs">
        {COLL_TABS.map(([k, label]) => (
          <button key={k} className={k === tab ? 'is-active' : ''} onClick={() => replace(`collezione/${k}`)}>{label}</button>
        ))}
      </div>
      <div className="chip-row">
        <Button variant="dark" className="btn-chip" iconLeft={<Icon.Sort size={14} />} onClick={() => setAz((v) => !v)}>
          {az ? 'A → Z' : 'Ordina'}
        </Button>
      </div>
      <div className="list-bg">
        {ids.length === 0 && (
          <div className="empty">
            <Icon.Bookmark size={28} />
            <p>Niente qui per ora. Salva {tab === 'snap' ? 'gli Snap dalla Snap Gallery' : 'quello che ti colpisce'} con il segnalibro.</p>
          </div>
        )}
        {tab === 'snap' && ids.map((id) => <SnapCard key={id} snap={snaps.find((s) => s.id === id)} />)}
        {tab === 'oggetti' && ids.map((id) => <ObjectCard key={id} id={id} />)}
        {tab === 'aziende' && ids.map((id) => (
          <article key={id} className="card entity-card" onClick={() => go(`azienda/${id}`)}>
            <img src={img(COMPANIES[id].coll ?? COMPANIES[id].logo)} alt="" className="entity-logo" />
            <div className="obj-card-row"><h3 className="card-title">{COMPANIES[id].short ?? COMPANIES[id].name}</h3><SaveMark kind="aziende" id={id} label={COMPANIES[id].name} /></div>
          </article>
        ))}
        {tab === 'designer' && ids.map((id) => (
          <article key={id} className="card entity-card" onClick={() => go(`designer/${id}`)}>
            <img src={img(DESIGNERS[id].portrait)} alt="" className="entity-photo" />
            <div className="obj-card-row">
              <h3 className="card-title two-lines">{DESIGNERS[id].lines[0]}<br />{DESIGNERS[id].lines[1]}</h3>
              <SaveMark kind="designer" id={id} label={DESIGNERS[id].name} />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

// ——— Детальные страницы

export function Oggetto({ id }) {
  const { go, toast } = useApp()
  const o = OBJECTS[id]
  const related = objectsIn(o.category).filter((x) => x !== id)
  const soon = () => toast('Disponibile nel prototipo solo per la Panda')
  return (
    <div className="page detail">
      <BackLink />
      <Title className="obj-title">{o.lines ? <>{o.lines[0]}<br />{o.lines[1]}</> : o.name}</Title>
      <div className="award-line">{o.year ? `Compasso d’Oro ${o.year}` : 'Collezione storica'}</div>
      <div className="hero-photo">
        <Photo name={o.image} alt={o.name} className="obj-photo" />
        <SaveFab kind="oggetti" id={id} label={o.name} />
      </div>
      <TextCard title="Storia" paragraphs={o.story} />
      {o.image2 && <Photo name={o.image2} className="obj-photo second" />}
      <div className="stack">
        {o.designers.map((d) => <PersonRow key={d} kind="designer" id={d} />)}
        <PersonRow kind="company" id={o.company} />
        {o.motivation && <TextCard title="Motivazione del premio" paragraphs={[`“${o.motivation}”`]} italic />}
        <section className="dark-card">
          <span className="dark-icon"><Icon.Archive size={14} /></span>
          <h2 className="dark-title">Materiale d’archivio</h2>
          <p>Informazioni sull’edizione e documenti originali.</p>
          <button className="btn-cta gold" onClick={() => (o.archive ? go(`archivio/${id}`) : soon())}>Esplora</button>
        </section>
      </div>
      <section className="market-card">
        <h2 className="card-heading center">Guida all’acquisto</h2>
        <p className="center">Analisi aggiornata del mercato.</p>
        <button className="btn-cta dark tall" onClick={() => (o.market ? go(`guida/${id}`) : soon())}>
          Vedi valore di mercato<Icon.Chart size={10} strokeWidth={3} />
        </button>
      </section>
      {related.length > 0 && (
        <Rail title={`Altri oggetti nella categoria ${CATEGORIES[o.category].title}`} onAll={() => go(`categoria/${o.category}`)}>
          {related.map((r) => <MiniCard key={r} id={r} />)}
        </Rail>
      )}
    </div>
  )
}

export function Designer({ id }) {
  const { go, toast } = useApp()
  const d = DESIGNERS[id]
  const objs = objectsBy(id)
  return (
    <div className="page detail">
      <BackLink />
      <section className="card profile-card">
        <Kicker>Designer</Kicker>
        <Title className="obj-title">{d.lines[0]}<br />{d.lines[1]}</Title>
        {d.award && <div className="award-line designer">{d.award}</div>}
        <div className="hero-photo">
          <Photo name={d.photo} alt={d.name} className="designer-photo" />
          <SaveFab kind="designer" id={id} label={d.name} />
        </div>
        <blockquote className="big-quote">“{d.quote}”</blockquote>
      </section>
      <TextCard title="Biografia" paragraphs={d.bio} />
      <Rail title="Interviste">
        {d.videos.map((v, i) => (
          <article key={i} className="card video-card" onClick={() => toast('Video non disponibile nel prototipo')}>
            <div className="video-thumb">
              {v.thumb ? <img src={img(v.thumb)} alt="" /> : <img src={img(d.photo)} alt="" className="is-dim" />}
              <span className="play"><Icon.Play size={18} /></span>
            </div>
            <div className="video-body">
              <div className="video-title">{v.title}</div>
              <div className="video-text">{v.text}</div>
              <span className="time-chip">{v.time}</span>
            </div>
          </article>
        ))}
      </Rail>
      {objs.length > 0 && (
        <Rail title={`Oggetti di ${d.name} nella collezione`} narrow onAll={() => go(`risultati?designer=${id}`)}>
          {objs.map((o) => <MiniCard key={o} id={o} />)}
        </Rail>
      )}
    </div>
  )
}

export function Azienda({ id }) {
  const { go } = useApp()
  const c = COMPANIES[id]
  const objs = objectsOf(id)
  return (
    <div className="page detail">
      <BackLink />
      <Kicker className="company-kicker">Produttore</Kicker>
      <Title className="obj-title">{c.name}</Title>
      <div className="card logo-card"><img src={img(c.logo)} alt={c.name} /></div>
      <div className="card stat-card">
        <span className="stat-num">{c.count}</span>
        <span className="stat-label">Oggetti nella<br />collezione storica<br />Compasso d’Oro</span>
      </div>
      <a className="btn-cta gold tall site-btn" href={c.site} target="_blank" rel="noreferrer">
        Visita il sito {c.short ?? c.name}<Icon.External size={10} strokeWidth={3} />
      </a>
      <TextCard title="Storia" paragraphs={c.story} />
      {objs.length > 0 && (
        <Rail title={<>Oggetti {c.name}<br />nella collezione</>} onAll={() => go(`risultati?azienda=${id}`)}>
          {objs.map((o) => <MiniCard key={o} id={o} />)}
        </Rail>
      )}
    </div>
  )
}

export function Archivio({ id }) {
  const { toast } = useApp()
  const o = OBJECTS[id]
  const isPanda = id === 'panda'
  const cats = [
    [Icon.Camera, 'Fotografie', 'Immagini storiche del processo di progettazione e pubblicitarie', isPanda ? 45 : 12],
    [Icon.Doc, 'Documenti', 'Briefing, relazioni tecniche, corrispondenze e prove su strada', 8],
    [Icon.Video, 'Filmati', 'Pubblicità e materiale informativo dell’epoca', isPanda ? 8 : 3],
  ]
  return (
    <div className="page detail">
      <BackLink />
      <Title className="obj-title">Materiale<br />d’archivio</Title>
      <section className="card edition-card">
        <div className="poster">
          {isPanda ? <img src={img('poster-1981')} alt="" /> : (
            <div className="poster-css"><span>Compasso d’Oro</span><b>{o.year}</b></div>
          )}
        </div>
        <h2 className="card-heading">Compasso d’Oro {o.year}</h2>
        {isPanda && (
          <div className="edition-meta">
            <div><Kicker>Premiazione</Kicker>17 settembre 1981</div>
            <div><Kicker>Mostra</Kicker>Triennale Milano</div>
          </div>
        )}
        {isPanda && (
          <>
            <div className="also-title">Altri premiati del 1981</div>
            <div className="also-row">
              {[['praxis', 'Praxis 35', 'Olivetti', 'Mario Bellini'], ['wiz', 'Wiz', 'Wizco', 'Rodolfo Bonetto'], ['d70', 'D70', 'Tecno', '']].map(([im, n, m, d]) => (
                <div key={n} className="also-item">
                  <div className="also-img">{im && <img src={img(im)} alt="" />}</div>
                  <div className="also-name">{n}</div>
                  <div className="meta-maker">{m}</div>
                  {d && <div className="meta-designer">{d}</div>}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <h2 className="section-title pad">Categorie di materiale</h2>
      {cats.map(([Ico, t, s, n]) => (
        <button key={t} className="card cat-row" onClick={() => toast(`${t}: ${n} elementi (non inclusi nel prototipo)`)}>
          <span className="cat-icon"><Ico size={18} /></span>
          <span className="cat-title">{t}</span>
          <span className="cat-sub">{s}</span>
          <span className="cat-count">{n} elementi <Icon.Chevron size={16} /></span>
        </button>
      ))}
      <section className="dark-card horo">
        <img src={img('horo')} alt="Archivio Digitale ADI Design Museum" className="horo-img" />
        <h2 className="card-heading light big">Horo</h2>
        <p>HORO è il portale digitale dedicato alla conservazione e valorizzazione del patrimonio documentale del Premio Compasso d’Oro e dell’ADI.</p>
        <a className="btn-cta gold" href="https://www.adidesignmuseum.org" target="_blank" rel="noreferrer">
          Visita Horo<Icon.External size={10} strokeWidth={3} />
        </a>
        {isPanda && (
          <div className="rail-track dark">
            <img src={img('blueprint')} alt="Viste del prototipo (1979)" className="doc-thumb" />
          </div>
        )}
      </section>
      {o.company === 'fiat' && (
        <section className="card text-card">
          <div className="hint-title big"><span className="cat-icon red"><Icon.Building size={18} /></span>
            <span>Centro Storico Fiat<small>Archivio del produttore</small></span>
          </div>
          <img src={img('video-fiat')} alt="AD FIAT Panda — Young 1987" className="rounded-img" />
          <a className="btn-cta dark" href="https://www.centrostoricofiat.it" target="_blank" rel="noreferrer">
            Visita il centro storico<Icon.External size={10} strokeWidth={3} />
          </a>
        </section>
      )}
    </div>
  )
}

export function Guida({ id }) {
  const o = OBJECTS[id]
  const m = o.market
  const q = encodeURIComponent(`${COMPANIES[o.company].name} ${o.name}`)
  return (
    <div className="page detail">
      <BackLink />
      <Title className="obj-title">Guida<br />all’acquisto</Title>
      <section className="card buy-card">
        <span className="buy-icon"><Icon.Cart size={22} /></span>
        <h2 className="card-heading center">Acquista nuova</h2>
        <span className={`state-chip ${m.new ? 'is-ok' : ''}`}>{m.new ? 'In produzione' : 'Non più in produzione'}</span>
      </section>
      <section className="used-card">
        <span className="used-icon"><Icon.Tag size={22} /></span>
        <h2 className="card-heading light center">Mercato dell’usato</h2>
        <div className="used-inner">
          <img src={img(m.image ?? o.image)} alt="" className="used-img" />
          {m.used ? (
            <div className="price-box">
              <div className="hint-title"><Icon.Chart size={18} /><span>Prezzo medio</span></div>
              {m.used.map(([label, price]) => (
                <div key={label} className="price-row"><span>{label}</span><b>{price}</b></div>
              ))}
            </div>
          ) : <p className="muted center">Dati di mercato non ancora disponibili per questo oggetto.</p>}
          <a className="btn-cta dark tall" href={m.link ?? `https://www.subito.it/annunci-italia/vendita/usato/?q=${q}`} target="_blank" rel="noreferrer">
            Vai a Subito.it<Icon.External size={8} strokeWidth={3} />
          </a>
        </div>
      </section>
    </div>
  )
}
