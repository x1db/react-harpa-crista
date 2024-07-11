import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, ListGroup, Badge } from "react-bootstrap";
import Loading from "../../components/Loading";
import { HymnsApi, Hymns } from "../../utils/hymnsApi";

function Search() {
  const navigate = useNavigate();
  const { type, query } = useParams();
  const [hymns, setHymns] = useState<Hymns | null>();

  useEffect(() => {
    if (
      !type ||
      !query ||
      (type !== "title" && type !== "number" && type !== "verse")
    ) {
      navigate("/");
      return;
    }

    HymnsApi.searchHymns(query as any, type as any).then(setHymns);

    return () => {
      setHymns(null);
    };
  }, [navigate, query, type]);

  if (!hymns) {
    return <Loading />;
  }

  return (
    <Row>
      <Col>
        <h1>
          Resultados para <Badge bg="dark">{query}</Badge>
        </h1>
        <Row>
          <Col>
            <ListGroup>
              {hymns?.hymns &&
                hymns?.hymns.map((hymn) => (
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
                  setHymns(
                    await HymnsApi.searchHymns(
                      query as any,
                      type as any,
                      hymns!.prevPage as number
                    )
                  )
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
                  setHymns(
                    await HymnsApi.searchHymns(
                      query as any,
                      type as any,
                      hymns!.nextPage as number
                    )
                  )
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

export default Search;
