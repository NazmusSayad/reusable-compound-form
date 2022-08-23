import { createRoot } from 'react-dom/client'
import './sass/index.scss'
import App from './App'

const rootElement = document.getElementById('Root')
const root = createRoot(rootElement)

root.render(<App />)
