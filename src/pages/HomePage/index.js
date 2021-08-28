import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import kidsLearningImg from "../../assets/kids-learning.jpg";

import { TopLayer } from "../../components/topLayer";
import { IconMath, IconTube, MathSvg, ScienceSvg } from "../../utils/icons";
import { useCourses } from "../../context/courseContext";
import { useCategory } from "../../context/categoryContext";
import { mathId, scienceId, serverUrl } from "../../utils/info";
import { PayPalButton } from "react-paypal-button-v2";
import { clientId } from "../../paypal";
import axios from "axios";

const Wrapper = styled.div``;

const Content = styled.div`
  padding: 10px 15px;
`;
const Cartoon = styled.div`
  display: flex;
  justify-content: center;
  > img {
    max-width: 400px;
    object-fit: cover;
  }
  > .speech-bubble {
    background: #f3ccb1;
    color: #543418;
    padding: 8px;
    border-radius: 5px;
    display: inline-flex;
    position: absolute;
    text-align: center;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  > h3 {
    color: #234fb1;
  }
`;

const ListContainer = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;
  @media only screen and (max-width: 650px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;
const ListItem = styled.div`
  background: ${(props) => (props.math ? " #53129a;" : "#2ba5a5")};
  padding: 10px 8px;
  border-radius: 8px;
  color: #fff;
  max-width: 100%;
  position: relative;
  cursor: pointer;

  overflow: hidden;
  > img {
    width: 100%;
    height: 154px;
    object-fit: cover;
  }
  > svg {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 9px;
    left: 7px;
    transform: rotate(16deg);
  }
  :hover {
    > svg {
      transform: rotate(0);
    }
  }
`;
export function HomePage(props) {
  const history = useHistory();
  const { data: CoursesList } = useCourses();
  const { data: CategoryList } = useCategory();

  return (
    <>
      <Wrapper>
        <TopLayer text="Learning Section" />
        <Content>
          <Cartoon>
            <div className="speech-bubble">Here we will learn together.</div>

            <img src={kidsLearningImg} alt="" />
          </Cartoon>
          {CoursesList &&
            CoursesList.filter((courses) => courses.category === scienceId).length > 0 && (
              <Header>
                <IconTube size={"26"} />
                <h3>Science</h3>
              </Header>
            )}
          <ListContainer>
            {CoursesList &&
              CoursesList.filter(
                (courses) => courses.category === scienceId
              ).map((course) => (
                <ListItem onClick={() => history.push(`/course/${course.id}`)}>
                  <img
                    src={
                      CategoryList &&
                      CategoryList.find(
                        (category) => course.category === category.id
                      ).courseImg
                    }
                    alt=""
                  />
                  <h5>{course.title}</h5>
                  <ScienceSvg />
                </ListItem>
              ))}
          </ListContainer>
          {CoursesList &&
            CoursesList.filter((courses) => courses.category === mathId).length > 0 && (
              <Header>
                <IconMath size={"26"} />
                <h3>Math</h3>
              </Header>
            )}
          <ListContainer>
            {CoursesList &&
              CoursesList.filter((courses) => courses.category === mathId).map(
                (course) => (
                  <ListItem
                    onClick={() => history.push(`/course/${course.id}`)}
                  >
                    <img
                      src={
                        CategoryList &&
                        CategoryList.find(
                          (category) => course.category === category.id
                        ).courseImg
                      }
                      alt=""
                    />
                    <h5>{course.title}</h5>
                    <MathSvg />
                  </ListItem>
                )
              )}
          </ListContainer>
        </Content>
      </Wrapper>
    </>
  );
}
