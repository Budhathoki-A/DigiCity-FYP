import React, { useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase";

const AwardContext = React.createContext();

export function useAward() {
  return useContext(AwardContext);
}

export function AwardProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebaseFirestore
      .collection("award")
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
    <AwardContext.Provider value={values}>{children}</AwardContext.Provider>
  );
}

export default AwardContext;
