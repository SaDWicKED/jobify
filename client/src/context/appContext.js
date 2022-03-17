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

  const removeUserToLocalStorage = ({user, token, location}) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  }

  const registerUser = async (currentUser) => {
    dispatch({type: ActionTypes.REGISTER_USER_BEGIN});
    console.log(currentUser);
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      // console.log(response);
      const {user, token, location} = response.data;
      dispatch({
        type: ActionTypes.REGISTER_USER_SUCCESS,
        payload: { user, token, location, }
      });
      addUserToLocalStorage({user, token, location,});
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: ActionTypes.REGISTER_USER_ERROR,
        payload: {msg: error.response.data.msg}
      });
    }
    clearAlert();
  }

  return <AppContext.Provider value={{...state, displayAlert, registerUser}}>
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