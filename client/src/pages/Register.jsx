import React, {useEffect, useState} from 'react';
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Alert from "../components/Alert";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showAlert: false
}

const Register = () => {
    const [values, setValues] = useState(initialState)

    const handleChange = (e) => {
       setValues((prevState) => (
           {...prevState,[e.target.name]: e.target.value}
       ))
    }
    const onSubmit = (e) => {
      e.preventDefault()
        console.log(values)
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
                {values.showAlert && <Alert/>}
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
                <button type={'submit'} className={'btn btn-block'}>submit</button>
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
