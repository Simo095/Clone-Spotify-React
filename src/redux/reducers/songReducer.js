import { ADD_PLAYER, ADD_PLAYER_ALBUM, ADD_PLAYER_TRACK, ADD_SONG, ADD_ALBUM, ADD_ALBUM_SEARCH } from "../actions";

const initialState = {
  idTraccia: "",
  idAlbum: "",
  tracciaFiltrata: null,
  song: "",
  album: null,
  albumSearch: null
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER_ALBUM:
      return {
        ...state,
        idAlbum: action.payload
      };
    case ADD_PLAYER_TRACK:
      return {
        ...state,
        idTraccia: action.payload
      };
    case ADD_PLAYER:
      return {
        ...state,
        tracciaFiltrata: action.payload
      };
    case ADD_SONG:
      return {
        ...state,
        song: action.payload
      };
    case ADD_ALBUM:
      return {
        ...state,
        album: action.payload
      };
    case ADD_ALBUM_SEARCH:
      return {
        ...state,
        albumSearch: action.payload
      };
    default:
      return state;
  }
};
export default songReducer;
