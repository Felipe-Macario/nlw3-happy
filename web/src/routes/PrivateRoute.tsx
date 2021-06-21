import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';

interface RouteProps { 
    children: React.ReactNode;
    [x: string]: any;
}

function PrivateRoute({ children, ...rest }: RouteProps){
    const { signed } = useAuth();

    return (
      <Route {...rest} render={({ location }) => {
        return signed
          ? children
          : <Redirect to={{
              pathname: '/',
              state: { from: location }
            }} />
      }} />
    )
}

export default PrivateRoute;