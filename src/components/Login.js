import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth'

const Login = () => {
    const navigate = useNavigate()
    const [username, setUseranme] = useState("")
    const [password, setPassword] = useState("")
    const defautlValid = {
        isValdUserName: true,
        isValidPassword: true,
    }
    const [valid, setValid] = useState(defautlValid)
    const isValidInput = () => {
        setValid(defautlValid)
        if (!username) {
            toast.error("Vui lòng điền Username !")
            setValid({ ...defautlValid, isValdUserName: false })
            return false
        }
        if (!password) {
            toast.error("Vui lòng điền Password !")
            setValid({ ...defautlValid, isValidPassword: false })
            return false
        }
        return true;
    }
    const submitLogin = async () => {
        try {
            let check = isValidInput()
            if (check === true) {
                let user_data = { username, password }
                if (check) {
                    let res = await loginUser(user_data)
                    if (res.data.success === true) {
                        toast.success(`${res.data.message}`)
                        localStorage.setItem('user', res.data.user.email);
                        navigate('/')
                    }
                }
            }
        } catch (error) {
            console.log(error)
            if (error.response.data.detail) {
                toast.error(`${error.response.data.detail}`)
            }
        }
    }
    return (
        <div style={{ marginTop: '50px' }} className="container">
            <div className="container">
                <h3 style={{ textAlign: 'center' }}>Login</h3>
                <div>
                    <form autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">UserName:</label>
                            <input type="email" className="form-control"
                                aria-describedby="emailHelp" placeholder="Enter email"
                                value={username}
                                onChange={(event) => setUseranme(event.target.value)}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <button onClick={() => submitLogin()} style={{ marginTop: '20px' }} type="button" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login