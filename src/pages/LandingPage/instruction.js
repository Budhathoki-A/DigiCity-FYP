import React from "react";
import styled from "styled-components";
import loginImg from "../../assets/art-1.png";
import signYourKidImg from "../../assets/art-7.png";
import kidLearn from "../../assets/art-6.png";
import { Content } from "./content";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  justify-content: center;
  margin-top: 350px;
  > * > h2 {
    margin-left: 10px;
  }
`;
const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > :nth-child(even) {
    flex-direction: row-reverse;
  }
`;
const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  > img {
    max-height: 400px;
  }
  @media only screen and (max-width: 1090px) {
    justify-content: center;
  }
`;
const StepInfo = styled.p`
  max-width: 500px;
  >h3{
      margin-bottom: 20px;
  }
  > p {
    color: #696969;
  }
`;
export function Instruction(props) {
  const steps = [
    {
      header: "Sign Up",
      img: loginImg,
      content:
        "  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
        header: "Sign Up",
        img: signYourKidImg,
        content:
          "  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
      {
        header: "Sign Up",
        img: kidLearn,
        content:
          "  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
  ];
  return (
    <>
      <Wrapper id="Instruction">
        <Content>
          <h2>How it works</h2>
          <StepsList>
            {steps.map((step, i) => (
              <Step key={i}>
                <img src={step.img} alt="" />
                <StepInfo>
                  <h3>{step.header}</h3>
                  <p>{step.content}</p>
                </StepInfo>
              </Step>
            ))}
          </StepsList>
        </Content>
      </Wrapper>
    </>
  );
}
