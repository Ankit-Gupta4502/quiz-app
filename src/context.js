import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import Modal from './Modal'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const[waiting,setWaiting] = useState(true);
  const[loading, setloading] = useState(true);
  const [correct, setCorrect] = useState(0);
  const[index,setIndex] = useState(0);
  const [questions,setQuestions] = useState([]);
  const[error,setError] = useState(false);
  const[quiz,setQuiz] = useState({amount:10,category:'sports',difficulty:'easy'})
  const [isModalOpen,setIsModalOpen] = useState(false)

  const fetchQuestions= async(url)=>{
    setloading(true)
    setWaiting(false)
   const response =  await axios(url).catch(()=>console.log(error));
   if (response) {
     const data = response.data.results
     if (data.length>0) {
       setQuestions(data)
       setloading(false)
       setWaiting(false)
       setError(false)
       console.log(data);
    }
    else{
      setWaiting(true)
      setError(true)
    }
  } 
   else {
     setWaiting(true)
   }
  }
  const nextQuestion=()=>{
    setIndex(()=>{
      if (index===questions.length-1) {
        openModal()
        return 0
      }
      else{
        return index+1
      }
    })
  }

  const correctAnswer=(answer)=>{
    if (answer) {
      setCorrect(correct+1)
    }
    nextQuestion()
  }

  const openModal=()=>{
    setIsModalOpen(true)
  }

  const closeModal=()=>{
    setIsModalOpen(false)
    setWaiting(true)
    setCorrect(0)
  }
 
 const handleChange=(e)=>{
  const name = e.target.name
  const value = e.target.value
  setQuiz(...{[name]:value})
 }

 const handleSubmit=(e)=>{
  e.preventDefault()
  fetchQuestions(
    `${API_ENDPOINT}amount=${quiz.amount}&difficulty=${quiz.difficulty}&category=${table[quiz.category]}&type=multiple`
  );
 }

  return <AppContext.Provider value={{error,waiting,loading,isModalOpen,questions,correct,index,nextQuestion,correctAnswer,closeModal,handleChange,handleSubmit,quiz}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
