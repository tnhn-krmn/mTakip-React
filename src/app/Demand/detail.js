// import axios from "axios";
import { Formik } from "formik";
import React, { useState, useEffect, } from "react";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { API_URL } from "../config/app";
import { observer, inject } from "mobx-react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useParams, useHistory } from "react-router-dom";
import { toJS } from "mobx";




const Demand = (props) => {


    const { id } = useParams();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(null);
    const [messages, setMessage] = useState([]);
    const [demand, setDemand] = useState({});
    const [loading, setLoading] = useState(true);

    console.log(toJS(messages));

    useEffect(() => {
        axios.get(`${API_URL}/api/demand/${id}`, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            if (!res.data.success) {
                alert(res.data.message);
                history.push('/');
            }
            setDemand(res.data.demand);
            setMessage(res.data.message);
            setLoading(false);
        })
            .catch(e => {
                alert(e.message);
                history.push('/');
            })
    }, []);



    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {

        await axios.post(`${API_URL}/api/demand/message`, {
            ...values,
            id
        }, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then(async (result) => {
            console.log(result);
            if (result.data.success) {
                resetForm({});
                setMessage([...result.data.message]);
            }
            else {
                alert(result.data.message);
            }
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

    if (loading) { return <div>Yükleniyor</div> }
    console.log(demand);
    return (
        <Layout>
            <div className="container mt-3">
                {arr.length != 0 && arr.map((item) => <div className="alert alert-danger">{item}</div>)}
                {error != null && (<div className="alert alert-danger">{error}</div>)}

                <div className="card">
                    <div className="card-header">{demand.title}</div>
                    <div className="card-body">


                        <div className="demand-form">
                            <div className="form-group">
                                <p> Talep Durumu: {demand.status == 0 ? 'Açık' : 'Kapalı'}
                                    <hr />
                                    {demand.text}
                                    <br />
                                    <small>{demand.date}</small>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-2 mb-2">

                    {messages.map((item) => (
                        <li className="list-group-item" >
                            <b> {item.user.name}</b><br />
                            {item.text}<br />
                            <small>{item.date}</small>
                        </li>
                    ))}
                </div>

                { demand.status == 0 &&
                    <div className="card mt-5">
                        <div className="card-header">Açıklama Gönder</div>
                        <div className="card-body">


                            <Formik initialValues={{
                                text: '',
                            }}
                                onSubmit={_handleSubmit}
                                validationSchema={Yup.object().shape({
                                    text: Yup.string().required("Mesaj zorunludur"),
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
                                            <label>Mesajınız</label>
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
                                                className="button ">Gönder</button>
                                        </div>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </div>
                }
            </div >
        </Layout >
    )
}



export default inject("AuthStore")(observer(Demand));