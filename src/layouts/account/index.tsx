import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import LiveGames from "../../pages/news/sports";
import Articles from "../../pages/news/articles";

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
  );
};

export default AccountLayout;
