import React,{useState,useEffect} from 'react';

const UserContext = React.createContext();

const UserProvider = ({children})=>{


    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null//comprobamos que existe un item guardado para que cuando recargue la pagina la seccion siga iniciada
    );

    useEffect(()=>{
        try{//lo podemos en un try catch porque luego puede exitir errores con el localstorage por el dispositivo
            localStorage.setItem("user",JSON.stringify(user));
        }catch(e){
            localStorage.removeItem('user');//borramos el item por si hay un error es buena practica
        }
    },[user]);

    const iniciarSeccion=(usuario)=>{
        setUser(usuario);
    }
    const cerrarSeccion=()=>{
        setUser(null);
    }
    const data ={user,iniciarSeccion,cerrarSeccion}

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )


}

export default UserContext;
export {UserProvider};