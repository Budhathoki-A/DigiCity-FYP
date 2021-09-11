import React from "react";
import styled from "styled-components";
import { IconPuzzle, IconUser, IconVideoPlay } from "../../utils/icons";
import { Content } from "./content";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  justify-content: center;
  margin: 20px 0;
  padding-bottom: 40px;
  background: var(--primary-color);
  color: #fcfbfd;
  > * > h2 {
    margin: 27px 0;
  }
`;
const StepsList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  @media only screen and (max-width: 1140px) {
    justify-content: center;
  }
`;
const Step = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 23px;
  > img {
    max-height: 400px;
  }
`;
const StepInfo = styled.p`
  max-width: 500px;
  > p {
    color: #f3c8ff;
    margin-top: 20px;
  }
`;
export function Features(props) {
  return (
    <>
      <Wrapper id="Features">
        <Content>
          <h2>Features</h2>
          <StepsList>
            <Step>
              <IconVideoPlay size={"22px"} color={"#f3c8ff"} />
              <StepInfo>
                <h3>Watch Video</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </StepInfo>
            </Step>
            <Step>
              <IconPuzzle size={"22px"} color={"#f3c8ff"} />
              <StepInfo>
                <h3>Learn through Documents</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </StepInfo>
            </Step>
            <Step>
              <IconUser size={"22px"} color={"#f3c8ff"} />
              <StepInfo>
                <h3>Explore various Courses</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </StepInfo>
            </Step>
            <Step>
              <IconVideoPlay size={"22px"} color={"#f3c8ff"} />
              <StepInfo>
                <h3>Exciting quizes and many more</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </StepInfo>
            </Step>
          </StepsList>
        </Content>
      </Wrapper>
    </>
  );
}
