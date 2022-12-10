import React from 'react';
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {useAppContext} from "../../context/appContext";
import Alert from "../../components/Alert";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";

const AddJob = () => {
    const {initialState,showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, isEditing, handleChange, clearValues, createJob} = useAppContext()
    const handleSubmit = (e) => {
       e.preventDefault()
        if (!position || !company || !jobLocation){
            displayAlert()
            return
        }
        createJob()
    }
    const handleJobInput = (e) => {
       const name = e.target.name
       const value = e.target.value
        handleChange({name, value})
    }
    return (
        <Wrapper>
            <form className={'form'}>
                <h3>{isEditing ? 'edit job': 'add job'}</h3>
                {showAlert && <Alert/>}
                <div className="form-center">
                    <FormRow
                        type={'text'}
                        name={'position'}
                        value={position}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type={'text'}
                        name={'company'}
                        value={company}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type={'text'}
                        name={'jobLocation'}
                        labelText={'location'}
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />
                    <FormRowSelect
                        name={'status'}
                        value={status}
                        handleChange={handleJobInput}
                        list={initialState.statusOptions}/>
                    <FormRowSelect
                        name={'jobType'}
                        value={jobType}
                        handleChange={handleJobInput}
                        list={initialState.jobTypeOptions}/>
                    <div className="btn-container">
                        <button onClick={handleSubmit} className={'btn btn-block submit-btn'} type={'submit'}>
                            submit
                        </button>

                        <button onClick={(e) => {
                            e.preventDefault()
                            clearValues()
                        }} className={'btn btn-block clear-btn'}>
                            clear
                        </button>

                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
