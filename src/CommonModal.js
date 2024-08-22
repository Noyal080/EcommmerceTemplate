import React from "react";
import { Button, Modal } from "semantic-ui-react";
const CommonModal = ({
  title,
  modalChildren,
  btnName,
  handleClose,
  open,
  onBtnPress,
}) => {
  return (
    <Modal open={open} onClose={handleClose} dimmer="inverted">
      <Modal.Header> {title} </Modal.Header>
      <Modal.Content>{modalChildren}</Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleClose}>
          {" "}
          Cancel{" "}
        </Button>
        {btnName && (
          <Button positive onClick={onBtnPress}>
            {" "}
            {btnName}{" "}
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
};

export default CommonModal;
