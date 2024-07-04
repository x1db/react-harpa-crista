import { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"title" | "number" | "verse">("number");

  const handleSearch = () => {
    if (search) {
      navigate(`/search/${type}/${search}`);
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.id as "title" | "number" | "verse");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          Harpa Cristã
        </Link>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            <Form.Group className="d-flex align-items-center gap-2">
              <Form.Control
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <Button variant="outline-light" onClick={handleSearch}>
                Buscar
              </Button>
            </Form.Group>
            <Row className="ms-2">
              <Col className="d-flex align-items-center gap-2">
                <span className="text-light">Buscar por:</span>
                <Form.Check
                  type="radio"
                  name="type"
                  id="number"
                  label="Número"
                  className="text-light"
                  checked={type === "number"}
                  onChange={handleTypeChange}
                />
                <Form.Check
                  type="radio"
                  name="type"
                  id="title"
                  label="Título"
                  className="text-light"
                  checked={type === "title"}
                  onChange={handleTypeChange}
                />
                <Form.Check
                  type="radio"
                  name="type"
                  id="verse"
                  label="Trecho"
                  className="text-light"
                  checked={type === "verse"}
                  onChange={handleTypeChange}
                />
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
