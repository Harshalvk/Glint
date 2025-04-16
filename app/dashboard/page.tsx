import React from "react";
import ThumbnailCreator from "./_components/ThumbnailCreator";
import GetUserCredits from "@/actions/user/getUserCredits";
import Recent from "./_components/Recent";
import { Button } from "@/components/ui/button";
import BuyCreditsBtn from "./_components/BuyCreditsBtn";

const page = async () => {
  const userCredits = await GetUserCredits();
  return (
    <div className="flex flex-col gap-4 my-12 p-6">
      {userCredits === 10 ? (
        <>
          <div>
            <p className="scroll-m-20 text-4xl font-bold tracking-tight">
              Hi there
            </p>
            <p className="scroll-m-20 text-4xl font-bold tracking-tight">
              Want to create a thumbnail?
            </p>
            <p className="leading-7 text-muted-foreground mt-2">
              Buy more credits to continue generate more thumbnails.
            </p>
            <BuyCreditsBtn className="mt-3"/>
          </div>
          <div className="mt-8">
            <Recent />
          </div>
        </>
      ) : (
        <ThumbnailCreator>
          <Recent />
        </ThumbnailCreator>
      )}
    </div>
  );
};

export default page;
