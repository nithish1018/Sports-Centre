import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { useEffect, useState } from "react";
import { Waveform } from "@uiball/loaders";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

type Team = {
  id: number;
  name: string;
  plays?: string;
};
type MatchDetails = {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  sportName: string;
  isRunning: boolean;
  location: string;
  story: string;
  teams: Team[];
  score: any;
  playingTeam: number;
};
const MatchModal = () => {
  const [match, setMatch] = useState<MatchDetails | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const { matchID } = useParams();
  const navigate = useNavigate();

  const fetchMatch = () => {
    fetch(`${API_ENDPOINT}/matches/${matchID}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data);
        setIsOpen(true);
      });
  };

  useEffect(() => {
    fetchMatch();
  }, []);
  function onClose() {
    navigate("../../matches");
  }

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <div className="rounded">
            <div className="bg-black rounded">
              <ModalHeader>
                <div className="text-2xl rounded font-mono px-1 font-semibold"></div>
                <div className="flex text-white gap-1">
                  {match?.teams[0]?.name}
                  <h1> VS </h1>
                  {match?.teams[1]?.name}
                </div>
                <div className="my-2">
                  <div className="flex text-white gap-2 items-center justify-between">
                    <p className="font-bold text-white text-lg">Scores</p>
                    <button
                      onClick={fetchMatch}
                      className="flex items-center text-sm gap-1"
                    >
                      <ArrowPathIcon className="text-white w-4 h-4" />
                      <span>Refresh</span>
                    </button>
                  </div>
                  <div className="ml-4 ">
                    <div className="flex text-white items-center gap-2">
                      <div>
                        <span className=" text-white font-semibold">
                          {match?.teams[0].name} -{"  "}
                        </span>
                        {match?.score[match?.teams[0].name]}
                      </div>
                    </div>
                    <div className="flex text-white items-center gap-2">
                      <div className="text-white">
                        <span className=" text-white font-semibold">
                          {match?.teams[1].name} -{"  "}
                        </span>
                        {match?.score[match?.teams[1].name]}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-justify text-xs text-white flex">
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
                  {match?.location}{" "}
                </div>
                <div className="flex justify-between items-center mt-1 mb-3 gap-6 ">
                  {match?.isRunning ? (
                    <div className="flex gap-2 text-green-600">
                      <Waveform
                        size={20}
                        lineWeight={3.5}
                        speed={1}
                        color="purple"
                      />

                      <p className=" bg-green-200 text-xs rounded font-semibold px-2 animate-bounce">
                        Running
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-200">
                      <div className="flex items-center text-sm gap-1">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <p>
                          {match?.startsAt &&
                            new Date(match.startsAt).toDateString()}
                        </p>
                      </div>
                      <p>to</p>
                      <p className="text-sm">
                        {match?.startsAt &&
                          new Date(match.startsAt).toDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </ModalHeader>
            </div>
            <ModalCloseButton color={"white"} />
            <ModalBody>
              <div className="mt-4 bg-white -m-6 p-6 text-black">
                <p className="font-bold text-lg">Story</p>
                <p>{match?.story}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MatchModal;
