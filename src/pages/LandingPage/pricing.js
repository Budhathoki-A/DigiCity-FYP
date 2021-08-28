import React from "react";
import styled from "styled-components";
import moneyImg from "../../assets/art-9.png";
import layerImg from "../../assets/landing-layer-2.png";
import { Content } from "./content";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  justify-content: center;
  margin-top: 30px;
  padding: 40px 0;
  > * > h2 {
    margin-left: 10px;
    text-align: center;
    font-size: 22px;
  }
`;
const PricingCard = styled.div`
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  max-width: 300px;
  margin: 20px auto;
  padding: 20px 0 30px 0;
  > img {
    max-width: 100%;
    object-fit: cover;
  }
  > h3 {
    color: var(--primary-color);
  }
  > p {
    text-align: center;
  }
`;
const LayerImg = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100%;
`;
export function Pricing(props) {
  return (
    <>
      <Wrapper id="Pricing">
        <Content>
          <h2>Pricing</h2>
          <PricingCard>
            <img src={moneyImg} alt="" />
            <h2>Basic</h2>
            <h3>$10 /Month</h3>
            <p>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </p>
          </PricingCard>
        </Content>
        <LayerImg src={layerImg} alt="" />
      </Wrapper>
    </>
  );
}
