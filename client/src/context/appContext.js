import {createContext, useContext, useReducer, useState} from "react";
import reducer from "./reducer";
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
    TOGGLE_SIDEBAR,
    UPDATE_USER_BEGIN, UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from "./actions";
import axios from "axios";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user? JSON.parse(user): null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending', 'interview', 'declined'],
    status: 'pending'
}



const AppContext = createContext()
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,'initialState')


    const authFetch = axios.create({
        baseURL: '/api/v1',
        headers: {
            Authorization: `Bearer ${state.token}`
        }
    })

    const displayAlert = () => {
      dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(()=> {
            dispatch({type: CLEAR_ALERT})
        }, 3000)
    }
    const addUserToLocalStorage = ({user, token, location}) => {
       localStorage.setItem('user', JSON.stringify(user))
       localStorage.setItem('token',token)
       localStorage.setItem('location', location)
    }
    const removeUserToLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const registerUser = async (currentUser) => {
        dispatch({type: REGISTER_USER_BEGIN})
        try {
          const response = await axios.post('/api/v1/auth/register', currentUser)
            // console.log(response)
            const {user, token, location} = response.data
            dispatch({type: REGISTER_USER_SUCCESS, payload: {user, location, token}})
            addUserToLocalStorage({user, token, location})
        }catch (e) {
            dispatch({type: REGISTER_USER_ERROR, payload: e.response.data.message})


        }
        clearAlert()
        // console.log(currentUser)
    }

    const loginUser = async (currentUser) => {
        dispatch({type: LOGIN_USER_BEGIN})
        try {
            const {data} = await axios.post('/api/v1/auth/login', currentUser)
            const {user, token, location} = data
            dispatch({type: LOGIN_USER_SUCCESS, payload: {user, token, location}})
            addUserToLocalStorage({user, token, location})
        }catch (e) {
            console.log(e)
            dispatch({type: LOGIN_USER_ERROR, payload: {msg: e.response.data.message}})
        }
        clearAlert()
    }
    const setupUser = async ({currentUser, endPoint, alertText}) => {
        dispatch({type: SETUP_USER_BEGIN})
        try {
            const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
            const {user, token, location} = data
            dispatch({type: SETUP_USER_SUCCESS, payload: {user, token, location, alertText}})
            addUserToLocalStorage({user, token, location})
        }catch (e) {
            console.log(e)
            dispatch({type: SETUP_USER_ERROR, payload: {msg: e.response.data.message}})
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR})
    }

    const logOut = () => {
      dispatch({type: LOGOUT_USER})
        removeUserToLocalStorage()
    }
    const updateUser = async (currentUser) => {
        dispatch({type: UPDATE_USER_BEGIN})
        try {
            const {data}= await authFetch.patch('/auth/updateUser', currentUser)
            const {user, location, token} = data
            dispatch({type: UPDATE_USER_SUCCESS, payload: {user, location, token}})
            addUserToLocalStorage({user, location, token})

        }catch (e) {
            dispatch({type: UPDATE_USER_ERROR, payload: {msg: e.response.data.message}})

        }
        clearAlert()
    }
    const handleChange = ({name, value}) => {
       dispatch({type: HANDLE_CHANGE, payload: {name, value}})
    }
    const clearValues = () => {
       dispatch({type: CLEAR_VALUES})
    }
    const createJob = async () => {
       dispatch({type: CREATE_JOB_BEGIN})
        try {
            const {position, company, jobLocation, jobType, status, token} = state
            await authFetch.post('/jobs', {
                position, company, jobLocation, jobType, status, token
            })
            dispatch({type: CREATE_JOB_SUCCESS})
            dispatch({type: CLEAR_VALUES})
        }catch (e) {
            dispatch({type: CREATE_JOB_ERROR, payload: {msg: e.response.data.message}})
        }
        clearAlert()
    }

    return (
        <AppContext.Provider value={{...state, logOut, displayAlert, registerUser, loginUser, setupUser, toggleSidebar, initialState, updateUser, handleChange, clearValues, createJob}}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
  return useContext(AppContext)
}
export {AppProvider}
