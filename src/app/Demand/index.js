// import axios from "axios";
import { Formik } from "formik";
import React, { useState, useEffect, } from "react";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { API_URL } from "../config/app";
import { observer, inject } from "mobx-react";
import axios from "axios";
import Layout from "../../components/Layout";



const Demand = (props) => {

    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(null);

    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {

        await axios.post(`${API_URL}/api/demand`, {
            ...values
        }, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then(async (result) => {
            if (result.data.success) {
                resetForm({});
            }
            alert(result.data.message);
        })
            .catch((error) => {
                setSubmitting(false);
                if (error.response) {
                    let err = error.response.data;
                    setErrors(err.errors);
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
        <Layout>
            <div className="container mt-3">
                {arr.length != 0 && arr.map((item) => <div className="alert alert-danger">{item}</div>)}
                {error != null && (<div className="alert alert-danger">{error}</div>)}

                <div className="card">
                    <div className="card-header">Talep Oluştur</div>
                    <div className="card-body">

                        <Formik initialValues={{
                            title: '',
                            text: '',
                        }}
                            onSubmit={_handleSubmit}
                            validationSchema={Yup.object().shape({
                                title: Yup.string().required("Başlık zorunludur"),
                                text: Yup.string().required("Açıklama zorunludur"),
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
                                <div className="demand-form">
                                    <div className="form-group">
                                        <label>Başlık</label>
                                        <input
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="title"
                                            value={values.name}
                                            type="text"
                                            className="form-control"
                                        ></input>
                                        {(errors.title && touched.title) && <p>{errors.title}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label>Açıklama</label>
                                        <textarea
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="text"
                                            value={values.text}
                                            type="text"
                                            className="form-control">

                                        </textarea>
                                        {(errors.text && touched.text) && <p>{errors.text}</p>}
                                    </div>

                                    <div className="form-group d-flex align-items-center justify-content-center">
                                        <button
                                            disabled={!isValid || isSubmitting}
                                            onClick={handleSubmit}
                                            className="button ">Talebi Oluştur</button>
                                    </div>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default inject("AuthStore")(observer(Demand));