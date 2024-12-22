import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [user , setUser] = useState(null)

    // create a new user 
    const createUser = (email , password) =>{
        return createUserWithEmailAndPassword(auth , email , password)
    }
    // user log in with popup option
    const googleLogin = () =>{
        return signInWithPopup(auth , provider)
    }
    const LogOutUser = () =>{
      return signOut(auth)
    }

    const authInfo = {
        createUser,
        googleLogin,
        LogOutUser,
        user,
    }

    useEffect(()=>{
        const unSubscribe =  onAuthStateChanged( auth , (currentUser)=>{
          setUser(currentUser)
        })
        return ()=>{
          unSubscribe()
        }
    },[auth])

  return (
    <AuthContext.Provider value={authInfo}>
      {/* all components render */}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
