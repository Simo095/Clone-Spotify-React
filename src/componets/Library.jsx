import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Library = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            sm={8}
            className="offset-md-3 mainPage mt-3">
            <Row>
              <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
                <Link>TRENDING</Link>
                <Link>PODCAST</Link>
                <Link>MOODS AND GENRES</Link>
                <Link>NEW RELEASES</Link>
                <Link>DISCOVER</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Library;
