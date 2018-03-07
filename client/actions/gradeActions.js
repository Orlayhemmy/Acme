export function createGradeSheet(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_SHEET' });
    axios.post('api/v1/gradesheet').then((response) => {
      dispatch({ type: 'CREATE_SHEET_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'CREATE_SHEET_FAIL', payload: err.response });
    });
  }
}