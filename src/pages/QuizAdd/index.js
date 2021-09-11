import React from "react";
import { useAddContent } from "../../callback";
import { useQuiz } from "../../context/quizContext";
import { QuizForm } from "../QuizList/quizForm";

export function QuizAdd(props) {
  const addToFirebaseQuiz = useAddContent();
  const { data, setData } = useQuiz();

  function shuffleObject(obj) {
    // new obj to return
    let newObj = {};
    // create keys array
    var keys = Object.keys(obj);
    // randomize keys array
    keys.sort(function (a, b) {
      return Math.random() - 0.5;
    });
    // save in new array
    keys.forEach(function (k) {
      newObj[k] = obj[k];
    });
    return newObj;
  }
  const addQuiz = async (quiz) => {
    console.log(quiz);
    try {
      quiz.questionList.forEach(
        (question) => (question.answerList = shuffleObject(question.answerList))
      );
      await addToFirebaseQuiz("quiz", quiz);
      setData([...data, quiz]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <QuizForm submitQuiz={addQuiz} />
    </>
  );
}
