import React, { lazy, Suspense, useEffect } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import PrivateRoutes from "./PrivateRoutes";

const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Profile = lazy(() => import('./Profile'));
const Support = lazy(() => import('./Support'));


const AppRoutes = (props) => {

    useEffect(() => {
        props.AuthStore.get();
    }, []);
    return (
        <Suspense fallback={<div>fallback</div>}>
            <Switch>
                <PrivateRoutes exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/support" component={Support} />
            </Switch>
        </Suspense>)
};

export default inject("AuthStore")(observer(AppRoutes));