import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteElement = ({onlyUnAuth = false, component}) => {
    const isAuthChecked = useSelector(store => store.login.isAuthChecked);
    const user = useSelector(store => store.user.user);
    const location = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: "/"}};
        return <Navigate to={from}/>
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" replacestate={{from: location}}/>;
    }

    return component;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = (props) => <ProtectedRouteElement onlyUnAuth={true} {...props}/>;