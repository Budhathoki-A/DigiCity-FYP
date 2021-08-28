import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/button";
import TextField from "../../components/textField";
import bg from "../../assets/cloud-bg.png";
import { useAddContent, useSignUp } from "../../callback";
import { authority } from "../../utils/info";

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
`;

export function ParentsSignup(props) {
  const signUp = useSignUp();
  const addUser = useAddContent();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null)
    if (password === confirmPassword) {
      try {
        setLoading(true)
        const user = await signUp(email, password);
        console.log(user.additionalUserInfo.isNewUser);
        if (user.additionalUserInfo.isNewUser) {
          const finalUser = {
            id: user.user.uid,
            fullname,
            email,
            auth: authority.parents,
          };
          await addUser("users", finalUser);
          setLoading(false)
        }
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setError("Email address already in used with other account.");
        } else {
          setError("Something went wrong.");
        }
        setLoading(false)
      }
    } else {
      setError("Password do not match.");
      
    }
  };
  return (
    <>
      <Wrapper>
        <div className="content">
          <h3>Parents Login</h3>
          <form onSubmit={handleSignUp}>
            <TextField
              title="Email"
              type="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              width={"100%"}
              required={true}
            />
            <TextField
              title="Full name"
              value={fullname || ""}
              onChange={(e) => setFullname(e.target.value)}
              width={"100%"}
              required={true}
            />
            <TextField
              title="Password"
              type="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              width={"100%"}
              required={true}
            />
            <TextField
              title="Re-enter  Password"
              type="password"
              value={confirmPassword || ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              width={"100%"}
              required={true}
            />
            <Error>{error}</Error>
            <Button buttonType="primary" disabled={loading}>{loading === true?"loading":"Submit"}</Button>
          </form>
        </div>
      </Wrapper>
    </>
  );
}
