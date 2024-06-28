import Api from "./axiosconfig";
import { encryptedSessionId } from "./cryptconfig";
import { decryptedSessionId } from './cryptconfig';

// Authentication Api
export const loginfunc = (usrname, pass,navigate) => {
  return async (e) => {
    e.preventDefault();

    const loginData = {
      username: usrname,
      password: pass,
    };

    try {
      const response = await Api.post(
        "/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      encryptedSessionId(response.data.session_id)
      navigate('/dashboard')
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
};

export const logoutfunc = (navigate) => {
  return async() =>{
    const sessionId = sessionStorage.getItem('session_id');
    const session_key = decryptedSessionId(sessionId);
    try {
      const response = await Api.post('/auth/logout',{
        headers : {
          'Session-Id':session_key
        }
      });
      sessionStorage.removeItem("session_id")
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}

export const enrollfunc = (courseId,session_key,navigate) => {
  return async () => {
    const sessionId = sessionStorage.getItem('session_id');
    const session_key = decryptedSessionId(sessionId);
    try {
      const response = await Api.post(
        `/schedule/enrollclasses?course_id=${courseId}`,{},
        {
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Session-Id': session_key
          },
        }
      );
      console.log(response.data)
      navigate('/dashboard')
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
};
