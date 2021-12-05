/*import Login from './Components/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from './Components/Signup';*/
import { UserProvider } from './context/UserProvider';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Rutas from './Router/Rutas';
const options = {
  timeout: 10000,
  position: positions.TOP_CENTER,
  offset: '10px',
  transition: 'scale'
};

function App() {
  return (
  <div> 
  {/*<Router>
    <Switch>
      <Route  exact path="/">
      <Login/> 
       </Route>
    
       <Route  exact path="/signup">
      <Signup/> 
       </Route>

    </Switch>
  </Router>*/}
  
<UserProvider>
<Provider template={AlertTemplate} {...options}>
    <Rutas/>
  </Provider>
</UserProvider>

  </div>
  );
}

export default App;
