import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { activeQuestionnaire, addQuestion, API, getQuestionnaire, uploadFile, uploadLink } from "../api"
import Loader from "./Loader"
import { ChangeEvent, useState } from "react";
import { User } from "../types";
import userImage from "../assets/user.jpg"

const Admin = () => {

    const queryClient = useQueryClient();

    const [linkName,  setLinkName]  = useState("")
    const [linkValue, setLinkValue] = useState("")
    const [question,  setQuestion]  = useState("")
 
    const { data, isPending } = useQuery({
      queryKey: ["questionnaire"],
      queryFn: getQuestionnaire
    })

    const { mutate, isPending: actPending } = useMutation({
     mutationFn: ( status: boolean ) => activeQuestionnaire(status),
     onSuccess: () => {
         queryClient.invalidateQueries({queryKey: ["questionnaire"]})
       }
    })

    const { mutate: unActMutat, isPending: unActPending } = useMutation({
     mutationFn: ( status: boolean  ) => activeQuestionnaire(status),
     onSuccess: () => {
         queryClient.invalidateQueries({queryKey: ["questionnaire"]})
       }
    })

    const { mutate: fileMutate, isPending: filePending } = useMutation({
     mutationFn: ( image: File ) => uploadFile(image),
    })

    const { mutate: linkMutate, isPending: linkPending } = useMutation({
     mutationFn: (  {title, value}: {title: string, value: string} ) => uploadLink(title, value),
    })

    const { mutate: qMutate, isPending: qPending } = useMutation({
     mutationFn: ( question: string ) => addQuestion(question),
     onSuccess: (data) => {
      console.log(data)
     }
    })

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0] || null;
      if(selectedFile){
        fileMutate(selectedFile) 
      }
    }

    const uploadingLink = () => {
      const data = {
        title: linkName,
        value: linkValue
      }

      if(linkName.trim().length > 0 && linkValue.trim().length > 0){
         linkMutate(data)
      }

      setLinkName("")
      setLinkValue("")
    }


    const uploadQuestion = () => {
      if(question.trim().length > 0){
         qMutate(question)
      }

      setQuestion("")
    }

  return (
    <div>
         <div className="ctmc-flx">
                
                  <div className="admin-actions">
                     <div className="card">
 
                              {isPending  &&  <Loader /> }
                              {actPending &&  <Loader /> }
                              {unActPending &&  <Loader /> }

                             <div className="ctm-stat">
                                <p> حالة الاستبيان:  </p>
                                <span> { data?.questionnaire.status  ?  "مفتوح"  : "مغلق"} </span>
                             </div>

                             <div className="btns">
                                { data?.questionnaire.status ? 
                                    (<button onClick={() => {
                                      unActMutat(false)
                                    }} > غلق </button> ) : 
                                    (<button onClick={() => {
                                      mutate(true)
                                    }} > فتح </button> ) 
                                }
                             </div>

                     </div>

                     <div className="card">
                         { filePending && <Loader /> }
                         <label htmlFor="img"> اضف صورة الجدول </label>
                         <input onChange={handleFile} type="file" id="img" />

                     </div>

                     <div className="card">
                           {linkPending && <Loader />}
                          <p className="link-title" > اضف لينك </p>
                          <input value={linkName} onChange={(e) => setLinkName(e.target.value)} type="text" placeholder="اسم اللينك" />
                          <input value={linkValue} onChange={(e) => setLinkValue(e.target.value)} type="text" placeholder="اللينك" />
                          <button onClick={uploadingLink} > اضف </button>
                     </div>

                     <div className="card n-m">
                           {qPending && <Loader />}
                          <p className="link-title" > اضف سؤال </p>
                          <input value={question} onChange={(e) => setQuestion(e.target.value)} type="text" placeholder="  السؤال" />
                          <button onClick={uploadQuestion} > اضف </button>
                     </div>
                  </div>

                  <div className="users-container">
                      <div className="card">
                           { isPending && <Loader />}
                           { data?.questionnaire.users.map((user: User, index: number) => (
                               <div className="user-card" key={user._id} >
                                     <div className={`admin-user ${user.answer && "border"}`} >
                                        <span> ({ index + 1 }) </span>
                                          <img src={user.image ? `${API}/${user.image.replace(/\\/g, '/')}` : userImage} alt="" />
                                        <p> {user.name} </p>
                                        <p> ( {user.currentAverage.toFixed(2) } / 10 ) </p>
                                     </div>
                                     <p> {user.answer ? user.answer : null} </p>
                               </div>
                           ))}
                      </div>
                  </div>

         </div>
    </div>
  )
}

export default Admin