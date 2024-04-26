import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentThankYou = () => {
  const location = useLocation();
  const [refNum, setRefNum] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setRefNum(searchParams.get("reference"));
  }, [location.search]);

  return (
    <div>
      <h1>Payment Success</h1>
      <p>{refNum}</p>
    </div>
  );
};

export default PaymentThankYou;
