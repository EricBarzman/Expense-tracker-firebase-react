import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

import "./styles.css";

export const Auth = () => {

  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  // If connected redirect
  if (isAuth) {
    return <Navigate to="expense-tracker"/>
  }

  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true
    }
    // Convert the authInfo object into a string
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  }

  return (
    <div className="login-page">
      
      <p>Sign in with Google to continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in
      </button>

    </div>
  )
}