import React, { useState } from "react";
import styled from "styled-components";
import bg from "../../assets/cloud-bg.png";
import { useLogin } from "../../callback";
import { Button } from "../../components/button";
import TextField from "../../components/textField";
import { useAuth } from "../../context/authContext";

const Wrapper = styled.div`
  background: #dea5ea url(${bg}) no-repeat;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  > .content {
    max-width: 350px;
    width: 100%;
    background: #fff;
    padding: 20px;
    border-radius: 10px;

    > h3 {
      color: #46506d;
    }
  }
`;
const Error = styled.p`
  color: red;
  padding-bottom: 30px;
`;
export function AllLogin(props) {
  const login = useLogin();
   const { error: authError, setError: setAuthError } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setAuthError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Invalid password. Try again.");
      } else {
        console.log(error);
        setError("Something went wrong.Try again.");
      }
      setLoading(false);
    }
  };
  return (
    <>
      <Wrapper>
        <div className="content">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <TextField
              title="Email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              width={"90%"}
              type="email"
            />
            <TextField
              title="Password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              width={"90%"}
              type="password"
            />
            <Error>{error || authError}</Error>
            <Button type={"submit"} buttonType="primary" disabled={loading}>
              {loading === true ? "loading" : "Submit"}
            </Button>
          </form>
        </div>
      </Wrapper>
    </>
  );
}
