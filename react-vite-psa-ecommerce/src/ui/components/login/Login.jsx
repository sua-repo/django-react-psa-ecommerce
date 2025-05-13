import { useEffect, useState } from 'react';
import '/src/assets/login/css/login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

//dev_5_fruits
const Login = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    //dev_9_1_fruits
    const { login, getUser } = useAuth()

    const handleLogin = async (event) => {
        event.preventDefault()

        try{
            await login(username,password);
            alert("✅ 로그인 성공")
            //로그인 성공후 루트로 이동
            navigate("/") //windows.location.href = "/"

        }catch(error){
            alert("로그인 실패 입니다." + error.message)
        }
    }
    

    //dev_9_1_Fruit
    useEffect(() => {        
        // Kakao SDK 초기화        
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY) 
        }
    }, [])
    
    const handleKakaoLogin = ()=>{
        
        if(!window.Kakao){
            console.log("카카오 모듈이 없습니다 ...")
            return
        }
        
        //카카오 인증
        //https://developers.kakao.com/docs/latest/ko/kakaologin/js

        window.Kakao.Auth.login({
            scope: 'profile_nickname, account_email', // 원하는 scope
            success: async function (authObj) {

                const kakaoAccessToken = authObj.access_token                
                console.log('Kakao Access Token:', kakaoAccessToken)               
                
                try {
                    
                    let response = await axios.post(`${import.meta.env.VITE_REQUEST_URL}/api/dj-rest-auth/kakao/`, {
                    access_token: kakaoAccessToken,
                    })
                    
                    console.log('로그인 성공',response.data)
                    
                    // JWT 저장 및 로그인 상태 업데이트 등
                    localStorage.setItem("access",response.data.access)
                    localStorage.setItem("refresh",response.data.refresh)
                    
                    //유저님 환영 합니다 - 처리
                    response = await getUser()
                    
                    console.log(response)
                    navigate("/") // ← 로그인 성공 후 홈으로 리다이렉트
                    
                } catch (error) {
                    console.error("카카오 로그인 실패", error)
                }

                



            }
        })

    }

    return (
        <div className="form-bg">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4 col-md-offset-4">
                    <div className="form-container">
                    {/* dev_9_1_Fruit */}
                    <div className="form-icon" onClick={handleKakaoLogin}>
                        <i className="fa fa-user" />
                    </div>
                    <h3 className="title">Login</h3>
                    <form className="form-horizontal">
                        <div className="form-group">
                        <label>username</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                        <div className="form-group">
                        <label>password</label>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <button type="button" className="btn btn-default" onClick={handleLogin}  >
                        Login
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login