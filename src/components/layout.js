import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  grid-column-gap: 35px;
  > * {
    max-width: 100%;
  }
  @media only screen and (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;
const MainContent = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  @media only screen and (max-width: 1050px) {
    width: 95%;
    margin: 0 auto;
    padding-left: 65px;
  }
`;

export function Layout({ children, plugins }) {
  return (
    <>
      <Layout>
        <MainContent>{children}</MainContent>
      </Layout>
    </>
  );
}
