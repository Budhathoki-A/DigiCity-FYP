import React from "react";
import styled from "styled-components";
import {
  IconFacebook,
  IconInstagram,
  IconWhaaspp,
  IconYoutube,
} from "../../utils/icons";

const Wrapper = styled.div``;
const FooterCard = styled.footer`
  position: relative;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  border-radius: 10px;
  margin: 20px auto 0 auto;
  padding: 20px 0;
  > h4 {
    text-align: center;
    font-weight: 500;
  }
  > div {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin: 40px 0;
    > svg {
      cursor: pointer;
    }
  }
  >p{
      text-align: center;
      font-size: 12px ;
  }
`;

const Line = styled.div`
  border-top: 1px solid #dadada;
  width: 100%;
 
`;
export function Footer(props) {
  return (
    <>
      <Wrapper>
        <FooterCard>
          <h4>Follow Us</h4>
          <div>
            <IconFacebook size={"16px"} color={"var(--primary-color)"} />
            <IconInstagram size={"16px"} color={"var(--primary-color)"} />
            <IconWhaaspp size={"16px"} color={"var(--primary-color)"} />
            <IconYoutube size={"16px"} color={"var(--primary-color)"} />
          </div>
          <Line />
          <p>&copy; 2021 copyright</p>
        </FooterCard>

      </Wrapper>
    </>
  );
}
