import React from "react";
import { inject, observer } from 'mobx-react';

const Home = (props) =>
{
    console.log(props);
    return (<div className="row login">Anasayfa</div>)
}

export default inject("AuthStore")(observer(Home));