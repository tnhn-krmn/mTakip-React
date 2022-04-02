import React, { useState, useEffect } from "react";
import { inject, observer } from 'mobx-react';
import Layout from "../../components/Layout";
import axios from "axios";
import { API_URL } from "../config/app";
import { Link } from "react-router-dom";


const Home = (props) => {


    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/demand`, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            if (res.data.data) {
                setData(res.data.data);
            }
            else {
                alert(res.data.message);
            }
        }).catch(e => console.log(e))
    }, [])

    return (
        <Layout>

            <div className="container mt-3">
                <div className="card">
                    <div className="card-header">
                        <b>Taleplerim</b>
                    </div>
                    <ul className="list-group list-group-flush">
                        {data.length == 0 && <li className="list-group-item">Aktif Talebiniz Bulunamadı</li>}
                        {data.length > 0 && data.map((item) => (
                            <Link to={`/talep-detay/${item.id}`} style={{ textDecoration:'none' }}>
                                <li className="list-group-item" style={{ backgroundColor:( item.status == 1 ) ? '#F44336' : 'white', color: ( item.status == 1 ) ? 'white' : 'black' }}>
                                    {item.title}
                                    <span> ({item.count })</span>
                                </li>
                            </Link>

                        ))}
                    </ul>
                </div>
            </div>

        </Layout>)
}

export default inject("AuthStore")(observer(Home));