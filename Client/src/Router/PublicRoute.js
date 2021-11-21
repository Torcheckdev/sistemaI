import {Route,Redirect} from 'react-router-dom';
import useUser from '../hooks/useUser';

//const user = {name:'bran',id:1234,rol:1};
//const user =null;
const rutas = [{rol:1,url :'/coordinacion'},{rol:2,url :'/alumno'}]
export default function PublicRouter({component:Component,...rest}){
    const {user} = useUser();
    return <Route{...rest}>
                {user===null ? <Component />
                    : <Redirect to={rutas.filter(ruta =>ruta.rol ===user?.rol).map(ruta =>ruta.url)[0]}/>
                }
            </Route>
}