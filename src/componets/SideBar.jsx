import { Button, Col, Container, Form, Image, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../asset/Spotify_Logo.png";
import { useState } from "react";
import { ImHome3 } from "react-icons/im";
import { BsBookFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addAlbumSearch } from "../redux/actions";
const SideBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(query, "query");

    let headers = new Headers({
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "c74a0a086emshf55ffb8dbdcb59ap17a486jsnb83bb4d3e387"
    });
    try {
      const risposta = await fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query, {
        method: "GET",
        headers
      });
      if (risposta.ok) {
        const album = await risposta.json();
        dispatch(addAlbumSearch(album));
        navigate("/search");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = e => {
    setQuery(e.target.value);
  };
  return (
    <Navbar
      id="sidebar"
      expand="md"
      className="navbar-white bg-navbar fixed-left justify-content-between flex-grow-1">
      <Container className="d-flex flex-column flex-grow-1 align-items-start m-2">
        <Link to={"/"}>
          <Image
            src={logo}
            width={131}
            height={40}
            alt="Logo"
            className="m-3"
          />
        </Link>
        <Nav className="mt-3 d-flex flex-column  gap-3">
          <Link
            className="nav-item"
            to={"/"}>
            <Nav.Item>
              <ImHome3 style={{ fontSize: "1.5em", margin: "3px", verticalAlign: "bottom" }}></ImHome3>Home
            </Nav.Item>
          </Link>
          <Link
            className="nav-item"
            to={"/library"}>
            <Nav.Item className="text-white">
              <BsBookFill style={{ fontSize: "1.5em", margin: "3px", verticalAlign: "bottom" }}></BsBookFill>Library
            </Nav.Item>
          </Link>
        </Nav>
        <Nav className="mt-3 d-flex flex-column flex-grow-1 gap-3">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col
                xs="8"
                className="p-0">
                <Form.Control
                  type="search"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search"
                  required
                  className="form-mio"
                />
              </Col>
              <Col
                xs="3"
                className="p-0">
                <Button
                  variant="secondary"
                  className="btn-mio"
                  type="submit">
                  Go
                </Button>
              </Col>
            </Row>
          </Form>
        </Nav>
        <Nav className="nav-btn me-auto d-flex flex-column">
          <Button className="signup-btn">Sign Up</Button>
          <Button className="login-btn">Logn</Button>
          <Link>Cookie policy</Link>
          <Link>Privacy</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default SideBar;
