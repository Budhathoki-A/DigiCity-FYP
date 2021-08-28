import React, { useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase";

const QuizContext = React.createContext();

export function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebaseFirestore
      .collection("quiz")
      .get()
      .then(
        (d) => {
          setData(d.docs.map((ds) => ds.data()));
          setLoading(false);
        },
        (e) => {
          setError(e);
          setLoading(false);
        }
      );
  }, []);

  const values = {
    data,
    loading,
    error,
    submitLoading,
    setSubmitLoading,
    setData,
    setLoading,
    setError,
  };

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
}

export default QuizContext;
