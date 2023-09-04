// import { CalendarDaysIcon } from "@heroicons/react/24/outline";
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
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <div className="bg-white rounded">
            <ModalHeader>{article?.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{article?.content}</ModalBody>
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
