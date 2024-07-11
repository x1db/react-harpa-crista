import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import Loading from "../../components/Loading";
import { HymnsApi, Hymns } from "../../utils/hymnsApi";

function Home() {
  const navigate = useNavigate();
  const [hymns, setHymns] = useState<Hymns | null>();

  useEffect(() => {
    HymnsApi.getHymns().then(setHymns);

    return () => {
      setHymns(null);
    };
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
                  <Button
                    onClick={() => navigate(`/hymn/${hymn.number}`)}
                    variant="link"
                    className="text-decoration-none"
                  >
                    {hymn.number} - {hymn.title}
                  </Button>
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
                  setHymns(await HymnsApi.getHymns(hymns!.prevPage as number))
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
                  setHymns(await HymnsApi.getHymns(hymns!.nextPage as number))
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
