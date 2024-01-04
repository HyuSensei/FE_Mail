import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth'

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const defautlValid = {
    isVaildName: true,
    isVaildEmail: true,
    isValdUserName: true,
    isValidPassword: true,
  }
  const [valid, setValid] = useState(defautlValid)
  const isValidInput = () => {
    setValid(defautlValid)
    if (!name) {
      toast.error("Vui lòng điền Name !")
      setValid({ ...defautlValid, isVaildName: false })
      return false
    }
    if (!email) {
      toast.error("Vui lòng điền Email !")
      setValid({ ...defautlValid, isVaildEmail: false })
      return false
    }
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
  const submitRegister = async () => {
    try {
      let check = isValidInput()
      if (check === true) {
        let user_data = { email, username, password, name }
        if (check) {
          let res = await registerUser(user_data)
          if (res.data.success === true) {
            toast.success(`${res.data.message}`)
            navigate('/login')
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div style={{ marginTop: "50px" }} className="container">
      <div className="container">
        <h3 style={{ textAlign: "center" }}>Register</h3>
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Name:</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email:</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">UserName:</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              style={{ marginTop: "20px" }}
              type="button"
              className="btn btn-primary"
              onClick={() => submitRegister()}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
