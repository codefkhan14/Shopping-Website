import React, { useContext } from "react";
import "../style/Account.css";
import { UserContext } from "../context/userContext";
function Account() {
  const { userInfo } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("BandhejHub");
    window.location.href = "/"; // Redirect using anchor tag
  };

  return (
    <div className="account-info">
      <ul>
        <li>
          <b>Account Information</b>
        </li>
        <hr />
        <li>
          {" "}
          <b>Name</b> : {userInfo?.user?.name}
        </li>
        <hr />
        <li>
          {" "}
          <b>Email Address</b> : {userInfo?.user?.email}
        </li>
        <hr />
        <li>
          {" "}
          <b>Phone</b> : {userInfo?.user?.phone}
        </li>
        <hr />
        <li>
          {" "}
          <b>Your Address</b> : ward no 2 sikar,rajasthan
        </li>
        <hr />

        <button onClick={handleSignOut}>Sign Out</button>
      </ul>
    </div>
  );
}

export default Account;
