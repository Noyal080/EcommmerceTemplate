import React from "react";
import { Button, Modal } from "semantic-ui-react";
const CommonModal = ({
  title,
  children,
  btnName,
  handleClose,
  open,
  onBtnPress,
  size = "large",
}) => {
  return (
    <Modal open={open} onClose={handleClose} dimmer="inverted" size={size}>
      <Modal.Header> {title} </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
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
