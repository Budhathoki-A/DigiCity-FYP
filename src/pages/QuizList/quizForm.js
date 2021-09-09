import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Selectfield } from "../../components/selectField";
import TextField from "../../components/textField";
import { TopLayer } from "../../components/topLayer";
import { Button } from "../../components/button";
import { Question } from "./question";
import { useCategory } from "../../context/categoryContext";
import { generateId } from "../../utils/x";
import { useHistory } from "react-router-dom";

const QuizWrapper = styled.div`
  width: 85%;
  background: #eae6ec;
  margin: 0 auto;
  padding: 20px;
  border-radius: 6px;
  margin-top: 20px;
  > .fileUploader {
    display: none;
  }
`;
const AddButton = styled.div`
  width: 190px;
  background: #6e93ba;
  color: #fff;
  padding: 9px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;
const QuestionList = styled.div``;
export function QuizForm({ currentQuiz, submitQuiz }) {
  const history = useHistory();
  const fileUploadRef = useRef();
  const { data: categoryList } = useCategory();
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentQuiz) {
      setTitle(currentQuiz.title);
      setQuestionList(currentQuiz.questionList);
      setCategory(currentQuiz.category);
    }
  }, [currentQuiz, categoryList]);

  const addQuestion = () => {
    setQuestionList([...questionList, { id: generateId() }]);
  };
  const handleQuestionChange = (newQuestion) => {
    console.log("chor", newQuestion);
    let index = questionList.findIndex(
      (question) => question.id === newQuestion.id
    );
    let array = questionList;
    array[index] = newQuestion;
    setQuestionList([...array]);
  };
  const handleQuestionDelete = (id) => {
    setQuestionList(questionList.filter((question) => question.id !== id));
  };
  const handleSubmit = async () => {
    setLoading(true);
    let finalQuiz = {
      id: generateId(),
      title,
      questionList,
      category,
      participants: [],
    };
    await submitQuiz(finalQuiz);
    setLoading(false);
    history.push("/admin/quiz");
  };
  return !categoryList ? (
    "loading"
  ) : (
    <>
      <TopLayer text="Add Quiz" />
      {console.log(currentQuiz)}
      <QuizWrapper>
        <TextField
          title="Quiz Title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          width={"90%"}
          placeholder="title"
          required={true}
        />
        <Selectfield
          selectOption={categoryList && categoryList}
          title="Category"
          value={category}
          width={"medium"}
          nestedOption={true}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <AddButton onClick={() => addQuestion()}>Add Question</AddButton>
        <QuestionList>
          {questionList &&
            questionList.map((question) => (
              <Question
                key={question.id}
                currentQuestion={question}
                id={question.id}
                handleQuestionChange={handleQuestionChange}
                handleQuestionDelete={handleQuestionDelete}
              />
            ))}
        </QuestionList>
        <Button
          buttonType="primary"
          disabled={loading}
          onClick={handleSubmit}
          margin={"20px 0"}
        >
          {loading ? "loading" : "Submit"}
        </Button>
      </QuizWrapper>
    </>
  );
}
