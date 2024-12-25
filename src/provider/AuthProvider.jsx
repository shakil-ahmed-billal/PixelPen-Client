import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  // log in user function
  const userLogin = (email , password) =>{
    return signInWithEmailAndPassword(auth , email , password )
  }
  // create a new user 
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // user log in with popup option
  const googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  }
  const LogOutUser = () => {
    setLoading(true)
    return signOut(auth)
  }

  const authInfo = {
    createUser,
    googleLogin,
    LogOutUser,
    userLogin,
    loading,
    user,
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser)
      if(currentUser){
        const {data} = await axios.get(`${import.meta.env.VITE_LINK}/jwt` , {withCredentials: true})
        console.log(data)
      }
      setLoading(false)
    })
    return () => {
      unSubscribe()
    }
  }, [auth])

  return (
    <AuthContext.Provider value={authInfo}>
      {/* all components render */}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
