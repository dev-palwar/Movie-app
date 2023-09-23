import React, { useState } from "react";
import "../Styles/Modal.scss"
import Player from "./Player";

function Modal({id, playVideo}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <div className="videoButton btn-modal" onClick={toggleModal}>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <Player id={id}/> 
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;