import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider} from "./context/theme";
import {GamesProvider} from "./context/Games/context.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <GamesProvider>
    <App />
    </GamesProvider>
  </ThemeProvider>,
)
