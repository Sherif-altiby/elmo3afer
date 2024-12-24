import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { RegisterProps } from "../types";
import { login } from "../api";
import Loader from "./Loader";

const Login = () => { 
 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState(false)
  
  const { mutate, isPending} = useMutation({
    mutationFn: ( { email, password}: RegisterProps ) => login( { email, password} ),
    onSuccess: (data) => {
        if(data.status === true){
          navigate(`/?userId=${data.user._id}`)
        }else{
          setErr(true)
        }
    },
  });


  const handleSubmit = (e: React.FormEvent) => {
     
    e.preventDefault();

    if( email.trim().length  && password.trim().length){

        const data = {
          email,
          password
        }

         mutate(data)

    }
  }
   

  return (
    <div className="register" >
          <div className="card">
            {isPending && <Loader />}
            
            { err && <div className="error" >  خطأ في البريد الالكتروني او كلمة المرور </div> }
                   <h2> تسجيل الدخول  </h2>

                   <form onSubmit={handleSubmit} >

                        <input type="text" placeholder="البريد الالكتروني" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <input type="password" placeholder="كلمة المرور" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit" > تسجيل </button>
                   </form>

                   <p>  ليس لديك حساب ؟  <Link to={'/register'} >    انشاء حساب  </Link> </p>
          </div>
    </div>
  )
}

export default Login