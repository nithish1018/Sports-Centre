import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { fetchPreferences, updatePreferences } from "../../utils/utils";

type sport = {
  id: number;
  name: string;
};

type team = {
  id: number;
  name: string;
  plays: string;
};

function UserPreferences() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sports, setSports] = useState<sport[]>([]);
  const [teams, setTeams] = useState<team[]>([]);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  let [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    nav("/home/matches");
  };

  const fetchSports = async () => {
    const data = await fetch(`${API_ENDPOINT}/sports`, {
      method: "GET",
    });
    const jsonData = await data.json();
    setSports(jsonData.sports);
  };

  const fetchTeams = async () => {
    const data = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
    });
    const jsonData = await data.json();
    setTeams(jsonData);
  };

  useEffect(() => {
    setLoading(true);
    fetchSports();
    fetchTeams();
    fetchPreferences().then((preferences) => {
      setSelectedGames(preferences.userPreferences.games);
      setSelectedTeams(preferences.userPreferences.teams);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    User Preferences
                  </Dialog.Title>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>
                      <div className="mt-4 w-full">
                        <h3 className="my-2 font-semibold text-gray-900 dark:text-white">
                          Select sports
                        </h3>
                        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          {sports.map((sport, idx) => (
                            <li
                              key={idx}
                              className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                            >
                              <div className="flex items-center pl-3">
                                <input
                                  id={`${sport.id}-checkbox`}
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      setSelectedGames([
                                        ...selectedGames,
                                        sport.name,
                                      ]);
                                    } else {
                                      setSelectedGames(
                                        selectedGames.filter(
                                          (selectedSport) =>
                                            selectedSport !== sport.name,
                                        ),
                                      );
                                    }
                                  }}
                                  type="checkbox"
                                  checked={selectedGames.includes(sport.name)}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                  htmlFor={`${sport.id}-checkbox`}
                                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  {sport.name}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 w-full">
                        <h3 className="my-2 font-semibold text-gray-900 dark:text-white">
                          Select teams
                        </h3>
                        <ul className="w-full text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white grid grid-rows-5 grid-flow-col gap-4">
                          {teams.map((team, idx) => (
                            <li
                              key={idx}
                              className="w-full border border-gray-200 rounded-lg dark:border-gray-600"
                            >
                              <div className="flex items-center pl-3">
                                <input
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      setSelectedTeams([
                                        ...selectedTeams,
                                        team.id,
                                      ]);
                                    } else {
                                      setSelectedTeams(
                                        selectedTeams.filter(
                                          (selectedTeam) =>
                                            selectedTeam !== team.id,
                                        ),
                                      );
                                    }
                                  }}
                                  id={`${team.id}-team-checkbox`}
                                  type="checkbox"
                                  checked={selectedTeams.includes(team.id)}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                  htmlFor={`${team.id}-team-checkbox`}
                                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  {team.name}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={async () => {
                          await updatePreferences({
                            userPreferences: {
                              games: selectedGames,
                              teams: selectedTeams,
                            },
                          });
                          closeModal();
                        }}
                        className="w-full bg-purple-400 rounded-lg py-2 mt-4 text-white hover:bg-purple-600"
                      >
                        Save preferences
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default UserPreferences;
