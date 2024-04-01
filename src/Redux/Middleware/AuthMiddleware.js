import { setAthentication } from "../Reducers/AuthReducer";

const authMiddleware = ({ dispatch }) => (next) => (action) => {
  // Intercept Axios responses
 
  //console.log("inside middlware", action)
  if (action.payload && action.payload.status === 401) {
    // If response status is 401 (Unauthorized), dispatch logout action
    dispatch(setAthentication(false));
  }

  // Pass the action to the next middleware or reducer
  return next(action);
};

export default authMiddleware;