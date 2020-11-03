import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { REGISTER, BASE_RESET_PASSWORD, LOGIN } from '../../../routing/routeContants';
import { fieldValidator } from '../../../common/custom';
import { validateInputs } from '../../../common/validation';
import { forgotPassword } from '../../../../api/index'
import history from '../../../routing/history'
import { successNotification, errorNotification } from '../../../common/notification-alert'

export const ForgotPassword = () => {


    const [state, setState] = useState({
        email: "", emailErr: ''
    });
    const [serviceMessage, setServiceMessage] = useState('');

    // Check Validation Function 
    const checkValidation = (field: object, value: string, type: string, maxLength: number | null, minLength: number | null) => {
        return fieldValidator(field, value, type, null, maxLength, minLength)
    }

    // Set The Login Input Values
    const setInputValue = (e: { target: { name: any, value: string } }, type: string, maxLength: number | null, minLength: number | null) => {
        let error = checkValidation(e.target.name, e.target.value, type, maxLength, minLength)
        setState({ ...state, [e.target.name]: e.target.value, [error.fieldNameErr]: error.errorMsg, [error.fieldCls]: error.setClassName });
        setServiceMessage('');
    }

    // Forgot Passsword Function
    const forgotPasswordSubmit = () => {
        let email = state.email, emailErr = '', getError = false;

        if (validateInputs('email', email) === 'empty') {
            emailErr = 'Please enter email.';
            getError = true;
        } else if (validateInputs('email', email) === false) {
            emailErr = 'Please enter valid email.';
            getError = true;
        }

        setState({ ...state, emailErr })

        if (getError === false && emailErr === '') {
            forgotPassword({ email }).then((resp: any) => {
                console.log(resp, 'resprespresp')
                if (resp.data && resp.data.DATA) {
                    successNotification("Success, please reset your password!!")
                    history.push(BASE_RESET_PASSWORD + "/" + resp.data.DATA.token)
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
                                        <h5>Forgot Password</h5>
                                        <p className="mb-0 mt-4">We will email you a link that you can use to reset your password. Please enter the email you used to create the account</p>
                                        {serviceMessage ? <div className="errorCls errCommonCls">{serviceMessage}</div> : ''}
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className={"form-group"}>
                                                <label htmlFor="exampleFormControlInput1">Email</label>
                                                <input name="email" type="email" value={state.email} onChange={(e) => setInputValue(e, 'email', null, null)} className="form-control" placeholder="Email" />
                                                {state.emailErr ? <span className="errorCls"> {state.emailErr}</span> : ''}
                                            </div>
                                            <div className="form-group">
                                                <button type="button" onClick={() => forgotPasswordSubmit()} className="btn btn-block btn-primary">Submit</button>
                                            </div>
                                            <p className=" text-center">Already a user? <Link to={LOGIN}> Sign In</Link></p>
                                            <p className=" text-center">Don’t have a user account?<Link to={REGISTER}> Sign Up</Link></p>
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

export default ForgotPassword