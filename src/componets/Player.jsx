import { Col, Container, Image, Placeholder, ProgressBar, Row } from "react-bootstrap";
import next from "../asset/Next.png";
import pausea from "../asset/Pause.png";
import previous from "../asset/Previous.png";
import shuffle from "../asset/Shuffle.png";
import playa from "../asset/Play.png";
import repeat from "../asset/Repeat.png";
import { useDispatch, useSelector } from "react-redux";
import { addSong, getPlayerAction, addPlayerTrackAction } from "../redux/actions";
import { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const Player = () => {
  const idTracce = useSelector(state => state.song.idTraccia);
  const idAlbum = useSelector(state => state.song.idAlbum);
  const album = useSelector(state => state.song.album);
  const tracciaFiltrata = useSelector(state => state.song.tracciaFiltrata);
  const song = useSelector(state => state.song.song);
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumb, setThumb] = useState(false);
  const [screenX, setSreenX] = useState(0);
  const [screenY, setSreenY] = useState(0);
  const playerRef = useRef([]);

  const playSong = () => {
    if (isPlaying) {
      playerRef.current.audioEl.current.pause();
    } else {
      playerRef.current.audioEl.current.play();
    }
  };

  const forward = tracciaAttuale => {
    album.data.filter((tracce, i) =>
      tracce.id === tracciaAttuale
        ? (dispatch(addSong(album.data[i + 1].preview)), dispatch(addPlayerTrackAction(album.data[i + 1].id)))
        : console.log("ciao")
    );
  };
  const backward = tracciaAttuale => {
    album.data.filter((tracce, i) =>
      tracce.id === tracciaAttuale
        ? (dispatch(addSong(album.data[i - 1].preview)), dispatch(addPlayerTrackAction(album.data[i - 1].id)))
        : console.log("ciao")
    );
  };

  useEffect(() => {
    dispatch(getPlayerAction(idAlbum, idTracce));
  }, [idAlbum, idTracce]);

  return (
    <Container
      fluid
      className="fixed-bottom bg-container pt-1">
      <Row className="d-flex">
        <Col sm={3}></Col>
        <Col
          sm={3}
          className="p-0">
          {idTracce ? (
            tracciaFiltrata ? (
              <Container className="d-flex gap-4 p-0">
                <Image
                  src={tracciaFiltrata[0].album.cover}
                  width={60}
                  height={60}
                  className="imgPlay"
                />
                <div>
                  <p className="titlePlayer">
                    {tracciaFiltrata[0].title.lenght < 20
                      ? tracciaFiltrata[0].title
                      : tracciaFiltrata[0].title.substring(0, 20)}
                  </p>
                  <p className="titlePlayer">
                    {tracciaFiltrata[0].album.title.lenght < 20
                      ? tracciaFiltrata[0].album.title
                      : tracciaFiltrata[0].album.title.substring(0, 20)}
                  </p>
                  <p className="titlePlayer">{tracciaFiltrata[0].artist.name}</p>
                </div>
              </Container>
            ) : (
              <Placeholder
                as="p"
                animation="glow">
                <Placeholder xs={3} />
              </Placeholder>
            )
          ) : (
            <Placeholder
              as="p"
              animation="glow">
              <Placeholder xs={3} />
            </Placeholder>
          )}
        </Col>
        <Col
          sm={6}
          className="playerControls">
          <Row className="d-flex flex-column mx-auto flex-grow-1 mt-3">
            <Col className="d-flex justify-content-start gap-3 ms-5 ps-4">
              <Image src={shuffle} />
              <Image
                src={previous}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsPlaying(false);
                  backward(tracciaFiltrata[0].id);
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
                  forward(tracciaFiltrata[0].id);
                }}
              />
              <Image src={repeat} />
            </Col>
            <Col>
              <Row
                className="justify-content-start playBar 
              pt-3 pe-5 me-5">
                <Col md={6}>
                  <ProgressBar
                    className="progressbar"
                    variant="light"
                    min={0}
                    max={duration}
                    now={currentTime}
                    draggable={false}
                    onClick={() => {}}
                    onMouseDown={async e => {
                      console.log("down", currentTime, "pageX", e.pageX, "  ", (e.pageX - screenX) * 0.407);
                      console.log(e.pageX);
                      let x = (e.pageX - screenX) * 0.407;
                      setSreenX(e.pageX);
                      setThumb(true);
                      await setCurrentTime(currentTime - x);
                    }}
                    onMouseMove={e => {
                      if (thumb) {
                        console.log("screnx", screenX);
                        console.log("op", (e.pageX - screenX) * 0.407);
                        console.log(currentTime);
                        setCurrentTime((e.pageX - screenX) * 0.407);
                      }
                    }}
                    onMouseUp={e => {
                      if (thumb) {
                        setSreenX(0);
                        setThumb(false);
                      }
                    }}
                    onInput={e => {
                      console.log(e.target);
                      //setCurrentTime(e.target.value);
                      let value = e.target.value;
                      e.target.style.background =
                        "linear-gradient(to right, green 0%, green " +
                        value +
                        "%, #535353 " +
                        value +
                        "%, #535353 100%)";
                    }}
                  />
                </Col>
                {/* <Form.Range
                    min={0}
                    max={100}
                    value={currentTime}
                    style={{ height: "20px" }}
                    onInput={e => {
                      console.log(e.target);
                      setCurrentTime(e.target.value);
                      let value = e.target.value;
                      e.target.style.background =
                        "linear-gradient(to right, green 0%, green " +
                        value +
                        "%, #535353 " +
                        value +
                        "%, #535353 100%)";
                    }}
                    onMouseLeave={e => {
                      let value = e.target.value;
                      e.target.style.background =
                        "linear-gradient(to right, white 0%, white " +
                        value +
                        "%, #535353 " +
                        value +
                        "%, #535353 100%)";
                    }}
                  /> */}
                <ReactAudioPlayer
                  src={song}
                  ref={playerRef}
                  listenInterval={50}
                  crossOrigin="anonymous"
                  onListen={e => {
                    setCurrentTime(e);
                  }}
                  onLoadedMetadata={() => {
                    setDuration(playerRef.current.audioEl.current.duration);
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
          <p>Ciao</p>
        </Col>
      </Row>
    </Container>
  );
};
export default Player;

// document.getElementById("range").oninput = function () {
//   let value = ((this.value - this.min) / (this.max - this.min)) * 100;
//   this.style.background =
//     "linear-gradient(to right, green 0%, green " + value + "%, #535353 " + value + "%, #535353 100%)";

//   document.getElementById("range").addEventListener("mouseleave", () => {
//     value = ((this.value - this.min) / (this.max - this.min)) * 100;
//     this.style.background =
//       "linear-gradient(to right, white 0%, white " + value + "%, #535353 " + value + "%, #535353 100%)";
//   });
//   //manipolazione volume utente
//   const player = document.querySelector("audio");
//   const volumeSlider = document.querySelector("#range");

//   volumeSlider.addEventListener("input", function () {
//     let dato;
//     dato = (this.value / 100).toFixed(1);
//     player.volume = dato;
//   });
// };
