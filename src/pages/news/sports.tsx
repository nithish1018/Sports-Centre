import { Link } from "react-router-dom";
import { useGamesState } from "../../context/Games/context";
import { useEffect } from "react";
import { useGamesDispatch } from "../../context/Games/context";
import { fetchGames } from "../../context/Games/actions";
import { Waveform } from "@uiball/loaders";

export default function LiveGames() {
  const GameDispatch = useGamesDispatch();
  useEffect(() => {
    const test = fetchGames(GameDispatch);
    console.log(test);
  }, [GameDispatch]);
  let state: any = useGamesState();
  const { games, isLoading, isError, errorMessage } = state || {};
  console.log(games);
  if (games.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const sortedGames = [...games].sort((a, b) => b.isRunning - a.isRunning);

  return (
    <div>
      <h1 className="text-xl p-2 text-justify font-mono font-semibold">
        {" "}
        Live Games
      </h1>

      <div className="flex gap-4 overflow-x-auto w-full">
        {sortedGames &&
          sortedGames.map((Game) => (
            <Link
              to={`matches/${Game.id}`}
              key={Game.id}
              className="flex-shrink-0 bg-white p-3 rounded-md text-black dark:bg-slate-900"
            >
              <div className=" px-3 py-3 bg-white rounded-lg flex-shrink-0 shadow text-sm  border border-black dark:bg-slate-800 dark:text-zinc-50">
                <div className="text-justify flex gap-4 ">
                  {" "}
                  <span className="font-semibold bg-purple-200 rounded px-2 text-purple-600 text-sm">
                    {" "}
                    {Game.sportName}{" "}
                  </span>
                  {Game.isRunning ? (
                    <div className="flex gap-2 text-green-600">
                      <Waveform
                        size={20}
                        lineWeight={3.5}
                        speed={1}
                        color="purple"
                      />
                      <p className=" bg-green-200 rounded font-semibold px-2 animate-bounce">
                        Running
                      </p>
                    </div>
                  ) : (
                    <div className="text-red-600 bg-red-200 font-semibold rounded px-2 animate-pulse">
                      {" "}
                      Ended{" "}
                    </div>
                  )}{" "}
                </div>

                <div className="text-xl py-2 font-medium">
                  {Game.name.split("VS")[0]} VS{" "}
                  {Game.name.split("VS")[1].split("at")[0]}{" "}
                </div>
                <div className="text-justify text-xs  flex">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {Game.location}{" "}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
