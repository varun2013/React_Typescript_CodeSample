import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { REGISTER, FORGOT_PASSWORD, DASHBOARD } from '../../../routing/routeContants';
import { fieldValidator } from '../../../common/custom';
import { validateInputs } from '../../../common/validation';
import { Tokens, User } from '../../../storage/index'
import { login } from '../../../../api/index'
import history from '../../../routing/history'
import { errorNotification } from '../../../common/notification-alert'

export const Login = () => {

    // Set initial State Value  
    const [state, setState] = useState({
        email: "", password: "", emailErr: '', passwordErr: "",
    });
    const [serviceMessage, setServiceMessage] = useState('');


    // Check Validation Function 
    const checkValidation = (field: object, value: string, type: string, maxLength: number | null, minLength: number | null) => {
        return fieldValidator(field, value, type, state.password, maxLength, minLength)
    }

    // Set The Login Input Values
    const setInputValue = (e: { target: { name: any, value: string } }, type: string, maxLength: number | null, minLength: number | null) => {
        let error = checkValidation(e.target.name, e.target.value, type, maxLength, minLength)
        setState({ ...state, [e.target.name]: e.target.value, [error.fieldNameErr]: error.errorMsg, [error.fieldCls]: error.setClassName });
        setServiceMessage('');
    }

    // Login Function
    const loginSubmit = () => {
        let email = state.email, password = state.password, emailErr = '', passwordErr = '', getError = false;

        if (validateInputs('email', email) === 'empty') {
            emailErr = 'Please enter email.';
            getError = true;
        } else if (validateInputs('email', email) === false) {
            emailErr = 'Please enter valid email.';
            getError = true;
        }

        if (validateInputs('required', password) === 'empty') {
            passwordErr = 'Please enter password.';
            getError = true;
        }

        setState({ ...state, emailErr, passwordErr })

        if (getError === false && emailErr === '' && passwordErr === '') {
            console.log({ email, password })
            login({ email, password }).then((resp: any) => {
                console.log(resp, 'resprespresp')
                if (resp.success && resp.data && resp.data.DATA) {
                    User.setUserDetails(resp.data.DATA)
                    history.push(DASHBOARD)
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


    // On Enter Sign In 
    const keyPressDownEvent = (e: { key: string }) => {
        if (e.key === 'Enter') {
            loginSubmit();
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
                                        <h5>Sign In</h5>
                                        {serviceMessage ? <div className="errorCls errCommonCls">{serviceMessage}</div> : ''}
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlInput1">Email</label>
                                                <input type="email" onKeyDown={(e) => keyPressDownEvent(e)} name="email" value={state.email} onChange={(e) => setInputValue(e, 'email', null, null)} className="form-control" placeholder="Email" />
                                                {state.emailErr ? <span className="errorCls"> {state.emailErr}</span> : ''}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Password">Password</label>
                                                <input onKeyDown={(e) => keyPressDownEvent(e)} className="form-control" type="password" name="password" value={state.password} onChange={(e) => setInputValue(e, 'required', null, null)} placeholder="Password" id="Password" />
                                                {state.passwordErr ? <span className="errorCls"> {state.passwordErr}</span> : ''}
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group text-right col-12">
                                                    <Link to={FORGOT_PASSWORD}>Forgot Password?</Link>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="button" onClick={() => loginSubmit()} className="btn btn-block btn-primary">Sign In</button>
                                            </div>
                                            <p className=" text-center">Don’t have a account? <Link to={REGISTER}>Sign Up</Link></p>
                                        </form>

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

export default Login