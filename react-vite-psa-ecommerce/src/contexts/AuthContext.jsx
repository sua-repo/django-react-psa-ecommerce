import { getCurrentUser, loginUser } from "@/api/AuthApi";
import { createContext, useContext, useEffect, useState }  from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));

    // 새로고침 시 access token 있으면 자동으로 유저 정보 가져오기
    useEffect(() => {
        const access = localStorage.getItem("access");

        // access가 바뀌는 경우에도 user 없으면 getUser 실행
        if (access && !user) {
        getUser();  // 사용자 정보 받아오기
        }

    }, [accessToken]);


    const login = async (username, password) => {
        try {
            const response = await loginUser(username, password)
            const { access, refresh } = response.data

            // 저장 영역은 크게 4가지
            // local storage / session storage / cookie / 메모리 저장 / 파일로 저장(x)
            localStorage.setItem("access", access)
            localStorage.setItem("refresh", refresh)
            setAccessToken(access)

            // 로그인이 된 후 로그인 정보를 받아서 어디서든 로드인 정보를 공유할 수 있게 함
            // await getUser() 구현 예정 → 구현 완료
            await getUser()
        }
        catch(error) {
            console.error("로그인 실패", error)
            throw error;
        }
    }

    const getUser = async () => {
        try {
            const response = await getCurrentUser()
            setUser(response.data)
            console.log(response.data)
        }
        catch (error) {
            console.error("사용자 정보 받아오기 실패", error)
            logout()
        }
    }

    // 로그아웃 시 로컬에 저장된 access, refresh 토큰을 삭제만 하면 됨
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")

        // 로그아웃 시 카트도 삭제
        localStorage.removeItem("cart");
    }

    const value = {
        logout,
        login, 
        accessToken,
        user
    }

    return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
}