import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 90%;
  margin: 20px auto 0 auto;
`;
export function Content({ children }) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
}
