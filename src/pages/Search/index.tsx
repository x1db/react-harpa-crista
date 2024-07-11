import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, ListGroup, Badge } from "react-bootstrap";
import { HymnsApi, Hymns } from "../../utils/hymnsApi";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

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
        <ListGroup className="my-4">
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
        <Pagination
          currentPage={hymns.currentPage}
          totalPages={hymns.totalPages}
          onPageChange={(page) => {
            HymnsApi.searchHymns(query as any, type as any, page).then(
              setHymns
            );
          }}
        />
      </Col>
    </Row>
  );
}

export default Search;
