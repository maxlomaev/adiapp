// Иконки в стиле макета (stroke 2, скругления), 24×24.

const I = ({ children, size = 20, fill = 'none', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    {children}
  </svg>
)

export const Search = (p) => <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>
export const Target = (p) => <I {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5.5" /><circle cx="12" cy="12" r="2" /></I>
export const Grid = (p) => <I {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17" /></I>
export const Bookmark = ({ filled, ...p }) => (
  <I {...p} fill={filled ? 'currentColor' : 'none'}><path d="M6 3.5h12v17l-6-4.5-6 4.5z" /></I>
)
export const ArrowLeft = (p) => <I {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></I>
export const ArrowRight = (p) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6" /></I>
export const ArrowUpRight = (p) => <I {...p}><path d="M7 17 17 7M8 7h9v9" /></I>
export const Chevron = (p) => <I {...p}><path d="m9 6 6 6-6 6" /></I>
export const ChevronDown = (p) => <I {...p}><path d="m6 9 6 6 6-6" /></I>
export const ChevronLeft = (p) => <I {...p}><path d="m15 6-6 6 6 6" /></I>
export const Plus = (p) => <I {...p}><path d="M12 5v14M5 12h14" /></I>
export const Close = (p) => <I {...p}><path d="M6 6l12 12M18 6 6 18" /></I>
export const Flash = (p) => <I {...p} fill="currentColor" stroke="none"><path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" /></I>
export const Filter = (p) => <I {...p}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></I>
export const Sort = (p) => <I {...p}><path d="m8 9 4-4 4 4M8 15l4 4 4-4" /></I>
export const Share = (p) => <I {...p}><path d="M12 15V3M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" /></I>
export const Share2 = (p) => <I {...p}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></I>
export const Sparkle =(p) => <I {...p} fill="currentColor" stroke="none"><path d="M10 2l1.8 5.2L17 9l-5.2 1.8L10 16l-1.8-5.2L3 9l5.2-1.8zM18 13l.9 2.1L21 16l-2.1.9L18 19l-.9-2.1L15 16l2.1-.9z" /></I>
export const Archive = (p) => <I {...p}><rect x="3" y="4" width="18" height="5" rx="1" /><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4" /></I>
export const Cart = (p) => <I {...p} fill="currentColor" stroke="none"><path d="M3 3h2.4l.6 3H21l-2 8H7.4l-.4-2-1.6-7H3zm5 15.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm9 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" /></I>
export const Tag = (p) => <I {...p} fill="currentColor" stroke="none"><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9zm5-4.5A1.5 1.5 0 1 0 8 10a1.5 1.5 0 0 0 0-3z" /></I>
export const Chart = (p) => <I {...p}><path d="M3 3v18h18M7 15l4-4 3 3 5-6" /></I>
export const External = (p) => <I {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></I>
export const Play = (p) => <I {...p} fill="currentColor" stroke="none"><path d="M8 5v14l11-7z" /></I>
export const Camera = (p) => <I {...p} fill="currentColor" stroke="none"><path d="M9 4h6l1.5 2H20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3.5zm3 4.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /></I>
export const Doc = (p) => <I {...p} fill="currentColor" stroke="none"><path d="M6 2h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm3 10v2h6v-2zm0 4v2h6v-2z" /></I>
export const Video = (p) => <I {...p} fill="currentColor" stroke="none"><path d="M3 6h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm14 4 5-3v10l-5-3z" /></I>
export const Building = (p) => <I {...p} fill="currentColor" stroke="none"><path d="M5 2h14v20h-5v-4h-4v4H5zm3 3v2h2V5zm6 0v2h2V5zM8 9v2h2V9zm6 0v2h2V9zm-6 4v2h2v-2zm6 0v2h2v-2z" /></I>
export const Pencil = (p) => <I {...p}><path d="m4 20 1-4L16 5l3 3L8 19z" /></I>
export const Check = (p) => <I {...p}><path d="m5 12 5 5 9-10" /></I>
