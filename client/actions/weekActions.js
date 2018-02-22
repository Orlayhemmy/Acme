export function currentWeek(value) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_WEEK', payload: value });
  };
}
