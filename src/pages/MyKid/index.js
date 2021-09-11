import React from "react";
import styled from "styled-components";
import bg from "../../assets/cloud-bg.png";
import { useAuth } from "../../context/authContext";
import { ChildProfile } from "./childProfile";
import { Createchildprofile } from "./createchildProfile";

const Wrapper = styled.div`
  background: #dea5ea url(${bg}) no-repeat;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  gap:20px;
  height: 100vh;
  > .content {
  }
`;

export function MyKid(props) {
  const { user } = useAuth();
  return (
    <>
      <Wrapper>
        {!user.child || user.child.length === 0 ? (
          <Createchildprofile />
        ) : (
          <ChildProfile />
        )}
      </Wrapper>
    </>
  );
}
