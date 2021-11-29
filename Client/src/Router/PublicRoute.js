import {Route,Redirect} from 'react-router-dom';
import useUser from '../hooks/useUser';


const rutas = [{rol:"moderator",url :'/coordinacion'},{rol:"ROLE_USER",url :'/alumno'}]
export default function PublicRouter({component:Component,...rest}){
    const {user} = useUser();
    console.log(user?.roles[0]);
    console.log(user?.roles[0]===rutas[1].rol);
    console.log(user);
    return <Route{...rest}>
                {user===null ? <Component />
                    : <Redirect to={rutas.filter(ruta =>ruta.rol ===user?.roles[0]).map(ruta =>ruta.url)[0]}/>
                }
            </Route>
}