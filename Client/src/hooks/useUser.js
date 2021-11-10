import { useContext } from "react";
import  UserContext  from "../context/UserProvider";


export default function useUser(){
    const user =useContext(UserContext);
    return user;
}