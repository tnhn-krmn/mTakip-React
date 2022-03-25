import React, { lazy, Suspense } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Profile = lazy(() => import('./Profile'));
const Support = lazy(() => import('./Support'));


const AppRoutes = () => {
    return (
        <Suspense fallback={<div>fallback</div>}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/support" component={Support} />
            </Switch>
        </Suspense>)
};

export default AppRoutes;