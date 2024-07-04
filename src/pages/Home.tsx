import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import Loading from "../components/Loading";
import { HymnsApi, Hymns } from "../utils/hymnsApi";

function Home() {
  const [hymns, setHymns] = useState<Hymns>();

  useEffect(() => {
    async function fetchHymns() {
      const hymns = await HymnsApi.getHymns();
      setHymns(hymns);
    }

    fetchHymns();
  }, []);

  if (!hymns) {
    return <Loading />;
  }

  return (
    <Row>
      <Col>
        <h1>Harpa Cristã</h1>
        <Row>
          <Col>
            <ListGroup>
              {hymns?.hymns.map((hymn) => (
                <ListGroup.Item key={hymn.number}>
                  <Link to={`/hymn/${hymn.number}`} className="btn text-dark">
                    <strong>{hymn.number}</strong> - {hymn.title}
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            {(hymns?.currentPage as number) > 1 && (
              <Button
                onClick={async () =>
                  setHymns(await HymnsApi.getHymns(hymns!.currentPage - 1))
                }
                variant="outline-dark"
              >
                Anterior
              </Button>
            )}
          </Col>
          <Col className="text-end">
            {(hymns?.currentPage as number) < (hymns?.totalPages as number) && (
              <Button
                onClick={async () =>
                  setHymns(await HymnsApi.getHymns(hymns!.currentPage + 1))
                }
                variant="outline-dark"
              >
                Próximo
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
