import { Formik } from "formik";
import React from "react";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { API_URL } from "../config/app";
import axios from "axios";
import Layout from "../theme/Layout";


const Profile = () => {

    const _handleSubmit = (values) => {
        alert(values);
    }

    return (
        <Layout>
            <div className="register-area">
                <div>
                    <img src={""} alt="" />
                    <input type="file" onChange={(event) => { console.log(event) }} id="photo-change" accept="image/*" style={{ display: 'none' }} />
                    <label for="photo-change" style={{ marginTop: 10, borderRadius: 5, cursor: 'pointer', textAlign: 'center', fontSize: 20 }} >
                        Profil Fotoğrafını Değiştir
                    </label>
                </div>

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
                                    disabled={!isValid || isSubmitting}
                                    onClick={handleSubmit}
                                    className="button ">Kayıt Ol</button>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        </Layout>
    )
}

export default Profile;