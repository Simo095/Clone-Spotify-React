// import { Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addFavoriteAction,
//   addPlayerAlbumAction,
//   addPlayerTrackAction,
//   addSong,
//   removeFavoriteAction
// } from "../redux/actions";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// const SingleTrack = ({ track, albumId }) => {
//   const dispatch = useDispatch();
//   const songFavorite = useSelector(state => state.favorite.idTraccia);

//   return (
//     <>
//       <Col
//         sm={2}
//         key={track.id}
//         className="d-flex align-items-center justify-content-between ps-3 trackHover">
//         {songFavorite.includes(track.id) ? (
//           <AiFillHeart
//             color="white"
//             className="icona"
//             onClick={() => {
//               dispatch(removeFavoriteAction(track.id));
//             }}></AiFillHeart>
//         ) : (
//           <AiOutlineHeart
//             color="white"
//             className="icona"
//             onClick={() => {
//               dispatch(addFavoriteAction(track.id));
//             }}></AiOutlineHeart>
//         )}
//       </Col>
//       <Col sm={8}>
//         <div
//           className="flex-grow-1"
//           onClick={() => {
//             dispatch(addSong(track.preview));
//             dispatch(addPlayerTrackAction(track.id));
//             dispatch(addPlayerTrackAction(track.id));
//             dispatch(addPlayerAlbumAction(albumId));
//           }}>
//           {track.title}
//         </div>
//       </Col>
//       <Col sm={1}>
//         <small
//           className="duration"
//           style={{ color: "white" }}>
//           {Math.floor(parseInt(track.duration) / 60)}:
//           {parseInt(track.duration) % 60 < 10 ? "0" + (parseInt(track.duration) % 60) : parseInt(track.duration) % 60}
//         </small>
//       </Col>
//     </>
//   );
// };
// export default SingleTrack;
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteAction,
  addPlayerAlbumAction,
  addPlayerTrackAction,
  addSong,
  removeFavoriteAction,
} from "../redux/actions";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const SingleTrack = ({ track, albumId }) => {
  const dispatch = useDispatch();
  const songFavorite = useSelector((state) => state.favorite.idTraccia);

  return (
    <>
      <Col
        xs="auto"
        className="d-flex align-items-center justify-content-center pe-3 trackHover"
      >
        {songFavorite.includes(track.id) ? (
          <AiFillHeart
            color="white"
            style={{ fontSize: "20px" }}
            onClick={() => {
              dispatch(removeFavoriteAction(track.id));
            }}
          />
        ) : (
          <AiOutlineHeart
            color="white"
            style={{ fontSize: "20px" }} // Dimensione fissa per l'icona
            onClick={() => {
              dispatch(addFavoriteAction(track.id));
            }}
          />
        )}
      </Col>
      <Col className="flex-grow-1">
        <div
          className="flex-grow-1 trackHover"
          onClick={() => {
            dispatch(addSong(track.preview));
            dispatch(addPlayerTrackAction(track.id));
            dispatch(addPlayerAlbumAction(albumId));
          }}
        >
          {track.title}
        </div>
      </Col>
      <Col xs="auto" className="d-flex align-items-center">
        <small className="duration" style={{ color: "white" }}>
          {Math.floor(parseInt(track.duration) / 60)}:
          {parseInt(track.duration) % 60 < 10
            ? "0" + (parseInt(track.duration) % 60)
            : parseInt(track.duration) % 60}
        </small>
      </Col>
    </>
  );
};

export default SingleTrack;
