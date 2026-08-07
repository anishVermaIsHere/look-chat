import axios from "axios"
import { AppConfig } from "@/config/app-config";
import type { LoginSchema } from "@/schemas/common"


async function login(credentials: LoginSchema){
    try {
        return await axios.post(`${AppConfig.baseUrl}/api/v1/auth/login`, credentials, { withCredentials: true });
    } catch (error) {
        console.log('ERROR', error)
    }
}


async function logout(){
    
};

async function refresh(){
    return 
};


export {
    login,
    logout,
    refresh
};