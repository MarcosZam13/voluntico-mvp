import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Footer, Header } from './components/Layout'
import { useRoute } from './lib/router'
import { StoreProvider } from './lib/store'
import { Detail } from './pages/Detail'
import { Explore } from './pages/Explore'
import { Home } from './pages/Home'
import { OrgPanel } from './pages/OrgPanel'
import { Profile } from './pages/Profile'
import './styles.css'

const PAGES = {
  explorar: () => <Explore />,
  perfil: () => <Profile />,
  organizacion: () => <OrgPanel />,
  oportunidad: (param) => <Detail id={param} />,
}

function App() {
  const { section, param } = useRoute()
  const page = PAGES[section]
  return (
    <>
      <Header section={section} />
      <main>{page ? page(param) : <Home />}</main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
)
