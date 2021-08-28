import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import kidImg from "../../assets/kid-login.jpg";
import parentsImg from "../../assets/parents-login.jpg";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
  min-height: 100vh;
`;
const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  > img {
    max-width: 200px;
  }
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  text-align: center;
  padding: 20px;
  cursor: pointer;
`;
export function Login(props) {
  const history = useHistory();
  console.log(history.location.search.split("=")[1]);
  return (
    <>
      <Wrapper>
        <Card onClick={() => history.push("/all-login")}>
          <img src={kidImg} alt="" />
          <h5>I am a kid.</h5>
        </Card>

        <Card
          onClick={() =>
            history.push(
              history.location.search.split("=")[1] === "login"
                ? "/all-login"
                : "/parents-signup"
            )
          }
        >
          <img src={parentsImg} alt="" />
          <h5>I am a parent.</h5>
        </Card>
      </Wrapper>
    </>
  );
}
