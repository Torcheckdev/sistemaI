import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Administracion from '../pages/Administracion';
import Alumno from '../pages/Alumno';
import Coordinacion from '../pages/Coordinacion';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRouter from './PrivateRouter';
import PublicRoute from './PublicRoute';


function Rutas() {


    return ( 
    
            <Router>

               
               
                <Switch>
                
                <Route path="/" exact component={Home }/>

                <PrivateRouter exact path="/dashboard" component={Dashboard} rol ={"ROLE_MODERATOR"} />
                
                <PrivateRouter exact path="/coordinacion" component={Coordinacion} rol ={"ROLE_MODERATOR"} />

                <PrivateRouter exact path="/alumno" component={Alumno} rol ={"ROLE_USER"}/>

                <PrivateRouter exact path="/administracion" component={Administracion} rol ={"ROLE_ADMIN"}/>

                <PublicRoute exact path="/login" component={Login}/>
                
                <Route path="*"  component={NotFoundPage }/>
                   
                </Switch>


            </Router> );
}

export default Rutas;