import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BtnCerrarSeccion from '../Components/BtnCerrarSeccion';
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

                <BtnCerrarSeccion/>

                <Switch>
                
                <Route path="/" exact component={Home }/>

                <PrivateRouter exact path="/dashboard" component={Dashboard} rol ={1} />
                
                <PrivateRouter exact path="/coordinacion" component={Coordinacion} rol ={1} />

                <PrivateRouter exact path="/alumno" component={Alumno} rol ={2}/>


                <PublicRoute exact path="/login" component={Login }/>
                
                <Route path="*"  component={NotFoundPage }/>
                   
                </Switch>


            </Router> );
}

export default Rutas;