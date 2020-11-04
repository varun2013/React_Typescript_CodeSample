import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from '../../../routing/routeContants';
import { fieldValidator } from '../../../common/custom';
import { validateInputs } from '../../../common/validation';
import { register } from '../../../../api/index'
import history from '../../../routing/history'
import { successNotification, errorNotification } from '../../../common/notification-alert'

export const Register = () => {


    // Set initial State Value  
    const [state, setState] = useState({
        email: "", password: "", confirmPassword: "", emailErr: '', passwordErr: "", confirmPasswordErr: "",
        firstName: "", firstNameErr: "", lastName: "", lastNameErr: ""

    });
    const [serviceMessage, setServiceMessage] = useState('');



    // Check Validation Function 
    const checkValidation = (field: object, value: string, type: string, maxLength: number | null, minLength: number | null) => {
        return fieldValidator(field, value, type, state.password, maxLength, minLength)
    }

    // Set The Login Input Values
    const setInputValue = (e: { target: { name: any, value: string } }, type: string, maxLength: number | null, minLength: number | null) => {
        let error = checkValidation(e.target.name, e.target.value, type, maxLength, minLength)
        if (error.errorMsg === 'Please enter confirm password.') {
            error.errorMsg = 'Please confirm password.'
        }
        setState({ ...state, [e.target.name]: e.target.value, [error.fieldNameErr]: error.errorMsg, [error.fieldCls]: error.setClassName });
        setServiceMessage('');
    }

    // Submit Registration Function
    const saveUserData = () => {
        let email = state.email, password = state.password, confirmPassword = state.confirmPassword,
            emailErr = '', passwordErr = '', confirmPasswordErr = '',
            firstName = state.firstName, firstNameErr = "", lastName = state.lastName, lastNameErr = "",
            getError = false;

        if (validateInputs('string', firstName) === 'empty') {
            firstNameErr = 'Please enter first name.';
            getError = true;
        } else if (validateInputs('string', firstName) === false) {
            firstNameErr = 'Please enter valid first name.';
            getError = true;
        }

        if (validateInputs('string', lastName) === 'empty') {
            lastNameErr = 'Please enter last name.';
            getError = true;
        } else if (validateInputs('string', lastName) === false) {
            lastNameErr = 'Please enter valid last name.';
            getError = true;
        }

        if (validateInputs('email', email) === 'empty') {
            emailErr = 'Please enter email.';
            getError = true;
        } else if (validateInputs('email', email) === false) {
            emailErr = 'Please enter valid email.';
            getError = true;
        }

        if (validateInputs('password', password) === 'empty') {
            passwordErr = 'Please enter password.';
            getError = true;
        } else if (validateInputs('password', password) === false) {
            passwordErr = 'A special character, an upper case, a lower case, a number & minimum 8 character are required';
            getError = true;
        }

        if (confirmPassword === '') {
            confirmPasswordErr = 'Please confirm password.';
            getError = true;
        } else if (password !== confirmPassword) {
            confirmPasswordErr = 'Password and confirm password does not match.';
            getError = true;
        }

        setState({ ...state, emailErr, passwordErr, confirmPasswordErr, firstNameErr, lastNameErr })

        if (getError === false && emailErr === '' && passwordErr === '' && confirmPasswordErr === '' && firstNameErr === '' && lastNameErr === '') {
            console.log({ email, password, password_confirmation: confirmPassword, firstName, lastName })
            register({ email, password, first_name: firstName, last_name: lastName }).then((resp: any) => {
                if (resp.success && resp.data && resp.data.STATUS && resp.data.STATUS === "SUCCESS") {
                    successNotification('Registration successful!!')
                    history.push(LOGIN)
                } else {
                    errorNotification("Service Error: " + (resp.data && resp.data.MESSAGE ? resp.data.MESSAGE : '') + "!!")
                    setServiceMessage("Service Error: " + (resp.data && resp.data.MESSAGE ? resp.data.MESSAGE : '') + "!!")
                }
            }).catch((response) => {
                console.log(response)
                errorNotification("Service Error!!")
                setServiceMessage("Service Error!!")
            })
        }
    }

    return (
        <div className="login_signup main-site">
            <main className="site-body">
                <section className="middle-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Sign-up </h5>
                                        {serviceMessage ? <div className="errorCls errCommonCls">{serviceMessage}</div> : ''}
                                    </div>
                                    <div className="card-body">
                                        <div className={"form-group"}>
                                            <label htmlFor="exampleFormControlInput1">First Name </label>
                                            <input type="text" name="firstName" value={state.firstName} onChange={(e) => setInputValue(e, 'string', null, null)} className="form-control" placeholder="First Name" />
                                            {state.firstNameErr ? <span className="errorCls"> {state.firstNameErr}</span> : ''}
                                        </div>
                                        <div className={"form-group"}>
                                            <label htmlFor="exampleFormControlInput1">Last Name</label>
                                            <input type="text" name="lastName" value={state.lastName} onChange={(e) => setInputValue(e, 'string', null, null)} className="form-control" placeholder="Last Name" />
                                            {state.lastNameErr ? <span className="errorCls"> {state.lastNameErr}</span> : ''}
                                        </div>
                                        <div className={"form-group"}>
                                            <label htmlFor="exampleFormControlInput1">Email</label>
                                            <input type="text" name="email" value={state.email} onChange={(e) => setInputValue(e, 'email', null, null)} className="form-control" placeholder="Email" />
                                            {state.emailErr ? <span className="errorCls"> {state.emailErr}</span> : ''}
                                        </div>
                                        <div className={"form-group"}>
                                            <label htmlFor="exampleFormControlInput1">Password</label>
                                            <input type="password" name="password" value={state.password} onChange={(e) => setInputValue(e, 'password', null, null)} className="form-control" placeholder="Password" />
                                            {state.passwordErr ? <span className="errorCls"> {state.passwordErr}</span> : ''}
                                        </div>
                                        <div className={"form-group"}>
                                            <label htmlFor="exampleFormControlInput1">Confirm Password</label>
                                            <input type="password" name="confirmPassword" value={state.confirmPassword} onChange={(e) => setInputValue(e, 'password', null, null)} className="form-control" placeholder="Confirm Password" />
                                            {state.confirmPasswordErr ? <span className="errorCls"> {state.confirmPasswordErr}</span> : ''}
                                        </div>
                                        <div className="form-group">
                                            <button type="button" onClick={() => saveUserData()} className="btn btn-block btn-primary">Sign up</button>
                                        </div>
                                        <p className=" text-center">Already a user?  <Link to={LOGIN}>Sign In</Link></p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Register