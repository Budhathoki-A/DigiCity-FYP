import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { TopLayer } from "../../components/topLayer";
import { useCategory } from "../../context/categoryContext";
import { useQuiz } from "../../context/quizContext";
import { IconMath, IconTube, MathSvg, ScienceSvg } from "../../utils/icons";
import { mathId, scienceId } from "../../utils/info";

const Wrapper = styled.div``;

const Content = styled.div`
  padding: 10px 15px;
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
  > img {
    width: 100%;
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
export function Quiz(props) {
  const history = useHistory();

  const { data: quizList } = useQuiz();
  const { data: CategoryList } = useCategory();
  return (
    <>
      {console.log(CategoryList)}
      <Wrapper>
        <TopLayer text="Quiz Section" />
        <Content>
          {quizList &&
            quizList.filter((quiz) => quiz.category === scienceId).length >
              0 && (
              <Header>
                <IconTube size={"26"} />
                <h3>Science</h3>
              </Header>
            )}
          <ListContainer>
            {quizList &&
              quizList
                .filter((quiz) => quiz.category === scienceId)
                .map((quiz) => (
                  <ListItem
                    onClick={() => history.push(`/mcq-view/${quiz.id}`)}
                  >
                    <img
                      src={
                        CategoryList &&
                        CategoryList.find(
                          (category) => quiz.category === category.id
                        ).quizImg
                      }
                      alt=""
                    />
                    <h5>{quiz.title}</h5>
                    <ScienceSvg />
                  </ListItem>
                ))}
          </ListContainer>
          {quizList &&
            quizList.filter((quiz) => quiz.category === mathId).length > 0 && (
              <Header>
                <IconMath size={"26"} />
                <h3>Math</h3>
              </Header>
            )}
          <ListContainer>
            {quizList &&
              quizList
                .filter((quiz) => quiz.category === mathId)
                .map((quiz) => (
                  <ListItem
                    onClick={() => history.push(`/mcq-view/${quiz.id}`)}
                  >
                    <img
                      src={
                        CategoryList &&
                        CategoryList.find(
                          (category) => quiz.category === category.id
                        ).quizImg
                      }
                      alt=""
                    />
                    <h5>{quiz.title}</h5>
                    <MathSvg />
                  </ListItem>
                ))}
          </ListContainer>
        </Content>
      </Wrapper>
    </>
  );
}
