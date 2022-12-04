import {createContext, useContext, useReducer, useState} from "react";
import reducer from "./reducer";
import {CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS} from "./actions";
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
    jobLocation: userLocation || ''
}



const AppContext = createContext()
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,'initialState')

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
    const removeUserToLocalStorage = ({user, token, location}) => {
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


    return (
        <AppContext.Provider value={{...state, displayAlert, registerUser}}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
  return useContext(AppContext)
}
export {AppProvider}
