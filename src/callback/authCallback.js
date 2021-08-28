import  { firebaseAuth } from "../firebase";
const { useCallback } = require("react");


export function useSignUp() {
  const signUp = useCallback((email, password) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }, []);

  return signUp;
}
export function useLogin() {
  const login = useCallback((email, password) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }, []);

  return login;
}

export function useLogout() {
  const logoutCallback = useCallback(() => {
    return firebaseAuth.signOut();
  }, []);

  return logoutCallback;
}
