import { Link } from "react-router-dom";
import { useArticlesState } from "../../context/Articles/context";
import { useArticlesDispatch } from "../../context/Articles/context";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../context/Articles/actions";
import { Tab } from "@headlessui/react";
import { API_ENDPOINT } from "../../config/constants";
// import { Games } from "../../context/Games/reducer";
import { useGamesDispatch } from "../../context/Games/context";
import { Preferences, fetchPreferences } from "../../utils/utils";
import { fetchGames } from "../../context/Games/actions";
import { ArticleInfo } from "../../context/Articles/reducer";

export default function Articles() {
  const ArticleDispatch = useArticlesDispatch();
  useEffect(() => {
    const test = fetchArticles(ArticleDispatch);
    console.log(test);
  }, []);
  let state: any = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state || {};
  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  type Sports = {
    id: number;
    name: string;
  };
  const [sports, setSports] = useState<Sports[]>([]);

  const fetchSports = async () => {
    const data = await fetch(`${API_ENDPOINT}/sports`, {
      method: "GET",
    });
    const jsonData = await data.json();
    setSports(jsonData.sports);
  };

  useEffect(() => {
    fetchSports();
  }, []);
  console.log(sports);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join("");
  }
  const GameDispatch = useGamesDispatch();
  useEffect(() => {
    fetchGames(GameDispatch);
    fetchPreferences().then((data) => {
      console.log({ data });
      setUserPreferences(data);
    });
  }, [GameDispatch]);
  const [userPreferences, setUserPreferences] = useState<Preferences>();

  const sortedAndFilteredArticles = articles.filter(
    (article: ArticleInfo) =>
      userPreferences?.userPreferences.games.length === 0 ||
      userPreferences?.userPreferences.games.includes(article.sport.name),
  );
  console.log(sortedAndFilteredArticles);
  return (
    <div className="w-fullx-wpx-2 py-16 sm:px-0">
      <h1 className="text-xl px-2 text-justify font-mono font-semibold">
        Sport Articles
      </h1>
      <br />
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded- bg-gray-600/2020 p-1">
          {[{ id: -1, name: "All news" }, ...sports].map((sport) => (
            <Tab
              key={sport.id}
              className={({ selected }) =>
                classNames(
                  "w-full  rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bwhitete shadow dark:bg-white dark:text-black border border-black"
                    : "text-blue-100  hover:bg-white/[0.12] hover:font-bold",
                )
              }
            >
              {sport.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {[{ id: -1, name: "All news" }, ...sports].map((sport, idx) => {
            let flag = true;
            return (
              <Tab.Panel key={idx}>
                {sortedAndFilteredArticles &&
                  sortedAndFilteredArticles.map(
                    (article: {
                      id: number;
                      thumbnail: string;
                      sport: {
                        id: number;
                        name: string;
                      };
                      title: string;
                      summary: string;
                      date: string;
                    }) => {
                      if (
                        sport.id === -1 ||
                        article?.sport.name === sport.name
                      ) {
                        flag = false;
                        return (
                          <Link
                            to={`articles/${article.id}`}
                            key={article.id}
                            className=" p-3 rounded-md text-black"
                          >
                            <div className="container flex-1 rounded mx-auto border-2 border-black">
                              <div className="flex">
                                <img
                                  src={article.thumbnail}
                                  alt="Image"
                                  className="w-40 h-45 rounded object-cover"
                                />
                                <div className="px-4 py-4">
                                  <h1 className="text-4xl bg-red-300 rounded px-2 py-2 font-bo dark:text-whiteld">
                                    {article.sport.name}
                                  </h1>
                                  <h1 className="text-3xl dark:text-white font-semibold">
                                    {article.title}
                                  </h1>
                                  <p className="text-lg dark:text-white text-gray-700">
                                    {article.summary}
                                  </p>
                                  <div className="flex dark:text-white gap-2 py-2 px-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                      />
                                    </svg>

                                    <p className="text-sm font-medium bg-red-300 px-2 rounded text-gray-700">
                                      {article.date.split("T")[0]}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      }
                    },
                  )}
                {flag && (
                  <div className="grid h-screen text-2xl place-items-center">
                    {" "}
                    Sorry No articles Found
                  </div>
                )}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
