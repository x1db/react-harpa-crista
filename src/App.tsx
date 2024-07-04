import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Home from "./pages/Home";
import Hymn from "./pages/Hymn";
import Search from "./pages/Search";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:type/:query" element={<Search />} />
          <Route path="/hymn/:number" element={<Hymn />} />
          <Route path="/random" element={<Hymn />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
