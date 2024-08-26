import React, { useState } from "react";
import { Button, Container, Form, Input, Message } from "semantic-ui-react";

const ForgotPassword = ({ handleSubmit, loading, disabled }) => {
  const [formData, setFormData] = useState({
    password: "",
    retype_password: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
    if (name === "password" || name === "retype_password") {
      setPasswordsMatch(
        formData.password === value || formData.retype_password === value
      );
    }
  };
  return (
    <Container text>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Field>
          <label style={{ color: "black" }}>Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
          />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "black" }}>Retype Password</label>
          <Input
            type="password"
            name="retype_password"
            value={formData.retype_password}
            onChange={handlePasswordChange}
          />
        </Form.Field>
        {!passwordsMatch && (
          <Message negative>
            <Message.Header>Passwords do not match</Message.Header>
            <p>Please make sure the passwords match.</p>
          </Message>
        )}
        <Button
          type="submit"
          primary
          fluid
          size="large"
          disabled={disabled}
          loading={loading}
          onClick={() => handleSubmit(formData)}
        >
          Reset Password
        </Button>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
