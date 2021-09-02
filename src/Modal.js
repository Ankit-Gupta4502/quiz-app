import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const{isModalOpen,closeModal,questions,correct} = useGlobalContext()
  return <div className={isModalOpen?'modal-container isOpen':'modal-container'}>
      <div className="modal-content">
        <h2>
          Congrats
        </h2>
        <p>You answered correctly {((correct/questions.length)*100).toFixed(0)}% of questions</p>
        <button className='close-btn' onClick={closeModal}>
          play again
        </button>
      </div>
  </div>
}

export default Modal
