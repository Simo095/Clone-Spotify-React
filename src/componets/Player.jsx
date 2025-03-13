import {
  Col,
  Container,
  Form,
  Image,
  Placeholder,
  ProgressBar,
  Row,
} from "react-bootstrap";
import next from "../asset/Next.png";
import pausea from "../asset/Pause.png";
import previous from "../asset/Previous.png";
import shuffle from "../asset/Shuffle.png";
import playa from "../asset/Play.png";
import repeat from "../asset/Repeat.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addSong,
  getPlayerAction,
  addPlayerTrackAction,
} from "../redux/actions";
import { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const Player = () => {
  const idTracce = useSelector((state) => state.song.idTraccia);
  const idAlbum = useSelector((state) => state.song.idAlbum);
  const album = useSelector((state) => state.song.album);
  const tracciaFiltrata = useSelector((state) => state.song.tracciaFiltrata);
  const song = useSelector((state) => state.song.song);
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumb, setThumb] = useState(false);
  const [screenX, setSreenX] = useState(0);
  const playerRef = useRef(null);
  const [volume, setVolume] = useState(1);

  const playSong = () => {
    if (isPlaying && playerRef.current) {
      playerRef.current.audioEl.current.pause();
    } else if (playerRef.current) {
      playerRef.current.audioEl.current.play();
    }
  };

  const forward = (tracciaAttuale) => {
    if (album && album.data) {
      album.data.filter((tracce, i) =>
        tracce.id === tracciaAttuale && album.data[i + 1]
          ? (dispatch(addSong(album.data[i + 1].preview)),
            dispatch(addPlayerTrackAction(album.data[i + 1].id)))
          : null
      );
    }
  };

  const backward = (tracciaAttuale) => {
    if (album && album.data) {
      album.data.filter((tracce, i) =>
        tracce.id === tracciaAttuale && album.data[i - 1]
          ? (dispatch(addSong(album.data[i - 1].preview)),
            dispatch(addPlayerTrackAction(album.data[i - 1].id)))
          : null
      );
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (playerRef.current && playerRef.current.audioEl.current) {
      playerRef.current.audioEl.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (idAlbum && idTracce) {
      dispatch(getPlayerAction(idAlbum, idTracce));
    }
  }, [idAlbum, idTracce, dispatch]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 580);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 580);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderPlayerContent = () => {
    if (idTracce && tracciaFiltrata && tracciaFiltrata.length > 0) {
      const track = tracciaFiltrata[0];
      return (
        <Container className="d-flex gap-4 p-0">
          <Image
            src={track.album.cover}
            width={60}
            height={60}
            className="imgPlay"
          />
          <div>
            <p className="titlePlayer">
              {track.title.length < 20
                ? track.title
                : track.title.substring(0, 20)}
            </p>
            <p className="titlePlayer">
              {track.album.title.length < 20
                ? track.album.title
                : track.album.title.substring(0, 20)}
            </p>
            <p className="titlePlayer">{track.artist.name}</p>
          </div>
        </Container>
      );
    } else {
      return (
        <Container fluid className="d-flex flex-column p-0 m-0">
          <Placeholder as="div" animation="glow">
            <Placeholder xs={3} style={{ width: "60px", height: "60px" }} />
          </Placeholder>
          <div>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
          </div>
        </Container>
      );
    }
  };

  return (
    <Container fluid className="fixed-bottom bg-container pt-1">
      {isSmallScreen ? (
        <Row className="d-flex ">
          <Col
            xs={2}
            className="d-flex justify-content-center align-items-center"
          >
            {renderPlayerContent()}
          </Col>
          <Col
            xs={6}
            className="d-flex flex-column justify-content-center align-items-center m-0 p-0"
          >
            <Container fluid className="m-0 p-0 d-flex justify-content-evenly">
              <Image src={shuffle} style={{ width: "15px", height: "15px" }} />
              <Image
                src={previous}
                style={{ width: "15px", height: "15px", cursor: "pointer" }}
                onClick={() => {
                  setIsPlaying(false);
                  if (tracciaFiltrata && tracciaFiltrata.length > 0) {
                    backward(tracciaFiltrata[0].id);
                  }
                }}
              />
              {isPlaying ? (
                <Image
                  src={pausea}
                  style={{ width: "15px", height: "15px", cursor: "pointer" }}
                  onClick={playSong}
                />
              ) : (
                <Image
                  src={playa}
                  style={{ width: "15px", height: "15px", cursor: "pointer" }}
                  onClick={playSong}
                />
              )}
              <Image
                src={next}
                style={{ width: "15px", height: "15px", cursor: "pointer" }}
                onClick={() => {
                  setIsPlaying(false);
                  if (tracciaFiltrata && tracciaFiltrata.length > 0) {
                    forward(tracciaFiltrata[0].id);
                  }
                }}
              />
              <Image src={repeat} style={{ width: "15px", height: "15px" }} />
            </Container>
            <Container className="mt-2">
              <Row className="justify-content-center playBar">
                <Col xs={10}>
                  <ProgressBar
                    className="progressbar"
                    variant="light"
                    min={0}
                    max={duration}
                    now={currentTime}
                    draggable={false}
                    onClick={() => {}}
                    onMouseDown={async (e) => {
                      if (playerRef.current) {
                        let x = (e.pageX - screenX) * 0.407;
                        setSreenX(e.pageX);
                        setThumb(true);
                        await setCurrentTime(currentTime - x);
                      }
                    }}
                    onMouseMove={(e) => {
                      if (thumb) {
                        setCurrentTime((e.pageX - screenX) * 0.407);
                      }
                    }}
                    onMouseUp={() => {
                      if (thumb) {
                        setSreenX(0);
                        setThumb(false);
                      }
                    }}
                  />
                </Col>
                <ReactAudioPlayer
                  src={song}
                  ref={playerRef}
                  listenInterval={50}
                  crossOrigin="anonymous"
                  onListen={(e) => {
                    setCurrentTime(e);
                  }}
                  onLoadedMetadata={() => {
                    if (playerRef.current) {
                      setDuration(playerRef.current.audioEl.current.duration);
                    }
                  }}
                  onAbort={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }}
                  onEnded={() => {
                    setCurrentTime(0);
                    setIsPlaying(false);
                  }}
                  onPlay={() => {
                    setIsPlaying(true);
                  }}
                  onPause={() => {
                    setIsPlaying(false);
                  }}
                />
              </Row>
            </Container>
          </Col>

          <Col
            xs={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Range
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              style={{ width: "80%" }}
            />
          </Col>
        </Row>
      ) : (
        <Row className="d-flex">
          <Col xs={0} sm={0} md={0} lg={3}></Col>
          <Col sm={4} lg={3} className=" ms-4 ms-lg-0 p-0">
            {renderPlayerContent()}
          </Col>
          <Col sm={5} lg={4} className="playerControls">
            <Row className="d-flex flex-column mx-auto flex-grow-1 mt-3">
              <Col className="d-flex justify-content-center gap-3">
                <Image src={shuffle} />
                <Image
                  src={previous}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsPlaying(false);
                    if (tracciaFiltrata && tracciaFiltrata.length > 0) {
                      backward(tracciaFiltrata[0].id);
                    }
                  }}
                />
                {isPlaying ? (
                  <Image
                    src={pausea}
                    style={{ cursor: "pointer" }}
                    onClick={playSong}
                  />
                ) : (
                  <Image
                    src={playa}
                    style={{ cursor: "pointer" }}
                    onClick={playSong}
                  />
                )}
                <Image
                  src={next}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsPlaying(false);
                    if (tracciaFiltrata && tracciaFiltrata.length > 0) {
                      forward(tracciaFiltrata[0].id);
                    }
                  }}
                />
                <Image src={repeat} />
              </Col>
              <Col className="mt-2">
                {" "}
                {/* Aggiunto: mt-2 per il margine superiore */}
                <Row className="justify-content-center playBar">
                  {" "}
                  {/* Modificato: justify-content-center */}
                  <Col xs={12} md={8}>
                    {" "}
                    {/* Modificato: xs={12} e md={8} per il controllo della larghezza */}
                    <ProgressBar
                      className="progressbar"
                      variant="light"
                      min={0}
                      max={duration}
                      now={currentTime}
                      draggable={false}
                      onClick={() => {}}
                      onMouseDown={async (e) => {
                        if (playerRef.current) {
                          let x = (e.pageX - screenX) * 0.407;
                          setSreenX(e.pageX);
                          setThumb(true);
                          await setCurrentTime(currentTime - x);
                        }
                      }}
                      onMouseMove={(e) => {
                        if (thumb) {
                          setCurrentTime((e.pageX - screenX) * 0.407);
                        }
                      }}
                      onMouseUp={() => {
                        if (thumb) {
                          setSreenX(0);
                          setThumb(false);
                        }
                      }}
                    />
                  </Col>
                  <ReactAudioPlayer
                    src={song}
                    ref={playerRef}
                    listenInterval={50}
                    crossOrigin="anonymous"
                    onListen={(e) => {
                      setCurrentTime(e);
                    }}
                    onLoadedMetadata={() => {
                      if (playerRef.current) {
                        setDuration(playerRef.current.audioEl.current.duration);
                      }
                    }}
                    onAbort={() => {
                      setIsPlaying(false);
                      setCurrentTime(0);
                    }}
                    onEnded={() => {
                      setCurrentTime(0);
                      setIsPlaying(false);
                    }}
                    onPlay={() => {
                      setIsPlaying(true);
                    }}
                    onPause={() => {
                      setIsPlaying(false);
                    }}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col
            sm={2}
            lg={2}
            className="d-flex align-items-center justify-content-center"
          >
            <Form.Range
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Player;
