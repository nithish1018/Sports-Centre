import { Outlet } from "react-router-dom"
import AppBar from "./AppBar"

const AccountLayout = () => {

  return (
    <>
      <AppBar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AccountLayout