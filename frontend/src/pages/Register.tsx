import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api";
import { RegisterProps } from "../types";
import { useState } from "react";
import Loader from "./Loader"


const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File>()
  
  const { mutate, isPending, error} = useMutation({
    mutationFn: ( {name, email, password, image}: RegisterProps ) => register( {name, email, password, image} ),
    onSuccess: (data) => {
        if(data.status === true){
           localStorage.setItem("user_loged_in", "true")
           localStorage.setItem("userId", JSON.stringify(data.data._id))
           navigate(`/?userId=${data.data._id}`)
        }
    },
  });


  const handleSubmit = (e: React.FormEvent) => {
     
    e.preventDefault();

    if(name.trim().length > 0 && email.trim().length  && password.trim().length ){

        const data = {
          name,
          email,
          password,
          image: file
        }

         mutate(data)
    }
  }
   
  return (
    <div className="register" >
          <div className="card">
            { isPending && <Loader /> }
            { error && <div className="error" > حاول مرة اخري </div> }
                   <h2> قم بإنشاء حساب </h2>

                   <form onSubmit={handleSubmit} >
                        <input type="text" placeholder="الاسم" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />

                        <input type="text" placeholder="البريد الالكتروني" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <input type="password" placeholder="كلمة المرور" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <label className="d-input">
                             <input type="file" 
                             onChange={(e) => {
                               if(e.target.files){
                                  setFile(e.target.files[0])
                               }
                             }}
                              placeholder="الصورة الشخصية" />
                             <p> {file ? file.name : "الصورة الشخصية (اختياري)"} </p>
                        </label>

                        <button type="submit" > تسجيل </button>
                   </form>

                   <p> لديك حساب بالفعل ؟ <Link to={'/login'} >  تسجيل الدخول  </Link> </p>
          </div>
    </div>
  )
}

export default Register