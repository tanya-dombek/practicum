import React from 'react';
import { useSelector } from '../../types/types';
import { Navigate, useLocation } from 'react-router-dom';
import { TUserType } from '../../types/types';

type ProtectedRouteProps = {
    onlyUnAuth?: boolean;
    component: JSX.Element;
}

const ProtectedRouteElement = ({onlyUnAuth = false, component}: ProtectedRouteProps): JSX.Element | null => {
    const isAuthChecked: boolean = useSelector(store => store.login.isAuthChecked);
    const user: TUserType = useSelector(store => store.user.user);
    const location = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: "/"}};
        return <Navigate to={from}/>
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }

    return component;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = (props: ProtectedRouteProps): JSX.Element => <ProtectedRouteElement onlyUnAuth={true} {...props}/>;