import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { login } from "../services/auth";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 && password2) {
      if (await login(password1, password2)) {
        setIsCorrect(true);
        onLogin();
      } else {
        setIsCorrect(false);
      }
    }
  };

  return (
    <Card className="login-card shadow">
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Eri Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            placeholder="Camilein Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="login-btn">Login</Button>
      </Form>
      {isCorrect === false && <p className="error-msg">Incorrect, try again!</p>}
    </Card>
  );
};

export default Login;
