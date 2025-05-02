import { useState } from 'react';
import '/src/assets/login/css/login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const { login } = useAuth()

    // 동기 통신 async await
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await login(username, password);
            alert("로그인 성공입니다.")

            // 로그인 성공 후 루트로 이동
            navigate("/")   // windows.location.href = "/"
        }
        catch(error) {
            alert("로그인 실패입니다. " + error.message)
        }
    }

    return (
        <div className="form-bg">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-container">
                        <div className="form-icon">
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
                            <button type="button" className="btn btn-default" onClick={handleLogin}>
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