import React, { useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase";

const CategoryContext = React.createContext();

export function useCategory() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebaseFirestore
      .collection("category")
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
    <CategoryContext.Provider value={values}>{children}</CategoryContext.Provider>
  );
}

export default CategoryContext;
