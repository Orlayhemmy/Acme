import axios from 'axios';


export function getAllActivities() {
  return (dispatch) => {
    dispatch({ type: 'GET_ACTIVITIES' });
    axios.get('api/v1/activities').then((response) => {
      dispatch({ type: 'GET_ACTIVITIES_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_ACTIVITIES_FAILS', payload: err.response });
    });
  };
}

export function createActivity(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_ACTIVITY' });
    axios.post('api/v1/activities', data).then((response) => {
      dispatch({ type: 'CREATE_ACTIVITY_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'CREATE_ACTIVITY_FAILS', payload: err.response });
    });
  };
}

export function deleteActivity(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_ACTIVITY' });
    axios.delete(`api/v1/activity/${id}`).then((response) => {
      dispatch({ type: 'DELETE_ACTIVITY_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'DELETE_ACTIVITY_FAIL', payload: err.response });
    });
  };
}