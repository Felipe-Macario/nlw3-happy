import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';
import SignIn from '../pages/SignIn';
import SignInSuccess from '../pages/SignInSuccess';
import SignInFailed from '../pages/SignInFailed';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/signin" component={SignIn} />
                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
                <Route path="/failed" component={SignInFailed} />
                <PrivateRoute path="/success" >
                  <SignInSuccess />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;