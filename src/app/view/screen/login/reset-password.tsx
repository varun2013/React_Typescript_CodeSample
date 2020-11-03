import React, { useState, useEffect } from "react";
import { fieldValidator } from '../../../common/custom';
import { validateInputs } from '../../../common/validation';
import { Link } from "react-router-dom";
import { LOGIN } from '../../../routing/routeContants';
import { resetPassword } from '../../../../api/index'
import _ from 'lodash'
import history from '../../../routing/history'
import { successNotification, errorNotification } from '../../../common/notification-alert'

interface ResetPasswordProps {
    match: {
        params: {
            token: string
        }
    }
}

export const ResetPassword = (props: ResetPasswordProps) => {
    let token: string = ''
    if (props.match && _.has(props.match, 'params') && _.has(props.match.params, 'token')) {
        token = props.match.params.token;
    }
    
    const [state, setState] = useState({
        password: "", confirmPassword: "", passwordCls: "", passwordErr: "", confirmPasswordCls: "", confirmPasswordErr: "",
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
        setServiceMessage('')
    }

    // Reset Passsword Function
    const resetPasswordSubmit = () => {
        let password = state.password, confirmPassword = state.confirmPassword,
        passwordErr = '', confirmPasswordErr = '', getError = false;

        if (validateInputs('password', password) === 'empty') {
            passwordErr = 'Please enter password.';
            getError = true;
        } else if (validateInputs('password', password) === false) {
            passwordErr = 'A special character, an upper case, a lower case, a number & minimum 8 character are required';
            getError = true;
        }

        if (confirmPassword === '') {
            confirmPasswordErr = 'Please enter confirm password.';
            getError = true;
        } else if (password !== confirmPassword) {
            confirmPasswordErr = 'Password and confirm password does not match.';
            getError = true;
        }

        setState({ ...state, passwordErr, confirmPasswordErr })

        if (getError === false && passwordErr === '' && confirmPasswordErr === '') {
            resetPassword({ password, confirm_password:confirmPassword, token }).then((resp: any) => {
                if (resp.success) {
                    successNotification('Password updated successfully!!')
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
                                        <h5>Reset Password</h5>
                                        {serviceMessage ? <div className="errorCls errCommonCls">{serviceMessage}</div> : ''}
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className={"form-group"}>
                                                <label htmlFor="exampleFormControlInput1">New Password</label>
                                                <input type="password" name="password" value={state.password} onChange={(e) => setInputValue(e, 'password', null, null)} className="form-control" placeholder="Password" />
                                                {state.passwordErr ? <span className="errorCls"> {state.passwordErr}</span> : ''}
                                            </div>
                                            <div className={"form-group"}>
                                                <label htmlFor="exampleFormControlInput1">Confirm Password</label>
                                                <input type="password" name="confirmPassword" value={state.confirmPassword} onChange={(e) => setInputValue(e, 'password', null, null)} className="form-control" placeholder="Confirm Password" />
                                                {state.confirmPasswordErr ? <span className="errorCls"> {state.confirmPasswordErr}</span> : ''}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" onClick={() => resetPasswordSubmit()} className="btn btn-block btn-primary">Submit</button>
                                            </div>
                                            <p className=" text-center">Already a user?  <Link to={LOGIN}>Sign in.</Link></p>
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

export default ResetPassword