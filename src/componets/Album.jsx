// import { useEffect, useState } from "react";
// import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
// import { useParams, Link } from "react-router-dom";

// import { useSelector } from "react-redux";
// import SingleTrack from "./SingleTrack";

// const Album = () => {
//   const [album, setAlbum] = useState();
//   const [track, setTrack] = useState(null);
//   const songFavorite = useSelector((state) => state.favorite.idTraccia);
//   const params = useParams();

//   const albumFetch = async () => {
//     try {
//       const risposta = await fetch(
//         "https://striveschool-api.herokuapp.com/api/deezer/album/" + params.id,
//         {
//           method: "GET",
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JhNGZjOThlY2E4ZTAwMTU4ODQzZTciLCJpYXQiOjE3NDAyNjMzNjksImV4cCI6MTc0MTQ3Mjk2OX0.2SSQilxWXdxZm14mkffH9bF7o_e3TUtxBTd8r3WA_n8",
//           },
//         }
//       );
//       if (risposta.ok) {
//         const album = await risposta.json();
//         setAlbum(album);
//         setTrack(album.tracks);
//       } else {
//         console.log("Error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     albumFetch();
//   }, []);

//   return (
//     <Container fluid>
//       <Row>
//         <Col sm={8} className="offset-md-3 mainPage mt-3">
//           <Row>
//             <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
//               <Link>TRENDING</Link>
//               <Link>PODCAST</Link>
//               <Link>MOODS AND GENRES</Link>
//               <Link>NEW RELEASES</Link>
//               <Link>DISCOVER</Link>
//             </Col>
//           </Row>

//           <Row>
//             <Col sm={3} className="d-flex flex-column p-0 me-3">
//               {album ? (
//                 <>
//                   <Image
//                     src={album.cover}
//                     alt={album.title}
//                     fluid
//                     className="mt-5 ms-3"
//                   />
//                   <h3>{album.title}</h3>
//                   <h3 className="text-center">{album.artist.name}</h3>
//                 </>
//               ) : (
//                 <Container
//                   className="d-flex
//                 h-100 align-items-center justify-content-center"
//                 >
//                   <Spinner animation="border" variant="success" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </Spinner>
//                 </Container>
//               )}
//             </Col>
//             <Col>
//               <Row>
//                 <Col sm={10} className="d-flex flex-column my-5 menuSong gap-2">
//                   {track ? (
//                     track.data.map((track) => (
//                       <Row className="d-flex align-items-center justify-content-between ps-3 trackHover">
//                         <SingleTrack
//                           track={track}
//                           albumId={album.id}
//                         ></SingleTrack>
//                       </Row>
//                     ))
//                   ) : (
//                     <Container className="d-flex h-100 justify-content-center align-items-center">
//                       <Spinner
//                         animation="border"
//                         variant="success"
//                         role="status"
//                       >
//                         <span className="visually-hidden">Loading...</span>
//                       </Spinner>
//                     </Container>
//                   )}
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };
// export default Album;

import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import SingleTrack from "./SingleTrack";

const Album = () => {
  const [album, setAlbum] = useState(null);
  const [track, setTrack] = useState(null);
  const params = useParams();

  const albumFetch = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JhNGZjOThlY2E4ZTAwMTU4ODQzZTciLCJpYXQiOjE3NDAyNjMzNjksImV4cCI6MTc0MTQ3Mjk2OX0.2SSQilxWXdxZm14mkffH9bF7o_e3TUtxBTd8r3WA_n8",
          },
        }
      );
      if (response.ok) {
        const albumData = await response.json();
        setAlbum(albumData);
        setTrack(albumData.tracks);
      } else {
        console.error("Error fetching album data");
      }
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  };

  useEffect(() => {
    albumFetch();
  }, [params.id]);

  return (
    <Container fluid>
      <Row className="d-block w-100 d-md-flex justify-content-lg-end justify-content-center">
        <Col md={10} className="mt-3">
          <Row>
            <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
              <Link>TRENDING</Link>
              <Link>PODCAST</Link>
              <Link>MOODS AND GENRES</Link>
              <Link>NEW RELEASES</Link>
              <Link>DISCOVER</Link>
            </Col>
          </Row>

          <Row className="justify-content-lg-end justify-content-center ms-5">
            <Col md={2} lg={3} className="d-flex flex-column p-0 me-3">
              {album ? (
                <>
                  <Image
                    src={album.cover}
                    alt={album.title}
                    fluid
                    style={{ maxWidth: "300px" }}
                    className="mt-5"
                  />
                  <h3 className="mt-3">{album.title}</h3>
                  <h5 className="text-center">{album.artist.name}</h5>
                </>
              ) : (
                <Container className="d-flex h-100 justify-content-center align-items-center">
                  <Spinner animation="border" variant="success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Container>
              )}
            </Col>
            <Col
              md={9}
              lg={8}
              className="d-flex justify-content-end justify-content-lg-center"
            >
              <Row>
                <Col className="my-5 menuSong">
                  {track ? (
                    track.data.map((trackItem) => (
                      <Row
                        key={trackItem.id}
                        className="d-flex align-items-center ps-3 trackHover mb-2"
                      >
                        <SingleTrack track={trackItem} albumId={album.id} />
                      </Row>
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
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Album;
