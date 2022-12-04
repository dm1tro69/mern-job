import React, {useEffect, useState} from 'react';
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Alert from "../components/Alert";
import {useAppContext} from "../context/appContext";
import {useNavigate} from "react-router-dom";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,

}

const Register = () => {
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()

    const {isLoading, showAlert, displayAlert, registerUser, user} = useAppContext()

    useEffect(()=> {
        if (user){
            setTimeout(()=> {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    const handleChange = (e) => {
       setValues((prevState) => (
           {...prevState,[e.target.name]: e.target.value}
       ))
    }
    const onSubmit = (e) => {
      e.preventDefault()
        const {name, isMember, password, email} = values
        if (!email || !password || (!isMember && !name)){
            displayAlert()
            return
        }
        const currentUser = {name, email, password}
        if (isMember){
            console.log('already a member')
        }else {
            registerUser(currentUser)
        }

    }
    const toggleMember = () => {
      setValues({...values, isMember: !values.isMember})
    }

    useEffect(()=> {

    }, [])

    return (
        <Wrapper className={'full-page'}>
            <form className={'form'} onSubmit={onSubmit}>
                <Logo/>
                <h3>{values.isMember ? 'Login': 'Register'}</h3>
                {showAlert && <Alert/>}
                {!values.isMember && (
                    <FormRow
                        name={'name'}
                        value={values.name}
                        type={'text'}
                        handleChange={handleChange}
                        labelText={'name'}
                    />
                )}
                <FormRow
                    name={'email'}
                    value={values.email}
                    type={'email'}
                    handleChange={handleChange}
                    labelText={'email'}
                />
                <FormRow
                    name={'password'}
                    value={values.password}
                    type={'password'}
                    handleChange={handleChange}
                    labelText={'password'}
                />
                <button type={'submit'} disabled={isLoading} className={'btn btn-block'}>submit</button>
                <p>
                    {values.isMember ? 'Not a member yet?': 'Already a member?'}
                    <button onClick={toggleMember} className={'member-btn'} type={'button'}>
                        {values.isMember ? 'Register': 'Login'}
                    </button>
                </p>

            </form>
        </Wrapper>
    );
};

export default Register;
