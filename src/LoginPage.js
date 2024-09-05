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
  handleLogin = () => alert("Login function is not added"),
  googleLogin,
  captcha,
  handleForgotPassword = () =>
    alert("Forgot Password function / route is not added"),
  loading,
  disabled,
  handleRegisterRoute = () => alert("Register page route not added"),
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
          <label>Email</label>
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
          <label>Password</label>
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
        <div style={{ padding: 10 }}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              fontSize: 16,
            }}
          >
            <p>
              Don't have an account?
              <span
                style={{
                  cursor: "pointer",
                  paddingLeft: 5,
                }}
                onClick={handleRegisterRoute}
              >
                <u>Register here</u>
              </span>
            </p>
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={handleForgotPassword}
            >
              <u>Forgot Password?</u>
            </span>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
