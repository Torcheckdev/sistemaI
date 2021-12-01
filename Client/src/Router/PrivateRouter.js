import {Route,Redirect} from 'react-router-dom';
import useUser from '../hooks/useUser';

//const user = {name:'bran',id:1234,rol:1};
//const user =null;

export default function PrivateRouter({component:Component,rol,...rest}){
   const {user} = useUser();
   console.log(rol);
   console.log(user);
    return <Route{...rest}>
                {user?.roles[0] === rol ? <Component />
                    : <Redirect to="/login"/>
                }
            </Route>
}