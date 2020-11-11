import React, { useContext, useEffect, useState } from "react";
import firebase from './Firebase';

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
  }

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }


  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};