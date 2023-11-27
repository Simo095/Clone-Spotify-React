import { ADD_FAVORITE, REMOVE_FAVORITE } from "../actions";

const initialState = {
  favorito: null,
  idTraccia: []
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        idTraccia: [...state.idTraccia, action.payload]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        idTraccia: state.idTraccia.filter(traccia => traccia !== action.payload)
      };
    default:
      return state;
  }
};
export default favoriteReducer;
