import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Element } from "react-scroll";
import { Row, Col, Button, Badge } from "react-bootstrap";
import Loading from "../components/Loading";
import { HymnsApi, HymnResponse } from "../utils/hymnsApi";

function Hymn() {
  const { number } = useParams();
  const [hymn, setHymn] = useState<HymnResponse | null>(null);

  useEffect(() => {
    async function fetchHymn() {
      const hymnNumber = number ? Number(number) : null;
      const fetchedHymn = hymnNumber
        ? await HymnsApi.getHymn(hymnNumber)
        : await HymnsApi.getRandomHymn();
      setHymn(fetchedHymn);
    }

    fetchHymn();
  }, [number]);

  if (!hymn) {
    return <Loading />;
  }

  return (
    <>
      {hymn && (
        <Element name="hymn">
          <Row className="mb-4">
            <Col>
              {hymn.prevHymn && (
                <Link to={`/hymn/${hymn.prevHymn?.number}`}>
                  <Button variant="outline-dark">
                    {hymn.prevHymn?.number} - {hymn.prevHymn?.title}
                  </Button>
                </Link>
              )}
            </Col>
            <Col className="text-end">
              {hymn.nextHymn && (
                <Link to={`/hymn/${hymn.nextHymn?.number}`}>
                  <Button variant="outline-dark">
                    {hymn.nextHymn?.number} - {hymn.nextHymn?.title}
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
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
              <Col
                dangerouslySetInnerHTML={{
                  __html: lyrics.replace(/\n/g, "<br />"),
                }}
              />
            </Row>
          ))}
        </Element>
      )}
    </>
  );
}

export default Hymn;
