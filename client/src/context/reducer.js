import ActionTypes from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!'
      }
    case ActionTypes.CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: ''
      } 
    case ActionTypes.SETUP_USER_BEGIN:
    case ActionTypes.UPDATE_USER_BEGIN:  
      return {
        ...state,
        isLoading: true
      } 
    case ActionTypes.SETUP_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      } 
    case ActionTypes.SETUP_USER_ERROR:
    case ActionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case ActionTypes.TOGGLE_SIDEBAR: 
      return {
        ...state,
        showSidebar: !state.showSidebar
      }
    case ActionTypes.LOGOUT_USER: 
      return {
        ...initialState,
        user: null,
        token: null,
        userLocation: '',
        jobLocation: '',
      }
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Profile Updated!',
      }   
    default:
      throw new Error(`no such action: ${action.type}`);
  }
}

export default reducer;