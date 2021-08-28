import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Img from "../../assets/art-3.png";
import layerImg from "../../assets/landing-layer-1.png";
import { Button } from "../../components/button";
import { Content } from "./content";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  margin-top: 100px;
  > * {
    display: flex;
    flex-wrap: wrap;

    align-items: center;
    justify-content: space-between;
    gap: 10px;
    @media only screen and (max-width: 1016px) {
      justify-content: center;
      flex-direction: column-reverse;
    }
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  max-width: 500px;
`;

const SubText = styled.h5`
  color: #696969;
  margin: 17px 0;
`;
const ImageContainer = styled.div``;
const HeroImg = styled.img`
  max-width: 440px;
  @media only screen and (max-width: 560px) {
    max-width: 300px;
  }
`;
const LayerImg = styled.img`
  position: absolute;
  bottom: -330px;
  left: 0;
  right: 0;
  object-fit: cover;
  max-width: 100%;
  @media only screen and (max-width: 1016px) {
    bottom: -193px;
  }
`;
export function Hero(props) {
  const history = useHistory()
  return (
    <>
      <Wrapper id="Hero">
        <Content>
          <TextContainer>
            <h1>Help Your Kid Discover</h1>
            <SubText>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </SubText>
            <Button
              buttonType="primary"
              style={{ maxWidth: "110px", padding: "13px" }}
              onClick={() => history.push('/login?action=login')}
            >
              Login
            </Button>
          </TextContainer>
          <ImageContainer>
            <HeroImg src={Img} alt="" />
          </ImageContainer>
        </Content>

        <LayerImg src={layerImg} alt="" />
      </Wrapper>
    </>
  );
}
