import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Artist = () => {
  const params = useParams();
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState(null);

  const tracksFetch = async () => {
    try {
      const risposta = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/artist/" + params.id,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JhNGZjOThlY2E4ZTAwMTU4ODQzZTciLCJpYXQiOjE3NDAyNjMzNjksImV4cCI6MTc0MTQ3Mjk2OX0.2SSQilxWXdxZm14mkffH9bF7o_e3TUtxBTd8r3WA_n8",
          },
        }
      );

      const tracksResponse = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
          params.artist,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JhNGZjOThlY2E4ZTAwMTU4ODQzZTciLCJpYXQiOjE3NDAyNjMzNjksImV4cCI6MTc0MTQ3Mjk2OX0.2SSQilxWXdxZm14mkffH9bF7o_e3TUtxBTd8r3WA_n8",
          },
        }
      );

      if (tracksResponse.ok) {
        let tracklist = await tracksResponse.json();
        setTracks(tracklist.data);
      } else {
        console.log("error");
      }

      if (risposta.ok) {
        const artist = await risposta.json();
        setArtist(artist);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tracksFetch();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={9} className="offset-md-3 mainPage mt-3">
          <Row>
            <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
              <Link>TRENDING</Link>
              <Link>PODCAST</Link>
              <Link>MOODS AND GENRES</Link>
              <Link>NEW RELEASES</Link>
              <Link>DISCOVER</Link>
            </Col>
          </Row>

          <Row>
            <Col>
              <div>
                {artist ? (
                  <Row className="d-flex flex-column">
                    <Col>
                      <h2 className="titleMain">{artist.name}</h2>
                    </Col>
                    <Col id="followers">{artist.nb_fan} followers</Col>
                  </Row>
                ) : (
                  <Container className="d-flex h-100 justify-content-center align-items-center">
                    <Spinner animation="border" variant="success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Container>
                )}
              </div>
              <div
                className="d-flex justify-content-center"
                id="button-container"
              >
                <button
                  className="btn btn-success mr-2 mainButton"
                  id="playButton"
                >
                  PLAY
                </button>
                <button
                  className="btn btn-outline-light mainButton"
                  id="followButton"
                >
                  FOLLOW
                </button>
              </div>
            </Col>
          </Row>
          <Row className="imgLinks">
            <Col>
              <h2 className="text-white font-weight-bold">Tracks</h2>
              <div className="pt-5 mb-5">
                <Row className="row " id="apiLoaded">
                  {tracks ? (
                    tracks.map((track) => (
                      <Col
                        sm={4}
                        md={4}
                        lg={3}
                        className="d-flex flex-column text-center mb-5"
                        key={track.id}
                      >
                        <Link to={`albumPage/${track.album.id}/`}>
                          <Image src={track.album.cover} />
                        </Link>
                        <Link to={"/"}>
                          <p className="m-0">Track: {track.title}</p>
                        </Link>
                        <Link
                          className="d-block"
                          to={`albumPage/${track.album.id}/`}
                        >
                          <p>Album:{track.album.title}</p>
                        </Link>
                      </Col>
                    ))
                  ) : (
                    <Container className="d-flex h-100 justify-content-center align-items-center">
                      <Spinner
                        animation="border"
                        variant="success"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </Container>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Artist;
