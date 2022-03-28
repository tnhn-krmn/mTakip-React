import React from "react";
import { inject, observer } from 'mobx-react';
import Layout from "../../components/Layout";

const Home = (props) => {
    
   

    return (
        <Layout>
            <div className="row login">Anasayfa</div>
          
        </Layout>)
}

export default inject("AuthStore")(observer(Home));