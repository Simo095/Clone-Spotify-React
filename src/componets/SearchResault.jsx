// import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const SearchResault = () => {
//   const albumSearch = useSelector(state => state.song.albumSearch);
//   return (
//     <>
//       <Container style={{minWidth:"1000px"}} fluid>
//         <Row>
//           <Col
//             sm={8}
//             className="offset-md-3 mainPage mt-3">
//             <Row>
//               <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
//                 <Link>TRENDING</Link>
//                 <Link>PODCAST</Link>
//                 <Link>MOODS AND GENRES</Link>
//                 <Link>NEW RELEASES</Link>
//                 <Link>DISCOVER</Link>
//               </Col>
//             </Row>
//             <Row className="imgLinks">
//               <Col>
//                 <h2 className="text-white font-weight-bold">Tracks</h2>
//                 <div className="pt-5 mb-5">
//                   <Row
//                     className="row "
//                     id="apiLoaded">
//                     {albumSearch ? (
//                       albumSearch.data.map(track => (
//                         <Col
//                           sm={4}
//                           md={4}
//                           lg={3}
//                           className="d-flex flex-column text-center mb-5"
//                           key={track.id}>
//                           <Link to={`albumPage/${track.album.id}/`}>
//                             <Image src={track.album.cover} />
//                           </Link>
//                           <Link to={"/"}>
//                             <p className="m-0">Track: {track.title}</p>
//                           </Link>
//                           <Link
//                             className="d-block"
//                             to={`albumPage/${track.album.id}/`}>
//                             <p>Album:{track.album.title}</p>
//                           </Link>
//                         </Col>
//                       ))
//                     ) : (
//                       <Container className="d-flex h-100 justify-content-center align-items-center">
//                         <Spinner
//                           animation="border"
//                           variant="success"
//                           role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </Spinner>
//                       </Container>
//                     )}
//                   </Row>
//                 </div>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };
// export default SearchResault;

import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchResault = () => {
  const albumSearch = useSelector((state) => state.song.albumSearch);

  return (
    <>
      <Container fluid>
        <Row className="d-flex justify-content-center justify-content-lg-end">
          <Col md={9} className="mt-3">
            <Row>
              <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
                <Link>TRENDING</Link>
                <Link>PODCAST</Link>
                <Link>MOODS AND GENRES</Link>
                <Link>NEW RELEASES</Link>
                <Link>DISCOVER</Link>
              </Col>
            </Row>
            <Row className="imgLinks">
              <Col>
                <h2 className="text-white font-weight-bold">Tracks</h2>
                <div className="pt-5 mb-5">
                  <Row className="row" id="apiLoaded">
                    {albumSearch ? (
                      albumSearch.data.map((track) => (
                        <Col
                          sm={6}
                          md={4}
                          lg={3}
                          className="d-flex flex-column text-center mb-4"
                          key={track.id}
                        >
                          <Link to={`albumPage/${track.album.id}/`}>
                            <Image
                              src={track.album.cover}
                              className="img-fluid"
                              style={{ maxWidth: "200px" }}
                            />
                          </Link>
                          <div className="mt-2">
                            <Link to={"/"} className="text-truncate">
                              <p className="m-0">Track: {track.title}</p>
                            </Link>
                            <Link
                              className="d-block text-truncate"
                              to={`albumPage/${track.album.id}/`}
                            >
                              <p>Album: {track.album.title}</p>
                            </Link>
                          </div>
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
    </>
  );
};

export default SearchResault;
