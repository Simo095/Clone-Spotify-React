import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = ({ isSidebarOpen }) => {
  let rockArtists = [
    "queen",
    "u2",
    "thepolice",
    "eagles",
    "thedoors",
    "oasis",
    "thewho",
    "bonjovi",
    "ledzeppelin",
    "pinkfloyd",
    "cansas",
    "boston",
  ];
  let popArtists = [
    "maroon5",
    "coldplay",
    "onerepublic",
    "jamesblunt",
    "katyperry",
    "arianagrande",
    "ladygaga",
    "billieelish",
    "rihanna",
    "harrystyles",
  ];
  let hipHopArtists = [
    "eminem",
    "snoopdogg",
    "lilwayne",
    "drake",
    "kanyewest",
    "wutang",
  ];
  const [rockSongInfo, setRockSongInfo] = useState([]);
  const [popSongInfo, setPopSongInfo] = useState([]);
  const [hiphopSongInfo, setHiphopSongInfo] = useState([]);

  const handleArtist = async (artistName, setSetter) => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
          artistName,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JhNGZjOThlY2E4ZTAwMTU4ODQzZTciLCJpYXQiOjE3NDAyNjMzNjksImV4cCI6MTc0MTQ3Mjk2OX0.2SSQilxWXdxZm14mkffH9bF7o_e3TUtxBTd8r3WA_n8",
          },
        }
      );
      if (response.ok) {
        let result = await response.json();
        let songInfo = result.data;
        setSetter((prevState) => [...prevState, songInfo[0]]);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onload = async () => {
    let rockRandomArtists = [];
    let popRandomArtists = [];
    let hipHopRandomArtists = [];

    while (rockRandomArtists.length < 4) {
      let artist = rockArtists[Math.floor(Math.random() * rockArtists.length)];
      if (!rockRandomArtists.includes(artist)) {
        rockRandomArtists.push(artist);
      }
    }

    while (popRandomArtists.length < 4) {
      let artist = popArtists[Math.floor(Math.random() * popArtists.length)];
      if (!popRandomArtists.includes(artist)) {
        popRandomArtists.push(artist);
      }
    }

    while (hipHopRandomArtists.length < 4) {
      let artist =
        hipHopArtists[Math.floor(Math.random() * hipHopArtists.length)];
      if (!hipHopRandomArtists.includes(artist)) {
        hipHopRandomArtists.push(artist);
      }
    }
    for (let j = 0; j < rockRandomArtists.length; j++) {
      await handleArtist(rockRandomArtists[j], setRockSongInfo);
    }
    for (let j = 0; j < popRandomArtists.length; j++) {
      await handleArtist(popRandomArtists[j], setPopSongInfo);
    }
    for (let j = 0; j < hipHopRandomArtists.length; j++) {
      await handleArtist(hipHopRandomArtists[j], setHiphopSongInfo);
    }
  };

  useEffect(() => {
    onload();
  }, []);

  return (
    <Container fluid className="text-center">
      <Row className="">
        <Col
          md={isSidebarOpen ? 9 : 12}
          className={`mainPage mt-3 ${isSidebarOpen ? "offset-md-3" : ""}`}
        >
          <Row>
            <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
              <Link>TRENDING</Link>
              <Link>PODCAST</Link>
              <Link>MOODS AND GENRES</Link>
              <Link>NEW RELEASES</Link>
              <Link>DISCOVER</Link>
            </Col>
          </Row>

          <h2 className="pt-5">Rock Classics</h2>
          {rockSongInfo ? (
            <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
              {rockSongInfo.map((track) => (
                <Col key={track.id} className="d-flex flex-column">
                  <Link to={`albumPage/${track.album.id}`} className="mb-2">
                    <Image fluid src={track.album.cover_medium} />
                  </Link>
                  <div className="d-flex flex-column">
                    <Link
                      to={`albumPage/${track.album.id}`}
                      className="text-truncate mb-1"
                    >
                      Album: {track.album.title}
                    </Link>
                    <Link
                      className="text-truncate"
                      to={`artistPage/${track.artist.id}/${track.artist.name}`}
                    >
                      Artist: {track.artist.name}
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <Container className="d-flex justify-content-center">
              <Spinner animation="border" variant="success" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Container>
          )}

          <h2 className="pt-5">Pop Culture</h2>
          {popSongInfo ? (
            <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
              {popSongInfo.map((track) => (
                <Col key={track.id} className="d-flex flex-column">
                  <Link to={`albumPage/${track.album.id}`} className="mb-2">
                    <Image fluid src={track.album.cover_medium} />
                  </Link>
                  <div className="d-flex flex-column">
                    <Link
                      to={`albumPage/${track.album.id}`}
                      className="text-truncate mb-1"
                    >
                      Album: {track.album.title}
                    </Link>
                    <Link
                      className="text-truncate"
                      to={`artistPage/${track.artist.id}/${track.artist.name}`}
                    >
                      Artist: {track.artist.name}
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <Container className="d-flex justify-content-center">
              <Spinner animation="border" variant="success" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Container>
          )}

          <h2 className="pt-5">#HipHop</h2>
          {hiphopSongInfo ? (
            <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
              {hiphopSongInfo.map((track) => (
                <Col key={track.id} className="d-flex flex-column">
                  <Link to={`albumPage/${track.album.id}`} className="mb-2">
                    <Image fluid src={track.album.cover_medium} />
                  </Link>
                  <div className="d-flex flex-column">
                    <Link
                      to={`albumPage/${track.album.id}`}
                      className="text-truncate mb-1"
                    >
                      Album: {track.album.title}
                    </Link>
                    <Link
                      className="text-truncate"
                      to={`artistPage/${track.artist.id}/${track.artist.name}`}
                    >
                      Artist: {track.artist.name}
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <Container className="d-flex justify-content-center">
              <Spinner animation="border" variant="success" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
