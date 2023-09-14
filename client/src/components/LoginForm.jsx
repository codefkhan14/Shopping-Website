// import React, { useState,useEffect } from "react";
// import "../style/LoginForm.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// // import Account from "./Account";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function LoginForm() {
//   // navigation
//   const navigate = useNavigate();
//   // set state
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });
   
//   //  get token
//   const isUserSignedIn = !!localStorage.getItem("token");

//   //  tostify
//   const toastOption = {
//     password: "buttom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   // input handle
//   const handleInput = (e) => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value,
//     });
//   };

//   let userName,userEmail;

//   //  submit form
//   const SubmitForm = async (e) => {
//     e.preventDefault();
//     const { password, email } = user;
//     if (!email || !password) {
//       toast.error("Please fill all field", toastOption);
//       return false;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/login", user);
      
//       const token = response.data.token;
//       navigate("/");
      
//       userName = response.data.data.name;
//       userEmail = response.data.data.email;
//       // window.location.reload();
//       localStorage.setItem("token", token);

//       toast.success("Login Successfully", toastOption);
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response.data.error, toastOption);
//     }

//     return true;
//   };

//   console.log(userName);
//   console.log(userEmail);
//   const handleSignOut = () => {
//     localStorage.removeItem('token')
//     navigate('/')
// }
//   return (
//     <>
//       {isUserSignedIn ? (
//         <>
//            <>
//        <Link><li>Account</li></Link>
//             <li>username : {userName}</li>
//             <li>{userEmail}</li>
//             <li><button onClick={handleSignOut}>Sign Out</button></li> 
//             </>
//           {/* <Account name={userName} email={userEmail}/> */}

//         </>
//       ) : (
//         <div>
//           <div className="loginform">
//             <h3>WELCOME TO THE BANDHEJ HUB</h3>
//             <form className="lform" method="POST" onSubmit={SubmitForm}>
//               <input
//                 type="email"
//                 placeholder="Enter email ID"
//                 className="loginforminput"
//                 name="email"
//                 value={user.email}
//                 onChange={handleInput}
//               />
//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 className="loginforminput"
//                 name="password"
//                 value={user.password}
//                 onChange={handleInput}
//               />

//               <a href="" className="fogpass">
//                 Forgot Password?
//               </a>

//               <input
//                 type="submit"
//                 name="button"
//                 className="formbtn"
//                 value="Login"
//               />
//               <span>
//                 Don't have an account?{" "}
//                 <Link to="/account/register" className="formspana">
//                   Create account
//                 </Link>
//               </span>
//             </form>
//           </div>
//           <ToastContainer />
//         </div>
//       )}
//     </>
//   );
// }

// export default LoginForm;
import React, { useState, useEffect } from "react";
import "../style/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./Account";

function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [userName, setUserName] = useState(""); // State for username
  const [userEmail, setUserEmail] = useState(""); // State for user email

  const isUserSignedIn = !!localStorage.getItem("token");

  const toastOption = {
    password: "buttom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  // const getData = async () =>{
  //   try {
  //     const response = await axios.get("http://localhost:5000/profile");
  //     // const userData = response;
  //     // console.log(response.data);
  //     // Set the username and email in state
  //     // setUserName(userData.name);
  //     // setUserEmail(userData.email);


  //   } catch (err) {
  //     console.log("any error", err);
  //   }
  // }
  // useEffect(()=>{
  //   getData()
  // },[]);

  const SubmitForm = async (e) => {
    e.preventDefault();
    const { password, email } = user;
    if (!email || !password) {
      toast.error("Please fill all field", toastOption);
      return false;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", user);
      const token = response.data.token;
      navigate("/");

      // const userData = response.data.data;
      
      // Set the username and email in state
      // setUserName(userData.name);
      // setUserEmail(userData.email);

      localStorage.setItem("token", token);

      toast.success("Login Successfully", toastOption);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error, toastOption);
    }

    return true;
  };

  // const handleSignOut = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  return (
    <>

      {isUserSignedIn ? (
        <>
        <Account/>
        </>
      ) : (
        <div>
                   <div className="loginform">
                    <h3>WELCOME TO THE BANDHEJ HUB</h3>
                    <form className="lform" method="POST" onSubmit={SubmitForm}>
                     <input
                       type="email"
                         placeholder="Enter email ID"
                         className="loginforminput"
                        name="email"
                        value={user.email}
                        onChange={handleInput}
                      />
                      <input
                        type="password"
                        placeholder="Enter password"
                        className="loginforminput"
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                      />
        
                      <a href="" className="fogpass">
                        Forgot Password?
                      </a>
        
                      <input
                        type="submit"
                        name="button"
                       className="formbtn"
                       value="Login"
                     />
                      <span>
                         Don't have an account?{" "}
                        <Link to="/account/register" className="formspana">
                          Create account
                        </Link>
                    </span>
                     </form>
                   </div>
                  <ToastContainer />
                </div>
      )}
          </>

  );
}

export default LoginForm;
