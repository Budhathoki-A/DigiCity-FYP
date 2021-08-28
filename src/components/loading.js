import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export function LoadingPage(props) {
  return (
    <>
      <Wrapper>
        <Loader
          type="BallTriangle"
          color="var(--primary-color)"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </Wrapper>
    </>
  );
}
