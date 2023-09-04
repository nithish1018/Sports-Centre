import { RouterProvider } from 'react-router-dom'
import router from './routes'
import {ThemeContext} from "./context/theme";
import { useContext } from 'react';

function App() {
  const { theme } = useContext(ThemeContext)

  return( 

    <div className={`h-screen py-2 ${theme === "dark" ? "dark" : ""}`}>
      <RouterProvider router={router} />
    </div>

  )
}

export default App
