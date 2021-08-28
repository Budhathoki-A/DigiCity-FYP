import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/button";
import TextField from "../../components/textField";
import { useAuth } from "../../context/authContext";
import { authority, serverUrl } from "../../utils/info";

const Content = styled.div`
  max-width: 350px;
  width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;

  > h3 {
    color: #46506d; 
  }
`;
const Error = styled.p`
  padding-bottom: 10px;
  color: red;
`;

export function Createchildprofile(props) {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChildNewProfile = async (e) => {
    e.preventDefault();
    setError(null);
    if (password === confirmPassword) {
      try {
        setLoading(true);

        const res = await axios.post(`${serverUrl}/add-user`, {
          id: user.id,
          fullname,
          password,
          email,
          auth: authority.child,
        });
        console.log(res.data);
        user["child"] = [res.data.childId];
        setUser({...user});
        setLoading(false);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setError("Email address already in used with other account.");
        } else {
          console.log(error);
          setError("Something went wrong.");
        }
        setLoading(false);
      }
    } else {
      setError("Password do not match.");
    }
  };

  return (
    <>
      <Content className="content">
        <h3>Child Account details</h3>
        <form onSubmit={handleChildNewProfile}>
          <TextField
            title="Email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            width={"90%"}
          />

          <TextField
            title="Full name"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
            width={"90%"}
          />
          <TextField
            title="Password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            width={"90%"}
          />
          <TextField
            title="Re-enter  Password"
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
            width={"90%"}
          />
          <Error>{error} </Error>
          <Button buttonType="primary" disabled={loading}>
            {loading ? "loading" : "Submit"}
          </Button>
        </form>
      </Content>
    </>
  );
}
