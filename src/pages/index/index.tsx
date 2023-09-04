import { Outlet } from "react-router-dom";
import LiveGames from "../../pages/news/sports";
import Articles from "../../pages/news/articles";

const Home = () => {
  return (
    <>
      <LiveGames />
      <Articles />
      <Outlet />
    </>
  );
};

export default Home;
