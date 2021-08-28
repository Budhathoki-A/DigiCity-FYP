import React from "react";
import styled from "styled-components";
import { TopLayer } from "../../components/topLayer";
import mathQuiz from "../../assets/math-quiz.jpg";
import { useChildWork } from "../../context/childWorkContext";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { authority } from "../../utils/info";
import { useAuth } from "../../context/authContext";
import emptyImg from "../../assets/empty.jpg";

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
export function ChildWork(props) {
  const { user } = useAuth();
  const history = useHistory();
  const { data: childWork } = useChildWork();
  return (
    <>
      {console.log(childWork)}
      <TopLayer text="Child work" />
      <Content>
        {user.auth === authority.child && (
          <Button
            onClick={() => history.push("/child-work/add")}
            buttonType="primary"
            margin={"10px 0"}
            padding={"12px 13px"}
          >
            Add Work
          </Button>
        )}
        <ListContainer>
          {childWork && childWork.length > 0 ? (
            childWork.map((work) => (
              <ListItem
                key={work.id}
                onClick={() => history.push(`/child-work/${work.id}`)}
              >
                <img src={mathQuiz} alt="" />
                <h5>{work.coursesTitle}</h5>
              </ListItem>
            ))
          ) : (
           <p>Looks like there is nothing currently.</p>
          )}
        </ListContainer>
      </Content>
    </>
  );
}
