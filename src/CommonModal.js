import React from "react";
import { Button, Modal } from "semantic-ui-react";
const CommonModal = ({ title, modalChildren, btnName, handleClose, open }) => {
  return (
    <Modal open={open} onClose={handleClose} dimmer="inverted">
      <Modal.Header> {title} </Modal.Header>
      <Modal.Description>{modalChildren}</Modal.Description>
      <Modal.Actions>
        <Button negative onClick={handleClose}>
          {" "}
          Cancel{" "}
        </Button>
        <Button positive onClick={onBtnPress}>
          {" "}
          {btnName}{" "}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CommonModal;
