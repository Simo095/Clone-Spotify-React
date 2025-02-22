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
    let headers = new Headers({
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "c74a0a086emshf55ffb8dbdcb59ap17a486jsnb83bb4d3e387",
    });

    try {
      const risposta = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/album/" +
          IDAblumPassatoDaTraccia,
        {
          method: "GET",
          headers,
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
