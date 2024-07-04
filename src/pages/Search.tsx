import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, ListGroup, Badge } from "react-bootstrap";
import Loading from "../components/Loading";
import { HymnsApi, Hymns } from "../utils/hymnsApi";

function Search() {
  const navigate = useNavigate();
  const { type, query } = useParams();
  const [hymns, setHymns] = useState<Hymns>();

  useEffect(() => {
    async function fetchHymns() {
      if (
        !type ||
        !query ||
        (type !== "title" && type !== "number" && type !== "verse")
      ) {
        navigate("/");
        return;
      }

      const hymns = await HymnsApi.searchHymns(query as any, type as any);
      setHymns(hymns);
    }

    fetchHymns();
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
                  setHymns(
                    await HymnsApi.searchHymns(
                      query as any,
                      type as any,
                      hymns!.currentPage - 1
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
                      hymns!.currentPage + 1
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
