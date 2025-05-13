import { getCurrentUser, loginUser } from "@/api/AuthApi";
import { createContext, useContext, useState } from "react";

//dev_5_fruits
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) =>{

    const [user,setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));


    const login = async (username,password) => {
        try{
            const response = await loginUser(username,password)
            const {access,refresh} = response.data

            //저장 영역은 크게 4 가지 정도 있음
            //1.local storage 2.session storage 3.cookie 
            localStorage.setItem("access",access)
            localStorage.setItem("refresh",refresh)
            setAccessToken(access)

            //로그인이 된후 로그인 정보를 받아서 어디서든 로그인 정보를 공유 할수 있게 함
            await getUser()

        }catch(error){
            console.error("로그인 실패",error)
            throw error;
        }
    }
        
    const getUser = async () => {
        try{
            const response = await getCurrentUser()
            setUser(response.data)
            console.log(response.data)

        }catch(error){
            console.error("사용자 정보 받아오기 실패",error)
            logout()
        }
    }

    //로그아웃시 로컬에 저장된 access 토큰과 refresh 토큰을 삭제만 하면됨
    const logout= () =>{
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

         //dev_7_fruits
        //localStorage.removeItem("cart");       
    }


    const value ={
        logout,
        login,
        accessToken,
        user,
        getUser, //dev_9_1_fruits
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}