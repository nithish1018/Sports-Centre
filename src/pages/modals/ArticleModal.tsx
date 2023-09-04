import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,

} from "@chakra-ui/react";


type Sports = {
  id: number;
  name: string;
};
type Teams = {
  id: number;
  name: string;
};

type Articles = {
  id: number;
  title: string;
  thumbnail: string;
  sport: Sports;
  date: string;
  content: string;
  summary: string;
  teams: Teams[];
};

const ArticleModal = () => {
  const [article, setArticle] = useState<Articles | undefined>(undefined);
  const { articleID } = useParams();
  const navigate = useNavigate();

  const { isOpen } = useDisclosure({ defaultIsOpen: true });

  function onClose() {
    navigate("../../matches");
  }

  const fetcharticle = () => {
    fetch(`${API_ENDPOINT}/articles/${articleID}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
      });
  };

  useEffect(() => {
    fetcharticle();
  }, []);

  return (
    <>
      <Modal onClose={onClose} size={"full"} isOpen={isOpen} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <div>
            <div className="bg-black">
              <ModalHeader >
                <div className="text-2xl rounded font-mono px-1 font-semibold"></div>
                <div className="text-xl text-white font-extrabold">
                  {article?.title}
                </div>
              {article?.teams[0]? ( <div className="flex text-white gap-1">
                  {article?.teams[0]?.name}
                  <h1> VS </h1>
                  {article?.teams[1]?.name}
                </div>
               ):("")}
                <div className="flex gap-2" >
                  <CalendarDaysIcon className="w-4 h-4 text-white" />
                  <div className="text-sm bg-purple-600 rounded px-2">
                    {article?.date.split('T')[0]}
                  </div>
                </div>
              </ModalHeader>
            </div>
            <ModalCloseButton color={"white"}/>
            <ModalBody> 
              <div >
                <span className="text-xl bg-purple-300 rounded px-2 shrink font-semibold">Summary:</span>
              <div className="italic py-2"> " {article?.summary} " </div>
              </div>
              <br/>
              <div className="text-2xl font-semibold">Story: </div>
              {article?.content}

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

export default ArticleModal;
