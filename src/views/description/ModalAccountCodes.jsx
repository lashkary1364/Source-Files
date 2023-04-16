import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const ModalAccountCodes = ({ modalProp }) => {

  const [modal, setModal] = useState(false);
  
  useEffect(() => {
    setModal(modalProp)
  }, []);
 
  
  console.log("modalProp: " + modalProp)
  const { className } = PropTypes.string;

  setModal(modalProp)
  console.log("modal : " + modal)
  console.log("modalProp: " + modalProp)
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(true);

  const toggle = () => {
    setModal(false);
    console.log("modalProp")
    console.log(modalProp)
  }

  const changeBackdrop = (e) => {
    let { value } = e.target;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    setBackdrop(value);
  };

  const changeKeyboard = (e) => {
    setKeyboard(e.currentTarget.checked);
  };

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );
  return (
    <Modal
      isOpen={modal}
     
      className={className}
      backdrop={backdrop}
      keyboard={keyboard}
    >
      <ModalHeader  close={closeBtn}>
        Modal title
      </ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" >
          Do Something
        </Button>{' '}
        <Button color="secondary" >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>

  )
}




