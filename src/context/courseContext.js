import React, { useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase";

const CourseContext = React.createContext();

export function useCourses() {
  return useContext(CourseContext);
}

export function CoursesProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebaseFirestore
      .collection("courses")
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

  return (
    <CourseContext.Provider value={values}>{children}</CourseContext.Provider>
  );
}

export default CourseContext;
