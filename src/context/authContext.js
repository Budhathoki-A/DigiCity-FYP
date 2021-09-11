import React, { useContext, useEffect, useState } from "react";
import { useLogout } from "../callback";
import { useGetOneDocument } from "../callback/firestoreCallback";
import { firebaseAuth } from "../firebase";
import { authority } from "../utils/info";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const getUser = useGetOneDocument();
  const logout = useLogout();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      console.log(user)
      if (user) {
        const userInfo = await getUser("users", user.uid);

        if (userInfo.exists) {
         
          //id child account check if parents is still subscribed
          if (userInfo.data().auth === authority.child) {
            const parentsInfo = await getUser("users", userInfo.data().parent);
            console.log("parents",parentsInfo.data())
            if (parentsInfo.data() && parentsInfo.data().stripeSubId) {
              setUser({
                ...userInfo.data(),
                stripeCustomerId: parentsInfo.data().stripeCustomerId,
                stripeSubId: parentsInfo.data().stripeSubId,
              });
              setLoading(false);
            } else {
              setError("Your account is suspended.");
              logout();
              setLoading(false);
            }
          } else {
            setUser(userInfo.data());
            setLoading(false);
          }
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const values = {
    user,
    setUser,
    error,
    setError,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContext;
