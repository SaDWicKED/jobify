import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import ActionTypes from "./actions";
import axios from "axios"

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user? JSON.parse(user): null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  showSidebar: false,
}

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({type: ActionTypes.DISPLAY_ALERT});
    clearAlert();
  }

  const clearAlert = () => {
    setTimeout(()=>{
      dispatch({type: ActionTypes.CLEAR_ALERT}) 
    }, 3000);
  }

  const addUserToLocalStorage = ({user, token, location}) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  }

  const setupUser = async ({ currentUser, endPoint, alertText}) => {
    dispatch({ type: ActionTypes.SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      const { user, token, location } = data;
  
      dispatch({
        type: ActionTypes.SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })
  
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: ActionTypes.SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  }

  const toggleSidebar = () => {
    dispatch({type: ActionTypes.TOGGLE_SIDEBAR});
  }

  const logoutUser = () => {
    dispatch({ type: ActionTypes.LOGOUT_USER })
    removeUserFromLocalStorage();
  }

  return <AppContext.Provider 
    value={{
      ...state, 
      displayAlert, 
      setupUser, 
      toggleSidebar,
      logoutUser,
    }}
  >
    {children}
  </AppContext.Provider>
}

const useAppContext = () => {
  return useContext(AppContext);
}

export {
  AppProvider,
  initialState,
  useAppContext
}