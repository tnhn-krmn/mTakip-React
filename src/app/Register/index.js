// import axios from "axios";
import { Formik } from "formik";
import React from "react";
import * as Yup from 'yup';


const Register = () => {

    const _handleSubmit = () => {
        alert("Selam bebi");
    }
    return (
        <div className="register-area">
            <div className="logo"><span>mTakip</span></div>

            <Formik initialValues={{
                name: '',
                email: '',
                password: ''
            }}
                onSubmit={_handleSubmit}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Email Formatı Hatalı").required("Email zorunludur"),
                    name: Yup.string().required("Ad Soyad zorunludur"),
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
                            <label>Ad Soyad :</label>
                            <input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="name"
                                value={values.name}
                                type="text"
                                className="form-control"
                            ></input>
                            {(errors.name && touched.name) && <p>{errors.name}</p>}
                        </div>
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
                            disabled={!isValid || isSubmitting }
                            onClick={handleSubmit}
                            className="button ">Kayıt Ol</button>
                        </div>
                    </div>
                )}
            </Formik>

        </div>
    )
}
export default Register;