export function currentTerm(value) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_TERM', payload: value });
  };
}
