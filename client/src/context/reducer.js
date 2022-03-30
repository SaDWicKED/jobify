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
    case ActionTypes.CREATE_JOB_BEGIN:  
      return {
        ...state,
        isLoading: true
      } 
    case ActionTypes.GET_JOBS_BEGIN:  
      return {
        ...state,
        isLoading: true,
        showAlert: false
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
    case ActionTypes.CREATE_JOB_ERROR:
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
    case ActionTypes.HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]:action.payload.value
      }
    case ActionTypes.CLEAR_VALUES:
      return {
        ...state,
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: state.userLocation,
        jobType: 'full-time',
        status: 'pending'
      }
    case ActionTypes.CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'New Job Created!',
      }  
    case ActionTypes.GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      }
    case ActionTypes.SET_EDIT_JOB:
      const job = state.jobs.find(job => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status
      }     
    default:
      throw new Error(`no such action: ${action.type}`);
  }
}

export default reducer;