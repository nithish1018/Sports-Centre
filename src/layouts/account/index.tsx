import { Outlet } from "react-router-dom"
import AppBar from "./AppBar"

const AccountLayout = () => {

  return (
    <>
      <AppBar />
      <main>
        <div className="mx-auto max-w-7xl py-6 px-6 ">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AccountLayout