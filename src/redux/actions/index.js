export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const ADD_PLAYER_TRACK = "ADD_PLAYER_TRACK";
export const ADD_PLAYER_ALBUM = "ADD_PLAYER_ALBUM";
export const ADD_PLAYER = "ADD_PLAYER";
export const ADD_SONG = "ADD_SONG";
export const ADD_ALBUM = "ADD_ALBUM";
export const ADD_ALBUM_SEARCH = "ADD_ALBUM_SEARCH";

export const addFavoriteAction = (idTrack) => ({
  type: ADD_FAVORITE,
  payload: idTrack,
});
export const removeFavoriteAction = (idTrack) => ({
  type: REMOVE_FAVORITE,
  payload: idTrack,
});
export const addPlayerTrackAction = (trackId) => ({
  type: ADD_PLAYER_TRACK,
  payload: trackId,
});
export const addPlayerAlbumAction = (albumId) => ({
  type: ADD_PLAYER_ALBUM,
  payload: albumId,
});
export const getTracciAction = (album) => ({
  type: ADD_PLAYER,
  payload: album,
});
export const addSong = (song) => ({ type: ADD_SONG, payload: song });
export const addAlbum = (album) => ({ type: ADD_ALBUM, payload: album });
export const addAlbumSearch = (albumSearch) => ({
  type: ADD_ALBUM_SEARCH,
  payload: albumSearch,
});
export const getPlayerAction = (IDAblumPassatoDaTraccia, idTracce) => {
  return async (dispatch) => {
    try {
      const risposta = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/album/" +
          IDAblumPassatoDaTraccia,
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
        console.log(album.tracks, "action");

        const filter = album.tracks.data.filter(
          (traccia) => traccia.id === idTracce
        );
        dispatch(getTracciAction(filter));
        dispatch(addAlbum(album.tracks));
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
