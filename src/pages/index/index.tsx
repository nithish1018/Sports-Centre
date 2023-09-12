import { Outlet } from "react-router-dom";
import LiveGames from "../../pages/news/sports";
import Articles from "../../pages/news/articles";
import { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

const Home = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <LiveGames />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <Articles />
        </Suspense>
      </ErrorBoundary>
      <Outlet />
    </>
  );
};

export default Home;
