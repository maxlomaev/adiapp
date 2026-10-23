import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import CodedApp from './app/CodedApp.jsx'
import FigmaApp from './figma/FigmaApp.jsx'
import './styles.css'

// #/figma/… — прототип из картинок Figma, всё остальное — React-приложение
const isFigma = () => location.hash.startsWith('#/figma')

function Root() {
  const [figma, setFigma] = useState(isFigma)
  useEffect(() => {
    const on = () => setFigma(isFigma())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return figma ? <FigmaApp /> : <CodedApp />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
