import React, { useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase";

const AvatarContext = React.createContext();

export function useAvatar() {
  return useContext(AvatarContext);
}

export function AvatarProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebaseFirestore
      .collection("avatar")
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
    <AvatarContext.Provider value={values}>{children}</AvatarContext.Provider>
  );
}

export default AvatarContext;
