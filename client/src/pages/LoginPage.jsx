//Main code 
// import React, { useState } from 'react';
// import "../styles/Login.scss"
// import { setLogin } from '../redux/state';
// import { useDispatch }from "react-redux";
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await fetch ("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       })

//       /* Get data fetching */
//       const loggedIn = await response.json()
      
//       if(loggedIn) {
//         dispatch(
//           setLogin({
//             user: loggedIn.user,
//             token: loggedIn.token
//           })
//         )
//         navigate("/")
//       }

//     } catch (err) {
//       console.log("Login failed", err.message);
//     }
//   }

//   return (
//     <div className="login">
//       <div className="login_content">
//         <form className="login_content_form" onSubmit={handleSubmit} >
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input 
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">LOG IN</button>
//         </form>
//         <a href="/register">Don't have an account? Sign In Here</a>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// Admin Page

import React, { useState } from 'react';
import "../styles/Login.scss";
import { setLogin } from '../redux/state';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is user

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, role }) // Include role in the request
      });

      
      /* Get data fetching */
      const loggedIn = await response.json();
      console.log("response:: login ",loggedIn);

      localStorage.setItem("token", loggedIn.token);

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        );
        navigate("/");
      }

    } catch (err) {
      console.log("Login failed", err.message);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don't have an account? Sign Up Here</a>
      </div>
    </div>
  );
};

export default LoginPage;