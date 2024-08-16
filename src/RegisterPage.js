import React, { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Input,
  Message,
} from "semantic-ui-react";

const RegisterPage = ({
  profileOptions,
  captcha,
  handleRegister,
  handleForgotPassword,
  disabled,
  loading,
}) => {
  const INIT_STATE = {
    profile_type: "GENERAL",
    first_name: "",
    last_name: "",
    business_name: "",
    email: "",
    password: "",
    retype_password: "",
  };
  const [formValues, setFormValues] = useState(INIT_STATE);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleProfileTypeChange = (e, { value }) => {
    setFormValues({ ...formValues, profile_type: value });
  };
  const handlePasswordChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
    if (name === "password" || name === "retype_password") {
      setPasswordsMatch(
        formValues.password === value || formValues.retype_password === value
      );
    }
  };
  return (
    <Container text>
      <h2 style={{ color: "black" }}>Register a new account</h2>
      <Form onSubmit={(e) => e.preventDefault()}>
        {profileOptions && (
          <Form.Field>
            <label style={{ color: "black" }}>Profile Type</label>
            <Dropdown
              placeholder="Select Profile Type"
              fluid
              selection
              value={formValues.profile_type}
              options={profileOptions}
              onChange={handleProfileTypeChange}
            />
          </Form.Field>
        )}

        {(formValues.profile_type === "GENERAL" ||
          formValues.profile_type === "PERSONAL") && (
          <Form.Group widths="equal">
            <Form.Field>
              <label style={{ color: "black" }}>First Name</label>
              <Input
                name="first_name"
                value={formValues.first_name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "black" }}>Last Name</label>
              <Input
                name="last_name"
                value={formValues.last_name}
                onChange={handleChange}
              />
            </Form.Field>
          </Form.Group>
        )}

        {(formValues.profile_type === "BUSINESS" ||
          formValues.profile_type === "SUPPLIER") && (
          <Form.Field>
            <label style={{ color: "black" }}>Business Name</label>
            <Input
              name="business_name"
              value={formValues.business_name}
              onChange={handleChange}
            />
          </Form.Field>
        )}
        <Form.Field>
          <label style={{ color: "black" }}>Email</label>
          <Input
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "black" }}>Password</label>
          <Input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handlePasswordChange}
          />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "black" }}>Retype Password</label>
          <Input
            type="password"
            name="retype_password"
            value={formValues.retype_password}
            onChange={handlePasswordChange}
          />
        </Form.Field>

        {!passwordsMatch && (
          <Message negative>
            <Message.Header>Passwords do not match</Message.Header>
            <p>Please make sure the passwords match.</p>
          </Message>
        )}
        <Form.Field>
          <div style={{ padding: 10, backgroundColor: "white" }}>
            {captcha && (
              <>
                <label style={{ color: "black" }}>Human Verification</label>
                {captcha}
              </>
            )}
            <br />
            <Button
              type="submit"
              primary
              fluid
              size="large"
              disabled={disabled}
              loading={loading}
              onClick={() => handleRegister(formValues)}
            >
              Register
            </Button>
            <br />
            <span
              style={{
                cursor: "pointer",
                fontSize: 16,
              }}
              onClick={handleForgotPassword}
            >
              {" "}
              <u>Forgot Password?</u>{" "}
            </span>
          </div>
        </Form.Field>
      </Form>
    </Container>
  );
};

export default RegisterPage;
