import { AuthContext } from "@/Context/AuthContext";
import { useContext } from "react";
export default function useAuth(){
    try {
        let auth=useContext(AuthContext);
        if(!auth)throw new Error('UseAuth throwing error from its hook');
        return auth;
        
    } catch (error) {
        console.log("Error in useAuth: " , error);
    }
}