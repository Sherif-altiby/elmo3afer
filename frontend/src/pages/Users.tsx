import img from "../assets/table.jpg";
import img1 from "../assets/img-1.jpg"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API, getQuestionnaire, givAnswer, giveRate } from "../api";
import Loader from "./Loader";
import { FormEvent, useEffect, useState } from "react";
import { LinkProps, User } from "../types";
import { useNavigate } from "react-router-dom";
import mo3afer from '../assets/main.jpg'

const Users = () => {

      const badeMessage = "لاحظت ان تقييمك بيقل يا صديقي و حابب افكرك ان عندك حلم يستاهل تتعب عشانة";
      const goodMessage = "لاحظت ان مستواك يتقدم. بسم الله ما شاء الله"

      
      const navigate = useNavigate()
      
      const queryClient = useQueryClient()
      const userId = localStorage.getItem("userId") ;

      const [topUsers, setTopUsers] = useState<User[]>([]);
      const [currentUser, setCurrentUser] = useState<User>();

      const [rate, setRate]  =  useState<number | string>('');
      const [answer, setAnswer]  =  useState('');

      useEffect(() => {
              if( !localStorage.getItem("user_loged_in") ){
                    navigate('/register')
              }
      }, [userId])

     
      const { data, isPending } = useQuery({
            queryKey: ["questionnaire"],
            queryFn: getQuestionnaire,
      });

      const { mutate, isPending: ratePending } = useMutation({
            mutationFn: ( {rating, id}: {rating: string | number, id: string | number} ) => giveRate( rating, id),
            onSuccess: (data) => {
                  queryClient.invalidateQueries({queryKey: ["questionnaire"]});
                  console.log(data)
            }
      })

      const { mutate: AnswerMutate, isPending: answerPending } = useMutation({
            mutationFn: ( {answer, id}: {answer: string | number, id: string | number} ) => givAnswer( answer, id),
            onSuccess: (data) => {
                  queryClient.invalidateQueries({queryKey: ["questionnaire"]});
                  console.log(data)
            }
      })


      useEffect(() => {
            if (data) {
                  const userList = data.questionnaire.users;
                  setCurrentUser(userList.find((user: User) => user._id === JSON.parse(userId || "")));
                  const sorted = [...userList].sort((a, b) => Number(b.currentAverage) - Number(a.currentAverage));
                  setTopUsers(sorted);
            }
      }, [data]);


      const handleRating = (e: FormEvent) => {
             e.preventDefault();

             if( typeof(+rate) == "number"  && +rate <= 10 ){
 
                  const data = {
                        rating: rate,
                        id: JSON.parse(userId || "")
                  }

                mutate(data);

                setRate("")
             }
      }

      const handleAnswer = (e: FormEvent) => {
             e.preventDefault();
             
             if( answer.trim().length > 0 ){ 
                  const data = {
                        answer: answer,
                        id: JSON.parse(userId || "")
                  }

                  AnswerMutate(data);

                setAnswer("")
             }
      }

  return (
   <div className="ctm-relative" >
         
        { isPending && <Loader /> }  
        <div className="ctmc-flx">
             
             <div className="user-actions">
                 
                 <div className="top-rated-table">
                       <div className="txf-1" >

                        <div className="card">
                                <img src={img1} className="img-txt" alt="" />
                        </div>
                          
                       <div className="card">
                             <div className="top-rated-head">
                                 <h2> الاعلى تقييم </h2>

                                  <div className="icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trophy-fill" viewBox="0 0 16 16">
                                          <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>
                                      </svg>
                                  </div>
                             </div>
 
                              {!isPending && (
                                     topUsers.map((user, index) => (
                                          index < 5 && (
                                                <div key={index} className="user-top">
                                                      <p> ({index + 1}) </p>
                                                      <img src={ user.image ? `${API}/${user.image}` : img} alt="" />
                                                      <p>  {user.name} </p>
                                                      <p> ({user.rates.length})  ( {user.currentAverage.toFixed(2)} / 10) </p>
                                                      <div className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award-fill" viewBox="0 0 16 16">
                                                                  <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z"/>
                                                                  <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
                                                            </svg>
                                                      </div>
                                                </div>
                                          )
                                    )) 
                              )}
                       </div>
                       </div>
                       <div className="card">
                           <div className="t-img">
                                 {!isPending && ( <img src={API+"/"+data.questionnaire.image} alt="" /> )}
                           </div>
                       </div>
                 </div>

                 <div className="card">
                       <p className="txt"> تقييمك الحالي هو ( {currentUser?.currentAverage.toFixed(2)} / 10) </p>
                       <p className="txt"> ترتيبك الحالي هو ( {topUsers.map((user, index) => (
                          <span key={index} > {user._id == JSON.parse(userId || "") && index + 1} </span>
                       ))} ) </p>
                       <p className="danger">
                             {data && (
                                ( currentUser?.currentAverage ? currentUser.currentAverage : 0) > (currentUser?.lastAverage ? currentUser.lastAverage : 0) ? goodMessage : badeMessage 
                             )}
                       </p>
                 </div>

                {data?.questionnaire.status && (
                    <>
                         <div className="card">
                         {ratePending && (<Loader />)}
                        <form className="gve-rte" onSubmit={handleRating} >
                             <input 
                                    value={rate} 
                                    onChange={(e) => setRate(e.target.value)} 
                                    type="text "  
                                    placeholder="قيم نفسك من 10 " 
                              />
                             <button type="submit" > حفظ </button>
                        </form>
                 </div>

                 <div className="card">
                         {answerPending && <Loader />}
                        <p className="admin-question" > {!isPending && (data?.questionnaire.question)}  </p>
                        <form className="gve-rte" onSubmit={handleAnswer} >
                             <input 
                                 type="text"  
                                 placeholder="اجب عن السؤال" 
                                 value={answer}
                                 onChange={(e) => setAnswer(e.target.value)}
                              />
                             <button type="submit" > حفظ </button>
                        </form>
                 </div>
                    </>
                )}
                
             </div>

             <div className="user-text">
                  <div className="card owner">

                        <img src={mo3afer} alt="" className="mo3afer" />

                        <h2> 🛠️ أتمنى أسيب علامة تشفع لى يوم القيامة </h2>

                          <p>
                          ⚪
                              عن أَبِي هُرَيْرَةَ، أَنَّ رَسُولَ اللهِ صَلَّى اللهُ عَلَيْهِ
                              وَسَلَّمَ، قَالَ: إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَنْهُ
                              عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ: إِلَّا مِنْ صَدَقَةٍ جَارِيَةٍ
                              أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ .
                              رواه مسلم .
                          </p>

                          <p> ⚪ ومن منطلق ولست إلا راحلا يبتغى طيب الأثر كانت دى سبب إستمرار قناة المعافر لأنها ببساطة مساحة مميزة لكل الشباب وتحديداً الطلاب والطالبات اللي بيدوروا على الدعم والتوجيه عشان يحققوا أهدافهم ويكملوا رحلتهم بنجاح. بحاول أقدم محتوى هادف لكل الفئات وكذلك محتوى تعليمي شامل يساعد طلاب الثانوية العامة وطلاب الجامعات على فهم المواد وطبيعة الدراسة وكيفية المذاكرة بشكل مبسط ومنظم، مع نصايح عملية لتنظيم الوقت وزيادة الإنتاجية. </p>

                          <p> ⚪ عارف إن النجاح الدنيوى مش بس درجات، لكنه رحلة بتحتاج صبر ومثابرة، عشان كده بشارك معاكم نصايح لتحسين الروتين اليومي، وبنقدم جلسات "ذاكر معي" بنظام البومودورو لدعمكم في التركيز والمذاكرة لساعات طويلة. </p>

                          <p> ⚪ مش بس كده! الفلوجات و سلسلة قعدة صحاب بتفتح مساحة للحديث عن موضوعات الحياة، الشغل، العبادة، والطموح بطريقة بسيطة وبدون تكلف، عشان أشجع الشباب وأساعدهم يبقوا نسخ أفضل من نفسهم. </p>

                          <p> ⚪ هدفى إن  أنشر طاقة إيجابية في كل مكان وأثبت إن المعافرة هي طريق النجاح الحقيقي. </p>

                    </div>
             </div>

    </div>

    <div className="card">
         
         <h2 className="text-head" > اللينكات: </h2>

          {!isPending && (
              data?.questionnaire.links.map((link: LinkProps) => (
                  <a className="link-exre" 
                      href={link.value} 
                      key={link.title}
                      target="_blank"
                      rel="noopener noreferrer"
                  > 
                           {link.title} 
                  </a>
               ))
          )}
    </div>

   </div>
  )
}

export default Users