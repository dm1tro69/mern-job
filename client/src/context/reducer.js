import {
  CLEAR_ALERT, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_ERROR, CREATE_JOB_SUCCESS,
  DISPLAY_ALERT, HANDLE_CHANGE,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR, UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS
} from "./actions";
import {initialState} from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT){
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values'
    }
  }
  if (action.type === CLEAR_ALERT){
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }
  if (action.type === REGISTER_USER_BEGIN){
    return {
      ...state,
     isLoading: true

    }
  }
  if (action.type === REGISTER_USER_SUCCESS){
    return {
      ...state,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...',
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    }
  }
  if (action.type === REGISTER_USER_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload

    }
  }
  if (action.type === LOGIN_USER_BEGIN){
    return {
        ...state,
        isLoading: true

    }
  }
  if (action.type === LOGIN_USER_SUCCESS){
    return {
      ...state,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...',
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    }
  }
  if (action.type === LOGIN_USER_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg

    }
  }
  if (action.type === SETUP_USER_BEGIN){
    return {
      ...state,
      isLoading: true

    }
  }
  if (action.type === SETUP_USER_SUCCESS){
    return {
      ...state,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    }
  }
  if (action.type === SETUP_USER_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg

    }
  }
  if (action.type === TOGGLE_SIDEBAR){
    return {
      ...state,
      showSidebar: !state.showSidebar

    }
  }
  if (action.type === LOGOUT_USER){
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: null,
      jobLocation: null

    }
  }
  if (action.type === UPDATE_USER_BEGIN){
    return {
      ...state,
      isLoading: true

    }
  }
  if (action.type === UPDATE_USER_SUCCESS){
    return {
      ...state,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    }
  }
  if (action.type === UPDATE_USER_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg

    }
  }
  if (action.type === HANDLE_CHANGE){
    return {
      ...state,
      [action.payload.name]: action.payload.value

    }
  }
  if (action.type === CLEAR_VALUES){
     const initialState = {
       isEditing: false,
       editJobId: '',
       position: '',
       company: '',
       jobLocation: state.userLocation,
       jobType: 'full-time',
       status: 'pending'
     }
     return {...state, ...initialState}
  }
  if (action.type === CREATE_JOB_BEGIN){
    return {
      ...state,
      isLoading: true

    }
  }
  if (action.type === CREATE_JOB_SUCCESS){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Job Created!'

    }
  }
  if (action.type === CREATE_JOB_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg

    }
  }
}
export default reducer
