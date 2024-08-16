import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
} from "semantic-ui-react";

const LoginPage = ({
  handleLogin,
  googleLogin,
  captcha,
  handleForgotPassword,
  loading,
  disabled,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <Container text>
      <Header as={"h2"} textAlign="center">
        Login
      </Header>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Field>
          <label style={{ color: "white" }}>Email</label>
          <input
            type="text"
            placeholder="Enter email"
            value={formData?.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "white" }}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={formData?.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </Form.Field>
        <div style={{ padding: 10, backgroundColor: "white" }}>
          {captcha && captcha}
          <br />
          <Button
            primary
            fluid
            size="large"
            onClick={() => handleLogin(formData)}
            loading={loading}
            disabled={disabled}
          >
            Login
          </Button>
          {googleLogin && (
            <>
              <Divider horizontal> Or </Divider>
              <Button
                color="google plus"
                fluid
                size="large"
                onClick={googleLogin}
              >
                <Icon name="google" />
                Sign in with Google
              </Button>
            </>
          )}
          <br />
          <span
            style={{
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={() => handleForgotPassword()}
          >
            {" "}
            <u>Forgot Password?</u>{" "}
          </span>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
