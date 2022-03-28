// import axios from "axios";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { API_URL } from "../config/app";
import { observer, inject } from "mobx-react";
import axios from "axios";


const Login = (props) => {

    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(null);

   useEffect(() => {
        if (props.AuthStore.appState != null) {
            if (props.AuthStore.appState.isLoggedIn) {
                return props.history.push('/');
            }
        }
    }, []);

    const _handleSubmit = async (values, { setSubmitting }) => {

        await axios.post(`${API_URL}/api/auth/login`, {
            ...values
        }).then(async (result) => {
            const userData = {
                ...result.data
            };

            const appState = {
                isLoggedIn: true,
                user: userData
            };

            await props.AuthStore.save(appState);
            window.location.reload();

        })
            .catch((error) => {
                setSubmitting(false);
                if (error.response) {
                    
                    if (error.response.data.errors) 
                    {
                        let err = error.response.data;
                        setErrors(err.errors);
                    }
                    else
                    {
                        setError(error.response.data.message);
                    }
                }

                else if (error.request) {
                    setError(error.request);
                }
                else {
                    setError(error.message);
                }
            })
    }

    let arr = [];

    Object.values(errors).forEach(value => {
        arr.push(value);
    })

    return (
        <div className="register-area">
            <div className="logo"><span>mTakip</span></div>
            {arr.length != 0 && arr.map((item) => <div className="alert alert-danger">{item}</div>)}
            {error != null && (<div className="alert alert-danger">{error}</div>)}

            <Formik initialValues={{
                name: '',
                email: '',
                password: ''
            }}
                onSubmit={_handleSubmit}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Email Formatı Hatalı").required("Email zorunludur"),
                    password: Yup.string().required("Parola zorunludur"),
                })}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    values,
                    touched,
                    errors,
                    isValid
                }) => (
                    <div className="register-form">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="email"
                                value={values.email}
                                type="email"
                                className="form-control"
                            ></input>
                            {(errors.email && touched.email) && <p>{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label>Parola</label>
                            <input
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="password"
                                value={values.password}
                                className="form-control"
                            ></input>
                            {(errors.password && touched.password) && <p>{errors.password}</p>}
                        </div>
                        <div className="form-group d-flex align-items-center justify-content-center">
                            <button
                                disabled={!isValid || isSubmitting}
                                onClick={handleSubmit}
                                className="button ">Giriş Yap</button>
                        </div>
                    </div>
                )}
            </Formik>
            <Link to={"/register"}>Kayıt Ol</Link>

        </div>
    )
}
export default inject("AuthStore")(observer(Login));
