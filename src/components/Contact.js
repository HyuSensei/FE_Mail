import React, { useState } from "react";
import { toast } from 'react-toastify';
import { sendContact } from "../services/contact"
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [email, SetEmail] = useState("")
  const [content, setContent] = useState("")
  // const [file, setFile] = useState(null)
  const defautlValid = {
    isVaildName: true,
    isVaildEmail: true,
    isValdTitle: true,
    isValidContent: true,
    // isValidFile: true,
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
    if (!title) {
      toast.error("Vui lòng điền Title !")
      setValid({ ...defautlValid, isValdTitle: false })
      return false
    }
    if (!content) {
      toast.error("Vui lòng điền Content !")
      setValid({ ...defautlValid, isValidContent: false })
      return false
    }
    // if (!file) {
    //   toast.error("Vui lòng nhập File !")
    //   setValid({ ...defautlValid, isValidFile: false })
    //   return false
    // }
    return true;
  }
  const submitContact = async () => {
    try {
      const isLoggedIn = localStorage.getItem('user');
      if (!isLoggedIn) {
        toast.warning("Vui lòng đăng nhập !");
        navigate('/login')
        return
      }
      let check = isValidInput()
      if (check === true) {
        let data = {
          name: name,
          title: title,
          email: email,
          content: content,
          // file: file
        }
        console.log("data contact:", data)
        let res = await sendContact(data)
        if (res.data.success === true) {
          toast.success(`${res.data.message}`)
          setName("")
          setTitle("")
          SetEmail("")
          setContent("")
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{ marginTop: "50px" }} className="container">
      <div className="container">
        <h3 style={{ textAlign: "center" }}>Contact</h3>
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
              <label htmlFor="exampleInputEmail1">Title:</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
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
                onChange={(event) => SetEmail(event.target.value)}
              />
            </div>
            <br />
            {/* <div className="form-group">
              <label htmlFor="exampleInputEmail1">File:</label>
              <input
                type="file"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </div> */}
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Content:</label>
              <textarea
                style={{ height: "200px" }}
                className="form-control"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></textarea>
            </div>
            <button
              style={{ marginTop: "20px" }}
              type="button"
              className="btn btn-primary"
              onClick={() => submitContact()}
            >
              Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
