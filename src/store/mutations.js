export default {
  setResturantName: (state, payload) => {
    state.resturantName = payload.resturantName;
  },
  setChcId: (state, payload) => {
    state.resturantChcId = payload.resturantChcId;
  },
  setResultChcId: (state, payload) => {
    state.resultChcId = payload.resultChcId;
  },
  setResultDictId: (state, payload) => {
    state.resturantDictId = payload.resturantDictId;
  }
}
