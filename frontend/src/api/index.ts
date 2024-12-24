import axios from "axios";
import { RegisterProps } from "../types";

export const API = import.meta.env.VITE_SERVER_URL;


export const register = async ( { name, email, password, image }: RegisterProps ) => {

    try{

        const data = new FormData();

        data.append("name", name || "")
        data.append("email", email || "")
        data.append("password", password || "")
        data.append("image", image || "")

        const res = await axios.post(`${API}/register`, data);

        return res.data;

    }  catch(err){
         return err
    }
}

export const login = async ( { email, password }: RegisterProps ) => {

    try{

        const data = {
            email,
            password
        }

        const res = await axios.post(`${API}/login`, data);

        return res.data;

    }  catch(err){
         return err
    }
}

export const getQuestionnaire = async () => {

    try{

         const res = await axios.get(`${API}/`)

         return res.data;

    }  catch(err){
        return err
    }

}

export const activeQuestionnaire = async (status: boolean) => {
 
    try{

        const data = {
            status
        }

         const res = await axios.post(`${API}/active-questionnaire`, data);

         return res.data

    }  catch(err){
        return err
    }

}

export const uploadFile = async (image: File) => {
    try{

         const data = new FormData()
               data.append("image", image)

         const res = await axios.post(`${API}/upload-image`, data)      

         return res.data

    }  catch(e){
        return e
    }
}

export const uploadLink = async (title: string, value: string) => {
    try{

        const data = {
            title,
            value
        }

         const res = await axios.post(`${API}/upload-link`, data)      

         return res.data

    }  catch(e){
        return e
    }
}

export const addQuestion = async (question: string) => {
    try{
    
        const data = {
            question
        }
    
         const res = await axios.post(`${API}/add-question`, data)      
    
         return res.data
    
    }  catch(e){
        return e
    }
}

export const giveRate = async ( rating: number | string, id: string | number ) => {

    try{
    
        const data = {
            rating
        }
    
         const res = await axios.post(`${API}/rate/${id}`, data)      
    
         return res.data
    
    }  catch(e){
        return e
    }

}

export const givAnswer = async ( answer: number | string, id: string | number ) => {

    try{
    
        const data = {
            answer
        }
    
         const res = await axios.post(`${API}/add-answer/${id}`, data)      
    
         return res.data
    
    }  catch(e){
        return e
    }

}