import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEditContent } from "../../callback/firestoreCallback";
import { useQuiz } from "../../context/quizContext";
import { QuizForm } from "../QuizList/quizForm";

export function QuizEdit(props) {
  const quizEdit = useEditContent();
  const { id } = useParams();
  const { data: quizList, setData: setQuizList } = useQuiz();

  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    if (quizList) {
      const selected = quizList.find((quiz) => quiz.id === id);
      console.log("quizList", quizList);
      if (selected) {
        setCurrentQuiz(selected);
      }
    }
  }, [id, quizList]);

  const editQuiz = async (quiz) => {
    console.log(quiz);
    try {
      delete quiz.id;
      delete quiz.participants;

      await quizEdit("quiz", id, quiz);
      quiz.id = id;
      const index = quizList.findIndex((currentQuiz) => currentQuiz.id === id);

      quizList[index] = quiz;
      setQuizList([...quizList]);
    } catch (error) {}
  };

  return (
    <>
      <QuizForm currentQuiz={currentQuiz} submitQuiz={editQuiz} />
    </>
  );
}
