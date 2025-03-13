import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../asset/Spotify_Logo.png";
import { useState } from "react";
import { ImHome3 } from "react-icons/im";
import { BsBookFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addAlbumSearch } from "../redux/actions";

const Headerbar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const risposta = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JhNGZjOThlY2E4ZTAwMTU4ODQzZTciLCJpYXQiOjE3NDAyNjMzNjksImV4cCI6MTc0MTQ3Mjk2OX0.2SSQilxWXdxZm14mkffH9bF7o_e3TUtxBTd8r3WA_n8",
          },
        }
      );
      if (risposta.ok) {
        const album = await risposta.json();
        dispatch(addAlbumSearch(album));
        navigate("/Clone-Spotify-React/search");
        handleClose();
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Navbar
      id="headerbar"
      expand="md"
      className="bg-navbar fixed-top bg-black d-none"
    >
      <Container fluid className="m-0 p-0">
        <Navbar.Brand className="m-3">
          <Image src={logo} width={131} height={40} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container fluid className="m-0 p-0 d-flex">
            <Nav className="d-flex flex-grow-1">
              <Nav.Link
                className="text-white d-flex justify-content-center align-items-center"
                href="/Clone-Spotify-React"
              >
                <ImHome3 size={20} className="me-2" /> Home
              </Nav.Link>
              <Nav.Link
                style={{ color: "gray" }}
                className="d-flex justify-content-center align-items-center"
              >
                <BsBookFill size={20} className="me-2" /> Library
              </Nav.Link>
            </Nav>
            <Nav className="d-flex justify-content-center align-items-center">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs="8" className="p-0">
                    <Form.Control
                      type="search"
                      value={query}
                      onChange={handleChange}
                      placeholder="Search"
                      required
                      className="form-mio"
                    />
                  </Col>
                  <Col xs="3" className="p-0">
                    <Button
                      variant="secondary"
                      className="btn-mio"
                      type="submit"
                    >
                      Go
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Nav>
            <Nav className="d-flex justify-content-center align-items-center me-2">
              <Button
                style={{ width: "80px", height: "30px" }}
                className="signup-btn p-0 m-0"
              >
                Sign Up
              </Button>
              <Button
                style={{ width: "80px", height: "30px" }}
                className="login-btn p-0 m-0"
              >
                Login
              </Button>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Headerbar;
