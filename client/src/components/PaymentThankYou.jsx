import React, { useContext } from "react";
import "../style/ThankyouPage.css";
import { useNavigate } from "react-router-dom";
import SuccessPic from "../assets/success.png";
import { UserContext } from "../context/userContext";

const PaymentThankYou = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  // const location = useLocation();
  // const [refNum, setRefNum] = useState("");
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   setRefNum(searchParams.get("reference"));
  // }, [location.search]);
  const ThankYouNavigate = (para) => {
    if (para === "home") navigate("/");
    else navigate("/myorders");
  };

  return (
    <div className="thankyou-page">
      <div>
        <img src={SuccessPic} alt="Loading..." />
      </div>

      <div>
        {/* <img src={ThankYouPic} alt="Loading..." /> */}
        <h2>𝙏𝙝𝙖𝙣𝙠 𝙮𝙤𝙪!</h2>
      </div>

      <div>
        <p>Hi, {userInfo?.finalData?.user?.name}</p>
        <p>
          We got your order, We'll notify you as soon as it gets shipped out!
        </p>
      </div>

      <div>
        <button onClick={() => ThankYouNavigate("orders")}>
          View Order Status
        </button>
      </div>

      <div>
        <p onClick={() => ThankYouNavigate("home")}>Back to the home page</p>
      </div>

      {/* <p>{refNum}</p> */}
    </div>
  );
};

export default PaymentThankYou;
