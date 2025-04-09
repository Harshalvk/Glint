import GetUserCredits from "@/actions/user/getUserCredits";
import React from "react";

const Credits = async () => {
  const userCredits = await GetUserCredits();
  return <div>{userCredits} credits left</div>;
};

export default Credits;
