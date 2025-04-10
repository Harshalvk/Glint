import GetUser from "@/actions/user/getUser";
import React from "react";
import ThumbnailCreator from "./_components/ThumbnailCreator";
import Styles from "./_components/Styles";

const page = async () => {
  const user = await GetUser();
  return (
    <div className="flex flex-col gap-4 my-12 p-6">
      <ThumbnailCreator />
    </div>
  );
};

export default page;
