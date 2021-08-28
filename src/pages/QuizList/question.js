import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "../../components/textField";
import { IconClose } from "../../utils/icons";

const QuestionContainer = styled.div``;
const AnswerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  > * {
    flex: 35%;
  }
`;

export function Question({
  handleQuestionChange,
  id,
  currentQuestion,
  handleQuestionDelete,
}) {
  const [question, setQuestion] = useState(null);
  const [right, setRight] = useState(null);
  const [a1, setA1] = useState(null);
  const [a2, setA2] = useState(null);
  const [a3, setA3] = useState(null);

  useEffect(() => {
    if (currentQuestion) {
      setQuestion(currentQuestion.question);
      setRight(currentQuestion.answerList && currentQuestion.answerList.right);
      setA1(currentQuestion.answerList && currentQuestion.answerList.a1);
      setA2(currentQuestion.answerList && currentQuestion.answerList.a2);
      setA3(currentQuestion.answerList && currentQuestion.answerList.a3);
    }
  }, [currentQuestion]);

  return (
    <>
      <QuestionContainer>
        <TextField
          title="Question"
          width={"90%"}
          onChange={(e) => {
            setQuestion(e.target.value);
            handleQuestionChange({
              id,
              question: e.target.value,
              answerList: {
                right,
                a1,
                a2,
                a3,
              },
            });
          }}
          value={question || ""}
        />
        <AnswerList>
          <TextField
            title=" Right answer"
            width={"85%"}
            onChange={(e) => {
              setRight(e.target.value);
              handleQuestionChange({
                id,
                question,
                answerList: {
                  right: e.target.value,
                  a1,
                  a2,
                  a3,
                },
              });
            }}
            value={right || ""}
          />
          <TextField
            title=" Wrong answer"
            width={"85%"}
            onChange={(e) => {
              setA1(e.target.value);
              handleQuestionChange({
                id,
                question,
                answerList: {
                  right,
                  a1: e.target.value,
                  a2,
                  a3,
                },
              });
            }}
            value={a1 || ""}
          />
          <TextField
            title=" Wrong answer"
            width={"85%"}
            onChange={(e) => {
              handleQuestionChange({
                id,
                question,
                answerList: {
                  right,
                  a1,
                  a2: e.target.value,
                  a3,
                },
              });
              setA2(e.target.value);
            }}
            value={a2 || ""}
          />
          <TextField
            title=" Wrong answer"
            width={"85%"}
            onChange={(e) => {
              setA3(e.target.value);
              handleQuestionChange({
                id,
                question,
                answerList: {
                  right,
                  a1,
                  a2,
                  a3: e.target.value,
                },
              });
            }}
            value={a3 || ""}
          />
        </AnswerList>
        <IconClose
          size={"25"}
          color={"red"}
          style={{ cursor: "pointer" }}
          onClick={() => handleQuestionDelete(id)}
        />
      </QuestionContainer>
    </>
  );
}
