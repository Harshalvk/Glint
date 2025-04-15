"use client";

import React, { useState } from "react";
import Dropzone from "./Dropzone";
import Styles from "./Styles";
import { Loader } from "lucide-react";

const ThumbnailCreator = () => {
  const [selectedStyle, setSelectedStyle] = useState("style1");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const setSelectedImage = async (file?: File) => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const src = e.target?.result as string;
        setImageSrc(src);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {imageSrc ? (
        <>
          {loading && (
            <div className="h-96 flex items-center justify-center">
              <Loader
                className="text-white animate-spin transition-all"
                size={30}
              />
            </div>
          )}
        </>
      ) : (
        <div>
          <div>
            <p className="scroll-m-20 text-4xl font-bold tracking-tight">
              Hi there
            </p>
            <p className="scroll-m-20 text-4xl font-bold tracking-tight">
              Want to create a thumbnail?
            </p>
            <p className="leading-7 text-muted-foreground mt-2">
              Use one of the templates below
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
            <Styles
              image="/styletest.png"
              selectStyle={() => setSelectedStyle("style1")}
              isSelected={selectedStyle === "style1"}
            />
            <Styles
              image="/styletest.png"
              selectStyle={() => setSelectedStyle("style2")}
              isSelected={selectedStyle === "style2"}
            />
            <Styles
              image="/styletest.png"
              selectStyle={() => setSelectedStyle("style3")}
              isSelected={selectedStyle === "style3"}
            />
          </div>
          <Dropzone setSelectedImage={setSelectedImage} />
        </div>
      )}
    </>
  );
};

export default ThumbnailCreator;
