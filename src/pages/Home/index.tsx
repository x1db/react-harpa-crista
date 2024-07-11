import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { HymnsApi, Hymns } from "../../utils/hymnsApi";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

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
        <ListGroup className="my-4">
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
        <Pagination
          currentPage={hymns.currentPage}
          totalPages={hymns.totalPages}
          onPageChange={(page) => {
            HymnsApi.getHymns(page).then(setHymns);
          }}
        />
      </Col>
    </Row>
  );
}

export default Home;
