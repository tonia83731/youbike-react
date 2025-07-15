import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/styles'
// import 'react-leaflet-markercluster/dist/styles.min.css';
import App from './App.tsx'
import FilterProvider from './context/filterContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterProvider>
      <App />
    </FilterProvider>
  </StrictMode>,
)
