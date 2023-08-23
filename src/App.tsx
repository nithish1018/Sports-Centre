
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes'
import AccountLayout from './layouts/account'

function App() {

  return( 
    <>
  <RouterProvider router={router} />

  </>
  )
}

export default App
