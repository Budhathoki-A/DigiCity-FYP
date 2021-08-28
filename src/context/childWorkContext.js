import React, { useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase";
import { authority } from "../utils/info";
import { useAuth } from "./authContext";

const ChildWorkContext = React.createContext();

export function useChildWork() {
  return useContext(ChildWorkContext);
}

export function ChildWorkProvider({ children }) {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (user.auth === authority.child || (user.auth === authority.parents && user.child)) {
      setLoading(true);
      firebaseFirestore
        .collection("works")
        .where(
          "child",
          "==",
          user.auth === authority.child ? user.id : user.child[0]
        )
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
    } else {
      setLoading(true);
      firebaseFirestore
        .collection("works")
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
    }
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
    <ChildWorkContext.Provider value={values}>
      {children}
    </ChildWorkContext.Provider>
  );
}

export default ChildWorkContext;
