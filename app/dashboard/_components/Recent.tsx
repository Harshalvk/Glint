import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Recent = () => {
  return (
    <div className="flex flex-col max-w-3xl">
      <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
        Recent thumbnails
      </h3>
      <p className="text-sm text-muted-foreground">
        Download your most recent thumbnails.
      </p>
      <Separator className="my-2" />
      <div className="flex h-fit max-w-full gap-2 overflow-x-scroll">
        <div className="flex min-w-fit flex-col gap-1 mt-2 mb-4">
          <p className="text-sm text-muted-foreground font-semibold">
            From{" "}
            {new Date().toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <img
            src="/styl1.png"
            alt="image"
            className="h-40 w-auto rounded-md object-contain"
          />
          <Button className="w-full" variant={"outline"}>
            Download
          </Button>
        </div>
        <div className="flex min-w-fit flex-col gap-1 mt-2 mb-4">
          <p className="text-sm text-muted-foreground font-semibold">
            From{" "}
            {new Date().toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <img
            src="/styl1.png"
            alt="image"
            className="h-40 w-auto rounded-md object-contain"
          />
          <Button className="w-full" variant={"outline"}>
            Download
          </Button>
        </div>
        <div className="flex min-w-fit flex-col gap-1 mt-2 mb-4">
          <p className="text-sm text-muted-foreground font-semibold">
            From{" "}
            {new Date().toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <img
            src="/styl1.png"
            alt="image"
            className="h-40 w-auto rounded-md object-contain"
          />
          <Button className="w-full" variant={"outline"}>
            Download
          </Button>
        </div>
        <div className="flex min-w-fit flex-col gap-1 mt-2 mb-4">
          <p className="text-sm text-muted-foreground font-semibold">
            From{" "}
            {new Date().toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <img
            src="/styl1.png"
            alt="image"
            className="h-40 w-auto rounded-md object-contain"
          />
          <Button className="w-full" variant={"outline"}>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Recent;
