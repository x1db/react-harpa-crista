import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, ButtonGroup, Badge } from "react-bootstrap";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import Loading from "../../components/Loading";
import { HymnsApi, HymnResponse } from "../../utils/hymnsApi";
import {
  faArrowLeft,
  faArrowRight,
  faRandom,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

function Hymn() {
  const { number } = useParams();
  const navigate = useNavigate();
  const [hymn, setHymn] = useState<HymnResponse | null>(null);

  const navigateToHymn = (number: number) => {
    setHymn(null);
    navigate(`/hymn/${number}`);
  };

  const randomHymn = useCallback(() => {
    setHymn(null);
    HymnsApi.getRandomHymn().then(({ hymn }) => {
      navigate(`/hymn/${hymn.number}`);
    });
  }, [navigate]);

  useEffect(() => {
    if (!number) {
      return randomHymn();
    }

    HymnsApi.getHymn(Number(number)).then(setHymn);

    return () => {
      setHymn(null);
    };
  }, [number, randomHymn]);

  if (!hymn) {
    return <Loading />;
  }

  return (
    <>
      {hymn && (
        <Row className="flex-column">
          <Col className="text-center mb-3">
            <ButtonGroup>
              {hymn.prevHymn && (
                <Button
                  variant="outline-dark"
                  onClick={() => navigateToHymn(hymn.prevHymn!.number)}
                  title={hymn.prevHymn?.title}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
              )}
              <Button
                variant="outline-dark"
                onClick={() => {
                  navigate("/");
                }}
                title="Voltar para a página inicial"
              >
                <FontAwesomeIcon icon={faHome} />
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  randomHymn();
                }}
                title="Hino aleatório"
              >
                <FontAwesomeIcon icon={faRandom} />
              </Button>
              {hymn.nextHymn && (
                <Button
                  variant="outline-dark"
                  onClick={() => navigateToHymn(hymn.nextHymn!.number)}
                  title={hymn.nextHymn?.title}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              )}
            </ButtonGroup>
          </Col>
          <Col>
            <h1>
              <Badge bg="dark">{hymn.hymn.number}</Badge> {hymn.hymn.title}
            </h1>
            <p>{hymn.hymn.author}</p>
            {hymn.hymn.verses.map(({ sequence, lyrics, chorus }) => (
              <Row
                key={sequence}
                className={`mb-2 ${chorus ? "chorus" : "verse"}`}
              >
                <Col className="col-auto">{sequence}</Col>
                <Col>
                  <Markdown remarkPlugins={[remarkBreaks]}>{lyrics}</Markdown>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      )}
    </>
  );
}

export default Hymn;
